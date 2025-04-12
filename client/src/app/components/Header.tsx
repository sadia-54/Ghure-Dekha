"use client"

const Header = () => {
  return (
    <div className="mb-[-15px] container relative w-[100%] h-[300px] bg-cover bg-center bg-[url('/homepage.jpg')]">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
        <div className="absolute flex flex-col items-center gap-[1.5vw] max-w-[100%] pt-[50px] left-[13vw]">
            <p className="ml-[140px] mt-[50px] font-bold text-center text-white text-[max(3vw,10px)] leading-tight"> 
            Discover The Beauty of Bangladesh <br/>with Ghure Dekha!!!
         </p>
        </div>
    </div>
  )
}

export default Header