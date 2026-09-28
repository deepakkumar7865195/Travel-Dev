# TRAVEL DEV — Website

Premium travel technology website for **TRAVEL DEV** — destinations, packages, experiences, blog and a contact form that emails you directly. **Let's Go.**

Built with **Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion**.

---

## Tech stack

| Layer | Tool |
| --- | --- |
| Framework | Next.js 15 (App Router, Server Actions/Route Handlers) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + CSS design tokens (`src/app/globals.css`) |
| Animation | Framer Motion, Lenis smooth scroll |
| Icons | lucide-react |
| Email | Nodemailer over Gmail SMTP (free — no paid email API) |
| Deployment | Vercel |

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (see below)
cp .env.example .env.local   # then edit .env.local

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript type check (`tsc --noEmit`) |

---

## Environment variables

Create `.env.local` in the project root:

```env
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

| Variable | Purpose |
| --- | --- |
| `EMAIL_USER` | Gmail address that sends mail and receives contact-form emails |
| `EMAIL_PASS` | 16-character Gmail **App Password** (never your normal Gmail password) |

> `.env.local` is git-ignored (`.gitignore` → `.env*`, with `.env.example` allowed).
> **Never commit credentials.** Only `.env.example` (placeholders) is tracked.

### Creating a Gmail App Password

1. Google Account → **Security** → enable **2-Step Verification** (required).
2. Open [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) (search "App Passwords").
3. Name it (e.g. `travel-dev`) → **Create** → copy the **16-character** password.
4. Put it in `EMAIL_PASS` (spaces are optional).

Your normal Gmail password will be rejected by Gmail SMTP (`535-5.7.8 Username and Password not accepted`).

---

## Contact form email system

**Route:** `src/app/api/contact/route.ts` (App Router route handler)
**Form:** `src/components/sections/ContactForm.tsx` → `/contact`

Flow:

1. Form collects **Name, Email, Phone, Message** (+ destination, travel date, travellers).
2. Client-side validation runs, then `fetch("/api/contact", { method: "POST" })`.
3. The API route re-validates server-side and rejects bad payloads with `400` + field errors.
4. Nodemailer sends mail over **Gmail SMTP (`smtp.gmail.com:465`, TLS)**:
   - `to`: `EMAIL_USER`
   - `replyTo`: the visitor — hit **Reply** in Gmail to answer them
   - HTML email with name, email, phone, message, submission date/time
5. JSON responses:
   - `200 { "ok": true, "message": "..." }`
   - `400 { "ok": false, "error": "...", "errors": { ... } }`
   - `500 { "ok": false, "error": "..." }` (missing env vars or SMTP failure)

UI behaviour: spinner while sending, success screen with form cleared, inline error banner on failure.

Environment variables live **server-side only** — nothing sensitive ever reaches the browser.

### Spam & bot protection

Layered, free, zero external services — all enforced server-side in `route.ts`:

| Layer | Behaviour on trigger |
| --- | --- |
| **Required header** `X-Contact-Form: 1` (set by the form's `fetch`) | `403` — blocks scripts that POST to `/api/contact` directly |
| **Same-origin check** (`Origin` vs host / `NEXT_PUBLIC_SITE_URL`) | `403` — blocks cross-site form abuse |
| **Honeypot field** (`website`, hidden off-screen, `aria-hidden`) | `200` fake success, **no email sent** — bots never learn they were caught |
| **Minimum fill time** (`startedAt` from form mount, ≥ 2 s) | `400` — blocks instant auto-submits |
| **Sliding-window rate limit** (`src/lib/rate-limit.ts`): 3 / 10 min per IP **and** per email | `429` + `Retry-After` |
| **Payload cap** (20 KB) | `413` |
| **Server-side validation** (lengths, email regex, HTML escaping) | `400` with field errors |

Notes:
- The rate limiter is in-memory and therefore per warm serverless instance — best-effort against bursts. For hard guarantees add Cloudflare Turnstile (free) as an extra layer.
- Limits are constants at the top of `route.ts` / `rate-limit.ts` — raise `MAX_HITS` if legitimate users behind a shared IP get `429`s.

---

## Project structure

```
src/
├── app/                      # App Router pages
│   ├── api/contact/route.ts  # Contact form email endpoint
│   ├── about/ blog/ contact/ destinations/ experiences/ packages/
│   ├── page.tsx  layout.tsx  not-found.tsx  sitemap.ts  robots.ts
├── components/
│   ├── cards/                # BlogCard, DestinationCard, PackageCard, ...
│   ├── layout/               # Navbar, Footer, MobileMenu, Preloader, ...
│   ├── sections/             # Hero, ContactForm, FeaturedPackages, ...
│   └── ui/                   # Buttons, reveals, marquees, logos
├── lib/
│   ├── data/                 # blog, destinations, experiences, packages
│   ├── site.ts               # site config (name, contact, socials)
│   ├── motion.ts  utils.ts  types.ts
└── types/
public/                       # images, fonts, static assets
scripts/                      # image/OG build utilities
```

---

## Deployment (Vercel)

1. Push the repository to GitHub, then import it at [vercel.com/new](https://vercel.com/new).
2. **Settings → Environment Variables**, add for Production/Preview/Development:
   ```
   EMAIL_USER=yourgmail@gmail.com
   EMAIL_PASS=your_gmail_app_password
   ```
3. **Redeploy** (env vars apply only to new deployments).
4. Test `/contact` on the preview URL, e.g.:
   ```bash
   curl -X POST https://your-app.vercel.app/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"a@b.com","phone":"9876543210","message":"Hi"}'
   ```
5. **Custom domain:** Settings → **Domains** → Add → set as primary. No code changes needed — the form uses the relative path `/api/contact`, so it works on any connected domain.

**Vercel notes:** route handlers run as Node.js serverless functions (`runtime = "nodejs"`), Nodemailer is excluded from bundling via `serverExternalPackages: ["nodemailer"]`, and outbound SMTP on port 465 is allowed — no extra config or paid email service required.

---

## License

Private — © Travel Dev Private Limited.
