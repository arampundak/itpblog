ATtiny (or TinyAVR) is ==a family of small, low-power, 8-bit AVR microcontrollers from [Microchip Technology](https://www.microchip.com/en-us/about/corporate-overview/acquisitions/atmel/attiny) designed for compact applications==, often used as smaller, cheaper alternatives to Arduino.
Big thanks to Nasif (itp 26) for all the help and guidance, lets go hardware!

Best documentation:
Spence Konde Documentation
https://github.com/spencekonde/attinycore
ATTiny84 Documentation
https://github.com/SpenceKonde/ATTinyCore/blob/v2.0.0-devThis-is-the-head-submit-PRs-against-this/avr/extras/ATtiny_x4.md

Start with downloading the hardware ATTiny Core library, seen later below.
Download the old Arduino IDE 1.8.19, works better for burning the bootloader.

#### First! Burn Bootloader (Set Fuses)

**CRITICAL STEP - Must be done first or after changing clock/BOD settings:**
(if this dosent work - I have a documantation)
![[attiny - burn bootloder.png]]
1. Click Tools → configure to the settings as above (for ATTiny 84)
2. Click **Tools → Burn Bootloader**
3. Wait for "Done burning bootloader" message
4. This sets the fuses (clock source, BOD, etc.) - **NOT optional!**
![[ref - burn bootloader.png|500]]
####  **Configure Arduino IDE**
1. **Select Board:**
    - **Tools → Board → ATtinyCore → ATtiny24/44/84** (No Bootloader)
2. **Select Chip:**
    - **Tools → Chip → ATtiny84**
3. **Select Clock Speed:**
    - **Tools → Clock → 8 MHz (internal)** (recommended for beginners)
    - Other options: 1 MHz, 16 MHz, external crystal, etc.
4. **Select Pin Mapping:**
    - **Tools → Pin Mapping → Counterclockwise** (this is the standard)
5. **Select Programmer:**
    - **Tools → Programmer → **USBtinyISP - FAST, for parts running >=2MHz**
6. **Other Settings:**
    - **Tools → B.O.D. Level:** 2.7V (recommended) or Disabled
    - **Tools → Save EEPROM:** EEPROM retained (if you want to keep data)
    - **Tools → millis()/micros():** Enabled (unless you need to save flash)
7. **Port**: with the usb converter - choose no port!

Then - Write Code, just in Arduino IDE 1.8
Hit Upload
Suggestion - upload first a simple LED Blink to check that the upload is complete.
In the circuit!
Connect to GND 0.1 uF Cpacitor
Connect to RST 10K resistor pull up

Blink test
```cpp
// Blink test for ATtiny84
// LED on Pin 10 (PA0, physical pin 13)

#define LED_PIN 10  // Arduino pin 10 = PA0 = Physical pin 13

void setup() {
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_PIN, HIGH);  // LED on
  delay(1000);                  // Wait 1 second
  digitalWrite(LED_PIN, LOW);   // LED off
  delay(1000);                  // Wait 1 second
}
```
![[res - attiny blink.mp4]]

---
How to download ATTiny Core:
if this gives problams, read at the end ->
Opened a new folder in Documents->Ardiuno->hardware
```bash
git clone https://github.com/SpenceKonde/ATTinyCore.git
```
into the folder
![[ref - ATTiny 1.webp]]

Now in Tools->Boards I have ATTiny Core
![[ref - ATTiny 2.webp]]

---

Pinout for ATTiny84 
![[ref - ATtiny_x4.webp]]

To program the ATTiny84 ill be using Tiny AVR Programmer itp shop has available.

1. take the Programmer we have in the shop
2. connect corresponding pins from the breakout to a prototyping board with the ATTiny
3. Pay attention to CW/CCW orientation
4. XTAL 1 and 2 (Crystal) least important
5. VCC GND are important
6. MISO <-> MISO
7. MOSI <-> MOSI
8. SCK <-> SCK

![[ref - Tiny AVR Programmer 1.webp]]
![[ref - Tiny AVR Programmer 2.webp]]
By comparing the pins from the ATTiny85 that fits this programmer and the ATTiny84 that I use because it has more pins:
![[ref - ATTiny 3.webp]]
![[ref - ATTinyx5.jpg]]
![[ref - ATtiny_x4_big.webp]]


Another important thing
![[ref - ATTiny 4.webp]]

ATTinyCore - ISP programmer without bootloader
Burn a bootloader to program it with usb to C++ converter

