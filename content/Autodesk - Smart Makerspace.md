---
date: 2026-10-26
tags:
  - hri
  - reading
draft: false
author:
url: https://www.research.autodesk.com/publications/smart-makerspace-an-immersive-instructional-space-for-physical-tasks/
---
## Smart Makerspace: An Immersive Instructional Space for Physical Tasks

Abstract
We present the Smart Makerspace; a context-rich, immersive instructional workspace for novice and intermediate makers. The Smart Makerspace guides makers through the completion of a DIY task, while providing detailed contextually-relevant assistance, domain knowledge, tool location, usage cues, and safety advice. Through an initial exploratory study, we investigate the challenges faced in completing maker tasks. Our observations allow us to define design goals and a design space for a connected workshop. We describe our implementation, including a digital workbench, augmented toolbox, instrumented power-tools and environmentally aware audio. We present a qualitative user study that produced encouraging results; providing features that users unanimously found useful.

### What it is

The paper takes ideas from software tutorials (contextual help clips, highlighting the right tool, overviews) and puts them into a physical maker workbench. It supports one novice or intermediate maker at a time, working through one pre-written DIY task.

### Method

1. **Observational study.** 8 participants (3 beginners, 2 intermediate, 3 experienced) built a “Proximity Box” from a 13-step Instructable on a laptop. The build involved soldering, a Dremel, a glue gun and a 3D printer, and took about 1 hour with think-aloud. Four problems came up:
    - **No overview.** Novices followed each step literally and could not resolve ambiguity. Experts read ahead and adapted.
    - **Missing domain knowledge.** Experts drew on tacit tricks such as a third hand or heat shrink. Novices had nothing to judge “good enough” against.
    - **Tool selection.** Everyone lost time searching the 47-bin toolbox. Novices also could not tell similar parts apart.
    - **Tool usage and safety.** Novices were unsure about technique. Some left irons and glue guns on.
2. **Design goals.**
    - D1: provide an overview.
    - D2: provide domain knowledge.
    - D3: limit error.
    - D4: give spatially and contextually relevant instruction.
3. **Design space.**
    - Displays: multiple, mobile, head-mounted, or fixed-large.
    - Modalities: tactile, audio, visual.
    - Tool augmentation: capture, locate, control, actuate.
    - Safety: feedback, inform, control.
4. **System.**
    - An 84" 4K touch display laid flat as the workbench, with a depth camera overhead. It shows the manual, a step overview, videos of other users, and contextual help clips.
    - Sensors on the tools report their state: a light sensor on the soldering iron, a voltage monitor on the 3D printer, a hall-effect sensor on the Dremel’s speed switch, and a temperature sensor in the glue gun’s holster.
    - Each toolbox bin has an LED that lights to guide the maker to the right part.
    - Audio gives positive tones and warnings, with volume adjusted to the noise of the tool in use.
5. **Evaluation.** 8 new participants built the same box using the system. They rated each feature on a 5-point “I found it useful” scale.
    - Enjoyment averaged 4.75/5 and the table 4.38/5.
    - 13 of 15 features were rated useful on average.
    - The best-rated features were the toolbox lights, the safety-goggle warnings, and the text help clips.
    - The worst-rated was the Dremel speed alert, which interrupted without saying why.
    - Six participants picked up tools or techniques from the videos that the manual never mentioned.
6. **After the study they added:**
    - Query-by-material and query-by-tool: picking up a piece jumps the manual to the step that uses it.
    - An opt-in help mode, because users wanted to try first before getting help.
    - Smart safety glasses, because the goggle tone fired even when users were already wearing them.

### Weaknesses (for honest comparison)

- n=8 per study, with different people in each. “Before vs. after” claims, such as 5 vs. 2 people needing goggle reminders, are not controlled comparisons.
- The evaluation is self-reported usefulness with an experimenter present. There was no baseline condition and novelty was not controlled. The authors admit it was not designed for quantitative results.
- They used one authored “hello world” task chosen to cover many skills, not real projects.
- Instructions were manually authored. Dynamic generation is listed as future work.
- The claim to be “first of its kind” is asserted, not demonstrated.

### Relevance to your SDC entry

It is the closest prior work for the setting, so you should cite it. Where it matters:

- **It supports your role choice.** Their own findings point away from step-by-step instruction: users wanted to struggle first, making is unstructured, and experts wanted the overview so they could go their own way. Your tutor-not-assistant stance and the “quiet for 10 minutes” timer follow directly from their conclusions. Use that.
- **It shows the gap you fill.** It is procedural: it tells you how to do a known task. Ari is about design judgment on an open-ended project, which this paper does not touch. It also has no embodied agent and no conversation, and its “dynamic instruction generation” future work is what an LLM now makes possible.
- **A lesson you should take:** an alert that interrupts without explaining was the least liked feature. Any safety interruption from Ari needs a reason attached.
- **It points to a tension you have not resolved.** Their system’s value came from knowing state: sensed tools, an always-on overhead camera, and eventually sensing whether goggles were on. Your blind-box default deliberately gives that up. Reviewers who know this paper may ask how Ari can do safety if it does not see. You need an answer, such as relying on the shop’s existing laser-cutter interlocks or staff handoff, or a stated scope limit.
- **Multi-party is open.** They mention alerting other makers in group spaces only as future work. That confirms your multi-party layer is unclaimed territory and not a rehash.
- **Small differences:**
    - Their machines were a 3D printer, Dremel, soldering iron and glue gun, with no laser cutter, so they don’t overlap directly with your laser-cutter focus.
    - Their observation that participants oriented themselves around the laptop is relevant to the dock-vs-carried question. Fixed technology becomes the anchor of the workspace.