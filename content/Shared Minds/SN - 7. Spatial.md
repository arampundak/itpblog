---
date: 2026-09-29
tags: []
draft: false
author:
url:
---
>Does 3D space help you think? Would more spatial metaphor in computer interface help you organize and inspire your thoughts? Does placing items in a particular place help you remember and be able to recall it. Do the spatial affordances help to you in an activity. Does spatial metaphor feel more real and thus become more deeply convincing. Is there a part of your body that will only accept things as real if the are presented in a spatial form?

ohhh weeee (thats a Rick and Morty reference)

this week i've seen 2 references that amazed me and id like to share here
![[sn - lyramakes neuron explorer.webp]]
[[neuron explorer]] - by Iyra, that I found on X. They made an incredible LLM layer visualization that shows which neurons fire when the model is (not sure whats the right word here). He then found that if you change wights of neurons the model output changes, he used Qwen3.5-4B and made "evil qwen".
![[ref - lucen worlds 1.webp]]
[[Lucen Worlds Sim]] - acts as a digital companion to their physical hardware. It's a gamifiyed browser version of reinforcement learning and locomotion of their robots. Very playful and fun.

These 2 led me to think about a my main inquiry this year - what is character in robotics. in order to do so i'm [[Entering the HRI 2027 Student Design Competition]] - by using a [[Reachy mini]] robot platform. I delved into the code of the robot and found that you can change the character/persona by writing profile.md doc and grounding docs, that touches the interaction at different levels.

3D space helps me think.
Spatial metaphor in computer interface - helps me organize my thoughts.
My ape brain needs to add 3D to flowcharts, to make diagrams more understandable.

---

This week I took my Ari project into 3D. Ari is a voice tutor for the ITP laser shop, running on a Reachy Mini. I wanted to see, and show, where a robot’s character actually gets in. The answer turned out to be: only through text, and only at one step.
![[sn - spatial 1.webp]]

The scene is a 3D replay of one scripted conversation, built in three.js around the real Reachy Mini model. The robot’s own 3D files load straight into the browser.

- **Distance means latency.** My Mac sits close, Pollen’s voice server on Hugging Face sits further out, and the OpenAI researcher floats far away. The slow loop looks slow because it travels further.
- **A tower of slabs is everything the language model reads before each reply:** persona, shop docs, research rules, tool list, and the conversation so far. Slab height follows token count. Each reply lights only the slabs it leans on, quoted from my real files.
- **The persona only reaches word choice.** The text-to-speech step gets the reply text and a voice setting, never the persona. That’s why an old demographic persona line just produced clichés: the only place it could show up was in the words.
- **The research loop:** Ari predicts a tool call, the Mac sends one request to OpenAI, and a note comes back and docks in the tower. Once a reply has used it, the note disappears.
- **An embedding lens** places each utterance in a small 3D cloud. Ari itself never does this; it’s there to connect to what we did in class.

Honest notes: the student lines are scripted, but Ari’s replies are samples I wrote in Ari’s style. The voices are browser text-to-speech, and the timings are illustrative. The constants are real (16 kHz audio, the 0.75 s wait, the 45 s timeout, the 24-utterance window).

**Process:** I built this with Claude (Claude Code). It read my repo, pulled the robot model and my persona and docs, and wrote the three.js scene. I directed the concept, the layout rules and the accuracy constraints. I also checked whether I could run the whole thing in Pollen’s MuJoCo simulation on my laptop alone. You can, which makes a robot-free live demo possible.
