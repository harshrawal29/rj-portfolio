import type { LoaderFunctionArgs } from 'react-router-dom'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getCategoryBySlug } from '../../lib/portfolio/getCategoryBySlug'
import { getProjectsByCategory } from '../../lib/portfolio/getProjectsByCategory'
import { notFound } from '../../lib/portfolio/notFound'
import { isCategorySlug } from '../../lib/portfolio/validators'
import type { Category, ProjectSummary } from '../../types/portfolio'
import FooterExperience from '../../sections/FooterExperience'

gsap.registerPlugin(ScrollTrigger)

interface WorkCategoryLoaderData {
  category: Category
  projects: ProjectSummary[]
}

export async function loader({ params }: LoaderFunctionArgs): Promise<WorkCategoryLoaderData> {
  const categorySlug = params.category

  if (!categorySlug || !isCategorySlug(categorySlug)) {
    notFound('Category not found')
  }

  const [category, projects] = await Promise.all([
    getCategoryBySlug(categorySlug),
    getProjectsByCategory(categorySlug),
  ])

  if (!category) {
    notFound('Category not found')
  }

  return { category, projects }
}

function ProjectList({ projects, category }: { projects: ProjectSummary[]; category: Category }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const handleProjectClick = (e: React.MouseEvent, projectUrl: string, projectSlug: string) => {
    e.preventDefault()

    const rows = containerRef.current?.querySelectorAll('.project-row')
    if (rows) gsap.to(rows, { opacity: 0, duration: 0.2 })
    gsap.to('.back-to-work-link', { opacity: 0, duration: 0.2 })
    gsap.to('header.category-header', { opacity: 0, duration: 0.2 })

    const imgNode = containerRef.current?.querySelector(`img[src*="${projectSlug}"]`) as HTMLImageElement

    if (imgNode) {
      const rect = imgNode.getBoundingClientRect()
      const clone = imgNode.cloneNode(true) as HTMLImageElement
      clone.id = 'hero-transition-clone'
      clone.style.position = 'fixed'
      clone.style.top = `${rect.top}px`
      clone.style.left = `${rect.left}px`
      clone.style.width = `${rect.width}px`
      clone.style.height = `${rect.height}px`
      clone.style.objectFit = 'cover'
      clone.style.zIndex = '9999'
      clone.style.margin = '0'
      clone.style.transformOrigin = 'center center'
      document.body.appendChild(clone)

      const scaleX = window.innerWidth / rect.width
      const scaleY = window.innerHeight / rect.height
      const scale = Math.max(scaleX, scaleY) * 1.05 // slightly over to cover edges

      gsap.to(clone, {
        scale: scale,
        duration: 0.6,
        ease: 'power3.inOut',
        onComplete: () => {
          navigate(projectUrl)
        }
      })
    } else {
      navigate(projectUrl)
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container || projects.length === 0) return

    const rows = gsap.utils.toArray<HTMLElement>('.project-row')
    const images = gsap.utils.toArray<HTMLElement>('.project-image')

    const ctx = gsap.context(() => {
      gsap.set(images, { opacity: 0, scale: 1.05, y: 50 })

      let activeIndex = -1

      rows.forEach((row, i) => {
        ScrollTrigger.create({
          trigger: row,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setActive(i, 1),
          onEnterBack: () => setActive(i, -1),
        })
      })

      function setActive(index: number, direction: number) {
        if (activeIndex === index) return

        const prevIndex = activeIndex
        activeIndex = index

        rows.forEach((r, rIdx) => {
          const title = r.querySelector('.project-title')
          const year = r.querySelector('.project-year')
          const summary = r.querySelector('.project-summary')

          if (rIdx === index) {
            gsap.to([title, year, summary], { opacity: 1, color: '#ffffff', duration: 0.5 })
          } else {
            gsap.to([title], { opacity: 0.3, color: '#525252', duration: 0.5 })
            gsap.to([year, summary], { opacity: 0.3, color: '#737373', duration: 0.5 })
          }
        })

        if (prevIndex !== -1 && images[prevIndex]) {
          const yOut = direction === 1 ? -50 : 50
          const yIn = direction === 1 ? 50 : -50

          gsap.to(images[prevIndex], {
            opacity: 0,
            y: yOut,
            scale: 1.05,
            duration: 0.8,
            ease: 'power3.out',
            zIndex: 0
          })

          gsap.fromTo(images[index],
            { opacity: 0, y: yIn, scale: 1.05 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', zIndex: 1 }
          )
        } else {
          gsap.fromTo(images[index],
            { opacity: 0, y: direction === -1 ? -50 : 50, scale: 1.05 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', zIndex: 1 }
          )
        }
      }

    }, containerRef)

    return () => ctx.revert()
  }, [projects])

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-full w-[400px] -translate-x-1/2 hidden md:block lg:w-[500px]">
        <div className="sticky top-[25vh] h-[50vh] w-full overflow-hidden">
          {projects.map((project) => (
            <div key={project.slug} className="project-image absolute inset-0 h-full w-full">
              {project.cover && (
                <motion.img
                  layoutId={`project-image-${project.slug}`}
                  src={`/projects/${project.slug}/${project.cover}`}
                  alt={project.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <motion.ul exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="relative z-10 flex flex-col w-full">
        {projects.map((project) => (
          <li key={project.slug} className="project-row relative flex w-full min-h-[40vh] md:min-h-[50vh] flex-col md:flex-row items-start md:items-center justify-between py-16 md:py-0">
            <a
              href={`/work/${category.slug}/${project.slug}`}
              onClick={(e) => handleProjectClick(e, `/work/${category.slug}/${project.slug}`, project.slug)}
              className="absolute inset-0 z-20"
              aria-label={project.title}
            />

            <div className="w-full md:w-[35%] flex items-center z-10 pointer-events-none">
              <h3 className="project-title text-[clamp(3rem,8vw,6rem)] font-medium uppercase leading-[0.85] tracking-[-0.04em] text-neutral-600 opacity-30">
                {project.title}
              </h3>
            </div>

            <div className="w-full md:w-[30%] flex flex-col items-start md:items-end justify-center pointer-events-none gap-2 mt-6 md:mt-0 z-10">
              <p className="project-year text-xs font-medium uppercase tracking-[0.35em] text-neutral-500 opacity-30">
                {project.year}
              </p>
              <p className="project-summary max-w-[200px] text-sm text-neutral-500 opacity-30 md:text-right">
                {project.summary}
              </p>
            </div>
          </li>
        ))}
      </motion.ul>
    </div>
  )
}

export function Component() {
  const currentData = useLoaderData() as WorkCategoryLoaderData | undefined
  const cachedData = useRef<WorkCategoryLoaderData | null>(null)

  if (currentData && currentData.category && currentData.projects) {
    cachedData.current = currentData
  }

  const data = currentData?.category && currentData?.projects ? currentData : cachedData.current

  if (!data) return null

  const { category, projects } = data

  return (
    <>
      <div className="mx-auto w-full max-w-[1600px] px-6 py-16 lg:px-12 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            to="/work"
            className="back-to-work-link group inline-flex items-center gap-4 text-xs font-medium uppercase tracking-[0.35em] text-neutral-500 transition-colors hover:text-white"
          >
            <span className="h-[1px] w-8 bg-neutral-500 transition-all group-hover:w-12 group-hover:bg-white" />
            All Work
          </Link>

          <header className="category-header mt-20 max-w-4xl lg:mt-32">
            <p className="text-xs font-medium uppercase tracking-[0.45em] text-neutral-500">Category</p>
            <h1 className="mt-6 text-[clamp(3.5rem,10vw,8rem)] font-medium uppercase leading-[0.85] tracking-[-0.05em] text-white">
              {category.title}
            </h1>
            <p className="mt-10 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">
              {category.description}
            </p>
          </header>
        </motion.div>

        <section className="mt-32 lg:mt-48" aria-labelledby="category-projects-title">
          <h2 className="sr-only" id="category-projects-title">
            Projects
          </h2>

          {projects.length === 0 ? (
            <p className="mt-8 text-sm text-neutral-400">No projects in this category yet.</p>
          ) : (
            <ProjectList projects={projects} category={category} />
          )}
        </section>
      </div>
      <FooterExperience />
    </>
  )
}
