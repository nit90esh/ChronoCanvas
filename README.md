# ChronoCanvas 🕒✨

> Transform your browser new tab into an elegant, atmospheric workspace featuring a real-time analog clock, time-adaptive wallpapers, and daily motivational quotes.

**ChronoCanvas** replaces your default browser home page with a sleek, minimalist dashboard designed to keep you centered and inspired throughout your day. By combining real-time canvas rendering with dynamic imagery synced to your local solar time, every new tab reflects the exact mood of your day—from dawn to deep night.

---

## ✨ Key Features

- 🕒 **Sleek Analog & Digital Clock:** Features glowing neon and glassmorphism design aesthetics alongside accurate 12-hour digital time with AM/PM indicators.
- 🌅 **Dynamic Time-Aware Backgrounds:** Seamlessly transitions wallpapers via the **Unsplash API** based on four distinct periods of the day:
  - **Dawn:** Sunrise landscapes, early morning skies, and soft morning light.
  - **Day:** Vibrant daytime landscapes, bright modern cities, and sunlit views.
  - **Sunset:** Golden hour horizons, dramatic evening skies, and glowing cityscapes.
  - **Night:** Deep starry landscapes, moody blue nightscapes, and city light reflections.
- 💡 **Rotating Motivational Quotes:** Fetches uplifting daily quotes from a free public API to keep you inspired every time you open a tab.
- 📅 **Real-Time Date Display:** Clean, modern formatting for day, date, and month.
- ⚡ **Lightweight & Fast:** Built with vanilla web technologies for instant new tab loading with zero bloat.

---

## 🛠️ Tech Stack

- **Manifest V3:** Modern, secure browser extension architecture.
- **HTML5 & CSS3:** Responsive layouts with custom CSS variables, glassmorphism, and subtle animations.
- **Vanilla JavaScript (ES6+):** Async/Await for API integrations (`Unsplash API` & `Quotes API`), dynamic DOM updates, and clock state management.

---

## 🚀 Installation & Availability

### 🌐 Official Add-on Stores (Coming Soon)

- **Microsoft Edge Add-ons:** Available directly on the Microsoft Edge Add-ons store.
- **Firefox Browser Add-ons (AMO):** Available on Mozilla Add-ons.

---

### 🛠️ Manual Installation (Developer Mode / Open Source)

#### Google Chrome / Brave / Opera

1. **Get the Code:**
   - **Option A (Git):** Clone the repository to your local computer:
     ```bash
     git clone [https://github.com/nit90esh/ChronoCanvas.git](https://github.com/nit90esh/ChronoCanvas.git)
     ```
   - **Option B (ZIP):** Download the repository ZIP file from GitHub and extract it to a folder on your computer.

2. **Open Extensions Manager:**
   - Navigate to `chrome://extensions/` in your address bar (or **Menu** → **Extensions** → **Manage Extensions**).
3. **Enable Developer Mode:**
   - Toggle on **Developer mode** in the top right corner.
4. **Load the Extension:**
   - Click **Load unpacked** and select the `ChronoCanvas` folder containing `manifest.json`.

---

#### Microsoft Edge

1. Clone or download the ZIP from GitHub and extract it.
2. Navigate to `edge://extensions/` in your address bar.
3. Toggle on **Developer mode** on the left menu sidebar.
4. Click **Load unpacked** and select the `ChronoCanvas` project folder.

---

#### Mozilla Firefox

1. Clone or download the ZIP from GitHub and extract it.
2. Navigate to `about:debugging#/runtime/this-firefox` in your Firefox address bar.
3. Click **Load Temporary Add-on...**.
4. Select the `manifest.json` file inside the `ChronoCanvas` folder.

---

## 📁 File Structure

```text
├── manifest.json      # Extension configuration (V3)
├── new_tab.html       # Primary layout for the custom tab page
├── style.css          # Glassmorphism design system & adaptive theme styles
├── script.js          # Clock drawing, period detection, and API fetching logic
└── assets/            # Extension icons and promotional screenshots
```
