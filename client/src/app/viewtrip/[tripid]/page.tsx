'use client'

import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/service/firebaseconfig" 


export default function Page() {
    
    const {tripid} = useParams()
    const [trip, setTrip] = useState<any>([])

    // to get trip info from firebase
    const GetTripData = async () => {
        try {
          const tripRef = doc(db, "trips", tripid as string)
          const tripSnap = await getDoc(tripRef)
      
          if (tripSnap.exists()) {
            console.log("Trip from Firebase:", tripSnap.data())
            setTrip(tripSnap.data())
          } else {
            console.log("No such trip!")
          }
        } catch (err) {
          console.error("Error fetching trip:", err)
        }
      }
      

    // to show data from localStorage if tripid is not present
    useEffect(() => {
        if (tripid) {
          GetTripData()
        } else {
          const storedTrip = localStorage.getItem("tripData")
          if (storedTrip) {
            const parsedTrip = JSON.parse(storedTrip)
            console.log("Trip Loaded from localStorage:", parsedTrip)
            setTrip(parsedTrip)
          } else {
            console.log("No trip data found")
          }
        }
      }, [tripid])
      

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