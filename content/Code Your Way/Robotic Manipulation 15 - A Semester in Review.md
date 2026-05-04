*Final Summary for Code Your Way - Spring 2026*
## The Vision
This project set out to create an artistic installation where a stranger would draw a doodle in the air using hand gestures, then watch a SO-ARM100 robotic arm redraw their gesture in a dark room using an LED, producing a long-exposure photograph. The key artistic tension: the robot's precision of intention, even if the physical output is imperfect.

The project became a vehicle for learning Python and robotics through real hardware control, with artistic reference to Gysin-Vanetti's long-exposure LED plotter work, though my vision was distinct—gestural human input, stranger-as-participant, doodle aesthetic rather than geometric precision.

---
## The Journey: From Configuration to Control
### Phase 1: The Black Box Problem (Weeks 1-2)
**March 25-29, 2026**

I started with the ambition to use LeRobot, the Hugging Face framework designed for the SO-100 robotic arm. The official pipeline seemed straightforward:
```
Python → LeRobot → controller board → servo bus → motors → arm motion
```
But after 3 hours of trying to assign IDs to motors, failing to get them recognized, and hitting wall after wall, I realized the problem wasn't technical incompetence—it was about entry points. The arm had been onboarded before. LeRobot expected a fresh system.

**The breakthrough:** Stop treating the robot as a black box. Go down one level.

I switched to the XIAO ESP32-C3 microcontroller directly, using Arduino IDE and the `SCServo` library. Within minutes, I could ping motor IDs, move servos, and confirm the arm was alive.

**Key learning:** High-level frameworks are powerful, but when they fail, you need to understand the layer beneath them.

---
### Phase 2: Building the Bridge (Week 3)
**March 26-29, 2026**

Once the XIAO could talk to the servos, I built my own communication pipeline:
1. **XIAO firmware** (C++/Arduino) that scans servo IDs, reads positions, and sends them over USB serial in the format:

```
1,2034
2,1881
END
```
2. **Python script** (`live_position.py`) that opens the serial port, parses the stream, and displays a live terminal dashboard of motor positions.
This was the first moment the robot became legible. I could see the arm's internal state in real time.

**Architecture established:**
```
Servo bus → XIAO ESP32-C3 → USB serial → Python → terminal display
```

---
### Phase 3: Calibration and Safety (Week 3-4)
**March 29, 2026**

After reading live motor data, I created a software model of the arm:
**`arm_config.py`** — the single source of truth:
```python
JOINTS = {
1: "shoulder_pan",
2: "shoulder_lift",
3: "elbow_flex",
4: "wrist_flex",
5: "wrist_roll",
6: "gripper",
} 

CALIBRATION = {
"shoulder_pan": {
"id": 1,
"neutral": 3270,
"min": 2070,
"max": 3940,
},
# ... etc
}

```

I built:
- `clamp_position()` — safety function that keeps commands within safe ranges
- `pose_is_safe()` — verifies an entire arm pose before execution
- Named pose system — dictionaries like `REST_POSE`, `WAVE_LEFT`, `WAVE_RIGHT`
**Key insight:** Python uses indentation to define structure (this was genuinely new to me).

---
### Phase 4: Actuation - The First Closed Loop (Week 4)
**March 29-30, 2026**

I reversed the communication direction. Instead of only *reading* motor positions, I added a serial protocol so Python could *send* movement commands:

Command format:** `MOVE,id,target,speed,acc`
The XIAO firmware would receive this and translate it into `WritePosEx()` calls on the servo bus.
My first successful test: opening and closing the gripper from Python.
**This was the complete loop:**
```
Python decides → Python sends → XIAO receives → servo moves → physical motion
```

---
### Phase 5: Hello World Wave (Week 5)
**March 30, 2026**

I designed choreographed arm poses for a robotic wave. This required:
- Defining multiple poses (rest, raised, wave-left, wave-right)
- Smooth interpolation between poses (20-step transitions)
- Testing physical limits without breaking the arm

The wave worked, but it shook and jittered. I assumed this would be an easy fix.

**Spoiler:** It was not an easy fix.

**Meta-learning moment:** I moved my workflow entirely to Claude.ai, typing AI-generated code word-by-word rather than copy-pasting. This forced me to read every line and understand what it did.

---
### Phase 6: The Simulation (Weeks 6-7)
**April 5-13, 2026**

