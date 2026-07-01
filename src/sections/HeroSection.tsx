import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createHeroAnimation } from '../animations/heroAnimation'

gsap.registerPlugin(ScrollTrigger)
import { copy } from '../utils/content'
import { SHOWCASE_IMAGES } from '../components/Loader'

interface HeroSectionProps {
  loaderComplete?: boolean
}

function HeroSection({ loaderComplete = true }: HeroSectionProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const heroRef = useRef<HTMLElement | null>(null)
  const collageRef = useRef<HTMLDivElement | null>(null)
  const hasAnimated = useRef(false)

  // Determine if the loader ran (or will run) this session
  const loaderWasShown = useRef(
    sessionStorage.getItem('hasSeenLoader') !== 'true'
  )

  useLayoutEffect(() => {
    if (!wrapperRef.current || !heroRef.current) return
    if (hasAnimated.current) return

    // The entrance animation branching and ScrollTrigger are handled below

    // If the loader ran but hasn't completed yet, hide content and wait
    if (!loaderComplete) {
      const section = heroRef.current
      const revealItems = section.querySelectorAll('[data-reveal]')
      const fadeItems = section.querySelectorAll('[data-fade]')
      const indicator = section.querySelector('[data-scroll-indicator]')
      const backdrop = section.querySelector('[data-hero-backdrop]')
      const collageOverlay = section.querySelector('[data-collage-overlay]')
      gsap.set(revealItems, { yPercent: 115 })
      gsap.set(fadeItems, { y: 32, opacity: 0 })
      if (indicator) gsap.set(indicator, { y: 20, opacity: 0 })
      if (backdrop) gsap.set(backdrop, { opacity: 0, scale: 0.92 })
      if (collageOverlay) gsap.set(collageOverlay, { opacity: 0 })
      return
    }

    const ctx = gsap.context(() => {
      // 1. Entrance Animation
      if (!loaderWasShown.current) {
        // Returning visitor: run standard animation immediately
        createHeroAnimation(heroRef.current!)
      } else {
        // First visit: Post-loader cinematic sequence
        const section = heroRef.current!
        const revealItems = section.querySelectorAll('[data-reveal]')
        const fadeItems = section.querySelectorAll('[data-fade]')
        const indicator = section.querySelector('[data-scroll-indicator]')
        const backdrop = section.querySelector('[data-hero-backdrop]')
        const collageOverlay = section.querySelector('[data-collage-overlay]')

        gsap.set(revealItems, { yPercent: 115 })
        gsap.set(fadeItems, { y: 32, opacity: 0 })
        if (indicator) gsap.set(indicator, { y: 20, opacity: 0 })
        if (backdrop) gsap.set(backdrop, { opacity: 0, scale: 0.92 })
        if (collageOverlay) gsap.set(collageOverlay, { opacity: 0 })

        const tl = gsap.timeline()

        // ── Collage is already visible from the loader morph ──────
        // The loader scaled it to 1.15, so we animate it smoothly back to 1.0
        gsap.set('.hero-collage-container', { opacity: 1, scale: 1.15 })
        tl.to('.hero-collage-container', {
          scale: 1,
          duration: 1.6,
          ease: 'power3.out',
        }, 0)

        if (collageOverlay) {
          tl.to(collageOverlay, {
            opacity: 1,
            duration: 1.5,
            ease: 'power2.inOut',
          }, 0.2)
        }

        if (backdrop) {
          tl.to(backdrop, {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
          }, 0.2)
        }

        if (revealItems.length > 0) {
          tl.to(revealItems, {
            yPercent: 0,
            duration: 1,
            stagger: 0.12,
            ease: 'power3.out',
          }, 0.3)
        }

        if (fadeItems.length > 0) {
          tl.to(fadeItems, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.14,
            ease: 'power3.out',
          }, 0.5)
        }

        if (indicator) {
          tl.to(indicator, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
          }, 0.7)
        }
      }

      // 2. Scroll Layering Transition (Scaling & Darkening)
      gsap.fromTo(
        heroRef.current,
        { scale: 1, opacity: 1, filter: 'brightness(1)' },
        {
          scale: 0.96,
          opacity: 0.5,
          filter: 'brightness(0.6)',
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: '+=100%',
            scrub: true,
          },
        }
      )
    }, wrapperRef.current!)

    return () => ctx.revert()
  }, [loaderComplete])

  return (
    <div ref={wrapperRef} className="relative h-[200vh] w-full z-0">
      <section
        id="hero"
        ref={heroRef}
        className="sticky top-0 flex h-screen w-full items-center overflow-hidden border-b border-white/10"
        aria-labelledby="hero-title"
      >
        <div className="hero-inner relative flex h-full w-full items-center overflow-hidden">
          {/* Collage backdrop — permanent hero visual */}
          <div
            ref={collageRef}
            className="hero-collage-container absolute inset-0 z-[1] overflow-hidden"
            style={{
              opacity: 1,
              transform: loaderWasShown.current ? 'scale(1.15)' : 'scale(1)'
            }}
          >
            {/* 3-row mosaic grid */}
            <div className="absolute inset-0 grid grid-rows-3 gap-[2px]">
              {/* Row 1: 3 images */}
              <div className="grid grid-cols-3 gap-[2px]">
                {SHOWCASE_IMAGES.slice(0, 3).map((src, i) => (
                  <div key={i} className="relative overflow-hidden">
                    <img src={src} alt="" className="hero-collage-img h-full w-full object-cover" loading="eager" />
                  </div>
                ))}
              </div>
              {/* Row 2: 2 large images */}
              <div className="grid grid-cols-2 gap-[2px]">
                {SHOWCASE_IMAGES.slice(3, 5).map((src, i) => (
                  <div key={i} className="relative overflow-hidden">
                    <img src={src} alt="" className="hero-collage-img h-full w-full object-cover" loading="eager" />
                  </div>
                ))}
              </div>
              {/* Row 3: 4 images */}
              <div className="grid grid-cols-4 gap-[2px]">
                {SHOWCASE_IMAGES.slice(5, 9).map((src, i) => (
                  <div key={i} className="relative overflow-hidden">
                    <img src={src} alt="" className="hero-collage-img h-full w-full object-cover" loading="eager" />
                  </div>
                ))}
              </div>
            </div>
            {/* Dark gradient and blur over the collage for text readability */}
            <div data-collage-overlay className="absolute inset-0 bg-gradient-to-b from-[#0505056b]/90 via-[#050505]/80 to-[#00000091]/95 backdrop-blur-[3px]" />
          </div>

          {/* Original hero backdrop glow */}
          <div className="absolute inset-0">
            <div
              data-hero-backdrop
              className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/6 blur-3xl sm:h-[34rem] sm:w-[34rem] lg:h-[42rem] lg:w-[42rem]"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_24%)]" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          <div className="relative z-[2] mx-auto grid w-full max-w-7xl gap-12 px-6 pb-22 pt-24 lg:grid-cols-12 lg:px-10 lg:pb-20 lg:pt-28">
            <div className="lg:col-span-9">
              <div className="overflow-hidden">
                <p data-reveal className="text-xs uppercase tracking-[0.45em] text-white font-medium drop-shadow-md sm:text-sm">
                  {copy.heroEyebrow}
                </p>
              </div>

              <div className="mt-8 space-y-2 sm:space-y-4">
                <div className="overflow-hidden">
                  <h1
                    id="hero-title"
                    data-reveal
                    className="text-[16vw] font-semibold uppercase leading-[0.86] tracking-[-0.08em] text-white drop-shadow-xl sm:text-[6.5rem] lg:text-[8.75rem]"
                  >
                    {copy.heroTitle}
                  </h1>
                </div>
                <div className="overflow-hidden">
                  <h2
                    data-reveal
                    className="text-[9vw] font-medium uppercase leading-[0.9] tracking-[-0.06em] text-white/90 drop-shadow-lg sm:text-[3.1rem]"
                  >
                    {copy.heroSubtitle}
                  </h2>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-10 lg:col-span-3 lg:items-end lg:pt-8">
              <p data-fade className="max-w-xs text-sm leading-7 text-white font-medium drop-shadow-md sm:text-base lg:text-right">
                {copy.heroMeta}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HeroSection
