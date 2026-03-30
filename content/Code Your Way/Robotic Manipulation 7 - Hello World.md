290326

My hello world is a pose-based robotic wave. Using calibrated motor values and a Python-to-XIAO serial protocol, I want to choreograph a small sequence of arm poses that makes the robotic arm visibly wave hello. This is a first step toward the larger goal of turning designed motion into drawn motion for long-exposure light painting.

![[cyw - robotic manipulation hello world.mp4]]
The process begins [[Robotic Manipulation 3 - Configuration]] and goes on in several stages.
### 1. First I tried the official LeRobot setup

I began by trying to use LeRobot directly with the arm. That meant:

- finding the serial port,
- setting up motors,
- calibrating,
- and treating the arm like a fresh system.

But that approach kept failing. The computer could see the board over USB, yet LeRobot kept saying it could not find the motors. At first this made the whole system feel broken.

### 2. I realized the problem was more specific

Through debugging, I learned the issue was not “the robot doesn’t work,” but something narrower:

- the Mac could talk to the board,
- but LeRobot was not seeing the servos the way it expected.

That led me to suspect the arm had already been onboarded before, and that I was using the wrong entry point for this particular hardware state. (3 hours)

### 3. I switched to the XIAO board directly

Instead of continuing to fight the high-level framework, I moved down one level and tested the XIAO ESP32-C3 directly through Arduino IDE using the `SCServo` library.

That was the big breakthrough.

Using a simple sketch, I was able to:

- ping motor IDs,
- move a servo directly,
- and confirm the arm was actually alive and addressable.

This showed me that the motors were not the problem. The communication path through the XIAO was working.

### 4. I built a bridge from the robot to Python

Once the XIAO could read the servos, I wrote Arduino code that sent motor positions over serial. Then, in VS Code, I wrote Python scripts that:

- opened the serial port,
- read the motor data,
- displayed it live in the terminal,
- and mapped motor IDs to joint names.

This was the first moment the robot started to feel legible. I was no longer relying on a black box but I could actually see the robot’s internal state.

### 5. I created a calibration model

After reading live motor values, I started building my own software model of the arm:

- joint names,
- motor IDs,
- neutral values,
- min values,
- max values.
This is `arm_config.py`

Then I wrote small Python tools to:

- clamp motor commands to safe ranges,
- represent a whole-arm pose,
- and check whether a pose was safe.

That gave me a first real control architecture.

### 6. I built Python-to-robot actuation

Next, I flipped the direction of communication.

Instead of only reading motor positions, I wrote a serial protocol so Python could send movement commands to the XIAO, and the XIAO would translate those commands into servo movement.

My first successful test was opening and closing the gripper from Python.

That was the first complete loop:

- Python decides,
- Python sends,
- XIAO receives,
- servo moves.

### 7. I moved from single motors to full poses

After that, I started designing poses for the whole arm:

- a rest pose,
- a raised pose,
- wave-left,
- wave-right.

I built a pose editor that let me tune motor values joint by joint and physically test them on the robot. Then I wrote code to send those poses in sequence.

That became my hello world:  
a small robotic wave controlled through Python.

---

### Learning
I moved my life to Claude.ai.
I've downloaded Claude both to terminal and VScode. Then left back to the browser based interface, I feel writing by myself teaches me more.

==In Python, `range(a, b)` gives you numbers **from `a` up to but not including `b`**==
That's why we write `range(1, steps + 1)` — the `+1` is specifically to make sure step 20 actually happens, because without it you'd stop at 19 and never fully arrive at your target position.

