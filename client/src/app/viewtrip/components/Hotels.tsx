'use client'

export default function Hotels({ trip }: { trip: any }) {
  const hotels = trip?.tripData?.travelPlan?.hotelsOptions || []

  return (
    <div>
      <h2 className="font-bold text-xl mt-5 mb-4 text-green-900">
        Hotel Recommendations
      </h2>

      {hotels.length === 0 ? (
        <p className="text-gray-600">No hotels found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {hotels.map((hotel: any, index: number) => (
            <div
              key={index}
              className=" p-3 rounded-xl shadow-lg bg-white transition hover:scale-[1.02]"
            >
              <img
                src={hotel.hotelImageUrl}
                alt={hotel.hotelName}
                className="w-full h-30 object-cover rounded-lg"
                onError={(e) => {
                    e.currentTarget.src = "/hotels.jpg"; // Fallback image
                  }}
                />
              <h3 className="mt-2 text-lg font-semibold text-green-900">
                {hotel.hotelName}
              </h3>
              <p className="text-sm text-gray-700">{hotel.hotelAddress}</p>
              <p className="text-sm mt-1">💸 {hotel.price}</p>
              <p className="text-sm">⭐ {hotel.rating}</p>
              <p className="text-sm mt-2 text-gray-600">{hotel.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
