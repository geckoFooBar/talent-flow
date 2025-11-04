# TalentFlow Backend (ready-to-run)

This repository contains a Node.js + Express backend using MongoDB Atlas.
It implements a multi-tenant design where each organization gets its own database.

## Quick start

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` from `.env.example` and fill in:
   - `MONGO_MAIN_URI` (main registry DB)
   - `MONGO_CLUSTER_URI` (base cluster URI)
   - `JWT_SECRET`

3. Run dev server:
   ```
   npm run dev
   ```

## Endpoints

- POST /api/org/register
- POST /api/auth/login
- GET /api/users (requires Authorization: Bearer <token>)
- POST /api/users
- GET/POST /api/attendance
- GET/POST /api/performance
- GET/POST /api/leaves
- PATCH /api/leaves/:id/status

See source files in `src/` for implementation details.

