# 🧠 Cadence Backend

This is the API for Cadence — a music collaboration app that lets users upload tracks, manage projects, and collaborate in groups.

Built with **Node.js**, **Express**, **TypeScript**, and **PostgreSQL**, and deployed with **Docker on AWS EC2**.

---

## 🔧 Tech Stack

- **Framework**: Node.js, Express
- **Language**: TypeScript
- **Database**: PostgreSQL via Prisma
- **Cloud**: AWS EC2, S3, SSM
- **Containerization**: Docker
- **CI/CD**: GitHub Actions

---

## 🚀 Local Development

```bash
cd apps/backend
cp .env.example .env
npm install
npm run build
npm start
```

> Set `DEMO_MODE=true` in your `.env` to run without AWS or a real DB

---

## 🐳 Docker

```bash
cd apps/backend
docker build -t cadence-backend .
docker run -d --env-file .env -p 3000:3000 --name cadence-backend cadence-backend
```

---

## 📂 Structure

```
apps/backend
├── src
│   ├── routes/         # Express routes
│   ├── secrets.ts      # AWS SSM integration
│   └── index.ts        # Entry point
├── prisma/
│   └── schema.prisma   # Prisma schema
├── Dockerfile
└── .env.example
```

---

## 🔄 Deployment

This app is deployed to an AWS EC2 instance via GitHub Actions.
See `.github/workflows/deploy-backend.yml` in the monorepo root.

Secrets are loaded at runtime using AWS SSM Parameter Store.

---

## 🧪 API Endpoints (examples)

| Method | Endpoint             | Description        |
|--------|----------------------|--------------------|
| POST   | `/api/auth/login`    | JWT login          |
| POST   | `/api/tracks/upload` | Upload track to S3 |
| GET    | `/api/groups`        | List user groups   |

---