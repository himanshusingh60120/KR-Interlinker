# KR Master Interlinker

Internal SEO interlinking tool for Kings Research.

## Project Structure

```
kr-interlinker/
├── index.html          ← Frontend (no API key here!)
├── api/
│   └── interlink.js    ← Vercel serverless function (calls OpenAI securely)
├── vercel.json         ← Vercel routing config
├── .gitignore          ← Prevents .env from being pushed
├── .env.example        ← Template showing required env vars
└── README.md
```

## Deploy to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/kr-interlinker.git
git push -u origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **"Add New Project"** → Import your `kr-interlinker` repo.

### 3. Add your API key

1. In Vercel's project dashboard, go to **Settings → Environment Variables**.
2. Add a new variable:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** Your actual OpenAI API key
3. Click **Save** → Hit **Redeploy**.

Your key is now encrypted on Vercel's servers and never appears in your code or browser.

## Local Development

1. Copy the example env file: `cp .env.example .env`
2. Paste your real API key into `.env`
3. Install the Vercel CLI: `npm i -g vercel`
4. Run locally: `vercel dev`
5. Open `http://localhost:3000`
