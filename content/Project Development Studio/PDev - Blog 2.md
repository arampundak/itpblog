---
date: 2026-09-28
tags: []
draft: false
---
Last week I had two directions: AI companionship, or care between two partners. Both were about private, one-on-one intimacy. This week the project moved into a public space and got a lead character.

**Jig Sawyer, Jr.** is a wooden-shelled social robot built on the Reachy Mini. He lives in the ITP shop as the junior member of a trio with itp shop managers, Phil and Ian. He has their dry shop humor, and he takes safety rules seriously.

The idea is the same one from last week: _a body for intelligence, where character is made visible and expression becomes the interface._ What changed is that the character now has a job, a place, and an audience.

---
## Topic - Attribute - Device - Mood

**TOPIC: Character as interface in shared public spaces** 
How does personality make a machine approachable to strangers? 

**ATTRIBUTE: Interactive, Reactive, Proactive (voice-first, real-time)** 
He can be interrupted, he turns toward whoever is speaking (direction-of-arrival mics), and he reacts to people coming in.

**DEVICE: Personification / Juxtaposition** 
A machine among machines that is made from the same material as the shop.

**MOOD: Warm, crafty, dry-witted** 
Patient with beginners, strict about safety glasses. 

---
## [[Timeline]]

**Next steps:**

- Write the character bible: who he is, how he talks, and what he won't say - Reference "Technologies of Relation" show at Mass Moca.
- Plug Reachy Mini (and dont burn it)
- Learn [[Reachy Mini Application Page]]
- Learn [[HeyRobo for Reachy Mini]]
- Get the speech loop running and measure latency
- Measure the Reachy Mini head and body, then model the first shell to print
- Contact wood vendors this week: 5-axis CNC blocks, plus veneer-film shades as a cheaper fallback

---
## Pitch Deck

[Link to Presentation](https://docs.google.com/presentation/d/1n_gdwM24ZBlLJSeZ80bhH0wWwTFpzjYcFnBWsVYn-6k/edit?usp=sharing)

**1. Title**
Jig Sawyer, Jr. administrative staff

**2. Blurb**  
Robots will soon roam the earth, expanding to everyday encounters. Designing the physical appearance of machines is not enough for adaptation and winning trust.
Robotic personas and characters will change the way humanity is addressing HRI. I'm designing a robot's expressive layer: its character, gestures, voice and timing. The goal is a machine that feels fluent, readable and graceful to live with.

**3. Audience Engagement**  
Approaching the ITP shop, you'll usually ask for Phil or Ian. Up next: Jig Sawyer, Jr. administrative staff. A test case for any shared workshop: library makerspaces, school fab labs, community shops.

Meeting askers, makers and newcomers: students who come to the desk with a question

What I want people to feel: Curious rather than wary. They should read its mood without needing instructions.

**4. Mindmap**  
![[Mind Map 1.canvas]]

**5. Moodboard**  
![[pdev - Mood Board 1.webp]]


**6. Implementation**  
Platform: Reachy Mini by Pollen Robotics, an open-source expressive robot with a 6-DOF head, animated antennas, camera, mic array and speaker.
Behavior (code): Designing its persona through movement, gaze, gestures and voice, using its Python SDK and a local voice pipeline.
Form (fabrication): A custom wooden shell and face that replaces the stock plastic body, inspired by the Luver lamp.

**7. Sketch**  
![[pdev - sketches combined.webp]]

**8. W.I.H.S.F. (What I have so far)**
- A borrowed Reachy Mini (wired) for testing now
![[Reachy mini]]

- A wireless unit ordered, arriving in about 5 weeks
- Research on its speech pipeline (voice/latency options)
- Form reference chosen, early sketches
- Next: first behavior tests on the borrowed unit, then shell prototypes


