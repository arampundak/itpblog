---
date: 2026-10-06
tags: []
draft: false
author:
url:
---
The ask:
>Explore your inquiry space by making a set of creative explorations. 
Look at your research findings. Do they bring up any questions, suggest specific media, forms/materials, or technologies that you want to investigate further? Make a plan to create 2-5 explorations, each addressing a different question –– [here is a worksheet you may find helpful](https://docs.google.com/document/d/1wZ9n_UdoydxWUSU-WjDuBJid7wsurUx7DshLmNsWlhQ/edit?tab=t.0).
Consider creating: 
An exploration of the sensory experience of interacting with the kinds of artifacts you are interested in.
A tech/workflow experiment, to acquaint yourself with a technique/technology you are interested in using, or test viability.
A series of experiments addressing the same question/concept with different media, or
A series of experiments in the same medium, addressing different questions
Progress update 3. Document your first set of creative explorations. For each: what did you learn? Did it answer your question? Did some questions come up that you want to address in the next research- by-making cycle? Do you have any questions for those who will read your post (your advisor, resident and peers)?
Bring your explorations to our next meeting. If not possible, make sure to have an alternative way to share it with peers handy, like pictures and video documentation.

## Exploring human robot interaction first hand

Today was my first hands on experience with [[Reachy mini]]. I borrowed a prebuilt unit from a friend to develop on until the one I bought will arrive from china. Getting it moving was easy, getting it to hear me took some more time.
Overall im astonished by how well its working.

![[rchy - expressions.mp4]]

**TL;DR** Camera and microphone didn't work... camera problem was fixed by software update. I had a microphone problem that turned out to be a cable installed upside down. 
Along the way I updated the audio firmware, learned to read the robot's logs, and narrowed the problem down layer by layer until there was nothing left to blame but the hardware.
I sharpened my ability to deduct different problems. and what is `.venv`

![[rchy - how does your character work.mp4]]

---
## 1. Camera: "Connection Failed"

I plugged the robot into my Mac and the motors worked fine, but the desktop app showed:

> CONNECTION FAILED: Timed out waiting for WebRTC stream from ws://localhost:8443

The error was about the camera video stream, not the robot itself. [[The daemon]] (the background service that talks to the robot) streams the camera to the app over WebRTC, and that stream never arrived. There's an open issue in Pollen's repo about the streamer freezing on its first session ([reachy_mini #1416](https://github.com/pollen-robotics/reachy_mini/issues/1416)).

I ruled out defects by turning on Photo Booth and using the Reachy Mini as a camera input

**Fix:** I updated the Reachy Mini app and daemon. The camera feed came up right away.

---
## 2. The conversation app couldn't hear me

I installed Pollen's **conversation app** from the dashboard. It started cleanly, with no errors in the log, but the robot never responded to my voice.

What I checked:

- macOS **could** see the robot's mic in Sound → Input 
- The app had microphone permission 
- The app loaded "nicely" 

In order to understand whats going on I went into the debug mode running in the Terminal.

```bash
git clone https://github.com/pollen-robotics/reachy_mini_conversation_app.git
cd reachy_mini_conversation_app
uv venv --python python3.12 .venv
source .venv/bin/activate
uv sync
reachy-mini-conversation-app --debug
```

What the debug log showed:
The log showed that most of the system worked:
- The app found the **Reachy Mini Audio** device
- It connected to the Hugging Face realtime voice backend
- It generated a greeting ("Hello there! I'm all powered up and ready to help, provided my circuits behave.")
- The head **wobbled along with the speech**, so the reply audio was arriving

Firmware check and update:
I found an issue in Pollen's repo with exactly my symptoms ([reachy_mini #820](https://github.com/pollen-robotics/reachy_mini/issues/820): the mic returns all-zero audio on macOS). The suggested fixes were newer audio firmware or reseating the mic cable.

Asking the audio chip directly:
The decisive test: the daemon can read energy values straight from the XMOS audio chip, _before_ any audio reaches the Mac.

```bash
for i in {1..20}; do curl -s "http://localhost:8000/api/audio/config/parameter/AEC_SPENERGY_VALUES"; echo; sleep 0.5; done
```

I talked and clapped next to the head, and got 20 readings of:

```
{"name":"AEC_SPENERGY_VALUES","values":[0.0,0.0,0.0,0.0]}
```

All four microphones were reading zero at the chip itself. That ruled out software, firmware, macOS and permissions, and left only the hardware.

## Root cause: the cable was upside down

I opened the head. The mic's flat ribbon cable (FPC) was plugged in **upside down**, so none of the contacts were touching...

### `.venv`
`.venv` is a **virtual environment**: a private folder of Python and libraries that belongs to one project.

**The problem it solves:** different projects need different versions of the same library. Today the conversation app needed `reachy-mini` 1.11.0 while the desktop app had its own copy. If everything were installed into one shared Python on your Mac, projects would overwrite each other's versions and break.

**What it is:** a folder named `.venv` inside `reachy_mini_conversation_app`. It holds a copy of Python 3.12 and the 124 packages that `uv sync` installed. The dot at the start just hides it in Finder.

**The commands you ran:**

- `uv venv --python python3.12 .venv` **created** the empty environment.
- `source .venv/bin/activate` **switched it on** for that Terminal window. That's why `(.venv)` appeared in your prompt. While it's on, `python` and `reachy-mini-conversation-app` come from that folder.
- `uv sync` and `uv pip install ...` **installed packages** into it, not into your Mac's system Python.
- `deactivate` **switched it off**.

**Analogy:** it's like a dedicated toolbox for one project in the shop. Each project's box holds exactly the tool versions that project needs, so nothing gets mixed up between projects.

Activation lasts only for that Terminal window, which is why each new window needed `source .venv/bin/activate` again. Deleting the `.venv` folder removes everything it installed without touching the rest of your Mac.
