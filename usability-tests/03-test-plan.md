# Usability test plan: Data Center Policy Navigator

**Tool being tested:** tamingdatacenters.com (the live, current version)
**Plan written:** 25 Nov 2026
**Facilitator:** Osei Akoto Kwarteng

The [heuristic audit](../audit/02-heuristic-audit.md) is just my opinion. This plan is how I check it with real people. Each task below is there to answer a question the audit raised.

I'm not connected to Climate Cabinet. This is a study I'm doing on my own, and I'll tell every participant that.

## What I want to find out

Each question below comes from a finding in the audit. The numbers in brackets point to the audit and my notes.

1. Do people understand what the tool is for in the first few seconds? [#24]
2. Do people understand "project status" and "scope" without help? [#6]
3. Does the step 3 layout shift cause real mistakes, and can people find the Continue button? [#1, #23]
4. Do people notice the optional second priority? [#1]
5. Does anyone care about the Focused vs Comprehensive choice, or understand it? [#5, #12]
6. Can people find the three most important actions on the results page quickly? [#8]
7. Do people understand the "In place / Partial / Not in place" chips and the element numbers? [#7]
8. Can people find a useful example bill in the Bill Library? [#15, #16]
9. What do people do when they want to share or save results? [#13]
10. Can people find a definition for a term they don't know? [#24, audit heuristic 10]
11. Can someone on a phone find all the results tabs? [#9]

## Who I'll test with

**Five people.** For finding the biggest usability problems, a small group is enough. It's not a statistically valid sample, and I won't present it as one.

| Slot | Who | Why |
|---|---|---|
| P1, P2 | Adults who care about their community but have no policy background (for example, a renter, a homeowner, or a student in another field) | Closest to the "anyone" the tool says it serves |
| P3, P4 | People with some policy or government knowledge (public policy students, local government staff, advocacy or research staff) | Closest to the Get help audience (legislators and staffers) |
| P5 | Anyone, but doing the whole test **on their own phone** | Checks the mobile problems |

**Screener (three questions, no personal data collected beyond this):**
1. Have you used the Data Center Policy Navigator before? *(Exclude "yes")*
2. How would you describe your knowledge of energy or utility policy? *(None / A little / Work with it)*
3. Which device do you usually use for web research? *(Laptop / Phone / Both)*

**Where to find people:** classmates and colleagues at ASU and NAU (outside the Economic Policy Institute project team), Flagstaff and LA community contacts, and friends of friends. No one should be someone who has seen my notes. No payment is involved, so I'll offer a thank-you and a copy of my findings.

## Format

- **One person at a time,** about 25 minutes, on Zoom (screen share) or in person.
- **Think aloud.** I ask them to say what they're thinking as they go.
- **I stay quiet.** I'm there to watch, not to help. If they ask "what does this mean?", I say "what would you expect it to mean?"
- **Record with permission only.** If someone says no, I take notes by hand.
- **Pilot first.** Run the whole script once with a friend and fix anything that doesn't work.

## Setup

- A fresh browser window with cookies cleared, so there are no saved answers.
- Two scenario cards (below). Alternate them: P1 and P3 get Virginia, P2 and P4 get Texas, P5 chooses either.
- A timer, and the [session sheet](./04-session-sheet.md) for each person.
- Participant labels are P1 to P5. No names in notes or files.

## Scenario cards

**Virginia card**
> You live in Virginia. You've heard that data centers are being built in your area and you're worried about your electricity bill. You want to understand what policy options exist and what's already in place.

**Texas card**
> You work for a local organization in Texas. A new data center has been proposed near you and you want to understand what protections the state has and which ones matter most before the project is approved.

## Test script

### Welcome (2 minutes)

Read this out:

> Thanks for helping. I'm testing a website, not you. There are no wrong answers, and you can't break anything. If something is confusing, that tells me the site needs work. Please say your thoughts out loud as you go. I'm not part of the team that made this site, so you won't hurt anyone's feelings. May I record the screen and your voice? I won't share the recording and I'll use your label (P1, P2, etc.) instead of your name. You can stop at any time.

Wait for a clear yes before recording.

### Task 0: first impression (2 minutes)

Open the landing page. Say nothing. After 10 seconds, say:

> Without clicking anything, what do you think this site is for? Who is it for?

*Don't help. Write down their exact words.*

### Task 1: answer the four questions (5 minutes)

> Please read this card, then use the site like you normally would. [Hand over scenario card.]

*Watch for:*
- Do they hesitate on step 2 (project status)? What do they pick?
- On step 3, do they find the second priority? Can they see Continue without scrolling? Do they click the wrong thing after picking?
- On step 4, do they pause? Can they say what Focused vs Comprehensive means?
- Any "what does this mean" questions.

*After step 4:* "In your own words, what's the difference between Focused and Comprehensive?"

### Task 2: top actions (3 minutes)

When the results appear:

> Based on what you see, what are the most important things your state could do first? Please tell me when you've found your answer.

*Start the timer. Stop when they give an answer. Write down what they said and where they found it.*

### Task 3: reading the status (2 minutes)

> Pick one policy element. Is your state already doing something about it? How can you tell?

*Watch for the chips (In place / Partial / Not in place) and whether they understand the 1 to 9 numbers.*

### Task 4: find an example bill (4 minutes)

> Say you want to see how another state has dealt with [Virginia: electricity bills / Texas: local siting and water]. Can you find an example bill?

*Watch for:* whether they find the Bill Library, whether they notice the filters, whether they find a relevant bill, and how long it takes.

### Task 5: share the results (2 minutes)

> A colleague asked what you found. How would you send them your results?

*Do not suggest a way. Watch what they try: copy the URL? screenshot? print? search the page? Then ask "what would you have expected to find here?"*

### Task 6: change your mind (1 minute)

> Suppose you now care more about protecting local communities than about electricity bills. Can you change that?

*Watch for the "Edit this answer" buttons and whether "Start over" gets used instead.*

### Task 7: look up a term (2 minutes)

> The page mentions "cost socialization." How would you find out what that means?

*Watch for the Glossary and how long it takes. Note if they search the web instead.*

### Task 8 (P5 only, on their phone): tabs (2 minutes)

> Find out where you'd go for help drafting a bill.

*Watch whether they see all tabs on the results page and whether the "Updated" label gets in the way.*

### After the tasks (3 minutes)

1. "What was the most confusing part?"
2. "What did you like?"
3. "Who do you think this site is for?"
4. "If you could change one thing, what would it be?"
5. "Would you use this again, or send it to someone? Why or why not?"

Then give the 10 SUS questions (below).

## What I'll measure

| Measure | How | Notes |
|---|---|---|
| Task success | Pass / Partial / Fail, using the criteria below | I decide in advance, not afterward |
| Time on task | Timer | Only for tasks 1, 2, 4 and 7 |
| Mistakes | Count of wrong clicks, backtracking, and answers changed by accident | Especially step 3 |
| Ease rating | After each task: "Overall, how easy or difficult was this task?" 1 (very difficult) to 7 (very easy) | A standard single-question measure |
| Overall usability | System Usability Scale (SUS), 10 questions, 1 to 5 | Scored the usual way, then × 2.5 |
| Quotes | Short quotes, labeled with P1 to P5 | |

### Success criteria

| Task | Pass | Partial | Fail |
|---|---|---|---|
| 0 | Says it's about data center policy and names a fitting audience | Gets the topic but not the audience | Doesn't get it |
| 1 | Finishes all four steps with answers that match the scenario and no accidental changes | Finishes but changes an answer by accident, or needs a hint | Can't finish, or gives up |
| 2 | Names at least two of the highlighted elements within 60 seconds | Names one, or takes longer | Can't, or names something else |
| 3 | Correctly reads a status and says how they know | Correct but can't say how | Wrong |
| 4 | Finds a relevant bill within 2 minutes | Finds a bill but not a relevant one, or needs a hint | Can't find the library |
| 5 | Finds a way to send the results that actually works | Uses a workaround like a screenshot | No way found |
| 6 | Uses "Edit this answer" | Uses "Start over" | Can't change it |
| 7 | Finds the Glossary entry | Finds it after searching the web | Doesn't find it |
| 8 | Finds the "Get help" tab and the right card | Finds the tab but not the card | Can't |

### System Usability Scale (SUS)

Ask for 1 (strongly disagree) to 5 (strongly agree):

1. I think I would like to use this website frequently.
2. I found the website unnecessarily complex.
3. I thought the website was easy to use.
4. I think I would need help from a technical person to use this website.
5. I found the various parts of the website were well put together.
6. I thought there was too much inconsistency in this website.
7. I imagine most people would learn to use this website very quickly.
8. I found the website very awkward to use.
9. I felt very confident using the website.
10. I needed to learn a lot of things before I could get going with this website.

*Scoring:* for odd items, subtract 1 from the answer. For even items, subtract the answer from 5. Add them up and multiply by 2.5 to get a score out of 100. With five people, I'll report the numbers as a rough guide only, never as a precise result.

## How I'll work through the results

1. Put each issue on a card: what happened, who it happened to, and which task.
2. Group the cards. An issue seen by 3 or more of 5 people is a pattern. One or two people is a "watch for it".
3. Rate each pattern again using the same 0 to 4 severity scale as the audit.
4. Compare to the audit. For each audit finding, mark: **confirmed**, **partly**, **not seen**, or **new issue**. Say clearly when the audit was wrong.
5. The redesign (next step) is built from the confirmed patterns only.

## Research ethics

- Voluntary, with consent before recording and the right to stop at any time.
- No names, emails, or other personal details in any file, repo, or portfolio page.
- Recordings stay on my own computer and are deleted after I've written up the notes. Only short written quotes are kept.
- I'll tell participants I'm not part of Climate Cabinet, and I'll make clear that this is a learning project.
- Before I publish anything that criticizes the tool, I'll share a draft with the Climate Cabinet team if I can find a contact. I'll also check my own claims, like the bill status labels, against the original sources.

## What this can't tell me

- Five people can show me where people get stuck. They can't tell me how many people get stuck.
- People I know may be more polite or more patient than strangers would be.
- The site is live and could change between sessions. I'll write down the date of each session and re-check the specific problems before I publish anything.
- I found the issues and I'm also running the tests, so I might see what I expect to see. That's why the script is neutral and I'm writing the pass/fail rules before the first session.

## Schedule

| When | What |
|---|---|
| Day 1 | Recruit participants. Pilot the script with one friend and fix it |
| Days 2 to 4 | Run the five sessions, writing up notes the same day |
| Day 5 | Go through the notes, compare to the audit, and write up what I found |

## Files for this step

- [04-session-sheet.md](./04-session-sheet.md): a blank sheet to copy for each participant.
