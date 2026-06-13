# Implementation Plan: Private AI-Assisted Cycle Intelligence

## 1. Core Positioning & Branding

*   **Shift from "Basic Utility" to "Private AI-Assisted Cycle Intelligence":**
    *   The app should not feel like a database or form. It should feel like a personal, intelligent, and deeply secure space.
    *   **Trust Badge:** Prominently display a trust badge on the homepage and within settings.
        *   *Copy:* "Private by design · Works offline · Your data stays on device"
        *   *Secondary Copy:* "100% local storage. No cloud sync. No tracking. No ads. No account required."

*   **Emotional Micro-copy:**
    *   *Empty State:* "Your private space is ready. Log your first day to start building your cycle intelligence."
    *   *Prediction Nudge:* "Your body's rhythm is shifting. Your next cycle is likely approaching in 3 days."
    *   *Encouragement:* "You logged 5 days in a row! Taking time for yourself matters."

## 2. Design Language Overhaul (UI/UX)

*   **Aesthetic Guidelines:**
    *   *Palette:* Soft lavender (`#E6E6FA`), muted pink (`#FFB6C1`), warm neutrals (`#F5F5DC`, `#FAF9F6`), and deep, calming dark tones for text (`#2C3E50`) rather than stark black.
    *   *Typography:* Elegant, editorial serif headings paired with clean, readable sans-serif body text.
    *   *Shapes & Spacing:* Generous whitespace, distinctly rounded corners on cards (`border-radius: 24px`), soft, diffuse shadows (`box-shadow: 0 10px 40px -10px rgba(0,0,0,0.08)`), and subtle gradients.
    *   *Icons:* Minimal, stroke-based icons. Avoid aggressive, clinical, or overly technical iconography.

## 3. Data Models for Local Storage (TypeScript)

*   *Rule: All data is stored strictly in `localStorage` via Context APIs. No backend.*

```typescript
// types.ts
export type FlowIntensity = 'light' | 'medium' | 'heavy' | 'spotting';
export type Mood = 'calm' | 'anxious' | 'sad' | 'happy' | 'irritable' | 'energetic';
export type Symptom = 'cramps' | 'headache' | 'bloating' | 'fatigue' | 'acne' | 'tender_breasts';

export interface DailyLog {
  id: string; // YYYY-MM-DD format for easy querying
  date: string; // ISO string
  flow?: FlowIntensity;
  moods?: Mood[];
  symptoms?: Symptom[];
  energyLevel?: 1 | 2 | 3 | 4 | 5;
  sleepHours?: number;
  notes?: string;
}

export interface Cycle {
  id: string;
  startDate: string; // ISO string
  endDate?: string;  // ISO string
  length?: number;   // Calculated days
}

export interface AppSettings {
  stealthModeEnabled: boolean;
  passcodeEnabled: boolean;
  passcodeHash?: string;
  notificationsEnabled: boolean;
  onboardingCompleted: boolean;
}
```

## 4. Offline-First Smart Prediction Engine (Pseudo-Code)

*   *Core Logic:* Uses weighted averages to adapt quickly to recent changes while maintaining historical stability.

```typescript
// predictionEngine.ts
const RECENT_CYCLE_WEIGHT = 0.6;
const HISTORICAL_CYCLE_WEIGHT = 0.4;
const DEFAULT_CYCLE_LENGTH = 28;

function calculatePredictedCycleLength(cycles: Cycle[]): number {
  if (cycles.length === 0) return DEFAULT_CYCLE_LENGTH;
  if (cycles.length === 1) return cycles[0].length || DEFAULT_CYCLE_LENGTH;

  // Sort cycles by date descending (newest first)
  const sortedCycles = [...cycles].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

  // Calculate average of last 3 cycles (recent trend)
  const recentCycles = sortedCycles.slice(0, 3);
  const recentAvg = recentCycles.reduce((sum, c) => sum + (c.length || DEFAULT_CYCLE_LENGTH), 0) / recentCycles.length;

  // Calculate overall historical average
  const historicalAvg = cycles.reduce((sum, c) => sum + (c.length || DEFAULT_CYCLE_LENGTH), 0) / cycles.length;

  // Weighted calculation
  return Math.round((recentAvg * RECENT_CYCLE_WEIGHT) + (historicalAvg * HISTORICAL_CYCLE_WEIGHT));
}

function generatePatternInsights(cycles: Cycle[], logs: DailyLog[]): string[] {
  const insights: string[] = [];

  // Rule 1: Cycle variance
  if (cycles.length >= 3) {
    const recentLengths = cycles.slice(0, 3).map(c => c.length || 0);
    const variance = Math.max(...recentLengths) - Math.min(...recentLengths);
    if (variance > 7) {
      insights.push("Your cycle length has shown higher than average variation recently. This is normal, but worth noting.");
    } else if (variance <= 2) {
      insights.push("Your cycle has been highly consistent over the last few months.");
    }
  }

  // Rule 2: Symptom correlations (e.g., mood dips before cycle)
  // ... logic to check logs 1-3 days prior to cycle startDate for specific moods

  return insights;
}
```

