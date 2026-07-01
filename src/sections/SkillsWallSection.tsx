import { useRef } from 'react'
import { createSkillsAnimation } from '../animations/skillsAnimation'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { copy, skills } from '../utils/content'

function SkillsWallSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useScrollReveal(sectionRef, createSkillsAnimation)

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="flex min-h-screen items-center border-b border-white/10"
      aria-labelledby="skills-title"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10">
        <p className="text-xs uppercase tracking-[0.45em] text-neutral-500 sm:text-sm">
          {copy.skillsEyebrow}
        </p>
        <h2
          id="skills-title"
          className="mt-8 text-4xl font-semibold uppercase tracking-[-0.07em] text-white sm:text-6xl lg:text-7xl"
        >
          Creative
          <br />
          Practice
        </h2>
        <ul className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {skills.map((skill) => (
            <li
              key={skill.label}
              data-skill-item
              className="flex min-h-28 items-center justify-center rounded-[1.5rem] border border-white/10 bg-white/5 px-4 text-center text-xl font-medium uppercase tracking-[-0.05em] text-white/90 sm:text-2xl"
            >
              {skill.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default SkillsWallSection
