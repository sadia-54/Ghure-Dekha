import {
  Card,
  CardContent,
  CardDescription
} from "@/components/ui/card"

const WhyChooseUs = () => {
  return (
     <div className="px-6 pb-10" >
           <h2 className="my-4 px-2 font-bold text-xl ">Why Choose Ghure Dekha?</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
            {/* Tips */}
           <Card className="bg-[#D3D3D3] border-none">
            <CardContent>
                <h2 className="font-bold">Cost-Saving Tips</h2>
                <CardDescription>
                    <p>Save money with our insider tips and advice.</p>
                 </CardDescription>
            </CardContent>
           </Card>
    
           {/* Tools */}
            <Card className="bg-[#D3D3D3] border-none">
            <CardContent>
                <h2 className="font-bold">Trip Management Tools</h2>
                <CardDescription>
                    <p>Easily manage your tips with our comprehensive tools.</p>
                 </CardDescription>
            </CardContent>
           </Card>
            
           </div>
    
        </div>
  )
}

export default WhyChooseUs