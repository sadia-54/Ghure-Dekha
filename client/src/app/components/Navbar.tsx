"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

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
          localStorage.setItem("user", JSON.stringify(data));
        })
        .catch((err) => console.error("Failed to fetch user info:", err));
    }
  }, [session]);

  return (
    <div className="px-5 flex justify-between items-center bg-green-100 text-black mx-0  h-[60px]">
      {/* Left side: Logo + My Trip button */}
      <div className="flex items-center gap-4">
        <Link href="/">
          <h1 className="logo text-2xl font-bold text-green-800 cursor-pointer">
            ঘুরে দেখা
          </h1>
        </Link>

      </div>

      {/* Right side: Login or Profile */}
      <div className="relative flex items-center gap-4">
      <Button
            className="px-[35px] rounded-2xl transform transition duration-300 ease-in-out hover:scale-[1.05]"
           
            variant="loginButton"
            size="default"
          >
            My Trip
          </Button>
        {session ? (
          <>
            {/* User Profile Image */}
            <img
              src={session.user?.image || "/default-profile.png"}
              alt={session.user?.name || "User Profile"}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-green-700"
              title={session.user?.name || ""}
            />

            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-25 w-32 bg-white text-green-900 rounded shadow-lg z-50"
              >
                <button
                  onClick={() => signOut()}
                  className="w-full px-4 py-2 hover:bg-gray-200 rounded text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <Button
            className="px-[35px] rounded-2xl transform transition duration-300 ease-in-out hover:scale-[1.05]"
            onClick={() => signIn("google")} 
            variant="loginButton"
            size="default"
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
