"use client"

import SelectLocation from "../components/SelectLocation";
import { Input } from "@/components/ui/input";
import BudgetOptions from "../components/BudgetOptions";
import TravelPartner from "../components/TravelPartner";
import { Button } from '@/components/ui/button'
import React from "react";

export default function page(){
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

      <SelectLocation />

      <h3 className="text-xl font-semibold text-green-900 mt-12 mb-2">
        How many days do you plan to travel?
      </h3>

      <Input
        type="number"
        placeholder="Enter number of days"
        className="w-full mb-2 text-green-900"
      />

      <h3 className="text-xl font-semibold text-green-900 mt-12 mb-2">
        What's your budget for the trip? 💰
      </h3>

      <BudgetOptions />

      <h3 className="text-xl font-semibold text-green-900 mt-12 mb-2">
        Whom are you traveling with? 👨‍👩‍👧‍👦
      </h3>
      <TravelPartner />


      <div className="">
      <Button className=' mt-15 w-40 px-[35px] rounded-2xl transform transition duration-300 ease-in-out hover:scale-[1.05]'

        variant='loginButton' size='default'>
            Create Trip
        </Button>

        </div>

    

    </div>
  )}