#arduino #hardware #software #esp32

# 1. Installing Arduino CLI
Install the Arduino command line interface using Homebrew:
`brew install arduino-cli`
Verify installation:
`arduino-cli version`

This tool replaces the Arduino IDE for compiling and uploading sketches from the terminal.

---

# 2. Initialize Arduino CLI
Create the configuration file:
`arduino-cli config init`
This creates:
`~/Library/Arduino15/arduino-cli.yaml`

This file stores configuration such as board package URLs.

---

# 3. Add ESP32 Board Manager
ESP32 support must be installed manually.
Add the ESP32 package index:
`arduino-cli config add board_manager.additional_urls https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json`
Then update the index:
`arduino-cli core update-index`
Install the ESP32 core:
`arduino-cli core install esp32:esp32`

Now the ESP32 toolchain is available.

---

# 4. Verify Board Installation
List installed boards:
`arduino-cli board listall | grep esp32`

Example boards:
```
esp32:esp32:esp32  
esp32:esp32:ttgo-t1  
esp32:esp32:adafruit_feather_esp32_v2
```

Each board has an identifier called **FQBN**
Fully Qualified Board Name
Example:
`esp32:esp32:adafruit_feather_esp32_v2`

This identifier must be used when compiling and uploading.

---

# 5. Detect Connected Board

Plug in the ESP32 and run:
`arduino-cli board list`
Example output:
```
Port: /dev/cu.usbserial-5AA60827931  
Board: Unknown
```
Even if the board is listed as unknown, the port can still be used.

---

# 6. Compile the Sketch
From the project folder:
```
WifiRexGame/  
WifiRexGame.ino
```
Compile with:
`arduino-cli compile --fqbn esp32:esp32:adafruit_feather_esp32_v2 WifiRexGame/`
Successful output:
`Sketch uses 971975 bytes (74%) of program storage space.`

---

# 7. Upload the Sketch
Upload using the detected serial port:
```
arduino-cli upload \  
--fqbn esp32:esp32:adafruit_feather_esp32_v2 \  
-p /dev/cu.usbserial-5AA60827931 \  
WifiRexGame/
```
If successful the ESP32 will reset and run the sketch.

---

# 8. Common Problems and Fixes

## Problem 1 — Missing Library
Example error:
`fatal error: PubSubClient.h: No such file or directory`
Install the library:
`arduino-cli lib install "PubSubClient"`
Verify installed libraries:
`arduino-cli lib list`

---

# Problem 2 — Board mismatch
Compilation and upload must use **the same board definition**.
Wrong:
```
compile → ttgo-t1  
upload → adafruit_feather_esp32_v2
```
Correct:
```
compile → adafruit_feather_esp32_v2  
upload → adafruit_feather_esp32_v2
```
Always keep the FQBN identical.

---

# Problem 3 — Serial Port Busy
Error:
`Resource busy: '/dev/cu.usbserial'`
This means another process is using the port.
Check:
`lsof | grep usbserial`
Common causes:
- Arduino IDE serial monitor
- VS Code serial monitor
- PlatformIO
- another terminal session
Close the program holding the port.

---

# Problem 4 — Chip stopped responding

Error:
```
StopIteration  
A fatal error occurred: The chip stopped responding
```
Common causes:
### Upload speed too high

Lower the speed:
```
arduino-cli upload \  
--fqbn esp32:esp32:adafruit_feather_esp32_v2 \  
-p /dev/cu.usbserial-5AA60827931 \  
--upload-property upload.speed=115200 \  
WifiRexGame/
```
### Bootloader timing issue
Manually enter boot mode:
1. Hold **BOOT**
2. Press **RESET**
3. Release **BOOT*
Then run upload again.

---

# Problem 5 — Broken CLI configuration
If the config command was entered incorrectly, the config file may contain invalid entries.
Example bad entries:
```
arduino-cli  
config  
add  
board_manager.additional_urls
```
Fix by editing:
`~/Library/Arduino15/arduino-cli.yaml`
Correct configuration:
```
board_manager:  
  additional_urls:  
    - https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
```
Then run:
`arduino-cli core update-index`

---

# 9. Why Arduino IDE Sometimes Works When CLI Doesn't
The Arduino IDE hides many settings:
- selected board
- selected port
- upload speed
- installed libraries
- reset behavior
The CLI requires specifying everything manually.
Therefore the IDE can be used as a **reference configuration** when debugging CLI problems.

---

# 10. Typical Development Workflow
Compile:
`arduino-cli compile --fqbn esp32:esp32:adafruit_feather_esp32_v2 WifiRexGame/`

Upload:
```
arduino-cli upload \  
--fqbn esp32:esp32:adafruit_feather_esp32_v2 \  
-p /dev/cu.usbserial-5AA60827931 \  
WifiRexGame/
```
Optional safe upload speed:
`--upload-property upload.speed=115200`

---

# 11. Key Concepts

### FQBN
Fully Qualified Board Name:
platform:architecture:board
Example:
`esp32:esp32:adafruit_feather_esp32_v2`

---

### Core
The board support package containing:
- compiler
- libraries
- upload tools
Example:
`esp32:esp32`

---

### Library
External code used by the sketch.
Example:
`PubSubClient`

---

# 12. Mental Model of the Toolchain
```
Sketch (.ino)  
      ↓  
Arduino CLI  
      ↓  
Board Core (esp32)  
      ↓  
Compiler (xtensa)  
      ↓  
Binary firmware  
      ↓  
esptool  
      ↓  
Flash memory on ESP32
```
