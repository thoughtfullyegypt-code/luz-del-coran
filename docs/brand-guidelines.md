# Brand Guidelines v1.0 — Luz del Corán / Light of the Quran

> Status: Official Brand Identity & Design System Specification  
> Domain: EdTech · Sacred Quranic Pedagogy · Bilingual (Spanish & English)  
> Audience: Hispanic & English-speaking Muslim reverts, children, and adult learners worldwide.

---

## Quick Reference

| Element | Value |
|---------|-------|
| Primary Color | #059669 |
| Secondary Color | #0F172A |
| Accent Color | #D97706 |
| Primary Font | Plus Jakarta Sans |
| Sacred Font | Amiri |
| Voice | Patient, Dignified, Pedagogically Clear |

---

## 1. Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Primary Emerald | #059669 | rgb(5,150,105) | Primary brand color, CTAs, headers, active highlights |
| Primary Dark | #047857 | rgb(4,120,87) | Hover states, focus outlines, high-contrast accents |
| Primary Light | #ECFDF5 | rgb(236,253,245) | Light tag pills, subtle surface tints |

### Secondary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Secondary Slate | #0F172A | rgb(15,23,42) | Headlines, bold titles, footer background |
| Secondary Dark | #020617 | rgb(2,6,23) | Deepest contrast background |
| Secondary Light | #334155 | rgb(51,65,85) | Readable paragraph copy, feature descriptions |

### Accent Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Accent Amber | #D97706 | rgb(217,119,6) | Badges, calligraphic highlights, guarantee seals |
| Accent Dark | #B45309 | rgb(180,83,9) | Dark amber contrast borders |
| Accent Light | #FEF3C7 | rgb(254,243,199) | Light accent pills, celebration highlights |

### Neutral Palette

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Background | #F8FAFC | rgb(248,250,252) | Warm porcelain canvas background |
| Surface | #FFFFFF | rgb(255,255,255) | Cards, modals, containers |
| Text Primary | #0F172A | rgb(15,23,42) | High-contrast headings and labels |
| Text Secondary | #334155 | rgb(51,65,85) | Readable body text |
| Border | #E2E8F0 | rgb(226,232,240) | Card borders, dividers |

### Accessibility Ratios (WCAG 2.1 AA Compliant)
- Slate Heading (`#0F172A`) on Porcelain (`#F8FAFC`): **16.8:1** (Exceeds AAA)
- Slate Body (`#334155`) on White (`#FFFFFF`): **9.6:1** (Exceeds AAA)
- Emerald CTA (`#059669`) on White text (`#FFFFFF`): **4.6:1** (Passes AA for UI & bold text)
- Emerald Dark (`#047857`) on White text (`#FFFFFF`): **5.9:1** (Exceeds AA)

---

## 2. Typography

### Font Stack

```css
--font-heading: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
--font-body: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
--font-arabic: 'Amiri', 'Scheherazade New', serif;
--font-serif: 'Cinzel', serif;
```

### Type Scale

| Element | Size (Desktop) | Size (Mobile) | Weight | Line Height |
|---------|----------------|---------------|--------|-------------|
| H1 (Hero Title) | 52px | 34px | 800 | 1.15 |
| H2 (Section Title) | 38px | 28px | 700 | 1.25 |
| H3 (Card Header) | 24px | 20px | 700 | 1.3 |
| Arabic Verses | 28px | 22px | 700 | 1.8 |
| Body Text | 16px | 15px | 400 | 1.6 |
| Small / Badges | 13px | 12px | 600 | 1.4 |
| Micro / Captions | 11px | 10px | 500 | 1.3 |

---

## 3. Logo & Crest Usage Guidelines

### 3.1 Official Crest Mark (`assets/logo.svg`)
- **Symbolism:**
  1. **Academic Shield:** Deep emerald field (`#065F46` to `#022C22`) bordered by bright emerald stroke (`#10B981`), symbolizing protection and pedagogical authority.
  2. **Golden Crescent & Morning Star:** Warm illumination gold (`#FEF08A` to `#CA8A04`), representing divine light and guidance.
  3. **Illuminated Open Manuscript:** Pure white and porcelain pages with an emerald bookmark ribbon, representing the Quran preserved and transmitted.