## 5. Component Breakdown

*   **`VisualDashboard`:**
    *   `CurrentCycleRing`: A circular SVG visualization showing the current phase (menstruation, follicular, ovulation, luteal).
    *   `InsightCards`: Swipable or grid layout cards displaying the outputs of `generatePatternInsights()`.
    *   `TrendGraph`: A custom SVG line chart showing cycle length variations over the last 6-12 months.
*   **`DailyJournal`:**
    *   `DateSelector`: A horizontal scrolling calendar strip.
    *   `QuickLogPills`: Tap-to-toggle buttons for Moods, Symptoms, and Flow. Soft haptic feedback (if possible via web APIs) or visual pop.
    *   `EnergySlider`: A smooth, custom slider for daily energy levels.
*   **`HealthReportGenerator`:**
    *   A hidden component that renders a printable HTML layout summarizing the last 6 months of data, utilizing `window.print()` to allow the user to save as PDF natively without a backend PDF generation library.

## 6. Progressive Web App (PWA) Setup Instructions

1.  **Generate Assets:** Create high-quality icons (192x192, 512x512, maskable icons) reflecting the calming brand identity.
2.  **`manifest.json`:**
    *   Place in `public/` directory.
    *   Set `display: "standalone"`, `theme_color: "#FAFAF8"`, `background_color: "#FAFAF8"`.
    *   Name: "Cycle Intelligence" (or the stealth mode name if configured dynamically, though manifest is static, so choose a discreet default like "C-Intel" for short name).
3.  **Service Worker (`sw.js` or via `next-pwa`):**
    *   Configure to aggressively cache all static assets (HTML, CSS, JS, Fonts).
    *   Implement an offline fallback page, though the app should fully function offline anyway due to local storage.
4.  **Meta Tags:** Add required `<meta name="theme-color" ...>` and Apple touch icon links to `app/layout.tsx`.

## 7. SEO Strategy & Page Templates

*   **Approach:** Programmatic SEO (pSEO) targeting long-tail, intent-driven queries. Use Next.js static generation (`generateStaticParams`).
*   **Template Concept (`app/tools/[tool]/page.tsx`):**
    *   *Hero:* H1 aligned with query (e.g., "Free Private Ovulation Calculator").
    *   *Interactive Widget:* A lightweight, stateless React component specific to the tool (e.g., date picker -> calculated date).
    *   *Content Block (SGE/AEO Optimized):*
        *   "What is an ovulation calculator?" (Direct answer paragraph).
        *   "How we calculate it" (Transparency, structured list).
        *   "Privacy Promise" (Trust badge integration).
    *   *Schema:* Comprehensive `FAQPage` and `SoftwareApplication` JSON-LD.
*   **Target Keywords / Tools:**
    *   `/tools/cycle-length-calculator`
    *   `/tools/ovulation-prediction`
    *   `/tools/pms-symptom-tracker`
    *   `/tools/fertility-window-calculator`

## 8. Anonymous Safe Mode & Notifications

*   **Safe Mode:**
    *   Implement a lock screen overlay component that checks `AppSettings.passcodeEnabled`.
    *   If enabled, require a 4-digit PIN before rendering the main `Layout`.
    *   *Stealth Mode:* Allow user to toggle an option that changes the generic in-app branding to something entirely ambiguous (e.g., "Daily Notes") and hides explicit cycle terminology from the main dashboard until a specific gesture is performed.
*   **Local Notifications:**
    *   Request `Notification.requestPermission()`.
    *   Use the Service Worker to schedule local notifications based on calculated predicted dates.
    *   *Example:* Schedule a notification 2 days before predicted start: "Your cycle is approaching. Take time to rest." (Keep text vague to protect privacy on lock screens).
