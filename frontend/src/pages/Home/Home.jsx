import React, { useRef } from 'react'
import HeroSection from '../../components/heroSection/HeroSection'
import PromoBanner from '../../components/banner/PromoBanner'
import './Home.css'
import BestSeller from '../../components/BestSeller/BestSeller'
import ReviewSection from '../../components/ReviewSection/ReviewSection'


const Home = () => {
  // Use a ref to target the scrollable track directly
  const carouselRef = useRef(null)

  // Explicit scroll handler function
  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 320 // Matches card width + gap spacing perfectly
      if (direction === 'left') {
        carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      } else {
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }
  }

  return (
    <div className="home-page">
      <HeroSection />
      <PromoBanner />
      <BestSeller/>
      <ReviewSection/>
      
    </div>
  )
}

export default Home