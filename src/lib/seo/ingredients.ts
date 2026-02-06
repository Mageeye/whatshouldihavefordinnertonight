// Core ingredient data for programmatic SEO pages

export interface Ingredient {
  name: string
  slug: string
  category: 'protein' | 'carb' | 'vegetable' | 'pantry'
  keywords: string[]
  description: string
}

export interface IngredientCombo {
  slug: string
  ingredients: string[] // slugs
  title: string
  description: string
}

export interface ConstraintPage {
  slug: string
  title: string
  metaTitle: string
  description: string
  keywords: string[]
}

// Your 20 hero ingredients
export const ingredients: Ingredient[] = [
  {
    name: 'Chicken Breast',
    slug: 'chicken-breast',
    category: 'protein',
    keywords: ['chicken', 'poultry', 'lean protein', 'white meat'],
    description: 'Versatile lean protein perfect for quick weeknight dinners.',
  },
  {
    name: 'Ground Beef',
    slug: 'ground-beef',
    category: 'protein',
    keywords: ['beef', 'hamburger', 'mince', 'red meat'],
    description: 'The ultimate pantry hero for tacos, pasta, and comfort food.',
  },
  {
    name: 'Ground Turkey',
    slug: 'ground-turkey',
    category: 'protein',
    keywords: ['turkey', 'lean meat', 'poultry'],
    description: 'Lean alternative to ground beef with mild flavor.',
  },
  {
    name: 'Beef Stew Meat',
    slug: 'beef-stew-meat',
    category: 'protein',
    keywords: ['beef', 'stew', 'chunks', 'braising'],
    description: 'Perfect for slow-cooked comfort meals and hearty stews.',
  },
  {
    name: 'Pork Chops',
    slug: 'pork-chops',
    category: 'protein',
    keywords: ['pork', 'chops', 'bone-in', 'boneless'],
    description: 'Quick-cooking protein that pairs with almost anything.',
  },
  {
    name: 'Bacon',
    slug: 'bacon',
    category: 'protein',
    keywords: ['pork', 'breakfast', 'crispy', 'smoked'],
    description: 'Adds smoky flavor to any dish, from breakfast to dinner.',
  },
  {
    name: 'Sausage',
    slug: 'sausage',
    category: 'protein',
    keywords: ['pork', 'italian', 'links', 'breakfast sausage'],
    description: 'Pre-seasoned protein that makes dinner prep easy.',
  },
  {
    name: 'Rotisserie Chicken',
    slug: 'rotisserie-chicken',
    category: 'protein',
    keywords: ['chicken', 'pre-cooked', 'shredded', 'store-bought'],
    description: 'The ultimate shortcut for quick, flavorful meals.',
  },
  {
    name: 'Canned Chicken',
    slug: 'canned-chicken',
    category: 'protein',
    keywords: ['chicken', 'pantry', 'shelf-stable', 'quick protein'],
    description: 'Pantry staple for quick salads, wraps, and casseroles.',
  },
  {
    name: 'Canned Tuna',
    slug: 'canned-tuna',
    category: 'protein',
    keywords: ['tuna', 'fish', 'seafood', 'shelf-stable'],
    description: 'Budget-friendly protein for salads, melts, and pasta.',
  },
  {
    name: 'Eggs',
    slug: 'eggs',
    category: 'protein',
    keywords: ['breakfast', 'protein', 'versatile', 'baking'],
    description: 'The most versatile ingredient in your kitchen.',
  },
  {
    name: 'Rice',
    slug: 'rice',
    category: 'carb',
    keywords: ['grain', 'white rice', 'brown rice', 'side dish'],
    description: 'Essential base for stir-fries, bowls, and sides.',
  },
  {
    name: 'Pasta',
    slug: 'pasta',
    category: 'carb',
    keywords: ['noodles', 'spaghetti', 'penne', 'italian'],
    description: 'Quick-cooking comfort food base for endless recipes.',
  },
  {
    name: 'Potatoes',
    slug: 'potatoes',
    category: 'carb',
    keywords: ['russet', 'yukon gold', 'mashed', 'baked', 'roasted'],
    description: 'Comfort food staple that works as main or side.',
  },
  {
    name: 'Tortillas',
    slug: 'tortillas',
    category: 'carb',
    keywords: ['wraps', 'tacos', 'burritos', 'quesadillas', 'flour', 'corn'],
    description: 'Essential for Mexican-inspired meals and quick wraps.',
  },
  {
    name: 'Bread',
    slug: 'bread',
    category: 'carb',
    keywords: ['sandwich', 'toast', 'loaf', 'sliced'],
    description: 'Foundation for sandwiches, toast, and quick meals.',
  },
  {
    name: 'Chicken Broth',
    slug: 'chicken-broth',
    category: 'pantry',
    keywords: ['stock', 'soup base', 'liquid', 'flavor'],
    description: 'Flavor foundation for soups, sauces, and cooking liquid.',
  },
  {
    name: 'Black Beans',
    slug: 'black-beans',
    category: 'pantry',
    keywords: ['beans', 'legumes', 'canned', 'protein', 'fiber'],
    description: 'Protein-packed addition to tacos, bowls, and soups.',
  },
  {
    name: 'Chickpeas',
    slug: 'chickpeas',
    category: 'pantry',
    keywords: ['garbanzo beans', 'legumes', 'hummus', 'salad'],
    description: 'Versatile legume for salads, curries, and snacks.',
  },
  {
    name: 'Frozen Broccoli',
    slug: 'frozen-broccoli',
    category: 'vegetable',
    keywords: ['broccoli', 'frozen vegetables', 'green', 'healthy'],
    description: 'Always-ready vegetable for quick healthy sides.',
  },
]

