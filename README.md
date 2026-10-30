# ♻️ ReUse Market

> **"Give Products a Second Life."**  
> *Buy Smart. Sell Easy. Reuse More.*

[![Vercel Live Demo](https://img.shields.io/badge/Vercel-Live%20Demo-emerald?style=for-the-badge&logo=vercel)](https://reuse-market-liart.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-ReUse--Market-blue?style=for-the-badge&logo=github)](https://github.com/shyambalaji27/ReUse-Market)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**ReUse Market** is a modern, attractive, fully responsive **Second-Hand Product Marketplace Website** designed to connect individual buyers directly with verified original first owners. By removing intermediary brokers, refurbishing markups, and hidden costs, ReUse Market champions transparent local peer-to-peer commerce and promotes environmental sustainability by reducing electronic and material waste.

---

## 🌟 Live Demo

🔗 **Live Website (Vercel):** [https://reuse-market-liart.vercel.app](https://reuse-market-liart.vercel.app)  
📁 **GitHub Repo:** [https://github.com/shyambalaji27/ReUse-Market](https://github.com/shyambalaji27/ReUse-Market)

---

## ✨ Key Features

### 1. 🧭 Sticky & Responsive Navigation
- Accessible navigation bar working across desktop, tablet, and mobile (with slide-over mobile drawer).
- Dynamic navigation links: **Home**, **Products**, **First Owner**, **About Us**, **Contact**, **Login / Sign Up**, and **Sell Your Product**.
- Real-time **Wishlist Counter Badge** and personalized user authentication dropdown.

### 2. 🏠 Engaging Home Landing Page
- **Hero Section**: Catchy tagline *"Buy Smart. Sell Easy. Reuse More."* with quick stat badges.
- **Integrated Multi-Parameter Search Bar**: Search by keyword, category, and city location with instant filtering.
- **Browse Categories**: All 9 categories with direct product counts and hover animations.
- **Curated Showcases**:
  - ⭐ **Featured Products**: Verified Like-New items with high seller trust.
  - 🕒 **Recently Added Products**: Latest listings posted by users.
  - 🔥 **Popular Deals**: Pre-owned goods offering 40% to 65% discounts off original retail.
- **Environmental Impact Counter**: Real-time sustainability metrics (CO₂ emissions prevented, e-waste diverted, and water conserved).
- **Interactive Map Preview**: Embedded geographic preview of regional hubs.

### 3. 🏷️ 9 Comprehensive Product Categories
1. **Mobiles & Electronics** (Flagship phones, smartwatches, noise-canceling headphones)
2. **Laptops & Computers** (MacBooks, gaming laptops, 4K displays)
3. **Furniture** (Ergonomic task chairs, solid teak dining tables, sofas)
4. **Home Appliances** (Smart inverter refrigerators, front-load washers, vacuum cleaners)
5. **Vehicles** (Motorcycles, gear bicycles, city scooters)
6. **Books & Education** (Exam preparation packages, medical textbooks, classic series)
7. **Fashion & Accessories** (Watches, leather trekking boots, polarized eyewear)
8. **Sports Equipment** (Home gyms, professional badminton rackets, table tennis sets)
9. **Gaming Accessories** (Next-gen consoles, VR kits, racing force wheels)

### 4. 🛍️ Interactive Product Cards
Every card includes:
- High-resolution product imagery with condition tags and discount percentages.
- Product name, selling price, original retail price, and total savings.
- Condition badges (**Like New**, **Good**, **Average**, **Used**).
- First owner profile picture, name, and verification status.
- Geographical location icon with neighborhood and city details.
- Posted timestamp (e.g., *"Yesterday"*, *"2 days ago"*).
- Instant action buttons: **View Details** and **Contact Owner**.
- Functional Wishlist (heart) toggle with persistent state.

### 5. 👤 Verified First Owner Showcase & Directory
- Dedicated **First Owner Directory** featuring transparent personal sellers rather than administrative accounts or brokers.
- Full owner profiles: avatar, contact details, city, member tenure, sales track record, star ratings, and personal ownership philosophy/notes.
- Filter owners by location and view all active listings submitted by a specific owner.

### 6. 🗺️ Interactive Tamil Nadu Dummy Map
- Self-contained, 100% offline-ready SVG map of Tamil Nadu with high-fidelity coastline, neighboring water bodies, and district markings.
- Interactive pulsing location pins across key hub cities: **Chennai**, **Tambaram**, **Chengalpattu**, **Coimbatore**, and **Madurai**.
- Floating price badges highlighting prominent items in each city.
- Clickable pins and bubbles that automatically filter marketplace inventory.
- Single product details view includes a zoomed neighborhood radius map.

### 7. 📄 Comprehensive Product Details Page
- Interactive thumbnail image gallery with live preview switching.
- Detailed price savings calculation and condition breakdown report.
- Technical specifications table (Brand, Model, Age of Device, Original Invoices, Warranty status).
- First Owner Card with direct contact options and seller story.
- Product pickup zone map.
- "Similar Products" recommendation carousel.

### 8. 📝 "Sell Your Product" Wizard
- Complete 4-step frontend listing form:
  1. Product Information (Title, Category, Condition, Description)
  2. Pricing & Savings calculation (Original vs Selling Price with auto-discount display)
  3. Image uploader with file previews and quick preset selectors
  4. First Owner contact info and neighborhood pickup location
- On submission, new items immediately publish to `localStorage` and appear in the marketplace and on the map.

### 9. ℹ️ About Us & Circular Economy Guide
- ReUse Market's founding story, mission, and long-term vision.
- Key benefits of circular consumption vs. buying new.
- Educational section detailing e-waste reduction, carbon offsets, and raw material conservation.

### 10. 📞 Contact Page & Interactive FAQs
- Functional contact inquiry form with toast feedback notifications.
- Demonstration corporate headquarters address, contact numbers, and support email.
- Expandable FAQ accordion addressing safety guidelines, buyer protection, meeting locations, and payment practices.

### 11. 🔔 User Experience & State Management
- **Persistent Storage**: Uses `localStorage` to save user listings, wishlist items, and mock authentication profiles across browser sessions.
- **Client-Side SPA Routing**: Hash-based navigation (`#home`, `#products`, `#product-detail/:id`, `#first-owners`, `#sell`, etc.) with zero page reloads.
- **Instant Search & Multi-Filters**: Filter simultaneously by search keywords, category, hub city, condition, price slider, and sorting metrics.
- **Simulated Seller Communication**: Direct mock chat dialog, masked phone number reveal, and pre-formatted WhatsApp inquiry generation.
- **Toast Notifications**: Interactive feedback toasts for all user actions.

---

## 🎨 Color Palette & Design System

| Role | Color | Hex Code |
|---|---|---|
| **Primary Base** | Dark Navy Blue | `#0a0f1d` / `#0f172a` |
| **Secondary Brand** | Emerald Green | `#059669` / `#10b981` |
| **Accent & Deals** | Vibrant Orange | `#f97316` / `#ea580c` |
| **Backgrounds** | Light Grey / Pure White | `#f8fafc` / `#ffffff` |
| **Typography** | Plus Jakarta Sans & Inter | Modern Geometric Sans |

---

## 📁 Project Structure

```text
ReUse-Market/
├── index.html              # Main Single-Page Application (SPA) entry point
├── render.yaml             # Render static deployment blueprint configuration
├── vercel.json             # Vercel SPA routing and clean URL rules
├── README.md               # Project documentation and setup guide
├── css/
│   └── styles.css          # Custom styling, animations, and scrollbars
└── js/
    ├── data.js             # Initial 26 mock products, 8 owners, 9 categories, 8 cities
    ├── state.js            # AppState store: reactive filters, wishlist, auth & routing
    ├── components.js       # Reusable UI templates (Navbar, Cards, Modals, Footer)
    ├── map.js              # Offline SVG Tamil Nadu map & product location visualizer
    └── app.js              # Core router, page view renderers, and form handlers
```

---

## 🚀 Getting Started

### Local Setup (No Dependencies Required)

Because **ReUse Market** is built with modern vanilla web standards and CDN-delivered Tailwind CSS & Font Awesome, you can run it without installing any build tools:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shyambalaji27/ReUse-Market.git
   cd ReUse-Market
   ```

2. **Open the site:**
   - Simply double-click `index.html` to open it directly in Google Chrome, Microsoft Edge, or Mozilla Firefox.
   - Or serve it using Python's built-in HTTP server:
     ```bash
     python -m http.server 8000
     ```
     Then navigate to `http://localhost:8000` in your browser.

---

## ☁️ Deployment

### Vercel
The repository includes [`vercel.json`](vercel.json). Deployed via Vercel CLI or Git integration:
```bash
vercel --prod
```

### Render
The repository includes [`render.yaml`](render.yaml) configured for Render Static Sites:
1. Connect this GitHub repo on [Render Dashboard](https://dashboard.render.com).
2. Render detects `render.yaml` and deploys static assets with rewrite rules automatically.

---

## 🛡️ Demo Notice

> **Important**: ReUse Market is an academic and portfolio prototype. All seller profiles, contact phone numbers (`+91 98xxx xxxxx`), email addresses, and neighborhood coordinates are realistic sample demo data designed for demonstration purposes.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
