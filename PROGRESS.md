# Portfolio Project — Progress & Context

This file is the continuity doc for this project. Read it fully at the start of any new
session before doing anything else — it has the plan, what's done, what's blocked, and
what to do next. Update it (the relevant milestone section + "Current Status") every time
a milestone or meaningful chunk of work completes.

## Who / what this is

Koppesh P — 4th-year CSE (AI & ML) student at VIT Chennai — wants a standout portfolio
site for internship/job applications: a cinematic scroll-driven hero video (generated from
a reference photo of him at his desk) that zooms from "person looking at camera" into his
desktop monitor, which then transforms into a fully interactive **macOS-style desktop UI**
where each dock app is a resume section (Education, Experience, Projects, Skills,
Certifications, Contact, Resume).

Project directory: `D:\College\PROJECTS\Portfolio` (Next.js app lives at repo root).
Full original plan (architecture rationale, build order) is preserved at
`C:\Users\koppe\.claude\plans\i-wanna-build-a-fizzy-rain.md` on this machine — this
PROGRESS.md is the portable, project-local version of that plan plus live status.

## Current Status (update this section every session)

**Last updated:** 2026-08-15
**Milestones done:** 1, 2 of 7 as originally scoped. Milestones 3/4 (the scroll-scrubbed
hero video pipeline) were **superseded and removed** this session — see Milestone 5
round 6 below; the site's entry sequence is now intro → lock screen (auto-unlocking as of
round 9) → desktop. Milestone 5 in progress — nine rounds of
feedback-driven polish done: (round 1) hero overlay text, boot transition, Matrix
wallpaper; (round 2) bidirectional hero↔desktop scroll (a first bug fix attempt — turned
out incomplete, see round 4), glassmorphism window styling, Skills terminal typewriter;
(round 3) new `IntroSection` landing page before the video (name/tagline/scroll-cue,
OMEN-style Roboto Condensed); (round 4) the **actual** fix for the scroll-reverse bug
(GSAP auto-refresh resetting scroll position — round 2's fix was necessary but not
sufficient) + a real `StarfieldBackground` canvas component replacing `IntroSection`'s
placeholder background; (round 5) **replaced** the Matrix-rain desktop wallpaper with an
original macOS-aurora-style gradient wallpaper (`DesktopWallpaper.tsx`) + added a desktop
widget stack (clock, calendar, weather — `components/desktop/widgets/`); (round 6, this
session) — see below — real macOS wallpaper photo, desktop icons, a real menu bar
(Apple menu dropdown, Control Center, Spotlight search), the dock apps rebuilt as a
**tiling window manager** (puzzle/frame layout, replacing free-floating windows), and the
entire scroll-scrubbed hero video pipeline **deleted** and replaced with a macOS-style
lock screen. Round 4's GSAP auto-refresh gotcha and the whole hero↔desktop scroll dance
it applied to are now moot — there is no more GSAP, no more scroll-scrub, no more
`HeroCanvas`/`HeroExperience`/`IntroSection` in the codebase. Don't go looking for those
files or try to reapply the round-4 fix; read round 6 below instead.
**Next action when resuming:** rounds 6 and 7 (both 2026-08-15) shipped a lot of code —
wallpaper swap, desktop icons (now all 8 apps, round 7), menu bar/Control Center/
Spotlight, the tiling window manager rewrite, the lock-screen replacement, round 7's
rebuilt scroll-triggered `IntroSection`, and round 8's bug fixes (desktop icons were
silently unclickable — see below, a real bug, not a misunderstanding) plus a second
wallpaper swap (real photo → cursor-reactive starfield with the name/description baked
in). All verified via `tsc`/`lint`/production `build` (clean every time, across every
round) but **still not visually verified in a real browser**: the claude-in-chrome
extension would not connect **four separate attempts** across rounds 6, 7, and 8
(`tabs_context_mcp` returned "not connected" every single time — restarting Chrome may
fix it, per the tool's own guidance, not yet tried since Claude Code itself can't restart
the user's Chrome). First thing next session: get the browser tool working (or have the
user check manually) and actually click through intro → scroll/wheel-down → lock screen →
unlock → desktop → click a desktop icon → tiling window drag-resize → Apple menu → Lock
Screen, since **none of this has had human eyes on it yet** and round 8 exists
specifically because round 6/7 code that passed every automated check still had a real,
visible bug (desktop icons silently swallowing clicks) that only a human noticed by
actually using the site. Don't over-trust `tsc`/`lint`/`build` passing as a substitute for
that again. The lock-screen avatar is currently a **placeholder** (generic silhouette icon
on a gradient circle, `LockScreen.tsx`) — the user said they'll send a real profile photo
later to replace it. Round 9 (right after round 8) also made the lock-screen unlock
auto-play instead of manual — see round 9 below, it's the most recently-changed piece and
hasn't been seen running any more than the rest has. After the browser check, see
"Pending user requests" below — items 3, 6, and 7 are open (more GitHub projects with
images, and more general text animations/elements — both explicitly deferred by the user
to a future session, not to be started without being asked).

## Pending user requests (queued 2026-08-14, updated 2026-08-15)

1. ~~"Make the desktop UI more promising."~~ **Done, rounds 6–7** — desktop icons (now
   all 8 apps, round 7, up from 3 in round 6), a real menu bar (Apple menu, Control
   Center, Spotlight search), and the real macOS wallpaper photo. If it still doesn't
   feel like enough, ask what's still missing next session rather than assuming more of
   the same polish is wanted.

2. ~~Dock apps should open "filling up the desktop like a puzzle (basically like
   frames)."~~ **Done, round 6** — tiling window manager, see round 6 below for the full
   design (master-stack layout, draggable dividers, maximize-to-zoom).

3. **Projects section needs a real content update — many more GitHub projects to add.**
   Still open. Currently `src/content/resume.ts` only has the three original projects
   (RoamIQ/UPACS/VoxCoder) feeding `ProjectsApp/ProjectsFinder.tsx`. The user has more
   projects on GitHub not yet represented. Needs from the user next session: which repos,
   plus per-project description/tech-stack/link details (same shape as the existing three
   entries in `resume.ts` — check `content/types.ts` for the exact `Project` shape before
   asking, so the ask can be a fill-in-the-blank rather than open-ended). Purely a
   content change, no architecture impact — the tiling rework in round 6 didn't touch how
   project windows resolve (`resolveWindowDefinition()` in `app-registry.tsx` still
   handles dynamic `project-<id>` window ids the same way).

4. **Make the intro "more appealing and cool."** Reopened, round 7. The original
   `IntroSection.tsx` was deleted in round 6 along with the hero video pipeline it sat in
   front of — but the user then asked for an intro section back in front of the lock
   screen (round 7), so `src/components/intro/IntroSection.tsx` exists again (rebuilt,
   same OMEN-style Roboto Condensed name treatment as before, using
   `StarfieldBackground.tsx` — moved to `src/components/backgrounds/` in round 8 once
   `DesktopWallpaper.tsx` became a second caller). The underlying ask — a "cooler," more specific
   entrance-text animation/reference — was never answered by the user before round 7's
   rebuild, so the current version is still the same simple staggered rise-and-fade
   placeholder pattern as the original. Ask again next session if they have a reference,
   same as before.

5. ~~Reverse-scroll (desktop → video → intro) only works once.~~ **Obsolete, round 6** —
   the entire scroll-scrub mechanism this bug lived in (GSAP ScrollTrigger, `HeroCanvas`,
   the hero↔desktop toggle driven by scroll position) is deleted. The lock screen ↔
   desktop toggle it was replaced by uses the same proven cover/reveal transition
   machinery but driven by discrete clicks (unlock / Apple menu → Lock Screen) instead of
   continuous scroll position, which is what actually caused the original bug (GSAP
   auto-refresh clobbering `window.scrollY` mid-transition) — there's no scroll position
   for anything to clobber anymore. Worth a sanity check next session (lock → unlock →
   lock → unlock a few times in a row) but there's no reason to expect the old failure
   mode specifically.

6. **More text animations and "more elements" generally, to make the site cooler.**
   Queued 2026-08-15 (round 9), explicitly deferred by the user to a later session — "for
   now this is fine... we'll do all that later." Vague as stated, same caution as item 1
   originally had: ask what specifically before guessing at a big pass (which
   animations/elements, and where — intro text, window transitions, dock, something else
   entirely). Don't start this unprompted.

7. **More GitHub projects, each with an image, "so that it looks cool."** Queued
   2026-08-15 (round 9), also explicitly deferred — refines item 3 above (which only
   asked for more projects; this adds "with images for each"). Still needs from the user:
   which repos, descriptions, tech stack, links, **and now an image per project** — check
   `content/types.ts`'s `Project` shape before asking, and note it'll likely need a new
   `image`/`thumbnail` field added to that type plus `ProjectsFinder.tsx`'s grid and
   `ProjectDetailWindow.tsx` updated to render it, not just new data in `resume.ts`.

Dev server: `npm run dev` from the project root, http://localhost:3000.

