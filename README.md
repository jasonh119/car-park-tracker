# Car Park Tracker

A simple mobile web app to track where you parked your car (building and level). All data is stored locally in your browser.

## Features

- 🚗 Quick entry form for building name and parking level
- 📍 Prominent display of current parking location
- 📜 History of past parking locations
- 📱 Mobile-optimized interface with touch-friendly controls
- 💾 All data stored locally (no server required)
- ⚡ Works offline after initial load

## Getting Started

### Prerequisites

- Python 3.7 or higher
- pip (Python package manager)

### Installation

1. Clone or download this repository

2. Create a virtual environment:
   ```bash
   python -m venv .venv
   ```

3. Activate the virtual environment:
   - macOS/Linux: `source .venv/bin/activate`
   - Windows: `.venv\Scripts\activate`

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Running the App

1. Start the Flask server:
   ```bash
   python app.py
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

3. For mobile testing, find your computer's local IP address and access:
   ```
   http://YOUR_LOCAL_IP:5000
   ```

## Usage

1. **Save a Location**: Enter the building name and parking level, then tap "Save Location"
2. **View Current Location**: Your most recent parking spot is displayed prominently at the top
3. **View History**: Scroll down to see all previous parking locations

## Data Storage

- All parking records are stored in your browser's localStorage
- Data is device and browser-specific (not synchronized across devices)
- Data persists until you clear your browser data or manually delete it

## Technical Details

- **Backend**: Flask (Python)
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Storage**: Browser localStorage API
- **Mobile Support**: Responsive design with touch-optimized controls (44px+ tap targets)

## Project Structure

```
car-park-tracker/
├── app.py                 # Flask application
├── requirements.txt       # Python dependencies
├── app/
│   └── templates/
│       └── index.html    # Single-page application
└── openspec/             # Project documentation
    └── changes/
        └── car-park-tracker/
            ├── proposal.md
            ├── design.md
            ├── specs/
            └── tasks.md
```

## Browser Compatibility

- Chrome (mobile & desktop)
- Safari (mobile & desktop)
- Firefox (mobile & desktop)
- Edge (desktop)

Requires localStorage support (enabled by default in all modern browsers).

## License

This project is free to use and modify.
