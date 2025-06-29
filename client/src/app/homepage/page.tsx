"use client"

import SelectLocation from "../components/SelectLocation";
import { Input } from "@/components/ui/input";
import BudgetOptions from "../components/BudgetOptions";
import TravelPartner from "../components/TravelPartner";
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import {useState} from 'react'
import React from "react";
import { chatSession } from "@/service/model";
import { useSession, signIn } from "next-auth/react"



export default function page(){

  const router = useRouter()
  const { data: session, status } = useSession()

  const user = session?.user


  // state for form fields
  const [location, setLocation] = useState("")
  const [days, setDays] = useState(0)
  const [budget, setBudget] = useState("")
  const [travelPartner, setTravelPartner] = useState("")
  const [error, setError] = useState("")

  const handleNavigation = async () => {
    if (!user) {
      signIn('google')
      return
    }
  
    if (!location || !days || !budget || !travelPartner) {
      setError("Please fill in all fields")
      return
    }
  
    const prompt = `Generate Travel Plan for Location : {location}, for {days} Days for {travelPartner} with a {budget} budget ,Give me a Hotels options list with Hotel Name, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with place Name, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {days} days with each day plan with best time to visit in JSON format Give me hotel options and itinerary.
Return the response in this JSON structure:
{
  "travelPlan": {
    "location": "{location}",
    "days": {days},
    "budget": "{budget}",
    "travelPartner": "{travelPartner}",
    "hotelsOptions": [
      {
        "hotelName": "Hotel ABC",
        "hotelAddress": "Address",
        "pricePerNight": "BDT 3000 - 4000",
        "hotelImageUrl": "https://...",
        "geoCoordinates": {
          "latitude": 0.0,
          "longitude": 0.0
        },
        "rating": 4.5,
        "description": "Hotel description"
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "dayPlan": "Brief description of the day's plan (e.g., 'Explore beaches and nearby markets')",
        "plan": [
          {
            "placeName": "Place name",
            "placeDetails": "Description of the place",
            "placeImageUrl": "https://...",
            "geoCoordinates": {
              "latitude": 0.0,
              "longitude": 0.0
            },
            "ticketPricing": "BDT 100",
            "rating": 4.5,
            "timeToTravel": "Morning (9 AM - 12 PM)",
            "bestTimeToVisit": "Morning"
          }
        ]
      }
    ]
  }
}
Use the keys:
- hotelsOptions (not hotelList, hotels, hotelOptions)
- itinerary should be an array of days
- Each day must include day, dayPlan, and plan array
- Each activity in plan must have the keys: placeName, placeDetails, placeImageUrl, geoCoordinates, ticketPricing, rating, timeToTravel, bestTimeToVisit
Return only this JSON. Do not wrap it in markdown or add explanations.
`;
  
    const FINAL_PROMPT = prompt
      .replace(`{location}`, location)
      .replace(`{days}`, days.toString())
      .replace(`{travelPartner}`, travelPartner)
      .replace(`{budget}`, budget)
      .replace(`{days}`, days.toString())
  
    console.log(FINAL_PROMPT)
  
    localStorage.setItem("userSelection", JSON.stringify({
      location,
      days,
      budget,
      travelPartner,
      prompt: FINAL_PROMPT
    }))
  
    const result = await chatSession.sendMessage(FINAL_PROMPT)
    const aiResponseText = await result?.response?.text()
    console.log("Gemini response:", aiResponseText)
  
    // ✅ Save trip to Firebase
    const res = await fetch("/api/trips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: user.email,
        tripData: JSON.parse(aiResponseText),
      }),
    })

    if (!res.ok) {
      setError("Failed to save trip. Please try again.");
      return;
    }
  
    const data = await res.json()
    router.push(`/viewtrip/${data.tripId}`)
  }
  
    // setError("")

    // router.push('/viewtrip/:tripid')

  return (
    <div className="flex flex-col my-[60px] mx-[20%]">

      <h1 className="text-3xl font-bold text-green-900 text-left">
        Tell us your travel details 🏕️🌴

      </h1>

      <p className="text-green-900 text-left text-lg mt-4">
      Provide us with a few details, and our trip planner will create a personalized itinerary tailored to your interests and schedule.
      </p>

      <h3 className="text-xl font-semibold text-green-900 mt-18 mb-2">
        Select your travel destination
      </h3>

      <SelectLocation value={location} onChange={setLocation} />

      <h3 className="text-xl font-semibold text-green-900 mt-12 mb-2">
        How many days do you plan to travel?
      </h3>

      <Input
        type="number"
        placeholder="Enter number of days"
        className="w-full mb-2 text-green-900"
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
        min={1}
      />

      <h3 className="text-xl font-semibold text-green-900 mt-12 mb-2">
        What's your budget for the trip? 💰
      </h3>

      <BudgetOptions value={budget} onChange={setBudget} />

      <h3 className="text-xl font-semibold text-green-900 mt-12 mb-2">
        Whom are you traveling with? 👨‍👩‍👧‍👦
      </h3>

      <TravelPartner value={travelPartner} onChange={setTravelPartner} />


      <div className="">
      <Button  onClick={handleNavigation} 
      className=' mt-15 w-40 px-[35px] rounded-2xl transform transition duration-300 ease-in-out hover:scale-[1.05]'

        variant='loginButton' size='default'>
            Create Trip
        </Button>

        {error && <p className="text-red-500 mt-2">{error}</p>}


        </div>

    

    </div>
  )}