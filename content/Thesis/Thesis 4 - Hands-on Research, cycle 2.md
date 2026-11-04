---
date: 2026-10-31
tags:
  - thesis
  - reachymini
draft: false
author:
url:
---
https://arampundak.github.io/NYU_Shared_Minds/07-spatial/

![[sn - 7 spatial video.mp4]]

For this cycle I built a scene that explains how the LLM model works when talking to the [[Reachy mini]] added with my persona and different files.

The scene is a 3D replay of one scripted conversation, built in three.js around the real Reachy Mini model. The robot’s own 3D files load straight into the browser.

- **Distance means latency.** My Mac sits close, Pollen’s voice server on Hugging Face sits further out, and the OpenAI researcher floats far away. The slow loop looks slow because it travels further.
- **A tower of slabs is everything the language model reads before each reply:** persona, shop docs, research rules, tool list, and the conversation so far. Slab height follows token count. Each reply lights only the slabs it leans on, quoted from my real files.
- **The persona only reaches word choice.** The text-to-speech step gets the reply text and a voice setting, never the persona. That’s why an old demographic persona line just produced clichés: the only place it could show up was in the words.
- **The research loop:** Ari predicts a tool call, the Mac sends one request to OpenAI, and a note comes back and docks in the tower. Once a reply has used it, the note disappears.
- **An embedding lens** places each utterance in a small 3D cloud. Ari itself never does this; it’s there to connect to what we did in class.

Honest notes: the student lines are scripted, but Ari’s replies are samples I wrote in Ari’s style. The voices are browser text-to-speech, and the timings are illustrative. The constants are real (16 kHz audio, the 0.75 s wait, the 45 s timeout, the 24-utterance window).

**Process:** I built this with Claude (Claude Code). It read my repo, pulled the robot model and my persona and docs, and wrote the three.js scene. I directed the concept, the layout rules and the accuracy constraints. I also checked whether I could run the whole thing in Pollen’s MuJoCo simulation on my laptop alone. You can, which makes a robot-free live demo possible.
