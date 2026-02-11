// Static recipe ideas for pSEO pages
// These provide immediate value to users searching for recipe inspiration

import { proteinRecipes1, proteinFaqs1 } from './recipes/protein-recipes-1'
import { proteinRecipes2, proteinFaqs2 } from './recipes/protein-recipes-2'
import { baseRecipes, baseFaqs } from './recipes/base-recipes'
import { pantryRecipes, pantryFaqs } from './recipes/pantry-recipes'
import { comboRecipesUpgrade, comboFaqsUpgrade } from './recipes/combo-recipes-upgrade'
import { comboRecipesNew1, comboFaqsNew1 } from './recipes/combo-recipes-new-1'
import { comboRecipesNew2, comboFaqsNew2 } from './recipes/combo-recipes-new-2'

export interface RecipeIdea {
  title: string
  description: string
  timeMinutes: number
  method: 'stir-fry' | 'one-pan' | 'casserole' | 'bowl' | 'skillet' | 'sheet-pan' | 'slow-cooker' | 'instant-pot' | 'baked' | 'soup' | 'salad'
  difficulty: 'easy' | 'medium'
  // Full recipe fields (optional — populated for priority combos)
  prepTime?: number
  cookTime?: number
  servings?: number
  cuisine?: string
  ingredients?: string[]
  instructions?: string[]
  nutrition?: {
    calories?: number
    protein?: number
    carbs?: number
    fat?: number
  }
}

// Type guard: check if a RecipeIdea has full recipe data
export function isFullRecipe(idea: RecipeIdea): boolean {
  return !!(idea.ingredients && idea.ingredients.length > 0 && idea.instructions && idea.instructions.length > 0)
}

export interface ComboRecipeIdeas {
  slug: string
  ideas: RecipeIdea[]
}

export interface FAQ {
  question: string
  answer: string
}

export interface ComboFAQs {
  slug: string
  faqs: FAQ[]
}

