# pSEO Combo Page Template

This document defines the standard template for all programmatic SEO (pSEO) combo pages at `/recipes/[slug]`. Every combo page should follow this structure to ensure consistent quality, SEO coverage, and user experience.

**Reference implementation:** `chicken-breast-rice` page.

---

## Page Architecture

```
Server Component (ComboPage)
├── Structured Data (JSON-LD, server-rendered)
│   ├── RecipeIdeasSchema (ItemList)
│   ├── RecipeSchemaList (individual Recipe schemas)
│   └── BreadcrumbList (via Breadcrumbs component)
│
├── Breadcrumbs
├── Hero Section (H1 + extended intro)
│
├── Recipe Ideas Grid (client component)
│   ├── RecipeIdeaCard (clickable)
│   └── RecipeDetailModal (full recipe popup)
│
├── Flavor Directions (contextual content)
├── Popular Add-Ins (contextual content)
├── Substitutions (contextual content)
│
├── Recipe Generator (RecipeBuilder - AI tool)
├── FAQ Section (with FAQPage JSON-LD)
├── Explore Each Ingredient (internal links)
└── Related Recipes (internal links)
```

---

## Data Requirements

### 1. Combo Data (`src/lib/seo/ingredients.ts`)

Each combo entry in `getIngredientCombos()` needs these fields:

| Field | Required | Description |
|---|---|---|
| `slug` | Yes | URL slug (e.g. `chicken-breast-rice`) |
| `ingredients` | Yes | Array of ingredient slugs |
| `title` | Yes | Page title (e.g. "Chicken and Rice Recipes") |
| `description` | Yes | Short description for meta tags |
| `extendedIntro` | Yes* | 2-3 sentence intro paragraph for the hero section. Should include natural keyword variations. |
| `commonAddIns` | Yes* | Array of popular add-in ingredient names (e.g. `['broccoli', 'peas']`) |
| `flavorDirections` | Yes* | Array of `{ name, suggestions[] }` for cuisine-themed flavor combos |
| `substitutions` | Yes* | Array of `{ original, alternatives[] }` for ingredient swaps |
| `queryVariations` | Yes* | Array of search query variations for SEO targeting |
| `indexable` | Yes* | `true` to index the page, `false` for `noindex` |

*Required for priority/indexable pages. Pages without these fields still render but with less content.

### 2. Recipe Ideas (`src/lib/seo/recipe-ideas.ts`)

Each combo needs 8 full recipe entries in `recipeIdeasBySlug`. Every recipe must include:

| Field | Required | Type | Description |
|---|---|---|---|
| `title` | Yes | string | Recipe name |
| `description` | Yes | string | 1-2 sentence description |
| `timeMinutes` | Yes | number | Total time (used for card display) |
| `method` | Yes | enum | Cooking method (stir-fry, one-pan, casserole, bowl, skillet, sheet-pan, slow-cooker, instant-pot, baked, soup, salad) |
| `difficulty` | Yes | enum | 'easy' or 'medium' |
| `prepTime` | Yes | number | Prep time in minutes |
| `cookTime` | Yes | number | Cook time in minutes |
| `servings` | Yes | number | Number of servings |
| `cuisine` | Yes | string | Cuisine type (e.g. "Asian", "Mexican") |
| `ingredients` | Yes | string[] | Full ingredient list with quantities |
| `instructions` | Yes | string[] | Step-by-step cooking instructions |
| `nutrition` | Yes | object | `{ calories, protein, carbs, fat }` per serving |

### 3. FAQs (`src/lib/seo/recipe-ideas.ts`)

Each combo needs 5 FAQs in `faqsBySlug`:

| Field | Required | Description |
|---|---|---|
| `question` | Yes | Natural question people search for |
| `answer` | Yes | 2-3 sentence helpful answer |

---

## Component Reference

### RecipeIdeaCard (`src/components/RecipeIdeaCard.tsx`)
- Displays recipe preview card in the grid
- Entire card is clickable (renders as `<button>`)
- Shows "View full recipe" affordance for recipes with complete data
- Falls back to non-clickable display for preview-only recipes (no `ingredients`/`instructions`)

