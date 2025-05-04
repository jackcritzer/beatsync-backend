# 🎯 Cadence Landing Page

This is the public-facing marketing site for **Cadence**, a collaborative music platform. It's built with **Next.js** and **Tailwind CSS**, and designed to collect emails from early users.

---

## 🔧 Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Hosting**: Docker on EC2 (served on port 3001)
- **Email Capture**: SheetMonkey + Google Sheets

---

## 🚀 Local Development

```bash
cd apps/landing
npm install
npm run dev
```

Runs at: `http://localhost:3001`

---

## 📩 Email Signup

The landing page form submits to SheetMonkey and appends emails to a connected Google Sheet. After submission, users are redirected to `/thanks`.

No database or backend integration required.

---

## 🐳 Docker

```bash
cd apps/landing
docker build -t cadence-landing .
docker run -d -p 3001:3000 --name cadence-landing cadence-landing
```

---

## 📂 Structure

```
apps/landing
├── app/             # Next.js App Router
│   ├── page.tsx     # Main page
│   ├── thanks/      # Thank-you page
├── components/      # Reusable UI components
├── styles/          # Tailwind + globals.css
├── public/          # Static assets
├── Dockerfile
└── .env.example
```

---

## 🔄 Deployment

The site is deployed to an AWS EC2 instance via GitHub Actions.
See `.github/workflows/deploy-landing.yml` in the monorepo root.

---