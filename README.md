# EGIM School Management System

EGIM is a full-stack school management and public admissions platform.

- `egim-app/`: React + Vite frontend
- `server/`: Node.js + Express backend
- Database: MongoDB Atlas

## Local Development

Install root helper dependencies:

```bash
npm install
```

Frontend:

```bash
cd egim-app
npm install
npm run dev
```

Backend:

```bash
cd server
npm install
npm run dev
```

Run both from the project root:

```bash
npm run dev
```

## Environment Variables

Create local `.env` files from the examples. Real `.env` files are ignored by Git.

Frontend: `egim-app/.env`

```bash
VITE_API_URL=https://egim-8hp6.vercel.app/api
```

Backend: `server/.env`

```bash
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
CLIENT_URL=https://egim.vercel.app
HOST=OPTIONAL_HOST_FOR_LOCAL_DEVELOPMENT
ADMIN_EMAIL=YOUR_ADMIN_EMAIL
ADMIN_PASSWORD=YOUR_ADMIN_PASSWORD
ADMIN_TOKEN_SECRET=YOUR_TOKEN_SECRET
```

Never commit MongoDB passwords, API keys, or admin credentials.

## Production Build

Frontend:

```bash
cd egim-app
npm install
npm run build
```

Backend:

```bash
cd server
npm install
npm start
```

## Production Deployment

Frontend:

Deploy the `egim-app` directory to Vercel.

Set this environment variable in Vercel:

```bash
VITE_API_URL=https://egim-8hp6.vercel.app/api
```

Backend:

Deploy the `server` directory to Vercel or another Node hosting service.

Set these environment variables on the backend host:

```bash
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
CLIENT_URL=https://egim.vercel.app
ADMIN_EMAIL=YOUR_ADMIN_EMAIL
ADMIN_PASSWORD=YOUR_ADMIN_PASSWORD
ADMIN_TOKEN_SECRET=YOUR_TOKEN_SECRET
```

The frontend must not call relative `/api/...` URLs in production. `VITE_API_URL`
must point to the deployed backend project and include `/api`.

Example:

```bash
VITE_API_URL=https://egim-8hp6.vercel.app/api
CLIENT_URL=https://egim.vercel.app
```

## API Routes

- `GET /api/majors`
- `GET /api/groups`
- `GET /api/students`
- `GET /api/payments`
- `GET /api/schedules`
- `POST /api/registration-requests`
- `POST /api/auth/login`

## GitHub Preparation

```bash
git init
git add .
git commit -m "Initial EGIM project"
git branch -M main
git remote add origin https://github.com/Bader7771/egim.git
git push -u origin main
```
