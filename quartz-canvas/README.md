# Obsidian Canvas for Quartz

Makes `![[Some Canvas.canvas]]` in any note render as an interactive canvas
(pan, zoom, full screen, notes/images shown inside their cards, click a note to open it).

## Install
Copy these files into the root of the `itpblog` repo (same paths), then commit & push:

- quartz/plugins/transformers/canvas.ts        (new)
- quartz/components/scripts/canvas.inline.ts   (new)
- quartz/components/styles/canvas.inline.scss  (new)
- quartz/plugins/transformers/index.ts         (adds one export line)
- quartz.config.ts                             (adds `Plugin.Canvas()` before ObsidianFlavoredMarkdown)

Or from the repo root: `git apply obsidian-canvas.patch`

## Use
- `![[Mind Map 1.canvas]]`        → embed, 70% of screen height
- `![[Mind Map 1.canvas|900]]`    → embed, 900px tall

Controls: drag to move · ⌘/Ctrl + scroll (or pinch) to zoom · click once inside and
plain scrolling pans · buttons for zoom / fit / full screen · keys + − 0 and arrows.
Cards for notes that aren't published show as grey placeholders.
