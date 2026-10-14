---
date: 2026-10-09
tags: []
draft: false
author:
url:
---
Across five talks we went from reading the HRI 2027 Student Design Competition theme to a concrete user journey: a Socratic tutor robot, built on Reachy Mini, that helps newcomers use the laser cutter in the ITP shop.

Decisions the talks settled:

- **Setting:** the ITP shop, framed as a makerspace for people who have never used these machines.
- **Role:** a tutor, not an assistant. It asks questions and leaves design decisions to the student.
- **Framing:** design (demonstrate a possible future), not science (prove an effect).
- **Knowledge:** no model training. An existing reasoning model, grounded in one "manifesto" document plus the shop's context.
- **Architecture:** a light, fast model for conversation and a heavy model for reasoning, running in parallel.
- **Privacy:** a physical eyelid over the camera that the user opens.
- **Scope:** making (operating a machine) is the focus. Ideation and planning are mentioned as future work.
- **Deliverable:** a real interaction with the robot in front of the machine, filmed, not a render. Deadline November 20, 2026.

## Talk 1: reading the theme

We went through the call's "think about" questions and its on-theme criteria, testing the makerspace idea against each one.

- **Why makerspaces:** they are spreading into high schools, libraries and cities, and hands-on skills matter again. Side argument: US manufacturing declined partly because skills were never passed down.
- **The space:** we know the shop well and how it works day to day.
- **Embodiment:** a body can invite people ("come talk to me") in a way a screen can't.
- **Risks:** surveillance, and people who don't want to talk to a robot.
- **Exclusion:** deaf people and people who can't speak. No answer yet.
- **On-theme check:** a named setting, yes. More than one party: newcomers plus existing users. Uninvited interaction, yes.
- **The worry:** the criterion that key design choices must exist _because_ the setting is public. Aram: "That frightens me."

## Talk 2: defining the concept

The robot became a tutor rather than an assistant, and the film "cutting floor" analogy gave the concept its argument.

**The robot**

- A small embodied intelligence you can move and place next to machines. It has a camera (context), a speaker (talk), a body that shows emotion, and an internet connection.
- No training. An existing reasoning model, grounded in a single "manifesto" document. The manifesto also holds the guardrails, including the Socratic behavior.
- Playful interaction. We use embodiment because people are wired to read motion and bond with bodies.

**Why a tutor**

- Beginners don't know what they don't know, and even asking "what should I know?" is hard. They need small, incremental help until they can learn on their own.
- People will ask a robot the same question again and again, because it won't judge them.
- It doesn't replace people. It ends with "if you need more, talk to this person," which turns three weeks of finding the right person into one step.
- Physical computing projects split you between the coding lab and the shop; the robot can span both.
- ITP needs tutors. The residents' help sessions are tutoring, but not one-on-one.

**The larger argument**

- AI should take the repetitive tasks and leave the decisions to people. "AI to keep humans moving."
- Jobs will shift toward making decisions, but education has trained people not to decide.
- Mastery of the medium used to come before expression. Photography freed painting from realism.
- Film went from a low shooting ratio to a very high one, so the work moved to the cutting floor. When making is cheap, the human skill is choosing what to keep. The robot should make that choice the student's, by design.
- Premise: "What if the shop could talk back?"

**Framing and privacy**

- Social Queue framed itself as science (measured enjoyment). Bickering Benches framed itself as design. We are design: we demonstrate, we don't prove.
- Three privacy levels: no context, audio only, camera plus audio. Physical version: an eyelid you open so it can see you.
- Process: prototype as a user journey, then a second version, then tests. Reachy Mini (wired version on the desk, wireless version ordered); we can change its shell.

## Talk 3: latency and the deliverable

The wait while the model thinks became a design problem for motion, and the deliverable became a real, filmed interaction.

