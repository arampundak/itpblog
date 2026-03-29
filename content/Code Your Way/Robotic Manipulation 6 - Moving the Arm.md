After building a live motor-reading pipeline, I moved to actuation. I created a simple serial protocol between Python and the XIAO ESP32-C3, where Python sends commands in the form `MOVE,id,target`, and the microcontroller translates them into servo-bus commands. My first successful test was making the gripper repeatedly open and close from a Python script in VS Code. This was the first full closed loop of the project: software logic on my computer produced immediate physical motion in the arm.

Right now the system can:
1. **read motor positions**
2. **map IDs to joint names**
3. **store calibration values**
4. **clamp target values**
5. **represent whole-arm poses**
6. **send movement commands from Python**
7. **move a real motor physically**

I was helped by LLM to create a C++ code for the python code to control the arm, this sketch is acting more like a **driver bridge** between the servo bus -> and computer
### xiao_send_motor_pos.ide
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
### send_move.py
a Python sender through the C++ code above to the [[SO101]]

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