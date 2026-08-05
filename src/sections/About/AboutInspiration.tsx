import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { createAboutInspirationAnimation } from '../../animations/aboutAnimations'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { inspirations, inspirationSettings } from '../../data/inspirations'
import { gsap } from 'gsap'

function AboutInspiration() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const navigate = useNavigate()

  useScrollReveal(sectionRef, createAboutInspirationAnimation)

  const handleNavigation = (slug: string) => {
    const targetImg = sectionRef.current?.querySelector(`[data-slug="${slug}"] img`) as HTMLImageElement
    
    if (targetImg) {
      const rect = targetImg.getBoundingClientRect()
      
      // Remove any existing clone
      const oldClone = document.getElementById('hero-transition-clone')
      if (oldClone) oldClone.remove()

      const clone = targetImg.cloneNode(true) as HTMLImageElement
      
      clone.id = 'hero-transition-clone'
      clone.style.position = 'fixed'
      clone.style.top = `${rect.top}px`
      clone.style.left = `${rect.left}px`
      clone.style.width = `${rect.width}px`
      clone.style.height = `${rect.height}px`
      clone.style.objectFit = 'cover'
      clone.style.zIndex = '9999'
      clone.style.margin = '0'
      clone.style.transformOrigin = 'center center'
      document.body.appendChild(clone)

      // Hide the original image container
      const imgContainer = sectionRef.current?.querySelector('.aspect-\\[4\\/3\\]')
      if (imgContainer) gsap.set(imgContainer, { opacity: 0 })

      // Animate text content away
      const textContent = sectionRef.current?.querySelector('.flex-1.flex-col')
      if (textContent) {
        gsap.to(textContent, {
          x: -window.innerWidth,
          duration: 1.0,
          ease: 'power3.inOut'
        })
      }

      // Animate clone to hero size (70vh)
      gsap.to(clone, {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight * 0.7,
        duration: 1.0,
        ease: 'power3.inOut',
        onComplete: () => {
          clone.dataset.expanded = 'true'
          navigate(`/inspiration/${slug}`)
        }
      })
    } else {
      navigate(`/inspiration/${slug}`)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="inspiration"
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
                {inspirationSettings.sectionLabel}
              </p>
              <h2
                id="about-inspiration-title"
                data-about-inspiration-label
                className="mt-5 max-w-4xl text-[13vw] font-semibold leading-[0.9] tracking-[-0.08em] text-[#111111] sm:text-6xl lg:text-[5.25rem]"
              >
                {inspirationSettings.sectionHeading}
              </h2>
            </div>

            <div className="flex flex-col">
              <p
                data-about-inspiration-scroll-label
                className="mb-8 text-[0.65rem] uppercase tracking-[0.45em] text-black/40 sm:text-xs"
              >
                {inspirationSettings.scrollPrompt}
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
                    data-cursor="view"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation(item.slug)
                    }}
                    className="group relative cursor-pointer py-4 sm:py-5 lg:py-6"
                    style={{ color: index === 0 ? '#111111' : 'rgba(0,0,0,0.2)' }}
                  >
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex items-center gap-6 md:gap-8 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-4">
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
                        
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111111] text-[#f3eee6] opacity-0 -translate-x-4 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0 group-hover:opacity-100">
                          <svg 
                            className="h-4 w-4" 
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </div>
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

          <div className="group relative aspect-[4/3] w-full flex-1 overflow-hidden bg-black/5 md:aspect-[4/5]" data-cursor="view">
            {inspirations.map((item, index) => (
              <div
                key={item.title}
                data-inspiration-image
                data-slug={item.slug}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation(item.slug)
                }}
                className="absolute inset-0 h-full w-full cursor-pointer origin-center will-change-transform"
                style={{
                  opacity: index === 0 ? 1 : 0,
                  transform: index === 0 ? 'scale(1)' : 'scale(1.05)',
                  zIndex: index
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover object-center transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 pointer-events-none bg-black/0 transition-colors duration-700 group-hover:bg-black/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutInspiration
