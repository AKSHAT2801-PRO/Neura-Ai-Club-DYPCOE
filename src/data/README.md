# Data Directory (`src/data/`)

This directory houses all site content in modular, easy-to-edit JSON files. Any changes made to these JSON files immediately reflect on the website without needing to touch component code.

## Files Breakdown

### 1. `team.json`
Manages all club people, roles, and personalized interactive profile buttons in an intuitive domain-centric structure.

```json
{
  "faculty": [
    {
      "name": "Faculty Coordinator 1",
      "role": "Faculty Coordinator",
      "dept": "Department of Information Technology",
      "links": [
        { "role": "PORTFOLIO", "url": "https://www.dypcoe.edu.in" }
      ]
    }
  ],
  "leadership": [
    {
      "name": "Harshal",
      "role": "President",
      "domain": "Core Leadership",
      "links": [
        { "role": "LINKEDIN", "url": "https://linkedin.com/in/username" },
        { "role": "PORTFOLIO", "url": "https://github.com/username" }
      ]
    },
    {
      "name": "Tejaswini",
      "role": "Vice President",
      "domain": "Core Leadership",
      "links": [
        { "role": "LINKTREE", "url": "https://linktr.ee/username" }
      ]
    }
  ],
  "domains": [
    {
      "domain": "AI & Machine Learning (AIML)",
      "leads": [
        {
          "name": "Tanishq",
          "role": "AI/ML Lead",
          "domain": "AI & Machine Learning (AIML)",
          "links": [
            { "role": "LINKEDIN", "url": "https://linkedin.com/in/tanishq" }
          ]
        }
      ],
      "coordinators": [
        {
          "name": "Sarvesh Channewar",
          "role": "Coordinator",
          "domain": "AI & Machine Learning (AIML)",
          "links": [
            { "role": "LINKEDIN", "url": "https://linkedin.com/in/sarvesh" }
          ]
        },
        {
          "name": "Shreyash",
          "role": "Coordinator",
          "domain": "AI & Machine Learning (AIML)",
          "links": []
        }
      ]
    }
  ]
}
```

#### Member Object Properties:
- **`name`**: Member's full or display name.
- **`role`**: Member's role (e.g., `President`, `AI/ML Lead`, `Technical Lead`, `Coordinator`).
- **`domain`**: Domain name for clear organization.
- **`links`**: Array of links:
  - Supports `{ "role": "LINKEDIN", "url": "..." }` or `{ "label": "PORTFOLIO", "url": "..." }`
  - **1 Button**: Centered automatically.
  - **2 Buttons**: Equal 50/50 split width side-by-side.
  - **Empty `links: []`**: No button is displayed, and vertical space is preserved automatically so all cards in the grid align evenly.

> **Team Photos**: Drop images in `src/assets/team/` named after the person slug (e.g. `harshal.jpg`, `vedika-chaudhari.png`). If no photo is found, the member's initials are displayed automatically.

---

### 2. `events.json`
Manages all events across three categories:
- **`upcoming`**: Events coming up in the future.
- **`ongoing`**: Events currently taking place (e.g., ongoing hackathons, multi-day workshops).
- **`past`**: Previous events with recaps or project links.

#### Event Object Structure:
```json
{
  "title": "Intro to Generative AI & Prompt Engineering",
  "date": "24 Oct 2026",
  "time": "11:00 AM - 1:00 PM",
  "venue": "IT Seminar Hall, DYPCOE",
  "description": "Hands-on workshop exploring LLM architectures, prompting techniques, and API integrations.",
  "link": "https://forms.gle/example"
}
```

---

### 3. `domains.json`
Lists the club's key technical domains displayed on the Home and About pages.
```json
{
  "id": "genai",
  "title": "Generative AI",
  "text": "LLMs, diffusion and prompt craft for building with generative tools.",
  "icon": "✦"
}
```

---

### 4. `about.json`
Controls the About page content:
- **`lead`**: Introduction paragraph.
- **`vision`**: Vision heading, subtitle, and quote.
- **`pillars`**: The three foundational pillars (`Learn`, `Build`, `Lead`).

---

### 5. `site.json`
Global branding and social links:
- **`name`**: Club brand name.
- **`college`**: College name.
- **`department`**: Department name.
- **`tagline`**: Main subtitle used on the Home hero.
- **`socials`**: Links to `instagram`, `linkedin`, `github`, and `email`.

---

### 6. `club.js`
A compatibility module that re-exports all data from the above JSON files. You can either import directly from the JSON files or from `club.js`.
