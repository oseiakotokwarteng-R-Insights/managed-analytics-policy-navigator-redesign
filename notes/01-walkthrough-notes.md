# Walkthrough notes: Data Center Policy Navigator

Walked through the live tool at tamingdatacenters.com on 25 Nov 2026, as a first-time user. I picked Virginia, "state landscape as a whole", "promote clean energy supply", and "focused". These are raw notes. The heuristic audit comes next and will be built from them.

## What the tool does

1. A landing page explains the problem and the framework, then sends you to the tool.
2. Four questions: state, project status, priority (plus an optional second one), and how many policy elements to show (focused or comprehensive).
3. A results dashboard with three sections: where your state stands today, which policy elements matter for you, and a resource library (bills and links).

Only five states are covered right now: Georgia, Illinois, Pennsylvania, Texas, and Virginia.

## What works well

- The flow is short and clear. Every step says "Step X of 4" and a summary strip at the top fills in as you go.
- Each step has a "Fact" box that explains why the question is being asked. That builds trust.
- The results page shows your own choices back to you (state, priority, scope) and uses plain section titles written as questions ("What is the current data center landscape where I live?").
- Each tab shows an "Updated: [date]" label, which is a good way to show how fresh the data is.
- Your answers survive a page reload. I reloaded the results page and it kept my choices.
- On a phone-sized screen (375px wide) there was no sideways scrolling and the text stayed readable.

## Things that tripped me up or look worth testing

These are observations only. I'll check them properly in the audit and the usability tests.

