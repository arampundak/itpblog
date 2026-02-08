with Fabri "Wi-Fi surveyor’s tool"

## 1. The core idea you brought in

You’re interested in:

- **Making Wi-Fi visible**
    
- Understanding Wi-Fi as a **spatial, embodied phenomenon**
    
- Mapping signal strength across a floor
    
- Possibly turning it into:
    
    - a visualization
        
    - a survey tool
        
    - an experience / game
        
    - or speculative tech (Batman sonar vibes)
        

Tom’s _very first response_ matters a lot:

> “The main thing to look at is **why**.”

That frames _everything_ that follows.

---

## 2. Tom’s strongest recommendation (this is the key)

### 🧭 “You’re building a **Wi-Fi surveyor’s tool**”

This is the direction he clearly favors.

Not:

- a perfect automated system
    
- not triangulation magic
    
- not indoor GPS
    

But:

- a **human-in-the-loop measuring device**
    

### What that means:

- The **human provides location**
    
- The **device provides signal strength**
    
- Logging happens **only when the human chooses**
    
- Accuracy comes from **intentional action**, not automation
    

This is _very_ aligned with:

- interaction design
    
- industrial design
    
- embodied sensing
    
- ITP values
    

---

## 3. Why Tom keeps pushing back on “automatic”

You kept circling toward:

- triangulation
    
- indoor positioning
    
- fully automatic mapping
    
- 3D reconstruction
    

Tom’s responses, translated:

- Fully automatic indoor location is:
    
    - **unsolved**
        
    - PhD-level (5–6 years)
        
    - Requires infrastructure (UWB, LiDAR, ToF, etc.)
        
- Wi-Fi is:
    
    - noisy
        
    - reflective
        
    - interfered with by bodies, furniture, metal
        
- Phones already do most of this _well enough_
    

So his design advice is:

> **Don’t compete with the smartphone.  
> Do something phones are bad at.**

---

## 4. What phones are bad at (important!)

According to Tom (and he’s right):

Phones are bad at:

- **Intentional, slow measurement**
    
- **Embodied surveying**
    
- **Making invisible infrastructure legible**
    
- **Designing a single-purpose tool**
    
- **Reducing distraction**
    
- **Explicit “this exact moment, this exact spot” capture**
    

That’s your opening.

---

## 5. The proposed system (simplified)

### Inputs

- Wi-Fi RSSI (signal strength)
    
- Button press (human intention)
    
- Possibly:
    
    - network filter (only NYU / only sandbox)
        
    - timestamp
        

### Human provides:

- location
    
- context
    
- meaning
    

> “Location can be done using human location sensing —  
> AKA your body, eyes, ears.”

This is a _huge_ design philosophy moment.

---

## 6. Outputs (what Tom says is reasonable)

Short term (for this class):

- Data sent to a server
    
- Logged to a file
    
- Viewable via:
    
    - simple web page (HTML)
        
    - phone as a second client
        
- Real-time confirmation:
    
    - “what the device says” = “what the server got”
        

Later:

- MQTT (after the 24th)
    
- Multiple clients reading the same data
    

---

## 7. Visualization ideas: what’s realistic vs speculative

### Realistic for now

- 2D floor map
    
- Color-coded signal strength
    
- Time-based changes
    
- “This spot is good / this spot sucks”
    

### Speculative (acknowledged but not expected)

- 3D Wi-Fi clouds
    
- Batman sonar-style reconstruction
    
- Inferring objects from signal voids
    
- Full spatial reconstruction from interference
    

Tom’s advice here is subtle but important:

> If you want **accuracy**, use simulation tools  
> If you want **experience**, measure reality

Game engines are good for:

- visualizing physics
    
- inverse-square falloff
    
- conceptual exploration
    

But **walking the space** gives meaning.

---

## 8. Why scanning Wi-Fi takes so long

You asked a good technical question.

Answer:

- The device sends probe requests
    
- Routers respond (or don’t)
    
- There’s a timeout per router
    
- You **can’t speed that up**
    
- You _can_:
    
    - filter which networks you care about
        
    - ignore irrelevant routers
        

Design implication:

- Build **interaction around latency**
    
- Don’t fight it — acknowledge it
    

---

## 9. Ethical boundary (very important)

You asked whether Wi-Fi measurement could say something about **people**.

Tom’s response:

- Yes, but…
    
- That becomes **human subjects research**
    
- Universities take that seriously
    
- Rule of thumb:
    
    > _Don’t disrupt people’s everyday activity to measure it_
    

This quietly sets a boundary:  
➡️ **Measure infrastructure, not people**

---

## 10. The “stupid smartphone” idea (why it didn’t land)

You pitched:

- GPS + camera + screen
    
- Helping people navigate
    
- Children, memory, orientation
    
- Less distraction than a phone
    

Tom’s response (kind but firm):

> “You just invented the smartphone.”

His deeper point:

- If an app solves it → don’t build hardware
    
- New hardware = planetary cost
    
- Hardware needs a **clear failure case for phones**
    

This isn’t rejection — it’s sharpening.

---

## 11. Where Tom _actually_ gets excited

Right near the end, he says this:

> “Of all the things you mentioned…  
> the most interesting challenge is the **Wi-Fi surveyor’s tool**.”

Why?

Because it:

- combines sensing + networking + logging
    
- requires interaction design
    
- forces button logic
    
- exposes radio limitations
    
- creates a _reason_ to use microcontrollers
    
- is clearly **not just checking your laptop**
    

That’s basically Tom saying:  
👉 _This is the strongest project direction._

---

## 12. What this project really is (reframed)

Not:

- “visualizing Wi-Fi”
    

But:

### **Designing a tool for sensing invisible infrastructure**

You’re designing:

- intention
    
- trust
    
- verification
    
- embodied measurement
    
- slow technology
    

That’s _very_ you.

---

## 13. If you want a one-sentence project framing

You can use this in class / office hours:

> _“I’m designing a human-in-the-loop Wi-Fi surveyor’s tool that lets people intentionally measure, log, and reflect on invisible network infrastructure in physical space.”_

That sentence will land.