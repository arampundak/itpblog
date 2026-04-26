
1. File -> New electronic library
   ![[pcb - new electronic lbr.png]]
When creating a new library - you are dealing with 4 types of files:
Devices - the glue that joins everything togther
Symbols - for Schematic editor
Footprint - What is used in the PCB editor
Packages - 3D representation of the component
**Think of it like:** Symbol = one letter, Schematic = complete sentence
2. Create New Symbol
   Give it name -> OK
3. You enter the Symbol environment, keep grid at 0.1 inch or 2.54 mm (which are the same)
   ![[pcb - grid.webp]]
4. Draw the symbol, keep it centered
   ![[pcb - draw symbol.webp]]
5. Add pins, keep them lined with the grid
   ![[pcb - add pins.webp]]
6. Choose pins 'direction':
   The Direction tells Fusion what electrical function each pin has.![[pcb - direction.webp]]
- **io** = Input/Output (bidirectional, like data pins)
   - **nc** = Not Connected (unused pin)
   - **out** = Output only (signal going OUT of the component)
   - **oc** = Open Collector
   - **pwr** = Power pin ⭐ **USE THIS for solar panel!**
   - **hiz** = High impedance
   - **pas** = Passive (like resistors, no polarity)
   - **sup** = Supply/Power ⭐ **Also good for solar panel**

7. Swap Level - if zero is unique, cant be changed with another pin. Any to pins with the same swap level will be considered equivalent. Resistors will have two pins with the same swap level, because it can be placed in both ways. 
8. Visible
   off - good for resistors
   pad - only pad name
   pin - only pin name
   both - both
9. Name
   ![[pcb - name.webp]]
   make everything on 0.1 grid
   set direction for the pins which will help ERC varify the soundness of your desig
   swap level for interchangable pins
   visible - pin pad both
10. New Footprint
    https://www.youtube.com/watch?v=8-tJZHFzWXo&list=PLmA_xUT-8UlKE-U-eEqrkNEI7rd1fUnLY&index=3
    ![[pcb - new footprint.webp]]
11. Footprint is is for the **actual PCB**, what will be seen in the circuit design with the Through Holes and such. 
    ![[pcb - footprint me.webp]]
    ![[pcb - footprint garcia.webp]]
    There are many options with creation, go to video start at 5:00. Change order of pads.
12. Create a 3D model: 
    Create new
    Attach copy - for similar 3d models coming in the same package
    https://www.youtube.com/watch?v=LlhIeRFX-N4&list=PLmA_xUT-8UlKE-U-eEqrkNEI7rd1fUnLY&index=4
    ![[pcb - create 3d model.webp]]
13. After creating the Symbol, Footprint and Package - Create new Components (in Garcia's "Create New Device") to get Multi tiered window
    ![[pcb - new comp.webp]]
14. Add Symbol, place it, Done
    ![[pcb - add symbol.webp]]
15. Add Package (that was just created)
    ![[pcb - add package.webp]]
16. Mapped will have a warning - it wants to connect the information given, press it and connect the right pins
    ![[pcb - connect package.webp]]
    Garcia says something about gates
    ![[pcb - gates.webp]]
    
