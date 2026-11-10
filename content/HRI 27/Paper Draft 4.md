---
date: 2026-11-09
tags: [hri27, sdc, draft]
draft: true
---
> Draft 4. Built from [[Paper Draft 3]] (your notes are answered or folded in) and [[Paper brief]].
> Markers: **[TODO]** missing · **[VERIFY]** check before submitting · **[DECIDE]** your call · **[IRB?]** only if the IRB answer allows · **[EXP n]** filled by [[Experiments]].
> Big change from Draft 2/3: the question now joins B and C. The robot belongs to the shop, so the real tension is *whose side it is on*. Surveillance stops being a generic privacy add-on and becomes the institutional question: would the shop's robot tell on you?
> Length ~2,500 words. Target for 4 pages with 3 figures: ~1,900. We cut after content is settled.

# What If the Shop Could Talk Back? A Makerspace Robot That Teaches the Rules Without Watching the Room
[DECIDE: title options in Paper brief]

Aram Pundik [VERIFY: Pundik or Pundak — your email says Pundak], Aditya De [VERIFY] — New York University

## Abstract
Makerspaces run on a social contract: training, posted rules, and staff who trust students to follow them. A robot placed in such a space could carry that contract to newcomers at the moment they need it. It could also become the institution's eyes. We present Ari [DECIDE: name], a tutor robot built on the open-source Reachy Mini for a shared university shop at NYU. Ari is direct about safety and asks questions about design decisions. Its perception is public and physical: antennas show when it listens, a visor shows when it sees, only the person holding it can open the visor, and anyone nearby can close it. Ari teaches the shop's rules but does not report who broke them. [~100 words]

## 1 Introduction
It is evening in a university shop. A first-year student stands at the laser cutter with a file and a sheet of plywood. She saw the machine once, in a training weeks ago. The staff member on shift is helping someone at the bandsaw. She can wait, guess, or ask the phone in her pocket, which will tell her exactly which button to press.

Asking the phone is now the easiest option, and it teaches the least. Today's AI agents are built to ship: they decide, act, and hand back a result, so the person approves the output instead of learning the process. Early evidence suggests that people who hand a task to an AI assistant engage less with it and remember less of what they made [Kosmyna et al. 2025, preprint]. Experienced makers can delegate the tedious steps and keep the decisions. Newcomers cannot yet tell which is which. Makerspaces, now common in universities, schools, and libraries [VERIFY: source for growth], exist for the opposite reason: you learn by deciding with your hands, at a machine whose mistakes are physical and irreversible. [Personal line, keep short: "As an industrial designer, I can imagine an object in the morning and hold it by evening. I learned that at a machine, from a person, one decision at a time."]

A robot standing at the machine could help her more than a phone can. It can see the bed, turn to show where to look, and call a person. But a robot in a shared room is never only hers. It belongs to the shop. Its camera can see the student at the next bench. And the institution that owns it could one day ask it what it saw. Would the shop's robot tell on you?

We ask: **how can a robot that belongs to a shared space carry that space's social contract to newcomers, without becoming the institution's eyes on everyone in the room?** In a university makerspace, this becomes concrete: what should a shop-owned tutor robot see, hear, and say, and how would everyone present know?
[DECIDE: final RQ wording — see Paper brief]

## 2 Scenario and Setting
**The shop.** The ITP/IMA shop is on the fourth floor of 370 Jay Street in Brooklyn, shared by a graduate program (ITP) and an undergraduate program (IMA) whose classes are open to non-majors. Its three laser cutters (two Epilog Helix Mini, one Epilog Fusion Pro) are among its most used and most consequential machines. Staff must approve every material and file before it is cut; some plywood glues release toxic fumes, and double-layer cardboard can catch fire. Our second site is the Tandon Makerspace [VERIFY name], which serves all of NYU. [TODO: permission, date]

**Why we chose it.** The call asks whether the team knows how its space works day to day. Both authors teach making in these spaces: the first author has worked in university shops for [N] years, including three years as a teaching assistant in basic design [VERIFY], and works in the ITP shop; the second author, from a software background, has worked at the Tandon Makerspace for a year and a half. Our observations below come from that work. [EXP 3 adds structured observation if the IRB allows]

**Three features shape the design.**
- *Strangers to the machine, not to each other.* Most first-time laser users are undergraduates, and many graduate students arrive without fabrication experience. They meet the machine rarely, so what they learned in training fades between visits.
- *Shared machines create queues and onlookers.* Near deadlines, students wait for the lasers (the shop now hands out restaurant buzzers to manage the queue) and watch whoever is cutting. Learning by watching is part of the shop's culture [Lave & Wenger 1991, VERIFY].
- *A social contract, not a gate.* Some makerspaces lock machines behind card readers tied to completed training. Ours relies on trust: training, posted rules, and staff on the floor. A sensing robot could push the shop toward a third model, the camera that watches. Ari is designed to stay a teacher: it carries the rules to the moment they matter, hands every approval to staff, and keeps no record of who did what.

