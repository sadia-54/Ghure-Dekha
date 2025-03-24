import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {Event} from "@mui/icons-material"
import { DirectionsBus } from "@mui/icons-material";
import { Lock } from "@mui/icons-material";
import { HowToReg } from "@mui/icons-material";


const Explore = () => {
  return (
    <div className="px-6 py-10 bg-gray-100" >
       <h2 className="my-4 px-2 font-bold text-xl ">Explore Our Services</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Trip planning */}
       <Card className="bg-[#D3D3D3] border-none">
        <CardHeader>
            <CardTitle>
                <Event/>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <h2 className="font-bold">Trip Planning</h2>
            <CardDescription>
                <p>Plan your perfect trip with our expert</p>
             </CardDescription>
        </CardContent>
       </Card>

       {/* Transport booking */}
        <Card className="bg-[#D3D3D3] border-none">
        <CardHeader>
            <CardTitle>
                <DirectionsBus/>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <h2 className="font-bold">Transport booking</h2>
            <CardDescription>
                <p>Book your transport conveniently through our platform.</p>
             </CardDescription>
        </CardContent>
       </Card>

       {/* Secure payments */}
        <Card className="bg-[#D3D3D3] border-none">
        <CardHeader>
            <CardTitle>
                <Lock/>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <h2 className="font-bold">Secure Payments</h2>
            <CardDescription>
                <p>Pay securely using Bkash, Nagad or Rocket.</p>
             </CardDescription>
        </CardContent>
       </Card>

       {/* Certified guides */}
        <Card className="bg-[#D3D3D3] border-none">
        <CardHeader>
            <CardTitle>
                <HowToReg/>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <h2 className="font-bold">Verified Guides</h2>
            <CardDescription>
                <p>Explore with confidence using our verified guide services.</p>
             </CardDescription>
        </CardContent>
       </Card>
        
       </div>

    </div>
  )
}

export default Explore