20260330

Something I can take credit for this week - I really got my hands dirty with operating the arm, i've gotten accustomed to VScode, opened repositories and files by myself, wrote code with LLM while understanding the process and annotating, I didn't give up!

Interesting take - Claude context management

About my Hello World from friends:
- Update the command to the motor too quick
- How to divide the action to the target angle
- Detect the environment 
- Loop for the user engagement
- Learn ROS2 from Kevin's friend
- Or create my own operation system

Process Mapping:

I began by ==trying to set up the motors that make the arm and calibrating== them to know min max values.

But that approach ==kept failing==. The ==computer could see the board over USB==, yet LeRobot libraries I was using in my Python code ==kept saying it could not find the motors==. At first this made the whole system feel broken.
Through debugging, I learned the issue was not “the robot doesn’t work,” but something narrower, my Mac could talk to the board, but LeRobot was not seeing the servos the way it expected.

That led me to suspect the arm had already been onboarded before, and that I was using the wrong entry point for this particular hardware state. (3 hours)

Instead of continuing to fight the high-level framework, I moved down one level and tested the XIAO ESP32-C3 directly through Arduino IDE using the `SCServo` library.

That was the big breakthrough.

Using a simple sketch, I was able to ping motor IDs, move a servo directly and confirm the arm was actually alive and addressable.

This showed me that the motors were not the problem. The communication path through the XIAO was working.
Once the XIAO could read the servos, I wrote Arduino code that sent motor positions over serial

---

Feedback questions by Ellen:

1. It made me want to work harder and get better at what i do
2. "This is already looking like a complete project and im waiting to see it as part of a system" meaning create more of these
3. Includes a question or a dilemma the project poses and I haven't answered yet - and viewers can tell
4. Lacking feedback is most of the times coming from someones idea of how they can make the project themselves, how they would approach it but without empathizing with me
5. Pattern in feedback - Showing a challenge in the project together with an opportunity