"use client"

const HeroSection = () => {
  return (
    <div className="container relative w-[100%] h-[300px] bg-cover bg-center bg-[url('/hero.jpg')]">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
        <div className="absolute flex flex-col items-center gap-[1.5vw] max-w-[100%] pt-[50px] left-[13vw]">
            <p className="mt-[30px] font-bold text-white text-[max(3vw,10px)] leading-tight"> 
            Plan Your Budget Friendly Trip with Ghure Dekha
         </p>
         <p className="mt-[10px] text-white font-semibold">
            Discover amazing destinations in Bangladesh!
         </p>
        </div>
    </div>
  )
}

export default HeroSection