#resource #hardware 

I used an Arduino Zero
and Adafruit Shield
``` c++
// CORRECT pins for RGB Matrix Shield on Arduino Zero
uint8_t rgbPins[] = {2, 3, 4, 5, 6, 7};
uint8_t addrPins[] = {A0, A1, A2, A3};
uint8_t clockPin = 8; // ← THIS IS THE KEY! Pin 8, not A4!
uint8_t latchPin = 10;
uint8_t oePin = 9;
```

32x32 matrix has **1,024 RGB LEDs** (32 × 32 = 1,024 pixels). Each LED can show red, green, or blue. But here's the trick: **you're NOT controlling 1,024 × 3 = 3,072 individual wires!** it uses a **multiplexing**.

1. **The Matrix is Split in Half**
- **Top 16 rows** = controlled by R1, G1, B1
- **Bottom 16 rows** = controlled by R2, G2, B2

2. **Scanning One Row at a Time (Actually Two!)**
The matrix doesn't light all 1,024 LEDs at once. Instead, it:
- Lights row 0 (top) and row 16 (bottom) **simultaneously** for a split second
- Then row 1 and row 17
- Then row 2 and row 18
- ...and so on
It cycles through all 16 pairs **so fast** (hundreds of times per second) that your eyes see a solid image!

3. **What Each Pin Does:**
**RGB Data Pins (6 total):**
- **R1, G1, B1** = color data for the TOP half
- **R2, G2, B2** = color data for the BOTTOM half
- These tell each LED "how bright should your red/green/blue be?"
**Address Pins (A, B, C, D = 4 pins):**
- These SELECT which row pair to light up
- 4 pins can make 2^4 = 16 combinations → selects rows 0-15 (plus their bottom halves)
- Like a phone number - different combinations call different rows
**Clock Pin (CLK):**
- Shifts color data across the row, pixel by pixel
- Think of it like a conveyor belt moving data into place
**Latch Pin (LAT):**
- When all data is in position, LAT says "LOCK IT IN!"
- Transfers data from staging area to the actual LEDs
**Output Enable (!OE):**
- Turns the LEDs on/off
- Used for brightness control via PWM

### How Colors Work
Each LED has 3 tiny chips inside: Red, Green, Blue.
With **4-bit depth** (what we're using):
- Each color gets 16 levels (0-15)
- 16 × 16 × 16 = **4,096 possible colors**
To make **yellow**: Red = 15, Green = 15, Blue = 0 To make **purple**: Red = 15, Green = 0, Blue = 15 To make **white**: Red = 15, Green = 15, Blue = 15

### Librarys
[RGB-matrix-Panel](https://github.com/adafruit/RGB-matrix-Panel)
Adafruit GFX Graphics Library - https://learn.adafruit.com/adafruit-gfx-graphics-library/overview