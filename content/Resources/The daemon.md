---
date: 2026-10-03
tags:
  - reachymini
  - resource
draft: false
author:
url:
---
The **daemon** is the background program that actually talks to the robot. ("Daemon" is the general computing term for a program that runs quietly in the background.)

The robot's motors, camera, mics and speaker all connect to your Mac over USB, and only one program can manage that hardware at a time. That program is the daemon. Everything else goes through it:

```
Desktop app ─┐
Conversation app ─┼──►  Daemon  ──USB──►  Robot (motors, camera, mics, speaker)
Your Python scripts ─┘
```

**What it does:**

- **Motors:** receives commands like "turn head left" and sends them to the motors.
- **Camera:** captures video and shares it. The WebRTC stream on port 8443 was the daemon sending video to the desktop app.
- **Audio:** handles the mics and speaker, and passes settings to the audio chip.
- **Local server:** listens at `localhost:8000`, which is how apps connect to it. Your `curl` command asked the daemon a question there.

**Where it showed up in [[Reachy Mini Experiment 1]]:**

- **"Timed out waiting for WebRTC stream":** the daemon's video streamer froze. Updating it fixed that.
- **"Daemon v1.8.0" in the app:** its version number.
- **"Connection refused" on port 8000:** the daemon wasn't running because the robot was off in the desktop app, so the conversation app had nothing to connect to.
- **The version warning:** the robot library in your `.venv` has to speak the same "language" as the daemon, which is why mismatched versions trigger a warning.
- **`AEC_SPENERGY_VALUES`:** you asked the daemon to read the audio chip's levels directly.

**Who runs it:** on your USB robot, the desktop app starts the daemon on your Mac when you press the power button, and stops it when you shut down. On the wireless version you have coming, the daemon runs on the robot's own computer instead, and apps connect to it over Wi-Fi.

**Analogy:** the daemon is like the shop manager standing next to the machines. Students (apps) don't operate the machines directly. They ask the manager, who runs them safely and makes sure two people don't use the same machine at once.