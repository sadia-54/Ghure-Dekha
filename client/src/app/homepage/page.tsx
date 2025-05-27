"use client"

import SelectLocation from "../components/SelectLocation";

export default function page(){
  return (
    <div className="flex flex-col h-screen my-[60px] mx-[20%]">

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
    

    </div>
  )}