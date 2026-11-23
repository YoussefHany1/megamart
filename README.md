# MegaMart

A modern, responsive e-commerce storefront built with **Next.js 16 (App Router)**, **React 19**, and **TypeScript**. MegaMart supports browsing products by category, dynamic product pages, search, a persistent shopping cart, Firebase authentication, and Stripe payments.

> **Status:** Under active development. Features, data sources, and UI are updated regularly.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
5. [Environment Variables](#environment-variables)
6. [Available Scripts](#available-scripts)
7. [Routes & Usage](#routes--usage)
8. [Project Structure](#project-structure)
9. [Deployment](#deployment)
10. [Roadmap](#roadmap)
11. [Contributing](#contributing)
12. [License](#license)
13. [Contact](#contact)

---

## Project Overview

MegaMart is a feature-based Next.js App Router application. Client state is managed with Zustand, authentication and user data use Firebase (Auth + Firestore), and payments are handled with Stripe. Product listings are fetched server-side from remote JSON feeds whose URLs are configured in `src/stores/data.json`, then cached by Next.js (`unstable_cache`, 1-hour revalidation).

The UI uses Tailwind CSS v4, MUI components, Splide.js carousels, and a small amount of component-scoped CSS.

---

## Features

- **Storefront** — hero carousel (Splide.js), top categories, smartphones, phone brands, and daily essentials sections
- **Catalog** — category listings at `/product-page/[category]` and detail pages at `/product-page/[category]/[id]`, with pagination, loading skeletons, and not-found handling
- **Search** — dedicated `/search` route
- **Cart** — persisted cart with add/remove, quantity controls, totals, and clear-cart actions (Zustand + `persist`)
- **Checkout** — Stripe Elements payment form and saved payment methods stored in Firestore
- **Accounts** — Firebase email/password sign-up, sign-in, password reset, profile/address editing, and account deletion
- **Orders & wishlist** — order history with cancellation and a wishlist store
- **Contact** — contact form via EmailJS plus customer-service/policy pages
- **Developer experience** — strict TypeScript, ESLint, Prettier, Husky + lint-staged, and Turbopack-powered builds

---

## Tech Stack

| Area | Technologies |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), React 19 |
| Language | TypeScript 5.9 (strict mode) |
| Styling | Tailwind CSS v4, MUI 9 + Emotion, CSS Modules, PostCSS |
| State | Zustand 5 (cart, auth, wishlist, toast, UI state) |
| Data | Axios + remote JSON feeds, Next.js `unstable_cache`, Firestore |
| Auth | Firebase Authentication |
| Payments | Stripe (server actions + React Stripe.js) |
| Other services | EmailJS, Splide.js, Day.js |
| Tooling | ESLint, Prettier, Husky, lint-staged |
| Deployment | Netlify with `@netlify/plugin-nextjs` |

---

## Getting Started

### Prerequisites

- Node.js **20.9.0 or newer**
- npm (the repository includes `package-lock.json`)
- A Firebase project, a Stripe account, and an EmailJS account for full functionality

### Install and run locally

```bash
git clone https://github.com/YoussefHany1/megamart.git
cd megamart

npm install
cp .env.local.example .env.local  # if provided; otherwise create .env.local manually (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> If there is no `.env.local.example` in your checkout, create `.env.local` yourself using the keys in the next section. It is gitignored.

### Production build

```bash
npm run build
npm start
```

---

## Environment Variables

Create a `.env.local` file in the project root for local development:

```env
# Firebase (client config — public by design)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

# EmailJS
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=

# Public app URL (used for Stripe return URLs)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

| Variable | Used for |
| --- | --- |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase app initialization, Auth, and Firestore |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Client-side Stripe.js initialization |
| `STRIPE_SECRET_KEY` | Server-only Stripe operations (payment intents, saved cards) |
| `NEXT_PUBLIC_EMAILJS_*` | Contact form email delivery |
| `NEXT_PUBLIC_APP_URL` | Base URL for Stripe `return_url` (set to your deployed site URL in production) |

**Security notes:**

- Anything prefixed with `NEXT_PUBLIC_` is embedded in the browser bundle — never put private credentials there.
- Keep `STRIPE_SECRET_KEY` server-only and never commit it.
- On Netlify, add these variables in **Project configuration → Environment variables**. If you mark the `NEXT_PUBLIC_*` variables as "secret", Netlify's secret scanner will flag the values in the client bundle; add `SECRETS_SCAN_OMIT_KEYS` (a comma-separated list of those public key names) so builds are not blocked. Keep `STRIPE_SECRET_KEY` scanned as a real secret.

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format files with Prettier |
| `npx tsc --noEmit` | Type-check without emitting files |

Husky and lint-staged run ESLint and Prettier automatically on staged files.

---

## Routes & Usage

| Route | Description |
| --- | --- |
| `/` | Home page with carousel and featured sections |
| `/product-page/[category]` | Products for a category (e.g. `phones`, `computers`, `tablets`) |
| `/product-page/[category]/[id]` | Product details and add-to-cart/buy-now actions |
| `/search` | Search products |
| `/cart` | Cart contents, quantity controls, and Stripe checkout |
| `/account` | Firebase sign-in/sign-up and profile management |
| `/orders` | Order history |
| `/payments` | Saved payment methods |
| `/wishlist` | Saved products |
| `/customer-services/*` | About, contact, FAQ, help, and policy pages |

---

## Project Structure

```text
megamart/
├── app/                          # App Router routes and global styles
│   ├── layout.tsx                # Root layout (MUI theme, navbar, footer, toast)
│   ├── page.tsx                  # Home page
│   ├── error.tsx / loading.tsx / not-found.tsx
│   ├── account/ cart/ orders/ payments/ wishlist/ search/
│   ├── product-page/[category]/  # Category and product detail routes
│   └── customer-services/        # Static information and policy pages
├── src/
│   ├── components/               # Shared UI (navbar, footer, global toast)
│   ├── features/                 # Feature modules: components, hooks, services, types
│   │   ├── account/  auth/  cart/  contact/  home/
│   │   ├── orders/   payments/    product/   wishlist/
│   ├── lib/                      # Firebase and Stripe initialization
│   ├── stores/                   # Zustand stores + category feed URLs (data.json)
│   └── types/                    # Shared TypeScript types
├── public/                       # Images and static assets
├── eslint.config.mjs
├── next.config.mjs
├── postcss.config.mjs
├── tsconfig.json
├── package.json
└── package-lock.json
```

---

## Deployment

The project is deployed on **Netlify** using the `@netlify/plugin-nextjs` runtime:

- Build command: `npm run build`
- Publish directory: `.next` (handled by the Next.js plugin)
- Add all environment variables from the table above to the Netlify site
- Use the Netlify UI for `SECRETS_SCAN_OMIT_KEYS` as described above so public `NEXT_PUBLIC_*` values do not fail secret scanning

---

## Roadmap

- [x] Firebase authentication, profiles, and addresses
- [x] Persistent cart, wishlist, and order history
- [x] Stripe checkout and saved payment methods
- [x] Responsive storefront with dynamic product routes and search
- [ ] Replace remote JSON product feeds with a real backend API
- [ ] Order-success/confirmation page and order status updates
- [ ] Admin dashboard for inventory and order management
- [ ] Unit and integration tests
- [ ] Accessibility, SEO, and performance audits

---

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/xyz`)
3. Commit your changes (`git commit -m 'feat: add xyz'`)
4. Push to your branch (`git push origin feature/xyz`)
5. Open a Pull Request

Before opening a PR, run `npm run lint`, `npx tsc --noEmit`, and `npm run build`, and follow the existing feature-module structure.

---

## License

No license has been specified yet. Please contact the author before reusing or redistributing this project.

---

## Contact

👤 **Youssef Hany**

- GitHub: [@YoussefHany1](https://github.com/YoussefHany1)
- Email: youssefhany.2005.yh@gmail.com

Feel free to open an issue or reach out if you need any help!
