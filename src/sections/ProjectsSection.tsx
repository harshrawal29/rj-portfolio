import { useRef } from 'react'
import { createProjectsAnimation } from '../animations/projectsAnimation'
import TextReveal from '../components/TextReveal'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { copy, projects } from '../utils/content'

function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useScrollReveal(sectionRef, createProjectsAnimation)

  return (
    <section
      id="selected-work"
      ref={sectionRef}
      className="flex min-h-screen items-center border-b border-white/10"
      aria-labelledby="selected-work-title"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10">
        <div className="max-w-5xl">
          <p className="text-xs uppercase tracking-[0.45em] text-neutral-500 sm:text-sm">
            {copy.projectsEyebrow}
          </p>
          <TextReveal
            as="h2"
            id="selected-work-title"
            lines={['SELECTED', 'WORK']}
            className="mt-8 text-[15vw] font-semibold uppercase leading-[0.84] tracking-[-0.09em] text-white sm:text-[5.75rem] lg:text-[8rem]"
            lineClassName="block will-change-transform"
            start="top 78%"
          />
        </div>

        <div className="mt-14 border-t border-white/10">
          {projects.map((project) => (
            <article
              key={project.title}
              data-project-item
              className="flex flex-col gap-4 border-b border-white/10 py-8 sm:flex-row sm:items-end sm:justify-between"
            >
              <h3 className="text-2xl font-medium uppercase tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl">
                {project.title}
              </h3>
              <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 sm:text-sm">
                {project.year}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
