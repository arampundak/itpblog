260326
Next episode 

I set to operate the arm.
I went over LeRobot documentation

```
LeRobot Table of Contents

[A. 3D Printing Guide](https://wiki.seeedstudio.com/lerobot_so100m_new/#install-lerobot)

[B. Install LeRobot](https://wiki.seeedstudio.com/lerobot_so100m_new/#install-lerobot)

[C. Configure the motors](https://wiki.seeedstudio.com/lerobot_so100m_new/#configure-the-motors)

[D. Assembly](https://wiki.seeedstudio.com/lerobot_so100m_new/#assembly)

[E. Calibrate](https://wiki.seeedstudio.com/lerobot_so100m_new/#calibrate)

[F. Teleoperate](https://wiki.seeedstudio.com/lerobot_so100m_new/#teleoperate)

[G. Add cameras](https://wiki.seeedstudio.com/lerobot_so100m_new/#add-cameras)

[H. Record the dataset](https://wiki.seeedstudio.com/lerobot_so100m_new/#record-the-dataset)

[I. Visualize the dataset](https://wiki.seeedstudio.com/lerobot_so100m_new/#visualize-the-dataset)

[J. Replay an episode](https://wiki.seeedstudio.com/lerobot_so100m_new/#replay-an-episode)

[K. Train a policy](https://wiki.seeedstudio.com/lerobot_so100m_new/#train-a-policy)

[L. Evaluate your policy](https://wiki.seeedstudio.com/lerobot_so100m_new/#evaluate-your-policy)
```


1. Connect the arm to computer, before connecting power
2. Run: 
``` bash
ls /dev/tty.* /dev/cu.* | grep -E 'usb|modem|serial|wch|usbserial'
```
3. Connect to power
4. Switch into environment and repo
```bash
source /Users/arampundik/code/lerobot310/bin/activate
cd /Users/arampundik/code/lerobot-seeed
```

I built a working bridge between the robot and Python. The microcontroller reads servo states and sends them to my computer, where I parse and display them in Python. This gave me a live understanding of the arm’s internal state and moved the project from black-box setup toward my own control pipeline.

# Stage 1 — Uploading code to the XIAO to read the motors

At this point, the goal was no longer to make LeRobot work.  
The goal became simpler:

> Can I talk to the motors at all?

After a lot of confusion around setup and calibration, I discovered that the most reliable path was through the **XIAO ESP32-C3** directly, using Arduino code and the `SCServo` library.

The idea was:
- connect the XIAO to the serial bus servos
- scan their IDs
- read their current positions
- send that information over USB to the computer

This was an important shift in the project. Instead of relying on a high-level robotics framework, I started building my own understanding of the communication chain.

The pipeline became:
`smart servos → XIAO ESP32-C3 → USB serial → computer`

The Arduino code did two main things:
1. initialize communication with the bus servos
2. scan the servo IDs and print each servo’s current position

That was the first real proof that the arm was alive and readable.

Uploading this code to the XIAO was a breakthrough.  
For the first time, I could reliably read the motors and confirm that the arm was already configured and responding by ID.
### A simplified version of that code looked like this:
``` c++
#include <SCServo.h>

#if defined(CONFIG_IDF_TARGET_ESP32C3) || defined(CONFIG_IDF_TARGET_ESP32C6) || defined(CONFIG_IDF_TARGET_ESP32S3)
#define COMSerial Serial0
#else
#define COMSerial Serial1
#endif

#define S_RXD D7
#define S_TXD D6

SMS_STS st;

const int ID_MIN = 1;
const int ID_MAX = 6;
bool found[256];

void scanServos() {
  for (int i = 0; i < 256; i++) {
    found[i] = false;
  }

  for (int id = ID_MIN; id <= ID_MAX; id++) {
    int result = st.Ping(id);
    if (result != -1) {
      found[id] = true;
    }
    delay(30);
  }
}

void sendPositions() {
  for (int id = ID_MIN; id <= ID_MAX; id++) {
    if (!found[id]) continue;

    int pos = st.ReadPos(id);

    Serial.print(id);
    Serial.print(",");
    Serial.println(pos);

    delay(10);
  }

  Serial.println("END");
}

void setup() {
  Serial.begin(115200);
  delay(2000);

  COMSerial.begin(1000000, SERIAL_8N1, S_RXD, S_TXD);
  st.pSerial = &COMSerial;

  delay(500);
  scanServos();
}

void loop() {
  sendPositions();
  delay(500);
}
```


