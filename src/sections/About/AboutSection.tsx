import AboutExpertise from './AboutExpertise'
import AboutInspiration from './AboutInspiration'
import AboutStory from './AboutStory'

function AboutSection() {
  return (
    <section id="about" aria-label="About Riya Jethani">
      <AboutStory />
      <AboutExpertise />
      <AboutInspiration />
    </section>
  )
}

export default AboutSection
