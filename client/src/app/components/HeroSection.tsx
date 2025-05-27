"use client";

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="hero-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-0"></div>

      {/* Text Content */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-[1.5vw] max-w-full pt-[50px] z-10">
        <p className="mt-[90px] font-bold text-center text-white text-[max(3vw,10px)] leading-tight">
          Discover The Beauty of Bangladesh with Potheek!!!
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
