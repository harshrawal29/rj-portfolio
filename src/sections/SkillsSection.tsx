import { useRef } from 'react'
import { createSkillsAnimation } from '../animations/skillsAnimation'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { copy, skills } from '../utils/content'

function SkillsSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useScrollReveal(sectionRef, createSkillsAnimation)

  return (
    <section
      id="things-i-work-with"
      ref={sectionRef}
      className="flex min-h-screen items-center border-b border-white/10"
      aria-labelledby="things-i-work-with-title"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10">
        <div className="max-w-5xl">
          <p className="text-xs uppercase tracking-[0.45em] text-neutral-500 sm:text-sm">
            {copy.skillsEyebrow}
          </p>
          <h2
            id="things-i-work-with-title"
            className="mt-8 text-[14vw] font-semibold uppercase leading-[0.84] tracking-[-0.09em] text-white sm:text-[5.25rem] lg:text-[7.25rem]"
          >
            THINGS I
            <br />
            WORK WITH
          </h2>
        </div>

        <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-5 border-t border-white/10 pt-8">
          {skills.map((skill) => (
            <li
              key={skill.label}
              data-skill-item
              className="text-2xl font-medium uppercase tracking-[-0.05em] text-white/85 sm:text-3xl lg:text-4xl"
            >
              {skill.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default SkillsSection
