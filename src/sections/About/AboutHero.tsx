import { useRef } from 'react'
import { createAboutHeroAnimation } from '../../animations/aboutAnimations'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const heroLines = [
  'Design that tells stories,',
  'creates emotions,',
  'and leaves a lasting impression.',
]

function AboutHero() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useScrollReveal(sectionRef, createAboutHeroAnimation)

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden border-b border-black/10 bg-[#f3eee6] text-[#111111]"
      aria-labelledby="about-hero-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(17,17,17,0.07),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.32),transparent_38%)]" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col justify-between gap-12 px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
        <div className="flex flex-wrap items-center justify-between gap-6 text-[0.65rem] uppercase tracking-[0.45em] text-black/55 sm:text-xs">
          <p data-about-hero-meta>Riya Jethani</p>
          <p data-about-hero-meta>Mumbai, India</p>
          <p data-about-hero-meta>Creative Designer</p>
        </div>

        <div className="max-w-6xl space-y-2 sm:space-y-4">
          <h2
            id="about-hero-title"
            className="text-[14vw] font-semibold leading-[0.88] tracking-[-0.09em] text-[#111111] sm:text-[5.8rem] lg:text-[8.9rem]"
          >
            {heroLines.map((line) => (
              <span key={line} className="block overflow-hidden">
                <span data-about-hero-line className="block will-change-transform">
                  {line}
                </span>
              </span>
            ))}
          </h2>
        </div>

        <div className="flex justify-end">
          <p
            data-about-hero-meta
            className="max-w-sm text-sm leading-7 text-black/62 sm:text-base sm:leading-8"
          >
            A cinematic editorial perspective on visual storytelling, crafted to feel
            intimate, deliberate, and quietly unforgettable.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutHero
