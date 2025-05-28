'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { useState } from "react"

type BudgetOptionsProps = {
    value: string
    onChange: (value: string) => void
  };


export default function BudgetOptions({value, onChange}: BudgetOptionsProps) {

    // const [selectedBudget, setSelectedBudget] = useState<string | null>(null);

    const options = [
        { label: "Cheap 💵", description: "Stay conscious of costs" },
        { label: "Moderate 💰", description: "Keep cost on the average side"},
        { label: "Luxury 💸", description: "No worry about cost" }
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