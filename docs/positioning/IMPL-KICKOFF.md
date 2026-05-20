# Implementation Kickoff: Homepage Positioning (P1 + P2 + P3 bundled)

**Drafted:** 2026-05-19. Revised twice on 2026-05-20: first for dedicated-page approach, then to bundle P3 with P1+P2 using the locked messaging system.
**Branch to create:** `feat/positioning-impl-p1-p2-p3` (fresh, off latest `origin/main`).
**Scope:** Phase P1 (new `/for-ai-work/` page + small homepage callout + nav link) + Phase P2 (new `/values/index.html` page with seven commitments) + Phase P3 (replace sub-hero with locked copy + add secondary depth line + relocate ⌥ Space microcopy). P4 (blog post) remains out of scope; SEO workstream is a separate follow-up PR.

**Source of truth for all copy:** `docs/positioning/messaging-system.html`. This kickoff references locked strings by name; the actual strings live in that doc. If a string in this kickoff appears to differ from the messaging system, the messaging system wins.

---

## Reference links

- **Plan dashboard:** `../positioning-architecture.html`. the layered architecture doc. Read end-to-end before doing anything.
- **Live homepage:** `../../index.html`. where P1 changes land.
- **Privacy page (style reference for P2):** `../../privacy/index.html`. clone visual conventions for `/values/`.
- **CSS tokens:** `../../css/tokens.css`. colors, spacing, type scale.
- **CSS layout/components:** `../../css/layout.css`, `../../css/components.css`.

---

## State summary

- Planning PRs already merged into `main`: PR #8 (initial architecture doc), plus a second commit revising the architecture for dedicated-page approach + L4 corrections.
- This kickoff session is the first IMPLEMENTATION session. Architecture + messaging are locked. No `index.html` changes have shipped yet.
- Messaging system doc lives at `docs/positioning/messaging-system.html` on the `feat/messaging-system-doc` branch (currently in PR review). If that branch is still unmerged when this kickoff fires, branch the impl off it. If merged into main, branch off main directly.

---

## Critical pre-work (read before writing code)

1. **Read `docs/positioning/messaging-system.html` end-to-end.** This is the source of truth for every string you will write. Note especially: the locked sub-hero, the locked D1 depth line, the locked tagline T-A, the seven commitments referenced from positioning-architecture L4, and the "Things we will NOT say" guardrails section.
2. Read `docs/positioning-architecture.html` for context on WHY these choices were made and what was considered. Do not copy strings from this doc; use messaging-system as source.
3. Read `index.html` from the hero down through `#review` and `#privacy` so you understand the existing structure. Your work touches: (a) the hero sub-hero text and the microcopy strip below it, (b) a new callout section between `#review` and `#privacy`, (c) the nav.
4. Read `privacy/index.html` end-to-end. It is the style template for both `/for-ai-work/index.html` and `/values/index.html`.
5. Check `css/components.css` and `css/layout.css` for `.section`, `.hero__*`, `.privacy__*`, `.container`, `.nav__links` classes you'll reuse.

---

## What to build

### P1: New `/for-ai-work/` page + homepage callout + nav link

Three parts.

**Part A. New file `for-ai-work/index.html`.** Mirror the head meta, schema, header, footer, and visual chrome of `privacy/index.html`.

Page metadata:
- `<title>For AI-augmented work · ThoughtMic</title>`
- `og:title`: *For AI-augmented work · ThoughtMic*
- `og:description`: *Your AI conversations are your reasoning. Capture them in your vault, query them across providers.*
- Canonical: `https://thoughtmic.com/for-ai-work/`

Page content (use exactly these strings):

- **H1:** *Your AI conversations are your reasoning. They shouldn't live in someone else's database.*
- **First paragraph (Long form from messaging-system.html with one tweak for context):** *You spend hours a day talking through ideas with Claude, Codex, Cursor, Gemini. Each chat closes and your reasoning is gone, scattered across providers, unsearchable in your own life.*
- **Second paragraph:** *Hold ⌥ Space, speak the thought, and it lands as Markdown in your vault before the AI replies. Query it back through MCP from any compatible client. Whatever assistant you use this year or next, your thinking stays portable, searchable, and yours.*
- **Three supporting bullets (cards in a row desktop, stacked mobile):**
  - **Cross-provider memory.** Works with any MCP client. Claude Desktop today, the next thing tomorrow.
  - **Captured at the speed of thought.** Sub-3-second capture; the thought is in your vault before you've finished talking.
  - **Stays on your filesystem.** No cloud lock-in. Cancel ThoughtMic and your notes don't leave.
