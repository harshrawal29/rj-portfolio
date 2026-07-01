import { useRef } from 'react'
import { createProjectsAnimation } from '../animations/projectsAnimation'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { copy, projects } from '../utils/content'

function HorizontalProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useScrollReveal(sectionRef, createProjectsAnimation)

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="flex min-h-screen items-center border-b border-white/10"
      aria-labelledby="projects-title"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10">
        <p className="text-xs uppercase tracking-[0.45em] text-neutral-500 sm:text-sm">
          {copy.projectsEyebrow}
        </p>
        <h2
          id="projects-title"
          className="mt-8 text-4xl font-semibold uppercase tracking-[-0.07em] text-white sm:text-6xl lg:text-7xl"
        >
          Selected
          <br />
          Worlds
        </h2>
        <div className="mt-12 overflow-hidden pb-4">
          <div data-project-track className="flex min-w-max gap-6 pr-6 will-change-transform">
            {projects.map((project, index) => (
              <article
                key={project.title}
                data-project-item
                className="w-[80vw] max-w-[30rem] rounded-[2rem] border border-white/10 bg-white/5 p-8 sm:w-[34rem]"
                style={{ transform: `translateY(${index % 2 === 0 ? '0' : '24px'})` }}
              >
                <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
                  {project.year} • {project.category}
                </p>
                <h3 className="mt-6 text-3xl font-medium uppercase tracking-[-0.05em] text-white sm:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-6 max-w-sm text-base leading-7 text-neutral-300">
                  {project.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HorizontalProjectsSection
