#hardware 

When you turn a rotary encoder, it has two electrical contacts (`CLK` and `DT`) that open and close in a specific sequence. The _order_ of that sequence tells you which direction you turned. Think of it like two people blinking — if A blinks before B, you went clockwise; if B blinks before A, you went counterclockwise.

`SW` is just a regular button — it clicks when you push down on the knob.

So the encoder needs:
- `GND` and `VCC` → power
- `CLK` and `DT` → any two regular digital GPIO pins
- `SW` → any digital GPIO pin

![[res - rotary encoder.webp]]
