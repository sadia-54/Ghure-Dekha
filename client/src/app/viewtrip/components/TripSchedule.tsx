'use client'

export default function TripSchedule({ trip }: { trip: any }) {
  const itinerary = trip?.tripData?.travelPlan?.itinerary || []

  return (
    <div>
      <h2 className="font-bold text-xl mt-10 mb-4 text-green-900">
        Daily Travel Schedule 🗓️
      </h2>

      {itinerary.length === 0 ? (
        <p className="text-gray-600">No itinerary found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {itinerary.map((day: any, index: number) => {
            const activities = day.plan || day.activities || []

            return (
              <div key={index} className="mt-4 bg-white mb-5">
                <h3 className="font-semibold text-green-900 mb-2">
                 Day {day.day} <br/> {day.dayPlan}
                </h3>

                <div className="grid md:grid-cols-3 gap-4">
                  {activities.map((activity: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-gray-50 hover:bg-white transition hover:scale-[1.02] shadow-md"
                    >
                      <img
                        src={activity.placeImageUrl || "/spots.jpg"}
                        alt={activity.placeName}
                        className="w-full h-40 object-cover rounded-md mb-2"
                        onError={(e) => {
                          e.currentTarget.src = "/spots.jpg"
                        }}
                      />
                      <h4 className="font-semibold text-green-900 text-md">
                        {activity.placeName}
                      </h4>
                      <p className="text-sm text-gray-700 mt-1">
                        {activity.placeDetails}
                      </p>
                      <p className="mt-4 text-sm font-bold text-gray-600 mt-1">
                        ⏰ {activity.timeToTravel}
                      </p>
                      <p className="text-sm font-semibold text-gray-600">
                        🎟️ {activity.ticketPricing}
                      </p>
                      <p className="text-sm font-semibold text-gray-600">⭐ {activity.rating}</p>
                      <p className="text-sm font-semibold text-gray-600">
                        🕒 Best Time  <br/> {activity.bestTimeToVisit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
