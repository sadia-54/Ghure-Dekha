"use client"
import Link from "next/link"
import { useState } from "react"
import AuthModal from "./AuthModal"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

const Navbar = () => {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.accessToken) {
      console.log("Access Token:", session.accessToken);
  
      fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("User info:", data);
          // Save to localStorage
          localStorage.setItem("user", JSON.stringify(data));
        })
        .catch((err) => console.error("Failed to fetch user info:", err));
    }
  }, [session]);

  return (
    <div className="px-5 flex justify-between items-center bg-green-100 text-black mx-0">
      {/* navbar left */}
      <Link href="/">
        <h1 className="logo text-2xl font-bold mt-[18px] text-green-800 relative h-[60px] w-[200px] cursor-pointer">
          ঘুরে দেখা
        </h1>
      </Link>

      {/* navbar right */}
      {session ? (
        <>
          <p className="mr-4">Hello, {session.user?.name}</p>
          <Button
            className="px-[35px] rounded-2xl transform transition duration-300 ease-in-out hover:scale-[1.05]"
            onClick={() => setShowAuthModal(true)}
            variant="loginButton"
            size="default"
          >
            Account
          </Button>
        </>
      ) : (
        <Button
          className="px-[35px] rounded-2xl transform transition duration-300 ease-in-out hover:scale-[1.05]"
          onClick={() => setShowAuthModal(true)}
          variant="loginButton"
          size="default"
        >
          Login
        </Button>
      )}

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </div>
  )
}

export default Navbar
