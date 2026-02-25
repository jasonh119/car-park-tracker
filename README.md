# Car Park Tracker

A mobile-first Progressive Web App (PWA) to track where you parked your car (building and level). Fully offline-capable — install it on your home screen and use it without any server or internet connection.

## Features

- 🚗 Quick entry form for building name and parking level
- 📍 Prominent display of current parking location
- 📜 History of past parking locations
- 📱 Mobile-optimized interface with touch-friendly controls
- 💾 All data stored locally in your browser (no server, no account)
- ⚡ Works completely offline after first load
- 📲 Installable on iOS and Android home screens

## Getting Started

### Option 1 — Open directly in your browser (simplest)

1. Clone or download this repository
2. Open `index.html` directly in Chrome, Safari, or Firefox
3. No server, no install — it just works

> **Note:** Service worker caching and the "Add to Home Screen" prompt require HTTPS or localhost. For full PWA features, use Option 2 or 3.

### Option 2 — Serve locally (enables full PWA features)

Serve the root directory with any static file server:

```bash
# Python (no install needed)
python3 -m http.server 8080

# Node.js (npx, no global install)
npx serve .
```

Then open `http://localhost:8080` in your browser.

### Option 3 — Deploy to GitHub Pages (recommended for mobile install)

1. Push this repository to GitHub
2. Go to **Settings → Pages**, set source to the root of your `main` branch
3. Your app will be live at `https://<username>.github.io/<repo>/`
4. Open that URL on your phone to install it

## Installing on Your Phone ("Add to Home Screen")

Full PWA installation requires the app to be served over **HTTPS** (GitHub Pages provides this for free).

### Android (Chrome)

1. Open the app URL in Chrome
2. Tap the **⋮ menu → "Add to Home Screen"** (or wait for the install banner)
3. Tap **Add** — the app appears on your home screen like a native app
4. Open it from the home screen and it will run in standalone mode (no browser UI)

### iOS (Safari)

Service workers are supported on iOS 11.3+. For the best experience:

1. Open the app URL in **Safari** (not Chrome on iOS)
2. Tap the **Share button** (box with arrow) → **"Add to Home Screen"**
3. Tap **Add**
4. The app icon appears on your home screen
5. Open it — it runs as a standalone app without Safari's address bar

> **iOS note:** The "Add to Home Screen" prompt does not appear automatically on iOS — you must use the Share sheet manually.

## Offline Usage

1. Open the app at least once while online — this populates the cache
2. After that, the app works fully offline:
   - Save new parking locations
   - View current location and history
   - All data persists in localStorage (survives offline, airplane mode, etc.)

## Usage

1. **Save a Location**: Enter the building name and parking level, then tap "Save Location"
2. **View Current Location**: Your most recent parking spot is displayed prominently at the top
3. **View History**: Scroll down to see all previous parking locations

## Data Storage

- All parking records are stored in your browser's localStorage
- Data is device and browser-specific (not synchronized across devices)
- Data persists until you clear your browser data or manually delete it
- Existing localStorage data is preserved when upgrading from the Flask version

## Technical Details

- **Frontend**: Vanilla JavaScript, HTML5, CSS3 (no frameworks)
- **Storage**: Browser localStorage API
- **PWA**: Web App Manifest + Service Worker (cache-first strategy)
- **Mobile Support**: Responsive design with touch-optimized controls (44px+ tap targets)

> **HTTPS requirement:** Service workers (and therefore offline caching and install prompts) require HTTPS. The app is fully functional as a plain webpage without HTTPS — you just won't get offline caching or the install prompt.

## Project Structure

```
car-park-tracker/
├── index.html        # Standalone PWA (single file, no server needed)
├── manifest.json     # PWA manifest (name, icons, display mode)
├── sw.js             # Service worker (offline caching)
├── icon-192.png      # App icon (192×192)
├── icon-512.png      # App icon (512×512)
└── openspec/         # Project documentation
```

> **Flask version (deprecated):** The original Flask-based app lives in `app/` and `app.py`. It is no longer the primary deployment but is kept for reference.

## Browser Compatibility

- Chrome (mobile & desktop) — full PWA support
- Safari (mobile) — PWA install via Share sheet; offline works on iOS 11.3+
- Firefox (mobile & desktop) — offline works; install via browser menu
- Edge (desktop) — full PWA support

Requires localStorage support (enabled by default in all modern browsers).

## License

This project is free to use and modify.