## Tech stack (decided, don't re-litigate)

- Next.js 16 (App Router) + TypeScript (strict) + Tailwind CSS v4
- Framer Motion — all UI animation (window springs, dock magnification, tiling reflow via
  the `layout` prop, lock-screen transitions). **GSAP/ScrollTrigger was removed in
  Milestone 5 round 6** along with the scroll-scrubbed hero video it existed for — don't
  reinstall it or look for `HeroCanvas.tsx`, it's gone, not misplaced.
- Zustand — window manager + UI-overlay state (`src/lib/window-manager/store.ts`)
- npm (not pnpm — pnpm wasn't installed on this machine, npm was used instead, harmless
  deviation from the original plan)
- lucide-react for generic icons; lucide-react has **no** GitHub/LinkedIn brand icons in
  the installed version (1.31.0) — custom inline SVGs live at
  `src/components/icons/BrandIcons.tsx` instead.

## Hero video generation (for the user, milestone 4 input)

Tool: **Google Flow** (flow.google.com), Veo 3.1 Fast, 16:9, 10s, image-to-video from his
reference photo. Free tier: 50 daily credits + 100 one-time welcome credits, no payment
method needed; a 10s clip costs 20 credits.

Current prompt (revised after attempt #1 showed a hallucinated fake desktop UI on the
monitor — added explicit "no UI on screen" instructions):

```
A cinematic, photorealistic 10-second shot of a person sitting at a modern
desk setup with a widescreen monitor, mechanical keyboard, and subtle RGB
accent lighting, wearing over-ear headphones. They are initially facing
their desktop screen. In the first 2-3 seconds, they turn their head and
look directly into the camera with a calm, confident expression, hold for
a beat, then turn back to face the monitor. As they turn back, the camera
begins a slow, smooth, continuous dolly-in push toward the desktop monitor
screen, gradually filling the frame with the screen by the final second of
the shot.

Important: the monitor screen itself should show no visible interface —
no icons, no windows, no text, no logos, no operating system of any kind.
Instead the screen is a soft, softly-glowing dark blue-white light, slightly
overexposed/blurred, like a screen that is out of focus as the camera gets
close to it. Do not render any UI, app, or desktop on the screen at any
point in the shot.

Camera motion is smooth and gimbal-stabilized, no shake, no cuts, no
jitter. Lighting: soft key light from the left, cool-toned ambient glow
from the monitor and desk accent lighting, shallow depth of field with the
background softly blurring as the camera pushes forward. Mood: professional,
modern tech workspace, aspirational developer setup. Photorealistic, high
detail, 24fps, 16:9.
```

Fallback if Veo keeps rendering a fake UI on-screen after a couple more attempts: stop
regenerating, take the best take on camera-motion/subject quality, and post-process it —
blur/dim the monitor-screen region in the last ~1s of the clip with ffmpeg so any UI
becomes an illegible glow, before running frame extraction. Don't burn more credits
chasing a "clean screen" generation past 2-3 tries.

**Result (used in Milestone 4):** this prompt worked well — clean blank blue-white screen
glow for ~9 of the 10 seconds, head-turn-to-camera lands right around the 4s mark as
scripted, no fake OS UI/icons/windows anywhere. Only issue: in the final ~1s a light
abstract circuit-board graphic fades onto the screen — not an OS UI, but its light color
still doesn't match the site's dark desktop wallpaper, so a direct crossfade would've
looked muddy regardless. Solved architecturally instead of by fighting the video further
— see Milestone 4.

## Milestone status

### 1. Scaffold + static desktop shell — ✅ DONE
`create-next-app` (TS/Tailwind/App Router/Turbopack), Zustand window-manager store
(`src/lib/window-manager/store.ts`, `types.ts`), desktop shell components
(`src/components/desktop/{Desktop,MenuBar,Dock,DockIcon,Window,WindowTitleBar}.tsx`).
Verified interactively in a real browser (claude-in-chrome): open/close/minimize/
restore/maximize/focus/drag all work. (Note: automated drag-testing via the browser
tool needed multiple small chained drags or direct DOM pointer-event dispatch to work
reliably — the app's drag logic itself is correct via the standard Framer Motion
`dragControls` handle pattern; this was just an automation-fidelity issue, not a bug.)

### 2. Wire real resume content — ✅ DONE
Content centralized in `src/content/resume.ts` + `types.ts` (single source of truth,
populated from his actual resume — VIT Chennai, MHCognition/LambdaDigital internships,
RoamIQ/UPACS/VoxCoder projects, skills, certifications). App registry at
`src/lib/window-manager/app-registry.tsx` maps dock app id → {icon, title, Component}.
Real components built for all 8 apps under `src/components/apps/`:
- `AboutApp.tsx`, `EducationApp.tsx` (sidebar+detail), `ExperienceApp.tsx` (timeline),
  `ProjectsApp/` (Finder-grid `ProjectsFinder.tsx` opens per-project windows via
  `ProjectDetailWindow.tsx`, dynamic window ids `project-<id>` resolved through
  `resolveWindowDefinition()` in app-registry.tsx — the Desktop renders windows
  generically from `Object.keys(windows)`, not just the static dock app list),
  `SkillsApp.tsx` (terminal aesthetic), `CertificationsApp.tsx`, `ContactApp.tsx`
  (mailto + copy-to-clipboard), `ResumeApp.tsx` (embeds `public/resume.pdf`, downloadable).
- `MenuBar.tsx` active-app title uses `resolveWindowDefinition()` too (not the static
  registry) so project sub-window titles show correctly.
Resume PDF copied to `public/resume.pdf`.

### 3. Hero scroll-scrub pipeline (placeholder video) — ⛔ SUPERSEDED, REMOVED (round 6)

> **This entire milestone's code was deleted in Milestone 5 round 6 (2026-08-15)** and
> replaced with a macOS-style lock screen — see round 6 for why and what replaced it.
> Left below for historical context only (what was built, gotchas hit) — none of the
> files, hooks, or GSAP config mentioned here exist in the codebase anymore.
- `scripts/extract-frames.sh` — ffmpeg extraction: `fps=12,scale=1920:-1`, **must pass
  `-c:v libwebp`** explicitly or ffmpeg silently picks the animated-webp encoder and
  produces one animated file instead of a numbered sequence. Also writes
  `public/frames/hero/manifest.json` (`{"count": N}`) so the app doesn't hardcode frame
  count.
- `src/components/hero/useFrameSequence.ts` — preloads all frames as `HTMLImageElement`s
  into a ref (not React state, to avoid re-render storms), tracks loaded count for the
  progress bar.
- `src/components/hero/HeroLoader.tsx` — boot-style progress screen shown while preloading.
- `src/components/hero/HeroCanvas.tsx` — pinned full-viewport canvas, GSAP ScrollTrigger
  (`scrub: 1`, `pin: true`, `end: '+=300%'`) drives `drawImage` per scroll progress.
  **Important gotcha already hit and fixed:** calling the `onComplete` prop (which
  triggers a React state update in the parent) directly from ScrollTrigger's `onLeave`
  caused a `removeChild` DOM crash — GSAP's pin-spacer DOM surgery and React's unmount
  raced, because the parent's state change eventually unmounts this component. Fix:
  call `trigger.kill()` synchronously *before* `onComplete()` inside `onLeave`, so GSAP
  fully reverts its DOM changes before React touches anything. See the `onLeave` handler
  in `HeroCanvas.tsx` if this pattern needs repeating elsewhere. (`onComplete` itself
  now just kicks off the dip-to-black phase machine in `HeroExperience.tsx` — see
  Milestone 4 — not a direct unmount, but the ordering fix is still what makes it safe.)
- `src/components/hero/HeroFallback.tsx` — shared fallback UI (static image for
  reduced-motion, looping muted video for mobile) with an "Enter Portfolio ↓" button.
- `src/lib/hooks/usePrefersReducedMotion.ts`, `useIsMobileHero.ts` — both default to
  `false` during SSR (browser APIs unavailable) and correct after mount; both have a
  `// eslint-disable-next-line react-hooks/set-state-in-effect` on the initial sync
  setState call — this is intentional (avoids a hydration mismatch), not a lint bypass
  to "fix later."
- `src/components/hero/HeroExperience.tsx` — top-level orchestrator: fallback vs.
  canvas-scrub vs. loader vs. Desktop, manages `document.body.style.overflow`.
- `src/app/page.tsx` renders `<HeroExperience />`. `src/app/layout.tsx` body has no
  forced `overflow-hidden` anymore (HeroExperience manages it dynamically).
- Pipeline was validated with a placeholder asset (`scratch/hero-placeholder.mp4`, a
  synthetic ffmpeg `mandelbrot`+`zoompan` clip) before the real video existed — that
  placeholder has since been replaced with real footage, see Milestone 4.
