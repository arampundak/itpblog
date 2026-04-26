https://www.youtube.com/watch?v=axMYd0YTIPU&list=PLmA_xUT-8UlL80Xm8Gxz98YNum3I9GInr&index=4

Remember to push and puch back between 2D design and 3D design
Default design rules of the PCB are concervative to make sure the PCB is manufatural. 
Start placing components.

**Align:**
![[pcb 4 - align.webp]]

**Schematic group to Board group**
It is possible to choose from the schematic window and see the selected choice in the 2D board view. This can help finding components related to the same group or place.

**Place components on the bottom of the PCB**
By dragging and pressing on the scroller of the mouse
![[pcb - 4 bottom.webp]]

**Copper Pour**
An even distribution of copper all over the PCB. 
Shield against noise, good against warping, and especially be a common ground.
Also nicely used on bottom layer as common VCC.
Unless you have a very good reason not to do it - like RF anttena, always do a pour. 
1. Right click on the edge of the PCB
2. Convert to poligon -> Copy![[pcb - 4 convert to poli.webp]]
3. Choose Top Layer
4. Give it its value/signal - GND ![[pcb - 4 gnd pour red.webp]]
5. Make sure in the inspector tab - Signal is GND, youll see a cross on pins that are connected to GND. This is called Thermal connections ![[pcb - 4 cross pin gnd.webp]]

**DRC**
![[pcb - 4 rules.webp]]
In the upper left tab choose Rules -> Design Preferences.
To change clearness and tolerances - this is the minimums you define to be checked if the manufacturer can make.

Maybe it moved to the design rules editor. 

**Fanout**
Use fanout to create vias (through hole to other PCB side).
When components are on both sides of the pcb but the GND pour is on the top, use vias to connect bottom components to upper GND level.
![[pcb - 4 fanout vias.webp]]

**Route**
Route away! choose the bottom layer to avoid intersections, press space bar while routing to create a via to transition into another layer.

Check for any missing air wires
In Rules -> Check design rules, to get error messages.
![[pcb - 4 check rules.webp|500]]
