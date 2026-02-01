# Technical Decisions

## Framework: Next.js 14 App Router

**Decision**: Use Next.js 14 with App Router instead of Pages Router.

**Rationale**:
- Modern React Server Components support
- Better performance with server-side rendering
- Built-in API routes
- Excellent TypeScript support
- Optimized for Vercel deployment

## Database: Neon Postgres

**Decision**: Use Neon Postgres as the database.

**Rationale**:
- Serverless Postgres with generous free tier
- Easy scaling
- Good performance
- Compatible with Prisma
- Easy to migrate to other Postgres providers if needed

## ORM: Prisma

**Decision**: Use Prisma as the ORM.

**Rationale**:
- Type-safe database queries
- Excellent migration system
- Good developer experience
- Works well with Next.js
- NextAuth Prisma adapter available

## Authentication: NextAuth (Auth.js)

**Decision**: Use NextAuth v5 (Auth.js) for authentication.

**Rationale**:
- Industry standard for Next.js
- Built-in OAuth support
- Prisma adapter available
- Session management
- Good security practices

## Styling: Tailwind CSS

**Decision**: Use Tailwind CSS for styling.

**Rationale**:
- Utility-first approach for rapid development
- Consistent design system
- Small bundle size
- Excellent documentation
- Typography plugin for blog

## Validation: Zod

**Decision**: Use Zod for schema validation.

**Rationale**:
- TypeScript-first
- Type inference
- Great error messages
- Works well with forms and API routes
- Lightweight

## Blog: MDX Filesystem

**Decision**: Use filesystem-based MDX for blog posts instead of a CMS.

**Rationale**:
- Fast MVP implementation
- No additional database tables needed
- Easy to version control
- Can migrate to CMS later if needed
- Good performance

## Provider Pattern

**Decision**: Abstract recipe and restaurant providers behind interfaces.

**Rationale**:
- Easy to swap implementations
- Testable
- Can add multiple providers
- Environment-based configuration
- Clean separation of concerns

## Testing: Vitest

**Decision**: Use Vitest for testing.

**Rationale**:
- Fast
- Good TypeScript support
- Compatible with Jest API
- Works well with Next.js
- Modern tooling

## Mock Providers for MVP

**Decision**: Use mock providers instead of real APIs for MVP.

**Rationale**:
- Faster development
- No API costs during development
- Predictable behavior
- Easy to test
- Can swap to real APIs later without changing UI
