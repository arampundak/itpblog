import { normalizeRelativeURLs } from "../../util/path"
import { fetchCanonical } from "./util"

// Renders the Obsidian canvases embedded by the Canvas transformer.
// Drag to pan · ⌘/Ctrl + scroll or pinch to zoom · click a note card to open it.

type CNode = {
  id: string
  type: "text" | "file" | "link" | "group"
  x: number
  y: number
  w: number
  h: number
  color?: string
  html?: string
  label?: string
  url?: string
  kind?: "note" | "image" | "video" | "pdf" | "other"
  title?: string
  href?: string | null
  subpath?: string
}
type CEdge = {
  id: string
  from: string
  to: string
  fromSide?: string
  toSide?: string
  fromEnd: string
  toEnd: string
  color?: string
  label?: string
}

// Obsidian's six preset colours
const PRESETS: Record<string, string> = {
  "1": "#fb464c",
  "2": "#e9973f",
  "3": "#e0de71",
  "4": "#44cf6e",
  "5": "#53dfdd",
  "6": "#a882ff",
}
const colorOf = (c?: string) => (c ? (PRESETS[c] ?? c) : undefined)

const SVGNS = "http://www.w3.org/2000/svg"
const MIN_ZOOM = 0.05
const MAX_ZOOM = 2.5
const PAD = 60
const parser = new DOMParser()
const noteCache = new Map<string, Promise<string | null>>()

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, parent?: Element) {
  const node = document.createElement(tag)
  if (cls) node.className = cls
  if (parent) parent.appendChild(node)
  return node
}

function anchor(n: CNode, side: string | undefined, other: CNode): [number, number, string] {
  if (!side) {
    // pick the side facing the other node
    const dx = other.x + other.w / 2 - (n.x + n.w / 2)
    const dy = other.y + other.h / 2 - (n.y + n.h / 2)
    side = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : dy > 0 ? "bottom" : "top"
  }
  switch (side) {
    case "top":
      return [n.x + n.w / 2, n.y, side]
    case "bottom":
      return [n.x + n.w / 2, n.y + n.h, side]
    case "left":
      return [n.x, n.y + n.h / 2, side]
    default:
      return [n.x + n.w, n.y + n.h / 2, "right"]
  }
}

function push([x, y]: [number, number], side: string, d: number): [number, number] {
  switch (side) {
    case "top":
      return [x, y - d]
    case "bottom":
      return [x, y + d]
    case "left":
      return [x - d, y]
    default:
      return [x + d, y]
  }
}

function arrowHead(tip: [number, number], from: [number, number], color: string) {
  const ang = Math.atan2(tip[1] - from[1], tip[0] - from[0])
  const L = 14
  const W = 6.5
  const bx = tip[0] - L * Math.cos(ang)
  const by = tip[1] - L * Math.sin(ang)
  const p = document.createElementNS(SVGNS, "polygon")
  p.setAttribute(
    "points",
    [
      tip,
      [bx + W * Math.sin(ang), by - W * Math.cos(ang)],
      [bx - W * Math.sin(ang), by + W * Math.cos(ang)],
    ]
      .map((pt) => pt.join(","))
      .join(" "),
  )
  p.setAttribute("fill", color)
  return p
}

async function loadNote(url: URL): Promise<string | null> {
  const key = url.toString()
  if (!noteCache.has(key)) {
    noteCache.set(
      key,
      (async () => {
        const res = await fetchCanonical(url).catch(() => null)
        if (!res || !res.ok) return null
        const doc = parser.parseFromString(await res.text(), "text/html")
        normalizeRelativeURLs(doc, url)
        const hints = [...doc.getElementsByClassName("popover-hint")]
        if (hints.length === 0) return null
        return hints.map((h) => h.innerHTML).join("")
      })(),
    )
  }
  return noteCache.get(key)!
}

