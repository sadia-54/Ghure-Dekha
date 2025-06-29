'use client'

export default function InfoSection({ trip }: { trip: any }) {
  const data = trip?.tripData?.travelPlan

  return (
    <div>
      <img
        src="/homepage.jpg"
        alt="Trip Banner"
        className="h-[340px] w-full object-cover rounded-xl"
      />

      <div className="my-5 flex flex-col gap-2">
        <h2 className="font-bold text-2xl text-green-900">{data?.location}</h2>
        <div className="flex gap-5 flex-wrap">
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
            {data?.days} Day{data?.days > 1 ? "s" : ""}
          </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
            Budget: {data?.budget}
          </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
            Type: {data?.travelPartner}
          </h2>
        </div>
      </div>
    </div>
  )
}