### RecipeIdeasGrid (`src/components/RecipeIdeasGrid.tsx`)
- Client component (`'use client'`)
- Renders 2x3x4 responsive grid of RecipeIdeaCards
- Manages modal state (`useState` for selected recipe)
- Renders `RecipeDetailModal` when a recipe is selected

### RecipeDetailModal (`src/components/RecipeDetailModal.tsx`)
- Client component - full recipe popup
- Shows: title, description, meta badges (prep/cook/total time, servings, cuisine, method, difficulty), nutrition grid, ingredients list, numbered instructions
- Closes on: Escape key, backdrop click, X button, Close button
- Body scroll lock when open
- Responsive: full-width mobile, max-w-2xl centered on desktop

### StructuredData (`src/components/StructuredData.tsx`)
- `RecipeIdeasSchema` - outputs `schema.org/ItemList` for the recipe collection
- `RecipeSchemaList` - outputs individual `schema.org/Recipe` JSON-LD for each full recipe (enables rich recipe snippets in SERPs)
- `WebPageSchema` - outputs `schema.org/WebPage` for page context

### Breadcrumbs (`src/components/Breadcrumbs.tsx`)
- Renders visual breadcrumb navigation
- Injects `schema.org/BreadcrumbList` JSON-LD

### FAQSection (`src/components/FAQSection.tsx`)
- Accordion UI for FAQs
- Injects `schema.org/FAQPage` JSON-LD

---

## SEO Checklist for Each Combo Page

- [ ] `extendedIntro` written with natural keyword variations
- [ ] 8 full recipes with ingredients, instructions, and nutrition
- [ ] 5 FAQs targeting real search queries
- [ ] `flavorDirections` with 3+ cuisine themes
- [ ] `commonAddIns` with 6-8 popular additions
- [ ] `substitutions` with 2+ swap options
- [ ] `indexable` flag set (true for high-priority, false for long-tail)
- [ ] `queryVariations` populated for keyword coverage
- [ ] Recipe JSON-LD renders in page source (verify with Google Rich Results Test)
- [ ] Breadcrumb, ItemList, and FAQPage JSON-LD all present

---

## How to Add a New Combo Page

1. **Add combo data** in `src/lib/seo/ingredients.ts` inside `getIngredientCombos()`:
   - Define slug, ingredients, title, description
   - Add extendedIntro, commonAddIns, flavorDirections, substitutions, queryVariations
   - Set `indexable: true` if this is a priority page

2. **Add recipe ideas** in `src/lib/seo/recipe-ideas.ts`:
   - Add an entry to `recipeIdeasBySlug` with the combo slug as key
   - Include 8 complete recipes with all required fields
   - Aim for variety in method, cuisine, and difficulty

3. **Add FAQs** in `src/lib/seo/recipe-ideas.ts`:
   - Add an entry to `faqsBySlug` with the combo slug as key
   - Include 5 questions that match real search queries
   - Write helpful, concise answers (2-3 sentences each)

4. **Verify**: Run the dev server, navigate to `/recipes/[your-slug]`, and confirm:
   - Recipe cards are clickable and open the modal with full content
   - All contextual sections render (flavor directions, add-ins, substitutions)
   - FAQs render with accordion behavior
   - View page source to verify JSON-LD structured data

---

## Content Guidelines

### Recipe Writing
- **Ingredients**: Include specific quantities (e.g. "2 tablespoons soy sauce" not just "soy sauce")
- **Instructions**: Write 5-7 clear, sequential steps. Each step should be one action.
- **Nutrition**: Provide per-serving estimates. Round to whole numbers.
- **Descriptions**: Write for humans first, SEO second. Be specific about what makes the recipe appealing.

### FAQ Writing
- **Questions**: Use natural phrasing that matches search queries (e.g. "What can I make with..." not "Recipes using...")
- **Answers**: Be genuinely helpful. Include actionable tips, not just generic advice.

### Extended Intros
- Include 2-3 natural keyword variations
- Speak directly to the user's intent ("Looking for easy chicken and rice dinner ideas?")
- Keep to 2-3 sentences max
