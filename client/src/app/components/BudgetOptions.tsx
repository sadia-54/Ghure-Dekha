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
                    <h2 className="font-bold text-xl">Cheap 💵</h2>
                    <CardDescription>
                        <p>Stay conscious of costs</p>
                     </CardDescription>
                </CardContent>
               </Card>
        
               
                <Card className="border-none">
                <CardHeader>
                    <CardTitle>
                       
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <h2 className="font-bold text-xl">Moderate 💰</h2>
                    <CardDescription>
                        <p>Keep cost on the average side </p>
                     </CardDescription>
                </CardContent>
               </Card>
        
              
                <Card className=" border-none">
                <CardHeader>
                    <CardTitle>
                    
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <h2 className="font-bold text-xl">Luxury 💸</h2>
                    <CardDescription>
                        <p>No worry about cost</p>
                     </CardDescription>
                </CardContent>
               </Card>

               </div>
    
    )


}