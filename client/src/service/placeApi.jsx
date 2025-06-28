import axios from "axios"

// Nominatim API for place search (Free)
const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search'

// Wikipedia API for photos (Free)
const WIKIPEDIA_API_URL = 'https://en.wikipedia.org/api/rest_v1/page/summary/'

// Unsplash API for backup photos (Free with key)
const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos'
const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

// Search places using Nominatim (replaces Google Places)
export const GetPlaceDetails = async (data) => {
    try {
        const response = await axios.get(NOMINATIM_BASE_URL, {
            params: {
                q: data.textQuery,
                format: 'json',
                limit: 5,
                addressdetails: 1,
                extratags: 1
            }
        })
        
        // Transform to match your expected format
        const places = response.data.map(place => ({
            id: place.place_id,
            displayName: { text: place.display_name },
            photos: [], // Will be filled by photo functions
            geo_coordinates: `${place.lat},${place.lon}`,
            address: place.display_name
        }))
        
        return { data: { places } }
    } catch (error) {
        console.error('Error searching places:', error)
        return { data: { places: [] } }
    }
}

// Get photo from Wikipedia (Free)
const getWikimediaPhoto = async (placeName) => {
    try {
        const response = await axios.get(WIKIPEDIA_API_URL + encodeURIComponent(placeName))
        return response.data.thumbnail?.source || response.data.originalimage?.source || null
    } catch (error) {
        return null
    }
}

// Get photo from Unsplash (Free with key)
const getUnsplashPhoto = async (placeName) => {
    if (!UNSPLASH_ACCESS_KEY) return null
    
    try {
        const response = await axios.get(UNSPLASH_API_URL, {
            params: {
                query: placeName,
                per_page: 1,
                orientation: 'landscape'
            },
            headers: {
                'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
            }
        })
        
        if (response.data.results.length > 0) {
            return response.data.results[0].urls.regular
        }
        return null
    } catch (error) {
        return null
    }
}

// Main function to get photo URL (replaces PHOTO_REF_URL)
export const PHOTO_REF_URL = async (placeName) => {
    // Try Wikipedia first (completely free)
    let photo = await getWikimediaPhoto(placeName)
    
    // If no Wikipedia photo, try Unsplash
    if (!photo) {
        photo = await getUnsplashPhoto(placeName)
    }
    
    return photo
}

// Get first photo for a place
export const getFirstPhotoUrl = async (placeName) => {
    return await PHOTO_REF_URL(placeName)
}

// Get photo for single place (for AI trip planner)
export const getPlacePhoto = async (placeName) => {
    try {
        const photoUrl = await PHOTO_REF_URL(placeName)
        return photoUrl
    } catch (error) {
        console.error(`Error fetching photo for ${placeName}:`, error)
        return null
    }
}

// Batch function for multiple places from AI response
export const getMultiplePlacePhotos = async (placeNames) => {
    const results = {}
    
    for (const placeName of placeNames) {
        results[placeName] = await getPlacePhoto(placeName)
        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    return results
}

// Helper function to add photos to AI trip data
export const addPhotosToTripData = async (tripData) => {
    // Add photos to hotels
    for (let hotel of tripData.hotel_options) {
        hotel.image_url = await getPlacePhoto(hotel.name)
    }
    
    // Add photos to itinerary places
    for (let day of tripData.itinerary) {
        for (let place of day.plan) {
            place.image_url = await getPlacePhoto(place.place)
        }
    }
    
    return tripData
}