// Recipe ideas organized by combo slug
export const recipeIdeasBySlug: Record<string, RecipeIdea[]> = {
  // Single ingredient page recipes
  ...proteinRecipes1,
  ...proteinRecipes2,
  ...baseRecipes,
  ...pantryRecipes,

  // Combo page recipes
  // Chicken Breast + Pasta
  'chicken-breast-pasta': [
    {
      title: 'Creamy Tuscan Chicken Pasta',
      description: 'Sun-dried tomatoes, spinach, and garlic in a rich cream sauce with tender chicken.',
      timeMinutes: 30,
      method: 'skillet',
      difficulty: 'easy',
    },
    {
      title: 'Chicken Alfredo',
      description: 'Classic creamy parmesan sauce with seared chicken over fettuccine.',
      timeMinutes: 25,
      method: 'skillet',
      difficulty: 'easy',
    },
    {
      title: 'Lemon Chicken Pasta',
      description: 'Bright and zesty lemon butter sauce with herbs and tender chicken.',
      timeMinutes: 25,
      method: 'skillet',
      difficulty: 'easy',
    },
    {
      title: 'Cajun Chicken Pasta',
      description: 'Spicy Cajun-seasoned chicken in a creamy sauce with bell peppers.',
      timeMinutes: 30,
      method: 'skillet',
      difficulty: 'easy',
    },
    {
      title: 'Chicken Carbonara',
      description: 'Rich and silky egg-based sauce with bacon and parmesan.',
      timeMinutes: 25,
      method: 'skillet',
      difficulty: 'medium',
    },
    {
      title: 'Chicken Pesto Pasta',
      description: 'Fresh basil pesto tossed with pasta and grilled chicken.',
      timeMinutes: 20,
      method: 'skillet',
      difficulty: 'easy',
    },
    {
      title: 'One-Pot Chicken Pasta',
      description: 'Everything cooks together for maximum flavor and minimal cleanup.',
      timeMinutes: 30,
      method: 'one-pan',
      difficulty: 'easy',
    },
    {
      title: 'Chicken Parmesan Pasta',
      description: 'Crispy breaded chicken over pasta with marinara and melted mozzarella.',
      timeMinutes: 40,
      method: 'baked',
      difficulty: 'medium',
    },
  ],

  // Ground Beef + Rice
  'ground-beef-rice': [
    {
      title: 'Korean Beef Bowls',
      description: 'Sweet and savory ground beef with ginger and garlic over steamed rice.',
      timeMinutes: 20,
      method: 'bowl',
      difficulty: 'easy',
    },
    {
      title: 'Stuffed Pepper Skillet',
      description: 'All the flavors of stuffed peppers without the hassle, served over rice.',
      timeMinutes: 30,
      method: 'skillet',
      difficulty: 'easy',
    },
    {
      title: 'Taco Rice Bowls',
      description: 'Seasoned taco meat over rice with all your favorite toppings.',
      timeMinutes: 25,
      method: 'bowl',
      difficulty: 'easy',
    },
    {
      title: 'Cheesy Beef and Rice Casserole',
      description: 'Baked comfort food with ground beef, rice, and plenty of cheese.',
      timeMinutes: 45,
      method: 'casserole',
      difficulty: 'easy',
    },
    {
      title: 'Ground Beef Fried Rice',
      description: 'Quick and easy fried rice with seasoned ground beef and vegetables.',
      timeMinutes: 25,
      method: 'stir-fry',
      difficulty: 'easy',
    },
    {
      title: 'Beef and Rice Soup',
      description: 'Hearty and warming soup with ground beef, rice, and vegetables.',
      timeMinutes: 35,
      method: 'soup',
      difficulty: 'easy',
    },
    {
      title: 'One-Pot Beef and Rice',
      description: 'Simple weeknight dinner with everything cooked in one pot.',
      timeMinutes: 35,
      method: 'one-pan',
      difficulty: 'easy',
    },
    {
      title: 'Mediterranean Beef Rice Bowls',
      description: 'Seasoned beef with feta, cucumber, and tzatziki over rice.',
      timeMinutes: 30,
      method: 'bowl',
      difficulty: 'easy',
    },
  ],

  // Chicken Breast + Rice (FULL RECIPES)
  'chicken-breast-rice': [
    {
      title: 'Chicken Fried Rice',
      description: 'Classic takeout-style fried rice with tender chicken, scrambled eggs, and crispy vegetables. Better than delivery and ready in 25 minutes.',
      timeMinutes: 25,
      method: 'stir-fry',
      difficulty: 'easy',
      prepTime: 10,
      cookTime: 15,
      servings: 4,
      cuisine: 'Asian',
      ingredients: [
        '2 large chicken breasts, diced into small cubes',
        '3 cups cooked rice (day-old works best)',
        '2 large eggs, beaten',
        '1 cup frozen peas and carrots',
        '3 green onions, sliced',
        '3 tablespoons soy sauce',
        '1 tablespoon sesame oil',
        '2 tablespoons vegetable oil',
        '2 cloves garlic, minced',
        '1 teaspoon fresh ginger, grated',
        'Salt and white pepper to taste',
      ],
      instructions: [
        'Heat 1 tablespoon vegetable oil in a large wok or skillet over high heat. Add diced chicken, season with salt and pepper, and cook until golden and cooked through, about 5-6 minutes. Remove and set aside.',
        'Add remaining tablespoon of vegetable oil to the wok. Add frozen peas and carrots, cooking for 2 minutes until thawed and slightly tender.',
        'Push vegetables to the side and pour beaten eggs into the empty space. Scramble until just set, then mix with the vegetables.',
        'Add the cooked rice to the wok, breaking up any clumps. Stir-fry for 2-3 minutes until rice is heated through and slightly crispy.',
        'Add garlic and ginger, stirring for 30 seconds until fragrant.',
        'Pour soy sauce and sesame oil over the rice. Toss everything together with the cooked chicken.',
        'Garnish with sliced green onions. Serve immediately.',
      ],
      nutrition: {
        calories: 420,
        protein: 35,
        carbs: 42,
        fat: 12,
      },
    },
    {
      title: 'Teriyaki Chicken Bowls',
      description: 'Sweet and savory glazed chicken over steamed rice with broccoli and sesame seeds. A balanced, restaurant-quality bowl at home.',
      timeMinutes: 30,
      method: 'bowl',
      difficulty: 'easy',
      prepTime: 10,
      cookTime: 20,
      servings: 4,
      cuisine: 'Japanese',
      ingredients: [
        '2 large chicken breasts, sliced into strips',
        '3 cups cooked jasmine rice',
        '2 cups broccoli florets',
        '1/3 cup soy sauce',
        '3 tablespoons honey',
        '2 tablespoons rice vinegar',
        '1 tablespoon cornstarch mixed with 2 tablespoons water',
        '2 cloves garlic, minced',
        '1 teaspoon fresh ginger, grated',
        '1 tablespoon vegetable oil',
        'Sesame seeds and sliced green onions for garnish',
      ],
      instructions: [
        'Whisk together soy sauce, honey, rice vinegar, garlic, and ginger in a small bowl to make the teriyaki sauce.',
        'Heat vegetable oil in a large skillet over medium-high heat. Add chicken strips and cook until golden brown and cooked through, about 6-7 minutes. Remove and set aside.',
        'Steam broccoli florets until tender-crisp, about 3-4 minutes. Set aside.',
        'Pour the teriyaki sauce into the skillet and bring to a simmer. Add the cornstarch slurry and stir until the sauce thickens, about 1-2 minutes.',
        'Return the chicken to the skillet and toss to coat in the glossy teriyaki sauce.',
        'Divide steamed rice among 4 bowls. Top with teriyaki chicken and steamed broccoli.',
        'Garnish with sesame seeds and sliced green onions. Serve immediately.',
      ],
      nutrition: {
        calories: 450,
        protein: 38,
        carbs: 52,
        fat: 8,
      },
    },
    {
      title: 'One-Pan Spanish Chicken Rice',
      description: 'Aromatic saffron-spiced rice with chicken, peppers, and peas cooked together in one pan. Inspired by classic arroz con pollo.',
      timeMinutes: 40,
      method: 'one-pan',
      difficulty: 'medium',
      prepTime: 10,
      cookTime: 30,
      servings: 4,
      cuisine: 'Spanish',
      ingredients: [
        '2 large chicken breasts, cut into chunks',
        '1.5 cups long-grain white rice',
        '2.5 cups chicken broth',
        '1 red bell pepper, diced',
        '1 small onion, diced',
        '3 cloves garlic, minced',
        '1 cup frozen peas',
        '1 can (14 oz) diced tomatoes',
        '1 teaspoon smoked paprika',
        'Pinch of saffron threads (or 1/2 tsp turmeric)',
        '2 tablespoons olive oil',
        'Salt, pepper, and fresh parsley for garnish',
      ],
      instructions: [
        'Season chicken chunks with smoked paprika, salt, and pepper. Heat olive oil in a large deep skillet or Dutch oven over medium-high heat.',
        'Sear the chicken until golden on all sides, about 4-5 minutes. Remove and set aside.',
        'In the same pan, saut\u00e9 onion and bell pepper until softened, about 3 minutes. Add garlic and cook 30 seconds.',
        'Add the rice and stir to coat in the oil for 1 minute. Pour in chicken broth, diced tomatoes, and saffron. Stir to combine.',
        'Nestle the seared chicken pieces into the rice. Bring to a boil, then reduce heat to low, cover, and simmer for 18-20 minutes.',
        'Scatter frozen peas over the top (do not stir), replace lid, and cook 5 more minutes until rice is tender and liquid is absorbed.',
        'Let rest covered for 5 minutes. Fluff with a fork, garnish with fresh parsley, and serve.',
      ],
      nutrition: {
        calories: 480,
        protein: 36,
        carbs: 58,
        fat: 10,
      },
    },
    {
      title: 'Creamy Chicken Rice Casserole',
      description: 'Comforting baked casserole with tender chicken, rice, and a creamy mushroom sauce. The ultimate cozy weeknight dinner.',
      timeMinutes: 50,
      method: 'casserole',
      difficulty: 'easy',
      prepTime: 15,
      cookTime: 35,
      servings: 6,
      cuisine: 'American',
      ingredients: [
        '2 large chicken breasts, cooked and shredded',
        '2 cups cooked white rice',
        '1 can (10.5 oz) cream of mushroom soup',
        '1 cup sour cream',
        '1 cup shredded cheddar cheese',
        '1 cup frozen mixed vegetables (peas, carrots, corn)',
        '1/2 cup chicken broth',
        '1 teaspoon garlic powder',
        '1 teaspoon onion powder',
        'Salt and pepper to taste',
        '1/2 cup crushed Ritz crackers for topping',
        '2 tablespoons melted butter',
      ],
      instructions: [
        'Preheat oven to 375\u00b0F (190\u00b0C). Grease a 9x13-inch baking dish.',
        'In a large bowl, combine cream of mushroom soup, sour cream, chicken broth, garlic powder, onion powder, salt, and pepper. Mix until smooth.',
        'Fold in the shredded chicken, cooked rice, frozen vegetables, and half of the shredded cheese.',
        'Transfer the mixture to the prepared baking dish and spread evenly.',
        'Top with remaining cheese. Mix crushed Ritz crackers with melted butter and sprinkle over the top.',
        'Bake uncovered for 30-35 minutes until bubbly and the topping is golden brown.',
        'Let rest for 5 minutes before serving.',
      ],
      nutrition: {
        calories: 520,
        protein: 32,
        carbs: 40,
        fat: 24,
      },
    },
    {
      title: 'Chicken Burrito Bowls',
      description: 'Tex-Mex style bowl with seasoned chicken, cilantro lime rice, beans, and fresh toppings. Chipotle-inspired and totally customizable.',
      timeMinutes: 35,
      method: 'bowl',
      difficulty: 'easy',
      prepTime: 15,
      cookTime: 20,
      servings: 4,
      cuisine: 'Mexican',
      ingredients: [
        '2 large chicken breasts',
        '3 cups cooked white rice',
        '2 tablespoons fresh lime juice',
        '1/4 cup fresh cilantro, chopped',
        '1 can (15 oz) black beans, drained and rinsed',
        '1 cup corn kernels (fresh or frozen)',
        '1 avocado, sliced',
        '1/2 cup salsa',
        '1/2 cup sour cream or Greek yogurt',
        '1 tablespoon chili powder',
        '1 teaspoon cumin',
        '1 teaspoon garlic powder',
        '1 tablespoon olive oil',
        'Salt and pepper to taste',
        'Shredded cheese for topping',
      ],
      instructions: [
        'Mix chili powder, cumin, garlic powder, salt, and pepper. Season chicken breasts generously on both sides.',
        'Heat olive oil in a skillet over medium-high heat. Cook chicken for 6-7 minutes per side until internal temp reaches 165\u00b0F. Let rest 5 minutes, then slice.',
        'While chicken rests, stir lime juice and chopped cilantro into the cooked rice.',
        'Warm black beans and corn in a small saucepan or microwave.',
        'Assemble bowls: divide cilantro lime rice among 4 bowls. Top with sliced chicken, black beans, corn, avocado slices, salsa, and sour cream.',
        'Sprinkle with shredded cheese and extra cilantro if desired. Serve with lime wedges.',
      ],
      nutrition: {
        calories: 510,
        protein: 40,
        carbs: 55,
        fat: 14,
      },
    },
    {
      title: 'Lemon Herb Chicken with Rice',
      description: 'Bright and zesty chicken with herbs served over fluffy rice pilaf. A light, fresh dinner that comes together fast.',
      timeMinutes: 35,
      method: 'skillet',
      difficulty: 'easy',
      prepTime: 10,
      cookTime: 25,
      servings: 4,
      cuisine: 'Mediterranean',
      ingredients: [
        '2 large chicken breasts, butterflied or pounded thin',
        '1.5 cups long-grain white rice',
        '2.5 cups chicken broth',
        '2 lemons (juice of both, zest of one)',
        '3 cloves garlic, minced',
        '2 tablespoons fresh parsley, chopped',
        '1 tablespoon fresh oregano (or 1 tsp dried)',
        '2 tablespoons olive oil',
        '2 tablespoons butter',
        'Salt and pepper to taste',
      ],
      instructions: [
        'Season chicken breasts with salt and pepper. Heat 1 tablespoon olive oil in a large skillet over medium-high heat.',
        'Cook chicken for 5-6 minutes per side until golden and cooked through (165\u00b0F). Remove and tent with foil.',
        'In the same skillet, add remaining olive oil and butter. Saut\u00e9 garlic for 30 seconds until fragrant.',
        'Add the rice and stir to toast for 1 minute. Pour in chicken broth, lemon juice, and lemon zest. Bring to a boil.',
        'Reduce heat to low, cover, and simmer for 18 minutes until rice is tender and liquid is absorbed.',
        'Fluff rice with a fork, stir in fresh parsley and oregano. Slice the rested chicken.',
        'Serve sliced chicken over the lemon herb rice. Garnish with extra lemon slices and fresh herbs.',
      ],
      nutrition: {
        calories: 440,
        protein: 36,
        carbs: 48,
        fat: 12,
      },
    },
    {
      title: 'Coconut Curry Chicken Rice',
      description: 'Creamy Thai-inspired curry with tender chicken served over jasmine rice. Fragrant, warming, and deeply satisfying.',
      timeMinutes: 40,
      method: 'one-pan',
      difficulty: 'medium',
      prepTime: 10,
      cookTime: 30,
      servings: 4,
      cuisine: 'Thai',
      ingredients: [
        '2 large chicken breasts, cut into bite-sized pieces',
        '3 cups cooked jasmine rice',
        '1 can (14 oz) coconut milk',
        '3 tablespoons Thai yellow curry paste',
        '1 red bell pepper, sliced',
        '1 small onion, diced',
        '1 cup green beans, trimmed and halved',
        '1 tablespoon fish sauce',
        '1 tablespoon brown sugar',
        '1 tablespoon vegetable oil',
        'Fresh basil and lime wedges for serving',
      ],
      instructions: [
        'Heat vegetable oil in a large skillet or wok over medium-high heat. Add chicken pieces and cook until lightly browned, about 4-5 minutes. Remove and set aside.',
        'In the same pan, saut\u00e9 onion and bell pepper for 2-3 minutes until slightly softened.',
        'Add the curry paste and cook, stirring constantly, for 1 minute until fragrant.',
        'Pour in the coconut milk, fish sauce, and brown sugar. Stir to combine and bring to a gentle simmer.',
        'Return the chicken to the pan. Add green beans. Simmer for 12-15 minutes until chicken is cooked through and sauce has thickened slightly.',
        'Taste and adjust seasoning with more fish sauce or sugar as needed.',
        'Serve the curry over steamed jasmine rice. Garnish with fresh basil leaves and lime wedges.',
      ],
      nutrition: {
        calories: 530,
        protein: 34,
        carbs: 48,
        fat: 22,
      },
    },
    {
      title: 'Greek Chicken Rice Bowls',
      description: 'Mediterranean-style bowl with grilled chicken, rice, cucumber, tomato, and tzatziki. Fresh, healthy, and packed with flavor.',
      timeMinutes: 30,
      method: 'bowl',
      difficulty: 'easy',
      prepTime: 15,
      cookTime: 15,
      servings: 4,
      cuisine: 'Greek',
      ingredients: [
        '2 large chicken breasts',
        '3 cups cooked rice',
        '1 large cucumber, diced',
        '1 cup cherry tomatoes, halved',
        '1/2 red onion, thinly sliced',
        '1/2 cup kalamata olives, halved',
        '1/2 cup crumbled feta cheese',
        '1 cup plain Greek yogurt',
        '1 tablespoon lemon juice',
        '1 clove garlic, minced',
        '1 tablespoon fresh dill, chopped',
        '2 tablespoons olive oil',
        '1 teaspoon dried oregano',
        'Salt and pepper to taste',
      ],
      instructions: [
        'Make the tzatziki: combine Greek yogurt, diced cucumber (about 1/4 cup), lemon juice, minced garlic, dill, salt, and pepper. Refrigerate until serving.',
        'Season chicken breasts with olive oil, dried oregano, salt, and pepper.',
        'Grill or pan-sear chicken over medium-high heat for 6-7 minutes per side until cooked through (165\u00b0F). Let rest 5 minutes, then slice.',
        'While chicken cooks, prepare the toppings: dice remaining cucumber, halve the tomatoes, slice the red onion, and halve the olives.',
        'Assemble bowls: divide rice among 4 bowls. Arrange sliced chicken, cucumber, tomatoes, red onion, and olives on top.',
        'Add a generous dollop of tzatziki and sprinkle with crumbled feta.',
        'Drizzle with olive oil and serve with warm pita bread if desired.',
      ],
      nutrition: {
        calories: 470,
        protein: 38,
        carbs: 44,
        fat: 16,
      },
    },
  ],

  // Chicken Breast + Broccoli
  'chicken-breast-broccoli': [
    {
      title: 'Chicken Broccoli Stir-Fry',
      description: 'Quick Asian-style stir-fry with tender chicken and crisp broccoli in savory sauce.',
      timeMinutes: 20,
      method: 'stir-fry',
      difficulty: 'easy',
    },
    {
      title: 'Sheet Pan Chicken and Broccoli',
      description: 'Easy hands-off dinner with roasted chicken and broccoli on one pan.',
      timeMinutes: 35,
      method: 'sheet-pan',
      difficulty: 'easy',
    },
    {
      title: 'Chicken Broccoli Alfredo',
      description: 'Creamy pasta with seared chicken, tender broccoli, and rich parmesan sauce.',
      timeMinutes: 30,
      method: 'skillet',
      difficulty: 'easy',
    },
    {
      title: 'Teriyaki Chicken Broccoli',
      description: 'Sweet and glossy teriyaki glazed chicken with steamed broccoli florets.',
      timeMinutes: 25,
      method: 'stir-fry',
      difficulty: 'easy',
    },
    {
      title: 'Lemon Garlic Chicken Broccoli',
      description: 'Bright and aromatic skillet with crispy chicken and garlicky broccoli.',
      timeMinutes: 25,
      method: 'skillet',
      difficulty: 'easy',
    },
    {
      title: 'Honey Garlic Chicken Broccoli',
      description: 'Sticky-sweet honey garlic sauce coats tender chicken and fresh broccoli.',
      timeMinutes: 25,
      method: 'stir-fry',
      difficulty: 'easy',
    },
    {
      title: 'Chicken Broccoli Casserole',
      description: 'Creamy comfort food bake with chicken, broccoli, and a crispy topping.',
      timeMinutes: 45,
      method: 'casserole',
      difficulty: 'easy',
    },
    {
      title: 'Chicken Broccoli Lo Mein',
      description: 'Saucy noodles tossed with sliced chicken, broccoli, and Asian seasonings.',
      timeMinutes: 25,
      method: 'stir-fry',
      difficulty: 'easy',
    },
  ],

  // Ground Beef + Potatoes
  'ground-beef-potatoes': [
    {
      title: 'Classic Shepherd\'s Pie',
      description: 'Savory beef filling topped with creamy mashed potatoes and baked until golden.',
      timeMinutes: 60,
      method: 'casserole',
      difficulty: 'medium',
    },
    {
      title: 'Beef and Potato Hash',
      description: 'Crispy diced potatoes with seasoned ground beef, onions, and a fried egg on top.',
      timeMinutes: 30,
      method: 'skillet',
      difficulty: 'easy',
    },
    {
      title: 'Ground Beef Potato Skillet',
      description: 'One-pan comfort meal with browned beef, tender potatoes, and melted cheese.',
      timeMinutes: 35,
      method: 'skillet',
      difficulty: 'easy',
    },
    {
      title: 'Beef Potato Casserole',
      description: 'Layered casserole with seasoned beef, sliced potatoes, and creamy sauce.',
      timeMinutes: 55,
      method: 'casserole',
      difficulty: 'easy',
    },
    {
      title: 'Loaded Beef and Potato Bowls',
      description: 'Baked potatoes topped with seasoned beef, cheese, sour cream, and green onions.',
      timeMinutes: 45,
      method: 'bowl',
      difficulty: 'easy',
    },
    {
      title: 'Cottage Pie',
      description: 'Traditional British comfort dish with savory beef and vegetable filling under mashed potato.',
      timeMinutes: 60,
      method: 'casserole',
      difficulty: 'medium',
    },
    {
      title: 'Tex-Mex Beef Potato Bowl',
      description: 'Seasoned taco beef over crispy potatoes with salsa, cheese, and avocado.',
      timeMinutes: 35,
      method: 'bowl',
      difficulty: 'easy',
    },
    {
      title: 'Stuffed Baked Potatoes',
      description: 'Fluffy baked potatoes filled with savory ground beef and all the fixings.',
      timeMinutes: 50,
      method: 'baked',
      difficulty: 'easy',
    },
  ],

  // Sausage + Pasta
  'sausage-pasta': [
    {
      title: 'Sausage Marinara Pasta',
      description: 'Italian sausage crumbled into rich tomato sauce served over your favorite pasta.',
      timeMinutes: 25,
      method: 'skillet',
      difficulty: 'easy',
    },
    {
      title: 'Creamy Sausage Pasta',
      description: 'Sliced sausage in a luscious cream sauce with parmesan and fresh herbs.',
      timeMinutes: 25,
      method: 'skillet',
      difficulty: 'easy',
    },
    {
      title: 'Sausage Pesto Pasta',
      description: 'Quick weeknight pasta with sausage, basil pesto, and sun-dried tomatoes.',
      timeMinutes: 20,
      method: 'skillet',
      difficulty: 'easy',
    },
    {
      title: 'Cajun Sausage Pasta',
      description: 'Spicy Cajun-seasoned sausage with peppers and onions in creamy pasta.',
      timeMinutes: 30,
      method: 'skillet',
      difficulty: 'easy',
    },
    {
      title: 'One-Pot Sausage Pasta',
      description: 'Everything cooks together in one pot for easy cleanup and maximum flavor.',
      timeMinutes: 30,
      method: 'one-pan',
      difficulty: 'easy',
    },
    {
      title: 'Baked Sausage Ziti',
      description: 'Sausage and ziti baked with marinara, ricotta, and melted mozzarella.',
      timeMinutes: 45,
      method: 'baked',
      difficulty: 'easy',
    },
    {
      title: 'Orecchiette with Sausage',
      description: 'Little ear-shaped pasta with crumbled sausage, broccoli rabe, and garlic.',
      timeMinutes: 25,
      method: 'skillet',
      difficulty: 'easy',
    },
    {
      title: 'Sausage Vodka Pasta',
      description: 'Trendy vodka sauce with Italian sausage for a rich, restaurant-quality meal.',
      timeMinutes: 30,
      method: 'skillet',
      difficulty: 'easy',
    },
  ],

  // Ground Beef + Pasta
  'ground-beef-pasta': [
    {
      title: 'Classic Bolognese',
      description: 'Rich, slow-simmered meat sauce with tomatoes, wine, and Italian herbs.',
      timeMinutes: 45,
      method: 'slow-cooker',
      difficulty: 'medium',
    },
    {
      title: 'Cheeseburger Mac',
      description: 'Kid-friendly comfort food with ground beef, cheese sauce, and elbow macaroni.',
      timeMinutes: 25,
      method: 'one-pan',
      difficulty: 'easy',
    },
    {
      title: 'Baked Ziti with Beef',
      description: 'Layered pasta bake with seasoned beef, ricotta, and bubbly mozzarella.',
      timeMinutes: 50,
      method: 'baked',
      difficulty: 'easy',
    },
    {
      title: 'American Goulash',
      description: 'Old-fashioned ground beef and elbow macaroni in tomato sauce.',
      timeMinutes: 35,
      method: 'one-pan',
      difficulty: 'easy',
    },
    {
      title: 'Beef Stroganoff Pasta',
      description: 'Creamy mushroom sauce with seasoned beef over egg noodles.',
      timeMinutes: 30,
      method: 'skillet',
      difficulty: 'easy',
    },
    {
      title: 'Taco Pasta',
      description: 'Tex-Mex twist with taco-seasoned beef, tomatoes, and cheese over pasta.',
      timeMinutes: 25,
      method: 'one-pan',
      difficulty: 'easy',
    },
    {
      title: 'Skillet Lasagna',
      description: 'All the flavors of lasagna made quick and easy in one skillet.',
      timeMinutes: 35,
      method: 'skillet',
      difficulty: 'easy',
    },
    {
      title: 'Spaghetti and Meat Sauce',
      description: 'The ultimate family classic with homemade meat sauce over spaghetti.',
      timeMinutes: 30,
      method: 'skillet',
      difficulty: 'easy',
    },
  ],

  // Combo recipe upgrades (full data overrides preview-only entries above)
  ...comboRecipesUpgrade,
  // New combo page recipes
  ...comboRecipesNew1,
  ...comboRecipesNew2,
}

