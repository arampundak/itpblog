## Turn Light Into Computation: Solar-Powered Hanukkah Menorah

## A Window-Mounted Light That Remembers

For my Energy final, I set out to build something that sits at the intersection of tradition, sustainability, and embedded systems design: a solar-powered Hanukkah menorah that remembers which night you're on, charges itself from sunlight, and lights up automatically when darkness falls.

The project gave me a concrete excuse to dive deep into two areas I wanted to master: the ATtiny microcontroller family and custom PCB design. 
## The Concept
The traditional Hanukkah menorah (Hanukiah) is a nine-branched candelabrum lit over eight nights to commemorate the miracle of oil lasting eight days. Each night, you light one more candle than the night before, plus the shamash ('helper' candle) used to light the others. The lights are displayed in windows after dark as a public celebration of the miracle.
![[nrg - what is menorah.webp]]
My version takes that tradition and makes it autonomous, not to compete with the traditional object, but as an add on to for the diaspora: mount it to a window with suction cups, let it charge during the day from a solar panel, a magnetic slide interaction advances the night count and automatically illuminate the correct number of LEDs when darkness falls. Pull down and push back up to reload the next night.

The device needed to:
- Harvest solar energy and store it in a battery
- Detect when it's dark (voltage divider on the solar panel)
- Remember which night of Hanukkah it is (EEPROM storage)
- Control 9 LEDs (shamash + 8 nights) within tight pin constraints
- Be visible from both sides of the window
- Last all 8 nights on a single battery charge (worst case: no sun in December)

## Learning Goals
This project had two parallel learning objectives:

**1. Master the ATtiny microcontroller family**
- Programming via ISP (In-System Programming)
- Working within severe pin count constraints
- Understanding the trade-offs of compact microcontrollers
![[res - attiny ISP.webp]]
My notes about [[ATtiny]]

