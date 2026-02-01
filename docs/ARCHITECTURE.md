# Architecture

## Overview

What Should I Have For Dinner Tonight is a Next.js 14 application built with TypeScript, using the App Router pattern. The application helps users decide what to have for dinner by providing recipe suggestions or restaurant recommendations.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Neon Postgres
- **ORM**: Prisma
- **Authentication**: NextAuth (Auth.js) with Google OAuth
- **Validation**: Zod
- **Content**: MDX for blog posts

## Data Flow

### Recipe Generation Flow

1. User fills out recipe builder form (pantry or grocery mode)
2. Frontend validates input with Zod schemas
3. POST request to `/api/recipes/generate`
4. Server validates request with Zod
5. Recipe provider (currently mock) generates recipes
6. If user is authenticated, save request and results to database
7. Return recipes to frontend
8. Frontend displays recipes in results panel

### Restaurant Search Flow

1. User enters zip code, mood, and dietary preferences
2. POST request to `/api/restaurants/search`
3. Server validates request with Zod
4. Restaurant provider (currently mock) searches restaurants
5. If user is authenticated, save request and results to database
6. Return restaurants to frontend
7. Frontend displays restaurant cards

### Authentication Flow

1. User clicks "Sign In" → redirects to Google OAuth
2. Google OAuth callback → `/api/auth/callback/google`
3. NextAuth creates/updates user in database
4. Session established, user redirected to dashboard or home

## Database Schema

### Core Models

- **User**: NextAuth user model
- **Account**: OAuth account connections
- **Session**: User sessions
- **RecipeRequest**: Stores user recipe requests with input JSON
- **RecipeResult**: Stores generated recipes/restaurants as JSON
- **DirectoryRecipe**: Foundation for future curated recipe directory

## Provider Abstraction

The application uses a provider pattern to abstract recipe and restaurant generation:

- **Recipe Providers**: `src/lib/recipeProviders/`
  - Interface: `RecipeProvider`
  - Implementation: `MockRecipeProvider`
  - Future: OpenAI, Anthropic, etc.

- **Restaurant Providers**: `src/lib/restaurantProviders/`
  - Interface: `RestaurantProvider`
  - Implementation: `MockRestaurantProvider`
  - Future: Google Places, Yelp, etc.

Providers are selected via environment variables:
- `RECIPE_PROVIDER=mock`
- `RESTAURANT_API_PROVIDER=mock`

## Blog System

The blog uses a filesystem-based MDX approach:

- Posts stored in `content/blog/*.mdx`
- Frontmatter parsed with `gray-matter`
- Posts listed and rendered via `src/lib/blog.ts`
- Routes: `/blog` (index) and `/blog/[slug]` (post)

No database required for blog posts in MVP.

## Recipe Directory (Foundation)

- Placeholder routes: `/recipes` and `/recipes/[slug]`
- Prisma model: `DirectoryRecipe`
- No CRUD UI yet - foundation only

## Security

- All API routes validate input with Zod
- Authentication required for dashboard and history
- Session management via NextAuth
- Environment variables for secrets

## Deployment

- Optimized for Vercel deployment
- Environment variables configured via Vercel dashboard
- Database migrations run automatically on deploy
- Static blog posts generated at build time
