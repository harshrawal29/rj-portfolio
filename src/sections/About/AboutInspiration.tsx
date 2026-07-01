import { useRef } from 'react'
import { createAboutInspirationAnimation } from '../../animations/aboutAnimations'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const inspirations = [
  { title: 'ART', image: '/images/inspirations/art.png' },
  { title: 'MUSIC', image: '/images/inspirations/music.png' },
  { title: 'READING', image: '/images/inspirations/reading.png' },
  { title: 'TRAVEL', image: '/images/inspirations/travel.png' },
]

function AboutInspiration() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useScrollReveal(sectionRef, createAboutInspirationAnimation)

  return (
    <section
      ref={sectionRef}
      className="relative border-b border-black/10 bg-[#f3eee6] text-[#111111]"
      aria-labelledby="about-inspiration-title"
    >
      <div
        data-about-inspiration-panel
        className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-12 sm:py-16 md:h-screen md:px-8 md:py-0 lg:px-10"
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12 lg:gap-20">

          <div className="flex flex-1 flex-col gap-8 lg:gap-16">
            <div className="flex flex-col">
              <p
                data-about-inspiration-label
                className="text-[0.65rem] uppercase tracking-[0.45em] text-black/45 sm:text-xs"
              >
                Inspirations
              </p>
              <h2
                id="about-inspiration-title"
                data-about-inspiration-label
                className="mt-5 max-w-4xl text-[13vw] font-semibold leading-[0.9] tracking-[-0.08em] text-[#111111] sm:text-6xl lg:text-[5.25rem]"
              >
                What Shapes My Work
              </h2>
            </div>

            <div className="flex flex-col">
              <p
                data-about-inspiration-scroll-label
                className="mb-8 text-[0.65rem] uppercase tracking-[0.45em] text-black/40 sm:text-xs"
              >
                Scroll To Explore &darr;
              </p>
              
              <div className="relative flex flex-col">
                <div 
                  data-inspiration-track
                  className="absolute right-4 md:right-6 w-[2px] bg-black/10 origin-top translate-x-1/2" 
                />
                <div 
                  data-inspiration-progress
                  className="absolute right-4 md:right-6 w-[2px] bg-[#111111] origin-top will-change-[height] translate-x-1/2"
                />
                <div 
                  data-inspiration-marker 
                  className="absolute right-4 md:right-6 top-0 h-2 w-2 rounded-full bg-[#111111] z-10 will-change-transform translate-x-1/2"
                />

                {inspirations.map((item, index) => (
                  <div
                    key={item.title}
                    data-inspiration-item
                    className="relative py-4 sm:py-5 lg:py-6"
                    style={{ color: index === 0 ? '#111111' : 'rgba(0,0,0,0.2)' }}
                  >
                    <div className="flex items-center justify-between gap-6">
                      <div
                        data-inspiration-text
                        className="relative text-[8vw] uppercase leading-[0.85] tracking-[-0.06em] sm:text-[3.5rem] will-change-transform"
                        style={{ 
                          transform: index === 0 ? 'scale(1.02)' : 'scale(1)',
                          transformOrigin: 'left center' 
                        }}
                      >
                        <span 
                          data-inspiration-text-bold
                          className="block font-semibold will-change-[opacity]"
                          style={{ opacity: index === 0 ? 1 : 0 }}
                        >
                          {item.title}
                        </span>
                        <span 
                          data-inspiration-text-thin
                          className="absolute left-0 top-0 block font-normal will-change-[opacity]"
                          style={{ opacity: index === 0 ? 0 : 1 }}
                        >
                          {item.title}
                        </span>
                      </div>
                      <div className="relative flex items-center justify-center w-8 md:w-12 bg-[#f3eee6] py-2 z-20">
                        <span 
                          data-inspiration-number
                          className="text-[0.65rem] uppercase tracking-[0.35em] lg:text-xs will-change-[opacity,transform]"
                          style={{ 
                            opacity: index === 0 ? 1 : 0.3,
                            fontWeight: index === 0 ? 600 : 400,
                            transform: index === 0 ? 'scale(1.2)' : 'scale(1)'
                          }}
                        >
                          0{index + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full flex-1 overflow-hidden bg-black/5 md:aspect-[4/5]">
            {inspirations.map((item, index) => (
              <div
                key={item.title}
                data-inspiration-image
                className="absolute inset-0 h-full w-full origin-center will-change-transform"
                style={{
                  opacity: index === 0 ? 1 : 0,
                  transform: index === 0 ? 'scale(1)' : 'scale(1.05)',
                  zIndex: index
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutInspiration
