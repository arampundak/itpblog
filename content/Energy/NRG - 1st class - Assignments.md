#hardware 

- Find a DC gearmotor and/or a stepper motor to use as a first generator. As a general rule, about fist sized is good, and you should be able to turn the shaft by hand (or with pliers if there is a large gear reduction).
- Bring to class next week: multimeter, breadboard, gearmotor and/or stepper.
- Begin to brainstorm what kind of motion you can capture for your kinetic project. Post a sketch of what you might make for the project. If you want to work in a group, form one.

For this week assignment I had the urge to create something with my hands. Coming form industrial design background I adore the tangible, after a first spring semester week of mainly code lines, contemplating what are network devices and tinkering with the command line I felt like diving into electricity generation without a computer next to me.

Matt and I took a salvaged crank from the junk shelf and attached it to a stepper motor. We turned the motor and expected to see a current in the multimeter. Little did we know...
![[energy - ac not working.mp4]]
After some discussion with whoever was around the shop we understood a stepper creates AC - alternating current. And in order to use the energy potential of the stepper we need to create an AC/DC converter.
Without opening a computer (youtube on iphone - https://www.youtube.com/watch?v=-zCTggoh994) we were introduced to "Bridge Rectifier":
>A bridge rectifier is ==a four-diode circuit configuration that converts alternating current (AC) into direct current (DC) by allowing both halves of the AC cycle to pass, ensuring a consistent output polarity==. It provides full-wave rectification, making it highly efficient for power supplies, battery chargers, and motor drives.

A stepper motor circuit:
![[stepper motor circuit.webp]]
A bridge rectifier circuit:
![[bridge rectifier circuit.webp]]
What we built
![[nrg - bridge rectifier 1.webp]]
![[nrg - bridge rectifier 2.webp]]
We made 2 bridge rectifiers and added to them a cpacitor to regulate the current being produced with turning the stepper, this is for the moment of spinning not happening continuously. The schematics - 2 sets of 4 diodes all go in one direction. To north (#3 in the drawing) connects DC - Vcc, south (#1) DC - GND, Other 2 sides east, west (#2 #4) are A+B of stepper motor. To make the 2 bridge rectifiers connect north and south.
That comes out to:
![[energy bridge rectifier.mp4]]
And from the process of it:
![[energy - its always aram.mp4]]
![[energy - fan.mp4]]

Yay this was fun!
Also started thinking about ideas for [[Kinetic Assignment - 1.1 - Ideation]] - I want to create something that is within the design/art realm and ill be happy with putting on the wall in my house.