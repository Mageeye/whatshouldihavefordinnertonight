'use client'

import { useState, useRef } from 'react'
import { useSession } from 'next-auth/react'
import html2canvas from 'html2canvas'
import { Button } from './Button'
import { Recipe } from '@/lib/recipeProviders/provider'

interface RecipeBuilderProps {
  type: 'pantry' | 'grocery'
  /** Pre-populate ingredients (e.g., for ingredient pSEO pages) */
  initialIngredients?: string[]
  /** Pre-select dietary requirements (e.g., for diet pSEO pages) */
  initialDietaryRequirements?: string[]
  /** Pre-select appliances (e.g., for appliance pSEO pages) */
  initialAppliances?: string[]
  /** Pre-select time available (e.g., for time constraint pSEO pages) */
  initialTimeAvailable?: string
  /** Custom quick-add ingredients to show (replaces default QUICK_INGREDIENTS) */
  suggestedIngredients?: string[]
  /** Hide the page title/header area (used when embedded in pSEO pages) */
  compact?: boolean
}

const DIETARY_OPTIONS = [
  'Keto',
  'Low Carb',
  'High Protein',
  'Dairy-Free',
  'Gluten-Free',
  'Vegetarian',
  'Vegan',
]

const ALLERGY_OPTIONS = ['Nuts', 'Eggs', 'Shellfish', 'Soy', 'Dairy']

const QUICK_INGREDIENTS = [
  'chicken',
  'pasta',
  'rice',
  'eggs',
  'tomatoes',
  'onions',
  'garlic',
  'cheese',
  'bread',
  'potatoes',
]

const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert']
const TIME_OPTIONS = ['15 min', '30 min', '45 min', '1 hour', '1+ hours']
const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced']
const CUISINES = [
  'American',
  'Italian',
  'Mexican',
  'Asian',
  'Mediterranean',
  'Indian',
  'French',
  'Other',
]
const APPLIANCES = [
  'Air fryer',
  'Oven',
  'Stove',
  'Instant Pot',
  'Microwave',
  'Grill',
]

