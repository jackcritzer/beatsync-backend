# 🎧 Cadence – Music Collaboration Platform

**Cadence** is a fullstack music collaboration tool that helps artists share tracks, manage group projects, and stay organized.

This monorepo contains:
- 🧠 `apps/backend`: a Dockerized Express/Node.js API with Prisma + PostgreSQL
- 🎯 `apps/landing`: a Tailwind + Next.js landing page with a waitlist
- 📦 `apps/frontend` (coming soon): the interactive artist dashboard (Next.js)

> 🚧 The backend is currently the most complete component and powers the API. More frontend features are in development.

---

## 🔧 Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Cloud**: AWS EC2, S3 (for file uploads), SSM (for secret storage)
- **CI/CD**: GitHub Actions → EC2 via SSH + Docker
- **Containerization**: Docker
- **Deployment**: Docker-based with optional PM2 or systemd

---

## 🚀 Features

- 🔐 **JWT Authentication** with role-based access
- 🎵 **Track Uploads** to S3 via `multer-s3`
- 🧑‍🤝‍🧑 **Group and Project Management**
- 📦 **Dockerized Backend** with secure environment variable loading
- 🔄 **Auto-Deployment via GitHub Actions**
- 🔐 **Secrets managed securely with AWS SSM Parameter Store**

---

## 📂 Folder Structure

```
cadence/
├── apps/
│   └── backend/
│       ├── src/
│       │   ├── routes/           # API endpoints
│       │   ├── secrets.ts        # Loads secrets from AWS SSM
│       │   ├── index.ts          # Entry point
│       ├── prisma/
│       │   └── schema.prisma     # Prisma schema (PostgreSQL)
│       ├── Dockerfile
│       └── .github/workflows/deploy-backend.yml
```

---

## 🧪 Running in Demo Mode

You can run the backend **without any AWS credentials or real infrastructure** by enabling `DEMO_MODE`.

### 📦 Local Setup

1. Clone the repo
2. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```
3. Make sure this is set in your `.env` file:
   ```env
   DEMO_MODE=true
   ```
4. Run the app:
   ```bash
   npm install
   npm run build
   npm start
   ```

✅ This will run the API with:
- Simulated S3 uploads
- Dummy authentication
- No actual DB connection or AWS usage

### 🐳 Dockerized Demo Mode

If you prefer Docker:

```bash
docker build -t cadence-backend .
docker run -d --env-file .env -p 3000:3000 --name cadence-backend cadence-backend
```

---

## 🧪 API Endpoints

| Method | Endpoint              | Description                  |
|--------|-----------------------|------------------------------|
| POST   | `/api/auth/login`     | Login with JWT               |
| POST   | `/api/tracks/upload`  | Upload track to S3           |
| GET    | `/api/groups`         | Get user groups              |
| ...    | `...`                 | Expand as needed             |

---

## 🌍 Deployment

### 🔄 GitHub Actions Flow

- On push to `main`, the code:
  - Is copied to EC2
  - Rebuilds the Docker image
  - Restarts the container using the new image
- Secrets are loaded dynamically from AWS SSM

You can view the workflow in:
```
.github/workflows/deploy-backend.yml
```

---

## 🧠 Lessons Learned

- Managing environment secrets securely with AWS SSM
- Building a Docker-based deployment pipeline
- Debugging and recovering from EC2-level failures
- Implementing dynamic secret loading and on-demand service restarts

---

## 📬 Contact

**Jack Critzer**  
[LinkedIn](https://www.linkedin.com/in/jack-critzer)  
jackcritzer@gmail.com  
Chicago, IL