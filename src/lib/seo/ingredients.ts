// Core ingredient data for programmatic SEO pages

export interface Ingredient {
  name: string
  slug: string
  category: 'protein' | 'carb' | 'vegetable' | 'pantry'
  keywords: string[]
  description: string
  // pSEO content fields (matching combo page template)
  extendedIntro?: string
  commonAddIns?: string[]
  flavorDirections?: FlavorDirection[]
  substitutions?: Substitution[]
  queryVariations?: string[]
  indexable?: boolean
}

export interface FlavorDirection {
  name: string
  suggestions: string[]
}

export interface Substitution {
  original: string
  alternatives: string[]
}

export interface IngredientCombo {
  slug: string
  ingredients: string[] // slugs
  title: string
  description: string
  // Contextual SEO fields
  extendedIntro?: string
  commonAddIns?: string[]
  flavorDirections?: FlavorDirection[]
  substitutions?: Substitution[]
  queryVariations?: string[]
  indexable?: boolean // true = index, false = noindex
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
    extendedIntro: 'Looking for easy chicken breast dinner ideas? Whether you want a quick pan-seared chicken, a cheesy baked dish, or a healthy stir-fry, chicken breast is the ultimate weeknight protein. These recipes turn simple chicken into restaurant-quality meals in 30 minutes or less.',
    commonAddIns: ['rice', 'broccoli', 'bell peppers', 'garlic', 'onions', 'lemon', 'mushrooms', 'spinach'],
    flavorDirections: [
      { name: 'Asian', suggestions: ['soy sauce', 'sesame oil', 'ginger', 'garlic', 'sriracha'] },
      { name: 'Mediterranean', suggestions: ['lemon', 'oregano', 'feta', 'olives', 'sun-dried tomatoes'] },
      { name: 'Tex-Mex', suggestions: ['cumin', 'chili powder', 'lime', 'cilantro', 'jalapeños'] },
    ],
    substitutions: [
      { original: 'chicken breast', alternatives: ['chicken thighs', 'turkey breast', 'tofu', 'pork tenderloin'] },
    ],
    queryVariations: ['chicken breast recipes', 'what to make with chicken breast', 'easy chicken breast dinner', 'chicken breast dinner ideas'],
    indexable: true,
  },
  {
    name: 'Ground Beef',
    slug: 'ground-beef',
    category: 'protein',
    keywords: ['beef', 'hamburger', 'mince', 'red meat'],
    description: 'The ultimate pantry hero for tacos, pasta, and comfort food.',
    extendedIntro: 'Wondering what to make with ground beef tonight? From quick tacos and juicy burgers to hearty casseroles and comforting meatloaf, ground beef is the budget-friendly protein that does it all. These easy ground beef recipes are perfect for feeding a family on a busy weeknight.',
    commonAddIns: ['onions', 'garlic', 'tomatoes', 'cheese', 'bell peppers', 'rice', 'pasta', 'beans'],
    flavorDirections: [
      { name: 'Tex-Mex', suggestions: ['cumin', 'chili powder', 'salsa', 'jalapeños', 'cilantro'] },
      { name: 'Italian', suggestions: ['marinara', 'basil', 'oregano', 'parmesan', 'garlic'] },
      { name: 'Asian', suggestions: ['soy sauce', 'ginger', 'sesame oil', 'green onions', 'sriracha'] },
    ],
    substitutions: [
      { original: 'ground beef', alternatives: ['ground turkey', 'ground pork', 'ground lamb', 'plant-based crumbles'] },
    ],
    queryVariations: ['ground beef recipes', 'what to make with ground beef', 'easy ground beef dinner', 'hamburger meat recipes'],
    indexable: true,
  },
  {
    name: 'Ground Turkey',
    slug: 'ground-turkey',
    category: 'protein',
    keywords: ['turkey', 'lean meat', 'poultry'],
    description: 'Lean alternative to ground beef with mild flavor.',
    extendedIntro: 'Looking for healthy ground turkey dinner ideas? Ground turkey is the lean, protein-packed swap that works in tacos, pasta, meatballs, and more. These easy ground turkey recipes deliver all the comfort food flavor with fewer calories and less fat than traditional beef.',
    commonAddIns: ['onions', 'garlic', 'bell peppers', 'zucchini', 'rice', 'tomatoes', 'spinach', 'cheese'],
    flavorDirections: [
      { name: 'Tex-Mex', suggestions: ['cumin', 'chili powder', 'lime', 'cilantro', 'black beans'] },
      { name: 'Asian', suggestions: ['soy sauce', 'ginger', 'sesame oil', 'sriracha', 'green onions'] },
      { name: 'Italian', suggestions: ['marinara', 'basil', 'oregano', 'parmesan', 'fennel seeds'] },
    ],
    substitutions: [
      { original: 'ground turkey', alternatives: ['ground chicken', 'ground beef', 'ground pork', 'plant-based crumbles'] },
    ],
    queryVariations: ['ground turkey recipes', 'what to make with ground turkey', 'healthy ground turkey dinner', 'ground turkey meal ideas'],
    indexable: true,
  },
  {
    name: 'Beef Stew Meat',
    slug: 'beef-stew-meat',
    category: 'protein',
    keywords: ['beef', 'stew', 'chunks', 'braising'],
    description: 'Perfect for slow-cooked comfort meals and hearty stews.',
    extendedIntro: 'Got beef stew meat and need dinner inspiration? These slow-cooked, braised, and simmered recipes turn tough cuts into melt-in-your-mouth meals. From classic beef stew to rich curries and pot roasts, beef stew meat is perfect for set-it-and-forget-it comfort food.',
    commonAddIns: ['potatoes', 'carrots', 'onions', 'celery', 'garlic', 'tomatoes', 'mushrooms', 'red wine'],
    flavorDirections: [
      { name: 'Classic American', suggestions: ['Worcestershire sauce', 'thyme', 'bay leaves', 'tomato paste', 'beef broth'] },
      { name: 'Asian', suggestions: ['soy sauce', 'star anise', 'ginger', 'five spice', 'hoisin'] },
      { name: 'Mediterranean', suggestions: ['red wine', 'rosemary', 'olives', 'sun-dried tomatoes', 'oregano'] },
    ],
    substitutions: [
      { original: 'beef stew meat', alternatives: ['chuck roast (cubed)', 'lamb stew meat', 'pork shoulder (cubed)'] },
    ],
    queryVariations: ['beef stew meat recipes', 'what to make with stew meat', 'easy beef stew dinner', 'stew meat dinner ideas'],
    indexable: true,
  },
  {
    name: 'Pork Chops',
    slug: 'pork-chops',
    category: 'protein',
    keywords: ['pork', 'chops', 'bone-in', 'boneless'],
    description: 'Quick-cooking protein that pairs with almost anything.',
    extendedIntro: 'Need easy pork chop dinner ideas? Whether pan-seared, baked, or grilled, pork chops cook fast and pair beautifully with rice, potatoes, and vegetables. These recipes show you how to get perfectly juicy pork chops every time — no more dry, overcooked meat.',
    commonAddIns: ['garlic', 'onions', 'apples', 'potatoes', 'rice', 'mushrooms', 'green beans', 'butter'],
    flavorDirections: [
      { name: 'Classic American', suggestions: ['garlic butter', 'thyme', 'apple cider', 'mustard', 'brown sugar'] },
      { name: 'Asian', suggestions: ['soy sauce', 'honey', 'ginger', 'garlic', 'sesame oil'] },
      { name: 'Italian', suggestions: ['balsamic vinegar', 'rosemary', 'garlic', 'sun-dried tomatoes', 'parmesan'] },
    ],
    substitutions: [
      { original: 'pork chops', alternatives: ['chicken breast', 'pork tenderloin', 'bone-in chicken thighs', 'veal chops'] },
    ],
    queryVariations: ['pork chop recipes', 'what to make with pork chops', 'easy pork chop dinner', 'baked pork chop ideas'],
    indexable: true,
  },
  {
    name: 'Bacon',
    slug: 'bacon',
    category: 'protein',
    keywords: ['pork', 'breakfast', 'crispy', 'smoked'],
    description: 'Adds smoky flavor to any dish, from breakfast to dinner.',
    extendedIntro: 'What can you make with bacon for dinner? Way more than just breakfast! Bacon adds irresistible smoky flavor to pasta, wraps, salads, and breakfast-for-dinner favorites. These bacon dinner recipes prove that everything really is better with bacon.',
    commonAddIns: ['eggs', 'cheese', 'tomatoes', 'lettuce', 'avocado', 'maple syrup', 'onions', 'potatoes'],
    flavorDirections: [
      { name: 'Breakfast for Dinner', suggestions: ['eggs', 'pancakes', 'hash browns', 'maple syrup', 'toast'] },
      { name: 'Smoky & Savory', suggestions: ['cheddar', 'jalapeños', 'ranch', 'BBQ sauce', 'caramelized onions'] },
      { name: 'Italian', suggestions: ['carbonara sauce', 'parmesan', 'eggs', 'black pepper', 'pasta'] },
    ],
    substitutions: [
      { original: 'bacon', alternatives: ['turkey bacon', 'pancetta', 'prosciutto', 'tempeh bacon'] },
    ],
    queryVariations: ['bacon recipes for dinner', 'what to make with bacon', 'easy bacon dinner ideas', 'bacon dinner recipes'],
    indexable: true,
  },
  {
    name: 'Sausage',
    slug: 'sausage',
    category: 'protein',
    keywords: ['pork', 'italian', 'links', 'breakfast sausage'],
    description: 'Pre-seasoned protein that makes dinner prep easy.',
    extendedIntro: 'Looking for quick sausage dinner ideas? Sausage comes pre-seasoned and ready to cook, making it one of the easiest proteins for busy weeknights. From Italian sausage pasta to smoked sausage sheet pan dinners, these recipes deliver big flavor with minimal effort.',
    commonAddIns: ['bell peppers', 'onions', 'potatoes', 'rice', 'pasta', 'garlic', 'tomatoes', 'spinach'],
    flavorDirections: [
      { name: 'Italian', suggestions: ['marinara', 'basil', 'parmesan', 'oregano', 'fennel'] },
      { name: 'Cajun', suggestions: ['Cajun seasoning', 'bell peppers', 'onions', 'celery', 'rice'] },
      { name: 'German', suggestions: ['sauerkraut', 'mustard', 'potatoes', 'beer', 'caraway seeds'] },
    ],
    substitutions: [
      { original: 'pork sausage', alternatives: ['chicken sausage', 'turkey sausage', 'kielbasa', 'andouille'] },
    ],
    queryVariations: ['sausage recipes for dinner', 'what to make with sausage', 'easy sausage dinner ideas', 'Italian sausage recipes'],
    indexable: true,
  },
  {
    name: 'Rotisserie Chicken',
    slug: 'rotisserie-chicken',
    category: 'protein',
    keywords: ['chicken', 'pre-cooked', 'shredded', 'store-bought'],
    description: 'The ultimate shortcut for quick, flavorful meals.',
    extendedIntro: 'Grabbed a rotisserie chicken and need dinner ideas? This store-bought shortcut is the secret to 15-minute meals that taste like you spent hours cooking. From quick chicken salads and soups to creamy enchiladas and loaded rice bowls, rotisserie chicken makes weeknight dinners effortless.',
    commonAddIns: ['rice', 'tortillas', 'salad greens', 'pasta', 'cheese', 'avocado', 'BBQ sauce', 'broccoli'],
    flavorDirections: [
      { name: 'Tex-Mex', suggestions: ['salsa', 'cheese', 'tortillas', 'lime', 'cilantro'] },
      { name: 'Asian', suggestions: ['soy sauce', 'sesame oil', 'ginger', 'hoisin', 'green onions'] },
      { name: 'Mediterranean', suggestions: ['hummus', 'cucumber', 'feta', 'pita', 'tzatziki'] },
    ],
    substitutions: [
      { original: 'rotisserie chicken', alternatives: ['shredded chicken breast', 'canned chicken', 'grilled chicken strips'] },
    ],
    queryVariations: ['rotisserie chicken recipes', 'what to make with rotisserie chicken', 'easy rotisserie chicken dinner', 'leftover rotisserie chicken ideas'],
    indexable: true,
  },
  {
    name: 'Canned Chicken',
    slug: 'canned-chicken',
    category: 'protein',
    keywords: ['chicken', 'pantry', 'shelf-stable', 'quick protein'],
    description: 'Pantry staple for quick salads, wraps, and casseroles.',
    extendedIntro: 'Have canned chicken in the pantry and need a quick dinner? This shelf-stable protein is perfect for no-cook meals and speedy recipes. From creamy chicken salad and loaded wraps to cheesy casseroles and quick quesadillas, canned chicken turns pantry staples into satisfying dinners fast.',
    commonAddIns: ['mayo', 'celery', 'bread', 'tortillas', 'cheese', 'crackers', 'lettuce', 'ranch'],
    flavorDirections: [
      { name: 'Classic Deli', suggestions: ['mayo', 'celery', 'dill', 'lemon', 'black pepper'] },
      { name: 'Tex-Mex', suggestions: ['salsa', 'cheese', 'tortillas', 'cumin', 'lime'] },
      { name: 'Buffalo', suggestions: ['hot sauce', 'ranch', 'celery', 'blue cheese', 'butter'] },
    ],
    substitutions: [
      { original: 'canned chicken', alternatives: ['rotisserie chicken', 'canned tuna', 'cooked chicken breast'] },
    ],
    queryVariations: ['canned chicken recipes', 'what to make with canned chicken', 'easy canned chicken dinner', 'canned chicken meal ideas'],
    indexable: true,
  },
  {
    name: 'Canned Tuna',
    slug: 'canned-tuna',
    category: 'protein',
    keywords: ['tuna', 'fish', 'seafood', 'shelf-stable'],
    description: 'Budget-friendly protein for salads, melts, and pasta.',
    extendedIntro: 'Wondering what to make with canned tuna besides a sandwich? This budget-friendly pantry staple is incredibly versatile. From creamy tuna melts and zesty pasta dishes to crispy tuna patties and fresh salads, these recipes prove canned tuna can be the star of dinner.',
    commonAddIns: ['mayo', 'pasta', 'bread', 'celery', 'onions', 'lemon', 'cheese', 'crackers'],
    flavorDirections: [
      { name: 'Classic American', suggestions: ['mayo', 'celery', 'pickles', 'mustard', 'cheddar'] },
      { name: 'Mediterranean', suggestions: ['olive oil', 'capers', 'lemon', 'olives', 'white beans'] },
      { name: 'Asian', suggestions: ['soy sauce', 'sesame oil', 'rice vinegar', 'ginger', 'sriracha'] },
    ],
    substitutions: [
      { original: 'canned tuna', alternatives: ['canned salmon', 'canned chicken', 'canned sardines', 'canned mackerel'] },
    ],
    queryVariations: ['canned tuna recipes', 'what to make with canned tuna', 'easy tuna dinner ideas', 'tuna recipes for dinner'],
    indexable: true,
  },
  {
    name: 'Eggs',
    slug: 'eggs',
    category: 'protein',
    keywords: ['breakfast', 'protein', 'versatile', 'baking'],
    description: 'The most versatile ingredient in your kitchen.',
    extendedIntro: 'Eggs for dinner? Absolutely! Eggs are the most versatile ingredient in your fridge and the star of countless quick dinners. From fluffy frittatas and savory shakshuka to fried rice and loaded quiches, these egg dinner recipes are fast, affordable, and satisfying any night of the week.',
    commonAddIns: ['cheese', 'bread', 'tomatoes', 'spinach', 'onions', 'bell peppers', 'mushrooms', 'bacon'],
    flavorDirections: [
      { name: 'Mediterranean', suggestions: ['feta', 'tomatoes', 'olives', 'spinach', 'herbs'] },
      { name: 'Asian', suggestions: ['soy sauce', 'sesame oil', 'rice', 'green onions', 'chili flakes'] },
      { name: 'Breakfast for Dinner', suggestions: ['bacon', 'cheese', 'hash browns', 'toast', 'hot sauce'] },
    ],
    substitutions: [
      { original: 'eggs', alternatives: ['tofu scramble', 'chickpea flour omelette', 'JUST Egg'] },
    ],
    queryVariations: ['egg recipes for dinner', 'what to make with eggs', 'easy egg dinner ideas', 'eggs for dinner recipes'],
    indexable: true,
  },
  {
    name: 'Rice',
    slug: 'rice',
    category: 'carb',
    keywords: ['grain', 'white rice', 'brown rice', 'side dish'],
    description: 'Essential base for stir-fries, bowls, and sides.',
    extendedIntro: 'Have rice and need dinner inspiration? Rice is the world\'s most essential grain and the foundation of countless satisfying meals. From quick fried rice and flavorful rice bowls to creamy risotto and comforting casseroles, these rice dinner recipes are easy, affordable, and endlessly adaptable.',
    commonAddIns: ['chicken', 'soy sauce', 'vegetables', 'eggs', 'beans', 'garlic', 'onions', 'butter'],
    flavorDirections: [
      { name: 'Asian', suggestions: ['soy sauce', 'sesame oil', 'ginger', 'rice vinegar', 'green onions'] },
      { name: 'Latin', suggestions: ['cilantro', 'lime', 'cumin', 'black beans', 'salsa'] },
      { name: 'Mediterranean', suggestions: ['lemon', 'olive oil', 'herbs', 'pine nuts', 'feta'] },
    ],
    substitutions: [
      { original: 'white rice', alternatives: ['brown rice', 'quinoa', 'cauliflower rice', 'couscous'] },
    ],
    queryVariations: ['rice recipes for dinner', 'what to make with rice', 'easy rice dinner ideas', 'rice bowl recipes'],
    indexable: true,
  },
  {
    name: 'Pasta',
    slug: 'pasta',
    category: 'carb',
    keywords: ['noodles', 'spaghetti', 'penne', 'italian'],
    description: 'Quick-cooking comfort food base for endless recipes.',
    extendedIntro: 'Nothing says comfort food like a big bowl of pasta. Whether you\'re craving creamy carbonara, a quick garlic butter sauce, or a hearty baked ziti, pasta is the ultimate weeknight dinner base. These easy pasta recipes go from pantry to plate in under 30 minutes.',
    commonAddIns: ['garlic', 'parmesan', 'olive oil', 'tomatoes', 'onions', 'basil', 'cream', 'red pepper flakes'],
    flavorDirections: [
      { name: 'Classic Italian', suggestions: ['marinara', 'basil', 'parmesan', 'garlic', 'olive oil'] },
      { name: 'Creamy', suggestions: ['heavy cream', 'butter', 'parmesan', 'garlic', 'white wine'] },
      { name: 'Asian Fusion', suggestions: ['soy sauce', 'sesame oil', 'chili garlic sauce', 'peanuts', 'lime'] },
    ],
    substitutions: [
      { original: 'regular pasta', alternatives: ['whole wheat pasta', 'gluten-free pasta', 'zucchini noodles', 'rice noodles'] },
    ],
    queryVariations: ['pasta recipes for dinner', 'what to make with pasta', 'easy pasta dinner ideas', 'quick pasta recipes'],
    indexable: true,
  },
  {
    name: 'Potatoes',
    slug: 'potatoes',
    category: 'carb',
    keywords: ['russet', 'yukon gold', 'mashed', 'baked', 'roasted'],
    description: 'Comfort food staple that works as main or side.',
    extendedIntro: 'Potatoes are the ultimate comfort food ingredient. Baked, mashed, roasted, or turned into a hearty soup — there\'s no wrong way to cook a potato for dinner. These potato dinner recipes range from loaded baked potatoes to crispy sheet pan meals, all easy enough for a busy weeknight.',
    commonAddIns: ['butter', 'cheese', 'sour cream', 'bacon', 'garlic', 'onions', 'chives', 'cream'],
    flavorDirections: [
      { name: 'Loaded American', suggestions: ['cheddar', 'bacon', 'sour cream', 'chives', 'butter'] },
      { name: 'Mediterranean', suggestions: ['olive oil', 'rosemary', 'garlic', 'lemon', 'feta'] },
      { name: 'Indian', suggestions: ['curry powder', 'turmeric', 'cumin', 'peas', 'cilantro'] },
    ],
    substitutions: [
      { original: 'russet potatoes', alternatives: ['sweet potatoes', 'Yukon gold potatoes', 'red potatoes', 'cauliflower'] },
    ],
    queryVariations: ['potato recipes for dinner', 'what to make with potatoes', 'easy potato dinner ideas', 'potato dinner recipes'],
    indexable: true,
  },
  {
    name: 'Tortillas',
    slug: 'tortillas',
    category: 'carb',
    keywords: ['wraps', 'tacos', 'burritos', 'quesadillas', 'flour', 'corn'],
    description: 'Essential for Mexican-inspired meals and quick wraps.',
    extendedIntro: 'Got tortillas and wondering what to make for dinner? Tortillas are the foundation of tacos, burritos, quesadillas, enchiladas, and wraps — some of the fastest and most crowd-pleasing dinners around. These tortilla dinner recipes are endlessly customizable and ready in minutes.',
    commonAddIns: ['cheese', 'chicken', 'ground beef', 'beans', 'salsa', 'lettuce', 'sour cream', 'avocado'],
    flavorDirections: [
      { name: 'Mexican', suggestions: ['cumin', 'chili powder', 'lime', 'cilantro', 'salsa verde'] },
      { name: 'Tex-Mex', suggestions: ['cheddar', 'sour cream', 'jalapeños', 'taco seasoning', 'refried beans'] },
      { name: 'Mediterranean Wrap', suggestions: ['hummus', 'feta', 'cucumber', 'tomatoes', 'tzatziki'] },
    ],
    substitutions: [
      { original: 'flour tortillas', alternatives: ['corn tortillas', 'lettuce wraps', 'pita bread', 'naan'] },
    ],
    queryVariations: ['tortilla recipes for dinner', 'what to make with tortillas', 'easy tortilla dinner ideas', 'dinner recipes with tortillas'],
    indexable: true,
  },
  {
    name: 'Bread',
    slug: 'bread',
    category: 'carb',
    keywords: ['sandwich', 'toast', 'loaf', 'sliced'],
    description: 'Foundation for sandwiches, toast, and quick meals.',
    extendedIntro: 'Bread isn\'t just for sandwiches — it\'s a dinner hero. From savory French toast and bread bowl soups to crispy grilled cheese and hearty strata, bread can anchor a satisfying weeknight meal. These bread dinner recipes are creative, comforting, and use what you already have.',
    commonAddIns: ['butter', 'cheese', 'eggs', 'tomatoes', 'garlic', 'deli meat', 'lettuce', 'mayo'],
    flavorDirections: [
      { name: 'Classic Comfort', suggestions: ['butter', 'cheddar', 'tomato soup', 'bacon', 'mayo'] },
      { name: 'Italian', suggestions: ['garlic butter', 'mozzarella', 'marinara', 'basil', 'olive oil'] },
      { name: 'Breakfast for Dinner', suggestions: ['eggs', 'cinnamon', 'maple syrup', 'vanilla', 'berries'] },
    ],
    substitutions: [
      { original: 'sliced bread', alternatives: ['English muffins', 'naan', 'ciabatta', 'pita bread'] },
    ],
    queryVariations: ['bread recipes for dinner', 'what to make with bread', 'easy bread dinner ideas', 'dinner recipes using bread'],
    indexable: true,
  },
  {
    name: 'Chicken Broth',
    slug: 'chicken-broth',
    category: 'pantry',
    keywords: ['stock', 'soup base', 'liquid', 'flavor'],
    description: 'Flavor foundation for soups, sauces, and cooking liquid.',
    extendedIntro: 'Have chicken broth and need dinner ideas? Chicken broth is the secret weapon behind rich soups, creamy risottos, and flavorful sauces. Whether you\'re simmering a quick soup or deglazing a pan for a weeknight chicken dinner, these recipes show how broth elevates everything it touches.',
    commonAddIns: ['chicken', 'noodles', 'rice', 'vegetables', 'garlic', 'onions', 'herbs', 'butter'],
    flavorDirections: [
      { name: 'Classic Soup', suggestions: ['noodles', 'carrots', 'celery', 'chicken', 'thyme'] },
      { name: 'Asian', suggestions: ['ginger', 'soy sauce', 'ramen noodles', 'green onions', 'sesame oil'] },
      { name: 'Italian', suggestions: ['tortellini', 'parmesan rind', 'spinach', 'white beans', 'garlic'] },
    ],
    substitutions: [
      { original: 'chicken broth', alternatives: ['vegetable broth', 'beef broth', 'bone broth', 'bouillon cubes + water'] },
    ],
    queryVariations: ['chicken broth recipes', 'what to make with chicken broth', 'easy chicken broth dinner', 'soup recipes with chicken broth'],
    indexable: true,
  },
  {
    name: 'Black Beans',
    slug: 'black-beans',
    category: 'pantry',
    keywords: ['beans', 'legumes', 'canned', 'protein', 'fiber'],
    description: 'Protein-packed addition to tacos, bowls, and soups.',
    extendedIntro: 'Black beans are the ultimate pantry powerhouse — packed with protein, fiber, and flavor. From classic black bean tacos and Cuban-style rice bowls to hearty soups and veggie burgers, these black bean dinner recipes are affordable, filling, and perfect for meatless nights or as a hearty side.',
    commonAddIns: ['rice', 'cheese', 'salsa', 'cumin', 'cilantro', 'lime', 'onions', 'corn'],
    flavorDirections: [
      { name: 'Latin', suggestions: ['cumin', 'cilantro', 'lime', 'garlic', 'chili powder'] },
      { name: 'Tex-Mex', suggestions: ['cheddar', 'sour cream', 'tortillas', 'salsa', 'jalapeños'] },
      { name: 'Caribbean', suggestions: ['coconut milk', 'scotch bonnet', 'thyme', 'allspice', 'rice'] },
    ],
    substitutions: [
      { original: 'black beans', alternatives: ['pinto beans', 'kidney beans', 'lentils', 'chickpeas'] },
    ],
    queryVariations: ['black bean recipes for dinner', 'what to make with black beans', 'easy black bean dinner', 'black bean meal ideas'],
    indexable: true,
  },
  {
    name: 'Chickpeas',
    slug: 'chickpeas',
    category: 'pantry',
    keywords: ['garbanzo beans', 'legumes', 'hummus', 'salad'],
    description: 'Versatile legume for salads, curries, and snacks.',
    extendedIntro: 'Chickpeas are one of the most versatile pantry ingredients for quick, healthy dinners. Roast them for a crunchy salad topping, simmer them in a rich curry, or blend them into creamy hummus bowls. These chickpea dinner recipes are naturally high in protein and perfect for vegetarian and meat-eater tables alike.',
    commonAddIns: ['garlic', 'cumin', 'lemon', 'olive oil', 'spinach', 'tomatoes', 'onions', 'tahini'],
    flavorDirections: [
      { name: 'Indian', suggestions: ['curry powder', 'garam masala', 'turmeric', 'coconut milk', 'cilantro'] },
      { name: 'Mediterranean', suggestions: ['lemon', 'olive oil', 'feta', 'cucumber', 'tahini'] },
      { name: 'Moroccan', suggestions: ['cumin', 'cinnamon', 'harissa', 'dried apricots', 'couscous'] },
    ],
    substitutions: [
      { original: 'chickpeas', alternatives: ['white beans', 'lentils', 'black beans', 'edamame'] },
    ],
    queryVariations: ['chickpea recipes for dinner', 'what to make with chickpeas', 'easy chickpea dinner ideas', 'chickpea meal recipes'],
    indexable: true,
  },
  {
    name: 'Frozen Broccoli',
    slug: 'frozen-broccoli',
    category: 'vegetable',
    keywords: ['broccoli', 'frozen vegetables', 'green', 'healthy'],
    description: 'Always-ready vegetable for quick healthy sides.',
    extendedIntro: 'Frozen broccoli is the freezer staple that makes healthy dinners effortless. Already washed, chopped, and ready to cook, it\'s perfect for quick stir-fries, cheesy casseroles, creamy soups, and pasta dishes. These frozen broccoli recipes prove that healthy eating doesn\'t have to be complicated.',
    commonAddIns: ['cheese', 'garlic', 'chicken', 'rice', 'pasta', 'soy sauce', 'butter', 'lemon'],
    flavorDirections: [
      { name: 'Asian Stir-Fry', suggestions: ['soy sauce', 'garlic', 'ginger', 'sesame oil', 'oyster sauce'] },
      { name: 'Cheesy Comfort', suggestions: ['cheddar', 'cream cheese', 'garlic', 'butter', 'breadcrumbs'] },
      { name: 'Lemon Garlic', suggestions: ['lemon juice', 'garlic', 'olive oil', 'parmesan', 'red pepper flakes'] },
    ],
    substitutions: [
      { original: 'frozen broccoli', alternatives: ['fresh broccoli', 'frozen cauliflower', 'frozen green beans', 'frozen peas'] },
    ],
    queryVariations: ['frozen broccoli recipes', 'what to make with frozen broccoli', 'easy frozen broccoli dinner', 'frozen broccoli dinner ideas'],
    indexable: true,
  },
]

