'use client'

export default function InfoSection({trip}: {trip: any}) {

    return (
        <div>
            <img src="/homepage.jpg" alt=""
            className="h-[340px] w-full object-cover rounded-xl"
            />

            <div className="my-5 flex flex-col gap-2">
                <h2 className="font-bold text-2xl text-green-900">
                    {trip?.userSelection?.location}
                </h2>
                <div className="flex gap-5">
                    <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg"> {trip?.userSelection?.days} Day</h2>
                    <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg">Budget {trip?.userSelection?.budget}</h2>
                    <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg">Type: {trip?.userSelection?.travelPartner}</h2>

                </div>
            </div>

        </div>
    )

}