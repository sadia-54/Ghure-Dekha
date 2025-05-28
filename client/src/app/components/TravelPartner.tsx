'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function BudgetOptions() {
    return(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <Card className=" border-none">
                <CardHeader>
                    <CardTitle>
                        
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <h2 className="font-bold text-xl">Solo Trip ✈️</h2>
                    <CardDescription>
                        <p>A sole traveles in exploration</p>
                     </CardDescription>
                </CardContent>
               </Card>
        
               
                <Card className="border-none">
                <CardHeader>
                    <CardTitle>
                       
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <h2 className="font-bold text-xl">Couple Trip 🥂</h2>
                    <CardDescription>
                        <p>Travel to have some sweet memories </p>
                     </CardDescription>
                </CardContent>
               </Card>
        
              
                <Card className=" border-none">
                <CardHeader>
                    <CardTitle>
                    
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <h2 className="font-bold text-xl">Family Trip 🏡</h2>
                    <CardDescription>
                        <p>A group of fun loving adventures</p>
                     </CardDescription>
                </CardContent>
               </Card>

                <Card className=" border-none">
                <CardHeader>
                    <CardTitle>
                    
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <h2 className="font-bold text-xl">Friends Trip ⛵</h2>
                    <CardDescription>
                        <p>A bunch of thrill-seeks</p>
                     </CardDescription>
                </CardContent>
               </Card>

               </div>
    
    )


}