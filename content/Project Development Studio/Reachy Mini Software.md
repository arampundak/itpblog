---
date: 2026-10-14
tags: []
draft: false
author:
url:
---
Aditya and I set to explore [[Reachy mini]] coded character and how we can inject it with what we need it to know.

**One Python package** that contains:

1. **Daemon** (`reachy-mini-daemon`, from the Reachy Mini SDK / desktop app): the low-level service that drives the motors, camera, mic and speaker.
2. **SDK** (the `reachy_mini` Python library, our fork pins it to 1.12.0rc1): the API apps use to talk to the daemon.
3. **App framework**: the base class, installer and templates for building apps. The apps themselves, including the conversation app, live in separate repos and Hugging Face Spaces.

```
Apps (conversation app / your Ari fork / others)   ← decides behavior
   │  imports
SDK (ReachyMini class, motion, media, app base)    ← API + helpers
   │  IPC / network
Daemon (IK, motor control, audio/camera, REST)     ← owns hardware
   │
Motors, mic, speaker, camera  (or MuJoCo sim)
```
### 1. Daemon: the hardware owner
`reachy_mini/daemon/` is a background service, and only one runs per robot. It:
- talks to the motors, through a Rust motor controller (`reachy_mini_motor_controller`)
- solves **inverse kinematics**. Apps ask for a head _pose_ (position + rotation), and the daemon works out what angle each motor needs to reach it.
- owns the camera, mic and speaker, using GStreamer
- exposes a REST/WebSocket API (`routers/`: motors, move, camera, volume, wifi, apps, update…)
- can swap the real robot for a **MuJoCo simulator** or a mock backend (`daemon/backend/robot | mujoco | mockup_sim`). So you can develop without the hardware.
### 2. SDK: the library apps use
It’s the general-purpose layer that every app uses. It finds the daemon and sends it commands.
The SDK is the `ReachyMini` class (`reachy_mini/reachy_mini.py`) plus helpers: `motion/`, `kinematics/`, `media/`, `vision/`, `utils/`.

### 3. Apps: anything built on the SDK
The apps themselves live outside of the SDK, in their own repos and Hugging Face Spaces. You can see this in your `.venv`: installing the conversation app pulled in `reachy_mini` 1.12.0rc1, and that’s why `reachy-mini-daemon` shows up in `.venv/bin`.

---
## Conversation App
The conversation app is Pollen’s flagship app, only one app controls the robot at a time
We made a fork of [Pollen Robotics’ Reachy Mini conversation app](https://github.com/pollen-robotics/reachy_mini_conversation_app) and changed it.
**What the app does**
- It takes audio from the mic and streams it to a **cloud voice model on Hugging Face**, then plays the reply through the speaker. The language model runs in the cloud, not on Mac or robot.
- It gives that model **tools** in `src/.../tools/`: move the head, dance, play emotions, remember or forget facts, check volume and status, and use the camera. It also has remote tools for web search, weather and time.

![[pdev - reachy mini conversation app.png]]

Reading the arrows as one loop
1. User audio → UI → backend.
2. The backend replies with **audio**, which goes to Motion Control so the head can wobble in sync while it plays.
3. Or the backend makes a **tool call** → Tool Layer, which only accepts tools the profile allows.
4. The Tool Layer does one of three things:
    - **movement request** → Motion Control → `reachy_mini` → robot. For example, a dance.
    - **camera**: grabs frames from `reachy_mini` and sends the **image for analysis** back to the backend (the dotted line).
    - anything else, such as weather or memory: runs it and sends the **results** back to the backend, so the model can talk about them.

What is missing:
- **The daemon isn’t shown.** `reachy_mini` looks like it talks straight to the robot, but in reality the daemon sits between them and does the inverse kinematics and motor control.
- **The backend is drawn as a local box.** In fact it’s a remote server reached over a WebSocket. That’s where latency, cost and privacy come from.
- **The audio path is out of date.** The diagram shows audio flowing into Motion Control. In this version the wobble code has moved into the SDK (the file says “Ported from reachy_mini_conversation_app”), and it runs inside the audio playback pipeline. The app just switches it on.
- **No speaker output arrow**, and no idle policy.

---
## Movement:
Python classes running inside the an app process (conversation app).
Most movement runs in one control loop in the app (`moves.py`). The exception is speech wobble, which the SDK’s audio pipeline computes as the audio plays.”
==This is a definition of character!== 

| Movement                        | Trigger                                                                                                                                 | When you’d see it                                                                                                                                         |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Speech wobble**               | Turned on once when the app starts (`robot.enable_wobbling()`). After that it reacts to the volume of whatever audio the speaker plays. | **Every time Ari talks.**                                                                                                                                 |
| **Breathing**                   | `moves.py` starts it 0.3 s after the robot has nothing else queued and isn’t listening                                                  | Between turns, as a slow up-and-down drift                                                                                                                |
| **Listening freeze**            | The voice server detects the user talking, so the antennas hold still                                                                   | While you speak                                                                                                                                           |
| **Dance / emotion / move_head** | **Only when the language model decides to call the tool**                                                                               | Rarely. See below.                                                                                                                                        |
| **Head tracking**               | The model calls `head_tracking`, but it needs the camera                                                                                | **Never in your setup**, because you run `--no-camera`                                                                                                    |
| **Idle behavior**               | **180 seconds** with no conversation activity, and nothing else moving                                                                  | After 3 minutes of silence. Even then, 60% of picks are “do nothing”, so a visible move happens only about 40% of the time, at most once every 3 minutes. |
