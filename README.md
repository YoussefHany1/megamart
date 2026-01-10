# MegaMart

A modern, responsive e‑commerce storefront built with Next.js (App Router) and React.  
MegaMart is designed to showcase products by category, support dynamic routing, and manage a shopping cart. Though still under active development, it already includes core UI components, routing logic, and state management hooks to jump‑start your online marketplace.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation & Setup](#installation--setup)
5. [Usage](#usage)
6. [Project Structure](#project-structure)
7. [Roadmap](#roadmap)
8. [Contributing](#contributing)
9. [License](#license)
10. [Contact](#contact)

---

## Project Overview

MegaMart aims to be a clean, high‑performance online storefront. Leveraging Next.js’s App Router, it organizes routes for home, category listing, product details, and cart pages. A simple JSON store provides sample data; later iterations will replace this with a real backend API.

---

> **Note:** The project is still under development. Features and content will be updated regularly as new sections are completed.

---

## Features

- **Home page** with featured products carousel (Splide.js)
- **Category pages** (`/product-page/[category]`) generated via dynamic routing
- **Product detail pages** (`/product-page/[category]/[id]`)
- **Shopping cart (Coming Soon)** with add/remove and quantity controls
- **Responsive design** optimized for mobile and desktop
- **Global styles** and component‑level CSS modules
- **Client‑side data fetching** from local `stores/data.json`
- **Loading** and **404** fallbacks

---

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: JavaScript (ES6+)
- **UI**: React, CSS Modules, global CSS
- **State**: React Context & Hooks
- **Data**: Static JSON store (to be replaced with real API)
- **Bundler**: Vite (via Next.js)
- **Version Control**: Git & GitHub

---

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/YoussefHany1/megamart.git
   cd MegaMart
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**
   ```bash
   npm run build
   npm start
   ```

---

## Usage

- **Home**: Browse featured and top‑category products.
- **Categories**: Click any category card to view all products under that category.
- **Product Details**: Click a product to see detailed info and “Add to Cart.”
- **Cart**: View cart contents, update quantities, or remove items.

---

## Project Structure

```
MegaMart/
├── .gitignore
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── README.md
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── home.css
│   ├── layout.js
│   ├── loading.js
│   ├── not-found.js
│   ├── page.js             # Home page
│   ├── cart/
│   │   ├── cart.css
│   │   └── page.js         # /cart page
│   ├── product-page/
│   │   ├── [category]/
│   │   │   ├── page.js     # /product-page/[category]
│   │   │   └── [id]/
│   │   │       ├── page.js # /product-page/[category]/[id]
│   │   │       └── product-page.css
│   ├── swiper/             # Carousel assets
│   │   ├── Untitled-1.webp
│   │   ├── Untitled-2.webp
│   │   ├── Untitled-3.webp
│   │   ├── Untitled-4.webp
│   │   └── Untitled-5.webp
│   └── top-categories/     # Top Categories Section icons
│       ├── mobile.webp
│       ├── pc.webp
│       ├── tv.webp
│       └── watches.webp
└── stores/
    └── data.json           # Sample product data
```

---

## Roadmap

- [ ] Integrate real backend (GraphQL/REST API)
- [ ] User authentication & profiles
- [ ] Checkout workflow & payment integration
- [ ] Admin dashboard for inventory management
- [ ] Unit & integration tests
- [ ] SEO optimizations & performance audits

---

## Contributing

Contributions are welcome! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/xyz`)
3. Commit your changes (`git commit -m 'feat: add xyz'`)
4. Push to your branch (`git push origin feature/xyz`)
5. Open a Pull Request

Be sure to follow the existing code style and include appropriate tests when adding new functionality.

---

## Contact

👤 **Youssef Hany**

- GitHub: [@YoussefHany1](https://github.com/YoussefHany1)
- Email: youssefhany.2005.yh@gmail.com

Feel free to open issues or reach out if you need any help!