// FAQs organized by combo slug
export const faqsBySlug: Record<string, FAQ[]> = {
  // Single ingredient page FAQs
  ...proteinFaqs1,
  ...proteinFaqs2,
  ...baseFaqs,
  ...pantryFaqs,

  // Combo page FAQs
  'chicken-breast-pasta': [
    {
      question: 'What pasta goes best with chicken?',
      answer: 'Penne, fettuccine, and rigatoni are popular choices. Penne works great with chunky sauces, fettuccine is classic for Alfredo, and rigatoni holds creamy sauces well.',
    },
    {
      question: 'How do I keep chicken breast moist in pasta?',
      answer: 'Pound the chicken to even thickness, don\'t overcook (165°F internal), and let it rest before slicing. Adding it to the sauce near the end also helps.',
    },
    {
      question: 'What sauces pair well with chicken pasta?',
      answer: 'Alfredo, pesto, marinara, lemon butter, and creamy Tuscan are all excellent. For lighter options, try olive oil with garlic and herbs.',
    },
    {
      question: 'Can I make chicken pasta ahead of time?',
      answer: 'Yes, but store the sauce and pasta separately to prevent sogginess. Reheat gently and add a splash of cream or pasta water when warming.',
    },
    {
      question: 'How long does chicken pasta take to make?',
      answer: 'Most chicken pasta recipes take 20-35 minutes. The key is cooking the chicken while the pasta boils to save time.',
    },
  ],

  'ground-beef-rice': [
    {
      question: 'What can I make with ground beef and rice?',
      answer: 'Popular options include Korean beef bowls, taco rice, stuffed pepper skillets, casseroles, and fried rice. These ingredients are incredibly versatile.',
    },
    {
      question: 'Should I cook the rice separately from ground beef?',
      answer: 'Usually yes, for best texture. However, one-pot recipes cook them together with extra liquid for convenience.',
    },
    {
      question: 'What seasonings work best for ground beef and rice?',
      answer: 'For Asian-style, use soy sauce, ginger, and garlic. For Tex-Mex, try cumin and chili powder. Italian herbs work great for Mediterranean dishes.',
    },
    {
      question: 'Can I use brown rice instead of white rice?',
      answer: 'Absolutely! Brown rice is healthier and works in most recipes. Just adjust cooking time as brown rice takes longer.',
    },
    {
      question: 'How do I make ground beef and rice less dry?',
      answer: 'Add sauce or broth, use 80/20 beef instead of lean, and don\'t overcook. A drizzle of soy sauce or Worcestershire also adds moisture.',
    },
  ],

  'chicken-breast-rice': [
    {
      question: 'What can I make with chicken breast and rice?',
      answer: 'Popular options include chicken fried rice, teriyaki bowls, burrito bowls, creamy casseroles, and one-pan Spanish-style rice dishes. These ingredients are incredibly versatile for quick weeknight dinners.',
    },
    {
      question: 'How do I keep chicken breast moist when cooking with rice?',
      answer: 'The key is to not overcook the chicken. Cook it to 165°F internal temperature, let it rest before slicing, or add it to the rice dish near the end of cooking. Marinating or pounding to even thickness also helps.',
    },
    {
      question: 'Can I cook chicken and rice together in one pot?',
      answer: 'Yes! One-pot chicken and rice dishes are popular. Brown the chicken first, then add rice and liquid. The chicken juices flavor the rice as everything cooks together.',
    },
    {
      question: 'What vegetables go well with chicken and rice?',
      answer: 'Broccoli, peas, bell peppers, corn, carrots, and green beans all pair excellently. For Asian-style dishes, add snap peas and water chestnuts. For Mexican-style, try black beans and corn.',
    },
    {
      question: 'How long does it take to make chicken and rice?',
      answer: 'Most chicken and rice recipes take 25-45 minutes. Quick stir-fries can be done in 20 minutes, while casseroles may take up to an hour including baking time.',
    },
  ],

  'chicken-breast-broccoli': [
    {
      question: 'What is the best way to cook chicken and broccoli together?',
      answer: 'Stir-frying is the most popular method—cook chicken first until done, set aside, then quickly cook broccoli until crisp-tender. Combine with sauce. Sheet pan roasting is another easy hands-off option.',
    },
    {
      question: 'How do I make chicken and broccoli like Chinese takeout?',
      answer: 'Use a hot wok or large skillet, velvet the chicken (coat in cornstarch), and make a sauce with soy sauce, oyster sauce, garlic, and ginger. Cook quickly over high heat for that restaurant-style sear.',
    },
    {
      question: 'Should I steam or roast broccoli with chicken?',
      answer: 'Both work great! Steaming keeps broccoli bright green and tender-crisp. Roasting brings out deeper, slightly caramelized flavors. Choose based on your sauce and cooking method.',
    },
    {
      question: 'What sauces go well with chicken and broccoli?',
      answer: 'Teriyaki, honey garlic, lemon garlic, alfredo, and stir-fry sauces are all excellent choices. For a lighter option, try lemon juice with olive oil and herbs.',
    },
    {
      question: 'Can I use frozen broccoli for chicken and broccoli recipes?',
      answer: 'Absolutely! Frozen broccoli works well, especially in casseroles and sheet pan meals. For stir-fries, thaw and pat dry first to prevent steaming.',
    },
  ],

  'ground-beef-potatoes': [
    {
      question: 'What can I make with ground beef and potatoes?',
      answer: 'Classic options include shepherd\'s pie, beef and potato hash, skillet meals, casseroles, stuffed baked potatoes, and Tex-Mex bowls. These hearty combinations are perfect for comfort food dinners.',
    },
    {
      question: 'What is the difference between shepherd\'s pie and cottage pie?',
      answer: 'Traditionally, shepherd\'s pie uses lamb (from shepherds), while cottage pie uses beef. In America, both terms are often used interchangeably for the beef version.',
    },
    {
      question: 'How do I make crispy potatoes with ground beef?',
      answer: 'Cook diced potatoes separately in a hot skillet with oil until crispy, then combine with the cooked ground beef. For hash, press the mixture down and let it get golden before stirring.',
    },
    {
      question: 'What seasonings work best for ground beef and potatoes?',
      answer: 'Classic options include garlic, onion, paprika, thyme, and Worcestershire sauce. For Tex-Mex style, use cumin, chili powder, and oregano.',
    },
    {
      question: 'Can I make ground beef and potatoes ahead of time?',
      answer: 'Yes! Most casseroles and shepherd\'s pies can be assembled ahead and refrigerated for up to 24 hours before baking. Hash and skillets are best made fresh.',
    },
  ],

  'sausage-pasta': [
    {
      question: 'What type of sausage is best for pasta?',
      answer: 'Italian sausage (sweet or hot) is most popular. Andouille works great for Cajun dishes, and smoked sausage or kielbasa are good for quick meals. Remove casings for crumbled sausage.',
    },
    {
      question: 'How do I make creamy sausage pasta?',
      answer: 'Brown the sausage, add garlic and Italian seasoning, pour in heavy cream and parmesan, then toss with cooked pasta. Add pasta water to adjust consistency.',
    },
    {
      question: 'What vegetables pair well with sausage pasta?',
      answer: 'Bell peppers, onions, spinach, broccoli rabe, sun-dried tomatoes, and mushrooms all complement sausage. Peppers and onions are classic for Italian sausage.',
    },
    {
      question: 'Should I remove sausage casings before cooking?',
      answer: 'For crumbled sausage in sauce, yes—remove casings and break up the meat as it cooks. For sliced sausage coins, you can cook them whole first, then slice.',
    },
    {
      question: 'What pasta shapes work best with sausage?',
      answer: 'Rigatoni, penne, and orecchiette hold chunky sauces well. For lighter sauces, spaghetti and linguine work great. Shells and rotini catch bits of sausage.',
    },
  ],

  'ground-beef-pasta': [
    {
      question: 'What is the best pasta for ground beef sauce?',
      answer: 'Spaghetti and rigatoni are classics. For baked dishes, use ziti or penne. Shells and rotini are great for cheeseburger mac. Choose shapes that hold the sauce well.',
    },
    {
      question: 'How do I make ground beef pasta not dry?',
      answer: 'Save pasta water and add it to the sauce to keep things moist. Also, don\'t drain your meat too much—some fat adds flavor and moisture.',
    },
    {
      question: 'What is the difference between Bolognese and meat sauce?',
      answer: 'Bolognese is a slow-cooked Italian sauce with wine, milk, and finely diced vegetables. American meat sauce is quicker, with more tomato and simpler seasoning.',
    },
    {
      question: 'Can I use lean ground beef for pasta?',
      answer: 'Yes, but 80/20 ground beef has more flavor and stays moister. If using lean beef, consider adding a bit of olive oil or butter to the sauce.',
    },
    {
      question: 'How long does ground beef pasta last in the fridge?',
      answer: 'Properly stored in an airtight container, ground beef pasta will last 3-4 days in the refrigerator. It also freezes well for up to 3 months.',
    },
  ],

  // Combo FAQ upgrades and new combo FAQs
  ...comboFaqsUpgrade,
  ...comboFaqsNew1,
  ...comboFaqsNew2,
}

// Helper function to get recipe ideas for a combo
export function getRecipeIdeas(slug: string): RecipeIdea[] {
  return recipeIdeasBySlug[slug] || []
}

// Helper function to get FAQs for a combo
export function getFAQs(slug: string): FAQ[] {
  return faqsBySlug[slug] || []
}

// Check if a combo has recipe ideas
export function hasRecipeIdeas(slug: string): boolean {
  return slug in recipeIdeasBySlug && recipeIdeasBySlug[slug].length > 0
}