// Generate smart ingredient combinations
export function getIngredientCombos(): IngredientCombo[] {
  const combos: IngredientCombo[] = [
    // Protein + Carb combos (most searched)
    {
      slug: 'chicken-breast-rice',
      ingredients: ['chicken-breast', 'rice'],
      title: 'Chicken and Rice Recipes',
      description: 'Simple, satisfying chicken and rice dinner ideas.',
    },
    {
      slug: 'chicken-breast-pasta',
      ingredients: ['chicken-breast', 'pasta'],
      title: 'Chicken Pasta Recipes',
      description: 'Creamy, zesty, and comforting chicken pasta dishes.',
    },
    {
      slug: 'ground-beef-rice',
      ingredients: ['ground-beef', 'rice'],
      title: 'Ground Beef and Rice Recipes',
      description: 'Hearty ground beef and rice one-pot meals.',
    },
    {
      slug: 'ground-beef-pasta',
      ingredients: ['ground-beef', 'pasta'],
      title: 'Ground Beef Pasta Recipes',
      description: 'Classic comfort food with ground beef and pasta.',
    },
    {
      slug: 'ground-beef-potatoes',
      ingredients: ['ground-beef', 'potatoes'],
      title: 'Ground Beef and Potato Recipes',
      description: 'Filling ground beef and potato dinners.',
    },
    {
      slug: 'chicken-breast-potatoes',
      ingredients: ['chicken-breast', 'potatoes'],
      title: 'Chicken and Potato Recipes',
      description: 'One-pan chicken and potato dinner ideas.',
    },
    {
      slug: 'pork-chops-rice',
      ingredients: ['pork-chops', 'rice'],
      title: 'Pork Chops and Rice Recipes',
      description: 'Easy pork chop dinners served over rice.',
    },
    {
      slug: 'sausage-pasta',
      ingredients: ['sausage', 'pasta'],
      title: 'Sausage Pasta Recipes',
      description: 'Quick Italian sausage pasta dishes.',
    },
    {
      slug: 'sausage-rice',
      ingredients: ['sausage', 'rice'],
      title: 'Sausage and Rice Recipes',
      description: 'One-pot sausage and rice comfort meals.',
    },
    {
      slug: 'eggs-tortillas',
      ingredients: ['eggs', 'tortillas'],
      title: 'Egg and Tortilla Recipes',
      description: 'Quick breakfast burritos and egg tacos.',
    },
    {
      slug: 'ground-beef-tortillas',
      ingredients: ['ground-beef', 'tortillas'],
      title: 'Ground Beef Taco Recipes',
      description: 'Easy taco night with ground beef.',
    },
    {
      slug: 'chicken-breast-tortillas',
      ingredients: ['chicken-breast', 'tortillas'],
      title: 'Chicken Taco Recipes',
      description: 'Chicken tacos, burritos, and quesadillas.',
    },
    {
      slug: 'bacon-eggs',
      ingredients: ['bacon', 'eggs'],
      title: 'Bacon and Egg Recipes',
      description: 'Classic bacon and egg breakfast and dinner ideas.',
    },
    {
      slug: 'rotisserie-chicken-rice',
      ingredients: ['rotisserie-chicken', 'rice'],
      title: 'Rotisserie Chicken and Rice',
      description: 'Quick meals using store-bought rotisserie chicken.',
    },
    {
      slug: 'canned-tuna-pasta',
      ingredients: ['canned-tuna', 'pasta'],
      title: 'Tuna Pasta Recipes',
      description: 'Budget-friendly tuna pasta dinners.',
    },
    {
      slug: 'black-beans-rice',
      ingredients: ['black-beans', 'rice'],
      title: 'Black Beans and Rice',
      description: 'Classic Cuban-inspired beans and rice.',
    },
    {
      slug: 'chickpeas-rice',
      ingredients: ['chickpeas', 'rice'],
      title: 'Chickpea and Rice Recipes',
      description: 'Vegetarian chickpea and rice bowls.',
    },
    {
      slug: 'ground-turkey-rice',
      ingredients: ['ground-turkey', 'rice'],
      title: 'Ground Turkey and Rice',
      description: 'Lean ground turkey rice bowls and meals.',
    },
    {
      slug: 'sausage-potatoes',
      ingredients: ['sausage', 'potatoes'],
      title: 'Sausage and Potatoes',
      description: 'Sheet pan sausage and potato dinners.',
    },
    {
      slug: 'chicken-breast-broccoli',
      ingredients: ['chicken-breast', 'frozen-broccoli'],
      title: 'Chicken and Broccoli Recipes',
      description: 'Healthy chicken and broccoli stir-fries and bakes.',
    },
  ]

  return combos
}