function renderNode(n: CNode, world: HTMLElement, lazy: IntersectionObserver) {
  const color = colorOf(n.color)
  const card = el("div", `cv-node cv-${n.type}${n.kind ? " cv-" + n.kind : ""}`, world)
  card.style.left = `${n.x}px`
  card.style.top = `${n.y}px`
  card.style.width = `${n.w}px`
  card.style.height = `${n.h}px`
  if (color) {
    card.style.setProperty("--cv-color", color)
    card.classList.add("cv-colored")
  }

  if (n.type === "group") {
    if (n.label) el("div", "cv-group-label", card).textContent = n.label
    return card
  }

  if (n.type === "text") {
    const body = el("div", "cv-body", card)
    body.innerHTML = n.html ?? ""
    return card
  }

  if (n.type === "link") {
    const a = el("a", "cv-body cv-linkcard external", card)
    a.href = n.url ?? "#"
    a.target = "_blank"
    a.rel = "noopener"
    a.textContent = n.url ?? ""
    return card
  }

  // file nodes
  const label = el("div", "cv-file-label", card)
  label.textContent = n.title ?? ""
  if (!n.href) {
    card.classList.add("cv-unpublished")
    el("div", "cv-body cv-placeholder", card).textContent = n.title ?? ""
    return card
  }
  const href = n.href + (n.subpath ?? "")
  if (n.kind === "image") {
    const img = el("img", "cv-img", card)
    img.loading = "lazy"
    img.src = href
    img.alt = n.title ?? ""
  } else if (n.kind === "video") {
    const v = el("video", "cv-img", card)
    v.src = href
    v.controls = true
  } else if (n.kind === "note") {
    const body = el("div", "cv-body cv-note-body", card)
    const a = el("a", "internal cv-note-title", body)
    a.href = href
    a.dataset.noPopover = "true"
    a.textContent = n.title ?? ""
    card.dataset.href = href
    lazy.observe(card)
  } else {
    const a = el("a", "cv-body cv-linkcard internal", card)
    a.href = href
    a.textContent = n.title ?? ""
  }
  return card
}

