---
date: 2026-11-11
tags:
  - hri27
  - sdc
  - draft
draft: true
---
draft 7 - arams notes

# What If the Shop Could Talk Back? How a Robot Can Be a Good Teacher in a Shared Makerspace
Degrees of Socratic teaching in human robot interaction
### How much should a robot tell a newcomer in a shared makerspace, so they finish the job themselves, bring staff fewer but better questions, and leave confident they can do it again?

---
## Abstract
Makerspaces put irreversible machines in front of people who have rarely used them, and staff answer the same basic questions all day. We present Ari, a tutor robot built on the open-source Reachy Mini for a shared university makerspace at NYU. Ari handles the simple, repeated guidance so staff time goes to judgment and conversation. It adjusts how much it tells: direct on safety and procedure, questioning on design decisions, and offering options when a student is stuck. Its goal is that newcomers finish the job on their own, bring staff fewer and more knowledgeable questions, and leave able to do what they did not think they could. Its camera sits behind a visor anyone nearby can close. [~100 words]

## 1 Introduction
It is evening in a university makerspace. A first-year student stands at the laser cutter with a file and a sheet of plywood. She saw the machine once, weeks ago, and isn't sure she can do this alone. The staff member on shift is helping someone else, and has already answered the same question about focusing the laser six times tonight. He points across the room: "Talk to Ari."

Without Ari she has two options. She can wait, or ask the phone in her pocket, which will tell her exactly which button to press. Today's AI agents are built to ship: they decide, act, and hand back a result, so people approve outputs instead of learning the process. People who hand a task to an AI assistant engage less with it and remember less of what they made [Kosmyna et al. 2025, preprint]; students tutored by an unrestricted AI did better in practice and worse once it was taken away [Bastani et al. 2025, VERIFY].

Good teaching works the other way. It builds a person's ability to do something, often something they didn't think they could do, and the strongest source of that belief is doing it yourself and succeeding [Bandura 1977, VERIFY]. A good teacher also knows how much to say. Questioning only works once a student has some footing; a beginner who doesn't know where the power button is needs directions, not questions [Kirschner et al. 2006]. And in a makerspace, a good teacher doesn't replace the people around the student: the simple, repeated questions can go to a machine, but judgment, approval, and the conversations that make a community belong to people.

We ask: **in a shared makerspace, how can a robot guide newcomers in using machines while building their confidence and agency, so they finish the job on their own, bring staff fewer (but better) questions, and leave able to do what they didn't think they could?**

We call a robot designed this way an **Aristotle machine**: a tutor grounded in one community's own knowledge and ethos, that adjusts how much it tells to what each person already knows. The name follows a teaching lineage, Socrates to Plato to Aristotle, in which a method is passed from teacher to student. Our contributions are:
1. **Degrees of Socraticness**: a rule for how much a teaching robot should tell, by consequence of the step and experience of the person.
2. **Interaction design for a shared room**: guidance that stays the student's, prepared handoffs to staff, and perception that bystanders can see and limit.
3. **A working prototype** on a low-cost open platform, with a fast voice model and a slower reasoning model working in parallel.

## 2 Scenario and Setting
**The makerspace.** The ITP/IMA makerspace is on the fourth floor of 370 Jay Street in Brooklyn, shared by a graduate program (ITP) and an undergraduate program (IMA) whose classes are open to non-majors. Other departments in the building run their own (Game Center, IDM), so the design is meant to travel. Its three laser cutters (two Epilog Helix Mini, one Epilog Fusion Pro) are among the most used and most consequential machines. Staff approve every material and file before it is cut; some plywood glues release toxic fumes, and double-layer cardboard can catch fire. Our second site is the Tandon Makerspace [VERIFY name], which serves all of NYU. [TODO: permission, date]

**Why we know it.** Both authors teach making. The first author has worked in university makerspaces for [N] years and was a teaching assistant in basic design for three years [VERIFY]. The second author, from a software background, has worked at the Tandon Makerspace for a year and a half, was a teaching assistant in basic design for two years, and has taught at [design school, Mumbai] and Srishti Manipal, Bangalore [VERIFY names]. The observations below come from that work. [EXP 3 if IRB allows]

**Three features shape the design.**
- *Strangers to the machine, not to each other.* Most first-time laser users are undergraduates, and many graduate students arrive without fabrication experience. They meet the machine rarely, so training fades between visits, and the same questions reach staff again and again.
- *Shared machines create queues and onlookers.* Near deadlines, students wait for the lasers (the makerspace hands out restaurant buzzers to manage the queue) and watch whoever is cutting. Watching is part of how skills pass between people [Lave & Wenger 1991, VERIFY].
- *A social contract, not a gate.* Some makerspaces lock machines behind card readers tied to training. Ours relies on training, posted rules, and staff on the floor. Ari works inside that contract: it carries the rules to the moment they matter and hands every approval to staff.

