# Deploying this project to Vercel

This document lists minimal, exact steps to deploy the backend and frontend to Vercel and the environment variables required. It assumes the repository is at https://github.com/vaibhavkanawade/fruit_order_system.git and the code layout is unchanged.

Prerequisites
- Create a MongoDB instance accessible from Vercel (MongoDB Atlas recommended). A local MongoDB (mongodb://localhost:27017/...) will NOT be reachable from Vercel.
- A GitHub account and the repository connected to Vercel.

Local quick test (Windows PowerShell)
```powershell
# Backend
cd backend
npm install
npm run dev        # runs nodemon server/server.js

# Frontend
cd frontend/fruit
npm install
npm run dev        # start Vite dev server
```

What to deploy on Vercel (recommended): two projects — Backend and Frontend

1) Backend (server)
- Root Directory: `backend`
- Framework Preset / Build: Use default Node serverless build (Vercel will use `backend/vercel.json`). The entry file is `backend/server/server.js`.
- Build settings: no custom build command required; Vercel will run the serverless build using `@vercel/node` as configured in `backend/vercel.json`.

Environment variables to set (Backend project)
- `MONGODB_URI` = your MongoDB connection string (e.g. from Atlas)
- `MONGODB_URI_SIGNUP` = (optional) if used by signup flows

Notes for backend
- The backend now reads `process.env.MONGODB_URI`. Ensure this is a public/Atlas URI. If it's left as `mongodb://localhost:27017/...` the deployed server will fail to connect.
- If you want to deploy the backend as a single Vercel Serverless function, the current `backend/vercel.json` points to `server/server.js`.

2) Frontend (Vite React app)
- Root Directory: `frontend/fruit`
- Build Command: `npm run build`
- Output Directory: `dist` (Vite default)

Environment variables to set (Frontend project)
- `VITE_API_URL` = URL to your backend API (e.g. `https://your-backend.vercel.app`)

Why `VITE_API_URL` matters
- The frontend uses `VITE_API_URL` at build time to create `PRODUCT_API` / `ORDER_API`. After you set `VITE_API_URL`, redeploy the frontend so the built app points to the correct backend.

Common pitfalls and fixes
- Products not showing: frontend was previously calling `http://localhost:5000`. If the deployed frontend cannot reach your backend, set `VITE_API_URL` in Vercel to the backend URL and redeploy. Also ensure the backend's `MONGODB_URI` points to Atlas.
- Local MongoDB: Vercel builds and runtime cannot access `localhost`. Use Atlas or another hosted DB.
- CORS: backend already enables `cors()` — no extra settings should be required.

Files I changed (for your reference)
- `backend/server/server.js` — loads `dotenv`, reads `process.env.MONGODB_URI`, and exports a serverless handler.
- `backend/vercel.json` — adjusted to point at `server/server.js`.
- `backend/package.json` — added `dotenv` and start/dev scripts.
- `frontend/fruit/src/config/api.js` — new file to centralize API base URL via `VITE_API_URL`.
- Frontend files updated to use the centralized API constants: context and dashboard files, item form/view, and checkout.

Vercel setup quick checklist
1. On Vercel, create/import two projects:
   - Project A: link repo, set Root Directory = `backend`.
   - Project B: link repo, set Root Directory = `frontend/fruit`.
2. In each project's Settings → Environment Variables add the values listed above.
3. Deploy Backend first, copy its Vercel URL.
4. Set `VITE_API_URL` in the Frontend project to the backend URL, then deploy the Frontend.

If you'd like, I can also:
- create a short `backend/README.md` and `frontend/fruit/README.md` with these same steps,
- or convert the backend into multiple Vercel function routes (if you prefer function-per-route style).

---
If you want me to push this README into the repository root as `README_DEPLOY_VERCEL.md` (I already added it), tell me if you'd like the smaller `backend/README.md` and `frontend/fruit/README.md` files created as well.
