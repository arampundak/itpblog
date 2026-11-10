---
date: 2026-11-08
tags: [hri27, sdc, draft]
draft: true
---
> Draft 2, restructured from [[Paper Draft 1]] plus existing notes ([[User Journey 2]], [[SDC blurb with Aditya 1]], [[Manifesto notes - ideas from the SDC talks]], [[Grounding Doc 2]]).
> Markers: **[TODO]** = missing, **[VERIFY]** = check before submitting, **[DECIDE]** = your call, **[IRB?]** = only usable if the IRB answer allows.
> Length: ~2,300 words now. Four ACM pages with 3 figures and references fit roughly 1,800–2,000. Expect to cut ~15%.
> Working research question (option B): *If a shared shop could talk back, what should it be allowed to see and hear, and how would everyone in the room know?*

# What If the Shop Could Talk Back? A Shop-Owned Tutor Robot That Makes Its Perception Public

Aram Pundak, Aditya De — ITP / IMA, New York University [VERIFY: Aditya's surname and affiliation]

## Abstract

Makerspaces put powerful machines in front of people who have rarely used them. When staff are busy, newcomers wait, guess, or ask the phone in their pocket, which answers instantly and teaches little. We present Ari, a tutor robot built on the open-source Reachy Mini platform for a shared university shop at NYU. Ari is direct about procedure and safety, and asks questions about design decisions. Because the shop is shared, Ari's perception is public: it is blind and deaf while docked, hears only once someone lifts it, and sees only when its holder raises a physical visor, which anyone nearby can close. We describe the setting, its stakeholders, the interaction, our design process, and expected failure modes. [~100 words — check limit]

## 1 Introduction

A first-year undergraduate stands at the laser cutter with a file and a sheet of plywood. She saw the machine once, in a training weeks ago. The staff member on shift is helping someone else. She can wait, guess, or ask the phone in her pocket, which will tell her exactly which button to press.

Each option teaches her something different. Generative AI makes the third one the easiest, and it is the one that teaches least. Early evidence suggests that people who hand a task to an AI assistant engage less with it and remember less of what they produced [Kosmyna et al. 2025, VERIFY: preprint, n=54, interpret carefully]. Experienced makers can delegate the tedious parts and keep the decisions. Newcomers cannot yet tell which parts are which.

Makerspaces exist to teach by doing [Papert; VERIFY]. We ask what a machine helper should look like in that setting. But a shop is not a private room. Whatever helps one student also sits in front of everyone around her: the person waiting for the same laser, the people working at the next bench, and the staff responsible for the room. A phone's attention is private and invisible. A robot's attention can be public.

Our question: **if a shared shop could talk back, what should it be allowed to see and hear, and how would everyone in the room know?**

[DECIDE: keep one personal line? e.g. "As an industrial designer, I can imagine an object in the morning and hold it by the evening. That ability was taught to me at a machine, by a person, one decision at a time." — strong if short.]

## 2 Scenario and Setting

The ITP/IMA shop occupies part of the fourth floor of 370 Jay Street in Brooklyn. It is shared by a two-year graduate program (ITP) and an undergraduate program (IMA), whose courses are open to non-majors. Both authors work or study in this shop [VERIFY: Aditya's role]. Its lasers (two Epilog Helix Mini and one Epilog Fusion Pro [VERIFY count]) are among the most used and most consequential machines: staff must approve every material, some materials release toxic fumes, and double-layer cardboard can catch fire.

Three features of the space shape the design:

- **Strangers to the machine, not to each other.** Most first-time laser users are IMA undergraduates; many graduate students arrive with no fabrication background. Users meet the machine rarely, so knowledge decays between visits.
- **Shared machines create queues and onlookers.** Near deadlines, people wait beside the laser and watch the current user. [VERIFY with your shift observations: how often? when?]
- **A social contract, not a gate.** Some makerspaces tie machine access to training through card readers. This shop relies on a social contract: training, posted rules, and staff on the floor. Ari sits between the two. It does not lock anything, but it carries the shop's rules to the moment they matter and hands off to staff for every approval.

To test whether the design depends on our own shop, we will stage the same scenario in a second makerspace, [TODO: name — Tandon Makerspace?], which serves all of NYU and its many non-expert users. [TODO: confirm permission and date] The laser is our test case; most library and school makerspaces run 3D printers and desktop lasers with the same structure of irreversible steps, approvals, and queues.

## 3 Users and Stakeholders

| Party | What they need | What goes wrong if ignored | Ari's design response |
|---|---|---|---|
| Newcomer (never used this laser) | Step-by-step help without embarrassment | Waits, guesses, or skips approval | Lift to start; direct procedure; questions only on design choices |
| Returning user (trained, forgot) | One forgotten step, fast | Over-explained, annoyed | Experience check at start; answers only what is asked |
| Project partner | To be included | Ari talks to one person only | Addresses both when a decision comes up [TODO: implemented?] |
| Person waiting for the machine | To know they are seen and when it's their turn | Ignored, or interrupts | Brief head turn to acknowledge; can listen in if the user agrees |
| People working nearby | Not to be watched or recorded | Captured by a camera they never agreed to | Camera covered by default; view limited to the bed; anyone can close the visor |
| Shop staff | Authority over materials and safety | Robot overrides them, or users skip them | Ari never approves; fixed safety lines; handoff to staff; staff can silence Ari |

## 4 The Interaction

**Perception states.** Ari's sensing is tied to physical states that anyone in the room can read from a distance:

| State | What everyone sees | What Ari senses |
|---|---|---|
| Docked | On its dock, visor closed | Nothing: not listening, not seeing |
| Lifted | In someone's hands, visor closed | Hears its holder |
| Visor open | Visor raised, facing the machine bed | Sees the bed; hears its holder |

Two rules make the states multi-party: **only the holder can open the visor; anyone can close it**, and **Ari keeps no images** [DECIDE: confirm; see conflict with data-archiving idea in Paper brief].

**A session** (Fig. 2 storyboard):

1. Staff are busy. Ari sits on its dock, visor closed. A passer-by walks past; Ari stays still.
2. A student lifts Ari. It wakes: "What are we making?" It asks whether she has used this laser before and adjusts its level.
3. At the laser, Ari asks: "I can guide you better if I can see the bed. Want to open my visor?" She raises it.
4. Procedure as dialogue: material check, file setup, focus. Ari is direct here: "Staff need to approve that plywood before it goes in."
5. A second student arrives to wait. Ari turns briefly toward him, then back. It asks the user: "Mind if he listens in?"
6. A neighbor leans over the bed to look. He reaches over and closes the visor. Ari says it can no longer see and continues by voice.
7. The test cut did not go all the way through. Finding the cause is procedure, so Ari is direct. Changing the design is her decision, so Ari turns from the machine toward her and asks quietly what she would change.
8. Staff arrive for the final check, and Ari defers. She returns Ari to its dock; it closes its visor. The waiting student starts a shorter session: "I heard the focus part."

**Direct versus Socratic.** Pure questioning fails novices [Kirschner, Sweller & Clark 2006]. Ari's rule follows consequence: irreversible or unsafe steps get direct answers; reversible choices that a cheap test cut can teach go back to the student. After two unanswered questions, Ari offers options with trade-offs.

## 5 Design Goals and Constraints

**Goals.**
- G1: Help a newcomer reach a first successful cut, with design decisions left to them.
- G2: Make Ari's perception and attention legible to everyone present.
- G3: Give people who did not choose Ari a way to limit it.
- G4: Support staff authority, never replace it.

**Constraints.**
- *Social:* Ari never calls out to passers-by (uninvited interaction). Teasing never targets ability or identity.
- *Physical:* laser exhaust and shop noise; voice-model latency of [TODO: measure] seconds; Reachy Mini's head, body rotation and two antennas as the only expressive channels.
- *Ethical:* today, speech is processed by a cloud voice service and transcripts by a cloud reasoning model. "Ari keeps no images" does not mean "nothing leaves the room." Ari states this aloud at the start of a session. [DECIDE: is this acceptable for the paper, or do we move to a local model?]
- *Practical:* a two-person student team, a borrowed robot, and [12] days to submission.

## 6 Design Process and Rationale

We designed by enacting and building in the shop itself.

**Enactment.** We acted the user journey twice in the shop [Oct 9, Oct 13], which moved the story from instructions read aloud to a dialogue, and made "staff are busy" the opening trigger that answers "why not just ask staff?"

**Character.** The default Reachy Mini profile is a general assistant. Our first Ari profile assigned a demographic identity to get a warmer, more confident character. The voice synthesizer cannot convey age or identity, so the label reached only word choice, and the model fell back on clichés. We replaced it with stated traits: confident, warm, direct on safety, and on the student's side. A character label is not a character.

**Knowledge.** Instead of training a model, we wrote two grounding documents from the shop's staff handbook: shop facts and hard rules, and a tutoring playbook. Testing showed the safety rules reached only the slower reasoning model, one turn late, so Ari could answer a safety question with a question. We moved the hard rules into the voice model's instructions [TODO: done?] and tested with [N] scripted safety prompts [TODO: result before/after].

**Form.** We rebuilt the robot's assembly in CAD from its URDF, then made three mockups: a faceted shell, a form study beside the machines, and a weighted carry prototype with a lantern grip. Critique pushed back on our boxy, machine-like direction: rounded forms read as more approachable [Shape symbolism ref, VERIFY]. [DECIDE: final form direction for the paper]

**Critique.** At a class pin-up, peers reported that talking to Ari did not feel private, that it was unclear when Ari knew it was being addressed, and that it struggled with non-native accents. [IRB? — usable as design feedback only if allowed]

**Alternatives considered.**
- *Assistant vs. tutor:* an assistant that presses the buttons for you deskills the operator [Bainbridge 1983]. We chose a tutor, with the reversibility rule.
- *Always-on camera vs. blind by default:* instrumented makerspaces gain from sensing tool and user state [Smart Makerspace, Knibbe et al. 2015, VERIFY]. We give that up. Safety stays with the machine's interlocks and staff; Ari's camera only helps the holder when invited.
- *LED indicator vs. physical shutter:* people trust physical shutters more than lights [PrivacEye, Steil et al.; Windl et al. 2024, VERIFY].
- *Wake word vs. lift-to-wake:* a wake word requires always listening to the room. Lifting makes participation visible: whoever holds Ari is the one it serves.
- *Phone or screen vs. body:* a phone could hold the same knowledge. It cannot show the room whom it is attending to or what it can see [Mutlu et al. 2009 on gaze and participant roles, VERIFY].
- [DECIDE: Aditya's data-archiving / "ethos node" idea — reject, or present as future work with consent?]

## 7 Expected User Experience and Failure Modes

**Expected.** Newcomers will ask Ari questions they would not ask staff, because a robot does not judge [Lucas et al. 2014, VERIFY]. Waiting students will pick up procedure by listening. Bystanders will ignore a docked Ari and notice an open visor.

**Failure modes.**
- *Socratic on safety:* Ari answers a hazard with a question. Mitigation: hard rules in the voice model; fixed staff-approved wording.
- *Less staff contact:* students use Ari to avoid people. Mitigation: every approval and final check is a handoff.
- *False reassurance:* a closed visor may suggest Ari hears nothing, while a lifted Ari still listens and sends audio to the cloud.
- *Exclusion:* Ari misunderstands non-native accents; deaf users cannot use a voice-only robot. [TODO: captions on a phone or screen? state as limitation]
- *Microphone spill:* in a loud, crowded shop, Ari may hear people near the holder. A directional microphone is an open question.
- *Novelty crowding:* a talking robot draws an audience, making the session less private.
- *Wrong numbers:* Ari never suggests laser settings; those come from staff and test cuts.

## 8 Demonstration Plan and Remaining Work

**Video (3 min):** the session above, filmed in the ITP shop and [second makerspace], with actors who signed releases. Puppeted behaviors are disclosed on screen.
**At the conference:** Ari on its dock beside a mock laser bed. Visitors lift Ari, open and close its visor, and ask it about the machine.

**Done:** working voice tutor on Reachy Mini with shop grounding; journey enacted; form mockups.
**Remaining:**
| Item | By |
|---|---|
| Hard safety rules in voice model; scripted safety test | [Nov 10] |
| Visor (3D-printed), anyone-can-close | [Nov 12] |
| Lift-to-wake (sensor or puppeted) | [Nov 12] |
| Acknowledge-the-queue head turn (puppeted at first) | [Nov 13] |
| Video shoot, two sites | [Nov 14–15] |
| Local voice model or explicit cloud disclosure | Jan 2 |

**Success criteria.**
1. A viewer can tell Ari's perception state and whom it addresses at every moment of the video.
2. Anyone can stop Ari from seeing in one action.
3. Ari answers no scripted safety prompt with a question.
4. Ari defers to staff for every approval and final check.

**Planned evaluation (after approval):** the same session with a phone assistant, a screen, and Ari, measuring task completion, staff handoffs, and bystanders' comfort.

## Figures [TODO]
1. Hero: Ari at the laser, visor open, a second person waiting in frame.
2. Perception states diagram (docked / lifted / visor open).
3. Storyboard of the session, or the stakeholder map.

## References [all VERIFY before submission]
- Bainbridge, L. 1983. Ironies of automation.
- Hu, Y. et al. 2025. ELEGNT: Expressive and Functional Movement Design for Non-anthropomorphic Robot.
- Kirschner, P., Sweller, J., Clark, R. 2006. Why minimal guidance during instruction does not work.
- Knibbe, J. et al. 2015. Smart Makerspace.
- Kosmyna, N. et al. 2025. Your Brain on ChatGPT. arXiv:2506.08872.
- Lucas, G. et al. 2014. It's only a computer.
- Mutlu, B. et al. 2009. Footing in human-robot conversation.
- Steil, J. et al. PrivacEye.
- Windl, M. et al. 2024. Privacy communication patterns for domestic robots.
- [Shape symbolism, rounded vs. angular contours]
- [Social Queue, HRI 2025 SDC; Bickering Benches, HRI 2026 SDC]
