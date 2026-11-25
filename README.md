# Data Center Policy Navigator: a redesign concept

This project is a design exercise. I took a real public tool, the Data Center Policy Navigator from Climate Cabinet Education (tamingdatacenters.com), walked through it as a first-time user, wrote down what worked and what tripped me up, and then built a small working redesign to show how I'd fix it.

I'm not connected to Climate Cabinet, and nobody asked me to do this. The redesign is not their tool and shouldn't be used for real decisions. It's a portfolio piece.

## Why I picked this tool

Data center policy is hard to explain. Every state is different, the vocabulary is dense, and the people who need it (residents, local staff, legislators) don't have a lot of time. The Navigator takes that on with a short four-question flow, and it does a lot of things well. I wanted to see if I could make the part after the questions work harder for the reader.

## What's in this folder

- `notes/01-walkthrough-notes.md` has my raw notes from walking through the live tool: 27 things I noticed, good and bad.
- `audit/02-heuristic-audit.md` turns those notes into a proper review against the ten usability heuristics, with a severity rating for each problem and a top 10 list.
- `usability-tests/03-test-plan.md` and `04-session-sheet.md` are the test plan and a blank session sheet. I wrote them but I haven't run the tests yet. More on that below.
- `prototype/` is the redesign itself. It's plain HTML, CSS and JavaScript, with no build step.
- `METRICS.md` explains how I'd measure whether people actually use it, and what those numbers can't tell me.

## What the redesign changes

Each change answers something I found in the audit.

- **One screen, with results that update as you go.** The original asks four questions on four screens. In my version you pick a state and what worries you, and the answer appears below straight away. There's no Continue button, so nothing moves under your finger. (On step 3 of the original, picking a priority shifted the page and my next click changed my answer.)
- **The answer comes first.** The page opens with one sentence, something like "In Texas, 4 of the nine protections aren't in place yet... start with these three," followed by three cards that each say why they're there.
- **You can share what you found.** The answers live in the page link, and there are buttons to copy it or print it. The original has no way to share or save a result.
- **The bill library starts with what matters to you.** It opens on bills that match your priorities, with search, a status filter and sorting. You can show everything with one switch, so bills without topic tags can't get lost.
- **One question went away.** The original's "Focused or Comprehensive?" only changes how many cards get highlighted, because all nine protections show either way. In mine, the other six are one click away.
- **Plainer, more accessible basics.** Real headings, labeled controls, a skip link, a page title that changes with the result, status shown with words and symbols (not just color), clickable glossary words, and a layout that works on a phone.

## Try it yourself

You don't need to install anything. Opening `prototype/index.html` in your browser should work. I tested it through the local server below, not by opening the file directly, so if the "copy link" button misbehaves that way, use the server.

To run it from a local server, from the project folder:

```bash
python -m http.server 8765 --directory prototype
```

Then go to `http://localhost:8765`. A link with answers already in it looks like this: `http://localhost:8765/#s=TX&p=clean,communities`.

To see what the page counts, open `prototype/metrics.html`. It shows your own visits from your browser, or a simulated example with made up numbers, clearly labeled.

## How I measure it

I built the counting in from the start. The page records a short list of anonymous actions, like whether results were shown, whether the link was copied, or whether someone started over. It uses no cookies, never records what someone types, and by default sends nothing anywhere. Everything stays in the visitor's own browser. `METRICS.md` has the six numbers I'd watch, what each one means, and why I'd be careful reading them.

## What I haven't done, and what you shouldn't take from this

I'd rather say this up front than have you find it.

- **I haven't run the usability tests.** The audit is one person's expert review, which is mine. I haven't checked it with real people, so I can't say how many people would actually hit these problems. Some of my findings might turn out to be wrong.
- **The data is hand copied and unchecked.** The state details, project counts and bill list come from the live tool, copied by hand on 25 Nov 2026, for Virginia and Texas only. I wrote the short descriptions and bill summaries in my own words. I haven't checked any of it against the original sources.
- **Two bills look wrong on the original tool.** Texas SB 6 is labeled "failed" but its summary says "this law requires." Delaware HB 233 is labeled "introduced" but its summary says "this law sets." I've marked both on the page and left them unresolved.
- **The ranking is mine.** The "start here" cards are chosen by a simple scoring rule I wrote, not by Climate Cabinet's method. The page says so, and the rule is in `prototype/app.js`.
- **I haven't tested with a screen reader or just a keyboard.** I ran automated checks on headings, landmarks, labels and duplicate ids, and fixed what they found. That isn't the same as someone using assistive technology.
- **Nothing is collected anywhere yet.** The tracking runs in your browser only. I haven't built an endpoint to receive it.
- **It's not on the Managed Analytics website yet.** That comes later.

## Data and credits

The state facts, facility counts and bill labels come from the live Data Center Policy Navigator by Climate Cabinet Education, which credits FracTracker, Cleanview and LegiScan for its data. The names of the nine protections follow the framework they publish. Everything else, including the audit, the test plan, the prototype and the wording of the descriptions, is mine.

## What I practiced

This was a chance to work on a few things I care about:

- turning a complicated policy topic into something a non-expert can use,
- designing for phones from the start,
- accessibility, and checking my own work for it,
- building measurement in before launch and being honest about what the numbers can't say,
- writing documentation another person could pick up.

Built by Osei Akoto Kwarteng.
