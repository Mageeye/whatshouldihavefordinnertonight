# Recipe Directory

## Overview

The Recipe Directory is a foundation for a future feature that will allow users to browse, search, and view curated recipes. Currently, only the foundation is implemented.

## Current Implementation

### Database Model

The `DirectoryRecipe` model in Prisma schema includes:

- `id`: Unique identifier
- `slug`: URL-friendly identifier (unique)
- `title`: Recipe name
- `description`: Brief description
- `cuisine`: Type of cuisine
- `difficulty`: Difficulty level
- `timeMinutes`: Total time required
- `ingredientsJson`: Ingredients as JSON
- `stepsJson`: Cooking steps as JSON
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### Routes

- `/recipes`: Directory index page (placeholder)
- `/recipes/[slug]`: Recipe detail page (placeholder)

### Seed Data

An example recipe is included in the seed file (`prisma/seed.ts`) to demonstrate the structure.

## Future Implementation

### Phase 1: CRUD Interface

- Admin interface to create/edit/delete recipes
- Form validation
- Image uploads
- Rich text editor for instructions

### Phase 2: Public Features

- Recipe listing page with search and filters
- Recipe detail pages with full instructions
- Recipe categories and tags
- Related recipes
- Print-friendly recipe pages

### Phase 3: User Features

- User-submitted recipes
- Recipe ratings and reviews
- Save favorite recipes
- Share recipes
- Recipe collections

### Phase 4: Advanced Features

- Recipe scaling (adjust servings)
- Unit conversion
- Nutritional information
- Recipe video integration
- Shopping list generation
- Meal planning integration

## Schema Considerations

The current schema uses JSON fields for ingredients and steps. This provides flexibility but may need refinement:

- Consider structured ingredient model (name, amount, unit, notes)
- Consider step model with images
- Add fields for: prep time, cook time, servings, yield
- Add nutritional information
- Add equipment/appliances needed
- Add dietary tags (vegetarian, vegan, gluten-free, etc.)

## SEO Considerations

When implementing the full directory:

- Generate sitemap for all recipes
- Add structured data (JSON-LD) for recipes
- Optimize meta tags
- Add breadcrumbs
- Implement canonical URLs

## Migration Path

When ready to build the full directory:

1. Enhance Prisma schema with additional fields
2. Create migration
3. Build admin CRUD interface
4. Build public listing and detail pages
5. Add search and filtering
6. Implement SEO optimizations
