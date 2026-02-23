> Human cranks → energy accumulates → threshold reached → robot “lives” briefly → dies again.

1. Jeff pointed toward BEAM robotics
- **BEAM robots**
- **Type 1 Solar Engines**
- “Trimet” robots
- Miller engine
- 1381 voltage detector
- TC54 voltage trigger

These are classic circuits where
- Energy slowly accumulates in capacitors
- A threshold is reached
- A comparator/trigger flips
- Energy dumps into a motor
- Robot “scoots”
- Then repeats

2. Current issue
- The motor turns continuously while cranking
- It doesn’t “store then snap”
- It slowly equilibrates instead of triggering cleanly
Jeff explained why:
> If you only use a MOSFET or transistor directly, it can slowly turn on while charging — leading to a weak equilibrium instead of a sharp discharge.

3. Suggested a voltage trigger / comparator approach
Option A — TC54 (Voltage Trigger)
- Built-in threshold
- Clean digital HIGH/LOW output
- Fires when voltage exceeds fixed level
Option B — 1381 voltage detector (older BEAM favorite)
- Different versions:
- 2.0V
- 2.2V
- etc.
These act like:
> “Below X volts = OFF. Above X volts = ON.”

That ON signal then drives:
- NPN transistor  
or
- N-channel MOSFET
Which dumps capacitor energy into motor.

4. Important insight about the “blue capacitor”
In the BEAM diagram he showed:
- Big capacitors = energy storage
- Small capacitor near transistor = keeps output ON slightly longer

This prevents:
- Trigger turning off immediately as voltage drops
- Flickering behavior

That little cap stabilizes the discharge burst.

5. More capacitors = longer crank time. Beautifully intuitive physical metaphor.
If:
- Reservoir size increases
- Generator power stays constant
Then:
- Fill time increases
---

ToDo

1. Check
Best:
Use oscilloscope across stepper coils  
→ See AC waveform  
→ Measure open-circuit peak voltage

Or:
Rectify it  
Charge a capacitor  
See what voltage it levels off at

2. Build
Build a Basic “Type 1 Solar Engine” Version
Stepper → Bridge rectifier → Big capacitor → TC54 → NPN → Motor

3. Build simple TC54 + NPN trigger