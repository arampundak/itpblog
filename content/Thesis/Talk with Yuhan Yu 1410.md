---
date: 2026-10-14
tags: []
draft: false
author:
url:
---
This week I talked with Yuhan Hu (wrote [[ELEGNT]]), a robotics researcher at Apple who came out of [[Guy Hoffman]] lab and whose work on expressive, non-humanoid robots I’ve been reading closely. I came in with my shop-tutor robot idea and left with a harder question than the one I brought.

The first thing she asked was what the robot actually adds. There are plenty of AI tutors. Why give one a body? I didn’t have a clean answer, and that’s useful to know now. “It can see what you’re doing” is an argument for a camera, not for a robot.

We also talked about the problem I keep circling: humanoids can learn from human motion, but a robot that looks like nothing human has no data to learn from. Every character has to be designed by hand, and that doesn’t scale. I think that’s exactly why design matters here, but I need a better answer for who does that work and how.

The other thread was perception. If a robot hides its camera, people may feel less watched, but they also can’t tell what it sees. For a robot in a shared space, that tension might be the real design problem.

Her advice to me was to build technical fluency and show up where the field gathers. Next stop: HRI in March.

Take Aways:
- She asked what the research question behind Ari is, and what the physical robot adds to the tutoring, given how many AI tutors already exist.
- in Elegent - animators made expression vocabularies, which were turned into robot motion and light. These were treated as building blocks and triggered at runtime based on context. She said it was purpose-built, not generative. state machine / behavior tree framing.
- The Gap: humanoids can learn from human data through retargeting. A non-anthropomorphic robot has no such mapping, so its character has to be designed from scratch for each embodiment. Animator time does not scale the way foundation-model training does. She said she does not know whether this can be solved, or whether it should be.
- **On Reachy Mini:** the form factor removes manipulation and locomotion, which lets you focus on the relationship: communication, gesture, presence and awareness.
- **On privacy:** it was not considered in ELEGNT. She said the camera was hidden in the lamp head and mostly not tracking outside interactions. She agreed it would matter for a product.
- **Advice:** build technical fluency. Train models using AI tools to develop intuition for robot learning. Grow a foundation model.
- ==She asked “what is the goal?” and “what does embodiment add?”== 
	- ==“We’ll have a different connection with embodied AI” is an assertion, not an argument.==
	- “Proactivity plus a camera that sees what you’re doing” is a camera argument, not an embodiment argument. ==A fixed camera with a speaker, or a phone on a stand, could do the same thing.==
	- ==My thesis rests on the claim that physical presence changes interaction.== Could not be defended?
- ==“Rod not fish” makes it sound like an idea, not a question.== That is likely why she asked what the question was.
- She had a point that designing character per embodiment is slow and does not scale. Industry will therefore default to whatever can be learned from data, meaning humanoids and functional motion.

---
## Questions for Yuhan Hu

**About ELEGNT and your work**, Movement to convey emotions
- * ELEGNT treats functional and expressive utility as separate objectives. In practice, ==how did you decide when expression should yield to function?== In a shop with dangerous machines, I think my tutor robot should almost always yield. ==Does your framework have a notion of context-dependent weighting?==
- **How did you arrive at the expressive movement primitives?** Did they come from animation principles, user observation, or iteration on the hardware?
- * The lamp has a camera, and **expressive “looking” makes perception visible**. ==Did surveillance or perceived privacy come up in your study or design discussions?== I’m designing a physical visor that users must move to grant the robot sight.
- How did you design the user study comparing expressive and functional movement? What would you do differently, and what is realistic for a master’s student without a formal IRB?
- My robot runs on a low-DOF platform. What survives when you drop from 6 DOF to fewer? Which expressive qualities break first?

**About my HRI SDC submission**
- * ==What makes a student design competition entry stand out to HRI reviewers, and what do designers typically get wrong in that community?==
- My setting is semi-public (a university shop). Will reviewers accept that as “public,” or should I deploy in a second, more open space before submitting?

**About thesis direction**
- I’m torn between “robots adapting to human social norms” and “robots improving human-human interaction.” Which do you think is more open as a research space right now?
- ==Coming from Guy Hoffman’s lab, which questions in non-anthropomorphic expression do you think remain unanswered?==

**About career**
- * ==What gaps do you see in HRI teams that engineers and HCI researchers aren’t filling, where someone with an industrial design background adds real value?==
- ==How did you move from academia into industry research? What does a researcher’s day-to-day look like at a place like Apple, compared with a lab?==
- Is there a realistic path into expressive or character-focused robotics roles without a PhD?
- Is there anyone else you think I should talk to?