---

# Stage 2 - Reading motor values in Python with `live_position.py`

Once the XIAO was sending motor data over serial, the next step was to bring that into Python.

This was important for me because the larger goal of the project is not just to move the arm, but to build a control system around it in Python. So instead of stopping at the Arduino IDE, I created a Python script in VS Code to read the serial stream and display the motor positions live.

The XIAO was sending lines like:
```
1,2034  
2,1881  
3,2410  
END
```
So the Python script had to:
- open the serial port
- read each line
- parse motor ID and position
- store the values in a dictionary
- redraw the terminal as a live dashboard

### The result was a Python script called `live_position.py`:

``` python
import os
import serial
import time

PORT = "/dev/cu.usbmodem1101"
BAUD_RATE = 115200


def clear_screen() -> None:
    os.system("cls" if os.name == "nt" else "clear")


def main() -> None:
    positions: dict[int, int] = {}

    print("Opening serial port...")

    with serial.Serial(PORT, BAUD_RATE, timeout=1) as ser:
        time.sleep(2)
        print("Connected. Waiting for data...")

        while True:
            raw_line = ser.readline().decode("utf-8", errors="ignore").strip()

            if not raw_line:
                continue

            if raw_line == "END":
                clear_screen()
                print("Live motor positions\n")

                for motor_id in sorted(positions):
                    print(f"Motor {motor_id}: {positions[motor_id]}")

                continue

            try:
                motor_id_str, position_str = raw_line.split(",")
                motor_id = int(motor_id_str)
                position = int(position_str)
                positions[motor_id] = position
            except ValueError:
                pass


if __name__ == "__main__":
    main()
```


### 

Running this in VS Code finally gave me what I wanted:  
a live Python view of the robot’s internal state.

Instead of endless scrolling lines, the terminal updated in place and continuously showed the current position of each motor.

That meant I could now:
- observe the arm in real time
- identify which motor ID belongs to which joint
- start defining resting values
- prepare for my own calibration map of neutral, min, and max positions

This stage was important not only technically, but conceptually.  
It marked the moment when I stopped treating the robot as a black box and started building my own readable control pipeline.

---
After starting the process with copilot I understood I want to get my hand dirty and try learning from doing with my finger tips. But im keeping here the original prompts

## Prompt for Copilot
>I am building a control pipeline for a Seeed / Hugging Face SO100/SO101- using a XIAO ESP32-C3 and smart serial bus servos.
Current situation:
>- The servos are alive and can be detected by ID through the XIAO using Arduino and the SCServo library.
>- LeRobot setup/calibration was not the right entry point for this arm, likely because the servos were already configured by a previous owner.
>- I want to move away from black-box setup and build my own understanding of the control pipeline.
My goals right now:
>1. Read the current position of each motor.
>2. Map motor IDs to joint names.
>3. Manually determine and store each motor’s neutral position, min safe value, and max safe value.
>4. Save that calibration map in a clean JSON structure.
>5. Build simple Python code in VS Code that will later let me command one motor, then multiple motors, then poses, then smooth trajectories.
>6. Learn Python through the project, so I want code that is simple, well explained, and modular.
Please help me design a beginner-friendly Python project structure and pseudocode for:
>- reading motor states
>- storing calibration data
>- clamping commands to safe ranges
>- moving from one pose to another smoothly
Important:
>- Keep the code educational and readable.
>- Prefer simple functions over complex abstractions.
>- Explain each step so I can learn Python while building.
>- Help me build this incrementally rather than generating a huge finished system at once.

