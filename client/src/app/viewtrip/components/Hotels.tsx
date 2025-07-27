'use client'

import Image from 'next/image';
import { Trip } from '@/types/travel'

export default function Hotels({ trip }: { trip: Trip }) {
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
              <Image
                 src={
                    hotel.hotelImageUrl?.startsWith("http") && !hotel.hotelImageUrl.includes("example.com")
                      ? hotel.hotelImageUrl
                      : "/hotels.jpg"
                  }
                alt={hotel.hotelName}
                className="w-full h-30 object-cover rounded-lg"
                width={1200}
                height={120}
          
                />
              <h3 className="mt-2 text-lg font-semibold text-green-900">
                {hotel.hotelName}
              </h3>
              <p className="text-sm text-gray-700">{hotel.hotelAddress}</p>
              <p className="text-sm font-semibold mt-1">💸 {hotel.pricePerNight}</p>
              <p className="text-sm font-semibold">⭐ {hotel.rating}</p>
              <p className="text-sm mt-2 text-gray-600">{hotel.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
