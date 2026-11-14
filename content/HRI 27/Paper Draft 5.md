---
date: 2026-11-10
tags: [hri27, sdc, draft]
draft: true
---
> Draft 5. Built on [[Paper Draft 4]], the Nov 9–10 discussion, [[Research questions]], and [[Blog 08. World‐setting]].
> **What changed:** the center is now *ability* (the Socratic core), not privacy. A robot in a shared space can fail people in three ways: doing their work, replacing the people they'd ask, or watching them. Ari has a design answer for each. New behaviors: teach-back, prepared handoff, stepping back. New tension: a body makes a robot more authoritative, so Ari must lower its own authority. Evaluation plan written in the Bickering Benches format.
> Markers: **[TODO]** missing · **[VERIFY]** check before submitting · **[DECIDE]** your call · **[IRB?]** only if the IRB allows · **[EXP n]** from [[Experiments]].
> Length ~2,400 words. Target ~1,900 with 3 figures. Cut candidates are marked ✂.

# What If the Shop Could Talk Back? A Makerspace Robot That Builds Ability Without Taking Over
[DECIDE: title. Alternatives: "Without Taking Their Place: …" / "The Measure of a Teaching Robot"]

Aram Pundik [VERIFY spelling], Aditya De — New York University

## Abstract
Makerspaces put irreversible machines in front of people who have rarely used them. When staff are busy, newcomers increasingly ask AI tools that do the thinking for them. We present Ari [DECIDE: name], a tutor robot built on the open-source Reachy Mini for a shared university shop at NYU. Ari's goal is to help people do what they did not think they could, without taking their place or watching them. It is direct about safety and asks questions about design decisions; it sends students to staff prepared to explain their own choices, and steps back when people talk to each other. Its perception is public: antennas show when it listens, and a visor that anyone nearby can close shows when it sees. [~100 words]

## 1 Introduction
It is evening in a university shop. A first-year student stands at the laser cutter with a file and a sheet of plywood. She saw the machine once, weeks ago, and is not sure she can do this alone. The staff member on shift is helping someone else. She can wait, give up, or ask the phone in her pocket, which will tell her exactly which button to press.

Asking the phone is the easiest option, and it teaches the least. Today's AI agents are built to ship: they decide, act, and hand back a result, so people approve outputs instead of learning the process. People who hand a task to an AI assistant engage less with it and remember less of what they made [Kosmyna et al. 2025, preprint]; students tutored by an unrestricted AI did better in practice and worse once it was taken away [Bastani et al. 2025, VERIFY]. Experienced makers can delegate the tedious parts and keep the decisions. Newcomers cannot yet tell which is which.

Good teaching works the other way. A Socratic teacher builds a person's ability to do something, often something they did not think they could do. The strongest source of that belief in oneself is doing the thing and succeeding [Bandura 1977, VERIFY]. Makerspaces, now common in universities, schools, and libraries [VERIFY: source], are built for exactly this: you learn by deciding with your hands, at a machine whose mistakes are real. [Personal line: "As an industrial designer, I can imagine an object in the morning and hold it by evening. I learned that at a machine, from a person, one decision at a time."]

A robot at the machine could teach this way. But a shop is a shared room, and a helper there can fail people in three ways. It can **do the work for them**, so they never learn. It can **replace the people they would have asked**, so staff and peers stop talking to newcomers. Or it can **watch them**, turning a space that runs on trust into one that runs on surveillance. We ask: **how can a robot in a shared makerspace help newcomers do what they did not think they could, without doing their work, replacing the people around them, or watching the room?**

## 2 Scenario and Setting
**The shop.** The ITP/IMA shop is on the fourth floor of 370 Jay Street in Brooklyn, shared by a graduate program (ITP) and an undergraduate program (IMA) whose classes are open to non-majors. Its three laser cutters (two Epilog Helix Mini, one Epilog Fusion Pro) are among its most used and most consequential machines. Staff approve every material and file before it is cut; some plywood glues release toxic fumes, and double-layer cardboard can catch fire. Our second site is the Tandon Makerspace [VERIFY name], which serves all of NYU. [TODO: permission, date]

**Why we know it.** Both authors teach making in these spaces. The first author has worked in university shops for [N] years, including three years as a teaching assistant in basic design [VERIFY], and works in the ITP shop. The second author, from a software background, has worked at the Tandon Makerspace for a year and a half. The observations below come from that work. [EXP 3 if IRB allows]

