"use client"
import Link from 'next/link'
import {useState} from 'react'
import AuthModal from './AuthModal'
import { Button } from '@/components/ui/button'

const Navbar = () => {

  const [showAuthModal, setShowAuthModal] = useState(false)

  return (
    <div className="px-5  flex justify-between items-center bg-green-100 text-black mx-0">
        {/* navbar left */}
        <Link href="/">
        <h1 className='logo text-2xl font-bold mt-[18px] text-green-800  relative h-[60px] w-[200px] cursor-pointer ' >
        পথিক
        </h1>
        </Link>

        {/* navbar right */}
        <Button className='px-[35px] rounded-2xl transform transition duration-300 ease-in-out hover:scale-[1.05]'
        onClick={() => setShowAuthModal(true)}
        variant='loginButton' size='default'>
            Login
        </Button>
        <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />

    </div>
  )
}

export default Navbar