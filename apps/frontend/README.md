# 🧑‍🎤 Cadence Frontend (WIP)

This will be the main **user dashboard** for Cadence — where artists manage tracks, groups, and shared projects in a collaborative interface.

Built with **Next.js**, this frontend is under active development.

---

## 🔧 Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS (planned)
- **Build Tooling**: Vite or Turbopack (TBD)
- **Hosting**: Docker on EC2 (port 3002)

---

## 🚀 Local Development

```bash
cd apps/frontend
npm install
npm run dev
```

Runs at: `http://localhost:3002`

---

## 🐳 Docker (Planned)

```bash
cd apps/frontend
docker build -t cadence-frontend .
docker run -d -p 3002:3000 --name cadence-frontend cadence-frontend
```

---

## 📂 Structure (in progress)

```
apps/frontend
├── app/              # Next.js App Router
├── components/       # Shared UI (coming soon)
├── public/           # Static assets
├── styles/           # Tailwind config
├── Dockerfile
└── .env.example
```

---

## 🔄 Deployment

Deployment is managed via GitHub Actions. See:
```
.github/workflows/deploy-frontend.yml
```

---

## ✅ Status

- [x] Initialized with `create-next-app`
- [ ] Auth flow + dashboard
- [ ] Real API integration
- [ ] File uploads
- [ ] Team collaboration UI

---