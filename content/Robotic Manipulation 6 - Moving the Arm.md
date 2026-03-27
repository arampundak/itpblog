After building a live motor-reading pipeline, I moved to actuation. I created a simple serial protocol between Python and the XIAO ESP32-C3, where Python sends commands in the form `MOVE,id,target`, and the microcontroller translates them into servo-bus commands. My first successful test was making the gripper repeatedly open and close from a Python script in VS Code. This was the first full closed loop of the project: software logic on my computer produced immediate physical motion in the arm.

### send_move.py
``` python
import serial
import time

PORT = "/dev/cu.usbmodem1101"
BAUD_RATE = 115200


def send_move_command(ser, motor_id, target_position):
    command = f"MOVE,{motor_id},{target_position}\n"
    print("Sending:", command.strip())

    ser.write(command.encode("utf-8"))

    response = ser.readline().decode("utf-8", errors="ignore").strip()
    print("Response:", response)


def main():
    gripper_id = 6

    with serial.Serial(PORT, BAUD_RATE, timeout=2) as ser:
        time.sleep(2)

        startup = ser.readline().decode("utf-8", errors="ignore").strip()
        if startup:
            print("Board says:", startup)

        for _ in range(3):
            send_move_command(ser, gripper_id, 1800)  # open
            time.sleep(1)

            send_move_command(ser, gripper_id, 1000)  # close
            time.sleep(1)


if __name__ == "__main__":
    main()
```