# Event Gallery Directory (`src/data/gallery/`)

This directory powers the **Gallery Page** on the website automatically.

## How to Add an Event:
1. **Create a new folder** named after your event:
   ```
   src/data/gallery/AI Nexus Hackathon 2026/
   ```
2. **Drop your photos** inside that folder:
   - Supports: `.jpg`, `.jpeg`, `.png`, `.webp`, `.svg`, `.avif`.
   - Any image dropped in will automatically appear under that event tab in the Gallery!

## Optional: Custom Details (`info.json`)
You can optionally drop an `info.json` file inside the event folder to customize the title, date, or description:
```json
{
  "title": "AI Nexus Hackathon 2026",
  "date": "15 March 2026",
  "venue": "DYPCOE Campus",
  "description": "36-hour hackathon bringing together AI innovators and builders."
}
```
If `info.json` is omitted, the event title is automatically generated from the folder name!
