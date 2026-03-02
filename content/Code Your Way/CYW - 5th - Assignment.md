I have found a direction.
I am going to control a robotic arm.
I have understood that without a cause I move slower, I have access to [[LeRobot]] **Python-based control and learning system** developed by Hugging Face. That normally comes with [[SO101]] **a robot arm that sits on your desk**. 
and understanding of inverse kinematics from last semester and i want to combine them.

![[cyw LeRobot Arm.webp]]

<div style="display:flex; gap:10px;"> 
![[cyw 1 shoulder pan.webp|300]] 
![[cyw 2 shoulder lift.webp|300]] 
</div>
<div style="display:flex; gap:10px;"> 
![[cyw 3 elbow flex.webp]] 
![[cyw 4 wrist felx.webp]] 
</div>
<div style="display:flex; gap:10px;"> 
![[cyw 5 wrist roll.webp]] 
![[cyw 6 gripper.webp]] 
</div>

i read the documentation and started exploring libraries.

My 'simple' goal:
![[cyw ur light painting.webp]]


**Robotic Light Painting**
Long exposure photography transforms motion into visible geometry.
1. Python generates a trajectory.
2. Robot executes trajectory.
3. LED attached to end-effector.
4. Camera captures long exposure.
5. Motion becomes light sculpture.

I will go over
[[PyTorch]]
[[TorchScript]]
Might check out 
[[ROS2]] 

References
Single Stroke Aerial Robot Light Painting: chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/https://www.cs.mcgill.ca/~kry/pubs/expressive19/lightPaintingExpressive.pdf
