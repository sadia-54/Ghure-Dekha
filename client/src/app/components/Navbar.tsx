"use client"
import Link from 'next/link'
import {useRouter} from "next/navigation"
import { Button } from '@/components/ui/button'

const Navbar = () => {
  return (
    <div className="py-2 px-5 flex justify-between items-center bg-black text-white mx-[10px]">
        {/* navbar left */}
        <Link href="/">
        <img src="logo.png" alt="logo"
        className='relative h-[60px] w-[120px] cursor-pointer ' />
        </Link>

        {/* navbar right */}
        <Button variant='loginButton' size='lg'>
            Login
        </Button>

    </div>
  )
}

export default Navbar