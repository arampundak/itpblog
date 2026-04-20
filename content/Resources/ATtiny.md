ATTinyCore - ISP programmer without bootloader
Burn a bootloader to program it with usb to C++ converter

Spence Konde Documentation
https://github.com/spencekonde/attinycore
ATTiny84 Documentation
https://github.com/SpenceKonde/ATTinyCore/blob/v2.0.0-devThis-is-the-head-submit-PRs-against-this/avr/extras/ATtiny_x4.md

1. take the bootloader we have in the shop
2. connect corresponding pins from the breakout to a prototyping board with the ATTiny
3. Pay attention to CW/CCW orientation
4. XTAL 1 and 2 (Crystal) least important
5. VCC GND are important
6. MISO <-> MISO
7. MOSI <-> MOSI
8. SCK <-> SCK

Board - No Bootloader
Chip
Clock - 8Mhz internal
Pin Mapping - for arduino naming (define before you code) Nasifs - CCW
Built in Software - No reciving, transmit only
EEPROM - if im missing flash
Port - with the usb converter - choose no port!
Press Burn Bootloader - to set the fuses and define all we choose before

Then - Write Code
Hit Upload

In the circuit!
Connect to GND 0.1 uF Cpacitor
Connect to RST 10K resistor pull up

---

Opened a new folder in Documents->Ardiuno->hardware
```bash
git clone https://github.com/SpenceKonde/ATTinyCore.git
```
into the folder
![[ref - ATTiny 1.webp]]

Now in Tools->Boards I have ATTiny Core
![[ref - ATTiny 2.webp]]

Pinout for ATTiny84 
![[ref - ATtiny_x4.webp]]

To program the ATTiny84 ill be using Tiny AVR Programmer itp shop has available.
![[ref - Tiny AVR Programmer 1.webp]]
![[ref - Tiny AVR Programmer 2.webp]]
By comparing the pins from the ATTiny85 that fits this programmer and the ATTiny84 that I use because it has more pins:
![[ref - ATTiny 3.webp]]
![[ref - ATTinyx5.jpg]]
![[ref - ATtiny_x4_big.webp]]


Another important thing
![[ref - ATTiny 4.webp]]

