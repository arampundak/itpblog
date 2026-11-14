---
date: 2026-11-09
tags: [hri27, sdc, thesis, research-questions]
---

## CHOSEN (Nov 10) — for the SDC paper
> "What if the shop could talk back?" (how to be a good teacher): In a shared makerspace, how can a robot guide newcomers in using machines while building their confidence and agency, so they finish the job on their own, bring staff fewer (but better) questions, and leave able to do what they didn't think they could?

Objective (Aram): fewer questions to staff, students finishing on their own while learning, agency. Ari helps with the simple, repeated things and does not replace human connection (Itai's notes: "shop manager says talk to Ari").
Core concept: **degrees of Socraticness** (Aditya). Coined term: **Aristotle machine**. Surveillance is no longer the frame; the visor and consent remain the public-space complication.
Earlier candidates below are kept for the thesis and for the record.

---
# Research questions: everything we've said, and how it connects

Sources: all notes in HRI 27, Project Development Studio and Thesis (read Nov 9), plus the 2025 and 2026 SDC winning papers.

---
## 1. Candidate messages (what you want to say)
Pick the one you'd defend for three hours at the showcase. The others become supporting arguments.

| #                    | Message                                                                                                                   | Where it comes from                                                                                                            |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| M1                   | A robot that belongs to a shared space should show everyone what it perceives and whose side it's on.                     | Claude's synthesis (Nov 9). Visor, Kari's consent focus, Niko's ownership point                                                |
| M2                   | A machine helper in a shared space should send people back to each other, not replace them.                               | Thesis thoughts 1310 (mechanism 5, "make it the spine"), Nasif ("robot that impacts human-human interaction"), the Alexa story |
| M3                   | AI should do the *how* and leave the *what* to us; at the machine, a robot can make that split visible.                   | SDC blurb 1, Entering HRI 27, $10 in 10 days, rod-not-fish                                                                     |
| M4                   | Robots should learn our social norms, not make us learn theirs.                                                           | Thesis thoughts 1410/1710, Thesis 3                                                                                            |
| **M5 (recommended)** | **In a shared space, a helpful robot should strengthen the social contract between people, not replace it or police it.** | Joins M1–M3. See section 4                                                                                                     |

---
## 2. All research questions so far

### Thesis level (not for this paper)
- How should the character and behavior of embodied AI (how it shows attention, intent, and what it perceives or conceals) be designed so robots adapt to human norms? What does physical presence add that a screen or voice can't? Can such robots strengthen interactions between the people around them? — *Thesis thoughts 1710, Thesis 3*
- How do we design a robot that impacts human-human interaction? — *Nasif 0810*
- Can robots have agency in how they behave toward us? — *Nasif 0810*
- How much character does a context actually need, from a dropping flag to a talking robot? — *Niko 1310*
- What is character in a robot? — *Blog 02*
- How does personality make a machine approachable to strangers? — *Blog 03 (TADM topic)*
- How do we feel having a robot around? What makes it trustworthy? What makes it worth more than five minutes? — *Pedro 2109*
- Should help fade as expertise grows? Where is the student? — *Thesis discussion 1210*

### SDC level (candidates for this paper)
- A. How can a shop-owned tutor robot make what it sees and hears legible to everyone in a shared makerspace? — *Nov 3/8*
- B. If a shared shop could talk back, what should it be allowed to see and hear, and how would everyone in the room know? — *Nov 8*
- C. Can a robot carry a makerspace's unwritten rules to newcomers without turning the social contract into surveillance? — *Nov 8*
- B+C. How can a robot that belongs to a shared space carry that space's social contract to newcomers without becoming the institution's eyes? — *Draft 4*
- Is the robot something between card access and a social contract? — *Kari 1410*
- How should a robot in a shared space show what it perceives? — *Thesis thoughts 1710*
- What does the body add that a phone (or a keychain speaker) can't? — *Yuhan 1410, $10 in 10 days*
- Does Ari need to not-see? How does it do safety if it doesn't see? — *SDC thoughts 2610*
- What changes when the tutor is physical, at a machine, and the work is irreversible? — *SDC thoughts 2610*

### Design sub-questions (answered inside the paper)
- When is Ari direct and when does it ask? (reversibility rule) — *SDC thoughts 1310*
- What does Ari do when a student says "just tell me the settings"? — *SDC thoughts 2610*
- Who should Ari be allowed to notice: only its user, or everyone nearby? — *Thesis 3*
- Do its ears turn off too? — *Kari 1410*
- How does Ari know it is being talked to? — *Pin-up*
- Consent for one session or forever? — *Aditya talk 4 summary*
- Rounded or machine-like? Why are robots going soft? — *Desk critique*

---
## 3. Threads that repeat across all three folders
1. **Machines that do the work erode the skill.** Alexa children; Kosmyna; Bastani (tutoring helped practice, hurt exams); Bainbridge's ironies of automation; "AI is eroding skill" on the mind map; Ari's Socratic rule. *Strongest and oldest thread.*
2. **People should be able to read a machine they didn't choose.** The electric car with added sound so people hear it (Pedro 2109); the Waymo gap (Niko); the parent with a stroller (thesis paragraph); eHMI (Kari); "visible indicator when the camera is on" and "No EYES – black visor" (mind map, before the SDC existed); the visor. *The visor isn't a privacy feature you added for the SDC. It's been in your map since September.*
3. **Asking a machine replaces asking a person.** Stack Overflow down 25% after ChatGPT; Lucas (people disclose more to machines because they don't judge); "robot as a directory of human expertise" (manifesto, transactive memory); handoff to staff; "mind if he listens in?" *This is the thesis spine, and the SDC draft barely names it.*
4. **Bodies amplify authority.** People follow a physically present robot more (Bainbridge 2011), even a malfunctioning one (Robinette 2016); Tanzanian pupils accepted wrong answers from a smart-seeming robot. *This works against a tutor that wants students to decide. Not in the paper yet.*
5. **Who the robot belongs to.** Niko: ownership and loyalty are design variables; "my robot as a member of the community" (Aiden, mind map); Jig Sawyer as "junior member of a trio with Phil and Ian" (Blog 03).
6. **Minimal signals over talk.** Niko's dropping flag; "Motion and light carry state and safety, read by everyone on the floor" (feedback in Jig Sawyer 1, Oct 6); Little Signals; antennas.

---
## 4. Why M5
Thread 3 is what you care about most (thesis spine, Alexa story). Thread 2 is the most visual and on-theme. Thread 1 is the most familiar. M5 holds all three as ways a robot can damage a shared space's social contract, each with a design answer:

| How a robot can break the social contract | Thread | Ari's answer |
|---|---|---|
| **Doing** the work for you, so you never learn | 1 | Teaches: direct on safety, asks about design |
| **Replacing** the people you'd have asked | 3 | Hands off to staff; invites the waiting student to listen; routes you to who knows |
| **Policing** the room for the institution | 2, 5 | Visor anyone can close; keeps no names; never reports |

Possible RQ under M5: **How can a robot in a shared makerspace strengthen the social contract between the people there, rather than doing their work, replacing their teachers, or watching them?**
It's grounded (the shop's contract is real: training, rules, staff, trust), multi-party by definition, includes surveillance without making the paper only about privacy, and points at the future of HRI (institutions will deploy robots into spaces that run on trust).

Thread 4 becomes a design tension: Ari's body makes it more authoritative, so its character must lower its own authority (turning to the student to ask, deferring visibly to staff).

---
## 5. Interesting sides not yet used
- **Design from the shop's point of view.** Bickering Benches designed from the bench's desire. What does *the shop* want? Machines used well, nobody hurt, people coming back, knowledge passed on. "What if the shop could talk back?" already speaks for the shop. Risk: reads as derivative of the benches.
- **A robot that makes itself less needed.** Help that fades as expertise grows (Thesis discussion 1210). Success = the student doesn't lift Ari on the third visit.
- **The overhearer.** Learning by watching is how shops pass on skill (Lave & Wenger). Ari's procedure is public, mistakes private.
- **Liability vs. trust.** After an accident the institution will want records. Ari has none on purpose. That's a real cost, worth stating.
- **"Can I remember you?"** (mind map, Needybot via Pedro). Memory as consent, separate from sight.

---
## 6. What the two winners teach
**Social Queue (HRI 2025, Best Paper).** Robotic stanchion with a tentacle; three named modes (Attracting, Escaping, Friendly); low- then high-fidelity prototype; IRB-approved field experiment, 29 vs. 10 people, Wizard-of-Oz disclosed; honest result: the main hypothesis was *not* supported, enjoyment was. Interaction analysis plus thematic analysis. Limitations section. Different call that year (no public-space rubric).

**Bickering Benches (HRI 2026, Best Paper).** Opens with a provocation ("What if public benches had their own desires?"). Designed from the object's perspective. A whole section on design challenges, including that "thinking like a bench" was hard to maintain. Cut 240 scenarios to 7 and said so. Requirements list, then about a page of implementation. Avoided cameras "to protect the privacy of approaching individuals and because people might behave differently if they felt observed." A counter display "to make the benches' motivations legible." **No results**: a planned study with two research questions, hypotheses, N≈20, named measures (RoSAS, Inclusion of Other in Self), ethics approval pending. Seven references.

**Lessons for you**
1. One provocation, one object, named modes. You have this (states and modes). Note your title opens like their abstract ("What if…"); fine, but know it.
2. A planned evaluation written in detail is acceptable. EXP 2 can be written this way instead of rushed.
3. Write the hard parts honestly: their "thinking like a bench" ≈ your "a character label is not a character" and "the safety rule reached the wrong model."
4. State your cuts (three intents → making only).
5. Privacy as a constraint already appears in the 2026 winner. Privacy alone isn't novel; **who the perception serves** (M5, policing) is.
6. Neither paper handles conflicts between parties in depth. The 2027 rubric asks for it. That's where you can beat them.
