import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Explore from "./components/Explore";
import WhyChooseUs from "./components/WhyChooseUs";


export default function Home() {
  return (
    <div className="">
      <Navbar/>
      <HeroSection/>
      <Explore/>
      <WhyChooseUs/>
      <Footer/>
    </div>
  );
}
