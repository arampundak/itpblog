160226
Fabri and I set to work. 
Next episode [[The Future-BOT Podcast - 3]]

![[robot - the future bot 1.mp4]]

I had a few days of CAD work to integrate motors to animate the microphones. Mike A has a solenoid to move its head up & down like Southpark Canadians do, Mike B has a servo to open its mouth on a hinge axis.
![[robot cad 3.webp]]

![[robot cad 6.webp]]


150226

Solenoid Mike 
- Followed the schematic below to wire up the solenoid (requires 6V and 2A) 
- Excluded the potentiometer 
- Necessary in order to provide external power to the solenoid 
- Used simple test code (switched transistor pin from 9 to 2)
![[robot 150226.webp]]

Solenoid issues 
- Transistor
- The circuit initially was not functioning because the drain and base were accidentally switched
- Attempted to switch from pin 9 to 2 just for ease of placement (2 is next to ground)
Electricity input problem 
- Aram’s adjustable adapter was initially used but we later found out that it was not supplying the correct Voltage (BUY NEW AC ADAPTER)
- Bench power supply 
- Better more consistent output 
- Had to make sure to allow more current to pass through so it could reach the correct voltage (6v+)
- Giving the solenoid more voltage = hotter over time 
Solenoid strength 
- Initially solenoid was not powerful enough to lift the cap of the mic as well as itself against gravity 
- Removed the spring on the bottom (was working against the solenoid activating) 
- Added a new spring on the opposite side (pushing the solenoid up into active mode slightly) 
- Helped bring the rod closer to the electromagnet coil 
- Allowed the solenoid to push the cap up
Custom 3d printed parts 
- Implants made for mic 
- To hold solenoid 
- To hold servo 
- Adjusted parts to fit correctly (CHANGE FOR REAL FIT)
- Both sets of custom parts needed slight adjustments (made by aram manually) 
- Fillet wrong on the rectangular top mic 
- 3d printed shaft for attachment on solenoid needed shortening because of added spring (to help solenoid move)
Serial communication to Arduino 
- Test code - C
```
const int transistorPin = 2;    
// connected to the base of the transistor
  
void setup() { 
// set  the transistor pin as output: 
pinMode(transistorPin, OUTPUT);
}
  
void loop() {
digitalWrite(transistorPin, HIGH);
delay(150);
digitalWrite(transistorPin, LOW); 
delay(150);
  }
**
```
**Finalized code for moving up and down ONLY when audio is being played (voice of AI agent)**
- Used a state flag to represent when the ai is speaking (0 not speaking 1 speaking)
- Used tState flag to represent when transistor should be open or closed (for movement of mouth up and down within time of state flag being 1)

```
int MOTOR_PIN = 2;
int LED_PIN = 13;
int TRANSISTOR_PIN = 2;
// int pstate;
int state = 0;
bool tState = LOW;
// the following variables are unsigned longs because the time, measured in
// milliseconds, will quickly become a bigger number than can be stored in an int.   
unsigned long lastToggleTime = 0;  
// the last time the output pin was toggled
unsigned long toggleInterval = 150;    
// the debounce time; increase if the output flickers

void setup() {
// put your setup code here, to run once:
pinMode(2, OUTPUT);
pinMode(LED_BUILTIN, OUTPUT);
pinMode(TRANSISTOR_PIN, OUTPUT);
digitalWrite(TRANSISTOR_PIN, LOW);
}

void loop() {
if (state == 1) {
unsigned long currentTime = millis();
if (currentTime - lastToggleTime >= toggleInterval) {
lastToggleTime = currentTime;
tState = !tState;
digitalWrite(TRANSISTOR_PIN, tState);
digitalWrite(LED_BUILTIN, tState);
}
}

if (Serial.available() > 0) {
String command = Serial.readStringUntil('\n');
if (command == "START") {
// Start motor movement
// digitalWrite(MOTOR_PIN, HIGH);
// digitalWrite(TRANSISTOR_PIN, HIGH);
state = 1;
}
else if (command == "STOP") {
// Stop motor movement
// digitalWrite(MOTOR_PIN, LOW);
digitalWrite(LED_BUILTIN, LOW);
// digitalWrite(TRANSISTOR_PIN, LOW);
state = 0;
digitalWrite(TRANSISTOR_PIN, LOW);
}
}
}

```

==Eleven Labs==
Created api access key for eleven labs
- Created custom voice
- Podcaster type 
- Had Chat gpt create the prompt: 
**
Voice style: modern podcast host, confident and conversational, casual but articulate. Sounds like a popular long-form podcast interviewer speaking naturally into a high-quality studio microphone.

Tone: relaxed, friendly, and slightly enthusiastic. Speaks as if talking to a friend rather than performing. Natural charisma without sounding like an announcer.

Delivery:
- Medium-low conversational pitch
- Clear diction but not overly polished
- Slight vocal smile
- Occasional natural pauses and breaths
- Subtle improvisational rhythm, as if thinking while speaking
- Uses light emphasis on key words for storytelling
- Slight upward inflection when asking rhetorical questions

Pacing:
- Moderate tempo (not fast radio energy)
- Comfortable pauses between ideas
- Feels spontaneous and unscripted

Personality cues:
- Curious, curious-host energy
- Calm confidence
- Friendly humor and mild sarcasm
- Sounds experienced behind a microphone
- Engaging but not overly dramatic

Audio feel:
- Close-mic intimacy
- Warm, clean studio sound
- Minimal theatricality — grounded and authentic
- Designed for tech, culture, or creative interview podcasts

Avoid:
- News anchor tone
- Overacting
- Commercial voice energy
- Excess hype or shouting
**

Python (Codebase [https://github.com/FabriGu?tab=repositories](https://github.com/FabriGu?tab=repositories))
1. Microphone → captures speech
2. Ended up using sounddevice python library (instead of pyaudio)
3. Whisper (STT) → transcribes to text
4. Using huggingface openAi whisper tiny 
5. School's GPU (Ollama) → generates AI response 
6. [http://itp-ml.itp.tsoa.nyu.edu/](http://itp-ml.itp.tsoa.nyu.edu/)
7. [http://itp-ml.itp.tsoa.nyu.edu:11434/](http://itp-ml.itp.tsoa.nyu.edu:11434/) 
8. Ollama endpoint for school gpu 
9. Eleven Labs (TTS) → synthesizes voice
10. Microcontroller → moves mic mouth during speech


