# ToolbaseMarketplace

**The tech marketplace for small businesses.**

ToolbaseMarketplace is a production-ready directory and comparison platform for tech tools, built exclusively for small and medium-sized businesses (SMBs).

## Tech Stack

- **React + Vite** — fast build tooling and dev server
- **React Router v6** — client-side routing
- **Tailwind CSS v3** — utility-first styling
- **Supabase** — Postgres database (reviews + submissions)
- **react-helmet-async** — per-page SEO meta tags

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

# 3. Run Supabase migration (see below)

# 4. Start dev server
npm run dev
```

---

## Supabase Setup

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** in your Supabase dashboard
3. Paste and run the contents of `supabase/migrations/001_initial_schema.sql`
4. Copy your **Project URL** and **anon key** from **Settings → API**
5. Add them to your `.env` file:

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Moderating Reviews and Submissions

Reviews and tool submissions are held pending by default.

- **Reviews**: Supabase Dashboard → Table Editor → `reviews` → set `approved = true`
- **Submissions**: Table Editor → `submissions` → set `status = 'approved'` or `'rejected'`

---

## Deploying to Vercel

```bash
# 1. Push to GitHub
git add .
git commit -m "Initial ToolBaseAI build"
git push origin main

# 2. Import project at vercel.com/new
# 3. Set environment variables in Vercel dashboard
# 4. Add vercel.json to project root for SPA routing:
```

**`vercel.json`** (create in project root):
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## Deploying to Netlify

Connect your GitHub repo at [app.netlify.com](https://app.netlify.com).

Build settings (auto-detected):
- Build command: `npm run build`
- Publish directory: `dist`

**`netlify.toml`** (create in project root):
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Production Integrations

### Google AdSense
In `src/components/AdSlot.jsx`, replace the placeholder `<div>` with your AdSense `<ins>` tag.

### Beehiiv Newsletter
In `src/components/NewsletterStrip.jsx`, replace the form with your Beehiiv embed iframe.
Set `VITE_BEEHIIV_URL` in `.env`.

---

## Rebranding

All brand references pull from `src/config/brand.js`:

```js
const brand = {
  name: "YourBrandName",
  tagline: "Your tagline here",
  contactEmail: "hello@yourdomain.com",
  colors: { accent: "#HEX", dark: "#HEX", gold: "#HEX" },
  url: "https://yourdomain.com",
};
```

---

## Routes

| Path | Page |
|------|------|
| `/` | Home — directory with search, filter, sort |
| `/tools/:slug` | Individual tool page with reviews |
| `/category/:slug` | Category landing page with FAQs |
| `/compare/:slug` | Side-by-side tool comparison |
| `/best-for/:slug` | Best-for audience pages |
| `/submit` | Vendor tool submission form |

---

## License

MIT
