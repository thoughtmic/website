# Implementation Kickoff: Homepage Positioning Architecture (P1 + P2)

**Drafted:** 2026-05-19
**Branch:** `feat/positioning-copy-draft` (already exists, branched off `origin/main`)
**Scope:** Phase P1 (new AI-augmented section in `index.html`) + Phase P2 (new `/values/index.html` page). P3 (sub-hero tighten) and P4 (blog post) are out of scope for this kickoff.

---

## Reference links

- **Plan dashboard:** `../positioning-architecture.html`. the layered architecture doc. Read end-to-end before doing anything.
- **Live homepage:** `../../index.html`. where P1 changes land.
- **Privacy page (style reference for P2):** `../../privacy/index.html`. clone visual conventions for `/values/`.
- **CSS tokens:** `../../css/tokens.css`. colors, spacing, type scale.
- **CSS layout/components:** `../../css/layout.css`, `../../css/components.css`.

---

## State summary

- Branch `feat/positioning-copy-draft` already created off `origin/main`. Working tree clean.
- Plan HTML committed at `docs/positioning-architecture.html`.
- Parallel work `feat/p9-logo-animation` exists in this repo. It touches the logo SVG and animation CSS. **Do not** touch those areas (`assets/logo*.svg`, any keyframe blocks named `*logo*` or `*animation*`).
- No P1 / P2 implementation has shipped yet. This kickoff is the first execution session.

---

## Critical pre-work (read before writing code)

1. Read `docs/positioning-architecture.html` end-to-end. Specifically the L3 "For developers thinking out loud" section copy and the L4 seven commitments. Those are the source of truth for the strings to insert.
2. Read `index.html` from the start of `<section class="section" id="features">` through the start of `<section class="section" id="review">` to understand the existing pillars block and the section that follows. Your new section goes between them.
3. Read `privacy/index.html` end-to-end. It is the style template for `/values/index.html`.
4. Check `css/components.css` for `.section`, `.pillars__*`, `.privacy__*` classes you'll reuse / mirror.

---

## What to build

### P1: New AI-augmented section in `index.html`

Insert a new `<section>` between the existing `#features` pillars section and the existing `#review` section. Use anchor `id="ai-augmented"`.

Content (verbatim from the plan, do not paraphrase):

- **Section H2:** *Your AI conversations are your reasoning. They shouldn't live in someone else's database.*
- **First paragraph:** *You spend hours a day talking through ideas with Claude, Codex, Cursor, Gemini. Each chat closes and your reasoning is gone, scattered across providers, unsearchable in your own life.*
- **Second paragraph:** *Hold ⌥ Space, speak the thought, and it lands as Markdown in your vault before the AI replies. Query it back through MCP from any compatible client. Whatever assistant you use this year or next, your thinking stays portable, searchable, and yours.*
- **Three supporting bullets:**
  - **Cross-provider memory.** Works with any MCP client. Claude Desktop today, the next thing tomorrow.
  - **Captured at the speed of thought.** Sub-3-second capture; the thought is in your vault before you've finished talking.
  - **Stays on your filesystem.** No cloud lock-in. Cancel ThoughtMic and your notes don't leave.

Visual treatment: reuse existing `.section` container + `.container` wrapper. Match typographic conventions of the existing `#review` section (which has a centered, narrow-measure treatment) since this section is text-heavy and benefits from the same restraint. Three bullets render as a horizontal row of mini-cards on desktop, stacked on mobile.

Nav: add a new `<li>` to `.nav__links` with anchor `#ai-augmented`. Label: *For AI work* (short enough to fit alongside *Features* / *Privacy* / *Pricing*).

### P2: New `/values/index.html` page

New file: `values/index.html`. Mirror the file structure, head meta, schema.org bits, and visual chrome (header, footer, container, section spacing) of `privacy/index.html`. Different content.

Page metadata:
- `<title>Our values · ThoughtMic</title>`
- `og:title`: *Our values · ThoughtMic*
- `og:description`: *Seven commitments we made before we launched. They are not predictions about users. They are promises about us.*
- Canonical: `https://thoughtmic.com/values/`

Page content:

- **H1:** *Our values*
- **Sub:** *Seven commitments we made before we launched. They are not predictions about users. They are promises about us.*
- **Seven commitments, in order, verbatim from the plan's L4 section.** Each commitment renders as a card with a bold lead phrase and a paragraph below. Do not add commentary, "learn more" links, or extra ornament between commitments. The list is the page.

Nav update: insert a `<li>` for the values page in `.nav__links`, between Privacy and Pricing. Anchor: `/values/`.

