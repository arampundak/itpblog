import { QuartzTransformerPlugin } from "../types"
import { findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { Root } from "mdast"
import fs from "fs"
import path from "path"
import {
  FilePath,
  FullSlug,
  joinSegments,
  pathToRoot,
  resolveRelative,
  slugifyFilePath,
} from "../../util/path"
import { BuildCtx } from "../../util/ctx"
// @ts-ignore
import canvasScript from "../../components/scripts/canvas.inline"
import canvasStyle from "../../components/styles/canvas.inline.scss"

/**
 * Obsidian Canvas support.
 *
 * Turns `![[Some Canvas.canvas]]` (optionally `![[Some Canvas.canvas|600]]` for a
 * height in px) into an interactive, pannable/zoomable view of the canvas, much
 * like Obsidian draws it. The .canvas JSON is read at build time, every link in it
 * is resolved to a real page on the site, and the result is shipped inline so no
 * extra request is needed. Notes placed on the canvas are fetched lazily in the
 * browser and shown inside their cards, the way Obsidian does.
 *
 * Must be listed BEFORE ObsidianFlavoredMarkdown in quartz.config.ts.
 */

const canvasEmbedRegex = /!\[\[([^\[\]|#]+?\.canvas)(?:\|([^\[\]]*))?\]\]/g
const imageExts = [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".svg", ".webp", ".avif"]
const videoExts = [".mp4", ".webm", ".ogv", ".mov"]

type RawNode = {
  id: string
  type: "text" | "file" | "link" | "group"
  x: number
  y: number
  width: number
  height: number
  color?: string
  text?: string
  file?: string
  subpath?: string
  url?: string
  label?: string
}

type RawEdge = {
  id: string
  fromNode: string
  toNode: string
  fromSide?: string
  toSide?: string
  fromEnd?: string
  toEnd?: string
  color?: string
  label?: string
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

function makeResolver(ctx: BuildCtx, current: FullSlug) {
  const slugs = ctx.allSlugs

  // exact vault path first, then Obsidian's "shortest unique name" fallback
  return (target: string): string | null => {
    let fp = target.trim()
    if (!path.extname(fp)) fp += ".md"
    const slug = slugifyFilePath(fp as FilePath)
    if (slugs.includes(slug)) return resolveRelative(current, slug)
    const name = slug.split("/").at(-1)
    const matches = slugs.filter((s) => s.split("/").at(-1) === name)
    if (matches.length > 0) return resolveRelative(current, matches[0])
    return null
  }
}

// Small, safe markdown renderer for text cards (headings, emphasis, lists, links).
function renderMarkdown(src: string, resolve: (t: string) => string | null): string {
  const inline = (line: string) => {
    let s = escapeHtml(line)
    // wikilink embeds of images
    s = s.replace(/!\[\[([^\]|]+?)(?:\|([^\]]*))?\]\]/g, (_m, target: string) => {
      const url = resolve(target)
      return url && imageExts.includes(path.extname(target).toLowerCase())
        ? `<img src="${url}" alt="">`
        : escapeHtml(target)
    })
    // wikilinks
    s = s.replace(/\[\[([^\]|#]+?)(#[^\]|]*)?(?:\|([^\]]*))?\]\]/g, (_m, target, anchor, alias) => {
      const url = resolve(target)
      const text = alias ?? target
      return url ? `<a class="internal" href="${url}${anchor ?? ""}">${text}</a>` : text
    })
    // markdown links / images
    s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img src="$2" alt="$1">')
    s = s.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a class="external" href="$2">$1</a>')
    s = s.replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, '$1<a class="external" href="$2">$2</a>')
    s = s.replace(/`([^`]+)`/g, "<code>$1</code>")
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    s = s.replace(/__([^_]+)__/g, "<strong>$1</strong>")
    s = s.replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>")
    s = s.replace(/==([^=]+)==/g, "<mark>$1</mark>")
    s = s.replace(/~~([^~]+)~~/g, "<del>$1</del>")
    return s
  }

  const out: string[] = []
  let list: "ul" | "ol" | null = null
  let para: string[] = []
  const flushPara = () => {
    if (para.length) out.push(`<p>${para.join("<br>")}</p>`)
    para = []
  }
  const closeList = () => {
    if (list) out.push(`</${list}>`)
    list = null
  }

  for (const raw of src.replace(/\r/g, "").split("\n")) {
    const line = raw.trimEnd()
    let m: RegExpMatchArray | null
    if (line.trim() === "") {
      flushPara()
      closeList()
    } else if ((m = line.match(/^(#{1,6})\s+(.*)$/))) {
      flushPara()
      closeList()
      out.push(`<h${m[1].length}>${inline(m[2])}</h${m[1].length}>`)
    } else if ((m = line.match(/^\s*[-*+]\s+(?:\[( |x)\]\s+)?(.*)$/))) {
      flushPara()
      if (list !== "ul") {
        closeList()
        out.push("<ul>")
        list = "ul"
      }
      const box =
        m[1] === undefined
          ? ""
          : `<input type="checkbox" disabled${m[1] === "x" ? " checked" : ""}> `
      out.push(`<li>${box}${inline(m[2])}</li>`)
    } else if ((m = line.match(/^\s*\d+[.)]\s+(.*)$/))) {
      flushPara()
      if (list !== "ol") {
        closeList()
        out.push("<ol>")
        list = "ol"
      }
      out.push(`<li>${inline(m[1])}</li>`)
    } else if ((m = line.match(/^>\s?(.*)$/))) {
      flushPara()
      closeList()
      out.push(`<blockquote>${inline(m[1])}</blockquote>`)
    } else if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      flushPara()
      closeList()
      out.push("<hr>")
    } else {
      closeList()
      para.push(inline(line))
    }
  }
  flushPara()
  closeList()
  return out.join("")
}

function findCanvasFile(ctx: BuildCtx, name: string): string | null {
  const wanted = name.trim().replace(/^\/+/, "")
  const files = ctx.allFiles as string[]
  if (files.includes(wanted)) return wanted
  const base = path.basename(wanted)
  return files.find((f) => path.basename(f) === base) ?? null
}

function buildCanvasData(ctx: BuildCtx, canvasFp: string, current: FullSlug) {
  const raw = JSON.parse(fs.readFileSync(joinSegments(ctx.argv.directory, canvasFp), "utf8"))
  const resolve = makeResolver(ctx, current)

  const nodes = ((raw.nodes ?? []) as RawNode[]).map((n) => {
    const base = {
      id: n.id,
      type: n.type,
      x: n.x,
      y: n.y,
      w: n.width,
      h: n.height,
      color: n.color,
    }
    switch (n.type) {
      case "text":
        return { ...base, html: renderMarkdown(n.text ?? "", resolve) }
      case "group":
        return { ...base, label: n.label ?? "" }
      case "link":
        return { ...base, url: n.url }
      case "file": {
        const file = n.file ?? ""
        const ext = path.extname(file).toLowerCase()
        const kind = imageExts.includes(ext)
          ? "image"
          : videoExts.includes(ext)
            ? "video"
            : ext === ".md" || ext === ""
              ? "note"
              : ext === ".pdf"
                ? "pdf"
                : "other"
        const title = path.basename(file, ext)
        return { ...base, kind, title, href: resolve(file), subpath: n.subpath ?? "" }
      }
      default:
        return base
    }
  })

  const edges = ((raw.edges ?? []) as RawEdge[]).map((e) => ({
    id: e.id,
    from: e.fromNode,
    to: e.toNode,
    fromSide: e.fromSide,
    toSide: e.toSide,
    fromEnd: e.fromEnd ?? "none",
    toEnd: e.toEnd ?? "arrow",
    color: e.color,
    label: e.label,
  }))

  return { nodes, edges }
}

export const Canvas: QuartzTransformerPlugin = () => {
  return {
    name: "Canvas",
    markdownPlugins(ctx) {
      return [
        () => (tree: Root, file) => {
          const current = file.data.slug as FullSlug
          mdastFindReplace(tree, [
            [
              canvasEmbedRegex,
              (_value: string, target: string, alias?: string) => {
                const canvasFp = findCanvasFile(ctx, target)
                if (!canvasFp) {
                  return {
                    type: "html",
                    value: `<div class="canvas-embed canvas-missing">Canvas not found: ${escapeHtml(target)}</div>`,
                  }
                }
                let data
                try {
                  data = buildCanvasData(ctx, canvasFp, current)
                } catch (err) {
                  console.warn(`[Canvas] could not read ${canvasFp}: ${err}`)
                  return {
                    type: "html",
                    value: `<div class="canvas-embed canvas-missing">Could not read ${escapeHtml(target)}</div>`,
                  }
                }
                const height = alias && /^\d+$/.test(alias.trim()) ? alias.trim() : ""
                const title = path.basename(canvasFp, ".canvas")
                const rawUrl = resolveRelative(current, slugifyFilePath(canvasFp as FilePath))
                return {
                  type: "html",
                  value:
                    `<div class="canvas-embed" data-title="${escapeHtml(title)}"` +
                    ` data-root="${pathToRoot(current)}" data-raw="${rawUrl}"` +
                    (height ? ` style="--canvas-height:${height}px"` : "") +
                    ` data-canvas="${escapeHtml(JSON.stringify(data))}"></div>`,
                }
              },
            ],
          ])
        },
      ]
    },
    externalResources() {
      return {
        js: [{ script: canvasScript, loadTime: "afterDOMReady", contentType: "inline" }],
        css: [{ content: canvasStyle, inline: true }],
      }
    },
  }
}