- **Closing CTA:** link back to homepage waitlist (`/#waitlist`) with text "Join the waitlist".

**Part B. Homepage callout section.** Insert a new compact section in `index.html` between the existing `#review` section and the existing `#privacy` section. Tight vertical spacing (`padding-block` around 56px, smaller than full `--section-y`).

Callout content:
- Single line: *Building with Claude, Cursor, or Codex? Your reasoning belongs in your vault, not in their chat history.*
- One CTA link: *See how ThoughtMic captures AI-augmented work →* pointing to `/for-ai-work/`.

Use existing `.container` wrapper. Centered text. No card chrome; transitional cross-link, not a hero section.

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

### P3: Sub-hero replacement + secondary depth line + shortcut relocation

Three edits in `index.html`, all in the hero area.

**Part A. Replace the sub-hero copy.** Find the existing hero subtitle paragraph in the `<section class="hero">` block. Current copy: *"The local voice layer for your Markdown vault. Press ⌥ Space anywhere on your Mac, speak, and your thoughts land as titled, tagged, linked notes, ready for inbox review and queryable from Claude."* Replace with the locked sub-hero from `messaging-system.html` section `#sub-hero`:

> *Capture thoughts without typing. Your words land at your cursor, and a structured note lands in your vault.*

**Part B. Add the secondary depth line below the sub-hero.** Directly below the replaced sub-hero paragraph, insert the locked D1 depth line from `messaging-system.html` section `#depth-line`:

> *Auto-titled, tagged, and connected to thoughts you've already saved with [[wikilinks]]. Your graph grows itself.*

Visual treatment per `messaging-system.html` section `#depth-visual`: 16-18px, regular weight (400), muted text color, ~12-16px gap above, ~32-40px gap below. The `[[wikilinks]]` glyph renders in monospace with a subtle forest tint and a very soft `--accent-soft` background at low opacity.

**Part C. Relocate `⌥ Space` microcopy.** The shortcut is removed from the sub-hero. It now lives in three places per `messaging-system.html` section `#shortcut`:

1. **Hero deck card 01 label.** Add `⌥ Space` next to "01 · You spoke" in the existing recording card markup.
2. **Microcopy strip below D1.** A small line: *"Activates with ⌥ Space anywhere on your Mac."* Lives in the same compat-strip area as the existing "Lands in Obsidian / Logseq" line. Same weight and color as that strip.
3. **Demo video poster overlay.** Add a keystroke caption to the demo poster image. If poster image edit is out of scope for this session, leave a TODO comment and proceed.

Do not touch: hero H1, hero CTAs, hero deck cards 02 and 03, the "How it feels" video section, the pillars section, the review section, the privacy section, pricing, starter vault, or footer body. P3 is hero-area-only.

---

## Definition of done

- Branch `feat/positioning-impl-p1-p2-p3` contains three commits: one for P1 (Parts A, B, C), one for P2, one for P3 (Parts A, B, C). Independent revertability per phase.
- `index.html` validates as well-formed HTML (no broken tags, no missing closing elements).
- New `for-ai-work/index.html` and `values/index.html` exist, validate, and render correctly when opened via `file://` and via a local server (`python3 -m http.server`) from the repo root.
- Nav links render correctly on desktop and at 375px mobile width. No layout breakage. Nav order: Features, Privacy, For AI work, Values, Pricing, Join waitlist.
- No em-dashes or en-dashes anywhere in NEW copy. Audit with `grep -nE '—|–' index.html for-ai-work/index.html values/index.html`. (Existing copy in unchanged sections may contain them; only audit the lines you wrote.)
- No new colors, no new fonts, no new spacing scales. Everything uses `css/tokens.css`.
- "Things we will NOT say" guardrails from `messaging-system.html#dont-say` honored: no "AI-powered," no "revolutionary," no naming Wispr/Superwhisper defensively, no cloud-provider names, no unvalidated habit claims, no "simply" or "just," no "second brain" as primary descriptor.
- A draft PR opened against `main` with description linking to both `positioning-architecture.html` and `messaging-system.html`.

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
You are executing the bundled P1 + P2 + P3 homepage positioning implementation for ThoughtMic.com. All copy comes from `docs/positioning/messaging-system.html` (the source of truth). Architecture context is in `docs/positioning-architecture.html`. This kickoff is at `docs/positioning/IMPL-KICKOFF.md`.