export function RecipeBuilder({ 
  type,
  initialIngredients = [],
  initialDietaryRequirements = [],
  initialAppliances = [],
  initialTimeAvailable = '',
  suggestedIngredients,
  compact = false,
}: RecipeBuilderProps) {
  const { data: session } = useSession()
  const [ingredients, setIngredients] = useState<string[]>(initialIngredients)
  const [ingredientInput, setIngredientInput] = useState('')
  const [dietaryRequirements, setDietaryRequirements] = useState<string[]>(initialDietaryRequirements)
  const [allergies, setAllergies] = useState<string[]>([])
  const [mealType, setMealType] = useState('')
  const [timeAvailable, setTimeAvailable] = useState(initialTimeAvailable)
  const [skillLevel, setSkillLevel] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [appliances, setAppliances] = useState<string[]>(initialAppliances)
  const [macroTargetsEnabled, setMacroTargetsEnabled] = useState(false)
  const [calories, setCalories] = useState('')
  const [protein, setProtein] = useState('')
  const [carbs, setCarbs] = useState('')
  const [fat, setFat] = useState('')
  const [servings, setServings] = useState(2)
  const [numberOfRecipes, setNumberOfRecipes] = useState(3)
  const [budget, setBudget] = useState('')
  const [storePreference, setStorePreference] = useState('')
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Save recipe state
  const [savingRecipeId, setSavingRecipeId] = useState<string | null>(null)
  const [savedRecipeIds, setSavedRecipeIds] = useState<Set<string>>(new Set())
  
  // Download state
  const [downloadingRecipeId, setDownloadingRecipeId] = useState<string | null>(null)
  const recipeCardRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  const handleDownloadRecipe = async (recipe: Recipe) => {
    const cardElement = recipeCardRefs.current.get(recipe.id)
    if (!cardElement) return

    setDownloadingRecipeId(recipe.id)
    try {
      // Temporarily expand the details if closed
      const details = cardElement.querySelector('details')
      const wasOpen = details?.open
      if (details) details.open = true

      // Wait a tick for DOM to update
      await new Promise(resolve => setTimeout(resolve, 100))

      const canvas = await html2canvas(cardElement, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher quality
        logging: false,
        useCORS: true,
      })

      // Restore details state
      if (details && !wasOpen) details.open = false

      // Download the image
      const link = document.createElement('a')
      link.download = `${recipe.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-recipe.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Failed to download recipe:', error)
    } finally {
      setDownloadingRecipeId(null)
    }
  }

  const handleSaveRecipe = async (recipe: Recipe) => {
    if (!session) return
    
    setSavingRecipeId(recipe.id)
    try {
      const response = await fetch('/api/recipes/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: recipe.title,
          description: recipe.description,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          prepTime: recipe.prepTime,
          cookTime: recipe.cookTime,
          servings: recipe.servings,
          cuisine: recipe.cuisine,
          difficulty: recipe.difficulty,
          nutrition: recipe.nutrition,
        }),
      })

      if (response.ok) {
        setSavedRecipeIds(prev => new Set([...prev, recipe.id]))
      }
    } catch (error) {
      console.error('Failed to save recipe:', error)
    } finally {
      setSavingRecipeId(null)
    }
  }

  const addIngredient = () => {
    const trimmed = ingredientInput.trim()
    if (trimmed && !ingredients.includes(trimmed.toLowerCase())) {
      setIngredients([...ingredients, trimmed.toLowerCase()])
      setIngredientInput('')
    }
  }

  const removeIngredient = (ing: string) => {
    setIngredients(ingredients.filter((i) => i !== ing))
  }

  const toggleDietary = (item: string) => {
    if (dietaryRequirements.includes(item)) {
      setDietaryRequirements(dietaryRequirements.filter((d) => d !== item))
    } else {
      setDietaryRequirements([...dietaryRequirements, item])
    }
  }

  const toggleAllergy = (item: string) => {
    if (allergies.includes(item)) {
      setAllergies(allergies.filter((a) => a !== item))
    } else {
      setAllergies([...allergies, item])
    }
  }

  const toggleAppliance = (item: string) => {
    if (appliances.includes(item)) {
      setAppliances(appliances.filter((a) => a !== item))
    } else {
      setAppliances([...appliances, item])
    }
  }

  const handleExample = () => {
    setIngredients(['chicken', 'rice', 'broccoli', 'garlic', 'olive oil'])
    setMealType('Dinner')
    setTimeAvailable('30 min')
    setSkillLevel('Beginner')
    setCuisine('American')
  }

  const handleGenerate = async () => {
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const requestBody: any = {
        type,
        ingredients,
        dietaryRequirements: dietaryRequirements.length > 0 ? dietaryRequirements : undefined,
        allergies: allergies.length > 0 ? allergies : undefined,
        mealType: mealType || undefined,
        timeAvailable: timeAvailable || undefined,
        skillLevel: skillLevel || undefined,
        cuisine: cuisine || undefined,
        appliances: appliances.length > 0 ? appliances : undefined,
        servings,
        numberOfRecipes,
      }

      if (macroTargetsEnabled) {
        requestBody.macroTargets = {
          calories: calories ? parseInt(calories) : undefined,
          protein: protein ? parseInt(protein) : undefined,
          carbs: carbs ? parseInt(carbs) : undefined,
          fat: fat ? parseInt(fat) : undefined,
        }
      }

      if (type === 'grocery') {
        if (budget) requestBody.budget = parseFloat(budget)
        if (storePreference) requestBody.storePreference = storePreference
      }

      const response = await fetch('/api/recipes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to generate recipes')
      }

      const data = await response.json()
      setRecipes(data.recipes)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const buttonLabel = type === 'grocery' ? 'Build my plan' : 'Get recipes'
  const loadingLabel = type === 'grocery' ? 'Building plan...' : 'Getting recipes...'
  const emptyStateText = type === 'grocery' 
    ? 'Your plan will show here after you click Build my plan.'
    : 'Your recipes will show here. Add a few ingredients and hit Get recipes.'

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-2">
      {/* Left Column - Form */}
      <div className="space-y-6">
        <div className="rounded-xl bg-card p-6 shadow-sm border border-border">
          <h2 className="text-lg font-medium text-foreground">Ingredients</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Type an ingredient and press Add. 2–6 items works great.
          </p>
          <div className="mt-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
                placeholder="Add ingredient..."
                className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button onClick={addIngredient} size="sm">
                Add
              </Button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {ingredients.map((ing) => (
                <span
                  key={ing}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                >
                  {ing}
                  <button
                    onClick={() => removeIngredient(ing)}
                    className="text-primary/70 hover:text-primary ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Popular adds:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(suggestedIngredients || QUICK_INGREDIENTS).map((ing) => (
                  <button
                    key={ing}
                    onClick={() => {
                      if (!ingredients.includes(ing.toLowerCase())) {
                        setIngredients([...ingredients, ing.toLowerCase()])
                      }
                    }}
                    disabled={ingredients.includes(ing.toLowerCase())}
                    className={`rounded-lg border border-border px-3 py-1.5 text-sm transition-colors ${
                      ingredients.includes(ing.toLowerCase())
                        ? 'bg-primary/10 text-primary cursor-default'
                        : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    {ingredients.includes(ing.toLowerCase()) ? '✓' : '+'} {ing}
                  </button>
                ))}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExample}
              className="mt-4"
            >
              Try an example
            </Button>
          </div>
        </div>

        <div className="rounded-xl bg-card p-6 shadow-sm border border-border">
          <h2 className="text-lg font-medium text-foreground">Diet</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {DIETARY_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => toggleDietary(option)}
                className={`rounded-full px-4 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  dietaryRequirements.includes(option)
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-card p-6 shadow-sm border border-border">
          <h2 className="text-lg font-medium text-foreground">Allergies</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {ALLERGY_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => toggleAllergy(option)}
                className={`rounded-full px-4 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  allergies.includes(option)
                    ? 'bg-destructive text-destructive-foreground shadow-sm'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-card p-4 shadow-sm border border-border">
            <label className="block text-sm font-medium text-foreground">
              Meal Type
            </label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Any</option>
              {MEAL_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-xl bg-card p-4 shadow-sm border border-border">
            <label className="block text-sm font-medium text-foreground">
              Time Available
            </label>
            <select
              value={timeAvailable}
              onChange={(e) => setTimeAvailable(e.target.value)}
              className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Any</option>
              {TIME_OPTIONS.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-xl bg-card p-4 shadow-sm border border-border">
            <label className="block text-sm font-medium text-foreground">
              Skill Level
            </label>
            <select
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
              className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Any</option>
              {SKILL_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-xl bg-card p-4 shadow-sm border border-border">
            <label className="block text-sm font-medium text-foreground">
              Cuisine
            </label>
            <select
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Any</option>
              {CUISINES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="rounded-xl bg-card p-6 shadow-sm border border-border">
          <h2 className="text-lg font-medium text-foreground">Appliances</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {APPLIANCES.map((appliance) => (
              <label
                key={appliance}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground hover:bg-muted cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={appliances.includes(appliance)}
                  onChange={() => toggleAppliance(appliance)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                {appliance}
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-card p-6 shadow-sm border border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-foreground">
              Macros (optional)
            </h2>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={macroTargetsEnabled}
                onChange={(e) => setMacroTargetsEnabled(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-muted-foreground">Set macros</span>
            </label>
          </div>
          {macroTargetsEnabled && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Calories
                </label>
                <input
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Protein (g)
                </label>
                <input
                  type="number"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                  className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Carbs (g)
                </label>
                <input
                  type="number"
                  value={carbs}
                  onChange={(e) => setCarbs(e.target.value)}
                  className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Fat (g)
                </label>
                <input
                  type="number"
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                  className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          )}
        </div>

        {type === 'grocery' && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-card p-4 shadow-sm border border-border">
              <label className="block text-sm font-medium text-foreground">
                Budget (optional)
              </label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="$"
                className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="rounded-xl bg-card p-4 shadow-sm border border-border">
              <label className="block text-sm font-medium text-foreground">
                Store (optional)
              </label>
              <input
                type="text"
                value={storePreference}
                onChange={(e) => setStorePreference(e.target.value)}
                placeholder="e.g. Trader Joe's"
                className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-card p-4 shadow-sm border border-border">
            <label className="block text-sm font-medium text-foreground">
              Servings
            </label>
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={() => setServings(Math.max(1, servings - 1))}
                className="rounded-lg border border-border px-4 py-2 text-foreground hover:bg-muted transition-colors"
              >
                −
              </button>
              <span className="w-12 text-center font-medium text-foreground">{servings}</span>
              <button
                onClick={() => setServings(Math.min(20, servings + 1))}
                className="rounded-lg border border-border px-4 py-2 text-foreground hover:bg-muted transition-colors"
              >
                +
              </button>
            </div>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-sm border border-border">
            <label className="block text-sm font-medium text-foreground">
              Number of Recipes
            </label>
            <select
              value={numberOfRecipes}
              onChange={(e) => setNumberOfRecipes(parseInt(e.target.value))}
              className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
            {[1, 2, 3].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-destructive/10 p-4 text-destructive">{error}</div>
        )}

        <Button
          onClick={handleGenerate}
          disabled={loading || ingredients.length === 0}
          size="lg"
          className="w-full h-12 text-base shadow-sm"
        >
          {loading ? loadingLabel : buttonLabel}
        </Button>
      </div>

      {/* Right Column - Results */}
      <div className="lg:sticky lg:top-8 lg:h-fit">
        <div className="rounded-xl bg-card p-6 shadow-sm border border-border">
          <h2 className="text-lg font-medium text-foreground">Results</h2>
          {loading && (
            <div className="mt-6 text-center text-muted-foreground">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="mt-2">{loadingLabel}</p>
            </div>
          )}
          {!loading && recipes.length === 0 && (
            <div className="mt-6 text-center text-muted-foreground">
              <p>{emptyStateText}</p>
            </div>
          )}
          {!loading && recipes.length > 0 && (
            <div className="mt-6 space-y-4">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  ref={(el) => {
                    if (el) recipeCardRefs.current.set(recipe.id, el)
                  }}
                  className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/50"
                >
                  <h3 className="text-base font-semibold text-foreground">
                    {recipe.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {recipe.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {recipe.prepTime && <span>Prep: {recipe.prepTime} min</span>}
                    {recipe.cookTime && <span>Cook: {recipe.cookTime} min</span>}
                    {recipe.servings && <span>Serves: {recipe.servings}</span>}
                    {recipe.cuisine && <span>Cuisine: {recipe.cuisine}</span>}
                    {recipe.difficulty && (
                      <span>Difficulty: {recipe.difficulty}</span>
                    )}
                  </div>
                  {recipe.nutrition && (
                    <div className="mt-3 text-xs text-muted-foreground">
                      <strong className="text-foreground">Nutrition (per serving):</strong>{' '}
                      {recipe.nutrition.calories && (
                        <span>{recipe.nutrition.calories} cal</span>
                      )}
                      {recipe.nutrition.protein && (
                        <span>, {recipe.nutrition.protein}g protein</span>
                      )}
                      {recipe.nutrition.carbs && (
                        <span>, {recipe.nutrition.carbs}g carbs</span>
                      )}
                      {recipe.nutrition.fat && (
                        <span>, {recipe.nutrition.fat}g fat</span>
                      )}
                    </div>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <details className="text-sm flex-1">
                      <summary className="cursor-pointer font-medium text-primary hover:text-primary/80">
                        View Recipe
                      </summary>
                      <div className="mt-2 space-y-2">
                        <div>
                          <strong className="text-foreground">Ingredients:</strong>
                          <ul className="ml-4 list-disc text-muted-foreground">
                            {recipe.ingredients.map((ing, idx) => (
                              <li key={idx}>{ing}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <strong className="text-foreground">Instructions:</strong>
                          <ol className="ml-4 list-decimal text-muted-foreground">
                            {recipe.instructions.map((step, idx) => (
                              <li key={idx}>{step}</li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </details>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
                    <button
                      onClick={() => handleDownloadRecipe(recipe)}
                      disabled={downloadingRecipeId === recipe.id}
                      className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors disabled:opacity-50"
                    >
                      {downloadingRecipeId === recipe.id ? 'Downloading...' : '📥 Download'}
                    </button>
                    {session && (
                      <button
                        onClick={() => handleSaveRecipe(recipe)}
                        disabled={savingRecipeId === recipe.id || savedRecipeIds.has(recipe.id)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                          savedRecipeIds.has(recipe.id)
                            ? 'bg-primary/10 text-primary'
                            : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                        } disabled:opacity-50`}
                      >
                        {savingRecipeId === recipe.id 
                          ? 'Saving...' 
                          : savedRecipeIds.has(recipe.id) 
                            ? '✓ Saved' 
                            : '💾 Save'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
