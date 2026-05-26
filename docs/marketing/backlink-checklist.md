# Backlink & indexing checklist

**Purpose:** flip ThoughtMic's "Crawled / Discovered – currently not indexed" pages (16 of 21 as of 2026-05-26) into **Indexed**, and build the domain authority that earns expanded sitelinks over time.

This is a **prioritization layer on top of `launch-playbook.html`** — it doesn't repeat the channel copy or how-to (that lives in the playbook). Each row points to the playbook section that tells you *how*. Work top-down; tier 0 is this week.

> **Source of truth:** the [v1 launch sprint](https://github.com/thoughtmic/app/blob/main/docs/v1-launch-sprint.html) (`docs/v1-launch-sprint.html` in the `thoughtmic/app` repo) is the authority for launch scope, timing, and sequencing. This checklist derives from it — if the two ever disagree, **the sprint wins**.
>
> Companion docs (this repo): `launch-playbook.html` (channels, copy, pitch templates) · `x-prelaunch.html` (the 4-post X cadence).

---

## How links actually work (60-second primer — read once)

A brand-new domain doesn't get pages indexed because Google doesn't yet trust it's a real, active entity. Two things change that:

1. **Direct link equity** — only **dofollow** editorial links pass it (a blogger/newsletter/podcast linking you from their own site). This is the scarce, valuable kind.
2. **Discovery + entity + referral signals** — even **nofollow** links (social, directories, Reddit, HN, Product Hunt) tell Google "this brand is real, linked-to, and getting traffic." For the *indexing* goal specifically, this still helps a new site — don't dismiss nofollow at this stage.

**The mechanism that matters most:** a nofollow placement (Show HN, PH, a subreddit) gets seen by someone who runs a dofollow site, and *they* write you up. You're not chasing the tweet; you're chasing the person who reads it.

**Link-type legend:** 🟢 dofollow editorial · 🟡 nofollow but high discovery/entity value · ⚪ entity/brand signal only

---

## Tier 0 — This week (highest leverage, lowest effort)

| ☐ | Action | Type | Effort | Playbook ref |
|---|--------|------|--------|--------------|
| ☐ | **Request indexing in GSC** for: `/`, 3 guides, 5 `/vs/*`, `/values`, `/starter-vault` (URL Inspection → Request Indexing) | direct nudge | 15 min | — |
| ☐ | Confirm **sitemap submitted** + Search Console verified | direct | 5 min | Launch day › prerequisites |
| ☐ | **GitHub**: repo description + profile README link to thoughtmic.com; add topics (obsidian, voice-to-text, macos, pkm) | ⚪ | 15 min | already in `sameAs` ✅ |
| ☐ | **Product Hunt "Coming Soon"** page live | 🟡 | ~25 min | Tier 1 › ProductHunt (Coming Soon) |
| ☐ | List on **alternative.to**, **SaaSHub**, **IndieHackers Products** | 🟡 | ~55 min total | Tier 1: high-ROI pre-launch directories |

*Why tier 0:* requesting indexing is the only lever that directly pokes Google, and the directories are fast, permanent entity signals you want in place *before* launch traffic arrives.

---

## Tier 1 — Launch moment (the backlink-generating events)

These are mostly nofollow, but a launch that lands is what *triggers* the dofollow editorial wave in Tier 2. Concentrate them on one day.

| ☐ | Action | Type | Playbook ref |
|---|--------|------|--------------|
| ☐ | **Show HN** post | 🟡 → 🟢 if it hits front page | Launch day › Show HN |
| ☐ | **Product Hunt** launch (not just coming-soon) | 🟡 → 🟢 secondary coverage | Launch day › ProductHunt launch day |
| ☐ | **r/ObsidianMD** (most important), then r/PKMS, r/macapps, r/Mac | 🟡 | Launch day › Reddit |
| ☐ | **X launch thread** from @thoughtmic + personal quote-tweet | 🟡 | Launch day › Twitter/X · `x-prelaunch.html` |
| ☐ | **IndieHackers ship** milestone post | 🟡 | Launch day › IndieHackers ship |

*Rule:* don't spread these across a week. Same-day concentration is what produces a front-page/leaderboard spike, which is what bloggers notice.

---

## Tier 2 — Real dofollow authority (post-launch, ongoing — this is the juice)

This tier is where pages actually get indexed and rankings build. Slower, higher value.

| ☐ | Action | Type | Playbook ref |
|---|--------|------|--------------|
| ☐ | **Newsletter pitches** (PKM / productivity / Mac-tools newsletters) | 🟢 | Post-launch › Newsletter pitches |
| ☐ | **Podcast pitches** — show-notes links | 🟢 | Post-launch › Podcast pitches |
| ☐ | **Blogger / press pitches** — the editorial links that matter most | 🟢 | Post-launch › Press/blogger pitches |
| ☐ | **Obsidian `awesome-*` GitHub lists** + community-plugins/showcase + forum "Share & showcase" | 🟡/🟢 | *(gap — not yet in playbook)* |
| ☐ | **YouTube** channel + one demo video ("voice notes in Obsidian"); embed on `/starter-vault` or homepage | ⚪ → 🟢 | *(gap — not yet in playbook)* |
| ☐ | **Crunchbase** + **Wellfound** company profiles | ⚪ entity | Tier 2 directories |

*Why YouTube is here, not socials:* the product is demonstrable, video ranks in Google SERPs, and tutorials match search intent. It's the one "social" worth real effort for this audience (see the Instagram/TikTok note — those are low-fit).

---

## Tier 3 — Maintenance & entity hygiene

| ☐ | Action | Cadence |
|---|--------|---------|
| ☐ | Keep `sameAs` in homepage Organization schema in sync as profiles go live (have: GitHub, X — add: YouTube, Product Hunt, Crunchbase, Bluesky) | as created |
| ☐ | Cross-post launch content to **Bluesky / Mastodon** (indie-tech crowd) | launch + ongoing |
| ☐ | **Re-check GSC Page Indexing** — expect the not-indexed count to fall on its own | every 2–4 weeks |
| ☐ | Run a free backlink check (e.g. Ahrefs Webmaster Tools, free tier) to see which links Google has registered | monthly |

---

## Honest expectations

- The 3 `noindex` pages (`/buy`, `/activate`, `/recover-license`) are **intentional** — they should never be indexed. Ignore them in the GSC count.
- "Crawled – currently not indexed" is **normal for a days-old domain**, not a bug. There is no on-site fix — it resolves with authority + time.
- Realistic timeline: meaningful index growth in **2–4 weeks** after launch; expanded sitelinks (the Wispr-Flow look) are a **months-out** outcome of sustained authority, not a switch.
- Don't add `noindex`, change canonicals, or restructure URLs to "help" — the site is technically clean (audited 2026-05-26). Changing it only resets the clock.

---

## Measurement — what success looks like

- **GSC Page Indexing:** Indexed count climbing toward 17; "Crawled/Discovered – not indexed" shrinking.
- **GSC Performance:** brand query `thoughtmic` showing impressions → then the brand SERP cleaning up (favicon + site name → first sitelinks).
- **Referring domains** (backlink checker): any net-new dofollow domains from Tier 2 outreach.
