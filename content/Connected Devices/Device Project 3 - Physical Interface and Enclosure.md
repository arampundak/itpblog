>Due in week 6. Add any physical outputs, such as screens, LEDs, speakers, or other components needed to indicate the status of the device. Also add any inputs, such as buttons or knobs to change the state of the displays or the device itself. Design the layout of these components, and build an enclosure to hold them all. In other words, by week 6, your device needs to be fully functional.

After I got my hands dirty and had a device sending data to a browser dashboard Fabri and I met together to reiterate our Wifi device.
We thought about the meaning of Wifi and recalled a google chrome game for one does not have interenet connection:
![[condev trex-runner.webp]]
Instead of a dinosaur we are planning to make a device that smells for the strongest Wifi signal and tells you if that network gets stronger or weaker as you walk with it.
Treasure Hunt? Hot Cold children's game?

We made a small mockup based on an esp32 with a screen that has an initial interaction in it. The device is inspired by the graphics of the dinosaur, that goes off the screen to scan for networks, it finds the strongest Wifi signal (-dB) and keeps showing its strength while the user walks around. 

![[condev device project 3 sketch.webp]]


We are thinking of a computer attached device, and an imagined scenario of such:
sudden 404 no Wifi -> close the laptop -> turn on Wifi seeking dognasaur* -> it sniffs/attaches/fetch the strongest Wifi -> shows on screen -> user walks -> device shows when a good signal is found -> user sits -> open computer -> a welcome page with a happy dognasaur
*
I also prefer cats... but don't let my wife's dog hear about it...

---

Round Screen: 
Adafruit 1.28" 240x240 Round TFT LCD Display with MicroSD - GC9A01A with EYESPI Connector
https://www.adafruit.com/product/6178