**2. Design a custom PCB from scratch**
- Iterating with the Bantam PCB mill in the shop (didn't happen)
- Preparing files for professional fabrication (JLCPCB)
- Learning PCB-first design thinking (not just translating a breadboard)
![[nrg - custom made pcb 2.webp]]
![[pcb - PCB1.png]]
![[nrg - custom made pcb 1.webp]]

My uncompleted notes about custom made PCB
[[PCB 3 - Crate board outline]]
[[PCB 4 - Design and Route]]
[[PCB Create your own electronics parts]]
## Proof of Concept and Early Challenges

I started with what I thought would be a straightforward proof-of-concept: wire up an Arduino-compatible board, connect some LEDs, add a solar charging module, and validate the interaction.
![[nrg - menorah on proto 3.webp]]

This taught me an important lesson: when you're on a tight timeline, reliability beats specs. The Nano 33 IoT was overkill for the final design, but it let me validate the concept quickly.

**Required pins:**
- 9 LEDs (shamash + 8 nights)
- 1 solar voltage divider (analog input for darkness detection)
- 1 battery voltage divider (analog input for charge monitoring)
- 1 microswitch (slide interaction detector)
- 1 ShowOff button (manual override)
- UPDI programming interface (1 pin)

**Total: 14 functions. Available: 12 pins.**
![[nrg - menorah on proto 1.mp4]]

I was two pins short. I couldn't eliminate any functions - each served a real purpose. The solution came from a conversation with Pedro who suggested a shift register.

The [[74HC595 Shift Register]] is a serial-to-parallel shift register: give it three pins (data, clock, latch) and it controls 8 outputs. Perfect for driving 9 LEDs with just 3 microcontroller pins.

### The solar panel pulls double duty: energy harvester and ambient light sensor.

A voltage divider (two 10kΩ resistors) reads the solar panel's voltage. When it's bright, the panel outputs ~6V. When it's dark, it drops to near zero. The ATtiny reads this divided voltage on an analog pin and uses it as a threshold: below a certain value, turn on the LEDs.

### Persistent Memory

The device needs to remember which night of Hanukkah it is, even when powered off. I could have added an external [[EEPROM]] chip or an RTC with battery backup, but the ATtiny already has internal [[EEPROM]]. One byte stores the current night (1-8), and the slide interaction increments it.

This is PCB-first thinking: use the capabilities already built into your chosen microcontroller before adding external components.

## The Final Design Specification

After a week of breadboarding, testing, and iterating, the design crystallized:
![[nrg - menorah ref.webp]]
### Form Factor

- **Size:** 112mm × 136mm (portrait orientation, designed to match the Voltaic P126 solar panel dimensions)
- **Mounting:** M4 screw head suction cups to window glass
- **Structure:** 3-layer sandwich (window perspective)
    - Front: Voltaic P126 6V 2W solar panel
    - Middle: Custom PCB with ATtiny84, shift register, [[Adafruit BQ25185]], LEDs
    - Back: Frosted acrylic diffusion layer
- **LEDs:** Bent 90° and mounted in milled PCB holes so light is visible from both sides of the window
- **Interaction:** Magnetic slide rails with rest and ON positions; microswitch at top detects the reload gesture
![[nrg - menorah lift 1.mp4]]
(#1 Prototype lift mechanism)
![[nrg - menora p1 lift mech .webp]]

### Core Components

- **Microcontroller:** ATtiny84 (14 GPIO, UPDI programming)
- **LED control:** 74HC595 shift register (serial-in, parallel-out)
- **Charging:** [[Adafruit BQ25185]] solar charger with 5V boost output
- **Power source:** Voltaic P126 6V 2W solar panel
- **Energy storage:** 3700mAh 3.7V LiPo battery
- **Sensors:** Two voltage dividers (solar panel voltage, battery voltage)
- **Interaction:** Microswitch (slide detect) + ShowOff button (manual override)
- **Passive components:** 330Ω LED resistors, 10kΩ voltage divider resistors, 100nF decoupling capacitors

### Smart Features

**1. Auto-activation:** The device reads solar panel voltage through a voltage divider. When ambient light drops below a threshold (indicating darkness), the LEDs automatically turn on. This uses the solar panel as both an energy harvester and a light sensor.
**Dark Detection Logic:**
- `DARK_THRESHOLD = 150` (ADC counts, 0-1023 range)
- ATtiny84 ADC reads 0-1023 across 0-5V (Vcc)
- ADC reading of 150 = ~0.73V at PA0 (ADC pin)
- Since voltage divider halves the input: 0.73V × 2 = **~1.47V at solar panel**
- **Above 150** (>1.47V) → "sunny" → LEDs stay off
- **At or below 150** (≤1.47V) → "dark" → LEDs can activate
![[nrg - menorah on proto 2.mp4]]
**2. Night tracking:** The ATtiny's internal EEPROM stores the current night (1-8). The slide interaction - pulling the PCB down from its magnetic rest position and pushing it back up to the ON position: triggers the microswitch, which increments the night counter. Shamash (the helper candle) is always lit; the night candles increase progressively.

**3. Battery monitoring:** A second voltage divider on the BQ25185's BAT pad allows the microcontroller to check battery charge level. This enables low-battery warnings or shutdown protection. Not to sure to use yet

**4. ShowOff mode:** A physical button overrides the darkness detection, forcing the LEDs on regardless of ambient light. Useful for demonstrations, testing, or just showing off the project in daylight.

## Power Consumption Analysis: Can It Last 8 Nights?
![[nrg - menorah power concumption.webp]]
This is an energy course, so the power budget matters. The question: **Can a 3700mAh battery power the menorah for all 8 nights of Hanukkah without any solar input?** (it fit at form factor)

**Battery energy:** 3700mAh × 3.7V = 13.69 Wh

**LED power consumption:** Each yellow LED draws approximately 20mA @ 3.3V = 0.066W per LED
**Total available LED-hours:** 13.69 Wh ÷ 0.066W = 207 LED-hours
**LED distribution across 8 nights:**
- Night 1: 2 LEDs (shamash + 1)
- Night 2: 3 LEDs (shamash + 2)
- Night 3: 4 LEDs (shamash + 3)
- Night 4: 5 LEDs (shamash + 4)
- Night 5: 6 LEDs (shamash + 5)
- Night 6: 7 LEDs (shamash + 6)
- Night 7: 8 LEDs (shamash + 7)
- Night 8: 9 LEDs (shamash + 8)

**Total: 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 = 44 LED-nights**

**Hours per night (assuming equal runtime each night):** 207 LED-hours ÷ 44 LEDs = **4.7 hours per night**

### The Verdict

With zero solar input, the 3700mAh battery can run the menorah for approximately **5 hours each night** for all 8 nights. That's enough to cover the typical dark hours in December (sunset around 17:30 PM, bedtime around 10 PM).

But here's the beautiful part: this is the _worst-case scenario_. In reality, even on cloudy December days, the solar panel will harvest some energy during daylight. Sunny days will fully recharge the battery. The system is designed to be self-sustaining over the 8-day period, not to run exclusively on battery reserves.

If I wanted a full 5-6 hours per night with no solar input whatsoever, I'd need a 4000-4700mAh battery - only about 8-27% more capacity. The current design strikes a good balance: not over-provisioned (wasting money and weight on unnecessary battery), but with solar backup to extend runtime when needed. A next step would be to match the miracle to the power usage.

![[nrg - pcb design on proto 1.mp4]]
(Protoboard with the PCB layout with jumper cables. A tryout to check my schematics work)

Net List
```
Netlist

Exported from M_pcb Electronics Design v16.sch at 2026.04.27 5:27 PM

EAGLE Version 9.7.0 Copyright (c) 1988-2026 Autodesk, Inc.

Net      Part         Pad      Pin        Sheet

GND      C1           1        1          1
         C2           2        2          1
         D1           2        C          1
         D2           2        C          1
         D3           2        C          1
         D4           2        C          1
         D5_SHAMASH   2        C          1
         D6           2        C          1
         D7           2        C          1
         D8           2        C          1
         D9           2        C          1
         MICRO_SWITCH 2        2          1
         R10          2        2          1
         SHOW_OFF     2        2          1
         U$1          P$5      G          1
         U$2          GND      GND        1
         U1           14       GND        1
         U2           13       !OE        1
         U2           8        GND        1

N$1      D1           1        A          1
         R1           2        2          1

N$2      D2           1        A          1
         R2           2        2          1

N$3      D3           1        A          1
         R3           2        2          1

N$4      D4           1        A          1
         R4           2        2          1

N$5      D5_SHAMASH   1        A          1
         R5           2        2          1

N$6      D6           1        A          1
         R6           2        2          1

N$7      D7           1        A          1
         R7           2        2          1

N$8      D8           1        A          1
         R8           2        2          1

N$9      D9           1        A          1
         R9           2        2          1

N$10     R5           1        1          1
         U1           12       (PCINT1/AIN0/ADC1)PA1 1

N$11     R1           1        1          1
         U2           1        Q1         1

N$12     R2           1        1          1
         U2           2        Q2         1

N$13     R3           1        1          1
         U2           3        Q3         1

N$14     R4           1        1          1
         U2           4        Q4         1

N$15     R6           1        1          1
         U2           5        Q5         1

N$16     R7           1        1          1
         U2           6        Q6         1

N$17     R8           1        1          1
         U2           7        Q7         1

N$18     R9           1        1          1
         U2           15       Q0         1

N$19     BATTERY      +        +          1
         CN1          1        1          1

N$20     BATTERY      -        -          1
         CN1          2        2          1

N$21     C1           2        2          1
         C2           1        1          1
         R12          2        2          1
         U$1          P$7      5+         1
         U1           1        VCC        1
         U2           10       !SRCLR     1
         U2           16       VCC        1

N$23     R11          1        1          1
         U$1          P$1      VIN        1
         U$2          VIN      V+         1

N$24     U1           7        (PCINT6/OC1A/SDA/MOSI/ADC6)PA6 1
         U2           14       SER        1

N$25     R10          1        1          1
         R11          2        2          1
         U1           13       (PCINT0/AREF/ADC0)PA0 1

N$26     U1           6        (PCINT7/ICP/OC0B/ADC7)PA7 1
         U2           11       SRCLK      1

N$27     U1           2        (PCINT8/XTAL1/CLKI)PB0 1
         U2           12       RCLK       1

N$28     MICRO_SWITCH 3        3          1
         U1           3        (PCINT9/XTAL2)PB1 1

N$29     SHOW_OFF     3        3          1
         U1           5        (PCINT10/INT0/OC0A/CKOUT)PB2 1

N$30     R12          1        1          1
         U1           4        (PCINT11/!RESET!/DW)PB3 1

```
## Key Learnings

**1. Pin constraints drive architectural decisions.** I started thinking I could just wire everything directly to GPIO pins. The ATtiny84's 12-pin limit forced me to learn about shift registers. Conversation and office hours are important. Constraints breed creativity.

**2. Use what's already there.** The solar panel became the light sensor. The ATtiny's internal EEPROM became the night counter. The BQ25185's BAT pad (might) became the battery voltage monitor. Good embedded design is about recognizing when you already have the capability you need.

**3. Proof-of-concept doesn't mean final hardware.** The Arduino Nano 33 IoT got me to a working prototype quickly. Programing the ATtiny was a whole other process that I have not seen the fruits of yet.

**4. Power budgets are real.** This is an energy course, and the power calculation proved the design is viable. Doing some of the math up front - before ordering batteries, prevented expensive surprises later.

**5. PCB design is a different discipline than breadboarding.** I'm learning to think in terms of board layers, trace widths, component footprints, and manufacturing constraints. It's a new way of seeing circuits. Knowing GND 

---

Many thanks to Jeff Feddersen @ https://www.fddrsn.net/ - my Energy teacher