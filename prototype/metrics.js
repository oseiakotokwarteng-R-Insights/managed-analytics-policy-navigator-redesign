/* Turns raw events into the adoption numbers described in METRICS.md.
 * Works in the browser (window.NavMetrics) and in Node (module.exports) so it can be tested.
 */
(function (root) {
  "use strict";

  var DEPTH = ["show_all_toggled", "detail_opened", "term_opened", "bill_filter_used"];
  var ACTION = ["link_copied", "print_clicked"];

  function median(nums) {
    if (!nums.length) return null;
    var a = nums.slice().sort(function (x, y) { return x - y; });
    var m = Math.floor(a.length / 2);
    return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2;
  }

  function rate(n, d) { return d ? n / d : null; }

  function group(events) {
    var by = {};
    events.forEach(function (e) { (by[e.sid] = by[e.sid] || []).push(e); });
    return Object.keys(by).map(function (k) { return by[k]; });
  }

  function has(list, names) { return list.some(function (e) { return names.indexOf(e.name) !== -1; }); }

  function summarize(events) {
    var sessions = group(events).filter(function (s) { return has(s, ["session_start"]); });
    var total = sessions.length;

    var shared = 0, activated = [], deep = 0, acted = 0, reset = 0, empty = 0;
    var times = [], changes = [], sharedActivated = 0, byDevice = { small: 0, medium: 0, large: 0 };

    sessions.forEach(function (s) {
      var start = s.filter(function (e) { return e.name === "session_start"; })[0];
      if (start.props.shared) shared++;
      if (byDevice[start.props.width] !== undefined) byDevice[start.props.width]++;

      var res = s.filter(function (e) { return e.name === "results_viewed"; })[0];
      if (res) {
        activated.push(s);
        if (start.props.shared) sharedActivated++;
        if (typeof res.props.ms_since_start === "number") times.push(res.props.ms_since_start);
        if (typeof res.props.changes_before === "number") changes.push(res.props.changes_before);
        if (has(s, DEPTH)) deep++;
        if (has(s, ACTION)) acted++;
      }
      if (has(s, ["reset"])) reset++;
      if (has(s, ["bills_empty"])) empty++;
    });

    var avg = function (a) { return a.length ? a.reduce(function (x, y) { return x + y; }, 0) / a.length : null; };

    return {
      sessions: total,
      activated: activated.length,
      deep: deep,
      acted: acted,
      sharedArrivals: shared,
      activationRate: rate(activated.length, total),
      medianSecondsToResults: median(times) === null ? null : median(times) / 1000,
      depthRate: rate(deep, activated.length),
      actionRate: rate(acted, activated.length),
      sharedArrivalRate: rate(shared, total),
      resetRate: rate(reset, total),
      emptyBillsRate: rate(empty, total),
      avgChangesBeforeResults: avg(changes),
      devices: byDevice,
      eventCounts: events.reduce(function (acc, e) { acc[e.name] = (acc[e.name] || 0) + 1; return acc; }, {})
    };
  }

  // Made up sessions, for showing what the dashboard looks like. Never mix these with real events.
  function simulate(n, seed) {
    var a = seed >>> 0;
    function rnd() {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    var out = [];
    for (var i = 0; i < n; i++) {
      var sid = "sim" + i, seq = 0, t = 0;
      var push = function (name, props, dt) { t += dt; out.push({ sid: sid, seq: seq++, t: t, name: name, props: props || {} }); };
      var sharedLink = rnd() < 0.18;
      var r = rnd();
      push("session_start", { shared: sharedLink, width: r < 0.45 ? "small" : r < 0.6 ? "medium" : "large" }, 0);
      var activates = sharedLink ? rnd() < 0.95 : rnd() < 0.72;
      if (!activates) { if (rnd() < 0.12) push("reset", {}, 4000); continue; }
      var changes = sharedLink ? 0 : 1 + Math.floor(rnd() * 4);
      for (var c = 0; c < changes; c++) push("answer_changed", { field: "priority" }, 3000 + rnd() * 9000);
      push("results_viewed", { ms_since_start: Math.round(t + 2000), changes_before: changes }, 2000);
      if (rnd() < 0.55) push(DEPTH[Math.floor(rnd() * DEPTH.length)], {}, 5000 + rnd() * 20000);
      if (rnd() < (sharedLink ? 0.1 : 0.26)) push(ACTION[Math.floor(rnd() * 2)], {}, 5000 + rnd() * 15000);
      if (rnd() < 0.05) push("bills_empty", {}, 3000);
      if (rnd() < 0.05) push("reset", {}, 3000);
    }
    return out;
  }

  var api = { summarize: summarize, simulate: simulate };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.NavMetrics = api;
})(typeof window !== "undefined" ? window : globalThis);