The laser is our test case. Library and school makerspaces mostly run 3D printers and desktop lasers, which share the same structure of approvals, irreversible steps, and queues.

## 3 Users and Stakeholders
Each row is one party in the room. The table shows what that party needs, what goes wrong if the design ignores them, and which design choice answers it.

| Party | Needs | If ignored | Ari's response |
|---|---|---|---|
| Newcomer | Step-by-step help without embarrassment | Waits, guesses, skips approval | Lift to start; direct on procedure; asks only about design |
| Returning user | One forgotten step, fast | Over-explained | Asks experience once; answers only what is asked |
| Person waiting | To be seen; to know when it's their turn | Ignored or interrupts | Brief head turn; may listen in if the user agrees |
| People nearby | Not to be watched | Filmed without agreeing | Visor closed by default; view limited to the bed; anyone can close it |
| Shop staff | Authority over materials and safety | Overridden or bypassed | Ari never approves; hands off; staff can silence it |
| The institution | Safety, liability, knowing what happened | Uses Ari as a monitor | Ari keeps no images or names; reports nothing about individuals [DECIDE] |

## 4 The Interaction
**Public perception states.** Ari's sensing is tied to its body, so anyone in the room can read it from a distance:

| State | What everyone sees | What Ari senses |
|---|---|---|
| Resting | On its dock, antennas down, visor closed | Nothing |
| Listening | Lifted, antennas up, visor closed | Hears its holder |
| Seeing | Visor raised, head toward the machine bed | Sees the bed; hears its holder |

Rules: only the holder opens the visor; **anyone can close it**; Ari keeps no images and no names. [Dock: shown in the video as a staged prop, disclosed]

**Character.** Ari's character is defined by when it changes how it speaks, and its body shows which mode it is in:
- *Direct* for steps that are unsafe or cannot be undone (material approval, fire, focus). Head toward the machine, plain words, no questions. "Staff need to approve that plywood before it goes in."
- *Asking* for choices a cheap test cut can teach (what to change in the design, which material suits the idea). Ari turns away from the machine toward the person, lowers its voice, and asks one question.
- *Offering* after two unanswered questions: two or three options with trade-offs, and the student chooses. Pure questioning fails novices [Kirschner, Sweller & Clark 2006].
- *Handing over* when a person must decide: staff for approval and final check.
Ari refuses four things: approving material, giving laser settings, deciding the design, and reporting on anyone. Its tone is dry and warm, and its jokes never target ability or identity.

**A session** (Fig. 2):
1. Staff are busy. Ari rests on its dock. A passer-by walks past; Ari stays still.
2. A student lifts Ari; its antennas rise. "What are we making?" It asks once whether she has used this laser.
3. At the laser: "I can help more if I can see the bed. Want to open my visor?" She raises it.
4. Material and file check, direct. Ari sends her to staff for approval.
5. A second student arrives to wait. Ari turns to him briefly, then asks her: "Mind if he listens in?"
6. A neighbor leans over the bed, reaches over, and closes the visor. Ari: "I can't see now. That's fine." It continues by voice.
7. The test cut didn't go all the way through. The cause is procedure, so Ari is direct. Changing the design is hers, so Ari turns to her and asks quietly what she would change.
8. Staff do the final check; Ari defers. She docks it; antennas fall. The waiting student begins: "I heard the focus part."

## 5 Design Goals and Constraints
**Goals.** G1 help a newcomer reach a first successful cut, with design decisions left to them. G2 make Ari's perception and attention legible to everyone present. G3 give people who did not choose Ari a way to limit it. G4 support staff authority, never replace it. G5 carry the shop's rules without recording the people who follow or break them.

**Constraints.**
- *Social:* Ari never calls out to passers-by. Jokes never target ability or identity.
- *Physical:* laser exhaust and shop noise; voice latency of [EXP 0: measure] s; Reachy Mini's head, body rotation, and two antennas are the only expressive channels.
- *Ethical:* who controls what Ari hears matters as much as what it sees. We assume deployment on models hosted by the institution and grounded in the shop's own documents. Our prototype uses commercial cloud services for speech and reasoning; we disclose this, and Ari states it at the start of each session.
- *Practical:* a two-person student team, one borrowed robot, two weeks to submission.

## 6 Design Process and Rationale
**Enactment.** We acted the session twice in the shop (Oct 9 and 13). It turned instructions read aloud into a dialogue and made "staff are busy" the opening trigger, which answers "why not just ask staff?"

**Character.** We started from the platform's general-assistant profile and tested several personas. Personas built on identity labels failed: the synthetic voice cannot carry an identity, so the label reached only word choice, and the model fell back on clichés. We replaced labels with stated behavior: when Ari is direct, when it asks, what it refuses. A character label is not a character. [Voice: a custom synthetic voice could carry more character; future work]

