"use client"

import SpotRecommendation from "@/app/components/SpotRecommendation"
import Header from "@/app/components/Header"
import TravelSearchBar from "../components/TravelSearchBar"

const page = () => {
  return (
    <>
    <Header/>
    <TravelSearchBar/>
    <SpotRecommendation/>
    </>
  )
}

export default page