Create a fresh branch `feat/positioning-impl-p1-p2-p3` off latest origin/main. Verify with `git status` AFTER creating it (the branch may switch on you between operations; check before every commit).

Read these files in full before writing anything:
1. `docs/positioning/messaging-system.html`: source of truth for every locked string
2. `docs/positioning-architecture.html`: context on why these choices were made
3. `docs/positioning/IMPL-KICKOFF.md`: this kickoff
4. `index.html`: current homepage; hero, nav, area around #review and #privacy
5. `privacy/index.html`: visual style template for both new pages
6. `css/tokens.css`, `css/layout.css`, `css/components.css`

Execute three phases as three separate commits.

P1. Three parts (one commit).
  Part A: Create `for-ai-work/index.html` mirroring the chrome of `privacy/index.html`. Page content (H1, two paragraphs, three bullet cards, closing CTA) per IMPL-KICKOFF.md Part A. Title "For AI-augmented work · ThoughtMic". Canonical `https://thoughtmic.com/for-ai-work/`.
  Part B: In `index.html`, insert a callout section between `#review` and `#privacy`. Single line + CTA link per IMPL-KICKOFF.md Part B. Compact spacing (padding-block around 56px).
  Part C: Add `<li>` to `.nav__links` for "For AI work" between Privacy and Pricing, anchor `/for-ai-work/`.

P2. One commit.
  Create `values/index.html` mirroring the chrome of `privacy/index.html`. H1 "Our values". Sub "Seven commitments we made before we launched. They are not predictions about users. They are promises about us." Body is the seven commitments from `docs/positioning-architecture.html` section `#layer-4` verbatim. Title "Our values · ThoughtMic". Canonical `https://thoughtmic.com/values/`.
  Add `<li>` for `/values/` between "For AI work" and Pricing in `.nav__links`. Add a footer link to `/values/` matching existing footer conventions.

P3. Three parts (one commit). Hero-area edits in `index.html` only.
  Part A: Replace the existing hero sub-hero paragraph (the one currently containing "The local voice layer for your Markdown vault. Press ⌥ Space anywhere on your Mac, speak, and your thoughts land as titled, tagged, linked notes...") with the locked sub-hero from `messaging-system.html#sub-hero`: "Capture thoughts without typing. Your words land at your cursor, and a structured note lands in your vault."
  Part B: Directly below the new sub-hero, add a paragraph with the locked D1 depth line from `messaging-system.html#depth-line`: "Auto-titled, tagged, and connected to thoughts you've already saved with [[wikilinks]]. Your graph grows itself." Visual treatment per `messaging-system.html#depth-visual` (16-18px, regular weight, muted color, ~12-16px gap above, ~32-40px gap below; `[[wikilinks]]` glyph in monospace with subtle forest tint and very soft `--accent-soft` background).
  Part C: Relocate ⌥ Space per `messaging-system.html#shortcut`: (1) add ⌥ Space to the hero deck card 01 label next to "01 · You spoke"; (2) add a microcopy line below D1 saying "Activates with ⌥ Space anywhere on your Mac"; (3) demo video poster overlay caption may be a TODO if poster image edits are out of scope.

Constraints:
- No em-dashes or en-dashes anywhere in NEW copy. Audit with `grep -nE '—|–' index.html for-ai-work/index.html values/index.html` before committing each phase.
- No new colors, fonts, or spacing scales. Reference `css/tokens.css` exclusively.
- Do not touch the logo SVG or logo animation CSS.
- Do not modify pillars, review, privacy, pricing, starter-vault, or footer body beyond the surgical additions above.
- Honor every guardrail in `messaging-system.html#dont-say` for any NEW copy you write outside the locked strings.
- Three commits, one per phase, conventional commit message format (feat(positioning): scope).
- Verify branch with `git status` before each `git commit`.

Definition of done:
- All three files (`index.html`, `for-ai-work/index.html`, `values/index.html`) validate as HTML.
- Visual smoke test passes via `python3 -m http.server` from repo root: confirm at 1280px desktop and 375px mobile.
- Grep audit returns no em-dashes / en-dashes in new copy lines.
- Three commits on `feat/positioning-impl-p1-p2-p3`. Branch pushed. Draft PR opened against `main` linking to both `docs/positioning-architecture.html` and `docs/positioning/messaging-system.html`.

When done, post the PR URL and a verification punch-list: files changed, commit SHAs, viewports confirmed, grep audit output.
```
