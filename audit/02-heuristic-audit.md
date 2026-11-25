# Heuristic audit: Data Center Policy Navigator

**Tool reviewed:** tamingdatacenters.com (Climate Cabinet Education)
**Reviewed on:** 25 Nov 2026
**Reviewer:** Osei Akoto Kwarteng
**Method:** Nielsen's ten usability heuristics, applied by one evaluator

Nobody asked me to do this review, and I'm not connected to Climate Cabinet. I picked this tool because it takes on a hard design problem: making a complicated policy topic usable for a non-expert in a couple of minutes. It does a lot of things well, so I've listed those too.

## How I did it

- I walked the tool the way a first-time user would, on desktop and on a phone-sized screen (375px wide).
- I went through two paths. Path A: Virginia, state as a whole, "promote clean energy supply", Focused. Path B: Texas, a project seeking approval, "protect host communities" plus "tie subsidies to results", Comprehensive.
- I opened every results tab (Overview, state landscape, Policy Pathway, Your resources, Get help) and checked the glossary and bill library.
- I ran a quick check of the page structure (headings, landmarks, alt text, link and button names). This is a quick look, not a full accessibility audit.
- Raw notes are in [notes/01-walkthrough-notes.md](../notes/01-walkthrough-notes.md). The numbers in brackets below, like [#13], point to the numbered notes there.

## What I could not cover

- I tested two of the five states, and only with my own answers. Georgia, Illinois, and Pennsylvania may behave differently.
- I haven't tested with real users yet. Everything here is an expert opinion and needs checking in the usability tests (next step).
- I didn't test keyboard-only use or a screen reader. The accessibility notes below are signals, not conclusions.
- A few content issues (bill status labels, possible typos in project names) need to be checked against the original sources before anyone calls them errors.

## Severity scale

I used the usual 0 to 4 scale.

| Score | Meaning |
|---|---|
| 0 | Not a usability problem |
| 1 | Cosmetic. Fix if there's time |
| 2 | Minor. Low priority, but worth fixing |
| 3 | Major. Fix soon; users will struggle or lose trust |
| 4 | Blocker. Fix before anything else |

I didn't find anything I'd call a 4. The tool works, and nobody gets stuck. The problems are about people losing time, losing trust, or not being able to take their results anywhere.

## The short version

The Navigator is clear, short, and upfront with the reader. The four questions are easy to follow, the framework is easy to scan, and I like that it tells you when the data was last updated. Where it falls short is what happens after you get your results. You can't share them, save them, or narrow the bill library down to what you care about. The questions before that also have a couple of traps, and one question that doesn't really change anything.

### Top priorities

| # | Problem | Severity | Effort to fix |
|---|---|---|---|
| 1 | Results can't be shared, saved, printed, or reopened by link [#13] | 3 | Medium |
| 2 | On step 3, picking a priority shifts the page and the Continue button ends up far below the fold; my next click changed my answer [#1, #23] | 3 | Small |
| 3 | The results page has no one-line takeaway; everything is behind "click to see" [#8] | 3 | Small |
| 4 | Bill Library ignores your state and priority, has no sort or search, and some bills have no tags [#15, #16] | 3 | Medium |
| 5 | Content looks inconsistent in places: bill status vs summary, typos, mixed stage names [#17, #18, #20] | 3 | Small (but needs a source check) |
| 6 | Page structure may be hard for screen readers: no real section headings, no main landmark, unlabeled step buttons, repeated "Get help" links, same title on every page [#10, #11, #25, #26] | 3 | Small to medium |
| 7 | Step 4 (Focused vs Comprehensive) changes very little, and its fact box doesn't help [#4, #5, #12] | 2 | Small |
| 8 | "A particular project" never asks which project [#21, #22] | 2 | Medium |
| 9 | On a phone, the results tab bar is cut off by the "Updated" label [#9] | 2 | Small |
| 10 | "Start over" wipes everything with no confirmation [#14] | 2 | Small |

## Findings by heuristic

### 1. Visibility of system status

**Doing well**
- "Step X of 4" is on every step, and a summary strip at the top fills in as you answer.
- The results page repeats your answers back (state, priority, scope), so you know what the page is based on.
- Each tab has an "Updated: [date]" label. That's a good, honest way to show freshness.

**Problems**
- The three tabs I looked at show different dates (Sep 16, Sep 15, Sep 8) with no explanation. A careful reader may wonder if something is out of sync. [#19] *(Severity 1)*
- After you pick a priority on step 3, nothing signals that a second section has appeared below. [#1] *(Severity 2, see heuristic 5)*

### 2. Match between the system and the real world

**Doing well**
- Section titles on the Overview are written as questions people actually ask ("What is the current data center landscape where I live?").
- Element names are in plain language ("Cause-and-pay", "Real-cost pricing", "Load flexibility"), each with a one-line explanation.
- The Glossary has about 40 plain-language definitions.

**Problems**
- The same stage is called "proposed", "pre-approval", "seeking approval", and "before approval" in different places. [#20] *(Severity 2)*
- Step labels like "project status" and "scope" are tool language, not the user's language. Someone who isn't a policy person may not know what "scope" is asking. [#6] *(Severity 2)*
- The step 3 fact box mentions "five different kinds of risk", but the page shows four priorities. [#2] *(Severity 2)*

### 3. User control and freedom

**Doing well**
- "Edit this answer" buttons on the results page let you change one answer without starting over.
- Your answers survive a page reload.
- After picking a project on step 2, there's a "Look at Texas as a whole instead" link, which is a nice way back.

**Problems**
- "Start over" resets immediately, with no "are you sure?" and no undo. [#14] *(Severity 2)*
- Results live at one shared URL (`/results`), and my answers seem to be kept in a cookie. Clearing cookies or switching device loses them, and there's nothing to bookmark. [#13] *(Severity 3, see heuristic 7)*

### 4. Consistency and standards

**Problems**
- All five "Get help" cards use the same link text, "Get help →". [#25] *(Severity 2)*
- The step 2 fact box keeps saying "Choosing 'the state landscape as a whole'..." even after you've chosen a project. [#22] *(Severity 2)*
- Content details disagree in places. Texas SB 6 is tagged FAILED but the summary reads "This law requires...". Delaware HB 233 is tagged INTRODUCED but described as "This Delaware law sets...". These might be correct for reasons I can't see, so they need to be checked against LegiScan. [#17] *(Severity 3 if confirmed, since it's a trust problem)*
- Typos: "beneifts", "Gainseville Data Center" (probably Gainesville; not yet checked against the source), and "1 have been fully enacted". [#18] *(Severity 2)*

### 5. Error prevention

**Problems**
- **The step 3 layout shift.** After you choose a priority, a new "optional second priority" section appears and the Continue button moves down to about 1,200px from the top of the page. On a laptop-height window it's off screen. My next click landed on a different card and changed my answer. I only hit this once, so I'd call it "likely, needs testing". [#1, #23] *(Severity 3)*
- "Start over" has no confirmation (see heuristic 3). *(Severity 2)*

### 6. Recognition rather than recall

**Doing well**
- Status chips ("In place / Partial / Not in place today") and phase tags ("Before approval / While it runs / After the deal") make the framework easy to scan.
- Hovering over a framework element shows its full name and status.

**Problems**
- Tab names ("VA Landscape", "Policy Pathway (3)", "Your resources", "Get help") don't say what's inside. [#7] *(Severity 2)*
- The Overview's three sections all say "click to see". There's no one-sentence answer like "In Virginia, the three things to act on first are load flexibility, scenario planning, and new clean supply." Users have to open things to find out what they matter for. [#8] *(Severity 3)*
- The Bill Library opens on all states and all dimensions, not on your state and priority, so you have to re-enter what you already told the tool. [#15] *(Severity 3)*

### 7. Flexibility and efficiency of use

**Doing well**
- Four questions is a good length for a first-time user.
- The Bill Library has filters for dimension and state.

**Problems**
- There is no share, print, save, or download of any kind, and no results URL that carries your answers. A staffer can't send a colleague "here is Virginia, clean energy", or attach the result to an email for a hearing prep. For the audience this tool seems to be built for, this is the biggest gap. [#13] *(Severity 3)*
- The Bill Library renders 26 bills as one long list, with no sort and no search. Three bills (Michigan HB 5790, Maine LD 912, Texas HB 5588) have no dimension tags, so the dimension filter can never find them. [#16] *(Severity 3)*
- A returning expert has to answer all four questions every time. There's no "skip to the bill library" or "jump to my state". *(Severity 1)*

### 8. Aesthetic and minimalist design

**Doing well**
- Clean, calm visual style. Good type hierarchy and generous spacing.
- The mobile layout works: no sideways scrolling at 375px.

**Problems**
- Some fact boxes add noise. "3 sessions it took the strongest state framework to reach its current form" doesn't help anyone answer "Focused or Comprehensive?". [#4] *(Severity 2)*
- Step 4 asks a real question, but the answer only changes how many elements are highlighted. All nine appear either way. Either remove the step or make the two options truly different. [#5, #12] *(Severity 2)*
- The project-count bar at the top of the results page is repeated in the state landscape tab. The "Information resources" tab repeats text from the landing page. [#27] *(Severity 1)*
- The 3% label on the stacked bar is squeezed and cut off on a phone. [#7] *(Severity 1)*

### 9. Help users recognize, diagnose, and recover from errors

I don't have enough evidence for this one. I didn't hit any error messages, and I didn't test things like using Back mid-flow, a slow connection, or an unsupported state. This needs a proper test pass. *(Not rated)*

### 10. Help and documentation

**Doing well**
- The Glossary is useful and written in plain language.
- The "Fact" box on each step explains why the question is being asked.
- The "retroactive policies" note (L-1, L-2, L-3) says honestly which option to try first and when.

**Problems**
- The Glossary has no search, and I didn't find the glossary terms linked from the text where they appear. A reader who hits "Cost Socialization" in a policy description has to leave, open Your resources, then Glossary, and scroll. *(Severity 2, needs confirming)*
- The About section promises "tooltips and expandable notes". I found expandable cards but couldn't find a general tooltip system for terms. *(Severity 2, needs confirming)*
- The "Get help" page is mostly about drafting bills and preparing for hearings. That suits legislators and staffers, but the landing page says the tool is for anyone. A resident or a journalist may feel it isn't for them. [#24] *(Severity 2)*

## Accessibility signals (not a full audit)

From the quick page check and the accessibility tree:

| Signal | What I saw | Why it matters |
|---|---|---|
| Headings | One h1 on the results page and no h2 headings; section titles aren't real headings | Screen reader users navigate by heading |
| Landmarks | Only a `nav` found; no `main` or `footer` on results | Screen reader users jump between landmarks |
| Page title | Same title on every step and on the results page | Hard to tell steps apart in tabs, history, or a screen reader |
| Images | 1 image without alt text on the results page | Missing text alternative |
| Step buttons | Four step indicators with no accessible name | Announced as unlabeled buttons |
| Link text | "Get help →" on five cards; "Edit this answer" on four buttons | Out of context, all sound the same |
| Language and zoom | `lang="en"` and a viewport tag are present | Good |
| Mobile | No sideways scrolling at 375px | Good |

I'd confirm all of this with a screen reader and a keyboard-only pass, plus an automated scan, before presenting any of it as a finding.

## What this means for the redesign

The redesign (a later step) should focus on the end of the journey and on a few places where users could trip:

1. **Make results shareable.** Put the answers in the URL, add a "copy link" button, and add a print or PDF view.
2. **Lead with the answer.** Put a short "In Virginia, start here" summary at the top of the results page. Keep the details one click away.
3. **Fix step 3.** Show the second priority at the same time as the first, or keep Continue pinned in view, so nothing shifts under the user.
4. **Personalize the Bill Library.** Open it on the user's state and priority, add a "show all" toggle, and add sort and search.
5. **Simplify step 4,** or merge it into the results page as a simple "Show me more" toggle.
6. **Fix the accessibility basics.** Real headings, a `main` landmark, unique page titles per step, labeled step buttons, descriptive link text.
7. **Test the open questions.** The usability tests should check whether people understand "project status" and "scope", notice the second priority, and can find the top three actions quickly.

## Next step

Plan and run the usability tests. I'll write the test script and tasks so that each of the "needs testing" items above has a real question behind it.
