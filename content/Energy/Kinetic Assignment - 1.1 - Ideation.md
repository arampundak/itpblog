Turn human motion into useful electrical output

Ideas:
1. Dynamo clock - crank a motor to produce enough electricity to turn on a screen showing the time. Instead of just casually looking at the watch you have to make an effort to unfold its information. the clock should have a battery to always keep time while its screen is off, so its a 2 system object, can be made without microcontroller? ot with ATtiny / PIC microcontrollers
2. Upload to e-ink display - an e-ink screen is connected to a motor, when turned produces electricity flushing the e-ink with an image of some sort. maybe theres a camera and its a photobooth?
3. Companion

Resources:
https://blog.jasongao.me/energy/
https://brandonroots.com/category/itp/energy/

---
Chosen Idea - Wilson the companion

**A stranded companion object that only comes alive if you physically give it energy.**
The object is an abstract dog. Its tail functions as a generator: the user must move it repeatedly to charge the system. Once enough energy is stored, the dog briefly “lives” - its head rises and the tail wags - before going dormant again.
Electrical automata:
_you charge me → I respond → you keep investing_.
a “tail handle” as affordance

**Character:** an abstract dog (Wilson vibe: needy, loyal, simple)  
**Interaction:** the only way it can “live” is if you give it energy via its tail (a handle).  
**Payoff:** it spends that energy later to do one meaningful gesture (wiggle, scoot, perk ears, “nuzzle,” tiny jump-scare jack-in-the-box moment).

Key HMI angle: **care = power.** The user learns energy limits through empathy.

Can you store energy and later move a motor with _no microcontroller_?
workable electrical architecture
1. **Generator:** stepper motor (hand-driven) used as a generator
2. **Rectify:** convert AC → DC with bridge rectifiers
3. **Store:** supercapacitor bank (or rechargeable battery, but supercaps are more “honest/visible”)
4. **Protect/shape:** voltage clamp + maybe a regulator (optional depending on your motor choice)
5. **Release/behavior:** an analog threshold switch (comparator) that “lets it move” once charged
6. **Actuate:** a motor that spends the stored energy

![[nrg kinetic sketch 1.webp]]
![[nrg kinetic sketch 2.webp]]
![[nrg kinetic sketch 3.webp]]

The tail as an energy interface - care = motion = electricity = life
Hidden life → revealed life: after charge, head appears, tail moves. Capacitor metaphor
Abstracted dog faces / minimal expressions
- Robots don’t need intelligence to feel alive
- Energy constraints _are interaction design_
- Embodiment > screens
- Dependency creates attachment
![[nrg kinetic ref 1.webp]]
![[nrg kinetic ref 2.webp]]



Tech questions:

1. Threshold switch (no Arduino)
Use:
- A **comparator** or
- A simple **zener + transistor** arrangement

2. Behavior:
- Below X volts → nothing happens
- Above X volts → motor turns on

3. Supercapacitors bank?

4. One motor to rule them all OR two motors - generator / movement creator

5. Cam & Ocsilliation 

6. Tail as one physical part that does **two jobs** charge → wag
Opt1 Same tail shaft 2 motors
Charge mode:
- Tail shaft is coupled (through gears/belt) to the **generator stepper**.
Wag mode:
When the threshold triggers, a **second motor (DC motor)** briefly drives that _same tail shaft_ through:
- a **one-way clutch** / **ratchet** / **sprag bearing**, or 
- a **slip clutch** (friction coupling)
How:
- a cheap **one-way bearing** (like in bikes/skateboard rollers) or
- a simple 3D-printed **ratchet + pawl**.

Opt2 Tail crank charges, and the same tail _moves_ via a spring release
- Cranking the tail spins the stepper → charges a supercap **and** winds a **torsion spring** or rubber band.
- When voltage hits the threshold, an **electromagnet/solenoid** (brief pulse) releases a latch.
- The spring makes the tail do a cute wag burst.

Opt 3 One stepper does both generator and wag
- A **mode switch** that disconnects the stepper coils from the rectifier and connects them to a driver circuit.
- A **no-microcontroller stepper driver**, typically:   
- 555 timer + 4017 counter + transistor array
- And some way to prevent you from cranking while it’s driving (or it will feel crunchy).
How:
1. One-way clutch / ratchet - The tail shaft can be driven in one direction by you (charging), and driven (or wiggled) by Motor 2 without back-driving Motor 1.
2. Slip clutch - Motor 2 is allowed to “win” locally and move the tail even though Motor 1 is connected, because the coupling **slips** under load.
3. Mechanical “mode switch” - A physical slider/lever changes the tail coupling