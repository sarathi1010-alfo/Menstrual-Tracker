# Internal Linking Map - 2026-07-12 (Cycle Fundamentals)

This document outlines the internal linking strategy implemented for today's content engine deployment to maximize semantic authority and user flow.

## 1. Hub & Spoke Structure

- **Main Hub:** `/blog` (Index Page)
- **Primary Spoke:** `menstrual-cycle-101` (Cluster Pillar)
- **Sub-Spokes:** All other articles.

## 2. Anchor Text Strategy

| Source Page | Target Page | Anchor Text Used | Purpose |
| :--- | :--- | :--- | :--- |
| All Blog Articles | `/tracker` | "LunaCycle Tracker", "Visual Calendar", "Daily Log" | Conversion / Utility |
| All Blog Articles | `/features` | "privacy-first tracker", "local-only app" | Trust / USP Reinforcement |
| `menstrual-cycle-101` | `how-to-track-your-cycle` | "How to Track Your Cycle" | Sequential learning |
| `how-to-track-your-cycle` | `/tools/next-period-predictor` | "Next Period Predictor" | Tool integration |
| `cycle-phases-explained` | `what-is-ovulation` | "ovulation" | Concept clarification |
| `pcos-and-cycle-tracking` | `/tracker` | "LunaCycle history" | Data application |
| `cycle-tracking-for-teens` | `menstrual-cycle-101` | "milestone" | Foundational context |
| `lunacycle-vs-flo` | `/tracker` | "LunaCycle Tracker" | Conversion |
| `lunacycle-vs-clue` | `/features` | "features of LunaCycle" | Trust |

## 3. Navigation Links

- **Navbar:** Updated 'Blog' to point to `/blog` (previously `/guides`).
- **Footer:** Retains links to key tools and legal pages.
- **Related Articles:** Each blog post sidebar includes 3 contextually relevant links based on shared tags.

## 4. External/Ecosystem Links

- All mentions of brand name "LunaCycle" link to the homepage or `/tracker`.
- Footer maintains links to `alfo.online` ecosystem tools.

## 5. Audit Checklist (Completed)

- [x] No broken internal links.
- [x] All articles link back to the main tracker tool.
- [x] All articles link to the privacy features page.
- [x] Breadcrumbs/Back-links lead to `/blog`.
- [x] Semantic clusters are tightly linked via tags and related content blocks.
