# 🗓️ Smart Calendar

A beautiful, interactive **wall calendar** built with **Next.js 16** and **React 19**. Flip through months like a real wall calendar, select date ranges, and add notes — all stored locally in your browser.

---

## ✨ Features

- 📅 **Wall Calendar UI** — Realistic page-flip animation (drag up/down or use nav arrows)
- 🗒️ **Month Notes** — Write a note for each month in the sidebar (auto-saved)
- 📝 **Day Notes** — Hover over any date to add/view a note for that day (auto-saved)
- 🔵 **Note Indicators** — Blue dot appears under dates that have notes
- 🎯 **Date Range Selection** — Click two dates to highlight a range with a day-count badge
- 💾 **localStorage Persistence** — All notes survive page refreshes, no backend needed
- 📱 **Responsive** — Works on both desktop and mobile

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `v18.17` or later
- **npm**, **yarn**, **pnpm**, or **bun**

### 1. Clone the repository

```bash
git clone https://github.com/VedantSaraf1301/SmartCalendar.git
cd SmartCalendar
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 4. Open in your browser

Visit [http://localhost:3000](http://localhost:3000) 🎉

---

## 🛠️ Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with hot-reload |
| `npm run build` | Build the optimized production bundle |
| `npm run start` | Start the production server (run `build` first) |
| `npm run lint` | Run ESLint to check for code issues |

---

## 🗂️ Project Structure

```
smart_calendar/
├── app/                        # Next.js App Router
│   └── page.js                 # Root page
├── modules/
│   ├── actions/
│   │   └── wallCalendar.jsx    # Main WallCalendar component + drag-flip logic
│   ├── CalendarNotes/
│   │   └── useCalendarNotes.js # Custom hook — reads/writes notes to localStorage
│   └── Components/
│       ├── CalendarGrid.jsx    # Calendar grid + hover note tooltips
│       ├── NotesSection.jsx    # Month note sidebar textarea
│       ├── DayNotePopOver.jsx  # Day note popover (utility)
│       ├── PhotoSection.jsx    # Monthly photo header
│       ├── CoilStrip.jsx       # Spiral binding decoration
│       ├── NavArrow.jsx        # Prev/next navigation arrows
│       ├── MonthDots.jsx       # Month indicator dots
│       ├── constants.js        # YEAR, MONTH_NAMES, MONTH_IMAGES, DAY_LABELS
│       └── utils.js            # getCalendarGrid() helper
├── public/                     # Static assets
├── next.config.mjs
├── package.json
└── README.md
```

---

## 📝 How Notes Work

Notes are stored in `localStorage` with the following key scheme:

| Note Type | Key Format | Example |
|---|---|---|
| **Month note** | `calendar_notes_{year}_{month}` | `calendar_notes_2026_3` |
| **Day note** | `calendar_notes_{year}_{month}_{day}` | `calendar_notes_2026_3_15` |

- **Month notes** → type in the left sidebar panel
- **Day notes** → hover over any date cell to open the inline editor

Notes auto-save **600 ms** after you stop typing.

---

## 🧰 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.2.2 | React framework + App Router |
| [React](https://react.dev) | 19.2.4 | UI library |
| [Tailwind CSS](https://tailwindcss.com) | v4 | Utility-first styling |
| [date-fns](https://date-fns.org) | 4.x | Date utilities |
| [lucide-react](https://lucide.dev) | latest | Icons |

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push to the branch: `git push origin my-feature`
5. Open a Pull Request on GitHub

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
