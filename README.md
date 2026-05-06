# 🌿 Wellness Tracker — PWA

Personal wellness tracker built with React + TypeScript + Vite.  
Tracks weight, Rujuta Diwekar's 7 fitness metrics, daily habits, and diet guide.  
Installable as a PWA on iPhone and Android.

---

## 🚀 Deploy in 15 minutes (Vercel — free)

### Step 1 — Install dependencies
```bash
npm install
```

### Step 2 — Run locally to test
```bash
npm run dev
```
Open http://localhost:5173 — everything should work.

### Step 3 — Push to GitHub
```bash
git init
git add .
git commit -m "initial commit"
# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/wellness-tracker.git
git push -u origin main
```

### Step 4 — Deploy to Vercel
1. Go to https://vercel.com → Sign in with GitHub
2. Click **"Add New Project"**
3. Import your `wellness-tracker` repo
4. Leave all settings as default (Vercel auto-detects Vite)
5. Click **Deploy**

✅ You'll get a URL like `https://wellness-tracker-xyz.vercel.app`

---

## 📱 Install on iPhone (Add to Home Screen)

1. Open your Vercel URL in **Safari** (must be Safari, not Chrome)
2. Tap the **Share** button (box with arrow pointing up)
3. Scroll down → tap **"Add to Home Screen"**
4. Tap **"Add"**

The app now appears on your home screen, opens fullscreen with no browser bar — just like a native app.

---

## 📱 Install on Android

1. Open your Vercel URL in **Chrome**
2. Chrome will show an **"Install app"** banner automatically
3. Or: tap the 3-dot menu → **"Add to Home Screen"**

---

## 🔧 Customise for yourself

All personal settings are in `src/constants.ts`:

```ts
export const START_WEIGHT = 73   // your starting weight
export const TARGET_WEIGHT = 60  // your goal
export const MONTHLY_GOAL = 1    // kg per month
```

Change these and redeploy — Vercel auto-deploys on every `git push`.

---

## 💾 Data & Backup

- All data is stored in **localStorage** (stays on your device)
- Use the **Backup tab** to export a code → paste into Evernote
- Paste the code back on any device to restore all data
- Data survives app updates, browser clears, and phone restores (as long as you keep your backup code)

---

## 📁 Project structure

```
src/
├── components/
│   ├── WeightTab.tsx      # Weight logging + chart
│   ├── FitnessTab.tsx     # 7 Rujuta fitness metrics
│   ├── HabitsTab.tsx      # Daily habits + streaks
│   ├── DietTab.tsx        # Meal guide + Abu Dhabi shops
│   ├── BackupTab.tsx      # Export/import data
│   ├── WeightChart.tsx    # SVG weight chart
│   └── Charts.tsx         # Sparkline + HabitWeekGrid
├── types/
│   └── index.ts           # TypeScript interfaces
├── constants.ts           # All data: metrics, habits, meals
├── storage.ts             # localStorage wrapper
├── utils.ts               # Helper functions
├── App.tsx                # Root component + state
├── main.tsx               # Entry point
└── index.css              # Global styles + utility classes
```

---

## 🛠 Tech stack

| | |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| PWA | vite-plugin-pwa (Workbox) |
| Storage | localStorage (typed wrapper) |
| Styling | Plain CSS with utility classes |
| Fonts | Lora + DM Mono (Google Fonts, cached offline) |
| Deploy | Vercel (free tier) |
| Icons | Auto-generated PNG |

---

## 🔄 Future upgrades (when ready)

- **Azure Cosmos DB** — replace localStorage with cloud sync across devices
- **MSAL auth** — Azure AD login (same as your trade approval app)
- **Azure Static Web Apps** — host on your existing Azure subscription
- **Push notifications** — remind you to log weight / habits daily

---

Built with ❤️ for personal wellness tracking.
