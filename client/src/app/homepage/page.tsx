"use client"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const page = () => {
  return (
    <div className="flex flex-col h-screen my-[60px] mx-[20%]">

      <h1 className="text-3xl font-bold text-green-900 text-left">
        Tell us your travel details 🏕️🌴

      </h1>

      <p className="text-green-900 text-left text-lg mt-4">
      Provide us with a few details, and our trip planner will create a personalized itinerary tailored to your interests and schedule.
      </p>

      <h3 className="text-xl font-semibold text-green-900 mt-18">
        Select your travel destination
      </h3>
      <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Cox's Bazar">Cox's Bazar</SelectItem>
        <SelectItem value="Saint Martin">Saint Martin</SelectItem>
        <SelectItem value="Chittagong">Chittagong</SelectItem>
        <SelectItem value="Bandorban">Bandorban</SelectItem>
        <SelectItem value="Rangamati">Rangamati</SelectItem>
        <SelectItem value="Habiganj">Habiganj</SelectItem>
        <SelectItem value="Sreemangal">Sreemangal</SelectItem>
        <SelectItem value="Moulvi Bazar">Moulvi Bazar</SelectItem>
        <SelectItem value="Sunamganj">Sunamganj</SelectItem>
        <SelectItem value="Cumilla">Cumilla</SelectItem>
        <SelectItem value="Dhaka">Dhaka</SelectItem>
      </SelectContent>
    </Select>

    </div>
  )
}

export default page