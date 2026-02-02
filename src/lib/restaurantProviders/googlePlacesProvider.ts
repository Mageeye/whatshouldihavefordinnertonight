import {
  Restaurant,
  RestaurantProvider,
  RestaurantSearchRequest,
} from './provider'

type PlacesTextSearchResponse = {
  places?: Array<{
    id: string
    displayName?: { text?: string }
    rating?: number
    priceLevel?:
      | 'PRICE_LEVEL_UNSPECIFIED'
      | 'PRICE_LEVEL_FREE'
      | 'PRICE_LEVEL_INEXPENSIVE'
      | 'PRICE_LEVEL_MODERATE'
      | 'PRICE_LEVEL_EXPENSIVE'
      | 'PRICE_LEVEL_VERY_EXPENSIVE'
    formattedAddress?: string
    types?: string[]
  }>
}

const PRICE_LEVEL_MAP: Record<string, string> = {
  PRICE_LEVEL_FREE: '$',
  PRICE_LEVEL_INEXPENSIVE: '$',
  PRICE_LEVEL_MODERATE: '$$',
  PRICE_LEVEL_EXPENSIVE: '$$$',
  PRICE_LEVEL_VERY_EXPENSIVE: '$$$$',
  PRICE_LEVEL_UNSPECIFIED: '$$',
}

const titleize = (value: string) =>
  value
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())

export class GooglePlacesProvider implements RestaurantProvider {
  async searchRestaurants(
    request: RestaurantSearchRequest
  ): Promise<Restaurant[]> {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY
    if (!apiKey) {
      throw new Error('Missing GOOGLE_PLACES_API_KEY')
    }

    const moodPart = request.mood ? `${request.mood} ` : ''
    const query = `${moodPart}restaurants in ${request.zipCode}`
    const response = await fetch(
      'https://places.googleapis.com/v1/places:searchText',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask':
            'places.id,places.displayName,places.rating,places.priceLevel,places.formattedAddress,places.types',
        },
        body: JSON.stringify({
          textQuery: query,
          languageCode: 'en',
        }),
      }
    )
    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Google Places error: ${text}`)
    }

    const data = (await response.json()) as PlacesTextSearchResponse

    let results =
      data.places?.map((place) => {
        const type = place.types?.[0]
        const cuisine = type ? titleize(type) : 'Restaurant'
        const priceRange = place.priceLevel
          ? PRICE_LEVEL_MAP[place.priceLevel] || '$$'
          : '$$'

        return {
          id: place.id,
          name: place.displayName?.text || 'Restaurant',
          cuisine,
          rating: place.rating ?? 0,
          priceRange,
          distance: 'N/A',
          address: place.formattedAddress || '',
          description: '',
        }
      }) || []

    if (request.filters?.priceRange?.length) {
      results = results.filter((r) =>
        request.filters?.priceRange?.includes(r.priceRange)
      )
    }

    if (request.filters?.rating) {
      results = results.filter((r) => r.rating >= request.filters!.rating!)
    }

    if (request.filters?.cuisine?.length) {
      const lower = request.filters.cuisine.map((c) => c.toLowerCase())
      results = results.filter((r) => lower.includes(r.cuisine.toLowerCase()))
    }

    return results.slice(0, 8)
  }
}
