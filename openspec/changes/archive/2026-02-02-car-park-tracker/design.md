## Context

This is a simple mobile web app for personal use to track car parking locations. The user needs a fast, reliable way to record and retrieve where they parked (building name and level) on their phone. The solution must work offline and keep all data local to the device with no server/cloud dependency.

Current state: No existing application - this is a greenfield implementation.

Constraints:
- Must work on mobile phone browsers
- Data stored locally only (no backend/database)
- Simple UI optimized for quick data entry
- Minimal external dependencies

## Goals / Non-Goals

**Goals:**
- Single-page mobile web app that loads quickly
- Simple form to enter building name and parking level
- Display current/most recent parking location prominently
- View history of past parking locations
- Data persists in browser's local storage
- Touch-friendly UI for mobile devices
- Works offline after initial load

**Non-Goals:**
- Multi-user support or data sharing
- Cloud synchronization or backup
- Location services/GPS integration
- Complex search or filtering of history
- Desktop-optimized interface
- Native mobile app (web-only)
- Authentication or user accounts

## Decisions

### 1. Web Framework: Flask with minimal JavaScript

**Decision**: Use Flask as the Python web framework with vanilla JavaScript for client-side interactions.

**Rationale**:
- Flask is lightweight and perfect for simple single-page apps
- No need for complex frameworks like Django for this use case
- Vanilla JS with Web Storage API is sufficient - no need for React/Vue overhead
- Keeps the app simple to maintain and fast to load

**Alternatives considered**:
- FastAPI: More modern but overkill for serving a simple SPA
- Django: Too heavy for a single-page app with no backend logic
- Full JavaScript framework (React/Vue): Unnecessary complexity for simple form/display

### 2. Data Storage: Browser Local Storage

**Decision**: Use browser's `localStorage` API for all data persistence.

**Rationale**:
- Simple key-value storage perfect for this use case
- Available in all modern browsers
- Persists across browser sessions
- No backend infrastructure needed
- 5-10MB storage limit is more than sufficient for parking records

**Alternatives considered**:
- IndexedDB: More complex API, overkill for simple key-value data
- Cookies: Limited storage, not designed for application data
- Backend database: Violates the "local only" requirement

### 3. Data Structure: JSON array of parking records

**Decision**: Store parking records as a JSON array with structure:
```json
[
  {
    "id": "timestamp-based-uuid",
    "building": "Building A",
    "level": "3",
    "timestamp": "2026-02-02T10:30:00Z"
  }
]
```

**Rationale**:
- Simple to serialize/deserialize with JSON.stringify/parse
- Timestamp provides natural ordering for history
- Easy to add fields later if needed
- ID enables potential future editing/deletion features

### 4. UI Design: Mobile-first responsive layout

**Decision**: Single page with:
- Large input fields for building and level at top
- Prominent "Save Location" button
- Current location card displayed below
- Collapsible history section at bottom

**Rationale**:
- Optimized for one-handed phone operation
- Quick access to most common action (saving location)
- Clear visual hierarchy
- Minimal scrolling required

**Alternatives considered**:
- Separate pages for entry/history: Adds navigation complexity
- History-first view: Entry is the primary use case, should be prominent

### 5. Deployment: Single static HTML file approach

**Decision**: Flask serves a single HTML page with embedded CSS and minimal inline JavaScript.

**Rationale**:
- Simplest deployment - just run Flask server
- All client code loads in one request
- Works offline after initial load
- No build process or bundling required

## Risks / Trade-offs

**[Risk]** Browser storage can be cleared by user or browser maintenance  
→ **Mitigation**: Provide export functionality to save data as JSON file (future enhancement). Document that users should periodically export their data.

**[Risk]** Local storage is browser/device specific - data doesn't sync across devices  
→ **Mitigation**: This is by design per requirements. Document clearly that data is device-specific.

**[Risk]** No validation prevents duplicate entries or typos in building names  
→ **Mitigation**: Keep it simple for v1. Could add autocomplete from history in future if needed.

**[Trade-off]** Using Flask for just serving static HTML is minimal overhead but requires Python runtime  
→ **Acceptable**: User wants Python-based solution, and Flask provides easy local development server.

**[Trade-off]** Single HTML file means no code splitting, but app is tiny so load time is negligible  
→ **Acceptable**: The entire app will be <50KB, loads instantly on any connection.
