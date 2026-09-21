# references/

Research corpus: saved social posts and academic papers, used as a
personal database for robotics/HRI/design research.

## Layout
- `clippings/` — one .md per saved LinkedIn/X post. 158 files.
- `papers/`    — one .md literature note per research paper.
- `attachments/` — PDFs, screenshots. Not read by default.
- `index.md`   — one row per clipping. READ THIS FIRST for any
                 corpus-wide question. Only open individual files
                 the index points at.
- `taxonomy.md` — the fixed tag vocabulary. Never invent tags
                 outside this list.

## Conventions
- Frontmatter `tags:` must come from taxonomy.md only.
- `## Why I saved it` is written by Aram, never by Claude.
- `## Gist` is one sentence, Claude-written.
- `draft: true` on everything — these must never publish to Quartz.
- `date_precision: approx` means the date is inferred from a
  relative timestamp, accurate to roughly a month.
- `capture_status: partial` means the text is known incomplete.

## Do not
- Publish, commit, or move these files without being asked.
- Rewrite `## Full text` — it is the source record, verbatim.