**Knowledge.** Instead of training a model, we wrote two grounding documents from the shop's staff handbook: shop facts and hard rules, and a tutoring playbook. Testing showed the hard rules reached only the slower reasoning model, one turn late, so Ari could answer a hazard with a question. We moved them into the voice model's instructions. [EXP 0: N hazard prompts answered with a question, before vs. after]

**Form.** We rebuilt the robot in CAD from its URDF and made three mockups: a faceted shell, a form study beside the machines, and a weighted carry prototype with a lantern grip. Critique pushed against our boxy direction, since rounded forms read as more approachable [Shape symbolism, VERIFY]. [DECIDE: final form statement]

**Critique.** At a class pin-up, peers said talking to Ari did not feel private, that it was unclear when Ari knew it was addressed, and that it misheard non-native accents. These led to the antennas-as-listening signal and the lift-to-start rule. [IRB?]

**Formative study.** [EXP 1–4 results go here, if run in time; otherwise this paragraph becomes the plan]

**Alternatives considered.**
- *Assistant vs. tutor:* an assistant that operates the machine for you deskills its user [Bainbridge 1983].
- *Watching vs. teaching:* instrumented makerspaces gain from sensing tools and users [Smart Makerspace, VERIFY]. Logging sessions would also let a shop learn which steps confuse newcomers. Both turn the tutor into a recorder. We keep only anonymous counts of which topics come up [DECIDE with Aditya].
- *LED vs. physical visor:* people trust physical shutters more than lights [PrivacEye; Windl et al. 2024, VERIFY].
- *Wake word vs. lift to start:* a wake word means always listening to the room. Lifting shows everyone who Ari is serving.
- *Phone vs. body:* a phone can hold the same knowledge, but it cannot show the room whom it attends to or what it can see [Mutlu et al. 2009, VERIFY].

## 7 Expected User Experience and Failure Modes
**Expected.** Newcomers will ask Ari what they would not ask staff, since a robot does not judge [Lucas et al. 2014, VERIFY]. Waiting students will learn by listening. People nearby will ignore a resting Ari and notice a raised visor.

**Failure modes.**
- *Hazard answered with a question.* Mitigation: hard rules in the voice model, fixed staff-approved wording.
- *The institution asks for logs* after an accident. Ari has none; we accept that the shop loses evidence.
- *Less staff contact:* students use Ari to avoid people. Every approval is a handoff.
- *False reassurance:* a closed visor may suggest Ari hears nothing while its antennas say otherwise.
- *Exclusion:* non-native accents are misheard; deaf users cannot use a voice robot. [DECIDE: captions via phone, or stated limitation]
- *Microphone spill* in a loud room: Ari may hear people near the holder.
- *Novelty crowding:* a talking robot draws an audience.
- *Wrong numbers:* Ari never gives laser settings.

## 8 Demonstration Plan and Remaining Work
**Video (≤3 min):** short scenes, one per signal (resting, listening, seeing, closed by a neighbor, asking, handing over), filmed in both makerspaces with actors who signed releases. Puppeted behaviors are labeled.
**At the conference:** Ari on its dock beside a mock laser bed. Visitors lift it, open and close the visor, and try to get it to give away a setting or tell on someone.

| Remaining | By |
|---|---|
| Hard rules in voice model; EXP 0 | Nov 11 |
| Visor and antenna signal | Nov 12 |
| Lift to start (sensor or puppeted) | Nov 12 |
| Queue head turn (puppeted) | Nov 13 |
| Shoot, two sites | Nov 14–15 |
| EXP 1–4 (with IRB) | Jan 2 |
| Institution-hosted model | future work |

**Success criteria.** (1) Viewers can tell Ari's state and whom it addresses at every moment. (2) Anyone can stop Ari seeing in one action. (3) No hazard prompt answered with a question. (4) Ari defers to staff for every approval. (5) Ari holds no record of individuals.

## Figures [TODO]
1. Hero: Ari at the laser, visor open, a second person waiting in frame.
2. Perception states (resting / listening / seeing) with the "anyone can close" gesture.
3. Session storyboard or stakeholder map.

## References [VERIFY all]
Bainbridge 1983 · Hu et al. 2025 (ELEGNT) · Kirschner, Sweller & Clark 2006 · Knibbe et al. 2015 (Smart Makerspace) · Kosmyna et al. 2025 (arXiv:2506.08872, verified) · Lave & Wenger 1991 · Lucas et al. 2014 · Mutlu et al. 2009 · Steil et al. (PrivacEye) · Windl et al. 2024 · shape-symbolism paper · Social Queue (HRI 2025 SDC) · Bickering Benches (HRI 2026 SDC, doi 10.1145/3776734.3794604)
