# Car Park Tracker — Copilot Instructions

## Project Overview
A mobile-first Progressive Web App (PWA) that lets users save and recall their car park location (building + level). No backend — fully offline-capable via service worker and localStorage.

## Tech Stack
- **Frontend:** Vanilla HTML, CSS, JavaScript (no frameworks)
- **Storage:** Browser localStorage (JSON-serialised array of parking records)
- **PWA:** Web app manifest + service worker for offline/installable support
- **Server (legacy):** Flask 3.1 (`app.py`) — being replaced by static PWA

## Project Structure
```
app/
  static/       # CSS, JS, PWA assets (manifest, service worker)
  templates/    # index.html (Jinja2, will become plain HTML)
app.py          # Flask entrypoint (in transition to static)
openspec/       # Spec-driven change workflow (OpenSpec)
  config.yaml
  specs/        # Living specs per feature
  changes/      # Active and archived change proposals
.github/
  prompts/      # OpenSpec workflow prompt files
  skills/       # OpenSpec skill definitions
```

## Domain Model
A **parking record** has: `id` (unique), `building` (string), `level` (string), `timestamp` (ISO 8601).
All records stored as a JSON array in `localStorage`.

## Conventions
- Mobile-first, offline-first design
- No external dependencies or CDN imports — fully self-contained
- Prefer plain JS over frameworks
- Use OpenSpec workflow for structured changes (`/skills` → openspec-*)
- Commit messages: conventional commits style
