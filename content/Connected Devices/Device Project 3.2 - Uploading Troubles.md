https://github.com/FabriGu/wifiRex

**Stage 1 - Code and board setup**
At first, the project had board/library/configuration issues. Those were gradually resolved, and the sketch reached a state where it compiled successfully for the selected ESP32 board.

**Stage 2 - Upload instability from CLI**
The firmware could upload successfully in some cases, but terminal uploads were inconsistent. Two distinct upload problems appeared:
- the ESP32 stopped responding during high-speed flashing
- later attempts sometimes referenced a serial port that no longer existed
This suggested that the CLI setup was more fragile than the Arduino IDE, especially around baud rate, port selection, and reset behavior.
---
I had some troubles connecting the Adafruit Feather esp32 v2 to my computer. I was trying to compile and upload an ESP32 sketch using **`arduino-cli` from the VS Code terminal** instead of the Arduino IDE.

The sketch compiled successfully but uploads repeatedly failed from the terminal, while the **same code uploaded successfully from the Arduino IDE**.

==The main issue was libraries missing and the UPLOAD baud rate in Arduino IDE.==
The CLI was able to connect to the ESP32 and identify the chip, but the flashing process failed after connection. The failure appeared during high-speed serial communication, suggesting an unstable upload speed or reset/boot timing issue.
```
Connected to ESP32 on /dev/cu.usbserial-5AA60781371:  
...  
StopIteration  
  
A fatal error occurred: The chip stopped responding.  
Stub flasher running.  
Changing baud rate to 921600...  
Changed.
```
---
Another error was the port: After reset, the serial device path changed, and later upload attempts used an outdated port name. This caused “port busy or doesn't exist” errors unrelated to compilation.
```
A fatal error occurred: Could not open /dev/cu.usbserial-5AA60827931, the port is busy or doesn't exist.
([Errno 2] ... No such file or directory)
```

Notice the two port names:
- `5AA60781371`
- `5AA60827931`
---
Fabri and I had to roll up our sleeves to get this done, and I concluded LLMs help in this resource [[ESP32 Development Setup with arduino-cli (VS Code + Terminal)]]
