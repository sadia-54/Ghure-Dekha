'use client'

import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";

export default function Page() {
    
    const {tripid} = useParams()
    const [trip, setTrip] = useState<any>([])

    // to get trip info from firebase
    const GetTripData = async() => {

    }

    // to show dummy data
    useEffect(() => {
        const storedTrip = localStorage.getItem('tripData')
        
        if(storedTrip){
            const parsedTrip = JSON.parse(storedTrip)
            console.log("Trip Loaded:", parsedTrip)
            setTrip(parsedTrip)
        } else{
            console.log("No trip data")
        }
    }, [])

    return(
        <div className="p-10 md:px-20 lg:px-44 xl:px-56 pt-0">
            {/* Information Section  */}
            <InfoSection trip={trip} />

            {/* Recommended Hotels  */}
            <Hotels trip={trip} />

            {/* Daily Schedule  */}
        </div>
    )

}