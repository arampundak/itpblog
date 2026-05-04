4 Ways to Start Your PCB Board Easily: https://www.youtube.com/watch?v=NCntaivZtw0&list=PLmA_xUT-8UlL80Xm8Gxz98YNum3I9GInr&index=3

Create a PCB layout from your schematic:
1. Draw manually
2. Non-associated PCB
3. Associated PCB
4. Generate from board

Options 1 is simply drawing, options 2-4 are derived from an encloser 

---
# Option 1
Draw manually:
Move the layout, use miter tool for chamfer or fillets.![[pcb - 3 draw manually.webp]]

For 2 & 3 we need a sketch to define what we want the board geometry to be

# Option 2
Indipendent PCB, you take a snapshot of the sketch at a given moment. If the design change - PCB stays the same.
It can be reinserted to the original model.
Once its made it has no connection to original sketch.

![[pcb - 3 sketch from encolsure.webp]]
1. Create a new plane within the encolsur.
2. make a new sketch
3. project the profile
4. Offset
5. Finish sketch
6. CREATE -> Create PCB
   ![[pcb 3 - create pcb.webp|300]]
7. For option 2 - Create independent PCB
8. Select profile -> The sketch we made
9. Change Origin Point! Put it SW corner, pay attention to X axis (red arrow), and to its orientation:
   ![[pcb - 3 x axis.webp]]
10. Press OK
    ![[pcb - 3 non associative.webp]]
11. Save
12. Link to 2D pcb command
    ![[pcb - 3 link to 2d pcb.webp|500]]
13. Select the PCB to link to (the shape that we made)
    ![[pcb - 3 select pcb to connect to.webp]]
14. See the new outline in the 2D PCB
    ![[pcb 3 - outline in the 2d pcb.webp]]
15. The 2D and 3D PCB are not synced!
16. Hit Push
    ![[pcb - 3 push.webp]]
17. Components will appear but off the board
    ![[pcb - 3 comp off the board.webp]]
18. THE 3D PCB FILE CAN ONLY CONTAIN PCB ELEMENTS, DONT ADD ANYTHING ELSE TO THE FILE, MAKE IT A SUB ASSEMBLY AND INSERT TO PROJECTS AS NEEDED
19. Save the file in the electronic design main filr
    ![[pcb - 3 main preview.webp]]

# Option 3
Associative PCB.
Its linked to the profile you choose, changing the profile will change the pcb.
Because we derive it from the sketch and its linked to the sketch, it can't be reinserted raw. 
Workaround - create a new assembly with the enclosure and the associated PCB.
1. Create a new plane within the encolsur.
2. make a new sketch
3. project the profile
4. Offset
5. Finish sketch
6. CREATE -> Create PCB
   ![[pcb 3 - create pcb.webp|300]]
7. For option 3 - Create Associative PCB
8. Select profile -> The sketch we made
9. Change Origin Point! Put it SW corner, pay attention to X axis (red arrow), and to its orientation.
10. Press OK
11. Save the new PCB, its not associated yet
    ![[pcb - 3 associated.webp]]
12. Change the original sketch in the enclosure file, save, go back to the pcb and pull/sync:
    ![[pcb - 3 sync.png|500]]
13. If changes has been made - you can Edit -> Board in the timeline to change the 3D design
    ![[pcb - 3 edit board.png]]
14. Update profile
    ![[pcb - 3 update profile.webp]]
15. If started with option 2 and now want to change:
    ![[pcb 3 - remove link.png]]
16. Go to the 3C PCB -> Link
17. Choose 2D PCB
18. Push to bring information in
    ![[pcb - 3 push.webp]]
19. Always save in the 

# Option 4 
Edit in Place
1. In the 2D PCB file, delete the PCB layout, the colors will change.
2. Draw a new PCB
   ![[pcb - 3 draw a new pcb.webp]]
3. Top left -> create a 3D PCB from 2D PCB. THIS IS A BIG CHANGE
4. Save
   ![[pcb - 3 eip save.webp]]
5. Insert EiP to enclosure assembly
   ![[pcb - 3 EiP to enclosure assembly.webp]]
6. Make sure its alligned
7. Edit in place the PCB component
8. Reveal the sketch -> Edit
   ![[pcb - 3 edit sketch.webp]]
9. Empty the sketch, choose everything and delete
10. Finish sketch, things will look the same
11. Edit board in the Timeline
    ![[pcb - 3 EiP edit board.webp]]
12. Pick a profile
13. Change Origin Point! Put it SW corner, pay attention to X axis (red arrow), and to its orientation:
   ![[pcb - 3 x axis.webp]]
14. Exit Edit in Place
15. Save the design - 2 files should be saved
16. Go to 3D PCB -> push to 2D PCB
17. Go to 2D PCB -> push back to 3D PCB
   