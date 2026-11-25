/* A small, privacy first event tracker.
 *
 * What it does:
 *   - Records a short list of named events about how people use the page.
 *   - Keeps them in this browser's localStorage so the metrics page can show them.
 *   - Sends nothing anywhere unless you set an endpoint (see config below).
 *
 * What it never does:
 *   - No cookies, no accounts, no fingerprinting, no IP lookup.
 *   - No free text. A search box is recorded as "used", never as what was typed.
 *   - The session id lives in memory only, so a reload is a new session.
 *   - If the browser sends Do Not Track or Global Privacy Control, nothing is sent.
 */
(function () {
  "use strict";

  var KEY = "nav_events_v1";
  var MAX_STORED = 800;
  var cfg = window.NAV_TRACK_CONFIG || {};
  var endpoint = cfg.endpoint || "";

  var optedOut =
    navigator.doNotTrack === "1" || window.doNotTrack === "1" || navigator.globalPrivacyControl === true;

  var started = Date.now();
  var seq = 0;
  var changesBeforeResults = 0;
  var gotResults = false;
  var sid = Math.random().toString(36).slice(2, 10);
  var queue = [];

  // Only these keys are ever kept, and only short plain values.
  var ALLOWED = ["state", "priorities", "stage", "field", "value", "control", "term", "open",
    "element", "shared", "width", "ms_since_start", "changes_before"];

  function clean(props) {
    var out = {};
    if (!props) return out;
    ALLOWED.forEach(function (k) {
      if (!(k in props)) return;
      var v = props[k];
      if (typeof v === "string") out[k] = v.slice(0, 40);
      else if (typeof v === "number" || typeof v === "boolean") out[k] = v;
    });
    return out;
  }

  function readStore() {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; }
  }

  function writeStore(list) {
    try { localStorage.setItem(KEY, JSON.stringify(list.slice(-MAX_STORED))); } catch (e) { /* storage can be blocked */ }
  }

  function flush() {
    if (!endpoint || optedOut || !queue.length) return;
    var body = JSON.stringify({ events: queue });
    queue = [];
    try {
      if (navigator.sendBeacon) navigator.sendBeacon(endpoint, new Blob([body], { type: "application/json" }));
    } catch (e) { /* a lost batch is fine */ }
  }

  function track(name, props) {
    var p = clean(props);
    var ms = Date.now() - started;

    if (name === "answer_changed" && !gotResults) changesBeforeResults++;
    if (name === "results_viewed") {
      if (gotResults) return;            // count the first time only
      gotResults = true;
      p.ms_since_start = ms;
      p.changes_before = changesBeforeResults;
    }

    var ev = { sid: sid, seq: seq++, t: ms, name: name, props: p };
    var list = readStore();
    list.push(ev);
    writeStore(list);

    if (endpoint && !optedOut) queue.push(ev);
  }

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") flush();
  });
  window.addEventListener("pagehide", flush);

  window.NavTrack = {
    track: track,
    getEvents: readStore,
    clear: function () { try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ } },
    config: { endpoint: endpoint, optedOut: optedOut }
  };

  // The first event of every visit. "shared" is true when someone arrives on a link that already carries answers.
  var w = window.innerWidth;
  track("session_start", {
    shared: /(^|[#&])s=/.test(location.hash),
    width: w < 600 ? "small" : w < 1024 ? "medium" : "large"
  });
})();
