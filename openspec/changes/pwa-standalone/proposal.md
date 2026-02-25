## Why

The current car park tracker requires a Flask server to run, making it dependent on having a computer available to serve the app. Users need a truly standalone solution that can be installed on their phone and work completely offline without any server dependency.

## What Changes

- Convert application from Flask-served to static Progressive Web App (PWA)
- Add PWA manifest for installability on mobile home screen
- Implement service worker for offline functionality
- Enable app to run without any server after installation
- Make the app fully self-contained as static HTML/CSS/JavaScript files

## Capabilities

### New Capabilities
- `pwa-manifest`: Web app manifest for installability and app-like behavior
- `service-worker`: Offline caching and background functionality
- `static-deployment`: Ability to run as standalone static files without server

### Modified Capabilities
<!-- No existing capabilities are being modified -->

## Impact

- **BREAKING**: Removes Flask dependency - app no longer requires Python server
- Changes deployment model from server-based to static file hosting
- App can be served from any static file host or opened directly in browser
- Existing localStorage data will be preserved (same storage mechanism)
- User experience improves: install once, use offline forever
