# What Should I Have For Dinner Tonight

A web app that helps people decide what to have for dinner - whether to cook something delicious or order out.

## Features

### MVP Features
- **Auth**: Google OAuth authentication with NextAuth
- **Decision Flows**: Choose between cooking or ordering out
- **Recipe Builder**: 
  - Pantry mode: Generate recipes from ingredients you already have
  - Grocery mode: Get recipe suggestions with shopping lists
- **Order Out**: Find restaurants based on mood, dietary needs, and location
- **Dashboard**: View your recent recipe requests and restaurant searches
- **Blog Foundation**: MDX-based blog system for publishing posts
- **Recipe Directory Foundation**: Placeholder routes and schema for future curated recipes

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Auth**: NextAuth (Auth.js) with Google OAuth
- **Database**: Neon Postgres
- **ORM**: Prisma
- **Validation**: Zod
- **Testing**: Vitest
- **Deployment**: Vercel-ready

## Prerequisites

- Node.js 18+ and npm
- A Neon Postgres database (free tier available)
- A Google OAuth application (for authentication)

## Setup Instructions

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd whatshouldihavefordinnertonight
npm install
```

### 2. Set Up Neon Database

1. Go to [Neon](https://neon.tech) and create a free account
2. Create a new project
3. Copy the connection string (it will look like `postgresql://user:password@host/dbname?sslmode=require`)

### 3. Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Set application type to "Web application"
6. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google` (for local dev)
7. Copy the Client ID and Client Secret

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Fill in the values:

```env
DATABASE_URL="your-neon-connection-string"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
RECIPE_PROVIDER=mock
RESTAURANT_API_PROVIDER=mock
OPENAI_API_KEY=your-openai-api-key
OPENAI_RECIPE_MODEL=gpt-4o-mini
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 5. Set Up Database

```bash
# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed the database (optional)
npm run db:seed
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma Client
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed the database
- `npm run db:studio` - Open Prisma Studio
- `npm test` - Run tests

## Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables:
   - `DATABASE_URL`
   - `NEXTAUTH_URL` (your Vercel domain, e.g., `https://your-app.vercel.app`)
   - `NEXTAUTH_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `RECIPE_PROVIDER=mock`
   - `RESTAURANT_API_PROVIDER=mock`
5. Update Google OAuth redirect URI to include your Vercel domain:
   - `https://your-app.vercel.app/api/auth/callback/google`
6. Click "Deploy"

### 3. Post-Deployment

After deployment, update your Google OAuth settings to include the production callback URL.

## Project Structure

```
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── api/          # API routes
│   │   ├── blog/         # Blog pages
│   │   ├── cook/         # Recipe builder pages
│   │   ├── recipes/      # Recipe directory (placeholder)
│   │   └── app/          # Dashboard
│   ├── components/       # React components
│   └── lib/              # Utilities, providers, validations
├── content/
│   └── blog/             # MDX blog posts
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Database seed
└── docs/                 # Documentation
```

## Documentation

- [Architecture](./docs/ARCHITECTURE.md) - System architecture and data flow
- [Roadmap](./docs/ROADMAP.md) - Future development plans
- [Decisions](./docs/DECISIONS.md) - Technical decisions and rationale
- [Blogging](./docs/BLOGGING.md) - How to publish blog posts
- [Recipe Directory](./docs/RECIPE_DIRECTORY.md) - Recipe directory plans

## License

MIT
