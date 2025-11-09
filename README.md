# FHSD Transportation — Vercel Setup

This is a Vite + React + TS project ready to deploy on Vercel.

## Quick start
```bash
npm install
npm run dev
```

## Deploy on Vercel
1. Push this folder to a new GitHub repo.
2. Go to vercel.com → New Project → Import your repo.
3. Framework preset: **Vite**. Build command: `vite build`. Output dir: `dist/`.
4. `vercel.json` is included so SPA routes work.
5. Deploy, then share the URL.

## Banner Image
Place your header image at:
- `public/page-header.png`

Your code already requests `/page-header.png`. A navy placeholder is provided; replace it with your real image when ready.
