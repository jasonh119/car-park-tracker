## Context

The car park tracker currently exists as a Flask application that serves a single HTML page with embedded CSS and JavaScript. While the client-side functionality is already self-contained using localStorage, it requires a Python server to be running. This creates friction for mobile use - users must access the app through a browser pointing to a server address.

Current state: Flask app serving static HTML with all logic client-side
Target state: Static PWA that can be installed on phone home screen and work offline

Constraints:
- Must preserve existing localStorage data
- Must work on iOS and Android browsers
- Should be simple to deploy (no build process if possible)
- Maintain the simple, minimal UI/UX

## Goals / Non-Goals

**Goals:**
- Convert Flask app to standalone static files (HTML, CSS, JS)
- Add PWA manifest for home screen installation
- Implement service worker for offline functionality and caching
- Enable "Add to Home Screen" prompt on mobile browsers
- App works completely offline after first load
- Deploy as static files (can open index.html directly or host on any static server)

**Non-Goals:**
- Background sync or push notifications (keep it simple)
- Complex build tooling or bundlers
- Native app wrapper (pure web PWA)
- Multi-device sync (stays local only)
- Backwards compatibility with Flask deployment

## Decisions

### 1. Extraction Method: Copy HTML to Standalone File

**Decision**: Extract the existing `app/templates/index.html` to root-level `index.html` and make it fully standalone.

**Rationale**:
- HTML already contains all CSS and JavaScript inline
- No Flask template variables or Jinja2 syntax used
- Can simply copy and test immediately
- Minimal changes needed

**Alternatives considered**:
- Rewrite with separate CSS/JS files: More files to manage, PWA can cache a single file more efficiently
- Use a build tool: Adds complexity, not needed for this simple app

### 2. PWA Manifest: Minimal Configuration

**Decision**: Create `manifest.json` with essential properties: name, icons, display mode, theme colors.

**Rationale**:
- Enables "Add to Home Screen" on mobile
- Sets app to display in standalone mode (no browser chrome)
- Simple JSON file, no dependencies

**Configuration**:
```json
{
  "name": "Car Park Tracker",
  "short_name": "Car Parks",
  "display": "standalone",
  "start_url": "/",
  "theme_color": "#667eea",
  "background_color": "#f5f5f5"
}
```

**Alternatives considered**:
- Web App Install API: Not necessary, manifest is standard and well-supported
- Full featured manifest: Keep it minimal, add features later if needed

### 3. Service Worker: Cache-First Strategy

**Decision**: Implement a simple service worker that caches the app shell on install and serves from cache.

**Rationale**:
- Enables offline functionality
- Cache-first strategy perfect for this use case (static content, no API calls)
- Standard pattern, well-documented

**Strategy**:
- On install: Cache index.html, manifest.json, and any icons
- On fetch: Try cache first, fallback to network if not found
- No complex versioning needed (single-file app)

**Alternatives considered**:
- Network-first: Would fail offline, defeats the purpose
- No service worker: App wouldn't work offline, wouldn't be installable as PWA
- Workbox library: Overkill for simple caching needs

### 4. Icon Strategy: Simple SVG or PNG

**Decision**: Create simple icon files (192x192 and 512x512 PNG) or use an SVG with emoji.

**Rationale**:
- Required for PWA manifest
- Can be simple car emoji or basic design
- PNG more compatible across all devices

**Alternatives considered**:
- No icons: PWA won't install properly
- Multiple sizes: Start with 2 required sizes, can expand later

### 5. File Structure: Flat Root Directory

**Decision**: Place all files in root: `index.html`, `manifest.json`, `sw.js`, `icon-*.png`

**Rationale**:
- Simplest structure
- Easy to open index.html directly in browser
- Service worker can access all files from root scope

**Structure**:
```
/
├── index.html
├── manifest.json
├── sw.js (service worker)
├── icon-192.png
└── icon-512.png
```

## Risks / Trade-offs

**[Risk]** Users who bookmarked the Flask URL will need to re-bookmark  
→ **Mitigation**: Document the change, provide redirect page from old Flask route if needed

**[Risk]** HTTPS required for service workers (except localhost)  
→ **Mitigation**: Works on localhost for testing. For production, use GitHub Pages or any HTTPS host

**[Risk]** iOS Safari has quirks with PWA installation  
→ **Mitigation**: Test on iOS specifically, document any limitations

**[Trade-off]** Removing Flask removes the option for server-side features in future  
→ **Acceptable**: The app is designed to be local-only, this aligns with the goal

**[Trade-off]** Must manually copy file if updating, no template rendering  
→ **Acceptable**: App is simple enough that updates are infrequent, templates weren't being used anyway

**[Risk]** Service worker caching might prevent updates from loading  
→ **Mitigation**: Implement cache versioning in service worker, or users can manually clear cache

## Migration Plan

1. **Extract standalone files**:
   - Copy `app/templates/index.html` to `index.html`
   - Test that it works by opening directly in browser

2. **Add PWA files**:
   - Create `manifest.json`
   - Create icons
   - Add manifest link to index.html
   - Create `sw.js` service worker
   - Register service worker in index.html

3. **Test PWA**:
   - Test on localhost in Chrome/Safari
   - Verify "Add to Home Screen" works
   - Test offline functionality
   - Test on actual mobile devices (iOS/Android)

4. **Deploy**:
   - Can be hosted on any static file server
   - GitHub Pages is a good option
   - Or users can simply open index.html directly in mobile browser

5. **Deprecate Flask version**:
   - Keep Flask version in a branch for reference
   - Update README with new instructions
   - No rollback needed - old version can coexist

## Open Questions

- Should we generate icons programmatically or use simple emoji-based ones? → Start with simple approach
- Do we need a separate offline fallback page? → No, entire app is offline-capable
- Should we version the cache in the service worker? → Yes, add simple version string