## From Copilot
This is a great way to build real understanding.  
Your goals are exactly the right order for a safe control pipeline.

**Big Picture**  
Think of your pipeline as 4 layers:

1. Hardware layer: talk to servos, read/write positions.
2. Calibration layer: map IDs to joints and define safe ranges.
3. Command layer: clamp and send safe targets.
4. Motion layer: interpolate from pose A to pose B smoothly.

Build and test each layer before moving up.

**Beginner-Friendly Project Structure**  
Start small with a few clear files:

- project_root/
- project_root/data/
- project_root/data/calibration.json
- project_root/src/
- project_root/src/config.py
- project_root/src/servo_io.py
- project_root/src/calibration.py
- project_root/src/control.py
- project_root/src/trajectory.py
- project_root/src/main.py
- project_root/tests/
- project_root/tests/test_clamping.py

What each file does:

- config.py
    - Serial port, baud rate, and timing constants.
- servo_io.py
    - Raw communication functions (read position, write position).
- calibration.py
    - Load/save calibration JSON.
    - ID-to-joint lookup helpers.
- control.py
    - Safe command helpers (clamp target, command one motor, command pose).
- trajectory.py
    - Interpolation math for smooth transitions.
- main.py
    - Simple scripts you run while learning.

**Calibration JSON Design**  
Keep it explicit and readable:

{  
"meta": {  
"robot": "so100_or_so101",  
"units": "servo_ticks",  
"updated_at": "2026-03-26"  
},  
"joints": {  
"base_yaw": {  
"motor_id": 1,  
"neutral": 2048,  
"min_safe": 1200,  
"max_safe": 2900  
},  
"shoulder_pitch": {  
"motor_id": 2,  
"neutral": 2100,  
"min_safe": 1500,  
"max_safe": 2800  
}  
}  
}

Use one source of truth: every joint entry includes motor_id and safe range.

**Milestone Plan (Incremental)**

1. Read-only phase
2. Mapping phase
3. Calibration save/load phase
4. Single-motor safe command phase
5. Multi-motor pose command phase
6. Smooth trajectory phase

Do not skip ahead until each milestone works reliably.

**Pseudocode: 1) Reading Motor States**  
Goal: detect IDs and read current position safely.

**Pseudocode: 2) Storing Calibration Data**  
Goal: map IDs to names and preserve safe limits.

**How to manually calibrate (simple process)**

1. Power arm with a safe current limit and free space.
2. Read current position for one motor.
3. Move that joint gently to a desired neutral angle and record value.
4. Move toward one mechanical side slowly, record conservative min_safe.
5. Move to the other side slowly, record conservative max_safe.
6. Repeat for all joints.
7. Save JSON.

Use conservative ranges first, then widen later only if safe.

**Pseudocode: 3) Clamping Commands to Safe Range**  
This is your safety gate and should be used every time before write.

**Pseudocode: 4) Move to Pose Smoothly**  
A pose is a dictionary from joint name to target tick.

For smoother starts/stops later, replace linear alpha with ease-in-out:

- ease = 3a^2 - 2a^3 where a is alpha from 0 to 1.

**Main Script Flow (Learning-Oriented)**  
Keep main.py very explicit:

- 
- 
- 
- 

**Good Early Safety Rules**

1. Clamp every command, always.
2. Use small test moves first (for example ±30 ticks).
3. Add short delays between writes.
4. Keep an emergency stop habit (power cut or stop command ready).
5. Log each sent target and each read position while testing.

**What to Build First (Next Action)**  
Start with just Milestone 1 and 2:

1. Scan IDs and print live positions.
2. Create initial calibration JSON with only motor_id and neutral.
3. Add min_safe and max_safe after manual probing.

If you want, next I can give you a very small first implementation of only:

1. servo_io.py
2. calibration.py
3. main.py

with simple Python you can run immediately and expand step-by-step.


