(function () {
  "use strict";

  var D = window.NAV_DATA;
  var $ = function (id) { return document.getElementById(id); };

  // Everything the user chose lives in this one object, and it is mirrored in the URL hash.
  // That is what makes a result shareable: the link carries the answers.
  var state = { s: "", p: [], j: "none", all: false };

  // Events go to tracker.js, which keeps them in this browser and sends nothing by default.
  function track(name, props) {
    if (window.NavTrack) window.NavTrack.track(name, props);
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // ---------- URL <-> state ----------

  function readHash() {
    var q = new URLSearchParams(location.hash.slice(1));
    var s = q.get("s") || "";
    var p = (q.get("p") || "").split(",").filter(function (x) { return D.priorities[x]; }).slice(0, 2);
    var j = q.get("j") || "none";
    state.s = D.states[s] ? s : "";
    state.p = p;
    state.j = D.stages[j] ? j : "none";
    state.all = q.get("all") === "1";
  }

  function writeHash() {
    var q = new URLSearchParams();
    if (state.s) q.set("s", state.s);
    if (state.p.length) q.set("p", state.p.join(","));
    if (state.j !== "none") q.set("j", state.j);
    if (state.all) q.set("all", "1");
    var h = q.toString().replace(/%2C/g, ",");
    try {
      history.replaceState(null, "", location.pathname + location.search + (h ? "#" + h : ""));
    } catch (e) {
      // Some browsers refuse this on a plain file. The page still works, it just can't update the link.
    }
  }

  // ---------- Form ----------

  function buildForm() {
    var sc = $("state-choices");
    sc.innerHTML = Object.keys(D.states).map(function (k) {
      return '<div class="choice"><input type="radio" name="state" id="st-' + k + '" value="' + k + '">' +
        '<label for="st-' + k + '">' + esc(D.states[k].name) + "</label></div>";
    }).join("");

    var pc = $("priority-choices");
    pc.classList.add("multi");
    pc.innerHTML = Object.keys(D.priorities).map(function (k) {
      return '<div class="choice"><input type="checkbox" name="priority" id="pr-' + k + '" value="' + k + '"' +
        ' aria-labelledby="pr-' + k + '-t" aria-describedby="pr-' + k + '-r">' +
        '<label for="pr-' + k + '"><span id="pr-' + k + '-t">' + esc(D.priorities[k].label) + '</span>' +
        '<span class="rank" id="pr-' + k + '-r" data-rank="' + k + '"></span></label></div>';
    }).join("");

    $("stage").innerHTML = Object.keys(D.stages).map(function (k) {
      return '<option value="' + k + '">' + esc(D.stages[k].label) + "</option>";
    }).join("");

    sc.addEventListener("change", function (e) {
      if (e.target.name !== "state") return;
      state.s = e.target.value;
      track("answer_changed", { field: "state", value: state.s });
      update();
    });

    pc.addEventListener("change", function (e) {
      if (e.target.name !== "priority") return;
      var k = e.target.value;
      if (e.target.checked) { if (state.p.indexOf(k) === -1) state.p.push(k); }
      else { state.p = state.p.filter(function (x) { return x !== k; }); }
      track("answer_changed", { field: "priority", value: state.p.join(",") });
      update();
    });

    $("stage").addEventListener("change", function (e) {
      state.j = e.target.value;
      track("answer_changed", { field: "stage", value: state.j });
      update();
    });
  }

  function syncForm() {
    Object.keys(D.states).forEach(function (k) { $("st-" + k).checked = state.s === k; });
    Object.keys(D.priorities).forEach(function (k) {
      var i = state.p.indexOf(k);
      var box = $("pr-" + k);
      box.checked = i !== -1;
      box.disabled = i === -1 && state.p.length >= 2;
      document.querySelector('[data-rank="' + k + '"]').textContent = i === 0 ? "1st pick" : i === 1 ? "2nd pick" : "";
    });
    $("stage").value = state.j;
    $("prio-count").textContent = state.p.length >= 2
      ? "You picked two. Uncheck one if you want to switch."
      : state.p.length === 1 ? "One picked. You can add a second, or leave it." : "";
  }

  // ---------- Scoring ----------

  var STATUS_POINTS = { none: 3, partial: 2, in: 0 };
  var STATUS_TEXT = { none: "Not in place", partial: "Partly in place", in: "In place" };
  var STATUS_ICON = { none: "✕", partial: "◐", in: "✓" };

  function scoreElements() {
    var st = D.states[state.s];
    var stagePhase = D.stages[state.j].phase;
    return D.elements.map(function (el) {
      var status = st.status[el.id];
      var match = 0, hits = [];
      state.p.forEach(function (pk, i) {
        if (el.themes.indexOf(pk) !== -1) {
          match += i === 0 ? 3 : 2;
          if (el.themes[0] === pk) match += 1;
          hits.push(pk);
        }
      });
      var bonus = stagePhase && el.phase === stagePhase ? 1 : 0;
      return { el: el, status: status, hits: hits, score: match + STATUS_POINTS[status] + bonus, bonus: bonus };
    }).sort(function (a, b) { return b.score - a.score || a.el.n - b.el.n; });
  }

  function whyText(item) {
    var bits = [];
    if (item.hits.length) {
      bits.push("matches what you care about (" + item.hits.map(function (h) { return D.priorities[h].short; }).join(" and ") + ")");
    }
    bits.push(item.status === "none" ? "your state has nothing in place yet" : item.status === "partial" ? "your state only has part of it" : "your state already has it");
    if (item.bonus) bits.push("fits the project stage you picked");
    var s = bits.join("; ");
    return "Why it's here: " + s.charAt(0).toUpperCase() + s.slice(1) + ".";
  }

  // ---------- Glossary links inside text ----------

  function linkTerms(text) {
    var out = esc(text);
    Object.keys(D.glossary).forEach(function (term) {
      var re = new RegExp("\\b(" + term.replace(/[-]/g, "\\-") + ")\\b", "i");
      out = out.replace(re, function (m) {
        return '<button type="button" class="term" data-term="' + esc(term) + '" aria-expanded="false">' + m + "</button>";
      });
    });
    return out;
  }

  // ---------- Rendering ----------

  function chip(status) {
    return '<span class="chip ' + status + '"><span aria-hidden="true">' + STATUS_ICON[status] + "</span>" + STATUS_TEXT[status] + "</span>";
  }

  function elementCard(item, opts) {
    var el = item.el;
    var why = opts.why ? '<p class="why">' + esc(whyText(item)) + "</p>" : "";
    return '<li class="el' + (opts.compact ? " compact" : "") + '">' +
      '<div class="el-head"><span class="num" aria-hidden="true">' + el.n + "</span>" +
      "<" + (opts.compact ? "h5" : "h4") + ' class="el-name">' + esc(el.name) + "</" + (opts.compact ? "h5" : "h4") + ">" + chip(item.status) +
      '<span class="phase">' + D.phases[el.phase] + "</span></div>" +
      '<p class="line">' + esc(el.line) + "</p>" + why +
      "<details><summary>What this means</summary><p>" + linkTerms(el.detail) + "</p></details></li>";
  }

  function plural(n, one, many) { return n + " " + (n === 1 ? one : many); }

  function listJoin(arr) {
    if (arr.length <= 1) return arr.join("");
    return arr.slice(0, -1).join(", ") + (arr.length > 2 ? "," : "") + " and " + arr[arr.length - 1];
  }

  function renderResults() {
    var st = D.states[state.s];
    var scored = scoreElements();
    var counts = { none: 0, partial: 0, in: 0 };
    scored.forEach(function (x) { counts[x.status]++; });

    var top = scored.filter(function (x) { return x.status !== "in"; }).slice(0, 3);
    if (top.length < 3) top = scored.slice(0, 3);

    var prioText = listJoin(state.p.map(function (k) { return D.priorities[k].short; }));
    $("r-heading").textContent = "Your starting point in " + st.name;
    $("summary").innerHTML =
      "In " + esc(st.name) + ", " + plural(counts.none, "of the nine protections isn't", "of the nine protections aren't") +
      " in place yet, " + counts.partial + " " + (counts.partial === 1 ? "is" : "are") + " partly in place, and " +
      counts.in + (counts.in === 1 ? " is" : " are") + " fully in place. " +
      "Because you care most about " + esc(prioText) + ", start with " +
      listJoin(top.map(function (x) { return "<strong>" + esc(x.el.name) + "</strong>"; })) + ".";

    $("start-here").innerHTML = top.map(function (x) { return elementCard(x, { why: true }); }).join("");

    var rest = scored.filter(function (x) { return top.indexOf(x) === -1; });
    var byPhase = ["before", "during", "after"].map(function (ph) {
      var items = D.elements.filter(function (e) { return e.phase === ph; }).map(function (e) {
        return scored.filter(function (x) { return x.el.id === e.id; })[0];
      }).filter(function (x) { return rest.indexOf(x) !== -1; });
      if (!items.length) return "";
      return '<section class="phase-group"><h4>' + D.phases[ph] + "</h4><ul>" +
        items.map(function (x) { return elementCard(x, { compact: true }); }).join("") + "</ul></section>";
    }).join("");
    $("all-nine").innerHTML = byPhase;
    $("all-nine").hidden = !state.all;
    $("toggle-all").setAttribute("aria-expanded", String(state.all));
    $("toggle-all").textContent = state.all ? "Hide the other six" : "Show the other six protections";

    renderProjects(st);
    renderBills();
  }

  function renderProjects(st) {
    $("proj-state").textContent = st.name;
    var p = st.projects, total = p.operating + p.approved + p.proposed;
    var rows = [
      { key: "op", label: "Already running", n: p.operating },
      { key: "ap", label: "Approved or being built", n: p.approved },
      { key: "pr", label: "Proposed or waiting in the queue", n: p.proposed }
    ];
    var biggest = rows.slice().sort(function (a, b) { return b.n - a.n; })[0];
    var pct = function (n) { return Math.round(n / total * 100); };
    var lead = pct(biggest.n) > 50 ? "Most" : "The biggest group of";
    $("projects").innerHTML =
      "<p>" + lead + " tracked projects in " + esc(st.name) + " are " + esc(biggest.label.toLowerCase()) +
      " (" + pct(biggest.n) + "%), out of " + total + " in all.</p>" +
      '<div class="bar" role="img" aria-label="' + rows.map(function (r) { return r.label + " " + r.n; }).join(", ") + '">' +
      rows.map(function (r) { return '<span class="' + r.key + '" style="width:' + (r.n / total * 100) + '%"></span>'; }).join("") + "</div>" +
      '<ul class="legend">' + rows.map(function (r) {
        return '<li><span class="swatch" style="background:var(--bar-' + r.key + ')"></span>' + esc(r.label) +
          '<span class="n">' + r.n + " (" + pct(r.n) + "%)</span></li>";
      }).join("") + "</ul>";
  }

  // ---------- Bills ----------

  var STATUS_RANK = { Passed: 0, Engrossed: 1, Introduced: 2, Failed: 3 };
  var STATUS_LABEL = { Passed: "Passed", Engrossed: "Passed one chamber", Introduced: "Introduced", Failed: "Failed" };

  function wantedDims() {
    var set = {};
    state.p.forEach(function (k) { D.priorities[k].dimensions.forEach(function (d) { set[d] = true; }); });
    return set;
  }

  function renderBills() {
    var want = wantedDims();
    var q = $("bill-search").value.trim().toLowerCase();
    var statusF = $("bill-status").value;
    var showAll = $("bill-all").checked;
    var sort = $("bill-sort").value;

    var prioNames = listJoin(state.p.map(function (k) { return D.priorities[k].short; }));
    var untagged = D.bills.filter(function (b) { return !b.dims.length; }).length;
    $("bills-intro").textContent = showAll
      ? "Showing every example bill. Bills that match what you care about (" + prioNames + ") come first if you sort by best match."
      : "Starting with bills tagged for what you care about (" + prioNames + "). " + untagged + " bills have no topic tags on the original tool, so they only show up when you show all bills.";

    var list = D.bills.map(function (b) {
      var overlap = b.dims.filter(function (d) { return want[d]; }).length;
      return { b: b, overlap: overlap };
    }).filter(function (x) {
      if (!showAll && x.overlap === 0) return false;
      if (statusF !== "all" && x.b.status !== statusF) return false;
      if (q) {
        var hay = (x.b.state + " " + D.stateNames[x.b.state] + " " + x.b.id + " " + x.b.text).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });

    list.sort(function (a, b) {
      if (sort === "state") return D.stateNames[a.b.state].localeCompare(D.stateNames[b.b.state]) || a.b.id.localeCompare(b.b.id);
      if (sort === "status") return STATUS_RANK[a.b.status] - STATUS_RANK[b.b.status] || b.overlap - a.overlap;
      return b.overlap - a.overlap || STATUS_RANK[a.b.status] - STATUS_RANK[b.b.status] || D.stateNames[a.b.state].localeCompare(D.stateNames[b.b.state]);
    });

    $("bill-count").textContent = "Showing " + list.length + " of " + D.bills.length + " bills.";
    if (!list.length && renderBills.ready) track("bills_empty", { control: showAll ? "all" : "matching" });
    renderBills.ready = true;
    $("bills").innerHTML = list.length ? list.map(function (x) {
      var b = x.b;
      var tags = b.dims.length
        ? '<ul class="tags" aria-label="Topics">' + b.dims.map(function (d) {
          return '<li class="' + (want[d] ? "hit" : "") + '">' + esc(D.dimensions[d]) + "</li>";
        }).join("") + "</ul>"
        : '<p class="hint">No topic tags on the original tool.</p>';
      return '<li class="bill"><div class="bill-head"><span class="bill-id">' + esc(D.stateNames[b.state]) + " " + esc(b.id) +
        " (" + b.year + ')</span><span class="status ' + b.status + '">' + STATUS_LABEL[b.status] + "</span></div>" +
        "<p>" + esc(b.text) + "</p>" + tags +
        (b.check ? '<span class="flag">The status and summary disagree on the original tool. Needs a source check.</span>' : "") + "</li>";
    }).join("") : "<li class=\"hint\">No bills match. Try clearing the search or showing all bills.</li>";
  }

  function buildGlossary() {
    var q = $("gloss-search").value.trim().toLowerCase();
    var keys = Object.keys(D.glossary).sort().filter(function (k) {
      return !q || k.indexOf(q) !== -1 || D.glossary[k].toLowerCase().indexOf(q) !== -1;
    });
    $("glossary").innerHTML = keys.length ? keys.map(function (k) {
      return "<div><dt>" + esc(k.charAt(0).toUpperCase() + k.slice(1)) + "</dt><dd>" + esc(D.glossary[k]) + "</dd></div>";
    }).join("") : '<p class="hint">No terms match that search.</p>';
  }

  // ---------- Wiring ----------

  function update() {
    syncForm();
    writeHash();
    var ready = state.s && state.p.length >= 1;
    $("results").hidden = !ready;
    if (ready) {
      renderResults();
      document.title = "Your starting point in " + D.states[state.s].name + " | Data center policy concept";
      if (!update.seen) { track("results_viewed", { state: state.s, priorities: state.p.join(","), stage: state.j }); update.seen = true; }
    } else {
      document.title = "Data center policy: a redesign concept";
    }
  }

  function wire() {
    wire.usedControls = {};
    $("toggle-all").addEventListener("click", function () {
      state.all = !state.all;
      track("show_all_toggled", { open: state.all });
      update();
    });

    $("copy-link").addEventListener("click", function () {
      var done = function (ok) {
        $("copy-status").textContent = ok
          ? "Link copied. Anyone who opens it sees these same answers."
          : "Couldn't copy automatically. Copy the address from your browser's address bar instead.";
      };
      track("link_copied");
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(location.href).then(function () { done(true); }, function () { done(false); });
      } else { done(false); }
    });

    $("print").addEventListener("click", function () { track("print_clicked"); window.print(); });

    $("reset").addEventListener("click", function () {
      if (!window.confirm("Clear your answers and start over?")) return;
      state = { s: "", p: [], j: "none", all: false };
      update.seen = false;
      track("reset");
      update();
      $("copy-status").textContent = "";
      $("st-" + Object.keys(D.states)[0]).focus();
      window.scrollTo(0, 0);
    });

    ["bill-search", "bill-status", "bill-sort", "bill-all"].forEach(function (id) {
      $(id).addEventListener("input", function () {
        // Once per control per visit. We record that it was used, never what was typed.
        if (!wire.usedControls[id]) { wire.usedControls[id] = true; track("bill_filter_used", { control: id }); }
        if (state.s && state.p.length) renderBills();
      });
    });

    $("gloss-search").addEventListener("input", buildGlossary);

    document.addEventListener("click", function (e) {
      var t = e.target.closest && e.target.closest(".term");
      if (!t) return;
      var open = t.getAttribute("aria-expanded") === "true";
      var next = t.nextElementSibling;
      if (next && next.classList.contains("term-def")) { next.remove(); t.setAttribute("aria-expanded", "false"); return; }
      if (!open) {
        var def = document.createElement("span");
        def.className = "term-def";
        def.textContent = D.glossary[t.getAttribute("data-term")];
        t.after(def);
        t.setAttribute("aria-expanded", "true");
        track("term_opened", { term: t.getAttribute("data-term") });
      }
    });

    // The "What this means" panels. The toggle event doesn't bubble, so listen in the capture phase.
    document.addEventListener("toggle", function (e) {
      var d = e.target;
      if (!d || d.tagName !== "DETAILS" || !d.open) return;
      var card = d.closest(".el");
      var name = card && card.querySelector(".el-name");
      if (name) track("detail_opened", { element: name.textContent });
    }, true);

    window.addEventListener("hashchange", function () { readHash(); update(); });
  }

  buildForm();
  readHash();
  buildGlossary();
  wire();
  update();
})();
