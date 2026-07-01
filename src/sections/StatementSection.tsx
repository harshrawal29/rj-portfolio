import { useRef } from 'react'
import { createStatementAnimation } from '../animations/statementAnimation'
import { useScrollReveal } from '../hooks/useScrollReveal'

function StatementSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useScrollReveal(sectionRef, createStatementAnimation)

  const text = "Ready to shape the extraordinary?"

  const letters = text.split('')

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative z-20 flex h-screen w-full items-center overflow-hidden bg-[#050505]"
      aria-label="Design Philosophy"
    >
      <div data-giant-text-container className="flex whitespace-nowrap will-change-transform pr-[10vw]">
        {letters.map((char, index) => (
          <span
            key={index}
            data-letter
            className="inline-block text-[12vw] leading-none tracking-[-0.05em] text-white will-change-transform sm:text-[14vw] lg:text-[16vw]"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </section>
  )
}

export default StatementSection
