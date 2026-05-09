# 📊 IndiQuant Signal Tracker

A frontend prototype for a **collective intelligence signal platform** built for Indian stock markets.

Inspired by [IndiQuant's](https://indiquantresearch.in) vision of aggregating distributed research insight.

---

## 💡 What is this?

After researching IndiQuant's platform concept, I identified a key missing piece:
**a way for researchers to anonymously submit and track trading signals.**

This prototype demonstrates what that interface could look like.

---

## 🔑 Features

- **Signal Submission Form** — Submit BUY / SELL / HOLD signals with confidence level, target price, and time horizon
- **Anonymous by design** — No names, only pseudonymous researcher IDs
- **Live Signal Feed** — See recent signals from the collective in real time
- **Researcher Leaderboard** — Ranked by prediction accuracy over time
- **Stats Bar** — Total signals, average accuracy, active researchers

---

## 🚧 What's missing (for production)

This is a frontend-only prototype. A real version would need:

| Feature | Tech needed |
|---|---|
| Real NSE/BSE data API | Yahoo Finance / NSE API |
| Backend to store signals | Node.js + PostgreSQL |
| Actual outcome tracking | Cron jobs to check price after horizon |
| Real scoring engine | Python scoring logic |
| Auth + invitation system | JWT + invite codes |

---

## 🛠️ Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- No frameworks (kept simple intentionally)
- Google Fonts (Space Mono + DM Sans)

---

## 🚀 How to Run

Just open `index.html` in any browser. No installation needed.

```bash
# Option 1 - Direct open
open index.html

# Option 2 - VS Code Live Server
# Right click index.html → Open with Live Server
```

---

## 📁 Folder Structure

```
indiquant-signal-tracker/
├── index.html        # Main page
├── css/
│   └── style.css     # All styling
├── js/
│   └── app.js        # All logic (well commented)
└── README.md
```

---

## 👨‍💻 Author

Built by [Your Name] · CSE (AIML) · 3rd Semester  
Research + vibe coding · Built to understand IndiQuant's vision

---

> *"Collective intelligence, not isolated genius."* — IndiQuant
