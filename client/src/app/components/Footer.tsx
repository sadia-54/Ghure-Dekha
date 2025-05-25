"use client"

const Footer = () => {
  return (
    <footer className="py-5 px-5 flex justify-between items-center bg-black text-white mx-0 pb-[70px]">

        {/* footer left */}
        <div className="w-[40%]">
            <img className="h-[60px] w-[120px]"
             src="logo.png" alt="logo" />
             <ul className="space-y-2">
                    <li className="mt-[5px]">Your ultimate travel companion for exploring Bangladesh</li>
                    <li className="mt-[50px]">Ghure Dekha ©</li>
             </ul>
        </div>

        {/* footer right */}
        <div className="container mx-auto flex justify-end">
            <ul className="space-y-2 text-right pr-2">
                <li className="font-bold cursor-pointer hover:text-gray-400">Support</li>
                <li className="cursor-pointer hover:text-gray-400">Help Desk</li>
                <li className="cursor-pointer hover:text-gray-400">Assistance</li>
                <li className="cursor-pointer hover:text-gray-400">User Manual</li>
                <li className="cursor-pointer hover:text-gray-400">Get in Touch</li>
            </ul>
        </div>
    </footer>
  )
}

export default Footer