**Three features shape the design.**
- *Strangers to the machine, not to each other.* Most first-time laser users are undergraduates, and many graduate students arrive without fabrication experience. They meet the machine rarely, so training fades between visits.
- *Shared machines create queues and onlookers.* Near deadlines, students wait for the lasers (the shop hands out restaurant buzzers to manage the queue) and watch whoever is cutting. Learning by watching is part of how shops pass on skill [Lave & Wenger 1991, VERIFY].
- *A social contract, not a gate.* Some makerspaces lock machines behind card readers tied to training. Ours relies on trust: training, posted rules, and staff on the floor. A sensing robot could quietly add a third model, the camera that watches. Ari is designed to stay a teacher.

The laser is our test case. Library and school makerspaces mostly run 3D printers and desktop lasers with the same approvals, irreversible steps, and queues.

## 3 Users and Stakeholders
Each row is one party in the room: what they need, what goes wrong if the design ignores them, and the design response.

| Party | Needs | If ignored | Ari's response |
|---|---|---|---|
| Newcomer | To succeed on their own, without embarrassment | Waits, gives up, or lets a tool decide | Lift to start; direct on safety; asks about design; teach-back at the end |
| Returning user | One forgotten step, fast | Over-explained | Asks experience once; answers only what is asked |
| Person waiting | To be seen; to know when it's their turn | Ignored or interrupts | Brief head turn; may listen in if the user agrees |
| People nearby | Not to be watched | Filmed without agreeing | Visor closed by default; view limited to the bed; anyone can close it |
| Shop staff | Authority over materials and safety; time for real questions | Bypassed, or flooded with basics | Ari never approves; prepared handoff; staff can silence it |
| The institution | Safety, liability, knowing what happened | Uses Ari as a monitor | Ari keeps no images or names; reports nothing about individuals [DECIDE] |

## 4 The Interaction
**Three ways to fail, three answers.** Every behavior below answers one of the failures in Section 1.

| Failure | Ari's answer |
|---|---|
| Doing the work | The student's hands do everything. Ari is direct only on safety; design choices go back to the student; Ari never gives laser settings. At the end, *teach-back*: the student explains what they'd do next time. |
| Replacing people | *Prepared handoff*: instead of "go ask staff," Ari says "tell Ian what material you chose and why," so the student arrives able to explain, and does the talking. *Stepping back*: when people start talking to each other, Ari lowers its antennas and turns away. |
| Watching the room | Public perception states (below); anyone can close the visor; Ari keeps no images or names and never reports. |

**Public perception states.**

| State | What everyone sees | What Ari senses |
|---|---|---|
| Resting | On its dock, antennas down, visor closed | Nothing |
| Listening | Lifted, antennas up, visor closed | Hears its holder |
| Seeing | Visor raised, head toward the machine bed | Sees the bed; hears its holder |

**Character.** A body makes a robot more authoritative: people follow a physically present robot more readily than one on video [Bainbridge et al. 2011, VERIFY], keep following one that has visibly malfunctioned [Robinette et al. 2016, VERIFY], and pupils accepted robot answers they knew were wrong when the robot seemed smart [Tanzania HRI 2026, VERIFY]. A tutor that wants students to decide must therefore lower its own authority. Ari does this through four modes, each shown by its body:
- *Direct*, for unsafe or irreversible steps. Head toward the machine, plain words, no questions: "Staff need to approve that plywood first."
- *Asking*, for choices a cheap test cut can teach. Ari turns from the machine to the person, lowers its voice, asks one question.
- *Offering*, after two unanswered questions: two or three options with trade-offs; the student chooses. Pure questioning fails novices [Kirschner et al. 2006].
- *Stepping back*, when a person should take over: staff for approval, or two people talking. Antennas down, head turned away.
Ari refuses four things: approving material, giving settings, deciding the design, and reporting on anyone. Its tone is dry and warm; its jokes never target ability or identity.