Footer update: add a link to `/values/` in the existing footer link list. Match existing footer link conventions.

---

## Definition of done

- Branch `feat/positioning-copy-draft` contains commits for P1 and P2 (separate commits preferred so each phase can be reverted independently).
- `index.html` validates as well-formed HTML (no broken tags, no missing closing elements).
- New `/values/index.html` exists, validates, and renders correctly when opened via `file://` and via a local server (`python3 -m http.server`) from the repo root.
- Nav links render correctly on desktop and at 375px mobile width. No layout breakage.
- No em-dashes anywhere in the new copy. (Audit with `grep -nE '—|–' index.html values/index.html`.)
- No new colors, no new fonts, no new spacing scales introduced. Everything uses `tokens.css`.
- Logo SVG, logo animation CSS, anything in `feat/p9-logo-animation` not touched.
- A draft PR is opened against `main` with the plan HTML linked in the PR description.

---

## Out of scope

- P3 sub-hero tightening (defer; ships after P1 / P2 land safely).
- P4 blog post.
- Any change to existing pillars copy.
- Any change to hero copy or hero deck cards.
- Any change to pricing, privacy, or review sections.
- Any change to logo SVG or logo animation.
- Any new images, videos, or media assets.
- Any A/B testing instrumentation.

---

## Verbatim prompt

Copy everything below this line into a fresh Claude Code session, run from the website repo root.

---

```
You are executing the homepage positioning architecture for ThoughtMic. The plan lives at `docs/positioning-architecture.html` in this repo. Branch `feat/positioning-copy-draft` is already created off `origin/main` and is the branch you will work on.

Scope: Phase P1 (new AI-augmented section in index.html) and Phase P2 (new /values/index.html page). Out of scope: P3 sub-hero tightening, P4 blog post, any other site changes.

Read these files in full before writing anything:
1. `docs/positioning-architecture.html`. the plan and the source of truth for all copy
2. `docs/positioning/IMPL-KICKOFF.md`. this kickoff (which you are following)
3. `index.html`. current homepage; specifically the area between `id="features"` and `id="review"`, and the nav
4. `privacy/index.html`. visual style template for the new values page
5. `css/tokens.css`, `css/layout.css`, `css/components.css`. design tokens and existing class conventions

Execute:

P1. In `index.html`, insert a new section with `id="ai-augmented"` between the existing `#features` pillars section and the existing `#review` section. Content comes verbatim from the plan's Layer 3 "For developers thinking out loud" recommended option, including the H2, both paragraphs, and the three supporting bullets. Reuse existing `.section` and `.container` classes. Match the centered narrow-measure treatment used by the `#review` section. Bullets render as a horizontal row on desktop, stacked on mobile. Add a nav link with label "For AI work" to `.nav__links`, anchor `#ai-augmented`.

P2. Create a new file `values/index.html`. Mirror the head meta, schema, header, footer, and visual chrome of `privacy/index.html`. Page content is the seven commitments from the plan's Layer 4 section, verbatim, each as a card with a bold lead phrase and a paragraph. H1 "Our values". Sub "Seven commitments we made before we launched. They are not predictions about users. They are promises about us." Set title "Our values · ThoughtMic" and canonical URL. Add a nav link to `/values/` between Privacy and Pricing in `.nav__links`. Add a footer link.

Constraints:
- No em-dashes anywhere. Use periods, commas, colons, parentheses. Audit with `grep -nE '—|–' index.html values/index.html` before committing.
- No new colors, fonts, or spacing scales. Everything must reference `tokens.css`.
- Do not touch the logo SVG, logo animation CSS, or anything that belongs to the parallel `feat/p9-logo-animation` branch.
- Do not modify the hero, pillars, review, privacy, pricing, or starter-vault sections beyond inserting the new section and adding nav links.
- Separate commits for P1 and P2 so each can be reverted independently.

Definition of done:
- `index.html` and `values/index.html` validate as well-formed HTML.
- Visual smoke test passes via `python3 -m http.server` from the repo root: desktop (1280px wide) and mobile (375px wide).
- `grep -nE '—|–' index.html values/index.html` returns no matches.
- Two commits exist on `feat/positioning-copy-draft`, one per phase, with conventional commit messages.
- A draft PR is opened against `main`. PR description links to `docs/positioning-architecture.html` and summarizes what shipped.

When done, post the PR URL and a short verification punch-list: files changed, commit SHAs, local-server screenshot paths (or describe what you visually confirmed), and grep audit output.
```