1. **Step 3 changes shape after you pick.** Once you choose a priority, a "second priority" section appears below the cards and the Continue button moves down. My second click landed on a different card and changed my answer from "ratepayers" to "clean energy". This is probably a layout shift, and it may happen to real users too.
2. **The step 3 fact box doesn't match the page.** It says the framework covers "five different kinds of risk", but the page only offers four priorities. The nine-element framework is never shown to the user before the results page.
3. **The step 2 fact box shows numbers I didn't ask for.** For Virginia it says 460 operating, 23 approved, and 339 proposed, then recommends "the state landscape as a whole". Useful, but it nudges the answer. Is that intended?
4. **The "three sessions" fact on step 4 is hard to connect to the question.** "3 sessions it took the strongest state framework to reach its current form" doesn't help someone choose between Focused and Comprehensive.
5. **Focused vs Comprehensive isn't explained concretely.** The step 4 text says comprehensive plans "can take longer to put in place". That describes the policy, not the dashboard. A user may not realize the choice only changes how many elements are highlighted. The step 2 text says outright that you'll see all recommendations either way.
6. **No "why does this matter to me" before the questions.** Someone who is not a policy person (a resident, a local official) may not know what "project status" or "scope" means in this context.
7. **Results page starts with a lot of dense information.** The summary bar (822 projects, 41% / 3% / 56%) is good, but on a phone-sized screen the 3% label is squeezed and cut off in the stacked bar (I didn't check this on desktop). The tab names ("VA Landscape", "Policy Pathway (3)", "Your Resources", "Get Help") don't say what is inside.
8. **The three results sections are all "click to see".** It's not obvious what you'd get before you click, and there is no overview of the answer in one sentence ("In Virginia, the three things to act on first are...").
9. **Mobile tab bar.** On a phone, the tab row ("Overview", "VA Landscape", ...) shares space with the "Updated" date, so the later tabs are cut off. It's not clear that more tabs exist.
10. **Basic accessibility signals from a quick page check.** The page has a language set and a viewport tag, and an h1. The results page has no `main` or `footer` landmark, no h2 headings (section titles are not real headings), and one image with no alt text. I'll confirm these with a proper audit tool later.
11. **Every page has the same title.** The browser tab says "Data Center Policy Navigator" for every step and for the results, so there is nothing in tab history or a screen reader to tell the steps apart.

## Questions for the usability tests

- Do people understand "project status" and "scope" without help?
- Do people notice and use the optional second priority?
- Can someone find the three most important policy elements within 30 seconds of arriving at results?
- Do people understand the 1 to 9 policy element numbers and the "in place / partial / not in place" colors?
- Is anyone confused about what to do after results (take action, share, download)?
- Can people on a phone find all the tabs?

## Part 2: the rest of the tool (second pass, same day)

I went back through the results tabs and ran a second path: Texas, "a particular project seeking approval", priority "protect host communities" plus "tie subsidies to results" as the second priority, and Comprehensive.

### What each results tab does

- **Overview:** summary of your answers, three "click to see" cards.
- **State landscape (e.g. "VA Landscape"):** how the state makes decisions, a bill-coverage chart by dimension (None / Some / Moderate / Strong / Excellent), and the largest tracked projects by MW.
- **Policy Pathway (3 or 6):** the framework elements that match your answers, a sequence strip, expandable details, then the other elements below, plus three options for dealing with facilities that already exist.
- **Your resources:** Bill Library (26 bills, filters for dimension and state), a Glossary (about 40 terms), and an Information resources page.
- **Get help:** five service cards (assess a bill, compare bills, draft bill language, prepare for a hearing, prepare constituent engagement).

### More things worth testing or fixing

12. **Focused and Comprehensive barely change anything.** In Texas, Comprehensive gave "Policy Pathway (6)" instead of 3, but all nine elements still show on the page either way, because the rest are listed under "Other Policy Elements". Step 4 asks a real question but the answer only reorders and highlights. The tool says as much on step 2 ("we will show you all of our recommendations").
13. **No way to share, print, save, or download results.** I searched the page for share, print, download, PDF, email, save, and copy link. None exist. The results page URL is the same for everyone (`/results`), and my answers seem to be kept in a cookie, not the URL. So a staffer can't send a colleague "here is Virginia, clean energy" as a link.
14. **"Start over" resets instantly with no confirmation.** Fine for a short quiz, but easy to hit by accident from the results page, and then everything is gone.
15. **The bill library ignores your answers.** It opens on all dimensions and all states, not on your state or your priority. It could start filtered to something like "Virginia + clean energy" and let you widen it.
16. **Bill library has no sort and no search.** 26 bills render as one long list. Several have no dimension tags (Michigan HB 5790, Maine LD 912, Texas HB 5588), so the dimension filter can't find them.
17. **Status labels don't always match the description.** Texas SB 6 is tagged FAILED but the summary says "This law requires...". Delaware HB 233 is tagged INTRODUCED but says "This Delaware law sets...". Worth checking against LegiScan; it may be a data issue and not a design issue.
18. **Typos in the content.** "beneifts" (Incentive clawbacks text), "Gainseville Data Center" (probably Gainesville, but I haven't checked the source), and "1 have been fully enacted" (should be "has"). Small, but they hurt trust on a policy tool.
19. **"Updated" dates differ by tab** (Sep 16, Sep 15, Sep 8). That's honest, but nothing explains why, so a reader might think something is out of sync.
20. **Vocabulary drifts.** The same stage is called "proposed", "pre-approval", "seeking approval", and "before approval" in different places.
21. **Step 2 says "a particular project" but never asks which one.** After choosing a project stage, the dashboard is still about the whole state. A user thinking about one project in their county has no way to say so.
22. **Step 2 fact box doesn't change after you pick a project.** It still talks about choosing "the state landscape as a whole", and a new link ("Look at Texas as a whole instead") appears.
23. **Continue is far below the fold on step 3.** With a second-priority section, the button is about 1,200px down the page, so a laptop-height window can't see it without scrolling.
24. **The audience may be narrower than the tool says.** The landing page says "anyone", but Get help is all about drafting bills, preparing hearing questions, and constituent engagement. That's a legislator-staffer audience. Residents and journalists may feel the tool isn't for them.
25. **Every "Get help" card uses the same link text** ("Get help →"). Screen reader users hear five identical links.
26. **Step indicators in the top strip have no accessible names** (the accessibility tree lists four unlabeled buttons). The "Edit this answer" buttons are all named the same, too.
27. **The "Information resources" tab repeats text from the landing page** and doesn't seem to link anywhere (I found no links in the page besides "Back to home"). Worth confirming the whitepaper link works.

## Good things I found in part 2

- **"Edit this answer" buttons** let you change one answer from the results page.
- **Status chips** ("In place / Partial / Not in place today") and the **phase tags** ("Before approval / While it runs / After the deal") make the framework easy to scan.
- **Plain-language element names** and a one-line description for each.
- **The "retroactive policies" note** (L-1, L-2, L-3) is an honest touch. It says outright which option to recommend and when.
- **Short summaries on every bill** that say whether it passed or failed.

## Still not checked

- The tooltips and expandable notes the About section mentions (I found hover text on the framework elements but not a tooltip system).
- Keyboard-only use and screen reader behavior.
- Georgia, Illinois, and Pennsylvania results.
- Performance on a slow connection.