// Generate smart ingredient combinations
export function getIngredientCombos(): IngredientCombo[] {
  const combos: IngredientCombo[] = [
    // Protein + Carb combos (most searched) - TOP TIER with full SEO content
    {
      slug: 'chicken-breast-rice',
      ingredients: ['chicken-breast', 'rice'],
      title: 'Chicken and Rice Recipes',
      description: 'Simple, satisfying chicken and rice dinner ideas.',
      extendedIntro: 'Looking for easy chicken and rice dinner ideas? Whether you\'re wondering what to make with chicken breast and rice or need quick chicken rice dinner ideas, we\'ve got you covered. From classic chicken fried rice to creamy casseroles, here are the best ways to turn these pantry staples into a satisfying meal.',
      commonAddIns: ['broccoli', 'peas', 'bell peppers', 'mushrooms', 'corn', 'soy sauce', 'garlic', 'onions'],
      flavorDirections: [
        { name: 'Asian', suggestions: ['soy sauce', 'sesame oil', 'ginger', 'green onions', 'sriracha'] },
        { name: 'Tex-Mex', suggestions: ['cumin', 'lime', 'cilantro', 'black beans', 'salsa'] },
        { name: 'Mediterranean', suggestions: ['lemon', 'oregano', 'feta', 'olives', 'sun-dried tomatoes'] },
      ],
      substitutions: [
        { original: 'white rice', alternatives: ['brown rice', 'quinoa', 'cauliflower rice'] },
        { original: 'chicken breast', alternatives: ['chicken thighs', 'rotisserie chicken', 'tofu'] },
      ],
      queryVariations: ['chicken and rice recipes', 'what to make with chicken and rice', 'easy chicken rice dinner', 'chicken rice bowl ideas'],
      indexable: true,
    },
    {
      slug: 'chicken-breast-pasta',
      ingredients: ['chicken-breast', 'pasta'],
      title: 'Chicken Pasta Recipes',
      description: 'Creamy, zesty, and comforting chicken pasta dishes.',
      extendedIntro: 'Chicken and pasta is a weeknight dinner staple for good reason. Whether you\'re in the mood for creamy Alfredo, zesty lemon butter, or a rich Tuscan-style sauce, these recipes deliver satisfying meals in 30 minutes or less. Find your new favorite chicken pasta recipe.',
      commonAddIns: ['garlic', 'parmesan', 'spinach', 'sun-dried tomatoes', 'cream', 'lemon', 'basil', 'mushrooms'],
      flavorDirections: [
        { name: 'Creamy Italian', suggestions: ['alfredo sauce', 'parmesan', 'garlic', 'cream', 'Italian herbs'] },
        { name: 'Light & Fresh', suggestions: ['lemon', 'olive oil', 'capers', 'white wine', 'fresh herbs'] },
        { name: 'Spicy', suggestions: ['Cajun seasoning', 'red pepper flakes', 'jalapeños', 'chipotle'] },
      ],
      substitutions: [
        { original: 'chicken breast', alternatives: ['chicken thighs', 'shrimp', 'Italian sausage'] },
        { original: 'heavy cream', alternatives: ['half-and-half', 'cream cheese', 'Greek yogurt'] },
      ],
      queryVariations: ['chicken pasta recipes', 'creamy chicken pasta', 'easy chicken pasta dinner', 'what to make with chicken and pasta'],
      indexable: true,
    },
    {
      slug: 'ground-beef-rice',
      ingredients: ['ground-beef', 'rice'],
      title: 'Ground Beef and Rice Recipes',
      description: 'Hearty ground beef and rice one-pot meals.',
      extendedIntro: 'Ground beef and rice is a budget-friendly combination that feeds a crowd. From Korean-inspired beef bowls to cheesy casseroles, these recipes turn simple ingredients into delicious family dinners. Discover the best ways to pair these pantry staples.',
      commonAddIns: ['onions', 'bell peppers', 'tomatoes', 'cheese', 'soy sauce', 'garlic', 'corn', 'beans'],
      flavorDirections: [
        { name: 'Asian', suggestions: ['soy sauce', 'ginger', 'sesame oil', 'green onions', 'sriracha'] },
        { name: 'Tex-Mex', suggestions: ['cumin', 'chili powder', 'salsa', 'cheese', 'jalapeños'] },
        { name: 'Mediterranean', suggestions: ['oregano', 'feta', 'lemon', 'cucumber', 'tzatziki'] },
      ],
      substitutions: [
        { original: 'white rice', alternatives: ['brown rice', 'cauliflower rice', 'quinoa'] },
        { original: 'ground beef', alternatives: ['ground turkey', 'ground lamb', 'ground pork'] },
      ],
      queryVariations: ['ground beef and rice recipes', 'beef rice bowls', 'easy ground beef rice dinner', 'what to make with hamburger meat and rice'],
      indexable: true,
    },
    {
      slug: 'ground-beef-pasta',
      ingredients: ['ground-beef', 'pasta'],
      title: 'Ground Beef Pasta Recipes',
      description: 'Classic comfort food with ground beef and pasta.',
      extendedIntro: 'Ground beef and pasta is the ultimate comfort food combo. Whether you\'re craving a quick weeknight spaghetti or a cheesy baked ziti, these recipes transform simple ingredients into family favorites. From classic Bolognese to kid-friendly cheeseburger mac, find your perfect ground beef pasta recipe.',
      commonAddIns: ['onions', 'garlic', 'bell peppers', 'mushrooms', 'Italian seasoning', 'parmesan', 'ricotta'],
      flavorDirections: [
        { name: 'Italian', suggestions: ['marinara', 'basil', 'oregano', 'parmesan', 'red wine'] },
        { name: 'Tex-Mex', suggestions: ['taco seasoning', 'salsa', 'jalapeños', 'cheddar', 'sour cream'] },
        { name: 'American Comfort', suggestions: ['cheddar', 'cream cheese', 'Worcestershire', 'mustard'] },
      ],
      substitutions: [
        { original: 'ground beef', alternatives: ['ground turkey', 'ground pork', 'plant-based crumbles'] },
        { original: 'regular pasta', alternatives: ['whole wheat pasta', 'gluten-free pasta', 'zucchini noodles'] },
      ],
      queryVariations: ['ground beef pasta recipes', 'easy beef pasta dinner', 'what to make with ground beef and pasta', 'hamburger pasta recipes'],
      indexable: true,
    },
    {
      slug: 'ground-beef-potatoes',
      ingredients: ['ground-beef', 'potatoes'],
      title: 'Ground Beef and Potato Recipes',
      description: 'Filling ground beef and potato dinners.',
      extendedIntro: 'Ground beef and potatoes is comfort food at its finest. Whether you\'re making a classic shepherd\'s pie, a quick skillet hash, or loaded stuffed potatoes, this hearty combination is perfect for feeding a hungry family. Discover the best ways to combine these affordable staples into delicious dinners.',
      commonAddIns: ['onions', 'cheese', 'garlic', 'peas', 'carrots', 'corn', 'green beans', 'sour cream'],
      flavorDirections: [
        { name: 'Classic American', suggestions: ['Worcestershire sauce', 'cheddar', 'onion soup mix', 'sour cream'] },
        { name: 'Tex-Mex', suggestions: ['cumin', 'chili powder', 'salsa', 'jalapeños', 'Mexican cheese'] },
        { name: 'Mediterranean', suggestions: ['oregano', 'feta', 'tomatoes', 'olives', 'lemon'] },
      ],
      substitutions: [
        { original: 'russet potatoes', alternatives: ['Yukon gold', 'red potatoes', 'sweet potatoes'] },
        { original: 'ground beef', alternatives: ['ground lamb', 'ground turkey', 'plant-based crumbles'] },
      ],
      queryVariations: ['ground beef and potato recipes', 'hamburger and potatoes', 'what to make with ground beef and potatoes', 'beef potato skillet'],
      indexable: true,
    },
    {
      slug: 'chicken-breast-potatoes',
      ingredients: ['chicken-breast', 'potatoes'],
      title: 'Chicken and Potato Recipes',
      description: 'One-pan chicken and potato dinner ideas.',
      extendedIntro: 'Chicken and potatoes is one of the most classic dinner combos for a reason — it\'s hearty, affordable, and endlessly versatile. Whether you\'re roasting a sheet pan dinner, making a creamy skillet, or baking a cheesy casserole, these chicken and potato recipes deliver satisfying comfort food every time.',
      commonAddIns: ['garlic', 'rosemary', 'butter', 'onions', 'lemon', 'cheese', 'green beans', 'cream'],
      flavorDirections: [
        { name: 'Herb Roasted', suggestions: ['rosemary', 'thyme', 'garlic', 'olive oil', 'lemon'] },
        { name: 'Creamy Ranch', suggestions: ['ranch seasoning', 'cream cheese', 'bacon', 'cheddar', 'chives'] },
        { name: 'Tex-Mex', suggestions: ['cumin', 'chili powder', 'salsa', 'cheese', 'cilantro'] },
      ],
      substitutions: [
        { original: 'chicken breast', alternatives: ['chicken thighs', 'pork chops', 'turkey breast'] },
        { original: 'russet potatoes', alternatives: ['sweet potatoes', 'Yukon gold', 'red potatoes'] },
      ],
      queryVariations: ['chicken and potato recipes', 'what to make with chicken and potatoes', 'easy chicken potato dinner', 'baked chicken and potatoes'],
      indexable: true,
    },
    {
      slug: 'pork-chops-rice',
      ingredients: ['pork-chops', 'rice'],
      title: 'Pork Chops and Rice Recipes',
      description: 'Easy pork chop dinners served over rice.',
      extendedIntro: 'Pork chops and rice is a classic, budget-friendly dinner that never gets old. From creamy mushroom pork chops over fluffy rice to teriyaki-glazed chops with fried rice, these recipes turn two simple ingredients into a satisfying weeknight meal the whole family will love.',
      commonAddIns: ['mushrooms', 'onions', 'garlic', 'cream of mushroom soup', 'broccoli', 'green beans', 'butter', 'soy sauce'],
      flavorDirections: [
        { name: 'Classic Comfort', suggestions: ['cream of mushroom soup', 'onions', 'garlic', 'thyme', 'butter'] },
        { name: 'Asian', suggestions: ['soy sauce', 'honey', 'ginger', 'sesame oil', 'green onions'] },
        { name: 'Southern', suggestions: ['Cajun seasoning', 'butter', 'garlic', 'parsley', 'hot sauce'] },
      ],
      substitutions: [
        { original: 'pork chops', alternatives: ['chicken breast', 'pork tenderloin', 'bone-in chicken thighs'] },
        { original: 'white rice', alternatives: ['brown rice', 'wild rice', 'cauliflower rice'] },
      ],
      queryVariations: ['pork chops and rice recipes', 'what to make with pork chops and rice', 'easy pork chop rice dinner', 'baked pork chops with rice'],
      indexable: true,
    },
    {
      slug: 'sausage-pasta',
      ingredients: ['sausage', 'pasta'],
      title: 'Sausage Pasta Recipes',
      description: 'Quick Italian sausage pasta dishes.',
      extendedIntro: 'Sausage and pasta is a match made in comfort food heaven. Whether you prefer sweet Italian sausage, spicy links, or smoked kielbasa, these recipes bring bold flavor to your table fast. From creamy vodka sauce to classic marinara, find your perfect sausage pasta combination.',
      commonAddIns: ['bell peppers', 'onions', 'spinach', 'sun-dried tomatoes', 'parmesan', 'cream', 'garlic', 'red pepper flakes'],
      flavorDirections: [
        { name: 'Italian Classic', suggestions: ['marinara', 'basil', 'parmesan', 'oregano', 'fennel'] },
        { name: 'Creamy', suggestions: ['heavy cream', 'parmesan', 'white wine', 'garlic', 'spinach'] },
        { name: 'Cajun', suggestions: ['Cajun seasoning', 'bell peppers', 'onions', 'andouille', 'cream'] },
      ],
      substitutions: [
        { original: 'Italian sausage', alternatives: ['chicken sausage', 'turkey sausage', 'andouille', 'kielbasa'] },
        { original: 'penne', alternatives: ['rigatoni', 'orecchiette', 'shells', 'spaghetti'] },
      ],
      queryVariations: ['sausage pasta recipes', 'Italian sausage pasta', 'easy sausage pasta dinner', 'what to make with sausage and pasta'],
      indexable: true,
    },
    {
      slug: 'sausage-rice',
      ingredients: ['sausage', 'rice'],
      title: 'Sausage and Rice Recipes',
      description: 'One-pot sausage and rice comfort meals.',
      extendedIntro: 'Sausage and rice is the ultimate one-pot comfort meal. Whether you\'re using spicy Italian sausage, smoky kielbasa, or andouille, these recipes bring bold, pre-seasoned flavor to fluffy rice with minimal effort. Perfect for busy weeknights when you need a filling dinner fast.',
      commonAddIns: ['bell peppers', 'onions', 'tomatoes', 'garlic', 'corn', 'beans', 'Cajun seasoning', 'cheese'],
      flavorDirections: [
        { name: 'Cajun', suggestions: ['andouille', 'bell peppers', 'celery', 'onions', 'Cajun seasoning'] },
        { name: 'Italian', suggestions: ['marinara', 'basil', 'parmesan', 'garlic', 'Italian seasoning'] },
        { name: 'Tex-Mex', suggestions: ['cumin', 'salsa', 'black beans', 'corn', 'cheddar'] },
      ],
      substitutions: [
        { original: 'pork sausage', alternatives: ['chicken sausage', 'turkey sausage', 'kielbasa', 'chorizo'] },
        { original: 'white rice', alternatives: ['brown rice', 'quinoa', 'cauliflower rice'] },
      ],
      queryVariations: ['sausage and rice recipes', 'what to make with sausage and rice', 'easy sausage rice dinner', 'one-pot sausage rice'],
      indexable: true,
    },
    {
      slug: 'eggs-tortillas',
      ingredients: ['eggs', 'tortillas'],
      title: 'Egg and Tortilla Recipes',
      description: 'Quick breakfast burritos and egg tacos.',
      extendedIntro: 'Eggs and tortillas are a match made in quick-dinner heaven. Whether you\'re rolling up breakfast burritos for dinner, making cheesy egg quesadillas, or filling crispy tacos with scrambled eggs, these recipes are fast, affordable, and endlessly customizable for the whole family.',
      commonAddIns: ['cheese', 'salsa', 'bacon', 'sausage', 'bell peppers', 'onions', 'avocado', 'sour cream'],
      flavorDirections: [
        { name: 'Breakfast Burrito', suggestions: ['cheese', 'bacon', 'hash browns', 'salsa', 'sour cream'] },
        { name: 'Tex-Mex', suggestions: ['cumin', 'jalapeños', 'cheddar', 'cilantro', 'hot sauce'] },
        { name: 'Mediterranean', suggestions: ['feta', 'spinach', 'tomatoes', 'olives', 'herbs'] },
      ],
      substitutions: [
        { original: 'eggs', alternatives: ['tofu scramble', 'JUST Egg', 'chickpea flour omelette'] },
        { original: 'flour tortillas', alternatives: ['corn tortillas', 'lettuce wraps', 'pita bread'] },
      ],
      queryVariations: ['egg and tortilla recipes', 'what to make with eggs and tortillas', 'easy egg burrito dinner', 'breakfast burrito for dinner'],
      indexable: true,
    },
    {
      slug: 'ground-beef-tortillas',
      ingredients: ['ground-beef', 'tortillas'],
      title: 'Ground Beef Taco Recipes',
      description: 'Easy taco night with ground beef.',
      extendedIntro: 'Ground beef and tortillas mean one thing: taco night! But there\'s so much more than basic tacos. From cheesy beef quesadillas and loaded burritos to crunchy tostadas and baked enchiladas, these ground beef tortilla recipes make dinner exciting and easy any night of the week.',
      commonAddIns: ['cheese', 'salsa', 'lettuce', 'sour cream', 'tomatoes', 'onions', 'taco seasoning', 'refried beans'],
      flavorDirections: [
        { name: 'Classic Taco', suggestions: ['taco seasoning', 'cheddar', 'lettuce', 'salsa', 'sour cream'] },
        { name: 'Tex-Mex', suggestions: ['cumin', 'chili powder', 'jalapeños', 'queso', 'cilantro'] },
        { name: 'Korean Fusion', suggestions: ['gochujang', 'sesame oil', 'kimchi', 'sriracha', 'green onions'] },
      ],
      substitutions: [
        { original: 'ground beef', alternatives: ['ground turkey', 'ground chicken', 'plant-based crumbles'] },
        { original: 'flour tortillas', alternatives: ['corn tortillas', 'hard taco shells', 'lettuce wraps'] },
      ],
      queryVariations: ['ground beef taco recipes', 'what to make with ground beef and tortillas', 'easy beef taco dinner', 'ground beef burrito recipes'],
      indexable: true,
    },
    {
      slug: 'chicken-breast-tortillas',
      ingredients: ['chicken-breast', 'tortillas'],
      title: 'Chicken Taco Recipes',
      description: 'Chicken tacos, burritos, and quesadillas.',
      extendedIntro: 'Chicken and tortillas are the foundation of some of the most popular dinners around. From zesty chicken tacos and cheesy quesadillas to loaded burritos and baked enchiladas, these recipes are crowd-pleasers that come together in under 30 minutes with simple ingredients.',
      commonAddIns: ['cheese', 'salsa', 'lettuce', 'sour cream', 'lime', 'avocado', 'beans', 'cilantro'],
      flavorDirections: [
        { name: 'Classic Mexican', suggestions: ['cumin', 'chili powder', 'lime', 'cilantro', 'salsa verde'] },
        { name: 'Creamy Tex-Mex', suggestions: ['cheddar', 'sour cream', 'ranch', 'jalapeños', 'taco seasoning'] },
        { name: 'Grilled & Fresh', suggestions: ['lime', 'mango salsa', 'avocado', 'cabbage slaw', 'chipotle mayo'] },
      ],
      substitutions: [
        { original: 'chicken breast', alternatives: ['rotisserie chicken', 'chicken thighs', 'shrimp'] },
        { original: 'flour tortillas', alternatives: ['corn tortillas', 'lettuce wraps', 'hard taco shells'] },
      ],
      queryVariations: ['chicken taco recipes', 'what to make with chicken and tortillas', 'easy chicken quesadilla dinner', 'chicken burrito recipes'],
      indexable: true,
    },
    {
      slug: 'bacon-eggs',
      ingredients: ['bacon', 'eggs'],
      title: 'Bacon and Egg Recipes',
      description: 'Classic bacon and egg breakfast and dinner ideas.',
      extendedIntro: 'Bacon and eggs isn\'t just for breakfast — it\'s a quick, satisfying dinner combo too. From loaded carbonara and savory quiches to breakfast burritos and egg-topped fried rice, these bacon and egg recipes prove that this classic duo works any time of day.',
      commonAddIns: ['cheese', 'toast', 'potatoes', 'onions', 'spinach', 'tomatoes', 'avocado', 'hot sauce'],
      flavorDirections: [
        { name: 'Breakfast for Dinner', suggestions: ['toast', 'hash browns', 'pancakes', 'maple syrup', 'cheese'] },
        { name: 'Italian', suggestions: ['parmesan', 'black pepper', 'pasta', 'cream', 'garlic'] },
        { name: 'Savory Brunch', suggestions: ['avocado', 'sourdough', 'chili flakes', 'hollandaise', 'arugula'] },
      ],
      substitutions: [
        { original: 'bacon', alternatives: ['turkey bacon', 'pancetta', 'ham', 'sausage'] },
        { original: 'eggs', alternatives: ['tofu scramble', 'JUST Egg', 'chickpea flour'] },
      ],
      queryVariations: ['bacon and egg recipes', 'what to make with bacon and eggs', 'bacon egg dinner ideas', 'breakfast for dinner recipes'],
      indexable: true,
    },
    {
      slug: 'rotisserie-chicken-rice',
      ingredients: ['rotisserie-chicken', 'rice'],
      title: 'Rotisserie Chicken and Rice',
      description: 'Quick meals using store-bought rotisserie chicken.',
      extendedIntro: 'Rotisserie chicken and rice is the ultimate shortcut dinner. Skip the cooking and go straight to the good part — flavorful shredded chicken over fluffy rice in minutes. From quick burrito bowls and fried rice to creamy casseroles, these recipes make a store-bought chicken the star of dinner.',
      commonAddIns: ['broccoli', 'cheese', 'salsa', 'soy sauce', 'beans', 'corn', 'garlic', 'onions'],
      flavorDirections: [
        { name: 'Asian', suggestions: ['soy sauce', 'sesame oil', 'ginger', 'green onions', 'sriracha'] },
        { name: 'Tex-Mex', suggestions: ['cumin', 'salsa', 'black beans', 'cheddar', 'lime'] },
        { name: 'Creamy Comfort', suggestions: ['cream of chicken soup', 'cheddar', 'broccoli', 'butter', 'garlic'] },
      ],
      substitutions: [
        { original: 'rotisserie chicken', alternatives: ['canned chicken', 'grilled chicken breast', 'shredded turkey'] },
        { original: 'white rice', alternatives: ['brown rice', 'quinoa', 'cauliflower rice'] },
      ],
      queryVariations: ['rotisserie chicken and rice recipes', 'what to make with rotisserie chicken and rice', 'easy rotisserie chicken rice bowl', 'store-bought chicken dinner ideas'],
      indexable: true,
    },
    {
      slug: 'canned-tuna-pasta',
      ingredients: ['canned-tuna', 'pasta'],
      title: 'Tuna Pasta Recipes',
      description: 'Budget-friendly tuna pasta dinners.',
      extendedIntro: 'Canned tuna and pasta is the ultimate budget-friendly pantry dinner. From creamy tuna casserole and lemon garlic tuna pasta to a Mediterranean-style tuna spaghetti, these recipes turn two humble ingredients into a satisfying meal that\'s ready in under 20 minutes.',
      commonAddIns: ['garlic', 'lemon', 'olive oil', 'capers', 'parmesan', 'peas', 'onions', 'cream'],
      flavorDirections: [
        { name: 'Mediterranean', suggestions: ['olive oil', 'capers', 'lemon', 'olives', 'cherry tomatoes'] },
        { name: 'Creamy Comfort', suggestions: ['cream of mushroom soup', 'cheddar', 'peas', 'breadcrumbs', 'butter'] },
        { name: 'Lemon Herb', suggestions: ['lemon', 'garlic', 'parsley', 'olive oil', 'red pepper flakes'] },
      ],
      substitutions: [
        { original: 'canned tuna', alternatives: ['canned salmon', 'canned chicken', 'canned sardines'] },
        { original: 'spaghetti', alternatives: ['penne', 'shells', 'egg noodles', 'gluten-free pasta'] },
      ],
      queryVariations: ['tuna pasta recipes', 'what to make with tuna and pasta', 'easy tuna pasta dinner', 'canned tuna pasta ideas'],
      indexable: true,
    },
    {
      slug: 'black-beans-rice',
      ingredients: ['black-beans', 'rice'],
      title: 'Black Beans and Rice',
      description: 'Classic Cuban-inspired beans and rice.',
      extendedIntro: 'Black beans and rice is a timeless combination that\'s hearty, nutritious, and incredibly affordable. From classic Cuban-style black beans over rice to Tex-Mex burrito bowls and Caribbean-spiced dishes, these recipes turn simple pantry staples into a filling, protein-packed dinner.',
      commonAddIns: ['onions', 'garlic', 'cumin', 'cilantro', 'lime', 'bell peppers', 'salsa', 'cheese'],
      flavorDirections: [
        { name: 'Cuban', suggestions: ['cumin', 'oregano', 'bay leaf', 'lime', 'garlic'] },
        { name: 'Tex-Mex', suggestions: ['cheddar', 'sour cream', 'salsa', 'jalapeños', 'taco seasoning'] },
        { name: 'Caribbean', suggestions: ['coconut milk', 'thyme', 'scotch bonnet', 'allspice', 'lime'] },
      ],
      substitutions: [
        { original: 'black beans', alternatives: ['pinto beans', 'kidney beans', 'lentils'] },
        { original: 'white rice', alternatives: ['brown rice', 'quinoa', 'cauliflower rice'] },
      ],
      queryVariations: ['black beans and rice recipes', 'what to make with black beans and rice', 'easy black bean rice dinner', 'Cuban black beans and rice'],
      indexable: true,
    },
    {
      slug: 'chickpeas-rice',
      ingredients: ['chickpeas', 'rice'],
      title: 'Chickpea and Rice Recipes',
      description: 'Vegetarian chickpea and rice bowls.',
      extendedIntro: 'Chickpeas and rice make a complete, protein-packed meal that\'s perfect for vegetarian nights and budget-friendly dinners alike. From fragrant chickpea curry over basmati rice to Mediterranean grain bowls and spiced Moroccan dishes, these recipes are filling, flavorful, and endlessly adaptable.',
      commonAddIns: ['garlic', 'cumin', 'lemon', 'spinach', 'tomatoes', 'onions', 'coconut milk', 'tahini'],
      flavorDirections: [
        { name: 'Indian', suggestions: ['curry powder', 'garam masala', 'coconut milk', 'turmeric', 'cilantro'] },
        { name: 'Mediterranean', suggestions: ['lemon', 'olive oil', 'feta', 'cucumber', 'tahini'] },
        { name: 'Moroccan', suggestions: ['cumin', 'cinnamon', 'harissa', 'dried apricots', 'almonds'] },
      ],
      substitutions: [
        { original: 'chickpeas', alternatives: ['white beans', 'lentils', 'black beans'] },
        { original: 'white rice', alternatives: ['brown rice', 'couscous', 'quinoa'] },
      ],
      queryVariations: ['chickpea and rice recipes', 'what to make with chickpeas and rice', 'easy chickpea rice dinner', 'vegetarian chickpea rice bowl'],
      indexable: true,
    },
    {
      slug: 'ground-turkey-rice',
      ingredients: ['ground-turkey', 'rice'],
      title: 'Ground Turkey and Rice',
      description: 'Lean ground turkey rice bowls and meals.',
      extendedIntro: 'Ground turkey and rice is the lean, healthy dinner combo that doesn\'t sacrifice flavor. From Asian-inspired turkey rice bowls and Tex-Mex burritos to stuffed peppers and one-pot skillet meals, these recipes are packed with protein and perfect for meal prep or a quick weeknight dinner.',
      commonAddIns: ['onions', 'garlic', 'bell peppers', 'soy sauce', 'beans', 'corn', 'cheese', 'spinach'],
      flavorDirections: [
        { name: 'Asian', suggestions: ['soy sauce', 'ginger', 'sesame oil', 'green onions', 'sriracha'] },
        { name: 'Tex-Mex', suggestions: ['cumin', 'chili powder', 'salsa', 'cheddar', 'black beans'] },
        { name: 'Mediterranean', suggestions: ['lemon', 'oregano', 'feta', 'tomatoes', 'cucumber'] },
      ],
      substitutions: [
        { original: 'ground turkey', alternatives: ['ground chicken', 'ground beef', 'plant-based crumbles'] },
        { original: 'white rice', alternatives: ['brown rice', 'quinoa', 'cauliflower rice'] },
      ],
      queryVariations: ['ground turkey and rice recipes', 'what to make with ground turkey and rice', 'healthy turkey rice bowl', 'easy ground turkey rice dinner'],
      indexable: true,
    },
    {
      slug: 'sausage-potatoes',
      ingredients: ['sausage', 'potatoes'],
      title: 'Sausage and Potatoes',
      description: 'Sheet pan sausage and potato dinners.',
      extendedIntro: 'Sausage and potatoes is the quintessential sheet pan dinner — minimal prep, maximum flavor, and almost zero cleanup. Whether you\'re roasting smoked sausage with crispy potatoes, making a hearty skillet hash, or simmering a comforting stew, this combo is a weeknight winner every time.',
      commonAddIns: ['bell peppers', 'onions', 'garlic', 'olive oil', 'rosemary', 'cheese', 'green beans', 'corn'],
      flavorDirections: [
        { name: 'Sheet Pan Roasted', suggestions: ['olive oil', 'garlic', 'rosemary', 'paprika', 'onions'] },
        { name: 'Cajun', suggestions: ['Cajun seasoning', 'bell peppers', 'onions', 'andouille', 'hot sauce'] },
        { name: 'German', suggestions: ['sauerkraut', 'mustard', 'beer', 'caraway seeds', 'onions'] },
      ],
      substitutions: [
        { original: 'smoked sausage', alternatives: ['Italian sausage', 'chicken sausage', 'kielbasa', 'bratwurst'] },
        { original: 'russet potatoes', alternatives: ['sweet potatoes', 'red potatoes', 'Yukon gold'] },
      ],
      queryVariations: ['sausage and potatoes recipes', 'what to make with sausage and potatoes', 'easy sausage potato dinner', 'sheet pan sausage and potatoes'],
      indexable: true,
    },
    {
      slug: 'chicken-breast-broccoli',
      ingredients: ['chicken-breast', 'frozen-broccoli'],
      title: 'Chicken and Broccoli Recipes',
      description: 'Healthy chicken and broccoli stir-fries and bakes.',
      extendedIntro: 'Chicken and broccoli is a healthy, delicious combination that\'s a staple in kitchens everywhere. Whether you\'re craving Chinese takeout-style stir-fry or a creamy Alfredo bake, these recipes make weeknight dinners easy and nutritious. Learn how to make restaurant-quality chicken and broccoli at home.',
      commonAddIns: ['garlic', 'soy sauce', 'sesame oil', 'ginger', 'rice', 'noodles', 'cheese', 'cream'],
      flavorDirections: [
        { name: 'Asian Stir-Fry', suggestions: ['soy sauce', 'oyster sauce', 'ginger', 'garlic', 'sesame seeds'] },
        { name: 'Creamy Italian', suggestions: ['alfredo sauce', 'parmesan', 'garlic', 'pasta', 'Italian herbs'] },
        { name: 'Lemon Herb', suggestions: ['lemon juice', 'garlic', 'thyme', 'olive oil', 'white wine'] },
      ],
      substitutions: [
        { original: 'chicken breast', alternatives: ['chicken thighs', 'tofu', 'shrimp'] },
        { original: 'broccoli', alternatives: ['broccolini', 'Chinese broccoli', 'asparagus'] },
      ],
      queryVariations: ['chicken and broccoli recipe', 'Chinese chicken broccoli', 'healthy chicken broccoli', 'easy chicken broccoli stir fry'],
      indexable: true,
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

// Map diet slugs to RecipeBuilder dietary option names
export const dietSlugToOption: Record<string, string> = {
  'keto-dinner-ideas': 'Keto',
  'low-carb-dinners': 'Low Carb',
  'high-protein-meals': 'High Protein',
  'vegetarian-dinners': 'Vegetarian',
  'gluten-free-dinners': 'Gluten-Free',
  'dairy-free-dinners': 'Dairy-Free',
}

// Map appliance slugs to RecipeBuilder appliance option names
export const applianceSlugToOption: Record<string, string> = {
  'air-fryer-recipes': 'Air fryer',
  'instant-pot-recipes': 'Instant Pot',
  'slow-cooker-recipes': 'Slow Cooker',
  'sheet-pan-dinners': 'Oven',
  'one-pot-meals': 'Stove',
  'skillet-dinners': 'Stove',
}

// Map time slugs to RecipeBuilder time option values
export const timeSlugToOption: Record<string, string> = {
  '15-minute-meals': '15 min',
  '20-minute-meals': '30 min', // closest match
  '30-minute-meals': '30 min',
  '5-ingredient-dinners': '30 min',
}

// Get suggested ingredients for diet pages
export function getSuggestedIngredientsForDiet(slug: string): string[] {
  switch (slug) {
    case 'keto-dinner-ideas':
    case 'low-carb-dinners':
      return ['chicken breast', 'ground beef', 'bacon', 'eggs', 'cheese', 'broccoli', 'salmon', 'avocado', 'spinach', 'cauliflower']
    case 'high-protein-meals':
      return ['chicken breast', 'ground beef', 'eggs', 'salmon', 'ground turkey', 'tuna', 'shrimp', 'tofu', 'greek yogurt', 'cottage cheese']
    case 'vegetarian-dinners':
      return ['eggs', 'cheese', 'tofu', 'black beans', 'chickpeas', 'lentils', 'pasta', 'rice', 'broccoli', 'mushrooms']
    case 'gluten-free-dinners':
      return ['chicken breast', 'rice', 'potatoes', 'eggs', 'salmon', 'ground beef', 'quinoa', 'corn tortillas', 'vegetables', 'beans']
    case 'dairy-free-dinners':
      return ['chicken breast', 'ground beef', 'rice', 'pasta', 'coconut milk', 'olive oil', 'vegetables', 'beans', 'tofu', 'salmon']
    default:
      return []
  }
}

// Get suggested ingredients for appliance pages
export function getSuggestedIngredientsForAppliance(slug: string): string[] {
  switch (slug) {
    case 'air-fryer-recipes':
      return ['chicken breast', 'pork chops', 'potatoes', 'broccoli', 'salmon', 'shrimp', 'bacon', 'vegetables', 'tofu', 'cauliflower']
    case 'instant-pot-recipes':
      return ['chicken breast', 'beef stew meat', 'rice', 'beans', 'potatoes', 'chicken broth', 'pork', 'lentils', 'vegetables', 'pasta']
    case 'slow-cooker-recipes':
      return ['beef stew meat', 'chicken', 'pork', 'beans', 'potatoes', 'carrots', 'onions', 'chicken broth', 'tomatoes', 'peppers']
    case 'sheet-pan-dinners':
      return ['chicken breast', 'sausage', 'potatoes', 'broccoli', 'salmon', 'vegetables', 'shrimp', 'pork chops', 'sweet potato', 'peppers']
    case 'one-pot-meals':
    case 'skillet-dinners':
      return ['ground beef', 'pasta', 'rice', 'chicken', 'sausage', 'onions', 'tomatoes', 'beans', 'vegetables', 'cheese']
    default:
      return []
  }
}

// Get suggested ingredients for time pages
export function getSuggestedIngredientsForTime(slug: string): string[] {
  switch (slug) {
    case '15-minute-meals':
      return ['eggs', 'pasta', 'shrimp', 'canned tuna', 'tortillas', 'cheese', 'rotisserie chicken', 'frozen vegetables', 'bacon', 'bread']
    case '20-minute-meals':
    case '30-minute-meals':
      return ['chicken breast', 'ground beef', 'pasta', 'rice', 'eggs', 'vegetables', 'sausage', 'shrimp', 'potatoes', 'beans']
    case '5-ingredient-dinners':
      return ['chicken breast', 'pasta', 'cheese', 'butter', 'garlic', 'eggs', 'bacon', 'rice', 'tomatoes', 'cream']
    default:
      return []
  }
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