While building the physical arm control, I discovered the SO-ARM100 had already been converted to a MuJoCo MJCF model in Google DeepMind's official MuJoCo Menagerie collection.
This was massive. I could:
- Test inverse kinematics without risking the real arm
- Visualize the workspace
- Define a drawing plane
- Prototype path execution
- 
**The simulation became the R&D space where I could move fast.**
Key script: **`trace_plane.py`** — loads the arm model, defines a 2D drawing plane in 3D space, and uses damped least-squares inverse kinematics to move the LED tip through a path.
**Damped Least Squares IK (the algorithm that drives everything):**

The problem: you know where you want the LED tip (target point in 3D), and you need to find 6 joint angles that put it there.

  

The solution: linearize locally using the Jacobian matrix.

  

```python

error = target - current_position

J = mj_jacBody(model, data) # Jacobian: how joint motion → tip motion

dq = J.T @ inv(J@J.T + λ²I) @ error # Damped least squares

qpos += dq * dt

```

  

The damping term `λ²I` keeps the solution stable even when the arm approaches singularities (like full extension).

  

**Why it works:** Each iteration takes a small Newton-like step toward the target. The loop repeats until the error drops below 5mm or hits the step cap.

  

---

  

### Phase 7: Hand Tracking Interface (Week 7)

  

**April 6, 2026**

  

Built a full-screen ml5.js hand-tracking interface using Dan Shiffman's sketch as a base:

  

**Features:**

- Mirrored webcam feed

- Pinch-to-draw logic (persistent canvas over video)

- Strokes stored as normalized 0-1 coordinates

- Reveal mode that fades the face, leaving glowing strokes

- Reset button

  

**User flow:**

1. Sit in front of laptop

2. See your face mirrored

3. Pinch fingers to draw

4. Hit reveal — screen goes dark, your drawing glows

  

The interface was testable independently of the robot. I ran user testing to validate the interaction design.

  

---

  

### Phase 8: Connecting the Systems (Week 8-9)

  

**April 12-19, 2026**

  

This was where simulation met reality.

  

**The pipeline:**

  

1. User draws in p5.js → `drawing.json` with normalized coordinates

2. `trace_plane.py` loads JSON

3. Python maps 2D strokes onto a 3D vertical plane

4. IK calculates joint angles for each waypoint

5. Simulation visualizes the path with red capsule trail

  

**The bridge code:**

  

```python

def strokes_to_path(strokes, plane_center, half_size):

"""Convert normalized 2D points to 3D world targets on plane."""

path = []

for stroke_idx, stroke in enumerate(strokes):

for pt_idx, pt in enumerate(stroke):

# Map 0-1 to physical plane coordinates

world_x = plane_center[0] + (pt['x'] - 0.5) * 2 * half_size

world_z = plane_center[2] + (pt['y'] - 0.5) * 2 * half_size

world_y = plane_center[1] # Fixed depth

path.append({

'x': world_x,

'y': world_y,

'z': world_z,

'pen_down': pt_idx > 0 # First point = travel move

})

return path

```

  

**First success:** Smiley face drawn in p5 → appears in MuJoCo simulation with the arm tracing it perfectly.

  

**The characters in the code** (storytelling framework):

  

- **The Drawing** — JSON file, arrives like a letter with instructions

- **MuJoCo** — physics simulator, the stage where motion is tested

- **The Arm (XML)** — 6-DOF model definition, the actor

- **The Jacobian** — tells each joint which direction to lean

- **The IK Loop** — obsessively tries to reduce its own error

- **The Servos** — real-world executors (still waiting backstage)

  

---

  

### Phase 9: The Hardware Reality Check (Week 10-11)

  

**May 2-3, 2026**

  

Everything worked beautifully in simulation. Time to connect it to the real arm.

  

**Stage 1:** Find and verify the hello-world wave script from Phase 5.

  

**Problem:** The arm shook violently. Not subtle jitter—actual mechanical stress.

  

**Diagnosis:**

- Current draw spiked from 0.5A → 3A during descent to rest

- Gravity-driven instability on `shoulder_lift`

- Speed/acceleration values were unknown

  

**12 hours of debugging across two AI coding sessions:**

  

**Discovery 1 — Speed is backwards:**

```

0 = fastest (harshest, most jitter)

4000 = slowest

2500 = smooth, working value

```

  

**Discovery 2 — Acceleration units matter:**

