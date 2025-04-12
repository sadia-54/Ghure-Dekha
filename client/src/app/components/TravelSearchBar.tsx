'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import * as React from "react"

export default function TravelSearchBar() {
  const [departureDate, setDepartureDate] = React.useState<Date>()
  const [returnDate, setReturnDate] = React.useState<Date>()

  return (
    <div className="ml-[170px] w-full max-w-4xl bg-neutral-300 shadow-md rounded-4xl px-6 py-4 flex flex-col md:flex-row items-center gap-4 mt-4">
      <Input placeholder="Destination" className="w-full md:w-[150px]" />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full md:w-[150px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {departureDate ? format(departureDate, "PPP") : "Select departure"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-gray-100">
          <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full md:w-[150px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {returnDate ? format(returnDate, "PPP") : "Select return"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-gray-100">
          <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} />
        </PopoverContent>
      </Popover>

      <Input placeholder="Travelers" type="number" className="w-full md:w-[100px]" />

      <Button className="bg-black text-white hover:bg-gray-800">
        →
      </Button>
    </div>
  )
}
