---
date: 2026-10-03
tags:
  - reachymini
  - resource
draft: false
author: Binh Pham
url: https://garden.binhph.am/articles/the-best-expressive-harness-for-robots
---
Made out of 2 components:

## 1. [[Reachy motion generator]] 

turns a text prompt into a motion clip, like "heartbroken" or "nervous penguin on a diving board." It works in two stages:
- **Planner:** a fine-tuned language model (Qwen, in 0.8B, 4B or 27B sizes) writes a short "recipe" using three commands: `go`, `hold` and `osc` (oscillate). The recipe sets head pose, height, antenna droop, body turn and an "energy" level.
- **Generator:** a small model (about 22M parameters) expands that recipe into smooth motion at 25 frames per second, with natural overshoot. It's trained on Pollen's roughly 9 minutes of recorded emotion and dance clips, plus about 10,000 synthetic recipes.
- A reachability step uses the same inverse kinematics as Pollen's SDK, so the head isn't asked to reach poses it can't.

## 2. [[Reachy animation]]

is a lightweight library that runs all the time underneath. It layers idle breathing, playback of the 104 built-in emotion and dance clips with crossfades, and head sway that follows live speech audio. It needs only numpy, and generated motions plug in with `play()`. Both projects are Apache-2.0.