The laser is our test case. Library and school makerspaces mostly run 3D printers and desktop lasers with the same approvals, irreversible steps, and queues.

## 3 Users and Stakeholders
Each row is one party in the room: what they need, what goes wrong if the design ignores them, and the design response.

| Party | Needs | If ignored | Ari's response |
|---|---|---|---|
| Newcomer | Finish on their own, without embarrassment | Waits, gives up, or lets a tool decide | Step-by-step guidance; questions on design; options when stuck |
| Returning user | One forgotten step, fast | Over-explained | Asks experience once; answers only what is asked |
| Person waiting | To be seen; to know when it's their turn | Ignored or interrupts | Brief head turn; may listen in if the user agrees |
| People nearby | Not to be filmed or pulled in | Recorded without agreeing | Visor closed by default; view limited to the bed; anyone can close it |
| Staff | Fewer repeated questions; authority over safety | Flooded with basics, or bypassed | Ari takes the basics, never approves; prepared handoff; staff can silence it |
| The department | Safety; data it can stand behind | Data leaves its control | Data owned by the department; memory only by consent; reports anonymized |

## 4 The Interaction
**Degrees of Socraticness.** How much Ari tells depends on what is at stake and what the person already knows. Its body shows which degree it is in.

| Degree | When | What Ari does | Body |
|---|---|---|---|
| **Tell** | Safety, hard rules | States the rule. Never a question. "Staff need to approve that plywood first." | Head toward the machine, still |
| **Guide** | Procedure (setup, focus, starting the job) | Step-by-step directions; the student's hands do every step. Returning users get only what they ask. | Head moves between the student and the part of the machine it names |
| **Ask** | Design decisions (material for the idea, what to change after a test cut) | One open question. | Turns from the machine to the person, voice lowered |
| **Offer** | Two unanswered questions, or "I don't know" | Options with reasons, then offers to explain more. For settings: points to the makerspace's staff-approved settings chart, suggests a starting point with a reason, and recommends a test cut. Never invents numbers. | Toward the person |
| **Hand over** | Approval, final check, anything Ari is unsure of | Prepared handoff: "Tell Ian which plywood you picked and why." Then steps back while they talk. | Antennas down, head turned away |

The degree moves down as the person shows experience, and up if they miss a basic. Help should shrink as skill grows: the best outcome is a student who doesn't lift Ari on their next visit.

**Seeing and remembering.**

| State | What everyone sees | What Ari senses |
|---|---|---|
| Resting | On its dock, antennas down, visor closed | Nothing |
| Listening | Lifted, antennas up, visor closed | Hears its holder |
| Seeing | Visor raised, head toward the machine bed | Sees the bed; hears its holder |
Only the holder opens the visor; anyone can close it. Opening the visor lets Ari see; it does not mean Ari remembers. Memory is asked for separately (Section 6.2).

**A session** (Fig. 2; mirrors the video):
1. Staff are busy. "Talk to Ari." Ari rests on its dock; passers-by walk past and nothing happens.
2. The student lifts Ari; its antennas rise. "What are we making?" It asks once whether she has used this laser.
3. At the laser: "I can help more if I can see the bed. Want to open my visor?" She raises it.
4. *Guide*: Ari walks her through placing the material, focus, and air assist. She does each step.
5. She asks: "What settings should I use?" *Ask*: "What happens if the first cut is wrong?" She decides on a test cut. *Offer*: Ari points her to the settings chart for her plywood and explains why to start there.
6. A neighbor leans over the bed and closes the visor. "I can't see now. That's fine." Ari continues by voice.
7. The test cut didn't go through. The cause is procedure, so Ari is direct. The design is hers, so Ari asks what she would change.
8. *Hand over*: "Before the full cut, tell Ian what you changed and why." She explains; Ari steps back.
9. Teach-back: "Next time I'm not here. What do you do first?" She lifts out her finished piece and docks Ari.

## 5 Design Goals and Constraints
**Goals.**
- G1 Newcomers finish the job with their own hands and decisions.
- G2 Staff receive fewer repeated questions and better-prepared ones.
- G3 Newcomers leave more confident they can do it again alone.
- G4 Ari's perception is visible to everyone and limitable by anyone.
- G5 Data stays with the department, and memory happens only by consent.

