// src/pages/Home.jsx
import AboutSection from '../component/AboutSection'
import BrowseByCategory from '../component/BrowseByCategory'
import Hero from '../component/Hero'
import TopDeals from '../component/TopDeals'

const Home = () => {
  return (
    <div>
      <Hero />
      <BrowseByCategory />
      <TopDeals />
      <AboutSection />
      {/* You can add more sections like FeaturedProducts or Testimonials below */}
    </div>
  )
}

export default Home
