'use client'

import { useState } from 'react'
import { Button } from './Button'
import { Recipe } from '@/lib/recipeProviders/provider'

interface RecipeBuilderProps {
  type: 'pantry' | 'grocery'
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

export function RecipeBuilder({ type }: RecipeBuilderProps) {
  const [ingredients, setIngredients] = useState<string[]>([])
  const [ingredientInput, setIngredientInput] = useState('')
  const [dietaryRequirements, setDietaryRequirements] = useState<string[]>([])
  const [allergies, setAllergies] = useState<string[]>([])
  const [mealType, setMealType] = useState('')
  const [timeAvailable, setTimeAvailable] = useState('')
  const [skillLevel, setSkillLevel] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [appliances, setAppliances] = useState<string[]>([])
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

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-2">
      {/* Left Column - Form */}
      <div className="space-y-6">
        <div className="rounded-lg bg-card p-6 shadow-sm border border-border">
          <h2 className="text-xl font-semibold text-foreground">Ingredients</h2>
          <div className="mt-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
                placeholder="Add ingredient..."
                className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Button onClick={addIngredient} size="sm">
                Add
              </Button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {ingredients.map((ing) => (
                <span
                  key={ing}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                >
                  {ing}
                  <button
                    onClick={() => removeIngredient(ing)}
                    className="text-primary/70 hover:text-primary"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="mt-3">
              <p className="text-sm text-muted-foreground">Quick add:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {QUICK_INGREDIENTS.map((ing) => (
                  <button
                    key={ing}
                    onClick={() => {
                      if (!ingredients.includes(ing)) {
                        setIngredients([...ingredients, ing])
                      }
                    }}
                    className="rounded-md border border-border bg-card px-2 py-1 text-xs text-muted-foreground hover:bg-muted"
                  >
                    + {ing}
                  </button>
                ))}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExample}
              className="mt-3"
            >
              Load Example
            </Button>
          </div>
        </div>

        <div className="rounded-lg bg-card p-6 shadow-sm border border-border">
          <h2 className="text-xl font-semibold text-foreground">
            Dietary Requirements
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {DIETARY_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => toggleDietary(option)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  dietaryRequirements.includes(option)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-card p-6 shadow-sm border border-border">
          <h2 className="text-xl font-semibold text-foreground">Allergies</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {ALLERGY_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => toggleAllergy(option)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  allergies.includes(option)
                    ? 'bg-destructive text-destructive-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-card p-4 shadow-sm border border-border">
            <label className="block text-sm font-medium text-foreground">
              Meal Type
            </label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">Any</option>
              {MEAL_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-lg bg-card p-4 shadow-sm border border-border">
            <label className="block text-sm font-medium text-foreground">
              Time Available
            </label>
            <select
              value={timeAvailable}
              onChange={(e) => setTimeAvailable(e.target.value)}
              className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">Any</option>
              {TIME_OPTIONS.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-lg bg-card p-4 shadow-sm border border-border">
            <label className="block text-sm font-medium text-foreground">
              Skill Level
            </label>
            <select
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
              className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">Any</option>
              {SKILL_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-lg bg-card p-4 shadow-sm border border-border">
            <label className="block text-sm font-medium text-foreground">
              Cuisine
            </label>
            <select
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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

        <div className="rounded-lg bg-card p-6 shadow-sm border border-border">
          <h2 className="text-xl font-semibold text-foreground">Appliances</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {APPLIANCES.map((appliance) => (
              <label
                key={appliance}
                className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground hover:bg-muted cursor-pointer"
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

        <div className="rounded-lg bg-card p-6 shadow-sm border border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              Macro Targets (per serving)
            </h2>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={macroTargetsEnabled}
                onChange={(e) => setMacroTargetsEnabled(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-muted-foreground">Enable</span>
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
                  className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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
                  className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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
                  className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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
                  className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          )}
        </div>

        {type === 'grocery' && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-card p-4 shadow-sm border border-border">
              <label className="block text-sm font-medium text-foreground">
                Budget ($)
              </label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Optional"
                className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="rounded-lg bg-card p-4 shadow-sm border border-border">
              <label className="block text-sm font-medium text-foreground">
                Store Preference
              </label>
              <input
                type="text"
                value={storePreference}
                onChange={(e) => setStorePreference(e.target.value)}
                placeholder="Optional"
                className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-card p-4 shadow-sm border border-border">
            <label className="block text-sm font-medium text-foreground">
              Servings
            </label>
            <div className="mt-1 flex items-center gap-2">
              <button
                onClick={() => setServings(Math.max(1, servings - 1))}
                className="rounded-md border border-border px-3 py-1 text-foreground hover:bg-muted"
              >
                −
              </button>
              <span className="w-12 text-center font-medium text-foreground">{servings}</span>
              <button
                onClick={() => setServings(Math.min(20, servings + 1))}
                className="rounded-md border border-border px-3 py-1 text-foreground hover:bg-muted"
              >
                +
              </button>
            </div>
          </div>
          <div className="rounded-lg bg-card p-4 shadow-sm border border-border">
            <label className="block text-sm font-medium text-foreground">
              Number of Recipes
            </label>
            <select
              value={numberOfRecipes}
              onChange={(e) => setNumberOfRecipes(parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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
          <div className="rounded-md bg-destructive/10 p-4 text-destructive">{error}</div>
        )}

        <Button
          onClick={handleGenerate}
          disabled={loading || ingredients.length === 0}
          size="lg"
          className="w-full"
        >
          {loading ? 'Generating Recipes...' : 'Generate Recipes'}
        </Button>
      </div>

      {/* Right Column - Results */}
      <div className="lg:sticky lg:top-8 lg:h-fit">
        <div className="rounded-lg bg-card p-6 shadow-sm border border-border">
          <h2 className="text-xl font-semibold text-foreground">Recipe Results</h2>
          {loading && (
            <div className="mt-6 text-center text-muted-foreground">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="mt-2">Generating recipes...</p>
            </div>
          )}
          {!loading && recipes.length === 0 && (
            <div className="mt-6 text-center text-muted-foreground">
              <p>
                Fill out the form and click &quot;Generate Recipes&quot; to see results here.
              </p>
            </div>
          )}
          {!loading && recipes.length > 0 && (
            <div className="mt-6 space-y-4">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="rounded-lg border border-border p-4"
                >
                  <h3 className="text-lg font-semibold text-foreground">
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
                  <div className="mt-4">
                    <details className="text-sm">
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