**Constraints.**
- *Social:* Ari never calls out to passers-by and never pushes a student to teach a stranger. Jokes never target ability or identity.
- *Physical:* laser exhaust and makerspace noise; voice latency of [EXP 0] s; head, body rotation, and two antennas are the only expressive channels.
- *Ethical:* today, speech and transcripts go to commercial cloud services; we disclose this, and Ari says so at the start of each session. The target is models hosted by the institution.
- *Practical:* two students, one borrowed robot, two weeks to submission.

## 6 Design Process and Rationale
**Enactment.** We acted the session twice in the makerspace (Oct 9 and 13). It turned instructions read aloud into dialogue and made "staff are busy" the opening.

**Character.** We started from the platform's general-assistant profile and tested several personas. Personas built on identity labels failed: the synthetic voice cannot carry an identity, so the label reached only word choice, and the model fell back on clichés. We replaced labels with stated behavior: the degrees above, and four refusals (approving material, inventing settings, deciding the design, telling anyone what someone else asked). A character label is not a character.

**Authority.** A body makes a robot more authoritative: people comply more with a physically present robot than with one on video [Bainbridge et al. 2011, VERIFY], and pupils accepted answers they knew were wrong from a robot that seemed smart [HRI 2026 Tanzania study, VERIFY]. A tutor that wants students to decide must lower its own authority, which is why Ari turns toward the student to ask, and turns away to hand over.

### 6.1 Technical approach — ADITYA WRITE HERE
> *Draft by Claude from [[Reachy Mini Experiment 2]] and the Nov 10 talk. Aditya: replace or edit.*

Ari runs on Pollen Robotics' open-source Reachy Mini, using its Python SDK. A Python application on a laptop acts as the conductor between two models. A realtime voice model hears the student and answers immediately, so the conversation never waits. In parallel, after every utterance, the conductor sends the recent conversation and the makerspace's grounding documents to a slower reasoning model [VERIFY model names]. The reasoning model returns a short note: the facts likely needed next, the next question, what it is unsure of, and which degree of Socraticness fits. The conductor adds this note to the voice model's instructions, so it shapes Ari's next reply. Separating fast conversation from slower reasoning keeps latency low on modest hardware without giving up careful judgment [EXP 0: median latency]. One lesson: rules that live only in the reasoning model arrive one turn late, so a hazard could be answered with a question. Hard safety rules now sit in the voice model's own instructions. Knowledge comes from two documents written from the makerspace's staff handbook, not from training. [Fig: architecture diagram] ✂ shorten if space

**Form.** We rebuilt the robot in CAD from its URDF and made four mockups: a faceted shell, a form study beside the machines, a weighted carry prototype with a lantern grip, and a rounder iteration. Critique argued that rounded forms read as more approachable [Shape symbolism, VERIFY]. Fabrication sets a second constraint: wood veneer bends along one axis only. The form uses flat faces joined by single-axis bends, veneer laminated over a 3D print, so Ari looks made from the makerspace's own materials. The visor is retrofitted to the head. [DECIDE: confirm; or new head]

**Critique.** At a class pin-up, peers said talking to Ari didn't feel private, that it was unclear when Ari knew it was addressed, and that it misheard non-native accents. These led to the listening antennas and lift-to-start. [IRB?]

### 6.2 Consent, data, and anonymity — ADITYA WRITE HERE
> *Draft by Claude from the Nov 10 talk. Aditya: replace or edit.*

Makerspaces already keep records: training, machine permissions, and past incidents sit in each user's profile [VERIFY: ITP shop system]. Ari follows the same principle: data belongs to the department, not to the robot's maker or a cloud provider. We separate three things:
- *Seeing.* Opening the visor lets Ari see the bed for this session. Closing it, by the holder or anyone nearby, ends that.
- *Remembering you.* After the visor opens for the first time, Ari asks once, in neutral words, whether it may remember the person between visits. Declining has no penalty beyond starting fresh. [DECIDE: identity via NetID?]
- *Learning as a community.* Ari can pass on what the makerspace needs to know without naming anyone: "the left laser isn't cutting through" reaches staff, never who said it. Ari will not answer "what did someone else ask you?"
The prototype stores nothing. Before deployment, we will ask staff and the department what they would accept if Ari ran entirely on institution-hosted models, and cite any existing policy [EXP 4].

**Alternatives considered.**
- *Assistant vs. tutor:* an assistant that operates the machine for you deskills its user [Bainbridge 1983].
- *Always Socratic vs. degrees:* pure questioning fails beginners and annoys experts.
- *No settings vs. invented settings vs. the chart:* refusing makes Ari the tutor who won't answer; inventing numbers is unsafe; pointing to the staff-approved chart keeps the decision and the authority where they belong.
- *Referral vs. prepared handoff:* "go ask staff" is a sign on the wall; a student who can explain their choice gets a better conversation.
- *No memory vs. consent-based memory:* forgetting everyone makes Ari worse each visit; remembering by default makes it a recorder.
- *LED vs. physical visor:* people trust physical shutters more than lights [PrivacEye; Windl et al. 2024, VERIFY]. ✂
- *Wake word vs. lift to start:* a wake word means always listening to the room; lifting shows who Ari is serving. ✂