// Diet constraint pages
export const dietPages: ConstraintPage[] = [
  {
    slug: 'keto-dinner-ideas',
    title: 'Keto Dinner Ideas',
    metaTitle: 'Easy Keto Dinner Ideas | Low-Carb Recipes',
    description: 'Low-carb, high-fat dinner recipes for your keto lifestyle.',
    keywords: ['keto', 'low carb', 'ketogenic', 'high fat'],
  },
  {
    slug: 'low-carb-dinners',
    title: 'Low Carb Dinners',
    metaTitle: 'Low Carb Dinner Recipes | Easy Ideas',
    description: 'Satisfying dinner ideas that keep carbs in check.',
    keywords: ['low carb', 'reduced carb', 'healthy'],
  },
  {
    slug: 'high-protein-meals',
    title: 'High Protein Meals',
    metaTitle: 'High Protein Dinner Ideas | Protein-Packed Recipes',
    description: 'Protein-packed dinners for muscle building and satiety.',
    keywords: ['high protein', 'protein rich', 'muscle building'],
  },
  {
    slug: 'vegetarian-dinners',
    title: 'Vegetarian Dinners',
    metaTitle: 'Easy Vegetarian Dinner Ideas | Meatless Recipes',
    description: 'Delicious meatless dinner ideas the whole family will love.',
    keywords: ['vegetarian', 'meatless', 'plant-based'],
  },
  {
    slug: 'gluten-free-dinners',
    title: 'Gluten Free Dinners',
    metaTitle: 'Gluten Free Dinner Recipes | Easy Ideas',
    description: 'Tasty gluten-free dinner recipes for every night.',
    keywords: ['gluten free', 'celiac', 'wheat free'],
  },
  {
    slug: 'dairy-free-dinners',
    title: 'Dairy Free Dinners',
    metaTitle: 'Dairy Free Dinner Ideas | Lactose Free Recipes',
    description: 'Creamy, satisfying dinners without the dairy.',
    keywords: ['dairy free', 'lactose free', 'no milk'],
  },
]

// Appliance constraint pages
export const appliancePages: ConstraintPage[] = [
  {
    slug: 'air-fryer-recipes',
    title: 'Air Fryer Recipes',
    metaTitle: 'Easy Air Fryer Dinner Recipes | Quick & Crispy',
    description: 'Crispy, quick dinners made in your air fryer.',
    keywords: ['air fryer', 'crispy', 'quick cooking'],
  },
  {
    slug: 'instant-pot-recipes',
    title: 'Instant Pot Recipes',
    metaTitle: 'Instant Pot Dinner Recipes | Pressure Cooker Meals',
    description: 'Set-it-and-forget-it Instant Pot dinner ideas.',
    keywords: ['instant pot', 'pressure cooker', 'one pot'],
  },
  {
    slug: 'slow-cooker-recipes',
    title: 'Slow Cooker Recipes',
    metaTitle: 'Slow Cooker Dinner Recipes | Crockpot Meals',
    description: 'Come home to a ready-made slow cooker dinner.',
    keywords: ['slow cooker', 'crockpot', 'set and forget'],
  },
  {
    slug: 'sheet-pan-dinners',
    title: 'Sheet Pan Dinners',
    metaTitle: 'Easy Sheet Pan Dinner Recipes | One Pan Meals',
    description: 'One-pan dinners with minimal cleanup.',
    keywords: ['sheet pan', 'one pan', 'easy cleanup'],
  },
  {
    slug: 'one-pot-meals',
    title: 'One Pot Meals',
    metaTitle: 'One Pot Dinner Recipes | Easy Cleanup Meals',
    description: 'Everything cooks in one pot for easy weeknight dinners.',
    keywords: ['one pot', 'easy cleanup', 'simple'],
  },
  {
    slug: 'skillet-dinners',
    title: 'Skillet Dinners',
    metaTitle: 'Skillet Dinner Recipes | Cast Iron Meals',
    description: 'Quick stovetop dinners made in a single skillet.',
    keywords: ['skillet', 'stovetop', 'cast iron', 'pan'],
  },
]

