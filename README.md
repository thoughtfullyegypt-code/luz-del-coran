# 🌙 Luz del Corán / Light of the Quran

> **Interactive 3D Website and Monthly Subscription Platform for Learning the Holy Quran in Spanish and English.**

---

## 🌟 Brand Identity & Concept

- **Official Name:** **Luz del Corán / Light of the Quran** (*Noor Al-Qur'an*)
- **Subtitle:** *Spanish & English Quran & Tajweed Academy*
- **Slogan:** *«Learn to recite the Holy Quran from scratch, with devotion and in your language»*
- **Target Audience:** Spanish and English speakers worldwide (including converts/reverts, Hispanic Muslim communities, children, and adults seeking 1-on-1 personalized instruction).
- **Instruction Format:** **1-on-1 private live video sessions** (via Zoom or Google Meet).

---

## 💎 The Subscription Plan

- **Monthly Fee:** **$100 USD / month** (or 92 € / month via the built-in currency toggle).
- **Session Frequency:** **2 weekly 1-hour sessions** (8 hours of live individual tutoring per month).
- **What's Included:**
  1. **8 hours/month of private 1-on-1 tutoring** with the Ustadz.
  2. Initial phonetic diagnostic assessment & customized study roadmap.
  3. Free digital Tajweed guide (PDF) with phonetic pronunciation tables in Spanish and English.
  4. Video recordings of each session to review anytime.
  5. **Continuous WhatsApp support**: students can send voice notes for instant pronunciation correction between classes.
  6. Flexible rescheduling with 24 hours notice.
  7. **100% satisfaction guarantee**: full refund after the first session if not completely satisfied.

---

## 🌐 Instant Bilingual Support (Spanish 🇪🇸 & English 🇺🇸)

The website features an instantaneous one-click language toggle located in the navigation bar:
- **`[ 🇪🇸 ES | 🇺🇸 EN ]`**
- Dynamically translates the entire website in real-time with zero page reloads:
  - Navigation links & action buttons.
  - Hero section headline, subtitles, and trust indicators.
  - 3D Quran book cover & page banners (*EL SAGRADO CORÁN* ↔ *THE HOLY QURAN*).
  - Tajweed audio player (verse translations, Surah descriptions, and pedagogical notes).
  - Teacher bio & philosophy.
  - 4-level curriculum roadmap.
  - Pricing cards, breakdown items, and guarantees.
  - Free 20-minute diagnostic session form.
  - Testimonials & FAQs.
  - Multi-step subscription modal & checkout receipts.
  - Pre-filled WhatsApp messages formatted in Spanish or English based on the student's active language!

---

## 🚀 Key Interactive Features

### 1. 📖 Real-Time 3D WebGL Quran & Sacred Geometry
- **Interactive 3D Mushaf:** Rendered in Three.js with procedurally generated Moroccan emerald leather, engraved gold leaf ornaments, and central Islamic medallion (*Shamsa*).
- **Traditional Carved Wooden Stand (Rihl):** Interlocking dark mahogany stand with gold inlays.
- **Full Orbit Controls:** Click/touch and drag to rotate 360°, levitation physics, warm lantern lighting, and **450 floating golden stardust particles**.
- **Mode Toggle:** Switch between closed luxury gold-embossed edition and open reading mode (*Surah Al-Fātiḥah* & *Ayat Al-Kursī*).

### 2. 🎧 Interactive Recitation & Tajweed Studio
- Authentic high-fidelity audio recitations (*Sheikh Mishary Rashid Al-Afasy*).
- Synchronized line-by-line verse breakdown with:
  - Original Arabic calligraphy (*Amiri font*).
  - Guided phonetic transliteration for non-Arabic speakers.
  - Spanish and English translations.
  - Teacher's Tajweed notes (*Ghunnah*, *Qalqalah*, *Madd*, *Ikhfa*).
  - Speed toggle (1.0x normal / 0.75x slow for learning).

### 3. 💳 3-Step Enrollment & Subscription Checkout
- **Step 1 (Student Information):** Full name, email, WhatsApp with country selector, timezone, and current level.
- **Step 2 (Schedule Preferences):** Days selection (Mon/Wed, Tue/Thu, Fri/Sun, Flexible) and time-of-day preference.
- **Step 3 (Payment & Activation):**
  - Simulated 256-bit SSL credit card processing (Stripe-ready with auto-formatting).
  - PayPal.
  - **Instant WhatsApp Confirmation:** Automatically generates a formatted WhatsApp message with the student's full enrollment details directly to the teacher's phone.
- **Confirmation Voucher:** Generates a unique enrollment ID (e.g. `LC-492813`), triggers a celebratory confetti burst, and stores student records in `localStorage`.

---

## ⚙️ How to Personalize for Your Uncle

Everything is easily customized in [`js/config.js`](file:///Users/shehab/Downloads/Quran%20website/js/config.js):

```javascript
window.ACADEMY_CONFIG = {
    // 1. Teacher's WhatsApp number (with country code, no '+' or spaces)
    // Example: Spain: "34612345678" | USA: "13051234567" | Mexico: "5215512345678"
    teacherWhatsAppNumber: "34600000000",

    // 2. Contact Email
    contactEmail: "contact@luzdelcoran.com",

    // 3. Pricing & Structure
    pricing: {
        monthlyUSD: 100, // $100 per month
        monthlyEUR: 92,  // 92 € per month
        sessionsPerWeek: 2, // 2 sessions weekly
        sessionHours: 1,    // 1 hour per session
    },

    // 4. Payment Links (Optional)
    payments: {
        stripePaymentLink: "https://buy.stripe.com/your_link",
        paypalMeUrl: "https://paypal.me/your_account/100usd",
        bizumPhone: "+34 600 000 000"
    }
};
```
*All WhatsApp buttons, floating chat widgets, and enrollment forms automatically sync to this number.*

---

## 💻 How to View Locally

No build tools or Node.js required. Runs natively in any modern browser:

### Option 1: Direct File Open
Double-click [`index.html`](file:///Users/shehab/Downloads/Quran%20website/index.html) in your file manager to open it in Chrome, Safari, or Edge.

### Option 2: Local Python Server
```bash
python3 -m http.server 8080
```
Then navigate to `http://localhost:8080` in your browser.

---

## 🌐 Free 1-Minute Web Deployment

1. **Vercel or Netlify:**
   - Drag and drop this folder directly into [Netlify Drop](https://app.netlify.com/drop) or link it to [Vercel](https://vercel.com) for instant free hosting with SSL.
2. **GitHub Pages:**
   - Push to a GitHub repository and turn on GitHub Pages in `Settings -> Pages`.

---

## 📁 File Structure

```
Quran website/
├── index.html                 # Main responsive landing page & application
├── css/
│   └── style.css              # Custom styles, luxury Islamic theme & animations
├── js/
│   ├── translations.js        # 🌐 Complete Spanish & English translation dictionary
│   ├── config.js              # ⚙️ Central configuration (WhatsApp, price, email)
│   ├── three-scene.js         # 3D WebGL interactive Quran, wooden stand & particles
│   ├── audio-player.js        # Bilingual Quran recitation & Tajweed audio guide
│   ├── subscription-modal.js  # 3-Step $100/mo subscription & checkout engine
│   └── main.js                # UI orchestration, language toggle & FAQ accordions
└── README.md                  # Complete documentation and setup guide
```