The firmware had a `#define` that capped acceleration at 255, but our working value was 500. Removing the cap fixed motor responsiveness.

  

**Discovery 3 — Motor 1 center alignment:**

MuJoCo's home angle (-0.0576 radians) was being mapped linearly to encoder count 2977, but the physical neutral was 3270. Added an offset correction.

  

**Discovery 4 — Settle delays:**

The next waypoint was being sent before the servo finished reaching the previous one. Added:

```python

REAL_ARM_DRAW_SETTLE = 0.8

REAL_ARM_MOVE_SETTLE = 1.0

```

  

**Final working servo command:**

```cpp

st.WritePosEx(motorId, targetPos, 2500, 500);

```

  

**Result:** 5 of 6 motors work. Motor 4 (`wrist_flex`) stops ~1300 counts short with `load = -200` (others show `load = 0`).

  

**Hypothesis:** Maximum torque register on motor 4 is set lower than the others in EEPROM.

  

---

  

## What Failed

  

### 1. **Simulation ≠ Reality**

  

Perfect IK in MuJoCo. Real arm jitters, misses targets, fights gravity.

  

The simulation assumes:

- Instant response

- No mechanical backlash

- Infinite torque

- No power supply limitations

  

Reality has:

- Servo lag

- Encoder noise

- Current draw spikes

- Mechanical friction

  

### 2. **The Motor Speed Mystery**

  

Speed values are backwards (0=fast, 4000=slow) with no documentation explaining why. This cost hours of trial-and-error debugging.

  

### 3. **Time Ran Out**

  

With one week to go, the bridge between simulation and reality wasn't complete:

- Motor 4 still stops short

- No LED control implemented

- No long-exposure photography tested

- No end-to-end integration

  

**The two systems exist independently:**

- p5.js drawing interface: ✅ works, user-tested

- MuJoCo simulation: ✅ works, renders paths beautifully

- Physical arm control: ⚠️ 5/6 motors work

- **The bridge:** ❌ not connected

  

---

  

## What I Actually Learned

  

### Technical Skills

  

**Python:**

- Type systems and type hints

- Serial communication (`pyserial`)

- JSON parsing and file I/O

- Function structure and scope

- Virtual environments

- Indentation as syntax (genuinely new concept)