// Time constraint pages
export const timePages: ConstraintPage[] = [
  {
    slug: '15-minute-meals',
    title: '15 Minute Meals',
    metaTitle: '15 Minute Dinner Recipes | Super Quick Meals',
    description: 'Dinner on the table in 15 minutes or less.',
    keywords: ['15 minute', 'super quick', 'fast dinner'],
  },
  {
    slug: '20-minute-meals',
    title: '20 Minute Meals',
    metaTitle: '20 Minute Dinner Ideas | Quick Weeknight Meals',
    description: 'Quick 20-minute dinners for busy weeknights.',
    keywords: ['20 minute', 'quick', 'weeknight'],
  },
  {
    slug: '30-minute-meals',
    title: '30 Minute Meals',
    metaTitle: '30 Minute Dinner Recipes | Easy Weeknight Ideas',
    description: 'Satisfying dinners ready in 30 minutes.',
    keywords: ['30 minute', 'half hour', 'weeknight'],
  },
  {
    slug: '5-ingredient-dinners',
    title: '5 Ingredient Dinners',
    metaTitle: '5 Ingredient Dinner Recipes | Simple Meals',
    description: 'Simple dinners with just 5 ingredients or less.',
    keywords: ['5 ingredient', 'simple', 'minimal ingredients'],
  },
]

// Helper to get all pSEO slugs for routing
export function getAllPSEOSlugs(): string[] {
  const ingredientSlugs = ingredients.map((i) => i.slug)
  const comboSlugs = getIngredientCombos().map((c) => c.slug)
  const dietSlugs = dietPages.map((p) => p.slug)
  const applianceSlugs = appliancePages.map((p) => p.slug)
  const timeSlugs = timePages.map((p) => p.slug)

  return [...ingredientSlugs, ...comboSlugs, ...dietSlugs, ...applianceSlugs, ...timeSlugs]
}

// Get page data by slug
export function getPageBySlug(slug: string) {
  // Check ingredients
  const ingredient = ingredients.find((i) => i.slug === slug)
  if (ingredient) {
    return { type: 'ingredient' as const, data: ingredient }
  }

  // Check combos
  const combo = getIngredientCombos().find((c) => c.slug === slug)
  if (combo) {
    return { type: 'combo' as const, data: combo }
  }

  // Check diet pages
  const diet = dietPages.find((p) => p.slug === slug)
  if (diet) {
    return { type: 'diet' as const, data: diet }
  }

  // Check appliance pages
  const appliance = appliancePages.find((p) => p.slug === slug)
  if (appliance) {
    return { type: 'appliance' as const, data: appliance }
  }

  // Check time pages
  const time = timePages.find((p) => p.slug === slug)
  if (time) {
    return { type: 'time' as const, data: time }
  }

  return null
}

// Get related pages for internal linking
export function getRelatedPages(slug: string, limit = 5) {
  const page = getPageBySlug(slug)
  if (!page) return []

  const related: { slug: string; title: string }[] = []

  if (page.type === 'ingredient') {
    // Link to combos containing this ingredient
    const combos = getIngredientCombos().filter((c) => c.ingredients.includes(slug))
    combos.slice(0, 3).forEach((c) => related.push({ slug: c.slug, title: c.title }))

    // Link to same-category ingredients
    const sameCategory = ingredients.filter(
      (i) => i.category === page.data.category && i.slug !== slug
    )
    sameCategory.slice(0, 2).forEach((i) => related.push({ slug: i.slug, title: `${i.name} Recipes` }))
  }

  if (page.type === 'combo') {
    // Link to the individual ingredient pages
    page.data.ingredients.forEach((ingSlug) => {
      const ing = ingredients.find((i) => i.slug === ingSlug)
      if (ing) related.push({ slug: ing.slug, title: `More ${ing.name} Recipes` })
    })

    // Link to related combos (sharing an ingredient)
    const relatedCombos = getIngredientCombos().filter(
      (c) =>
        c.slug !== slug &&
        c.ingredients.some((i) => page.data.ingredients.includes(i))
    )
    relatedCombos.slice(0, 3).forEach((c) => related.push({ slug: c.slug, title: c.title }))
  }

  // Always add some constraint pages
  if (related.length < limit) {
    const constraints = [...dietPages.slice(0, 2), ...timePages.slice(0, 2)]
    constraints.forEach((p) => {
      if (related.length < limit) {
        related.push({ slug: p.slug, title: p.title })
      }
    })
  }

  return related.slice(0, limit)
}
