## 1. Extract Standalone HTML

- [x] 1.1 Copy app/templates/index.html to root directory as index.html
- [x] 1.2 Test standalone HTML opens correctly in browser
- [x] 1.3 Verify all functionality works without Flask server
- [x] 1.4 Verify localStorage operations work correctly

## 2. Create App Icons

- [x] 2.1 Create or download 192x192 PNG icon
- [x] 2.2 Create or download 512x512 PNG icon
- [x] 2.3 Save icons in root directory as icon-192.png and icon-512.png
- [x] 2.4 Verify icons are valid PNG files

## 3. Create PWA Manifest

- [x] 3.1 Create manifest.json in root directory
- [x] 3.2 Add required fields: name, short_name, display, start_url
- [x] 3.3 Add theme_color and background_color matching app design
- [x] 3.4 Add icons array with paths to 192x192 and 512x512 icons
- [x] 3.5 Link manifest in index.html <head> tag
- [x] 3.6 Validate manifest.json syntax

## 4. Create Service Worker

- [x] 4.1 Create sw.js file in root directory
- [x] 4.2 Define cache version constant
- [x] 4.3 Implement install event to cache app shell files
- [x] 4.4 Implement activate event to clean up old caches
- [x] 4.5 Implement fetch event with cache-first strategy
- [x] 4.6 Add error handling for cache operations

## 5. Register Service Worker

- [x] 5.1 Add service worker registration script to index.html
- [x] 5.2 Register service worker after DOMContentLoaded
- [x] 5.3 Add error handling for registration failures
- [x] 5.4 Add console logging for registration status (optional)
- [x] 5.5 Ensure registration doesn't block app functionality

## 6. Test PWA Installation

- [ ] 6.1 Test app in Chrome DevTools PWA audit
- [ ] 6.2 Verify "Add to Home Screen" prompt appears on mobile Chrome
- [ ] 6.3 Test installation on Android device
- [ ] 6.4 Test installation on iOS Safari (Add to Home Screen)
- [ ] 6.5 Verify installed app opens in standalone mode
- [ ] 6.6 Verify app icon appears correctly on home screen

## 7. Test Offline Functionality

- [ ] 7.1 Load app online to populate cache
- [ ] 7.2 Disable network in DevTools and verify app loads
- [ ] 7.3 Test all features work offline (save location, view history)
- [ ] 7.4 Verify localStorage persists offline
- [ ] 7.5 Test on actual device in airplane mode

## 8. Test Static Deployment

- [ ] 8.1 Test opening index.html directly from file system
- [ ] 8.2 Test deployment to GitHub Pages
- [ ] 8.3 Verify HTTPS deployment enables all PWA features
- [ ] 8.4 Test app works when hosted from subdirectory
- [ ] 8.5 Verify no absolute paths cause issues

## 9. Update Documentation

- [x] 9.1 Update README.md with PWA installation instructions
- [x] 9.2 Add instructions for opening directly in browser
- [x] 9.3 Add instructions for deploying to GitHub Pages
- [x] 9.4 Document "Add to Home Screen" process for iOS/Android
- [x] 9.5 Add note about HTTPS requirement for full PWA features
- [x] 9.6 Mark Flask version as deprecated or move to branch

## 10. Clean Up and Finalize

- [x] 10.1 Remove or archive Flask app files (app.py, app/ directory)
- [x] 10.2 Update .gitignore if needed
- [x] 10.3 Remove Python dependencies from requirements.txt
- [ ] 10.4 Test final build on multiple browsers (Chrome, Safari, Firefox)
- [ ] 10.5 Create GitHub release or tag for PWA version
- [x] 10.6 Verify existing localStorage data still works in new version