**A session** (Fig. 2):
1. Staff are busy. Ari rests on its dock. A passer-by walks past; Ari stays still.
2. A student lifts Ari; its antennas rise. "What are we making?" It asks once whether she has used this laser.
3. At the laser: "I can help more if I can see the bed. Want to open my visor?" She raises it.
4. File and material check, direct. Then: "Before it goes in, tell Ian which plywood you picked and why."
5. She explains her choice to Ian. Ari lowers its antennas and turns away while they talk.
6. A student arrives to wait. Ari turns to him briefly and asks her: "Mind if he listens in?"
7. A neighbor leans over the bed and closes the visor. "I can't see now. That's fine." Ari continues by voice.
8. The test cut didn't go all the way through. The cause is procedure, so Ari is direct. The design is hers, so Ari turns to her and asks what she would change.
9. Teach-back: "Next time I'm not here. What do you do first?" She answers; Ari adds one thing she missed. She docks it; antennas fall.

## 5 Design Goals and Constraints
**Goals.**
- G1 Build ability: a newcomer completes a first cut with their own hands and decisions, and can explain how they'd do it again.
- G2 Strengthen, don't replace, human help: every staff contact is a prepared one; Ari yields when people talk.
- G3 Make Ari's perception and attention legible to everyone present.
- G4 Give people who didn't choose Ari a way to limit it.
- G5 Carry the shop's rules without recording the people who follow or break them.

**Constraints.**
- *Social:* Ari never calls out to passers-by; never pushes a student to teach a stranger.
- *Physical:* laser exhaust and shop noise; voice latency of [EXP 0] s; head, body rotation, and two antennas are the only expressive channels.
- *Ethical:* who controls what Ari hears matters as much as what it sees. We assume deployment on models hosted by the institution and grounded in the shop's own documents. The prototype uses commercial cloud services for speech and reasoning; we disclose this, and Ari says so at the start of each session.
- *Practical:* two students, one borrowed robot, two weeks to submission.

## 6 Design Process and Rationale
**Enactment.** We acted the session twice in the shop (Oct 9 and 13). It turned instructions read aloud into dialogue and made "staff are busy" the opening trigger.

**Character.** We started from the platform's general-assistant profile and tested several personas. Personas built on identity labels failed: the synthetic voice cannot carry an identity, so the label reached only word choice, and the model fell back on clichés. We replaced labels with stated behavior: when Ari is direct, when it asks, when it steps back, what it refuses. A character label is not a character.

**Knowledge.** Instead of training a model, we wrote two grounding documents from the shop's staff handbook: shop facts and hard rules, and a tutoring playbook. Testing showed the hard rules reached only the slower reasoning model, one turn late, so Ari could answer a hazard with a question. We moved them into the voice model. [EXP 0: x/8 → y/8]

**Form.** We rebuilt the robot in CAD from its URDF and made four mockups: a faceted shell, a form study beside the machines, a weighted carry prototype with a lantern grip, and a rounder iteration. Critique argued that rounded forms read as more approachable [Shape symbolism, VERIFY]. Fabrication sets a second constraint: wood veneer bends on one axis only. The resulting form uses flat faces joined by single-axis bends, veneer laminated over a 3D print, so Ari reads as made from the shop's own materials. [DECIDE: confirm]

**Critique.** At a class pin-up, peers said talking to Ari didn't feel private, that it was unclear when Ari knew it was addressed, and that it misheard non-native accents. These led to the listening antennas and lift-to-start. [IRB?]

**Alternatives considered.**
- *Assistant vs. tutor:* an assistant that operates the machine deskills its user [Bainbridge 1983].
- *Referral vs. prepared handoff:* "go ask staff" is a sign on the wall. A student who arrives able to explain their choice gets a better conversation.
- *Peer handoff:* asking the finished student to show the next one fits shop culture, but some people won't want to teach a stranger. It stays an offer, never a push.
- *Watching vs. teaching:* instrumented makerspaces gain from sensing tools and users [Smart Makerspace, VERIFY]; logging would help a shop learn what confuses newcomers. Both turn the tutor into a recorder. We keep only anonymous counts of topics [DECIDE with Aditya].
- *LED vs. physical visor:* people trust physical shutters more than lights [PrivacEye; Windl et al. 2024, VERIFY].
- *Wake word vs. lift to start:* a wake word means always listening to the room; lifting shows who Ari serves.
- *Phone vs. body:* a phone can hold the same knowledge, but cannot show the room whom it attends to or what it sees [Mutlu et al. 2009, VERIFY]. ✂ if short of space

