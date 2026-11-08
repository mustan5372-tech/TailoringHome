# Tailoring Home & Fabric Home

A unified, premium boutique catalogue and promotional web application for two collaborative entities:
1. **Tailoring Home** – Artisanal bespoke stitching, master cutting, and custom fitting services.
2. **Fabric Home** – An exquisite archive of curated luxury fabrics, silks, linens, wools, and fine textiles.

> **Note:** This is an exclusive catalogue and promotional showcase website, **not** an e-commerce shopping platform.

---

## 🎨 Design Philosophy & Boutique Aesthetic

The visual language reflects the heritage and meticulous precision of bespoke master tailoring:
- **Warm Ivory & Cream:** `#FDFBF7`, `#F8F5EE`, `#F3EFE6`
- **Chocolate Brown:** `#2E1C14`, `#462B21`, `#5C3E32`
- **Muted Maroon:** `#5E1F27`, `#822E39`, `#A1434F`
- **Champagne Gold Accents:** `#C5A059`, `#DFC78F`
- **Typography:**
  - *Serif Display:* Playfair Display & Cormorant Garamond for regal headings.
  - *Sans Body:* Plus Jakarta Sans for high-legibility mobile-first body text.
- **Mobile-First Responsive Layouts:** Seamless hamburger drawers, responsive grids, and sticky headers.

---

## 📁 Scalable Project Folder Structure

```
Tailoringhome/
├── .env.example                     # Environment template with Firebase & partition keys
├── .env                             # Local development variables (dev_ prefix)
├── .gitignore                       # Git exclusions (preserves .env.example, ignores secrets)
├── index.html                       # HTML template with Google Fonts preconnections
├── package.json                     # Project manifest and scripts
├── vite.config.js                   # Vite configuration with Tailwind CSS v4 & path alias
├── README.md                        # Documentation and development guide
│
├── public/                          # Static public assets
│
└── src/
    ├── assets/                      # Brand emblems and visual assets
    │
    ├── components/
    │   ├── common/                  # Reusable boutique UI elements
    │   │   ├── Badge.jsx            # Status, shop, and category badge
    │   │   ├── BrandLogo.jsx        # Dual-brand typographic lockup & emblem
    │   │   ├── Button.jsx           # Boutique styled buttons (maroon, chocolate, gold)
    │   │   ├── Card.jsx             # Card container with subtle boutique borders
    │   │   ├── EnvironmentBanner.jsx# Dev-mode partition & staged status indicator
    │   │   └── SectionHeading.jsx   # Serif heading with golden decorative rules
    │   │
    │   └── layout/                  # Structural layout components
    │       ├── Header.jsx           # Boutique top announcement & contact bar
    │       ├── Navbar.jsx           # Responsive navigation with mobile drawer
    │       └── Footer.jsx           # Dual-shop footer, hours, and direct links
    │
    ├── config/                      # Core runtime configurations
    │   ├── env.config.js            # Environment validation & partition getters
    │   └── firebase.config.js       # Safe Firebase initialization with staged fallback
    │
    ├── constants/
    │   └── navigation.js            # Centralized routes, shop data, and navigation links
    │
    ├── layouts/
    │   ├── PublicLayout.jsx         # Public boutique layout with Header, Nav, and Footer
    │   └── AdminLayout.jsx          # Separate admin layout with environment diagnostics
    │
    ├── pages/
    │   ├── public/                  # Public website views
    │   │   ├── HomePage.jsx         # Unified showcase & dual-shop portals
    │   │   ├── TailoringHomePage.jsx# Tailoring Home stitching services catalogue
    │   │   ├── FabricHomePage.jsx   # Fabric Home textile varieties catalogue
    │   │   ├── GalleryPage.jsx      # Visual archive with category filters
    │   │   ├── AboutPage.jsx        # Heritage story of both ateliers
    │   │   └── ContactPage.jsx      # Dual-shop locations, hours & consultation form
    │   │
    │   ├── admin/                   # Administrative views (Future Phase)
    │   │   ├── AdminDashboardPage.jsx# Admin console & module roadmap
    │   │   └── AdminCleanupPage.jsx  # Test data & Firebase Storage purge utility
    │   │
    │   └── NotFoundPage.jsx         # Custom boutique 404 handler
    │
    ├── routes/
    │   └── AppRoutes.jsx            # Declarative route hierarchy (Public & Admin)
    │
    ├── services/
    │   └── firebase/                # Modular Firebase service layer
    │       ├── firestore.service.js # Partitioned Firestore CRUD operations
    │       ├── storage.service.js   # Scoped Cloud Storage upload & delete
    │       ├── cleanup.service.js   # Atomic Firestore doc + Storage file purge
    │       └── index.js             # Service barrel export
    │
    ├── styles/
    │   └── index.css                # Tailwind CSS v4 @theme & typography definitions
    │
    └── utils/
        ├── formatters.js            # Currency & date formatters
        └── helpers.js               # CSS class merger & string helpers
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js:** v18.0.0 or higher (v24+ recommended)
- **npm:** v9.0.0 or higher

### 2. Installation
Clone the repository and install dependencies:

```bash
cd Tailoringhome
npm install
```

### 3. Environment Configuration
Copy the template file to create your local `.env`:

```bash
cp .env.example .env
```

The application is preconfigured with development partitions:
```env
VITE_APP_ENV=development
VITE_FIRESTORE_COLLECTION_PREFIX=dev_
VITE_FIREBASE_STORAGE_FOLDER=dev_uploads
```

### 4. Running the Development Server
Start the Vite development server:

```bash
npm run dev
```

Open your browser at `http://localhost:5173`.

### 5. Production Build
Verify compilation and produce optimized production bundles:

```bash
npm run build
npm run preview
```

---

## 🔒 Firebase Architecture & Data Hygiene

### 1. Development vs. Production Partitioning
To ensure test data never contaminates production records:
- **Firestore Collections:** Automatically prefixed via `env.firestorePrefix`.
  - Development: `dev_tailoring_services`, `dev_fabrics_catalogue`, `dev_gallery_showcase`
  - Production: `prod_tailoring_services`, `prod_fabrics_catalogue`, `prod_gallery_showcase`
- **Cloud Storage Folders:** Scoped via `env.storageFolder`.
  - Development: `dev_uploads/`
  - Production: `prod_uploads/`

### 2. Atomic Test-Image Deletion (`cleanup.service.js`)
When catalogue test records or promotional images are deleted:
1. `deleteRecordWithAssets(collection, docId, assetPath)` first invokes `deleteObject()` on Firebase Storage to remove the file from cloud storage.
2. It then deletes the Firestore document using `deleteDoc()`.
3. The Admin panel includes a dedicated **Test Image Cleanup Utility** (`/admin/cleanup`) to batch-purge all records tagged with `isTest: true`.

---

## 🗺️ Route Map

| Path | Description | Access |
| :--- | :--- | :--- |
| `/` | **Home:** Unified showcase of both boutiques | Public |
| `/tailoring` | **Tailoring Home:** Bespoke stitching & alteration catalogue | Public |
| `/fabric` | **Fabric Home:** Curated textile varieties repository | Public |
| `/gallery` | **Gallery:** Creation showcases with filter controls | Public |
| `/about` | **About Us:** Heritage, craft story, and values | Public |
| `/contact` | **Contact:** Dual-shop addresses, phone numbers & hours | Public |
| `/admin` | **Admin Dashboard:** Architectural status & module cards | Admin |
| `/admin/cleanup` | **Purge Utility:** Coordinated Firestore + Storage cleanup | Admin |
| `*` | **404:** Custom boutique Not Found screen | Public |

---

## 📋 Status & Roadmap

- [x] **Phase 1: Project Initialization (Completed)**
  - React 19 + Vite 8 scaffold
  - Tailwind CSS v4 styling & boutique color system
  - Lucide React icon integration
  - Scalable modular folder architecture
  - Public routes: Home, Tailoring, Fabric, Gallery, About, Contact, 404
  - Dedicated Admin layout & route shell
  - Isolated environment architecture (Dev vs. Prod)
  - Coordinated Firestore & Firebase Storage cleanup service
- [ ] **Phase 2: Content Population & Firebase Live Link (Pending approval)**
  - Connect live Firebase project keys
  - Dynamic catalogue fetching
  - Image upload pipeline with size compression
  - Customer consultation enquiry handling
