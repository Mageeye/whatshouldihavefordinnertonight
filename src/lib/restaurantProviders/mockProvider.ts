import { Restaurant, RestaurantProvider, RestaurantSearchRequest } from './provider'
import { GooglePlacesProvider } from './googlePlacesProvider'

export class MockRestaurantProvider implements RestaurantProvider {
  async searchRestaurants(request: RestaurantSearchRequest): Promise<Restaurant[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockRestaurants: Restaurant[] = [
      {
        id: 'rest-1',
        name: 'The Local Bistro',
        cuisine: 'American',
        rating: 4.5,
        priceRange: '$$',
        distance: '0.8 mi',
        address: '123 Main St',
        phone: '(555) 123-4567',
        description: 'Cozy neighborhood bistro serving comfort food classics.',
      },
      {
        id: 'rest-2',
        name: 'Sakura Sushi',
        cuisine: 'Japanese',
        rating: 4.8,
        priceRange: '$$$',
        distance: '1.2 mi',
        address: '456 Oak Ave',
        phone: '(555) 234-5678',
        description: 'Fresh sushi and traditional Japanese dishes.',
      },
      {
        id: 'rest-3',
        name: 'Mama Mia Pizzeria',
        cuisine: 'Italian',
        rating: 4.3,
        priceRange: '$',
        distance: '0.5 mi',
        address: '789 Elm St',
        phone: '(555) 345-6789',
        description: 'Authentic Italian pizza and pasta.',
      },
      {
        id: 'rest-4',
        name: 'Green Garden Cafe',
        cuisine: 'Vegetarian',
        rating: 4.6,
        priceRange: '$$',
        distance: '1.5 mi',
        address: '321 Pine Rd',
        phone: '(555) 456-7890',
        description: 'Plant-based dishes with fresh, local ingredients.',
      },
      {
        id: 'rest-5',
        name: 'Taco Fiesta',
        cuisine: 'Mexican',
        rating: 4.4,
        priceRange: '$',
        distance: '0.9 mi',
        address: '654 Maple Dr',
        phone: '(555) 567-8901',
        description: 'Authentic Mexican street tacos and burritos.',
      },
    ]

    // Filter by mood/cuisine if provided
    let filtered = mockRestaurants
    if (request.mood) {
      const moodMap: Record<string, string> = {
        italian: 'Italian',
        japanese: 'Japanese',
        mexican: 'Mexican',
        american: 'American',
        vegetarian: 'Vegetarian',
      }
      const cuisine = moodMap[request.mood.toLowerCase()]
      if (cuisine) {
        filtered = filtered.filter((r) => r.cuisine === cuisine)
      }
    }

    return filtered.slice(0, 5)
  }
}

export const getRestaurantProvider = (): RestaurantProvider => {
  const provider = process.env.RESTAURANT_API_PROVIDER || 'mock'
  
  switch (provider) {
    case 'google':
      return new GooglePlacesProvider()
    case 'mock':
      return new MockRestaurantProvider()
    default:
      return new MockRestaurantProvider()
  }
}
