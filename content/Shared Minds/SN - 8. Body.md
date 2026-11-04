---
date: 2026-11-03
tags: []
draft: false
author:
url:
---
## SO-100 Duel: Fencing With a Robot Arm Using Your Body

Link to sketch:
https://arampundak.github.io/NYU_Shared_Minds/08-body/

![[sn - 8 body dual.mp4]]

---

## Where this came from

This week DanO asked for an interface that asks more from the body than a mouse and keyboard - "Involve your buttocks."

I already had an ml5 sketch in my head. Last spring in Code Your Way I tried to make the [[SO101]] (robotic arm by Seeed studio) redraw a doodle people drew in the air with ml5 hand tracking ([semester review here](https://arampundak.github.io/itpblog/Code-Your-Way/Robotic-Manipulation-15---A-Semester-in-Review)). It never became a working prototype. because Sim2Real is hard. The simulation worked, the real arm shook, and I learned more than I built.

Last week I used the Reachy Mini to visualize how my tutor robot Ari thinks. I liked using a real robot model as a way to explain robotics to myself and to others. So this week I wanted another small sketch in the same direction: a robot you understand by being it.

Two more things pushed me:

- Last Friday (30/10) I visited Boston for the **Physical AI Summit at MIT**, run by Imagination in Action with MassRobotics and MIT CSAIL. Funny enough, it was called **Minds in Motion**, the same title as this week's Tversky talk. At an AMD ROS 2 workshop there, they had a pipeline where a laptop camera and Python control an SO-100. Same idea I had in the spring, but working.
- The most interesting idea I heard there was **System 1 and System 2 thinking applied to robots**. More on that below.

---

## System 1 and System 2 in robots

Kahneman split thinking into **System 1** (fast, automatic, catching a falling cup) and **System 2** (slow, deliberate, deciding which cup). At the summit this was used almost literally for robots:

- **System 2** is a big vision-language model that runs slowly, a few times a second. It looks at the scene, understands "put the dishes away," and sends down an intention.
- **System 1** is a small, fast policy, hundreds of times a second. It turns camera frames and that intention into motor commands: grasping, correcting, catching a slip.
- **Under both** are the servo control loops, thousands of times a second.

The open question is what passes between the two systems: words are readable but thin, learned vectors are rich but opaque.

It's also an old argument. In the 80s Rodney Brooks at MIT built robots that were pure System 1, stacked reflexes with no world model, against the "sense, plan, act" school. Today's robots are kind of a in-between the two.

In my game, **the player is System 2** (strategy, feints, deciding to attack) and **the pose-to-joint mapping is a borrowed System 1**. The loops even run at different speeds, and I show them on screen.

---

## What I built

A two-player browser game. Each player, on their own laptop, controls a simulated SO-100 holding a glowing laser sword, using their own arm and posture. There's no mouse or keyboard once you're in.

**The robot.** I loaded the real SO-100 URDF in three.js (like last weeks assignment). Joint names and limits come straight from the file. The blade is an emissive cylinder on the gripper, with bloom for the glow. I cared more about people recognizing the SO-100 than about physics.

**Your body becomes joints.** ml5's MoveNet finds your shoulders, elbows and wrists, and I turn those into the arm's joints:

- elbow angle → elbow_flex
- arm raise → shoulder_lift
- hand swing and lean → shoulder_pan

Everything is normalized by shoulder width, so distance from the camera doesn't matter. To start, you hold both hands up for a moment (calibration, and also the "ready" moment). A one-euro filter (smoothing filter for noisy real-time input) smooths everything, then each joint is clamped to the URDF limits.

**The wrist.** MoveNet has no hand points, so I added ml5's hand model. The wrist joint follows the angle between your forearm and a line from your wrist to your middle knuckle, drawn in pink on the camera preview.

**Three loops at three speeds:**
- perception: about 30 Hz
- control and rendering: 60 fps, with a max joint speed so the arm has some weight
- network: 20 Hz

**The game.** Each blade and each robot link is a line segment. Blades clashing makes sparks and pushes both arms back. A blade touching a link scores, upper links more than the base, with one second of protection after a hit. 60 seconds or first to 5. There's a dummy opponent for practice.

**Two players.** Joint angles travel over a peer-to-peer data channel (p5LiveMedia), with Firebase as an automatic fallback if the school network blocks it. The opponent is drawn 100 ms in the past and interpolated, so it looks smooth, a trick from multiplayer games. The defender's screen decides if a hit counted. Only joint angles leave your computer, never video.

**For robotics people.** `H` shows live joint bars against the URDF limits, going red when clamped. `F` shows coordinate frames on every link and a trail of the blade tip. What you're doing is called **retargeting**, mapping a human body onto a robot. It's the same teleoperation pattern used to collect training data for the robot models I described above.

**How I built it.** Same workflow as the last weeks: I planned the design and wrote a spec with Claude in chat, then built it milestone by milestone with Claude Code in VS Code, testing in the browser and committing after each step. Solo mode against the dummy came before networking, so I'd always have something playable.

---

## What went wrong

- **The model never ran,** because I started detection before it finished loading.
- **All keypoints came back at (0, 0)** until I gave the video element a `width` and `height`.
- **Hips were unreliable from a laptop camera,** so I dropped them. That's what made it work seated. So, honestly, I did _not_ involve the buttocks. The brief asked for them and the camera refused.
- **The robot can't let its arm hang down.** A human arm at rest has no matching pose on the SO-100, so I had to map rest to something else.

**Key learning:** the last one is the most interesting. A human body and a robot body don't have the same "zero." Retargeting is never a copy. You choose what the robot's version of your pose is. It's a small design decision, but it's the same problem real teleop systems have.

**Second learning:** in the spring the real arm taught me that simulation lies about the world. This time I chose to stay in simulation on purpose, and to make the _body_ the real part instead of the robot.

---

## What's next

- Remote play between two rooms, with the opponent's webcam in the corner
- Bring hips back with a better camera angle (and finally involve the buttocks)
- One day, connect it to the real SO-100. The firmware from last spring already accepts `MOVE` commands over serial.