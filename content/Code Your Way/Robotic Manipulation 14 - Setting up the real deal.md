20260503

I started with making a plan of how to execute the final stages of the Project.
I failed, couldn't get pass stage 2. My code works great in simulation, but not in the real world. I mainly couldn't find the right speed and acceleration values to operate the motors. 
Hardware Software עלאק

The plan:

**Stage 1 — Find and verify your serial Python code** Before anything else. Find your hello world wave script. Connect the arm. Run it. If it shakes, that's a speed/step issue we can tune. Don't proceed until the arm moves smoothly from Python.

**Stage 2 — Bridge MuJoCo IK to serial commands** `trace_plane.py` currently only sets `data.qpos` in simulation. You need a function that takes those same joint angles and sends them to the real arm over serial. This is a Claude Code brief — maybe 20 lines.

**Stage 3 — Find a free GPIO pin for the LED** Look at the driver board sitting on your XIAO physically. Which pins are accessible? D0-D3 are the safest candidates. Pick one — probably D2 (GPIO4).

**Stage 4 — Add LED control to the Arduino firmware** The XIAO currently runs firmware that listens for servo commands over serial. You need to add LED on/off to that same firmware — listening for a simple extra command like `L1` (LED on) and `L0` (LED off). This is an Arduino code change, another Claude Code brief.

**Stage 5 — Add LED commands to Python** In `trace_plane.py`, the `move_to_target` function already has a `pen_down` boolean. When `pen_down=True`, send `L1` over serial. When `pen_down=False`, send `L0`. Simple addition.

**Stage 6 — Test in light before the dark room** Run the full drawing with the real arm and LED in normal light first. Verify the path looks right and the arm doesn't shake or overshoot. Then go dark.

---

Last time I operated the arm in the real world was noted as [[Robotic Manipulation 7 - Hello World]], the arm was shaking and jittering back then. I believed it will be an easy fix. 
I recalibrated wave_hello.py to eliminate the shaky movements. By decoupling the problem and operating one single motor.
### TL;DR

We isolated parameters and found out speed and acceleration need specific values and they are mapped backwards, highest speed at 0 lowest at 4000.
THESE VALUES WORK! `st.WritePosEx(motorId, targetPos, 2500, 500);`

---

I remodeled the code to have an arm_executor.py that moves the arm from resting pose to drawing pose. I used this script to troubleshoot the jitter. I managed to operate motor 1 thinking the same values fit the rest, but i was wrong.
## How the pipeline fits together

