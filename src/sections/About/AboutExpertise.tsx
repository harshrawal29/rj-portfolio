import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAboutExpertiseAnimation } from '../../animations/aboutAnimations'
import { useScrollReveal } from '../../hooks/useScrollReveal'

import { Disc3, Feather, Package, Printer, Smartphone, AppWindowMac, Sparkles, PencilSparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const expertiseItems = [
  { title: 'Brand Identity', desc: 'Building identities that go further than just a logo, thoughtful and consistent work made to help a brand get noticed and remembered.', icon: Sparkles },
  { title: 'Packaging Design', desc: 'Packaging built to look right on the shelf and feel right in hand, made to leave a strong first impression that actually sticks.', icon: Package },
  { title: 'Logo Design', desc: 'A logo is more than a symbol, it\'s the face of a brand, designed to hold up over time, stand out and mean something.', icon: Disc3 },
  { title: 'Website Design & Development', desc: 'Websites built to look good, work well and hold up across devices, designed with the user in mind at every step.', icon: Feather },
  { title: 'Illustration & Visual Storytelling', desc: 'Turning ideas into visuals that simplify a message, add some emotion and bring a story to life.', icon: Printer },
  { title: 'Digital Design', desc: 'Creative work for social media, digital campaigns, thumbnails, presentations and other online formats, made to grab attention and hold onto it.', icon: AppWindowMac },
  { title: 'Print Design', desc: 'Print work built to make an impact, from billboards and transit ads to brochures, posters and other marketing material.', icon: Printer },
  { title: 'Editorial Design', desc: 'Layouts designed to bring clarity, structure and visual appeal to every page.', icon: PencilSparkles },
]

/*
 * Single-row staggered placement — all cards in one line.
 * Each card has a slight vertical offset and subtle rotation
 * for the handcrafted editorial pinboard feel.
 * Cards overlap ~10-15% horizontally.
 */
const cardPlacements = [
  { offsetY: -8, rotate: -1.2, depth: 0.8 },
  { offsetY: 12, rotate: 1.5, depth: 1.2 },
  { offsetY: -14, rotate: -0.8, depth: 0.6 },
  { offsetY: 6, rotate: 1.0, depth: 1.0 },
  { offsetY: -10, rotate: -1.8, depth: 1.4 },
  { offsetY: 16, rotate: 0.6, depth: 0.9 },
]

function AboutExpertise() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const cardsContainerRef = useRef<HTMLDivElement | null>(null)

  useScrollReveal(sectionRef, createAboutExpertiseAnimation)

  // Mouse parallax — extremely subtle premium float using GSAP
  useEffect(() => {
    const container = cardsContainerRef.current
    if (!container) return

    let mouseX = 0.5
    let mouseY = 0.5
    let currentX = 0.5
    let currentY = 0.5
    let rafId: number

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseX = (e.clientX - rect.left) / rect.width
      mouseY = (e.clientY - rect.top) / rect.height
    }

    const handleMouseLeave = () => {
      mouseX = 0.5
      mouseY = 0.5
    }

    const tick = () => {
      // Smooth interpolation toward mouse position
      currentX += (mouseX - currentX) * 0.06
      currentY += (mouseY - currentY) * 0.06

      const wrappers = container.querySelectorAll<HTMLElement>('[data-card-wrapper]')
      wrappers.forEach((wrapper) => {
        const depth = parseFloat(wrapper.dataset.depth || '1')
        // Maximum movement: 4px — extremely minimal
        const moveX = (currentX - 0.5) * 4 * depth
        const moveY = (currentY - 0.5) * 3 * depth
        gsap.set(wrapper, { x: moveX, y: moveY })
      })
      rafId = requestAnimationFrame(tick)
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)
    rafId = requestAnimationFrame(tick)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="bg-[#f3eee6]">
      <section
        ref={sectionRef}
        className="relative overflow-hidden border-b border-black/10 bg-[#f3eee6] text-[#111111]"
        aria-label="Areas of Expertise"
      >
        {/* ─── Full-height container with horizontal scroll ─── */}
        <div className="flex min-h-screen flex-col justify-center md:justify-between gap-8 md:gap-0 py-12 sm:py-16 lg:py-20 w-full">
          {/* Heading at the top */}
          <div className="w-full max-w-7xl px-6 lg:px-10">
            <h2 className="text-[12vw] font-bold leading-[0.85] tracking-[-0.06em] text-[#111111] sm:text-[4.5rem] lg:text-[6.5rem]">
              DESIGN SERVICES
            </h2>
          </div>

          <div
            ref={cardsContainerRef}
            data-expertise-panel
            className="flex w-full overflow-hidden py-4 md:py-12 px-6 lg:px-10"
          >
            {/* ─── Single-row staggered cards ─── */}
            <div data-cards-track className="flex w-max items-center pl-6 pr-12 md:pl-12 md:pr-24 lg:pl-20 lg:pr-32">
              {expertiseItems.map((item, i) => {
                const placement = cardPlacements[i % cardPlacements.length]
                return (
                  <div
                    key={i}
                    data-card-wrapper
                    data-depth={placement.depth}
                    className="will-change-transform"
                    style={{
                      marginLeft: i === 0 ? '0' : '-24px',
                      transform: `translateY(${placement.offsetY}px)`,
                      zIndex: i + 1,
                      flexShrink: 0,
                    }}
                  >
                    <div
                      data-expertise-card
                      className="relative flex aspect-square w-[260px] flex-col justify-between overflow-hidden rounded-[2rem] border border-black/[0.08] bg-[#fcfcfc] p-6 will-change-transform sm:w-[300px] sm:p-8 lg:w-[340px] lg:p-10 shadow-sm"
                    >
                      {/* Decorative outline illustration at 5% opacity */}
                      <item.icon
                        className="absolute -right-6 -bottom-6 h-48 w-48 select-none pointer-events-none text-black/[0.03] -rotate-12"
                        strokeWidth={0.4}
                      />

                      <div className="relative z-10">
                        <item.icon className="h-14 w-14 text-[#ff5e00] sm:h-16 sm:w-16" strokeWidth={1.5} />
                      </div>
                      <div className="relative z-10 mt-8">
                        <h3 className="text-xl font-medium leading-tight tracking-tight text-[#111111] sm:text-2xl lg:text-[1.75rem]">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-black/60 sm:text-base lg:mt-3">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
              {/* Explicit spacer to ensure last card has room */}
              <div className="w-12 sm:w-20 shrink-0" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutExpertise
