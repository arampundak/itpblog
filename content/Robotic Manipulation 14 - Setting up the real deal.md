**Stage 1 — Find and verify your serial Python code** Before anything else. Find your hello world wave script. Connect the arm. Run it. If it shakes, that's a speed/step issue we can tune. Don't proceed until the arm moves smoothly from Python.

**Stage 2 — Bridge MuJoCo IK to serial commands** `trace_plane.py` currently only sets `data.qpos` in simulation. You need a function that takes those same joint angles and sends them to the real arm over serial. This is a Claude Code brief — maybe 20 lines.

**Stage 3 — Find a free GPIO pin for the LED** Look at the driver board sitting on your XIAO physically. Which pins are accessible? D0-D3 are the safest candidates. Pick one — probably D2 (GPIO4).

**Stage 4 — Add LED control to the Arduino firmware** The XIAO currently runs firmware that listens for servo commands over serial. You need to add LED on/off to that same firmware — listening for a simple extra command like `L1` (LED on) and `L0` (LED off). This is an Arduino code change, another Claude Code brief.

**Stage 5 — Add LED commands to Python** In `trace_plane.py`, the `move_to_target` function already has a `pen_down` boolean. When `pen_down=True`, send `L1` over serial. When `pen_down=False`, send `L0`. Simple addition.

**Stage 6 — Test in light before the dark room** Run the full drawing with the real arm and LED in normal light first. Verify the path looks right and the arm doesn't shake or overshoot. Then go dark.

---

I recalibrated wave_hello.py to eliminate the shaky movements. 
### TL;DR

The shake was never a PID problem and never a power problem. It was that we were either (a) not letting the servo's built-in motion smoother do its job, or (b) commanding it slower than gravity, forcing it into an unstable braking regime. The real fix was: **trust the servo's internal trajectory generator, and command appropriate speeds for which way gravity is pulling.**