1. **[xiao_recive_move/xiao_recive_move.ino](vscode-webview://1ms8ur3hq1q5b4kfh5n9lau11pdurkjf488nbcgim0pj7q5d51u6/xiao_recive_move/xiao_recive_move.ino)** — listens on USB serial. Now parses `MOVE,id,pos,speed,acc` with defaults 2500/500 (matches what you found).
2. **[arm_executor.py](vscode-webview://1ms8ur3hq1q5b4kfh5n9lau11pdurkjf488nbcgim0pj7q5d51u6/arm_executor.py)** — converts MuJoCo radians → encoder counts via [arm_config.py](vscode-webview://1ms8ur3hq1q5b4kfh5n9lau11pdurkjf488nbcgim0pj7q5d51u6/arm_config.py) `CALIBRATION`, then writes one `MOVE,id,pos,2500,500\n` per joint with a 20 ms gap. `SPEED_DRAW = SPEED_MOVE = 2500`, `ACC = 500` ([arm_executor.py:88-92](vscode-webview://1ms8ur3hq1q5b4kfh5n9lau11pdurkjf488nbcgim0pj7q5d51u6/arm_executor.py#L88-L92)).
3. **[trace_plane.py](vscode-webview://1ms8ur3hq1q5b4kfh5n9lau11pdurkjf488nbcgim0pj7q5d51u6/trace_plane.py)** — loads strokes, runs damped-least-squares IK in MuJoCo on the `led_tip` site, and after each converged waypoint calls `arm_executor.send_joint_angles(...)`. `RUN_REAL_ARM = True` ([trace_plane.py:53](vscode-webview://1ms8ur3hq1q5b4kfh5n9lau11pdurkjf488nbcgim0pj7q5d51u6/trace_plane.py#L53)).
4. **[scene.xml](vscode-webview://1ms8ur3hq1q5b4kfh5n9lau11pdurkjf488nbcgim0pj7q5d51u6/scene.xml)** + **[so_arm100.xml](vscode-webview://1ms8ur3hq1q5b4kfh5n9lau11pdurkjf488nbcgim0pj7q5d51u6/so_arm100.xml)** — the model. `led_tip` site is at line 119 of so_arm100.xml.

---

12 hours with Claude code and Codex within VScode:

### Codex:
**Project Summary**

You have a MuJoCo simulation in trace_plane.py that uses IK to move a SO-ARM100-style 6DOF arm along a drawing path, and a real physical arm controlled through a XIAO board running xiao_recive_move.ino. The Python bridge is arm_executor.py, which converts MuJoCo joint radians into calibrated servo encoder counts using arm_config.py.

We connected the simulation to the real arm so the hardware mirrors the simulated waypoints.

**Files**

trace_plane.py

- Runs the MuJoCo simulation.
- Loads either the built-in triangle or drawing.json.
- Uses IK to move the LED/pen tip along the drawing plane.
- Now optionally opens serial and sends each waypoint to the real arm.
- Uses:
    
    `RUN_REAL_ARM = True ARM_PORT = "/dev/cu.usbmodem1101" ARM_BAUD = 115200`
    
- After each waypoint, it calls:
    
    `arm_executor.send_joint_angles( arm_ser, data.qpos[:6].tolist(), pen_down=pt["pen_down"], current_counts=current_counts, )`
    
- We added real-arm settle delays so the hardware has time to reach each waypoint:
    
    `REAL_ARM_DRAW_SETTLE = 0.8 REAL_ARM_MOVE_SETTLE = 1.0`
    

arm_executor.py

- Converts MuJoCo qpos[:6] radians into servo counts.
- Sends MOVE,id,count,speed,acc commands over serial.
- Uses calibration from arm_config.py.
- We fixed motor 1 center alignment. The simulation home Rotation = -0.0576 now maps to physical motor 1 neutral 3270, not the previous wrong value around 2977.
- We added command deadband / epsilon logic so tiny target changes are skipped to reduce jitter.
- We found working servo motion parameters:
    
    `SPEED_DRAW = 2500 SPEED_MOVE = 2500 ACC = 500`
    
- Important discovery: on these servos, speed is effectively reversed:
    
    `0 = fastest / harshest 4000 = slowest 2500 = smooth working value`
    

xiao_recive_move.ino

- Runs on the XIAO board.
- Listens for serial commands from Python:
    
    `MOVE,id,pos MOVE,id,pos,speed MOVE,id,pos,speed,acc TORQUE,id,enable`
    
- We tested direct servo commands without Python using JORDAN_DEBUG.
- We fixed macro issues:
    - public before setup() / loop() was invalid.
    - Correct pattern is:
        
        `#ifdef JORDAN_DEBUG // debug setup/loop #else // normal serial listener #endif`
        
- We updated defaults to the working values:
    
    `#define DEFAULT_SPEED 2500 #define DEFAULT_ACC 500`
    
- We removed the firmware clamp that capped acc to 255, because your working direct test was:
    
    `st.WritePosEx(motorId, targetPos, 2500, 500);`
    

arm_config.py

- Stores safe encoder count ranges and neutrals for each joint.
- Motor 1 / shoulder pan:
    
    `neutral = 3270 min = 2070 max = 3940`
    

**Major Debugging Findings**

Motor 1 center problem:

- The arm moved left unexpectedly when running arm_executor.py.
- Cause: MuJoCo home angle was being mapped linearly to 2977, not physical neutral 3270.
- Fix: added a center offset in arm_executor.py so Rotation = -0.0576 maps to 3270.

Triangle not going left:

- Terminal showed:
    
    `motor 1 -> 3485 motor 1 -> 3074 motor 1 -> 3269`
    
- So Python was commanding both right and left.
- Problem was timing: the next waypoint was sent before the real servo finished reaching the previous one.
- Fix: added real-arm settle delay after each waypoint.

Jitter:

- Causes considered:
    - Power supply sag/current limit.
    - Too many small target commands.
    - Servo speed/acceleration settings.
    - Hardware not reaching target before next command.
- Improvements made:
    - Added command epsilon/deadband.
    - Added settle delay.
    - Found working servo values: speed=2500, acc=500.
    - Turned off debug command spam after it was no longer needed.

Power:

- You tested 12V 3A and 12V 8A.
- 12V 3A moved but jittered.
- 12V 8A measured around 12.5V but did not operate correctly.
- We discussed that exact servo model matters:
    - Some STS3215 variants are 6-7.4V.
    - Some are 4-14V.
- Current supply may still matter, but the final major jitter improvement came from motion parameters and timing.

**Current Working Servo Command**

The best direct command discovered is:

`st.WritePosEx(motorId, targetPos, 2500, 500);`

Python now sends equivalent commands through serial:

`MOVE,id,target,2500,500`

**Current Recommended Workflow**

1. Upload the latest xiao_recive_move.ino to the XIAO.
2. Run a simple hardware test:
    
    `python3 arm_executor.py`
    
3. Run simulation only if needed:
    
    `RUN_REAL_ARM = False`
    
4. Run real arm mirroring:
    
    `RUN_REAL_ARM = True`
    
    then:
    
    `mjpython trace_plane.py`
    
5. For full drawing:
    
    `mjpython trace_plane.py drawing.json`
    

**Remaining Things To Tune**

- For drawing.json, the path has many points, so the settle delay may need to be reduced for long exposure.
- If the drawing looks too stop-motion-like, lower:
    
    `REAL_ARM_DRAW_SETTLE`
    
- If the arm misses points or cuts corners, increase it.
- If jitter returns, tune:
    
    `COMMAND_DEADBAND_COUNTS SPEED_DRAW SPEED_MOVE ACC REAL_ARM_DRAW_SETTLE`

# Claude Code - SO-ARM100 Project Summary

Across four sessions you built a pipeline that takes a 2D drawing from p5.js, simulates the SO-ARM100 drawing it in MuJoCo, and (the part that's still being debugged) drives the physical arm to actually trace the strokes.

---

## Session 1 — April 12 — MuJoCo simulation foundation

_(prior project: `trs_so_arm100`)_

- Built [trace_plane.py](vscode-webview://1ms8ur3hq1q5b4kfh5n9lau11pdurkjf488nbcgim0pj7q5d51u6/trace_plane.py) and added a `drawing_plane` geom in [scene.xml](vscode-webview://1ms8ur3hq1q5b4kfh5n9lau11pdurkjf488nbcgim0pj7q5d51u6/scene.xml).
- Iterated plane size from 30 cm down to 6 cm based on the arm's actual workspace reach.
- Switched IK loop from `mj_step` (full physics) to `mj_kinematics` (pure FK) for speed.
- Added passive-viewer key callbacks: **SPACE** to play, **W** for a 2000-pose workspace sweep printing reachable XYZ.
- Added an **LED tip site** on the gripper with colored corner markers.
- Hardest debug: arm hit IK targets but the visual plane was misaligned. Root cause was a 2.3° tilt in the corner-target forward vector vs. an axis-aligned box. Fixed by snapping everything to world XZ at fixed Y depth.
- **Outcome:** clean 6×6 cm rectangle trace with playback controls.

## Session 2 — May 2 — Real arm shake debugging

_(folder: `20260502/wave_hello.py`)_

- Goal: kill shaking on the real arm during a wave-hello.
- Rewrote `send_pose` with 20-step interpolation between current and target poses.
- Added a `speed` parameter to the firmware MOVE command (`MOVE,id,pos,speed`).
- Critical diagnostic moment: with a variable PSU you measured **current draw spiking from 0.5 A → 3 A specifically when descending to rest**. Diagnosis: gravity-driven instability on `shoulder_lift`.
- Final workaround: send `TORQUE,1,0` after wave completes to release `shoulder_pan` once at rest with no gravity load.
- **Outcome:** wave runs without shake; torque-release on the pan kills leftover jitter.

## Session 3 — May 2 — Drawing pipeline + bridge to real arm

_(current project, earlier session)_

- Heavy refactor and annotation of [trace_plane.py](vscode-webview://1ms8ur3hq1q5b4kfh5n9lau11pdurkjf488nbcgim0pj7q5d51u6/trace_plane.py): added type aliases (`Point`/`Stroke`/`Drawing`/`Waypoint`/`Path`), grouped constants, docstrings, ASCII coordinate diagram in `strokes_to_path`, `AppState` dataclass, split `main` into `setup_model`/`compute_plane`/`main`, added `DRAW_SCALE` for resizing.
- Added live red trail visualization via capsule segments in `viewer.user_scn`.
- Created [arm_executor.py](vscode-webview://1ms8ur3hq1q5b4kfh5n9lau11pdurkjf488nbcgim0pj7q5d51u6/arm_executor.py) — the bridge between MuJoCo radians and real-arm serial commands. Defines `MUJOCO_TO_ARM` mapping, `MUJOCO_RANGES`, `radians_to_counts`, `pick_speed`, and `send_joint_angles`. 20 ms inter-command gap, no Python-side interpolation (servo trajectory generator handles smoothing).
- Extended firmware to `MOVE,id,pos,speed,acc` and switched to `WritePosEx` so the servo's own acceleration ramp does the smoothing.
- Late in the session you and Jordan landed on `WritePosEx(id, pos, 2500, 500)` as "the values that work" — committed as 8559921. **(See lesson learned in Session 4 — this turned out to be tested with a hardcoded sketch on motor 1 only, not the real pipeline.)**

## Session 4 — May 2/3 — Debugging the broken arm (this conversation)

You came in saying "arm executor moves only motor 2; motors 3+ don't hold." We built a layered diagnostic:

**Firmware additions to [xiao_recive_move/xiao_recive_move.ino](vscode-webview://1ms8ur3hq1q5b4kfh5n9lau11pdurkjf488nbcgim0pj7q5d51u6/xiao_recive_move/xiao_recive_move.ino):**

- `READ,id` → `OK,READ,id,pos,load,volt_dV,temp_C` (live servo telemetry)
- `LIMITS,id` → `OK,LIMITS,id,min_angle,max_angle` (EEPROM angle limits)
- Default speed/acc constants pulled out as `DEFAULT_SPEED` / `DEFAULT_ACC`

**Python additions to [arm_executor.py](vscode-webview://1ms8ur3hq1q5b4kfh5n9lau11pdurkjf488nbcgim0pj7q5d51u6/arm_executor.py):**

- `enable_torque(ser, id, enable)`
- `read_joint(ser, id)` and `read_limits(ser, id)`
- Replaced `__main__` test with a 3-phase diagnostic: bus check → torque enable → batch HOME with **15 s of live position polling every 0.5 s** → optional rest-pose phase.

**Hypotheses chased and ruled out (in order):**

1. Torque off — partial truth: forcing `EnableTorque` on every motor at startup did stop motor 4 from drifting backwards under gravity. Now part of the diagnostic startup.
2. EEPROM angle limits — checked, all servos report 0–4095 (full range). Not the issue.
3. Acceleration too aggressive (`ACC=500` → wraps to u8 244) — partial, lowering ACC helped motor 3 but not motor 4.
4. **Speed too slow** — the real fix. You discovered git commit c74d7ac was the last commit that actually drove the arm via the pipeline (with jitter). Its values were `SPEED_DRAW=600`, `SPEED_MOVE=1500`, `ACC=50`. Restored those.

**The big lesson** (worth committing to a CLAUDE.md or memory): the "WORKS!" values from Jordan's session were validated with a **hardcoded firmware sketch that ignored serial entirely and cycled motor 1 only** — not the real pipeline. That misled three rounds of debugging. The actual ground truth was the older c74d7ac config.

**Current state at end of session:**

- 5 of 6 motors reach target reliably (1, 2, 3, 5, 6).
- Motor 4 (`wrist_flex`) still stops ~1300 counts short of target with `load = -200` (other working motors show load=0). Pattern points to the `Maximum Torque` register (regs 0x14/0x15) being set lower on this servo than the others.
- `trace_plane.py` runs but isn't drawing correctly yet — likely the same motor-4 issue showing up under live IK.

## Tomorrow's first steps when you come back

1. **Manual physical test on motor 4**: with torque on (run Phase 1, Ctrl-C before Phase 2), try to push wrist_flex by hand. Compare stiffness to the elbow.
2. If it feels as stiff as the others → add a `MAXTORQUE,id` firmware reader; we likely need to widen motor 4's torque cap in EEPROM.
3. If it feels softer → mechanical issue (gear, mount, bearing) rather than software.

Get some sleep — you actually made real progress today, even though it didn't feel like it. The arm went from "completely broken, no idea why" to "5 of 6 motors verified working with a known-good config and a real telemetry pipeline to debug from."