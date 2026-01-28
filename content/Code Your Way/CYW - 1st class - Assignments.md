Self-Guided Study Path — Learning Plan
## Part 1: Setup

Document process in this blog, updated weekly!!!!!!  
Each week will include:
- What I tried to learn - Topic / codeacadamy lesson / connection to robotic control - motors, vision, movement, expression reading, behavior
- What worked / what didn’t
- Code snippets (and what I understand vs. what’s still unclear)
- Reflections on using AI tools: when they helped, when they confused me, what did they explain

This documentation will function both as a learning log and as a way to slow down my thinking and avoid “black-box” coding.

---

## Part 2: Learning Plan

### Project Idea (Weeks 8–14)

In the second half of the semester, I want to **rebuild and reprogram “Leon,” the robot Bolong and I built last semester in PComp**, using Python as the primary language.

Leon has:
- 4 motors (movement / posture)
- A camera (basic vision / perception)
- Arduino Uno (might be changed to esp32?)

Last semester, the robot worked, but much of the code was written with heavy reliance on AI assistance (Vibed). While this enabled fast progress, it also left me without understanding.

**The goal now is to rewrite the robot’s software from scratch**, step by step, so that I understand:
- How motion is generated and controlled
- How sensor and camera input is processed
- How behavior emerges from simple logic and state

This project is less about adding new features and more about **regaining authorship and clarity** over the system.

---

### Tools to Learn

Primary:

- **Python 3** (core language, syntax, mental model)
- **Command line / terminal workflows**
- **VS Code** as a development environment
    

Secondary / contextual:

- Git & version control (as covered in class)
- Reading and understanding existing code (from other courses: Connected Devices, OK Robot Reboot, Energy)
- Using AI tools _intentionally_ (debugging, explanation, comparison — not full code generation)

---

### Resources (starting points)

1. **Codecademy – Python 3 Course**  - from Tandem
    (Already enrolled)
    - Structured, incremental introduction
    - Focus on fundamentals: variables, loops, functions, data structures
2. **Learn Python the Hard Way (learnpythonthehardway.org)** - from Pedro
    - Emphasis on discipline, command line usage, and mental models
    - Slower, more frustrating, but valuable for understanding “what’s actually happening”
3. **Course materials from OK Robot Reboot & Connected Devices**
    - As real-world examples of code I will need to read, understand, and eventually modify
4. Friends at ITP - Dean, Fabri, Matt, Ryan etc

(Additional documentation and libraries will be added later, once the foundations are solid.)

---

## Weekly Milestones (Weeks 1–7)

### Week 1 - Grounding & Environment

**Goal:** Get comfortable with the tools, not the robot yet.
- Talk to Dean

- Terminal basics (navigation, running scripts, file structure)
- Python basics:
- Running Python files
- Variables, types, printing
- VS Code setup and workflow
- Reflection:  
    _What feels familiar? What already feels shaky? Where do I instinctively want to ask AI for help?_

---

### Week 2 - Control Flow & Thinking in Code

**Goal:** Learn how decisions and repetition work.

- `if / else`, conditionals
- `for` and `while` loops
- Simple logic exercises (counting, thresholds, state changes)
- Rewrite small Codecademy exercises _without_ looking at solutions
- Reflection on translating human intent into machine logic

---

### Week 3 - Functions & Modularity

**Goal:** Stop writing “flat” scripts.

- Writing functions
- Parameters and return values
- Breaking one script into meaningful pieces
- Begin thinking in terms of behaviors instead of lines of code
- Light refactoring of earlier exercises

---

### Week 4 - Data & State

**Goal:** Prepare for robot behavior.

- Lists, dictionaries
- Simple state machines (e.g. `idle`, `move`, `react`)
- Understanding scope and variable lifetim
- Mapping “robot behaviors” conceptually, without hardware yet

---

### Week 5 - Reading & Understanding Other People’s Code

**Goal:** Reduce fear of existing systems.
- talk to Tandem friends

- Carefully read example code from OK Robot Reboot / Connected Devices
- Annotate code:
- What do I understand?
- What do I _think_ it does?
- What don’t I understand at all?
- Use AI _only_ to explain specific lines or concepts, not to rewrite everything

---

### Week 6 - Hardware Thinking (Without Full Integration)

**Goal:** Bridge software and physical behavior.
- Talk to Jordan

- Conceptual motor control:
- Speed, direction, timing
- Writing mock functions for motors and sensors
- Pseudocode for Leon’s behaviors
- Start structuring a “robot control” Python file, even if hardware isn’t fully connected yet

---

### Week 7 - Preparation for the Build Phase

**Goal:** Be ready to actually build.

- Clean project structure
- Clear understanding of:
- What I can already code confidently
- What I still need to learn during weeks 8–14
- Define a realistic scope for Leon’s rebuilt behavior
- Reflection:  
    _How has my relationship with code changed over these weeks?_

---

## Part 3: Questions & Uncertainties

- How deep should I go into Python before integrating hardware? when should i focus on the topics of physical computing that are of interest to me?
- When is it appropriate to lean on AI, and when does it prevent learning?
- How much complexity is realistic for this semester without reverting to “vibe coding”?!
- What level of abstraction is appropriate for a robot like Leon?

These are questions I hope to refine through class discussions and feedback.