- **The problem:** network latency is solved (around 500 ms). The real delay is the model thinking, and voice AI still feels clunky.
- **Two faces:** one face for the fast conversational brain and one for the reasoning brain. From this came the architecture: a light local model for conversation and a heavy API model for reasoning.
- **Character ideas:** Cerberus, split personality, good cop / bad cop.
- **Timing:** latency may be solved within about three years, so the proposal has to stand on more than that.
- **Debate:** should the robot just tell you "press there" (the WALL-E future), or is that spoon-feeding? A screen that draws diagrams came up as well.
- **Deliverable:** Aram wants the real thing, talking to the robot in front of the machine, with undergrads as users. Pick one machine that has stages and is used by people who don't know it (laser or 3D printer).
- **Plan:** user journey, then a storyboard of one take, then an approximate working prototype, then a video instead of a render.
- **Timeline:** six weeks to November 20. It also counts for Aram's project development class.

## Talk 4: the user journey

Aditya reshaped the journey from instructions read aloud into a back-and-forth conversation, worked through with a sundial assignment.

**Conversation, not monologue**

- "Ari gives the procedure out loud" won't work: it turns into a ChatGPT monologue, and people will just record it.
- The light engine holds the conversation and the heavy engine reasons. Context streams to the heavy engine continuously, in parallel, "something humans can't do."
- Managing the light engine is like managing RAM: keep it small and quick, and let the heavy engine keep it accurate.

**Stages**

1. Build context: which class, which faculty, what assignment. (Idea: over the years, a bank of ITP projects.)
2. Ask: help with ideation, or help with making? A deterministic decision tree in the light engine.
3. Material, asked the Socratic way: "What do you think is better?" The material is a design decision, and the student makes it.
4. Make a file. Ari doesn't teach Illustrator. It points to the design lab or to resources. The shop's boundaries become Ari's boundaries.
5. "I'll be quiet for 10 minutes, tell me if you need help." A built-in timer, then it checks in.
6. File ready: "Take me to the laser." "Are we there yet?"

**Shop knowledge**

- All of the above happens with the eye closed: a "blind box" that knows only what the user says.
- We build the shop's context by hand: photos, labels, procedures such as the red bin.
- AI complements the shop's existing human systems and staff. It doesn't replace them.

**Context modes**

- Coming back after making the file means repeating everything, unless Ari remembers.
- Full context = camera open, remembers you. Partial context = knows the space, not you.
- Opening the camera counts as consent. Open question: consent for this session only, or forever?
- Data policy treated as an ITP-level question; working assumption that saving is fine.
- Key insight: people guard their ideas, so they'll keep the eye closed during ideation.

## Talk 5: consent and scope

We capped the consent debate, split what people come for into three intents, and chose making as the focus.

**Consent**

- Worry: we're spreading into too many journeys.
- Users trade data for good service. "Don't save" at the end of a session is dicey, because the model has already inferred from what it was sent.
- Trust is built through design decisions.
- Cap: for ideation, keep the eye closed. No data is saved, so your idea never enters the pool.
- An open eye counts as consent to record. "It's a robot. It has to see."

**Persona and tone**

- Proposed persona: Red Burns as the guiding figure instead of Socrates, to ground the robot in ITP.
- Tone: not preachy. A little sassy.

**Three intents**

|   |   |   |
|---|---|---|
|Intent|Question it answers|What Ari does|
|Ideation|What|Chat with context, including showing it components to identify|
|Planning|How and when|Materials, ordering, shop hours and procedures|
|Making|Doing|Getting output from a machine or tool|

- Newcomers mostly need making. Experienced students often need planning, since they know machines but not this shop's procedures.
- Decision: dive into making. Ideation and planning are nice to have and are mentioned in the paper.

## Open questions

These came up in the talks, or in review afterward, and are not settled yet.

- Multi-party: how Ari handles the people around the user (queue, bystanders, staff), not only the user.
- Consent: separate _seeing_ from _remembering_. Today, an open camera means Ari remembers you, and bystanders in view never agreed.
- Multi-year project bank: keep or cut. It carries its own consent problems for faculty and students.
- Persona: a Red Burns-inspired character, or principles drawn from her without voicing a real person.
- Name: Ari is also the name of PAL Robotics' social robot.
- Fixed dock or carried companion: lift-to-wake and a home dock are being explored.
- Accessibility: deaf users and people who can't speak.
- IRB: needed before testing with or filming other students.