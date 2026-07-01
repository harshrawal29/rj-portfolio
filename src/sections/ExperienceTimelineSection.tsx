import { useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { gsap } from '../utils/gsap'
import { DURATIONS, EASING, SCROLL_START, STAGGER } from '../utils/animationPresets'
import { copy } from '../utils/content'

const experience = [
  { year: '2026', title: 'Creative Direction', details: 'Shaped visual identities and immersive design narratives with a refined editorial lens.' },
  { year: '2025', title: 'Visual Exploration', details: 'Developed concept-rich work inspired by illustration, music, and contemporary culture.' },
  { year: '2024', title: 'Foundational Practice', details: 'Built a personal design language rooted in emotion, experimentation, and story.' },
] as const

function ExperienceTimelineSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useScrollReveal(sectionRef, () => {
    if (!sectionRef.current) return

    const items = sectionRef.current.querySelectorAll('[data-timeline-item]')

    return gsap.from(items, {
      y: 48,
      opacity: 0,
      duration: DURATIONS.md,
      stagger: STAGGER.base,
      ease: EASING.primary,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: SCROLL_START.wide,
        once: true,
      },
    })
  })

  return (
    <section
      id="timeline"
      ref={sectionRef}
      data-surface
      data-theme-bg="#F2E8D5"
      data-theme-secondary="#E8DABD"
      data-theme-text="#111111"
      data-theme-accent="#D6B46A"
      data-theme-accent-soft="rgba(214,180,106,0.20)"
      data-theme-border="rgba(17,17,17,0.12)"
      data-theme-glow-a="rgba(214,180,106,0.16)"
      data-theme-glow-b="rgba(199,109,79,0.12)"
      data-theme-glow-c="rgba(168,181,156,0.10)"
      className="flex min-h-screen items-center border-b border-black/10"
      aria-labelledby="timeline-title"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10">
        <p className="text-xs uppercase tracking-[0.45em] text-black/45 sm:text-sm">
          {copy.timelineEyebrow}
        </p>
        <h2
          id="timeline-title"
          className="mt-8 text-4xl font-semibold uppercase tracking-[-0.07em] text-[#111111] sm:text-6xl lg:text-7xl"
        >
          Creative
          <br />
          Journey
        </h2>
        <div className="mt-12 space-y-0 border-t border-black/10">
          {experience.map((item) => (
            <article
              key={item.year}
              data-timeline-item
              className="grid gap-4 border-b border-black/10 py-8 md:grid-cols-[120px_1fr_1fr]"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-black/44">{item.year}</p>
              <h3 className="text-2xl font-medium uppercase tracking-[-0.05em] text-[#111111] sm:text-3xl">
                {item.title}
              </h3>
              <p className="text-base leading-7 text-black/64">{item.details}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceTimelineSection
