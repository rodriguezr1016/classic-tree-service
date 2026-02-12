# Classic Tree Service

Marketing site and lead capture app for Classic Tree Service, built with Next.js. The site showcases services, provides an about page, and includes a quote request form with optional photo uploads that stores leads in MongoDB.

**Features**
- Home and About pages with service highlights
- Footer quote request form with optional image uploads
- Lead capture API (`POST /api/leads`) with basic validation and spam honeypot
- EdgeStore upload handler (`/api/edgestore/[...edgestore]`)
- Vercel Analytics integration

**Tech Stack**
- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4
- MongoDB + Mongoose
- EdgeStore for file uploads

**Getting Started**
1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` with required variables:

```bash
MONGODB_URI="your_mongodb_connection_string"
MONGODB_DB="classic-tree-service"
EDGE_STORE_ACCESS_KEY="your_edge_store_access_key"
EDGE_STORE_SECRET_KEY="your_edge_store_secret_key"
```


3. Start the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

**Scripts**
- `npm run dev`: Start the Next.js dev server
- `npm run build`: Production build
- `npm run start`: Run the production server
- `npm run lint`: Run ESLint

**Project Structure**
- `app/`: App Router pages, layout, and components
- `app/api/leads/route.ts`: Lead capture endpoint
- `app/api/edgestore/[...edgestore]/route.ts`: EdgeStore handler
- `lib/mongodb.ts`: MongoDB connection helper
- `models/leads.ts`: Mongoose schema for leads
- `public/`: Static assets

**Notes**
- The quote form uses a honeypot field (`companyWebsite`) to reduce spam.
- Image uploads are optional and limited to 10 images per submission.

# Screenshots
<img width="1440" height="779" alt="Screenshot 2026-02-12 at 11 44 33 AM" src="https://github.com/user-attachments/assets/29611618-883c-42b2-9ad0-65634e525415" />
<img width="1440" height="779" alt="Screenshot 2026-02-12 at 11 45 14 AM" src="https://github.com/user-attachments/assets/52257bdc-ba0e-4cee-94ac-b1bc8d22736f" />