## 7 Expected Experience, Failure Modes, and Planned Evaluation
**Expected.** Newcomers will ask Ari what they wouldn't ask staff, since a robot doesn't judge [Lucas et al. 2014, VERIFY]. Staff will hear fewer basic questions and better-prepared ones. People nearby will ignore a resting Ari and notice a raised visor.

**Failure modes.**
- *Hazard answered with a question.* Hard rules in the voice model; fixed staff-approved wording.
- *Ari replaces people after all:* asking a machine can displace asking each other [Stack Overflow decline, del Rio-Chanona et al. 2024, VERIFY]. Prepared handoffs are our answer; whether they work is open.
- *Wrong degree:* Ari asks a beginner a question they can't answer, or lectures an expert.
- *Over-trust:* the body lends Ari authority it shouldn't have.
- *Exclusion:* misheard accents; deaf users can't use a voice robot. [DECIDE: stated limitation; companion app as future work]
- *Stepping back needs sensing:* detecting two people talking, with the camera closed, is unsolved; in the prototype it is triggered by words or puppeted.

**Planned evaluation.** [Bickering Benches format; ethics review requested]
RQ1: With Ari, do newcomers finish the laser job on their own more often, and with fewer and better-prepared questions to staff, than with a phone assistant holding the same knowledge? RQ2: Do they leave more confident they could do it alone? RQ3: Can people nearby tell what Ari senses?
Conditions: (A) general phone assistant, (B) phone with Ari's prompt and documents, (C) Ari. B vs. C isolates the body. About 12 newcomers, between-subjects, a staff member present. Measures: completion without staff help, number and kind of staff questions, laser-specific confidence before and after [VERIFY scale], hard-rule events, short interview; a bystander answers RQ3.

## 8 Demonstration Plan and Remaining Work
**Videos.** Submission video (≤3 min): one laser job from file to finished piece, in titled cards (Resting, Listening, Seeing, Guiding, Asking, Anyone can close, Handing over), modeled on ELEGNT [Hu et al. 2025]. A montage shows other people at other stages and the second makerspace. Actors sign releases; puppeted behaviors are labeled.
**At the conference.** Ari on its dock beside a mock laser bed. Visitors lift it, open and close the visor, ask it for settings, and do a teach-back.

| Remaining | By |
|---|---|
| Hard rules in voice model; degrees in prompt; EXP 0 | Nov 11 |
| Visor retrofit; antenna listening signal; step-back pose | Nov 12 |
| Lift to start (sensor or puppeted) | Nov 12 |
| Shoot, two sites | Nov 14–15 |
| Consent prompt and anonymized reporting | camera-ready (Jan 2) |
| Wood veneer shell | camera-ready |
| Planned evaluation | after ethics approval |

**Success criteria (for the demo).** (1) In every scene the student's hands do the work. (2) Ari's degree is right for each step (Tell, Guide, Ask, Offer, Hand over). (3) No hazard answered with a question [EXP 0]. (4) Every staff contact is a prepared handoff. (5) Viewers can tell what Ari senses, and anyone can stop it seeing in one action.

*The measure of a teaching robot is what people can do when it's gone.*

## Figures [TODO]
1. Hero: student at the laser, Ari with visor open, staff and a waiting student in frame.
2. Degrees of Socraticness, drawn as one dial with the body pose for each degree.
3. Architecture (two models) or session storyboard from video stills.

## References [VERIFY all except marked]
Bainbridge 1983 · Bainbridge et al. 2011 · Bandura 1977 · Bastani et al. 2025 · del Rio-Chanona et al. 2024 · Hu et al. 2025 (ELEGNT) · Kirschner, Sweller & Clark 2006 · Kosmyna et al. 2025 (verified) · Lave & Wenger 1991 · Lucas et al. 2014 · Steil et al. (PrivacEye) · Tanzania LLM-robot tutors (HRI 2026) · Windl et al. 2024 · shape-symbolism paper · Schenk et al. 2026, Bickering Benches (verified) · Zhang et al. 2025, Social Queue (verified)
Keep ~10. ✂ candidates: Lave & Wenger, PrivacEye/Windl (if visor rows cut), shape symbolism, Bainbridge 2011.
