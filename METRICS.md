# How I'd measure whether this gets used

The redesign is only worth anything if people use it and get something out of it. So I built the counting in from the start, instead of adding it later. This note explains what I count, why, and what I can't tell from the numbers.

Everything here is already wired up in the prototype. You can see it at `prototype/metrics.html`. That page can show your own visits from your browser, or a simulated example. The simulated numbers are made up by a small script (`prototype/metrics.js`) to show the layout. They say nothing about how the design performs.

## What I'm trying to learn

Three questions, in order:

1. **Do people get to an answer?** If the questions get in the way, nothing else matters.
2. **Do they look further?** Reading the summary and stopping can be fine. But if nobody opens a detail, a glossary word or the bill library, the extra content isn't earning its place.
3. **Do they take it with them?** A policy tool is useful when someone can send the result to a colleague or bring it to a meeting. Copying the link and printing are the closest signs of that.

## The numbers

I kept this to six, each with one plain definition.

- **Got to results.** Visits that ended up with a personal result, divided by all visits. The original tool asks four questions before showing anything. This one shows results after the state and one priority, so this is the number that tells me if that change helps.
- **Time to first result.** The middle value, in seconds, from opening the page to seeing results. Visits that start on a shared link should be near zero.
- **Looked further.** Of the visits that got results, the share that opened a "What this means" panel, a glossary word, a bill filter, or the other six protections.
- **Took it with them.** Of the visits that got results, the share that copied the link or printed. The original tool has no way to do either, so there is nothing to compare this with. It's a new behavior, and I'd be curious whether anyone does it.
- **Arrived on a shared link.** The share of visits that began on a link with answers already in it. If this stays near zero, sharing isn't being used, whatever the copy rate says.
- **Friction signals.** How many visits hit "start over", how many ran into an empty bill list, and how many times people changed an answer before results appeared. These are warnings, not goals.

## The events behind them

The page records these, and nothing else. Every event also carries the random visit id, a running number, and the milliseconds since the visit began.

- `session_start`, with whether it came from a shared link and a rough screen size
- `answer_changed`, with which question and which answer
- `results_viewed`, with the state, priorities and stage, plus seconds since the visit began and how many answers were changed first. Only the first time in a visit counts.
- `show_all_toggled`, `detail_opened`, `term_opened`
- `bill_filter_used` (once per control per visit) and `bills_empty`
- `link_copied`, `print_clicked`, `reset`

## Privacy

I wanted this to be something I'd be comfortable explaining to a stranger.

- No cookies, no accounts, no IP lookup, no fingerprinting.
- The visit id is a random string kept in memory only. Reload the page and it's a new visit. That means I can't count returning visitors, and I'm okay with that.
- No free text. A search box is recorded as "used", never as what was typed. The code only keeps a short list of allowed fields, and each value is cut to 40 characters.
- If the browser sends Do Not Track or Global Privacy Control, nothing is sent anywhere.
- By default, nothing is sent at all. Events stay in the visitor's own browser (localStorage), and the footer of the page says so. If I later turn on sending, I'll change that sentence before I do.

## What these numbers can't tell me

- **They count actions, not understanding.** Someone can copy a link and never read it. The usability tests, if I run them, answer "did they understand?" Metrics only say "did they do something?"
- **Percentages on a small number of visits are noise.** The metrics page says so when there are fewer than 30 visits. Even with a few hundred, I'd look at the direction over weeks, not any single day's figure.
- **There's no comparison group.** I can't see how the original tool does on these numbers, so I can't claim the redesign is better. I can only say what happens on this page.
- **Counting resets on reload,** so a person who comes back three times looks like three visits.

## If I turn sending on later

The tracker already supports it. In `tracker.js`, setting `window.NAV_TRACK_CONFIG = { endpoint: "https://.../events" }` before the script loads makes it send batches of events when the page is hidden. The Managed Analytics website runs on a Cloudflare Worker with a D1 database, so the natural next step would be a small endpoint there that:

1. accepts a batch of events,
2. checks every field against the same allowed list,
3. stores them in a table with no IP address and no user agent,
4. rejects anything bigger than a few kilobytes.

I haven't built that endpoint. Until I do, nothing leaves anyone's browser.
