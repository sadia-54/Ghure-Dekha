'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import {useState} from "react"

type TravelPartnerProps = {
    value: string
    onChange: (value: string) => void
  };

export default function TravelPartner({value, onChange}: TravelPartnerProps) {

    // const [selectedPartner, setSelectedPartner] = useState<string | null>(null);

    const options = [
        { label: "Solo Trip ✈️", description: "A sole traveles in exploration" },
        { label: "Couple Trip 🥂", description: "Travel to have some sweet memories"},
        { label: "Family Trip 🏡", description: "A group of fun loving adventures" },
        { label: "Friends Trip ⛵", description: "A bunch of thrill-seeks" }
    ]


    return(


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

           {options.map((option) => (
               <Card 
               key={option.label}
               onClick={() => onChange(option.label)}
               className={`border-2 cursor-pointer 
                   ${value === option.label
                        ? 'border-green-600 shadow-lg' 
                        : 'border-transparent'
                   }`}
               >
                <CardHeader>
                    <CardTitle>
                        
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <h2 className="font-bold text-xl">{option.label}</h2>
                    <CardDescription>
                        <p>{option.description}</p>
                     </CardDescription>
                </CardContent>
               </Card>

           ))}

               </div>
    
    )


}