## 7 Expected Experience, Failure Modes, and Planned Evaluation
**Expected.** Newcomers will ask Ari what they would not ask staff, since a robot does not judge [Lucas et al. 2014, VERIFY]. Staff will get fewer basic questions and better-prepared ones. People nearby will ignore a resting Ari and notice a raised visor.

**Failure modes.**
- *Hazard answered with a question.* Hard rules in the voice model; fixed, staff-approved wording.
- *Ari still replaces people:* asking a machine displaces asking each other [Stack Overflow decline, del Rio-Chanona et al. 2024, VERIFY]. Prepared handoffs and stepping back are our answer; whether they work is an open question.
- *Over-trust:* the body lends Ari authority it should not have.
- *The institution asks for logs* after an accident. Ari has none; the shop loses evidence by design.
- *False reassurance:* a closed visor may suggest Ari hears nothing.
- *Exclusion:* misheard accents; deaf users cannot use a voice robot. [DECIDE: stated limitation]
- *Stepping back needs sensing:* detecting that two people are talking, with the camera closed, is unsolved; in the prototype it is triggered by the user's words or puppeted.

**Planned evaluation.** [Follows the Bickering Benches format; ethics review requested]
RQ1: Does Ari raise newcomers' confidence that they could run the laser alone, compared with a phone assistant holding the same knowledge? RQ2: Can people nearby tell what Ari senses and whom it addresses?
Conditions: (A) general phone assistant, (B) phone running Ari's prompt and documents, (C) Ari. B vs. C isolates the body. About 12 newcomers, between-subjects, a staff member present. Measures: laser-specific self-efficacy before and after [VERIFY scale], task completion, staff contacts and whether they were prepared, hard-rule events, a short interview; a bystander answers the RQ2 questions. Pilot: [EXP 1 legibility check, if run].

## 8 Demonstration Plan and Remaining Work
**Videos.** Submission video (≤3 min): a short story set in the shop on a busy evening, with titled scenes for each signal (resting, listening, seeing, anyone can close, asking, stepping back, teach-back), in the spirit of Little Signals [Google Seed Studio & Map 2022]. A second, shorter demo video shows Ari's movement and modes. Actors sign releases; puppeted behaviors are labeled.
**At the conference.** Ari on its dock beside a mock laser bed. Visitors lift it, open and close the visor, try to get it to give a setting or tell on someone, and do a teach-back.

| Remaining | By |
|---|---|
| Hard rules in voice model; EXP 0 | Nov 11 |
| Teach-back and prepared-handoff prompts | Nov 11 |
| Visor; antenna listening signal; step-back pose | Nov 12 |
| Lift to start (sensor or puppeted) | Nov 12 |
| Shoot, two sites | Nov 14–15 |
| Wood veneer shell | camera-ready (Jan 2) |
| Planned evaluation | after ethics approval |

**Success criteria (for the demo).** (1) Viewers can tell Ari's state and whom it addresses at every moment. (2) Anyone can stop Ari seeing in one action. (3) No hazard prompt answered with a question. (4) Every staff contact is a prepared handoff. (5) Ari holds no record of individuals.

*The measure of a teaching robot is what people can do when it's gone.*

## Figures [TODO]
1. Hero: Ari at the laser, visor open, a second person waiting in frame.
2. Perception states + the three failures/answers, as one diagram.
3. Session storyboard (from the video stills).

## References [VERIFY all except marked]
Bainbridge 1983 (ironies of automation) · Bainbridge et al. 2011 (physical presence) · Bandura 1977 (self-efficacy) · Bastani et al. 2025 (AI tutoring, PNAS) · del Rio-Chanona et al. 2024 (Stack Overflow) · Hu et al. 2025 (ELEGNT) · Kirschner, Sweller & Clark 2006 · Knibbe et al. 2015 (Smart Makerspace) · Kosmyna et al. 2025 (arXiv:2506.08872, verified) · Lave & Wenger 1991 · Lucas et al. 2014 · Mutlu et al. 2009 · Robinette et al. 2016 · Steil et al. (PrivacEye) · Tanzania LLM-robot tutors (HRI 2026) · Windl et al. 2024 · shape-symbolism paper · Schenk et al. 2026, Bickering Benches (doi 10.1145/3776734.3794604, verified) · Zhang et al. 2025, Social Queue (verified)
Too many for 4 pages: keep ~10. ✂ candidates: ELEGNT, Lave & Wenger, Mutlu, one of the two Bainbridges.
