## Why

Parking in multi-level car parks makes it easy to forget where you parked. This change introduces a simple mobile web app to quickly record and retrieve your current parking location (building and level) each time you park, eliminating the frustration of wandering through car parks searching for your vehicle.

## What Changes

- New Python-based mobile web application optimized for phone browsers
- Simple, touch-friendly interface for recording building name and parking level
- Local browser storage for all parking data (no server/cloud dependency)
- Ability to view parking history and current location
- Responsive design for mobile screen sizes

## Capabilities

### New Capabilities
<!-- Capabilities being introduced. Each creates specs/<name>/spec.md -->
- `location-entry`: Recording car park building name and level when parking
- `local-storage`: Storing parking records in browser's local storage
- `parking-history`: Viewing current and past parking locations

### Modified Capabilities
<!-- No existing capabilities are being modified -->

## Impact

- New standalone Python web application (likely Flask/FastAPI)
- No backend database required (all data stored client-side)
- No external dependencies or APIs
- Requires modern browser with local storage support
