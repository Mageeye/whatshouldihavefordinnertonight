export interface Restaurant {
  id: string
  name: string
  cuisine: string
  rating: number
  priceRange: string
  distance: string
  address: string
  phone?: string
  imageUrl?: string
  description?: string
}

export interface RestaurantSearchRequest {
  zipCode: string
  mood?: string
  dietaryNeeds?: string[]
  filters?: {
    priceRange?: string[]
    cuisine?: string[]
    rating?: number
  }
}

export interface RestaurantProvider {
  searchRestaurants(request: RestaurantSearchRequest): Promise<Restaurant[]>
}
