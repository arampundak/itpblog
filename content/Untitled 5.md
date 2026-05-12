### Screen Layout

```
┌──────────────────────────────────┐
│ ABC    042         0:47          │  name (cyan), score (yellow), timer (red)
├──────────────────────────────────┤
│                                  │
│         Add an event             │  current task (large yellow text)
│                                  │
├──────────────────────────────────┤
│  ┌───────┐      ┌───────┐       │
│  │  GET  │      │ POST  │       │  verb boxes: GET=blue, POST=green,
│  └───────┘      └───────┘       │  PUT=orange, DELETE=red
│         🧍                       │  player sprite (joystick-controlled)
│  ┌───────┐      ┌───────┐       │
│  │  PUT  │      │  DEL  │       │
│  └───────┘      └───────┘       │
├──────────────────────────────────┤
│ POST 201 ✓ +3                   │  last response: verb, status, result
└──────────────────────────────────┘
```

The sprite has a 2-frame walk animation and snaps to the nearest verb box based on its position. During the tutorial, the boxes light up one at a time as you progress through them. The score does a quick green/red flash when it changes.