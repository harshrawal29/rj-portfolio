import { useState } from 'react'
import AnimatedBackground from '../components/AnimatedBackground'
import Loader from '../components/Loader'
import { useLenisScroll } from '../hooks/useLenisScroll'
import AboutSection from '../sections/About/AboutSection'
import HeroSection from '../sections/HeroSection'
import StatementSection from '../sections/StatementSection'
import SelectedWorksShowcase from '../sections/SelectedWorksShowcase'
import FooterExperience from '../sections/FooterExperience'

function HomePage() {
  useLenisScroll()
  const [loaderComplete, setLoaderComplete] = useState(() => {
    return sessionStorage.getItem('hasSeenLoader') === 'true'
  })

  const handleLoaderComplete = () => {
    sessionStorage.setItem('hasSeenLoader', 'true')
    setLoaderComplete(true)
  }

  return (
    <>
      {!loaderComplete ? <Loader onComplete={handleLoaderComplete} /> : null}
      <AnimatedBackground />
      <main>
        <HeroSection loaderComplete={loaderComplete} />
        <SelectedWorksShowcase />
        <AboutSection />
        <StatementSection />
        <FooterExperience />
      </main>
    </>
  )
}

export default HomePage
