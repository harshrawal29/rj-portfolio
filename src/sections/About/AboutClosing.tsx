import { useRef } from 'react'
import { createAboutClosingAnimation } from '../../animations/aboutAnimations'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const closingLines = [
  'Every project is an opportunity',
  'to push creative boundaries',
  'and create something meaningful.',
]

function AboutClosing() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useScrollReveal(sectionRef, createAboutClosingAnimation)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85vh] overflow-hidden border-b border-white/10 bg-[#050505] text-[#f5f1e8]"
      aria-labelledby="about-closing-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_42%)]" />
      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-between px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
        <p
          data-about-closing-note
          className="text-[0.65rem] uppercase tracking-[0.45em] text-white/40 sm:text-xs"
        >
          Closing frame
        </p>

        <h2
          id="about-closing-title"
          className="max-w-6xl text-[13vw] font-semibold leading-[0.88] tracking-[-0.09em] sm:text-[5.4rem] lg:text-[8rem]"
        >
          {closingLines.map((line) => (
            <span key={line} className="block overflow-hidden">
              <span data-about-closing-line className="block will-change-transform">
                {line}
              </span>
            </span>
          ))}
        </h2>

        <div className="flex justify-end">
          <p
            data-about-closing-note
            className="max-w-md text-sm leading-7 text-white/52 sm:text-base sm:leading-8"
          >
            Every brief becomes a space to experiment with mood, clarity, and memorable
            visual language.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutClosing
