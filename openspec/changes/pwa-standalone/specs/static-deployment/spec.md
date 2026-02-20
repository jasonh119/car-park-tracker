## ADDED Requirements

### Requirement: App must run without server dependency
The system SHALL function as a standalone static application without requiring a backend server.

#### Scenario: App opens directly from file system
- **WHEN** user opens index.html directly in browser
- **THEN** app loads and functions correctly

#### Scenario: App works on any static file host
- **WHEN** app is hosted on static file server (GitHub Pages, S3, etc.)
- **THEN** app loads and functions correctly

### Requirement: All assets must be self-contained
The system SHALL include all necessary code, styles, and assets within static files.

#### Scenario: No external dependencies loaded
- **WHEN** app loads
- **THEN** no external JavaScript libraries or CSS frameworks are fetched

#### Scenario: All CSS and JavaScript inline or local
- **WHEN** index.html is loaded
- **THEN** all CSS and JavaScript is either inline or loaded from local files

### Requirement: App uses only client-side storage
The system SHALL persist all data using browser localStorage without server communication.

#### Scenario: No server API calls made
- **WHEN** app performs any operation
- **THEN** no HTTP requests are made to backend servers

#### Scenario: Data persists across sessions
- **WHEN** user closes and reopens app
- **THEN** all saved parking locations are retrieved from localStorage

### Requirement: Static files are portable
The system SHALL work when files are copied to any location or device.

#### Scenario: Files work when moved
- **WHEN** app files are copied to different folder
- **THEN** app continues to function normally

#### Scenario: No absolute paths used
- **WHEN** app references resources
- **THEN** all paths are relative or root-relative

### Requirement: App can be deployed anywhere
The system SHALL support multiple deployment methods without modification.

#### Scenario: Deployment to static host
- **WHEN** files are uploaded to static hosting service
- **THEN** app is accessible via URL and works correctly

#### Scenario: Local file access
- **WHEN** user opens index.html from local file system
- **THEN** app works with all features except service worker (requires HTTP/HTTPS)

#### Scenario: GitHub Pages deployment
- **WHEN** files are pushed to GitHub Pages
- **THEN** app is accessible and all PWA features work

### Requirement: HTTPS support for full PWA features
The system SHALL work over HTTPS to enable service worker and full PWA capabilities.

#### Scenario: Service worker works on HTTPS
- **WHEN** app is served over HTTPS
- **THEN** service worker registers and provides offline functionality

#### Scenario: Localhost exception for development
- **WHEN** app is served on localhost
- **THEN** service worker works even without HTTPS

#### Scenario: HTTP fallback graceful
- **WHEN** app is served over HTTP (not localhost)
- **THEN** app functions normally but service worker doesn't register
