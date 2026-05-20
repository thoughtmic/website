# Implementation Kickoff: Homepage Positioning Architecture (P1 + P2)

**Drafted:** 2026-05-19. Revised 2026-05-20 (P1 scope changed: dedicated page + callout + nav, not inline section).
**Branch:** `feat/positioning-copy-draft` (already exists, branched off `origin/main`)
**Scope:** Phase P1 (new `/for-ai-work/` page + small homepage callout + nav link) + Phase P2 (new `/values/index.html` page with seven commitments). P3 (sub-hero tighten) and P4 (blog post) are out of scope for this kickoff. SEO workstream is a separate follow-up PR.

---

## Reference links

- **Plan dashboard:** `../positioning-architecture.html`. the layered architecture doc. Read end-to-end before doing anything.
- **Live homepage:** `../../index.html`. where P1 changes land.
- **Privacy page (style reference for P2):** `../../privacy/index.html`. clone visual conventions for `/values/`.
- **CSS tokens:** `../../css/tokens.css`. colors, spacing, type scale.
- **CSS layout/components:** `../../css/layout.css`, `../../css/components.css`.

---

## State summary

- Branch `feat/positioning-copy-draft` already created off `origin/main` (now fast-forwarded past the merged `feat/p9-logo-animation` PR #7).
- Plan HTML committed at `docs/positioning-architecture.html`. Revised 2026-05-20.
- No P1 / P2 implementation has shipped yet. This kickoff is the first execution session.

---

## Critical pre-work (read before writing code)

1. Read `docs/positioning-architecture.html` end-to-end. Specifically the L3 "For developers thinking out loud" section copy and the L4 seven commitments. Those are the source of truth for the strings to insert.
2. Read `index.html` from the start of `<section class="section" id="features">` through the start of `<section class="section" id="review">` to understand the existing pillars block and the section that follows. Your new section goes between them.
3. Read `privacy/index.html` end-to-end. It is the style template for `/values/index.html`.
4. Check `css/components.css` for `.section`, `.pillars__*`, `.privacy__*` classes you'll reuse / mirror.

---

## What to build

### P1: New `/for-ai-work/` page + homepage callout + nav link

Three changes, all in this repo.

**Part A. New file `for-ai-work/index.html`.** Mirror the head meta, schema, header, footer, and visual chrome of `privacy/index.html` so the new page inherits the existing site's typography, nav, container, and section spacing.

Page metadata:
- `<title>For AI-augmented work · ThoughtMic</title>`
- `og:title`: *For AI-augmented work · ThoughtMic*
- `og:description`: *Your AI conversations are your reasoning. Capture them in your vault, query them across providers.*
- Canonical: `https://thoughtmic.com/for-ai-work/`

Page content (verbatim from the plan, do not paraphrase):

- **H1:** *Your AI conversations are your reasoning. They shouldn't live in someone else's database.*
- **First paragraph:** *You spend hours a day talking through ideas with Claude, Codex, Cursor, Gemini. Each chat closes and your reasoning is gone, scattered across providers, unsearchable in your own life.*
- **Second paragraph:** *Hold ⌥ Space, speak the thought, and it lands as Markdown in your vault before the AI replies. Query it back through MCP from any compatible client. Whatever assistant you use this year or next, your thinking stays portable, searchable, and yours.*
- **Three supporting bullets (render as cards in a row on desktop, stacked on mobile):**
  - **Cross-provider memory.** Works with any MCP client. Claude Desktop today, the next thing tomorrow.
  - **Captured at the speed of thought.** Sub-3-second capture; the thought is in your vault before you've finished talking.
  - **Stays on your filesystem.** No cloud lock-in. Cancel ThoughtMic and your notes don't leave.
- **Closing CTA:** link back to homepage waitlist (`/#waitlist`) with text "Join the waitlist".

**Part B. Homepage callout section.** Insert a new compact section in `index.html` between the existing `#review` section and the existing `#privacy` section. Tight vertical spacing (`padding-block` around 56px, smaller than full `--section-y`).

Callout content:
- Single line: *Building with Claude, Cursor, or Codex? Your reasoning belongs in your vault, not in their chat history.*
- One CTA link: *See how ThoughtMic captures AI-augmented work →* pointing to `/for-ai-work/`.

Use existing `.container` wrapper. Centered text. No card chrome around it; this is a transitional cross-link, not a hero section. Two-line treatment on desktop, three lines on mobile is acceptable.

**Part C. Nav link.** Add a new `<li>` to `.nav__links` in `index.html`, between *Privacy* and *Pricing*. Label: *For AI work*. Anchor: `/for-ai-work/`.

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

Important: the canonical commitment text is in `docs/positioning-architecture.html` under section `#layer-4`. Pull commitments #1 through #7 verbatim from that file. Commitment #4 (AI as utility) and commitment #6 (notes outlive subscription) were revised 2026-05-20; use the current text in the plan, not memory.

Nav update: insert a `<li>` for the values page in `.nav__links`, between *For AI work* (inserted in P1) and *Pricing*. Anchor: `/values/`.

Footer update: add a link to `/values/` in the existing footer link list. Match existing footer link conventions.

---

## Definition of done

- Branch `feat/positioning-copy-draft` contains commits for P1 (Parts A, B, C) and P2 (separate commits preferred so each phase can be reverted independently).
- `index.html` validates as well-formed HTML (no broken tags, no missing closing elements).
- New `for-ai-work/index.html` and `values/index.html` exist, validate, and render correctly when opened via `file://` and via a local server (`python3 -m http.server`) from the repo root.
- Nav links render correctly on desktop and at 375px mobile width. No layout breakage. Nav order: Features, Privacy, For AI work, Pricing, Join waitlist.
- No em-dashes anywhere in the new copy. Audit with `grep -nE '—|–' index.html for-ai-work/index.html values/index.html`.
- No new colors, no new fonts, no new spacing scales introduced. Everything uses `tokens.css`.
- PR #8 updated from draft to ready-for-review when both phases pass the audit.

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

P1. Three parts.
  Part A: Create a new file `for-ai-work/index.html` mirroring the head meta, schema, header, footer, and visual chrome of `privacy/index.html`. Page content is the H1, two paragraphs, and three supporting bullets from the plan's Layer 3 recommended option, verbatim. Bullets render as cards in a row on desktop, stacked on mobile. Closing CTA links back to `/#waitlist`. Title "For AI-augmented work · ThoughtMic". Canonical `https://thoughtmic.com/for-ai-work/`.
  Part B: In `index.html`, insert a small callout section between the existing `#review` section and the existing `#privacy` section. Tight vertical spacing (padding-block around 56px). Single line: "Building with Claude, Cursor, or Codex? Your reasoning belongs in your vault, not in their chat history." One CTA link to `/for-ai-work/` with text "See how ThoughtMic captures AI-augmented work →". Centered, no card chrome.
  Part C: Add a `<li>` to `.nav__links` between Privacy and Pricing. Label "For AI work". Anchor `/for-ai-work/`.

P2. Create a new file `values/index.html`. Mirror the head meta, schema, header, footer, and visual chrome of `privacy/index.html`. Page content is the seven commitments from the plan's Layer 4 section, verbatim. H1 "Our values". Sub "Seven commitments we made before we launched. They are not predictions about users. They are promises about us." Set title "Our values · ThoughtMic" and canonical URL `https://thoughtmic.com/values/`. Add a nav link to `/values/` between "For AI work" (inserted in P1 Part C) and Pricing in `.nav__links`. Add a footer link.

Constraints:
- No em-dashes anywhere. Use periods, commas, colons, parentheses. Audit with `grep -nE '—|–' index.html values/index.html` before committing.
- No new colors, fonts, or spacing scales. Everything must reference `tokens.css`.
- Do not touch the logo SVG, logo animation CSS, or anything that belongs to the parallel `feat/p9-logo-animation` branch.
- Do not modify the hero, pillars, review, privacy, pricing, or starter-vault sections beyond inserting the new section and adding nav links.
- Separate commits for P1 and P2 so each can be reverted independently.

Definition of done:
- `index.html`, `for-ai-work/index.html`, and `values/index.html` all validate as well-formed HTML.
- Visual smoke test passes via `python3 -m http.server` from the repo root: desktop (1280px wide) and mobile (375px wide).
- `grep -nE '—|–' index.html for-ai-work/index.html values/index.html` returns no matches.
- Two commits exist on `feat/positioning-copy-draft`, one for P1 (all three parts) and one for P2, with conventional commit messages.
- PR #8 updated from draft to ready-for-review.

When done, post the PR URL and a short verification punch-list: files changed, commit SHAs, what was visually confirmed at each viewport width, and grep audit output.
```
