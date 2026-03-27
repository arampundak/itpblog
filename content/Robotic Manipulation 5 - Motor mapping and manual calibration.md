==Python uses **indentation** to define structure==

After reading the live motor data, I moved from raw servo values to a structured arm model. I created a named pose representation in Python, mapped motor IDs to joint names, and built a safety check that verifies whether a full pose stays within the calibrated limits of each joint. This was the first moment the robot began to feel like a coherent system rather than a collection of motor IDs.

**Interpret and organize those positions**
- IDs
- joint names
- neutral
- min/max
- save calibration data

Stage after that **Control one motor**

---
Wrote a python script similar to the one in [[Robotic Manipulation 4 - Calibration]] that addresses another file 'arm_config.py' with motors names to have a rest/min/max values.
Checked by turning the motors and reading the positions what are the min/max values.
### named_position.py
``` python
import os
import time
import serial

from arm_config import JOINTS

PORT = "/dev/cu.usbmodem1101"
BAUD_RATE = 115200


def clear_screen():
    os.system("cls" if os.name == "nt" else "clear")


def main():
    positions = {}

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
                print("Live joint positions\n")

                for motor_id in sorted(positions):
                    joint_name = JOINTS.get(motor_id, f"unknown_{motor_id}")
                    print(f"{joint_name}: {positions[motor_id]}")

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

Wrote a python script to file each motor's min and max values, gives the robot a name structure.
### arm_config.py
``` python
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
        "neutral": None,
        "min": None,
        "max": None,
    },
    "shoulder_lift": {
        "id": 2,
        "neutral": None,
        "min": None,
        "max": None,
    },
    "elbow_flex": {
        "id": 3,
        "neutral": None,
        "min": None,
        "max": None,
    },
    "wrist_flex": {
        "id": 4,
        "neutral": None,
        "min": None,
        "max": None,
    },
    "wrist_roll": {
        "id": 5,
        "neutral": None,
        "min": None,
        "max": None,
    },
    "gripper": {
        "id": 6,
        "neutral": None,
        "min": None,
        "max": None,
    },
}
```

### clamp_test.py
making sure a motor position stays inside the allowed range for each joint - it protects your robot from receiving values outside its safe range.
``` python
from arm_config import CALIBRATION


def clamp_position(joint_name, value):
    joint = CALIBRATION[joint_name]
    min_value = joint["min"]
    max_value = joint["max"]

    return max(min_value, min(max_value, value))


def main():
    test_values = {
        "shoulder_pan": [1000, 3000, 5000],
        "gripper": [700, 1000, 3000],
        "elbow_flex": [500, 2000, 4000],
    }

    for joint_name, values in test_values.items():
        print(f"\nTesting {joint_name}")

        for value in values:
            clamped = clamp_position(joint_name, value)
            print(f"  input: {value} -> clamped: {clamped}")


if __name__ == "__main__":
    main()
```

and the results are 
``` bash
 Input: 5000 -> clamped: 3940

Testing gripper:
  Input: 700 -> clamped: 815
  Input: 1000 -> clamped: 1000
  Input: 2500 -> clamped: 2243

Testing elbow_flex:
  Input: 500 -> clamped: 1100
  Input: 2000 -> clamped: 2000
  Input: 4000 -> clamped: 3289
```

I have first real safety layer:
- values below min get corrected
- values above max get corrected
- values inside range pass through unchanged

### pose_test.py
checks whether each joint’s target is safe
``` python
from arm_config import CALIBRATION


REST_POSE = {
    "shoulder_pan": 3270,
    "shoulder_lift": 1760,
    "elbow_flex": 3289,
    "wrist_flex": 3859,
    "wrist_roll": 3019,
    "gripper": 906,
}


def clamp_position(joint_name, value):
    joint = CALIBRATION[joint_name]
    min_value = joint["min"]
    max_value = joint["max"]
    return max(min_value, min(max_value, value))


def pose_is_safe(pose):
    for joint_name, value in pose.items():
        clamped = clamp_position(joint_name, value)
        if clamped != value:
            return False
    return True


def print_pose(pose):
    print("Pose values:\n")
    for joint_name, value in pose.items():
        print(f"{joint_name}: {value}")


def main():
    print_pose(REST_POSE)

    if pose_is_safe(REST_POSE):
        print("\nThis pose is inside all safe limits.")
    else:
        print("\nThis pose is NOT safe.")


if __name__ == "__main__":
    main()
```