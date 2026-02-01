import { Recipe, RecipeProvider, RecipeRequest } from './provider'

type OpenAIRecipeResponse = {
  recipes: Recipe[]
}

const MODEL = process.env.OPENAI_RECIPE_MODEL || 'gpt-4o-mini'

function buildPrompt(request: RecipeRequest) {
  return {
    system: `You are a helpful cooking assistant. Return JSON only. Do not include markdown.`,
    user: `Create ${request.numberOfRecipes || 3} dinner recipes using these inputs:
Ingredients: ${request.ingredients.join(', ')}
Dietary requirements: ${request.dietaryRequirements?.join(', ') || 'none'}
Allergies: ${request.allergies?.join(', ') || 'none'}
Meal type: ${request.mealType || 'any'}
Time available: ${request.timeAvailable || 'any'}
Skill level: ${request.skillLevel || 'any'}
Cuisine: ${request.cuisine || 'any'}
Appliances: ${request.appliances?.join(', ') || 'any'}
Macro targets: ${request.macroTargets ? JSON.stringify(request.macroTargets) : 'none'}
Servings: ${request.servings || 2}
Budget: ${request.budget || 'none'}
Store preference: ${request.storePreference || 'none'}

Return JSON strictly in this shape:
{
  "recipes": [
    {
      "id": "recipe-1",
      "title": "string",
      "description": "string",
      "ingredients": ["string"],
      "instructions": ["string"],
      "prepTime": 10,
      "cookTime": 20,
      "servings": 2,
      "cuisine": "string",
      "difficulty": "Easy|Medium|Hard",
      "nutrition": { "calories": 0, "protein": 0, "carbs": 0, "fat": 0 }
    }
  ]
}`,
  }
}

function safeJsonParse(content: string): OpenAIRecipeResponse | null {
  try {
    return JSON.parse(content)
  } catch {
    return null
  }
}

export class OpenAIRecipeProvider implements RecipeProvider {
  async generateRecipes(request: RecipeRequest): Promise<Recipe[]> {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error('Missing OPENAI_API_KEY')
    }

    const prompt = buildPrompt(request)

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        input: [
          { role: 'system', content: prompt.system },
          { role: 'user', content: prompt.user },
        ],
        max_output_tokens: 1200,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`OpenAI error: ${errorText}`)
    }

    const data = await response.json()
    const textOutput =
      data?.output?.[0]?.content?.[0]?.text ||
      data?.output_text ||
      ''

    const parsed = safeJsonParse(textOutput)
    if (!parsed?.recipes?.length) {
      throw new Error('OpenAI returned invalid recipe JSON')
    }

    return parsed.recipes
  }
}