- Escape key closes the focused window (added in `Desktop.tsx`, small a11y win pulled
  forward from Milestone 6 since it didn't depend on the video).

### 4. Swap in real Veo-generated hero video — ⛔ SUPERSEDED, REMOVED (round 6)

> Same as Milestone 3 above: this code is gone, replaced by the lock screen. One asset
> from this milestone **did** survive, repurposed: `frame-049.webp` (the clean
> looking-at-camera frame identified below) now lives at `public/lockscreen/background.webp`
> and `public/lockscreen/avatar.jpg` (cropped) — see round 6. Everything else described
> below (the frame sequence, the mobile clip, the dip-to-black handoff machinery) was
> deleted; the dip-to-black *pattern* itself survived and was reused for the lock
> screen ↔ desktop transition, just not this code.
Real clip received from the user at `scratch/hero_final.mp4` (gitignored, 1920x1080,
24fps, 10s, h264 — matches spec exactly). Verified by sampling frames across the clip
with ffmpeg before committing to the full pipeline (worth doing again for any future
clip swap — cheap insurance against re-running the full extraction on a bad take).

What was done:
1. `bash scripts/extract-frames.sh scratch/hero_final.mp4` → `public/frames/hero/`
   (120 frames, ~8MB, lighter than the synthetic placeholder's 14MB).
2. Mobile fallback clip cut from the same footage: first 5s (covers typing + the
   head-turn-to-camera beat), muted, downscaled to 1080px wide, h264 crf 23 →
   `public/video/hero-mobile.mp4` (~520KB).
3. `HeroFallback.tsx`'s reduced-motion static image switched from `frame-001.webp`
   (back of head) to `frame-049.webp` (the clean looking-at-camera frame, ~4s mark) —
   a much stronger static hero shot for that path.
4. **Handoff redesign** — the real footage's last ~1s fades in a light abstract
   circuit-board graphic on the monitor screen (see note above). Rather than fighting
   Veo for a pixel/color-matched final frame, `HeroExperience.tsx` was rewritten around
   an explicit phase state machine (`hero → fade-out → fade-in → desktop`) that dips
   through black between the hero and the desktop: a fixed full-screen black
   `motion.div` fades in (0→1, 300ms) over the frozen final canvas frame, then the
   Desktop mounts underneath while still fully black, then the overlay fades out
   (1→0, 400ms) to reveal it. This sidesteps needing any color/framing match between
   the video and the site entirely, and is standard cinematic practice, not a hack.
   The `HeroFallback` "Enter Portfolio" button routes through the same phase machine
   for consistency.
   - Ordering gotcha from Milestone 3 (GSAP `trigger.kill()` before the React state
     swap) still applies and still matters here — `HeroCanvas` stays mounted through
     `fade-out` (frozen, since ScrollTrigger is already killed) and only unmounts once
     the screen is fully black (`fade-in` phase), so there's no DOM race.
5. Verified end-to-end in browser: scrolled through the full real clip (smooth, head-turn
   lands on cue), confirmed the dip-to-black handoff is clean with no flash/jump, no
   console errors, production build passes.

Not done / worth revisiting if it ever looks off: no explicit scale/position-matching
of a "screen rectangle" between video and desktop (the plan's alternate handoff idea) —
the dip-to-black made that unnecessary. If the hero video is ever regenerated again,
re-check the mobile clip's first-5-seconds framing still makes sense as a loop.

### 5. Polish animations and transitions — 🔄 IN PROGRESS
First round done, driven by direct user feedback after they looked at the live site.
Feedback was: (1) the hero read as "just a video," no website feel — no overlay text,
header, or hint that scrolling did anything; (2) the black transition into the desktop
felt blunt/unmotivated; (3) desktop wallpaper was a flat gradient, felt under-designed
next to the cinematic video. User's explicit direction: name+desc text overlay (they may
bring a specific Framer Motion animation reference later to replace the current simple
one), a "screen turning on" boot moment for the transition, and a **Matrix-rain-style**
wallpaper (deliberately techy/cyberpunk, not a native-macOS gradient — confirmed
explicitly, don't second-guess this back to something more subtle).

What was built:
- `src/components/hero/HeroOverlay.tsx` — persistent small header (KP monogram +
  "Portfolio" wordmark, top-left, stays visible throughout the hero), a headline+subtitle
  block (name + "CSE Undergrad · Full-Stack & AI/ML Developer", bottom-left) that fades
  out once the user starts scrolling, a "Scroll to enter ↓" cue (bottom-center, bobbing,
  fades out on scroll), and a dark top/bottom vignette gradient for legibility. Takes
  `scrolled: boolean` and `showScrollCue?: boolean` (the mobile/reduced-motion fallback
  passes `showScrollCue={false}` since its "Enter Portfolio" button already covers that).
  **Placeholder copy/animation** — user said they'd send a specific Framer Motion
  reference they like to replace the current simple fade/slide-in; check Current Status.
- `src/lib/hooks/useScrolledPast.ts` — plain `window.scrollY > threshold` scroll listener
  hook, used by `HeroExperience.tsx` to drive `HeroOverlay`'s `scrolled` state.
- Boot-in logo moment added directly in `HeroExperience.tsx`'s existing black overlay
  `motion.div`: a small KP badge + spinner fades in (delayed ~0.2s so it only appears
  once black is opaque) and fades out quickly as the black clears — reuses the same
  visual language as `HeroLoader.tsx`.
- `src/components/desktop/MatrixWallpaper.tsx` — canvas-based Matrix digital-rain
  (katakana + alphanumeric, green `#2ee66b`, `setInterval`-driven at ~18fps not
  `requestAnimationFrame` — authentic "stepped" cadence, cheaper too), dimmed via
  `opacity-80` on the canvas plus a `bg-black/55` scrim on top so dock/window chrome
  stays legible over it. Respects `usePrefersReducedMotion` (skips the animation loop
  entirely, renders a static dim fill instead). Replaces the flat gradient in
  `Desktop.tsx`.

**Important architecture gotcha hit and fixed — read this before touching the hero again:**
`HeroOverlay` was initially rendered as a *child inside* `HeroCanvas`'s pinned section
div (to share scroll-progress state via GSAP's `onUpdate`). This caused a **hard crash**
(`removeChild` — "not a child of this node", `React DOM commit failure`, and once even a
fully frozen renderer requiring a fresh tab) exactly when the hero→desktop transition
tried to unmount that subtree. Root cause: GSAP's `pin: true` performs direct DOM surgery
(wraps the trigger element in a pin-spacer) on the same subtree that had independent
Framer Motion–animated children (the overlay's fade/bob animations) — the two systems'
mutations of that subtree conflicted on unmount, worse than the earlier (already-fixed)
`trigger.kill()`-ordering issue from Milestone 3, because this time animated React
children lived *inside* GSAP's pinned element, not just a sibling being swapped.
**Fix: never nest Framer Motion (or any independently-animating React) content inside
the GSAP-pinned section.** `HeroCanvas.tsx` is back to just the bare canvas + GSAP, full
stop. `HeroOverlay` now renders as a `position: fixed` **sibling** in `HeroExperience.tsx`
(shown alongside `HeroCanvas`, not inside it), getting its scroll state from the
GSAP-independent `useScrolledPast` hook instead. Verified clean (fresh tab, full scroll
through the real video, no console errors, production build passes) after the fix.

Also worth knowing: a second, smaller false-start happened first — `HeroOverlay`'s
scroll-driven fade was originally wired to GSAP ScrollTrigger's `onUpdate`/`self.progress`
directly, which fires once during setup with a pre-layout progress value and could latch
the overlay permanently hidden with nothing to correct it (no real scroll ever happened
to flip it back). Fixed by using the plain `window.scrollY`-based `useScrolledPast` hook
instead, fully decoupled from GSAP's internal progress calculation — this was the right
call even before the bigger nesting bug turned up, and is why `useScrolledPast` exists as
its own hook rather than reading GSAP progress.

**Round 2** (also feedback-driven, same session): user reported (1) once you scroll all
the way down past the video into the desktop, scrolling back up did nothing — the hero
was gone for good; (2) app windows looked "bland," asked for glassmorphism; (3) general
request to "polish animations and text."

What was built:

- **Bidirectional hero↔desktop scroll (the real fix).** Previously `HeroCanvas` was
  unmounted forever once the hero finished (`trigger.kill()` on completion, one-way
  `hero → fade-out → fade-in → desktop` state machine). Rearchitected so the canvas's
  GSAP `ScrollTrigger` is **never killed** after creation — it stays pinned/scrubbing for
  the page's entire lifetime — and `Desktop` mounts once and then stays mounted too,
  toggling only which one is *visible*:
  - `HeroCanvas.tsx`: props renamed `onReachEnd`/`onLeaveEnd`. Reach/leave-end detection
    now happens **inside the same `onUpdate` callback that draws frames**, off the same
    smoothed `self.progress` value (`REACH_END_THRESHOLD = 0.999`, `LEAVE_END_THRESHOLD =
    0.9`, wide hysteresis gap, edge-triggered via a local `pastEnd` flag so each crossing
    fires once). Do **not** go back to GSAP's own `onLeave`/`onEnterBack` callbacks for
    this — see the gotcha below for why.
  - `Desktop.tsx`: now takes an `active: boolean` prop. Root is `position: fixed`, with
    `active ? "z-30 pointer-events-auto" : "-z-10 pointer-events-none"` — inactive means
    genuinely pushed behind everything and inert, not just hidden-looking. (A first pass
    of this fix only toggled `pointer-events`, leaving `z-30` constant — Desktop still
    visually covered the canvas even when "inactive," making the reveal invisible. If a
    future reverse-transition looks like it's not doing anything, check this z-index
    first.)
  - `HeroExperience.tsx`: `desktopMounted` (mount once, stays true forever — preserves
    window positions/open state across round trips) and `desktopActive` (which layer is
    on top) are now separate pieces of state. The cover/reveal black-dip transition is
    symmetric and reusable in both directions.
  - Global scrollbar hidden (`html { scrollbar-width: none }` etc. in `globals.css`) since
    scroll is now always live, not locked once on the desktop — a visible native scrollbar
    permanently sitting over the desktop UI would look wrong. Scroll itself stays fully
    functional, only the visible track is hidden.
  - `overscroll-contain` added to each window's scrollable content div (`Window.tsx`) so
    scrolling inside a window (e.g. reading About Me) can't chain into the page scroll and
    accidentally trigger the reverse transition once you hit the top/bottom of that window's
    content.

- **Critical gotcha — do not drive this transition off `onAnimationComplete` again.**
  The original implementation called `handleOverlayComplete` from the black overlay
  `motion.div`'s `onAnimationComplete` prop. In testing, that callback **fired twice for
  a single "covering" completion** (confirmed via console logging — both calls legitimately
  observed `transition === "covering"`, so a same-value guard didn't catch it; most likely
  caused by an unrelated re-render of `HeroExperience` — e.g. from the always-live scroll
  listener — making Framer Motion re-evaluate an already-satisfied `animate` target and
  fire a redundant completion event). Each call flipped `desktopActive`, so the two calls
  canceled out — the user would see the boot-logo flash and then land right back where
  they started, looking like nothing happened. A single-flight ref guard on top of
  `onAnimationComplete` was tried and still produced a stuck state (see the commit history
  in this file's earlier draft if curious — not worth re-deriving). **The actual fix:**
  don't use `onAnimationComplete` at all. `HeroExperience.tsx` now drives the
  `covering → revealing → idle` steps with a plain `useEffect` keyed on `transition` that
  sets a `setTimeout` matching each phase's animation duration (`COVER_DURATION_MS = 300`,
  `REVEAL_DURATION_MS = 400`). Since the effect only re-runs when `transition` itself
  changes (not on unrelated re-renders), and each `setTimeout` fires exactly once, this
  class of bug is structurally impossible now. If you ever need a "run this once when an
  animation finishes" callback in this codebase again, prefer a timer matched to the
  `transition` duration over `onAnimationComplete` unless you've confirmed it can't
  receive redundant re-renders.

- **Glassmorphism.** `Window.tsx`: `bg-zinc-900/40 backdrop-blur-2xl backdrop-saturate-150`
  with a subtle inset top highlight (`shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)]`)
  and a focused-state glow (`shadow-[0_0_50px_-15px_rgba(56,189,248,0.35)]` + sky-tinted
  ring) instead of the flat `bg-zinc-900/90`. Open/close animation switched from a plain
  tween to a spring (`stiffness: 340, damping: 28, mass: 0.9`) with a slight rise-in
  (`y` offset relative to the window's actual target position, not an absolute value —
  watch this if editing, an absolute `y` in `initial`/`exit` will make windows jump to the
  wrong place). `WindowTitleBar.tsx`: matching blur/border, traffic lights now scale +
  glow on hover (`hover:shadow-[0_0_6px_<color>]`). `DockIcon.tsx`: added `whileTap`
  press feedback and a spring-animated running-indicator dot instead of a CSS-only one.

- **Skills terminal typewriter effect.** `SkillsApp.tsx` now types out `cat skills.json`
  character-by-character (`useTypewriter` hook, `setInterval`, 35ms/char) before the
  category blocks stagger-fade in (Framer Motion, 0.12s stagger per category), followed by
  a blinking prompt cursor. Was previously fully static.

**Round 3** (same session): user asked for a proper landing/splash section shown
immediately on page load, *before* the scroll-scrubbed video — his name + a short
description, "cool animated text" (explicitly said he'd paste a style/prompt reference
later — build the structure now, wait on the specifics), a "scroll to view my portfolio"
cue, and a background with a cursor-hover "warp effect" (also said he'd paste a prompt for
this). Font direction: Roboto Condensed — "the font used by OMEN laptops" — bold, for a
developer/technical look, name bold in the center.

What was built:

- `src/components/hero/IntroSection.tsx` — new. Full-viewport (`h-screen`) section
  rendered **unconditionally as the first child** of `HeroExperience`'s returned Fragment,
  ahead of everything else (including the fallback/loader/canvas branches). Content: a
  small uppercase kicker ("Welcome to my Portfolio"), the name ("Koppesh P") as the
  centerpiece in `Roboto_Condensed` (weights 500/700/900, `next/font/google`, bold +
  uppercase + tracked-out for the OMEN look), a short description line, and a bobbing
  "Scroll to view my portfolio ↓" cue at the bottom. Respects
  `usePrefersReducedMotion` (skips the entrance stagger/bob, fades in flat instead).
  Two pieces are **explicit placeholders pending the user's prompts** — don't treat
  either as finished, and don't need to touch anything else in the file to replace them:
  - The entrance animation (currently a simple staggered rise-and-fade via a small
    `riseIn(delay)` helper inside the component).
  - The background (currently a cheap CSS-only effect: a radial gradient centered on
    `--cursor-x`/`--cursor-y` custom properties updated on `onMouseMove` via direct
    `style.setProperty` calls — bypasses React re-renders on purpose, it'd be way too
    hot a path otherwise — layered over a faint CSS grid pattern). This is **not** the
    "warp tunnel" effect the user described; it's just enough to not look static while
    waiting on the real reference.

- **Why this slots in for free, architecturally:** `IntroSection` is a plain in-flow
  (non-fixed, non-pinned) `h-screen` section placed *before* `HeroCanvas`'s own section in
  the DOM. `HeroCanvas`'s GSAP `ScrollTrigger` (`start: "top top"`) is keyed off its own
  section's position in the document, not an absolute scroll offset — so stacking a new
  100vh section ahead of it needed **zero changes** to any pin/scrub/threshold math in
  `HeroCanvas.tsx`. The pin naturally begins only once the user has scrolled past the
  intro's own height. This also composes correctly with the round-2 bidirectional
  scroll fix for free: scrolling up from the desktop reverses into the video as before,
  and continuing to scroll up from there reveals the intro above it via plain native
  scrolling — no custom logic needed for that either.

- **Content dedup.** Since `IntroSection` now owns the name/description/scroll-cue
  moment, that content was **removed from `HeroOverlay.tsx`** (used over the video
  itself) — it would have repeated verbatim seconds after the user just saw it. Removed
  the `scrolled: boolean` / `showScrollCue?: boolean` props entirely; `HeroOverlay` is now
  just the persistent corner "KP · Portfolio" wordmark + vignette, no props, used
  identically in both the video section and `HeroFallback` (mobile/reduced-motion).
  Deleted `src/lib/hooks/useScrolledPast.ts` — it existed solely to drive the now-removed
  scroll-cue fade and had no other callers once that was gone.

- Verified in browser: intro renders immediately with the kicker/name/description/cue
  and cursor-reactive glow, scrolling down transitions cleanly into the pinned video (the
  brief in-between frame where you see a sliver of the intro's tail above the
  not-yet-pinned video section is normal scroll behavior, not a bug — it resolves the
  instant GSAP's pin engages), then into the desktop as before. No console errors,
  production build passes.

**Round 4** (same session): user reported the round-2 "fix" wasn't actually fixed — still
couldn't scroll back out of the desktop — and asked for the Starfield warp-hover
background (link: a Framer community "Starfield Motion" code component).

**The real scroll-reverse bug, finally found and fixed.** Round 2's toggle-logic fix
(single-flight timeout-driven transitions) was necessary but not sufficient — there was
a second, independent bug underneath it that only showed up with real interaction
patterns (clicking into the desktop, scrolling with the cursor over different areas),
not the more mechanical scroll sequences used to verify round 2. Root cause: **GSAP
ScrollTrigger auto-refreshes** (recalculates pin start/end positions) whenever it detects
the page's content size changing, via an internal ResizeObserver gated by the `"resize"`
entry in its `autoRefreshEvents` config. Every hero↔desktop transition mounts/unmounts the
black transition overlay and (the first time) mounts all of `Desktop`, and that was enough
to trigger an auto-refresh mid-transition. When ScrollTrigger refreshes, it briefly reverts
pinned elements to their unpinned natural layout to remeasure — and if that temporarily
collapses the document shorter than the current scroll position, the **browser clamps
`window.scrollY`** to fit, and it doesn't restore afterward. Observed effect: scrolling up
from the desktop would sometimes silently dump the user back at `scrollY = 0` (the intro)
instead of landing on the video, with no error, no visual indication of why — reads exactly
like "scrolling back out doesn't work."

Fix, in `HeroCanvas.tsx`:
```js
ScrollTrigger.config({ autoRefreshEvents: "visibilitychange,DOMContentLoaded,load" });
```
dropping `"resize"` so content-mutation-triggered refreshes stop happening, called inside
the `useEffect` (**not** module scope — calling it before GSAP's plugin init has fully
settled throws `Cannot read properties of undefined (reading 'length')`, a real crash hit
while building this). Since disabling `"resize"` here also means a genuine window resize no
longer auto-refreshes the pin geometry, `ScrollTrigger.refresh()` is now called explicitly
inside the existing `resize()` handler (which already runs on real window resize and on
mount) so that case is still covered correctly.

Verified after the fix: repeated forward → reverse → forward cycles, including scrolling
up/down with the cursor positioned directly over open window content (not just empty
desktop space, which is what round 2's verification had used) — all clean, no
console errors, production build passes. **If this regresses again, suspect something new
triggering a ScrollTrigger auto-refresh before reaching for the transition-state-machine
logic again** — that part was already correct.

**Starfield background.** The user linked a Framer community code component
(`Starfield-Motion` at `framer.com/m/...`). That URL is a re-export wrapper pointing to
`framerusercontent.com/modules/.../Starfield_Motion.js` — Framer code components are
compiled for Framer's own runtime/render context, not meant to be imported as a live
third-party dependency into a bundled Next.js app (supply-chain risk, no guarantee it
keeps working standalone, CORS/host-environment assumptions). Fetched an architectural
breakdown of the effect instead (dot grid + spatial-hash cursor push/glow + twinkle +
breathing + shooting stars) and **reimplemented it from scratch** as
`src/components/hero/StarfieldBackground.tsx` — same canvas-component pattern as
`MatrixWallpaper.tsx`, tuned down for a hero background rather than a full showcase
(700 dots max vs. the source's 8000, no spatial hashing since the count is small enough
that plain O(n) distance checks are cheap). Features carried over: 4 dot types (regular/
small/medium/bright, weighted random) with per-type size/alpha, cursor-radius push
(spring-damped, not instant) + glow boost near the cursor, twinkle (types 1-3) and
breathing (type 0) via sine waves, periodic shooting stars with fading trail streaks.
Respects `usePrefersReducedMotion` — renders one static frame, no animation loop, no
mouse tracking. Replaced `IntroSection`'s placeholder radial-gradient-plus-grid
background and its associated `onMouseMove`/ref/CSS-custom-property code (that whole
approach is gone now — `StarfieldBackground` owns its own mouse tracking independently,
in real pixel coordinates for the physics, not CSS percentages for a gradient). Verified
in browser: dot field renders correctly with a mix of star sizes/brightness, visible
sky-blue glow accents on brighter stars, no console errors.

Not started yet: the `IntroSection` name/kicker text animation (still the round-3
placeholder — user said a reference is coming), dock magnification tuning beyond the
press feedback added in round 2, menu bar dropdowns, Finder grid hover/selection states
for Projects.

**Round 5** (same session): last-minute user request — swap the desktop wallpaper from
the round-1 Matrix rain to something that reads as more authentically macOS, and add a
clock plus a few more desktop widgets to sell the "real macOS desktop" feel. This is a
deliberate reversal of round 1's explicit "keep it techy/cyberpunk, don't second-guess
back to a native-macOS look" decision — the user changed their mind, it's not a
misunderstanding to correct back.

What was built:

- `src/components/desktop/DesktopWallpaper.tsx` — new. Replaces
  `MatrixWallpaper.tsx` (deleted, confirmed unused elsewhere via grep before removing).
  An **original** abstract gradient wallpaper in the style of macOS's default wallpapers
  (soft blurred, drifting color blobs — blue/indigo/pink/orange/green — over a dark navy
  base, `mix-blend-screen` for the aurora-like overlap look), **not** a reproduction of
  any actual Apple wallpaper artwork, which is copyrighted — this was a deliberate design
  constraint, not an oversight. Blob drift animated via Framer Motion
  (`x`/`y` keyframe loops, 34-44s durations so it reads as slow ambient motion, not
  distracting). Respects `usePrefersReducedMotion` (blobs render static, no `animate`
  prop passed at all rather than an animation with duration 0 — cleaner and avoids any
  chance of a flash).
- `src/components/desktop/widgets/` — new directory, three widgets + a composing stack:
  - `ClockWidget.tsx` — large digital time (`Intl.DateTimeFormat`, updates every second)
    + weekday/date, glassmorphic card styling matching `Window.tsx`'s language
    (`bg-white/10 backdrop-blur-2xl border-white/15`).
  - `CalendarWidget.tsx` — mimics the macOS Calendar dock-icon widget convention (red
    month header bar + big day number + weekday), updates every minute (day only, no
    need for per-second ticks). Uses the site's existing rose/red accent rather than
    literally copying Apple's exact Calendar icon design.
  - `WeatherWidget.tsx` — static/mock card, no live API for v1 (out of scope for this
    request) — personalized to "Chennai" (the user's actual location per his resume)
    with a `lucide-react` `Sun` icon, not a placeholder city.
  - `WidgetStack.tsx` — composes the three, `fixed right-6 top-14 z-0` — deliberately
    **below** the window z-index range (windows start at `zIndex: 1` via the Zustand
    store's `highestZ` counter, confirmed in `store.ts`) so open windows can visually
    cover the widgets, matching real macOS desktop-widget layering. `pointer-events-none`
    on the stack wrapper since these are read-only display widgets, not interactive.
- `Desktop.tsx` updated: `<MatrixWallpaper />` swapped for `<DesktopWallpaper />` +
  `<WidgetStack />`, rendered before `<MenuBar />` so window/dock chrome still layers
  correctly on top.
- **Lint gotcha hit:** the obvious `useEffect(() => { setNow(new Date()); const id =
  setInterval(...); ... }, [])` pattern trips the `react-hooks/set-state-in-effect` rule
  (calling setState synchronously in an effect body). Fix: wrap the initial call in a
  named `tick` function and call `tick()` once before `setInterval(tick, ...)` — same
  pattern already used in `MenuBar.tsx`'s clock, which is why that file never tripped
  this rule despite doing conceptually the same thing. Apply this pattern to any future
  "sync state to `new Date()` on an interval" component in this codebase.
- Verified: `npx tsc --noEmit`, `npm run lint`, `npm run build` all clean. Full browser
  round-trip on the already-running dev server (intro → video → desktop): wallpaper
  renders correctly, widgets render and the clock/calendar tick live across screenshots,
  opening a window (Skills) works exactly as before with no regression, reverse-scroll
  from desktop back through the video to the intro still works cleanly (this was the
  main regression risk since `Desktop.tsx` was touched — confirmed fine), no console
  errors at any point.

**Round 6** (2026-08-15): the big one — this session covered pending requests #1 and #2
from the 2026-08-14 queue, plus a scope-expanding pivot on the hero video the user raised
mid-session. Three pieces:

**6a. Desktop "more promising" — real macOS elements + real wallpaper photo.**
- The user supplied `scratch/macos_wallpaper.jpg` — this turned out to be Apple's actual
  default macOS Big Sur wallpaper artwork (not a generic image), which directly
  contradicts round 5's explicit "don't use real Apple wallpaper art, it's copyrighted"
  decision. Flagged this to the user before using it (redistributing Apple's copyrighted
  work on a public site vs. generating an original inspired-by version); **the user chose
  to use it anyway**, explicitly, after being told what it was. Resized/compressed via
  ffmpeg to `public/wallpaper/desktop.jpg` (2560px wide, ~64KB). `DesktopWallpaper.tsx`
  rewritten to render it with a slow Ken Burns drift (scale/position keyframes via Framer
  Motion, respects `usePrefersReducedMotion`) instead of the round-5 abstract gradient
  blobs. **If this ever needs revisiting for a public deploy,** the abstract-gradient
  approach from round 5 is the safe fallback — see git history / this file's earlier text
  above for that implementation.
- `DesktopIcons.tsx` — new. Finder-style desktop icons (Resume.pdf, Projects, About Me),
  left side below the menu bar (right side was already claimed by `WidgetStack`).
  Single-click selects (sky-tinted highlight), double-click opens the window via
  `openWindow()`. Outside-click deselects via a `pointerdown` listener on `window`.
- `MenuBar.tsx` rewritten — the "KP" mark is now a real Apple-menu-style dropdown (About
  This Portfolio / My Resume / Contact Me / Lock Screen / Restart Portfolio), and the
  right side gained a status-icon cluster: Wifi, Battery (both decorative, matching real
  macOS's menu bar), a Control Center trigger, and a Spotlight trigger, alongside the
  existing clock.
- `ControlCenter.tsx` — new. Glassmorphic popover (Wifi/Bluetooth/Focus toggles +
  brightness/volume sliders) — **purely decorative**, no toggle is wired to anything
  real, it exists for visual authenticity only.
- `SpotlightSearch.tsx` — new. Cmd/Ctrl+K or the menu-bar icon opens a centered search
  overlay that filters `APP_REGISTRY` by title, arrow-key navigation + Enter to launch.
  Actually functional (unlike Control Center) — launches real app windows.
- **New shared UI-overlay state**, `store.ts`: `uiOverlay: "none" | "appleMenu" |
  "spotlight" | "controlCenter"` + `setUiOverlay()`, so only one of {Apple menu, Control
  Center, Spotlight} can be open at a time and `Desktop.tsx`'s global Escape handler can
  close whichever is open *before* falling through to closing the focused window (checked
  in that order — overlay first, window second). Cmd/Ctrl+K toggling also lives in that
  same `Desktop.tsx` keydown handler.
- Lint gotcha hit while building `SpotlightSearch.tsx`: resetting `query`/`activeIndex`
  when the overlay opens needs to happen as a **render-time state adjustment**, not
  inside a `useEffect` (trips `react-hooks/set-state-in-effect`) — and this project's
  eslint config also forbids reading/writing `ref.current` during render (trips
  `react-hooks/refs`), so the "compare against a ref to detect a prop change" pattern
  doesn't work here either. The fix that satisfies both: track the previous `open` value
  in **`useState`**, not `useRef`, and compare+reset inline in the render body (`if (open
  !== wasOpen) { setWasOpen(open); ...reset... }`). Apply this pattern for any future
  "reset state when a prop/store value changes" need in this codebase.

**6b. Tiling window manager — dock apps now fill the desktop as resizable puzzle
frames**, replacing the free-floating draggable/overlapping windows from Milestone 1.
Clarified the design with the user first (this was flagged in the 2026-08-14 queue as
needing a real conversation, not a guess) — confirmed: multiple apps tile simultaneously
(not one full-bleed app at a time), the grid **dynamically reflows** as apps open/close
(not fixed quadrant slots), and dividers between tiles are **draggable to resize**
(dragging position is gone — tiles can't be freely moved, only resized via dividers).
- **Layout algorithm: master-stack**, same shape as dwm/i3's default tiling layout. The
  first-opened window is the "master" pane (full height, width set by `masterRatio`,
  default 0.55); every window opened after it stacks in the remaining column, each sized
  by a matching entry in `stackRatios` (parallel array, always sums to 1, reset to even
  split whenever the stack's window count changes — custom per-window resize doesn't
  survive a window opening/closing, which is an accepted trade-off, not a bug).
- `store.ts` rewritten: `WindowState` (in `types.ts`) dropped `position`/`size`/
  `isMaximized`/`zIndex` entirely — geometry is now computed by layout, not stored per
  window, and there's no overlap so z-order is meaningless. Added `tileOrder: WindowId[]`
  (master-stack order), `masterRatio`, `stackRatios`, and `maximizedId: WindowId | null`
  (only one window can be "zoomed" to fill the whole tiling area at a time — this is what
  the green traffic-light button now does, replacing the old per-window maximize).
  `openWindow(id)` now handles all three cases uniformly (not-open → create + append to
  stack; minimized → restore + re-append; already-tiled → just focus) — this let
  `Dock.tsx` simplify to always calling `openWindow(id)` instead of branching between
  `openWindow`/`focusWindow` based on whether the app was already running.
- **`defaultSize`/`AppDefinition.defaultSize` and `PROJECT_WINDOW_SIZE` were deleted
  outright** (not left as unused dead code) — tiling geometry doesn't take app-requested
  sizes into account at all, so these had no remaining purpose. Six call sites
  (`Dock.tsx`, `MenuBar.tsx`, `SpotlightSearch.tsx`, `DesktopIcons.tsx`, `Desktop.tsx`,
  `ProjectsFinder.tsx`) simplified from `openWindow(id, { size: ... })` to `openWindow(id)`
  accordingly. If a future app genuinely needs a size/aspect-ratio hint for its content,
  that's a new, narrower concept to design — don't just resurrect `defaultSize`.
- `TilingLayout.tsx` — new, replaces the old `windows.map(...)` block in `Desktop.tsx`.
  Computes tile rects as percentages of a container spanning `left-4 right-4 top-10
  bottom-24` (below the menu bar, above the dock). Divider drag handlers use
  `useDesktopStore.getState()`/`.setState()` directly inside the `pointermove` listener
  (not a closure over a value captured at drag-start) — each move event needs the
  *latest* ratio, and a normal captured closure would go stale across events. When
  `maximizedId` is set, the zoomed window's rect overrides to full-container and every
  *other* tiled window gets `hidden` (opacity 0 + `pointer-events: none`) **while staying
  mounted** at its normal grid position — this preserves component state (e.g. Skills'
  typewriter effect wouldn't need to replay) across zoom/unzoom, and means unzooming is
  just a fade back in with no layout recompute needed.
- `Window.tsx` rewritten: no more Framer Motion `drag`/`dragControls`/position tracking.
  Receives a computed `rect` (left/top/width/height as %) and `hidden` boolean as props;
  uses Framer Motion's `layout` prop so tiles animate smoothly between rect changes when
  the grid reflows (open/close/zoom), for free. A `GAP` constant (5px) insets each tile's
  rendered box slightly so adjacent tiles read as separate bento-style cards rather than
  edge-to-edge panels. `WindowTitleBar.tsx`'s drag-start prop became a plain `onFocus`
  (click-to-focus only, no drag).
- **Not yet visually verified** — see "Current Status" above, the browser tool wouldn't
  connect this session. The drag-divider math (`e.movementX`/`movementY` accumulated via
  direct store reads) is the part most worth double-checking by actually dragging a
  divider in a real browser before trusting it further.

**6c. Lock screen replaces the hero video entirely.** The user raised, mid-session, that
the Veo-generated hero video's quality wasn't what they'd hoped, and proposed scrapping
it for a macOS-style lock screen (username/password/loading, ~3s, into the desktop) to
solve both the quality problem and get a cooler entry moment. Recommended this approach
(sidesteps the video-quality ceiling entirely, stays on-brand with the macOS desktop
theme already built) with one adjustment — use a **static photo** as the lock-screen
avatar so the user's face requirement from the original hero concept isn't lost. User
confirmed: build it now, and delete the old hero pipeline rather than leaving it dormant.
Two design questions were worth clarifying before building (both would've meant a redo if
guessed wrong): whether the password is auto-typed (cinematic, can't strand a visitor) or
manually typed by the visitor (**user chose this — manual**), and whether to delete vs.
keep-but-disconnect the old hero code (**user chose delete**).
- Avatar/background source: reused `public/frames/hero/frame-049.webp` (the same
  "clean looking-at-camera" frame Milestone 4 had already identified as the strongest
  static shot) rather than asking the user for a new photo — copied to
  `public/lockscreen/background.webp` (full-bleed lock-screen background, used crisp/
  unblurred so the face stays sharp, matching the original "make my face visible" intent)
  and cropped via ffmpeg (`crop=640:640:240:0,scale=320:320`) to
  `public/lockscreen/avatar.jpg` for the circular avatar.
- `src/components/lockscreen/LockScreen.tsx` — new. macOS-login-window layout: large
  clock top, circular avatar + "Koppesh P" name, a real password `<input type="password">`
  (placeholder "Enter Password"), submit arrow button. Wrong password → shake animation
  (`x` keyframes via Framer Motion, respects `usePrefersReducedMotion`) + field clears;
  correct password (`"koppeshiscool"`) → ~1.9s "Unlocking…" spinner state, then calls
  `onUnlocked()`. **A visible "Show hint" toggle reveals the password on click** — since
  the user chose manual typing over auto-type, this was the reasonable middle ground to
  keep it an interactive gimmick without silently gatekeeping the whole site behind a
  guessing game a recruiter visiting the site has no way to win otherwise.
- `src/components/PortfolioExperience.tsx` — new top-level orchestrator, replaces
  `HeroExperience.tsx`. Reuses the exact cover/reveal dip-to-black transition pattern
  proven out in the old Milestone 5 rounds 2/4 (plain `setTimeout` matched to
  `COVER_DURATION_MS`/`REVEAL_DURATION_MS`, **not** `onAnimationComplete` — see the old
  Milestone 3/4 gotcha notes above for why that callback isn't trustworthy here) — same
  `desktopMounted`-once / `desktopActive`-toggle split as before, just triggered by
  discrete unlock/lock actions instead of scroll position. A new `lockToken: number` +
  `requestLock()` pair in `store.ts` lets the Apple menu's new "Lock Screen" item trigger
  the reverse transition (desktop → lock screen) from deep inside the component tree
  without prop-drilling; `PortfolioExperience` watches `lockToken` and calls the same
  `startTransition()` the unlock flow uses.
- **The entire old hero pipeline was deleted** (confirmed via `git ls-files` that none of
  it was ever committed — this was all still-uncommitted work from the same session it
  was built in, so there was nothing to lose from a VCS standpoint): `src/components/
  hero/` (all 8 files), `src/lib/hooks/useIsMobileHero.ts`, `scripts/extract-frames.sh`,
  `public/frames/hero/` (120 frames + manifest), `public/video/hero-mobile.mp4`, and the
  `gsap` npm dependency (`npm uninstall gsap`). `usePrefersReducedMotion.ts` was **kept**
  — still used by `DesktopWallpaper.tsx` and elsewhere, not hero-specific.
- `src/app/page.tsx` now renders `<PortfolioExperience />` instead of `<HeroExperience
  />`. `globals.css`'s scroll-hiding rule (which existed for the old always-live page
  scroll) was replaced with `html, body { height: 100%; overflow: hidden }` — there is no
  more page-level scroll anywhere in the app; the lock screen and desktop are both fixed
  full-viewport layers, and window content scrolls within its own pane only.
- Verified via `npx tsc --noEmit`, `npm run lint`, and `npm run build` — all clean after
  every step of this rework (wallpaper, tiling, and lock-screen changes were each
  verified independently before moving to the next). **Not yet checked in a real
  browser** — see "Current Status" at the top of this file.

**Round 7** (2026-08-15, same day as round 6): the user came back with follow-up
feedback right after round 6 landed, then said "I'll go eat lunch and come, just do
whatever you can" — explicit permission to keep making judgment calls solo rather than
stopping to ask, so the choices below were made without further confirmation and are
flagged here for review rather than having been pre-approved individually. Four asks:

1. **"Where can I check the portfolio"** — answered directly (`http://localhost:3000`,
   dev server already running), no code change.

2. **Bring back a scroll-triggered intro in front of the lock screen** ("I want the
   initial intro section and then when scrolled there should be the lockscreen page and
   then type password -> then desktop view"). Rebuilt `IntroSection.tsx` (deleted in
   round 6) at `src/components/intro/IntroSection.tsx`, plus a new
   `src/components/intro/StarfieldBackground.tsx` (smaller/simpler reimplementation of
   the round-4 original, which was deleted with the rest of `components/hero/`).
   **Deliberate design choice, not directly requested:** rather than reintroducing real
   document-scroll-position tracking (the thing that caused the round-2/round-4 reverse-
   scroll bugs this project already fought through once), the intro is a `fixed`
   full-viewport screen and "scrolling" is a one-shot **advance trigger** — a `wheel`
   event past a small delta threshold, a swipe-up (`touchstart`/`touchend` delta), 
   `ArrowDown`/`PageDown`/`Space`, or clicking the "Scroll to continue" cue all just call
   `onAdvance()` once (guarded by a `firedRef` so only the first trigger counts). There is
   no scroll position to get out of sync, no GSAP, and no way back into the intro once
   left (matches real usage — nobody expects to scroll back up out of a macOS login
   screen into a splash screen). If this reads as insufficiently "scroll-like" to the
   user, the fix is tuning `ADVANCE_WHEEL_THRESHOLD` or feel, not rearchitecting — don't
   reach for real scroll-position tracking again without a concrete reason, given the
   history here.
   - `PortfolioExperience.tsx` rewritten from a 2-phase (locked/desktop) to a 3-phase
     (`"intro" | "locked" | "desktop"`) state machine, same `goTo(next)` + cover/reveal
     transition pattern as round 6, just generalized to three states instead of two.
     `IntroSection`'s `onAdvance` calls `goTo("locked")`; everything else (unlock →
     desktop, Apple menu Lock Screen → locked) is unchanged from round 6.

3. **Desktop icons should cover the full app set, "more cool and realistic."**
   `DesktopIcons.tsx` grew from 3 hand-picked apps to all 8, generated directly from
   `APP_ORDER`/`APP_REGISTRY` (a `LABEL_OVERRIDES` map only for "Resume.pdf") instead of a
   separately maintained list — stays in sync automatically if apps are ever added or
   renamed. Layout switched to a CSS grid (`grid-flow-col grid-rows-4`) so 8 icons wrap
   into 2 columns of 4 rather than one long column, closer to how Finder auto-arranges a
   full desktop. Click-to-select / double-click-to-open behavior is unchanged from round
   6 — the user's phrasing ("should also be clickable at the same time") was interpreted
   as confirming/emphasizing the existing interaction should stay intact while the icon
   set grows, not as a request for a different click model (e.g. single-click-to-open);
   worth confirming that reading was right next session.

4. **Lock-screen avatar → placeholder, real photo coming later** ("i need my photo do be
   the dp profile which i will provide later so use placeholder for now"). The round-6
   avatar used `frame-049.webp` (a frame from the old Veo hero video) cropped to a face
   closeup. Replaced with a generic placeholder — a `lucide-react` `User` silhouette on
   the site's existing sky→indigo gradient (same gradient as the "KP" transition badge
   elsewhere) — since a recognizable AI-generated face crop read as more "final" than a
   placeholder should, given the user explicitly said a real photo is coming. **Judgment
   call, not explicitly specified:** the lock-screen *background* (`background.webp`,
   same source frame, wider desk shot, not a face closeup) was left as-is — "dp" (a
   common term for profile/display picture) was read as referring specifically to the
   circular avatar, not the atmospheric background behind it. If the user meant to swap
   the background too, that's a quick follow-up (`public/lockscreen/background.webp`).
   Deleted the now-unused `public/lockscreen/avatar.jpg` rather than leaving it dead.

Verified via `npx tsc --noEmit`, `npm run lint`, `npm run build` — all clean (one `tsc`
error surfaced and was fixed along the way: nested closures in
`StarfieldBackground.tsx`'s canvas setup didn't retain TypeScript's null-narrowing on
`canvas`/`ctx` from the outer scope — fixed by rebinding to explicitly-typed consts
right after the null checks, before the closures that capture them; a general pattern
worth reusing if this shape of error shows up again in future canvas/ref code). **Not
yet checked in a real browser** — see "Current Status" at the top of this file, same
extension-connectivity issue as round 6, tried again and still no connection.

**Round 8** (2026-08-15, same day again): the user tried the site (or at least reasoned
about it closely enough to catch a real bug) and came back with three fixes before
stepping away again for other work.

1. **Desktop icons were unclickable — real bug, not a misreading.** Root cause:
   `TilingLayout.tsx`'s outer container (`absolute left-4 right-4 top-10 bottom-24`) has
   no background and often no visible content, but it's still a sized, positioned element
   painted *after* `DesktopIcons`/`WidgetStack` in `Desktop.tsx`'s DOM order — and an
   empty transparent div with default `pointer-events: auto` still intercepts clicks over
   its whole box, even where nothing is rendered inside it. `DesktopIcons`' grid (left-6
   top-14) sits entirely inside that box, so every click on a desktop icon was being
   silently swallowed by the invisible tiling container sitting on top of it. Fix: the
   container is now `pointer-events-none`, with the two divider `<div>`s (master-split and
   stack-split) individually opting back in via `pointer-events-auto` — `Window.tsx`
   already set `pointerEvents` inline per-window, so it needed no change. **This bug class
   is worth remembering**: an absolutely-positioned div with real dimensions blocks clicks
   to whatever's underneath by default, whether or not it has visible content — any future
   full-area overlay container in this codebase should default to `pointer-events-none`
   and have interactive children opt back in explicitly, not the other way around.

2. **Window/tile text contrast fixed.** The real macOS wallpaper photo (round 6) had very
   bright regions (white/pink/orange diagonal band), and window chrome was only a 40%
   dark tint (`bg-zinc-900/40`) with blur — bright wallpaper was bleeding through enough
   to wash out title-bar and content text in places. `Window.tsx`'s background bumped to
   `bg-zinc-900/75` (glassy but no longer wallpaper-brightness-dependent),
   `WindowTitleBar.tsx`'s strip darkened from a near-invisible `bg-white/[0.04]` to
   `bg-black/25`, and its title text bumped from `text-white/80` to `text-white/95` with a
   subtle text-shadow as a second line of defense. This is now robust regardless of what's
   behind a window, which matters doubly now that the wallpaper changed again (see next).

3. **Wallpaper swapped a second time**, per explicit user request: "switch it up to make
   the wallpaper with the framer element i pasted before the cursor hover element" —
   referring back to the Framer "Starfield Motion" reference from Milestone 5 round 4,
   which by round 6 already existed in this codebase as `StarfieldBackground.tsx` (used by
   the intro). Rather than duplicate it, relocated it from `components/intro/` to a shared
   `src/components/backgrounds/StarfieldBackground.tsx` and now both `IntroSection` and
   `DesktopWallpaper` import the same component — the desktop and the intro now share one
   consistent, cool, cursor-reactive background instead of two different ones. This also
   conveniently resolves the round-6 copyright flag on the real Apple wallpaper photo
   (deleted `public/wallpaper/desktop.jpg`, no longer referenced) and the brightness issue
   from fix #2 above at the root, not just papered over it.
   - **Also added, same request:** the user's name + a short description centered on the
     wallpaper, "like part of the wallpaper" — low-opacity (`text-white/[0.14]` /
     `/[0.12]`), `pointer-events-none`, painted as the very first layer in `Desktop.tsx` so
     icons/windows naturally sit on top of it, same as any real desktop background. Not
     interactive, not selectable as an icon — purely decorative, matching how the user
     described it ("part of the wallpaper", not a widget).
   - **Judgment call, not explicitly specified:** the user's message read as offering two
     options ("add name+description to the current wallpaper" *or* "switch to the
     Starfield element") rather than clearly picking one — read this as a soft preference
     for the second (the phrasing leads with "or switch it up to... **and make it more
     cool**", and a cursor-reactive dark starfield is a more fitting "cool" upgrade than
     text laid over a static bright photo), so built both pieces together on the new
     starfield background rather than asking to confirm. Worth a quick sanity check next
     session that this matches what they had in mind.

Verified via `npx tsc --noEmit`, `npm run lint`, `npm run build` — all clean. **Still not
visually verified in a browser** — the extension wouldn't connect on this attempt either
(the fourth across rounds 6-8, see "Current Status" at the top of this file). Given that
round 8 exists *because* a previous round's un-browser-tested code had a real bug, treat
round 8's own changes with the same skepticism until someone actually clicks through them.

**Round 9** (2026-08-15, same day, brief): the user reversed the round-6 decision on
manual vs. auto-type unlock — explicitly asked for just this one change, said everything
else (more text animations/elements, more GitHub projects with images) is for later.
`LockScreen.tsx` rewritten: no more real `<input>`/`<form>`, no wrong-password/shake
logic, no hint button — all of that only existed because password entry was manual. Now
a pure scripted sequence: `START_DELAY_MS` (500ms) pause → password dots appear one at a
time (`TYPE_SPEED_MS` 75ms/char, a local typed-length effect, same pattern as
`SkillsApp.tsx`'s `useTypewriter`, just not extracted to a shared hook since this is the
only other caller) → `SUBMIT_PAUSE_MS` (350ms) → `UNLOCKING_DURATION_MS` (1200ms) spinner
→ `onUnlocked()`. Total lock-screen time is back down to ~2.5s before the cover/reveal
transition, close to the original "~3s" ask now that there's no visitor input to wait on.
`prefersReducedMotion` skips the char-by-char animation and jumps straight to a filled
field after the initial pause. Verified via `tsc`/`lint`/`build` — all clean (one lint
fix needed: the reduced-motion branch's `setTypedLength` call had to move inside the
`setTimeout` callback, not sit directly in the effect body, to avoid the
`react-hooks/set-state-in-effect` rule — same class of fix as `SpotlightSearch.tsx` in
round 6, worth remembering as a recurring pattern in this codebase). **Not yet
browser-verified** — fifth failed connection attempt this session, see "Current Status."

### 6. Accessibility & performance pass — ⏳ PARTIALLY STARTED
Done: ARIA labels on dock icons/traffic-light buttons/windows (`role="dialog"`,
`aria-label`), Escape-to-close. `prefers-reduced-motion` fallback path exists and works
(verified). Not done: keyboard focus trapping/tab order review, Lighthouse run,
mobile-device real-hardware check, bundle size review, color-contrast check on the
`backdrop-blur` window chrome over busy wallpaper.

### 7. Deploy — ⏳ NOT STARTED
Needs the user's own GitHub + Vercel accounts (can't be done autonomously — requires
their login). Repo is already a local git repo (created by `create-next-app`) but has
not been pushed anywhere yet, and no commits have been made beyond the initial
scaffold commit (per instructions, only commit when the user explicitly asks).

## Key files map (for fast orientation in a new session)

```
src/
  app/page.tsx, layout.tsx          — entry point, renders <PortfolioExperience/>
  components/PortfolioExperience.tsx — top-level orchestrator (Milestone 5 round 6):
                                       lock screen ↔ desktop, cover/reveal transition
  content/resume.ts, types.ts       — ALL resume content, single source of truth
  components/intro/IntroSection.tsx — scroll/wheel/key-triggered landing screen (round 7,
                                       rebuilt after round 6 deleted the original)
  components/backgrounds/StarfieldBackground.tsx — cursor-reactive canvas starfield
                                       (round 7, moved here in round 8 once
                                       DesktopWallpaper.tsx became a second caller);
                                       shared by IntroSection and DesktopWallpaper
  components/lockscreen/LockScreen.tsx — macOS-style login screen (round 6), replaces
                                       the entire old components/hero/ pipeline (deleted).
                                       Avatar is a placeholder (round 7) pending the
                                       user's real profile photo.
  components/desktop/               — window manager UI (see Milestone 1) +
                                       DesktopWallpaper.tsx (round 8 — cursor-reactive
                                       starfield + centered name/description baked in,
                                       replacing round 6's real Apple wallpaper photo,
                                       which is deleted; round 5's original-gradient
                                       version is a copyright-safe fallback if the
                                       starfield ever needs revisiting) +
                                       DesktopIcons.tsx (round 6, left side; round 7 grew
                                       it from 3 to all 8 apps in a wrapping grid) + widgets/
                                       (ClockWidget, CalendarWidget, WeatherWidget,
                                       WidgetStack — round 5, right side, z-0, below
                                       window z-index range on purpose) + MenuBar.tsx
                                       (round 6 — Apple menu dropdown, Control Center +
                                       Spotlight triggers) + ControlCenter.tsx,
                                       SpotlightSearch.tsx (round 6, both new) +
                                       TilingLayout.tsx (round 6 — master-stack tiling
                                       layout engine, replaces free-floating windows) +
                                       Window.tsx (round 6 — rewritten for tiling, no more
                                       drag, takes a computed `rect` prop).
                                       Desktop.tsx takes an `active` prop (Milestone 5
                                       round 2) — stays mounted permanently once first
                                       shown, toggles z-30/-z-10 + pointer-events instead
                                       of unmounting.
  components/apps/                  — the 8 resume-section app components (see Milestone 2)
  components/icons/BrandIcons.tsx   — custom GitHub/LinkedIn SVGs (lucide-react lacks them)
  lib/window-manager/store.ts       — Zustand: window/tiling state (tileOrder,
                                       masterRatio, stackRatios, maximizedId) + shared UI
                                       overlay state (uiOverlay, lockToken) — round 6
  lib/window-manager/app-registry.tsx — dock app id → {icon,title,Component}, +
                                         resolveWindowDefinition() for dynamic project windows
  lib/hooks/usePrefersReducedMotion.ts — the only survivor of the old hero hooks; still
                                       used by DesktopWallpaper.tsx, LockScreen.tsx, etc.
public/lockscreen/background.webp   — lock-screen background (round 6, derived from the
                                       old hero pipeline's frame-049.webp) — avatar.jpg
                                       (the cropped-face version) was deleted in round 7
                                       once the avatar became a placeholder
public/resume.pdf                   — his real resume PDF
```

## Known non-issues (don't "fix" these if you see them again)

- `pnpm` isn't installed on this machine; the project uses npm instead of the plan's
  original pnpm recommendation. Not a bug.
- The `useIsMobileHero`/`usePrefersReducedMotion` eslint-disable comments on the initial
  `setState` call are intentional (SSR hydration-mismatch avoidance), not sloppy code.
- `AppDefinition.id` is typed `string` (not the `AppId` union) specifically so dynamic
  `project-<id>` window ids can share the same type — intentional, not a typing gap.
- When testing hero scroll behavior via the claude-in-chrome browser tool: it has
  occasionally shown flaky symptoms unrelated to the app (screenshot dimensions randomly
  shrinking to a stale/cropped size, `resize_window` silently not changing viewport
  width, a `javascript_exec` false-positive "cookie/query string" block on innocuous
  strings, and the extension itself disconnecting mid-session). If a screenshot looks
  wrong, re-call `tabs_context_mcp` and retry before assuming it's an app bug — but don't
  over-apply this: both the Milestone 5 `removeChild` crash and the round-2 bidirectional
  scroll bug were real (confirmed via console error messages / explicit debug logging,
  not just a bad screenshot).
- `TRANSITION_COOLDOWN_MS` no longer exists (it was `HeroExperience.tsx`-only, to ignore
  GSAP scrub-settling-jitter re-triggers) — `PortfolioExperience.tsx`'s cover/reveal
  transition is now driven by discrete clicks (unlock, Lock Screen menu item), which
  can't jitter-retrigger the way continuous scroll position could, so no cooldown guard
  is needed there. Don't re-add one without a concrete reason.
- 2026-08-15 session: the claude-in-chrome browser extension would not connect
  (`tabs_context_mcp` returned "not connected") on repeated attempts, so round 6's
  desktop/tiling/lock-screen changes only got `tsc`/`lint`/`build` verification, not a
  real browser check. If this happens again, try restarting Chrome first (per the tool's
  own error message) before assuming it's an app bug.