- `range(a, b)` goes from `a` to `b-1` (that's why we write `range(1, steps+1)`)

  

**Robotics:**

- Forward kinematics (joint angles → end effector position)

- Inverse kinematics (position → joint angles)

- Jacobian matrices (local linearization of FK)

- Damped least squares (singularity-robust IK)

- Servo communication protocols (Feetech STS3215)

- Calibration (neutral, min, max, safe ranges)

  

**Hardware:**

- Serial buses (how motors daisy-chain)

- Power supply considerations (current draw, voltage stability)

- The difference between firmware and software

- Microcontrollers as bridge devices (XIAO ESP32-C3)

- Encoder resolution (12-bit = 0-4095 counts)

  

**Development Workflow:**

- Using AI as a learning partner, not a code generator

- Typing code word-by-word to force comprehension

- Debugging with telemetry (read position, load, voltage, temp)

- Version control discipline (commits saved the project)

- Simulation before hardware (fast iteration, safe testing)

  

### Meta-Learnings

  

**Code is the easy part. Hardware teaches you humility.**

  

The most frustrating 12 hours of the semester were spent discovering that speed=0 means fast and speed=4000 means slow. Not elegant algorithm design. Not mathematical proof. Just undocumented hardware quirks.

  

**LeRobot failing was the best thing that happened.**

  

If the official framework had worked, I would have treated the arm as a black box and learned nothing about serial communication, motor control, or system architecture.

  

**Simulation is a thinking tool, not a solution.**

  

MuJoCo let me prototype IK algorithms and visualize the workspace without risking the physical arm. But it created a false sense of "the hard part is done." Reality has gravity, friction, and undocumented quirks.

  

**AI is most useful when you already know the domain.**

  

My prior foundations-of-robotics course gave me the vocabulary: IK, Jacobians, forward kinematics. That let me ask the right questions and recognize when an AI answer was wrong. Without that base, I'd have blindly trusted hallucinated solutions.

  

---

  

## The Path Forward (When I Return)

  

### Immediate Next Steps

  

**1. Fix Motor 4**

- Read EEPROM torque limit register

- Compare to working motors

- Increase if necessary

- Physical test: manually push wrist with torque on

  

**2. Complete the Bridge**

- `arm_executor.py` converts MuJoCo radians → serial commands

- Add command deadband (skip tiny changes)

- Test simple shapes (triangle, circle) on real arm

  

**3. LED Control**

- Find free GPIO pin on XIAO (probably D2/GPIO4)

- Add LED on/off to firmware (`L1`, `L0` commands)

- Modify `trace_plane.py` to send LED commands based on `pen_down` flag

  

**4. Dark Room Test**

- Mount LED on gripper bracket

- Test path execution in light first

- Long exposure photography (camera on tripod, 10-30s exposure)

- Verify the drawing is recognizable

  

**5. Polish the Experience**

- Calibrate timing (how long does a drawing take?)

- Add a "please wait" screen while robot draws

- Photo booth aesthetic (people know how to use photo booths)

- Display the result on screen after capture

  

### Bigger Questions

  

**How do I explain this technology to an audience that knows a little about code but nothing about robotics?**

  

The storytelling approach feels right. The code has characters:

- The JSON drawing that arrives like a letter

- The IK loop that obsessively tries to reduce error

- The Jacobian that tells the arm which direction to lean

  

A visual flowchart showing the lifecycle:

```

User draws → coordinates travel → arm interprets → light traces → photo captures

```

  

**How do I give the arm autonomy so it feels like collaboration, not repetition?**

  

Current system: the arm is a precise plotter.

  

Possible additions:

- The arm "interprets" the drawing (smooths sharp corners, adds tremor)

- The arm draws "what it thinks you meant" (stylization)

- The arm adds its own signature or timestamp

  

**Is this a production-ready installation or a proof of concept?**

  

Right now: proof of concept.

  

For production:

- Reliability testing (100+ cycles without failure)

- Graceful error handling (what if motor stalls mid-drawing?)

- User experience design (timing, waiting, reveal)

- Physical design (enclosure, lighting, cable management)

  

---

  

## Technical Artifacts

  

### Key Files (Preserved for Future Use)

  

**Hardware Control:**

- `xiao_recive_move.ino` — XIAO firmware with telemetry

- `arm_executor.py` — MuJoCo radians → serial commands bridge

- `arm_config.py` — calibration data (neutral, min, max)

  

**Simulation:**

- `trace_plane.py` — MuJoCo IK simulation with trail visualization

- `scene.xml` — world definition with drawing plane

- `so_arm100.xml` — arm model with LED tip site

  

**Interface:**

- p5.js sketch — hand tracking + pinch-to-draw

- `drawing.json` — exported stroke data

  

**Working Values:**

```python

SPEED_DRAW = 2500

SPEED_MOVE = 2500

ACC = 500

REAL_ARM_DRAW_SETTLE = 0.8

REAL_ARM_MOVE_SETTLE = 1.0

COMMAND_DEADBAND_COUNTS = 5

IK_DAMPING = 0.01

IK_DT = 0.002

```

  

### Resources That Saved the Project

  

- **MuJoCo Menagerie** — official SO-ARM100 model

- **Dan Shiffman / The Coding Train** — ml5.js hand tracking base

- **Gysin-Vanetti** — artistic reference for long-exposure light trails

- **Claude.ai** — debugging partner, code explainer, learning scaffold

- **Office Hours** — robotics professor for IK guidance, course TA for Python patterns

  

---

  

## Final Reflection

  

This project didn't achieve its full vision. There's no long-exposure photograph. The robot doesn't draw in the dark. The experience isn't installation-ready.

  

But that's not failure.

  

I came in wanting to "learn Python by manipulating a robotic arm." I achieved that and more:

- Built a full control pipeline from scratch

- Implemented inverse kinematics

- Created a testable user interface

- Debugged real hardware at the servo level

- Developed a mental model of how robot systems work

  

The gap between "simulation works" and "hardware works" is the most valuable lesson of the semester. It's where theory meets reality. Where clean math meets messy physics. Where Python indentation meets undocumented motor quirks.

  

When I return to this project—and I will return—I'll have:

- A working simulation to test ideas

- A calibrated arm with 5/6 motors functional

- A user-tested interface

- A complete understanding of the communication pipeline

- 14 blog posts documenting every dead end and breakthrough

  

The hard part isn't the code. The code is written.

  

The hard part is the last 10%: making it reliable enough to show strangers.

  

---

  

*Code Your Way, Spring 2026*

*Aram Pundak*