"use client"
import Link from 'next/link'
import {useState} from 'react'
import AuthModal from './AuthModal'
import { Button } from '@/components/ui/button'

const Navbar = () => {

  const [showAuthModal, setShowAuthModal] = useState(false)

  return (
    <div className="px-5 py-3 flex justify-between items-center bg-black text-white mx-0">
        {/* navbar left */}
        <Link href="/">
        <img src="logo.png" alt="logo"
        className='relative h-[60px] w-[120px] cursor-pointer ' />
        </Link>

        {/* navbar right */}
        <Button className='px-[35px] rounded-lg'
        onClick={() => setShowAuthModal(true)}
        variant='loginButton' size='default'>
            Login
        </Button>
        <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />

    </div>
  )
}

export default Navbar