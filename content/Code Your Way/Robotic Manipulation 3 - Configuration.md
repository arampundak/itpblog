250326

==The process of introduction with the [[SO101]] robotic arm is documented in the following posts in order. Each post is about a small advancement I do.==
Next episode [[Robotic Manipulation 4 - Calibration]]

I set to operate the arm. The pipeline:
**Python on your Mac → LeRobot → controller board → servo bus → motors → arm motion**
The events: I followed the onboarding of the [[SO101]] (after receiving it from Zakai). I spent 3 hours trying to give IDs to the motors. They are meant to be activated one by one before 'daisy chaining' them together. After failing I disassembled the arm to try and activate one motor at a time. After failing I tried separating what I know and don't know and used a simple Arduino C++ sketch to move a motor and see it's not broken. 
After succeeding with this step - I figured when a motor gets an ID it can't get another - so actually... 
One mismatch was I was following a Seeed hardware tutorial, but using the newer Hugging Face software stack.

## The plan is:
- make the arm move in designed trajectories
- eventually control those trajectories through code
- use a light at the end effector
- capture the motion as drawing in space

## Hardware
- **SO100 / SO101** = the physical arm
- **servos** = the motors at each joint
- **controller board** = XIAO ESP32-C3 - the electronics that talk between your computer and the servo bus

## Software
- **LeRobot** = the software framework
- **Python environment** = the isolated Python setup where LeRobot is installed
- **CLI commands** like `lerobot-calibrate` = tools provided by LeRobot

## USB board detection
To find the board controlling the arm - I ran a check:
``` bash
ls /dev/tty.* /dev/cu.* | grep -E 'usb|modem|serial|wch|usbserial'
```
Found port:
`/dev/tty.usbmodem2101`  
and later  
`/dev/tty.usbmodem1101`

## Downloading LeRobot repositories
In the command line
``` bash
mkdir -p ~/code
cd ~/code
python3 -m venv lerobot-env
source lerobot-env/bin/activate
python -m pip install --upgrade pip
git clone https://github.com/huggingface/lerobot.git
cd lerobot
pip install -e ".[feetech]"
```

## The issue stage
``` bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem2101 \
  --robot.id=my_arm
```

my computer and board are talking, but the board is not detecting the motors attached to it.
I need to **configure the motors first**.

## Python Virtual Environment
A virtual environment is like a **self-contained Python toolbox** for one project.
- `lerobot-env` = one Python toolbox
- `lerobot310` = another Python toolbox
`source /Users/arampundik/code/lerobot-env/bin/activate` = For this terminal session, use the Python and packages inside this environment.
### Environment
Which Python tools are active
### Folder
Which code repo you are standing inside
### Important
- the right environment active
- the right repo folder open
So when:
- `(lerobot310)` → that meant the **environment** was active
- `/Users/arampundik/code/lerobot-seeed` → that meant to be inside the **repo folder**
Hugging Face LeRobot repo - expects **Python 3.12+**
Seeed LeRobot repo - - **Python 3.10**, a different repo:  `Seeed-Projects/lerobot`

The Motor
The STS3215 family used in these arms is a **serial bus smart servo** with a **12-bit magnetic encoder** and **360° absolute position control** in position mode. Feetech describes it as “0–360 degrees any angle controllable,” with position values mapped to **0–4096** over one full turn, and it also supports multi-turn and other modes.