### 3.2 Variants
- **Full Horizontal:** Academic crest + "Luz del Corán" / "Light of the Quran" + "1 a 1" tag + "ESPAÑOL & ENGLISH ACADEMY".
- **Stacked / Badge:** Crest centered above typography for square containers or social avatars.
- **Icon Only:** 120x120px crest for favicon and mobile navigation.

### 3.3 Clear Space & Minimum Sizes
- **Clear Space:** Minimum clearance around the crest equals 25% of the mark's height.
- **Minimum Digital Size:** 32px height for favicon; 44px height for header navigation.

---

## 4. Voice, Tone & Messaging

### Core Attributes

| Attribute | Description |
|-----------|-------------|
| **Patient Mentorship** | Unrushed one-on-one pacing designed for learners starting from zero. |
| **Authentic Pedagogy** | Traditional Tajweed correction through modern live digital video and voice notes. |
| **Bilingual Mastery** | Seamless instruction in native Spanish and English for multicultural families. |
| **Absolute Transparency** | Flat $100 USD/month tuition, flexible scheduling, and 100% money-back guarantee. |

### Brand Personality

| Trait | Description | Do | Don't |
|-------|-------------|-----|-------|
| **Patient** | Warm, encouraging, reassuring; celebrating small phonetic milestones. | "Take your time with the exit point of the ‘Ayn letter." | "You are pronouncing this wrong again." |
| **Dignified** | Reverent towards the sacred text, academic and cultured. | "Master the noble art of Quranic recitation." | "Learn Quran fast with our quick hacks!" |
| **Clear** | Methodical, anatomical guidance on tongue and throat positions. | "Touch the back of your tongue to the soft palate." | "Just listen and try to repeat somehow." |
| **Approachable** | Welcoming to reverts and children from all cultural backgrounds. | "Whether this is your very first Arabic letter or you seek fluency..." | "This course is only for people who already read Arabic." |

### Prohibited Terms

| Prohibited Term | Approved Replacement |
|-----------------|----------------------|
| Cheap Quran classes | Accessible flat tuition |
| Guaranteed fluency in 7 days | Structured learning at your own pace |
| Automated AI teacher | Dedicated personal Ustadz 1-on-1 |
| No refunds under any circumstance | 100% satisfaction money-back guarantee |

---

## 5. Imagery & Visual Assets

### Base Prompt Template
```
Clean modern edtech photograph of an open Holy Quran manuscript with elegant Arabic calligraphy in natural soft daylight, resting on a clean wooden book stand (rihal), warm minimalist academic study room with subtle greenery in the background, high resolution, hyper-realistic, peaceful atmosphere, no dark neon or glowing effects.
```

### Style Keywords
| Category | Keywords |
|----------|----------|
| **Lighting** | Soft natural morning light, clean ambient daylight, gentle studio illumination |
| **Composition** | Minimalist, balanced, generous white space, focal clarity on sacred manuscript |
| **Aesthetics** | Modern academic, authentic Islamic heritage, dignified emerald accents, porcelain warmth |

### Visual Mood Descriptors
- Dignified and scholarly yet warm and approachable
- Clean, bright, and uncluttered (Preply / Coursera EdTech benchmark)
- Emotionally reassuring for students feeling intimidated by learning Arabic
- Authentic traditional calligraphy with high contrast and crisp Tashkeel

### Visual Don'ts
| Avoid | Reason |
|-------|--------|
| Glowing neon orbs or lasers | Looks like sci-fi crypto / gaming templates |
| Dark murky obsidian backgrounds | Intimidating, difficult to read, unacademic |
| Distorted or stretched typography | Disrespectful to sacred Arabic letterforms |
| Crowded, cluttered layouts | Causes cognitive overload for beginner students |

---

## 6. Business Offer & Pricing Specifications

- **Tuition Fee:** $100.00 USD / month (or €92.00 EUR / month).
- **Format:** 2 one-hour private 1-on-1 sessions per week (8 hours/month total live tutoring).
- **Communication:** WhatsApp voice note pronunciations for between-class feedback.
- **Trial:** 20-minute free diagnostic assessment session.
- **Guarantee:** 100% money-back satisfaction guarantee after first class.
