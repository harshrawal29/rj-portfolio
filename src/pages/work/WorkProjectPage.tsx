import type { LoaderFunctionArgs } from 'react-router-dom'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getCategoryBySlug } from '../../lib/portfolio/getCategoryBySlug'
import { getProjectBySlug } from '../../lib/portfolio/getProjectBySlug'
import { getProjectsByCategory } from '../../lib/portfolio/getProjectsByCategory'
import { notFound } from '../../lib/portfolio/notFound'
import ContentBlockRenderer from '../../components/project-sections/ContentBlockRenderer'
import EditorialProjectStory from '../../components/project-sections/EditorialProjectStory'
import type { Category, Project, ProjectSummary } from '../../types/portfolio'
import './editorial-blocks.css'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════════════════════════
   LOADER
   ═══════════════════════════════════════════════════════════════ */

interface WorkProjectLoaderData {
  category: Category
  project: Project
  nextProject: ProjectSummary | null
}

export async function loader({ params }: LoaderFunctionArgs): Promise<WorkProjectLoaderData> {
  const projectSlug = params.project

  if (!projectSlug) {
    notFound('Project not found')
  }

  const project = await getProjectBySlug(projectSlug)

  if (!project) {
    notFound('Project not found')
  }

  const category = await getCategoryBySlug(project.category)

  if (!category) {
    notFound('Category not found')
  }

  const categoryProjects = await getProjectsByCategory(category.slug)

  const currentIndex = categoryProjects.findIndex((p) => p.slug === projectSlug)
  let nextProject: ProjectSummary | null = null

  if (currentIndex !== -1 && categoryProjects.length > 1) {
    nextProject = currentIndex < categoryProjects.length - 1
      ? categoryProjects[currentIndex + 1]
      : categoryProjects[0]
  }

  return { category, project, nextProject }
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export function Component() {
  const navigate = useNavigate()
  const currentData = useLoaderData() as WorkProjectLoaderData | undefined
  const cachedData = useRef<WorkProjectLoaderData | null>(null)

  if (currentData && currentData.category && currentData.project) {
    cachedData.current = currentData
  }

  const data = currentData?.category && currentData?.project ? currentData : cachedData.current
  if (!data) return null

  const { category, project, nextProject } = data

  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  /* ─── Entry & Scroll Animations ──────────────────────────── */
  useEffect(() => {
    window.scrollTo(0, 0)

    // Reset page wrapper from any previous exit animation
    if (pageRef.current) {
      gsap.set(pageRef.current, { clearProps: 'all' })
    }

    const ctx = gsap.context(() => {
      // Handle transition clone
      const clone = document.getElementById('hero-transition-clone')
      if (clone) {
        if (imageRef.current) {
          const targetRect = imageRef.current.getBoundingClientRect()

          gsap.set(imageRef.current, { opacity: 0 })

          const isAlreadyExpanded = clone.dataset.expanded === 'true'

          if (isAlreadyExpanded) {
            // It's already full screen, just snap it to the exact target to handle any scrollbar differences
            gsap.to(clone, {
              top: targetRect.top,
              left: targetRect.left,
              width: targetRect.width,
              height: targetRect.height,
              duration: 0.1,
              onComplete: () => {
                gsap.set(imageRef.current, { opacity: 1, scale: 1 })
                clone.remove()
              }
            })
          } else {
            // Normal expansion if coming from elsewhere
            gsap.to(clone, {
              top: targetRect.top,
              left: targetRect.left,
              width: targetRect.width,
              height: targetRect.height,
              duration: 1.4,
              ease: 'power3.inOut',
              onComplete: () => {
                gsap.set(imageRef.current, { opacity: 1, scale: 1 })
                clone.remove()
              }
            })
          }
        } else {
          gsap.to(clone, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => clone.remove(),
          })
        }
      } else {
        // Hero image reveal if no clone
        if (imageRef.current) {
          gsap.set(imageRef.current, { opacity: 0, scale: 1.05 })
          gsap.to(imageRef.current, {
            scale: 1, opacity: 1, duration: 1.4, ease: 'power3.out', delay: 0.1,
          })
        }
      }

      // Hero content stagger
      const heroEls = heroRef.current?.querySelectorAll('.hero-reveal')
      if (heroEls?.length) {
        const isAlreadyExpanded = clone?.dataset.expanded === 'true'
        gsap.fromTo(heroEls,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out', delay: clone && !isAlreadyExpanded ? 1.0 : 0.3 }
        )
      }

      // Story section
      const storyEls = document.querySelectorAll('.story-reveal')
      if (storyEls.length) {
        gsap.fromTo(storyEls,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.case-study__story', start: 'top 80%', toggleActions: 'play none none none' },
          }
        )
      }

      // Narrative sections
      const narrativeEls = document.querySelectorAll('.narrative-reveal')
      if (narrativeEls.length) {
        gsap.fromTo(narrativeEls,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.case-study__narrative', start: 'top 80%', toggleActions: 'play none none none' },
          }
        )
      }

      // Hero parallax
      if (heroRef.current) {
        const bgEl = heroRef.current.querySelector('.case-study__hero-bg')
        if (bgEl) {
          gsap.to(bgEl, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
        }
      }

      // Next project
      const nextSection = document.querySelector('.case-study__next')
      if (nextSection) {
        const nextEls = nextSection.querySelectorAll('.next-reveal')
        if (nextEls.length) {
          gsap.fromTo(nextEls,
            { y: 60, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
              scrollTrigger: { trigger: nextSection, start: 'top 85%', toggleActions: 'play none none none' },
            }
          )
        }
      }
    }, pageRef)

    return () => ctx.revert()
  }, [project.slug])

  /* ─── Navigation ─────────────────────────────────────────── */
  const handleNextClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault()
    gsap.to(pageRef.current, {
      y: -window.innerHeight,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => navigate(url),
    })
  }

  /* ─── Narrative Data ─────────────────────────────────────── */
  const hasContentBlocks = project.contentBlocks && project.contentBlocks.length > 0

  return (
    <div className="case-study" ref={pageRef}>

      {/* ── HERO ────────────────────────────────────────────── */}
      <header ref={heroRef} className="case-study__hero">
        {project.cover && (
          <div className="case-study__hero-bg">
            {project.cover.endsWith('.mp4') || project.cover.endsWith('.webm') ? (
              <video
                data-project-hero
                ref={imageRef as unknown as React.RefObject<HTMLVideoElement>}
                src={project.cover}
                className="case-study__hero-img"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img
                data-project-hero
                ref={imageRef as unknown as React.RefObject<HTMLImageElement>}
                src={project.cover.startsWith('http') ? project.cover : `/projects/${project.slug}/${project.cover}`}
                alt={project.title}
                className="case-study__hero-img"
              />
            )}
            <div className="case-study__hero-overlay" />
          </div>
        )}

        <nav className="hero-reveal case-study__hero-nav">
          <Link to="/work">All Work</Link>
          <span className="case-study__hero-nav-sep" aria-hidden="true" />
          <span>{category.title}</span>
        </nav>

        <div className="case-study__hero-content">

          <div className="hero-reveal case-study__hero-meta">
            <span className="case-study__hero-meta-item">{category.title}</span>
            <span className="case-study__hero-meta-sep">·</span>
            <span className="case-study__hero-meta-item">{project.year}</span>
          </div>
          <h1 className="hero-reveal case-study__hero-title">{project.title}</h1>
          <p className="hero-reveal case-study__hero-desc">{project.summary}</p>
        </div>
      </header>

      {/* ── STORY SECTION ───────────────────────────────────── */}
      <EditorialProjectStory project={project} />



      {/* ── EDITORIAL CONTENT BLOCKS ────────────────────────── */}
      {hasContentBlocks && (
        <div className="case-study__blocks">
          {project.contentBlocks!.map((block, i) => (
            <ContentBlockRenderer key={i} block={block} index={i} projectSlug={project.slug} />
          ))}
        </div>
      )}


      {/* ── NEXT PROJECT ────────────────────────────────────── */}
      {nextProject && (
        <section className="case-study__next">
          <div className="case-study__next-inner">
            <span className="next-reveal case-study__next-label">Next Project</span>
            <a
              href={`/work/${nextProject.slug}`}
              onClick={(e) => handleNextClick(e, `/work/${nextProject.slug}`)}
              className="next-reveal case-study__next-link"
            >
              <h2 className="case-study__next-title">{nextProject.title}</h2>

            </a>
          </div>
        </section>
      )}
    </div>
  )
}
