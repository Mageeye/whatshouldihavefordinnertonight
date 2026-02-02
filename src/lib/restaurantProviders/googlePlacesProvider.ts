import {
  Restaurant,
  RestaurantProvider,
  RestaurantSearchRequest,
} from './provider'

type PlacesTextSearchResponse = {
  results?: Array<{
    place_id: string
    name: string
    rating?: number
    price_level?: number
    formatted_address?: string
    types?: string[]
    photos?: Array<{ photo_reference: string }>
  }>
  status: string
  error_message?: string
}

const PRICE_LEVEL_MAP: Record<number, string> = {
  0: '$',
  1: '$',
  2: '$$',
  3: '$$$',
  4: '$$$$',
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
    const url = new URL(
      'https://maps.googleapis.com/maps/api/place/textsearch/json'
    )
    url.searchParams.set('query', query)
    url.searchParams.set('key', apiKey)

    const response = await fetch(url.toString())
    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Google Places error: ${text}`)
    }

    const data = (await response.json()) as PlacesTextSearchResponse
    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      throw new Error(
        data.error_message ||
          `Google Places error: ${data.status || 'UNKNOWN'}`
      )
    }

    let results =
      data.results?.map((place) => {
        const type = place.types?.[0]
        const cuisine = type ? titleize(type) : 'Restaurant'
        const priceRange =
          place.price_level !== undefined
            ? PRICE_LEVEL_MAP[place.price_level] || '$$'
            : '$$'

        return {
          id: place.place_id,
          name: place.name,
          cuisine,
          rating: place.rating ?? 0,
          priceRange,
          distance: 'N/A',
          address: place.formatted_address || '',
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

    return results.slice(0, 10)
  }
}
