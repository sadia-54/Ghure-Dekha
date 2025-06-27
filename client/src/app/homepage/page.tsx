"use client"

import SelectLocation from "../components/SelectLocation";
import { Input } from "@/components/ui/input";
import BudgetOptions from "../components/BudgetOptions";
import TravelPartner from "../components/TravelPartner";
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import {useState} from 'react'
import React from "react";

export default function page(){

  const router = useRouter()

  // state for form fields
  const [location, setLocation] = useState("")
  const [days, setDays] = useState(0)
  const [budget, setBudget] = useState("")
  const [travelPartner, setTravelPartner] = useState("")
  const [error, setError] = useState("")

  const handleNavigation = () => {

    if(!location || !days || !budget || ! travelPartner) {
      setError("Please fill in all fields")
      return
    }

    // for dummy data
    const userSelection = {
      userSelection:{
        location,
        days,
        budget,
        travelPartner
      },
    }

    localStorage.setItem('tripData', JSON.stringify({userSelection}))

    setError("")

    router.push('/viewtrip/:tripid')
  }

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