function setup(host: HTMLElement) {
  if (host.dataset.ready) return
  host.dataset.ready = "1"
  const { nodes, edges } = JSON.parse(host.dataset.canvas ?? "{}") as {
    nodes: CNode[]
    edges: CEdge[]
  }
  if (!nodes || nodes.length === 0) {
    host.textContent = "Empty canvas"
    return
  }

  const byId = new Map(nodes.map((n) => [n.id, n]))
  const minX = Math.min(...nodes.map((n) => n.x)) - PAD
  const minY = Math.min(...nodes.map((n) => n.y)) - PAD
  const maxX = Math.max(...nodes.map((n) => n.x + n.w)) + PAD
  const maxY = Math.max(...nodes.map((n) => n.y + n.h)) + PAD

  // --- chrome -----------------------------------------------------------------
  const viewport = el("div", "cv-viewport", host)
  viewport.tabIndex = 0
  viewport.setAttribute("role", "application")
  viewport.setAttribute("aria-label", `Canvas: ${host.dataset.title ?? ""}`)
  const world = el("div", "cv-world", viewport)

  const bar = el("div", "cv-toolbar", host)
  const hint = el("span", "cv-hint", bar)
  hint.textContent = "Drag to move · ⌘/Ctrl + scroll to zoom"
  const mkBtn = (txt: string, title: string) => {
    const b = el("button", "cv-btn", bar)
    b.type = "button"
    b.textContent = txt
    b.title = title
    b.setAttribute("aria-label", title)
    return b
  }
  const zoomOut = mkBtn("−", "Zoom out")
  const zoomIn = mkBtn("+", "Zoom in")
  const fitBtn = mkBtn("⤢", "Fit to screen")
  const fullBtn = mkBtn("⛶", "Full screen")

  // --- groups first (so they sit underneath), then edges, then cards ----------
  const svg = document.createElementNS(SVGNS, "svg")
  svg.classList.add("cv-edges")
  svg.setAttribute("width", String(maxX - minX))
  svg.setAttribute("height", String(maxY - minY))
  svg.setAttribute("viewBox", `${minX} ${minY} ${maxX - minX} ${maxY - minY}`)
  svg.style.left = `${minX}px`
  svg.style.top = `${minY}px`

  const lazy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const card = entry.target as HTMLElement
        lazy.unobserve(card)
        const url = new URL(card.dataset.href!, window.location.href)
        loadNote(url).then((html) => {
          if (!html) return
          const body = card.querySelector(".cv-note-body") as HTMLElement
          body.innerHTML = html
          body.querySelectorAll("a").forEach((a) => (a.dataset.noPopover = "true"))
          // headings get ids in Quartz; drop them so they don't clash with the page
          body.querySelectorAll("[id]").forEach((e) => e.removeAttribute("id"))
        })
      }
    },
    { root: viewport, rootMargin: "200px" },
  )

  const groups = nodes.filter((n) => n.type === "group")
  const others = nodes.filter((n) => n.type !== "group")
  groups.sort((a, b) => b.w * b.h - a.w * a.h).forEach((n) => renderNode(n, world, lazy))
  world.appendChild(svg)
  others.forEach((n) => renderNode(n, world, lazy))

  for (const e of edges) {
    const a = byId.get(e.from)
    const b = byId.get(e.to)
    if (!a || !b) continue
    const color = colorOf(e.color) ?? "var(--cv-edge)"
    const [x1, y1, s1] = anchor(a, e.fromSide, b)
    const [x2, y2, s2] = anchor(b, e.toSide, a)
    const dist = Math.hypot(x2 - x1, y2 - y1)
    const k = Math.min(Math.max(dist * 0.5, 40), 250)
    const c1 = push([x1, y1], s1, k)
    const c2 = push([x2, y2], s2, k)
    const path = document.createElementNS(SVGNS, "path")
    path.setAttribute("d", `M${x1},${y1} C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${x2},${y2}`)
    path.setAttribute("stroke", color)
    svg.appendChild(path)
    if (e.toEnd === "arrow") svg.appendChild(arrowHead([x2, y2], c2, color))
    if (e.fromEnd === "arrow") svg.appendChild(arrowHead([x1, y1], c1, color))
    if (e.label) {
      // midpoint of the cubic
      const mx = (x1 + 3 * c1[0] + 3 * c2[0] + x2) / 8
      const my = (y1 + 3 * c1[1] + 3 * c2[1] + y2) / 8
      const lab = el("div", "cv-edge-label", world)
      lab.textContent = e.label
      lab.style.left = `${mx}px`
      lab.style.top = `${my}px`
    }
  }

  // --- camera -----------------------------------------------------------------
  let scale = 1
  let tx = 0
  let ty = 0
  const apply = () => {
    world.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`
    host.style.setProperty("--cv-scale", String(scale))
  }
  const fit = () => {
    const r = viewport.getBoundingClientRect()
    if (r.width === 0) return
    scale = Math.min(r.width / (maxX - minX), r.height / (maxY - minY), 1)
    tx = (r.width - (maxX - minX) * scale) / 2 - minX * scale
    ty = (r.height - (maxY - minY) * scale) / 2 - minY * scale
    apply()
  }
  const zoomAt = (factor: number, cx: number, cy: number) => {
    const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, scale * factor))
    const f = next / scale
    tx = cx - (cx - tx) * f
    ty = cy - (cy - ty) * f
    scale = next
    apply()
  }
  const centerZoom = (factor: number) => {
    const r = viewport.getBoundingClientRect()
    zoomAt(factor, r.width / 2, r.height / 2)
  }

  // --- input ------------------------------------------------------------------
  const pointers = new Map<number, { x: number; y: number }>()
  let moved = 0
  let pinchDist = 0
  let active = false // after the first click, plain scrolling pans the canvas
  const setActive = (v: boolean) => {
    active = v
    host.classList.toggle("cv-active", v)
  }

  const onDown = (ev: PointerEvent) => {
    if ((ev.target as HTMLElement).closest("video, input")) return
    setActive(true)
    pointers.set(ev.pointerId, { x: ev.clientX, y: ev.clientY })
    moved = 0
    if (pointers.size === 2) {
      const [p, q] = [...pointers.values()]
      pinchDist = Math.hypot(p.x - q.x, p.y - q.y)
    }
    viewport.classList.add("cv-grabbing")
  }
  const onMove = (ev: PointerEvent) => {
    const prev = pointers.get(ev.pointerId)
    if (!prev) return
    // only capture once we know it is a drag, so clicks on links still work
    if (!viewport.hasPointerCapture(ev.pointerId)) viewport.setPointerCapture(ev.pointerId)
    const cur = { x: ev.clientX, y: ev.clientY }
    if (pointers.size === 1) {
      tx += cur.x - prev.x
      ty += cur.y - prev.y
      moved += Math.abs(cur.x - prev.x) + Math.abs(cur.y - prev.y)
      apply()
    }
    pointers.set(ev.pointerId, cur)
    if (pointers.size === 2) {
      const [p, q] = [...pointers.values()]
      const d = Math.hypot(p.x - q.x, p.y - q.y)
      const r = viewport.getBoundingClientRect()
      if (pinchDist > 0) zoomAt(d / pinchDist, (p.x + q.x) / 2 - r.left, (p.y + q.y) / 2 - r.top)
      pinchDist = d
      moved += 10
    }
  }
  const onUp = (ev: PointerEvent) => {
    pointers.delete(ev.pointerId)
    if (pointers.size < 2) pinchDist = 0
    if (pointers.size === 0) viewport.classList.remove("cv-grabbing")
  }
  const onClick = (ev: MouseEvent) => {
    // a drag is not a click
    if (moved > 6) {
      ev.preventDefault()
      ev.stopPropagation()
      return
    }
    const target = ev.target as HTMLElement
    if (target.closest("a")) return
    const card = target.closest(".cv-note") as HTMLElement | null
    if (card?.dataset.href) {
      const url = new URL(card.dataset.href, window.location.href)
      if (document.fullscreenElement) document.exitFullscreen()
      window.spaNavigate ? window.spaNavigate(url) : (window.location.href = url.toString())
    }
  }
  const onWheel = (ev: WheelEvent) => {
    const zooming = ev.ctrlKey || ev.metaKey
    if (!zooming && !active && !document.fullscreenElement) return // let the page scroll
    ev.preventDefault()
    const r = viewport.getBoundingClientRect()
    if (zooming) {
      // mouse wheels send big steps, trackpad pinches small ones: clamp so both feel right
      const d = Math.max(-40, Math.min(40, ev.deltaY))
      zoomAt(Math.exp(-d * 0.008), ev.clientX - r.left, ev.clientY - r.top)
    } else {
      tx -= ev.deltaX
      ty -= ev.deltaY
      apply()
    }
  }
  const onDocDown = (ev: PointerEvent) => {
    if (!host.contains(ev.target as Node)) setActive(false)
  }
  const onKey = (ev: KeyboardEvent) => {
    const step = 60
    if (ev.key === "+" || ev.key === "=") centerZoom(1.25)
    else if (ev.key === "-") centerZoom(0.8)
    else if (ev.key === "0") fit()
    else if (ev.key === "ArrowLeft") tx += step
    else if (ev.key === "ArrowRight") tx -= step
    else if (ev.key === "ArrowUp") ty += step
    else if (ev.key === "ArrowDown") ty -= step
    else return
    ev.preventDefault()
    apply()
  }
  const onZoomIn = () => centerZoom(1.25)
  const onZoomOut = () => centerZoom(0.8)
  const onFull = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    else host.requestFullscreen?.()
  }
  const onFsChange = () => {
    host.classList.toggle("cv-fullscreen", document.fullscreenElement === host)
    requestAnimationFrame(fit)
  }

  viewport.addEventListener("pointerdown", onDown)
  viewport.addEventListener("pointermove", onMove)
  viewport.addEventListener("pointerup", onUp)
  viewport.addEventListener("pointercancel", onUp)
  viewport.addEventListener("click", onClick, true)
  viewport.addEventListener("wheel", onWheel, { passive: false })
  viewport.addEventListener("keydown", onKey)
  document.addEventListener("pointerdown", onDocDown)
  zoomIn.addEventListener("click", onZoomIn)
  zoomOut.addEventListener("click", onZoomOut)
  fitBtn.addEventListener("click", fit)
  fullBtn.addEventListener("click", onFull)
  document.addEventListener("fullscreenchange", onFsChange)
  const ro = new ResizeObserver(() => fit())
  ro.observe(viewport)
  fit()

  window.addCleanup(() => {
    document.removeEventListener("pointerdown", onDocDown)
    document.removeEventListener("fullscreenchange", onFsChange)
    ro.disconnect()
    lazy.disconnect()
  })
}

document.addEventListener("nav", () => {
  document.querySelectorAll<HTMLElement>(".canvas-embed[data-canvas]").forEach(setup)
})
