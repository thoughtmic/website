# ThoughtMic website docs

Internal planning + design docs. Not user-facing.

## How to read these

The HTML docs are styled artifacts — open them in a browser, not a text editor. From the repo root:

```bash
python3 -m http.server
# then visit http://localhost:8000/docs/<file>
```

Or open directly from the filesystem with `file://` if you don't need relative-asset loading.

## Positioning

| Doc | What it is |
|---|---|
| [`positioning-architecture.html`](positioning-architecture.html) | The layered messaging architecture (L1 hero → L4 values) that drove the homepage refactor in PR #11. Contains persona analysis, the seven commitments, validation-gap discipline, and the SEO follow-up workstream. |
| [`positioning/messaging-system.html`](positioning/messaging-system.html) | Source of truth for every locked string on the site — primary tagline (T-A), supporting taglines (T-B, T-E), sub-hero, depth line, medium/long forms, surface map, shortcut placement rules, and the "Things we will NOT say" guardrails. |
| [`positioning/IMPL-KICKOFF.md`](positioning/IMPL-KICKOFF.md) | Historical artifact: the verbatim implementation prompt used to ship PR #11 (P1+P2+P3 bundle). Kept for traceability. |

## Conventions

- HTML docs use inline `<style>` blocks (no shared CSS) so they render the same locally and on any cloned copy.
- Locked strings live in `positioning/messaging-system.html`. If a string in any other doc conflicts with the messaging system, the messaging system wins.
- New planning docs go alongside these. Update this index when you add one.
