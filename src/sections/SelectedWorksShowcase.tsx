import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link, useNavigate } from 'react-router-dom'
import { getProjects } from '../lib/portfolio/getProjects'
import type { Project } from '../types/portfolio'

gsap.registerPlugin(ScrollTrigger)

export default function SelectedWorksShowcase() {
  const containerRef = useRef<HTMLElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    let mounted = true
    getProjects().then((data) => {
      if (mounted) setProjects(data as Project[])
    })
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (!projects.length) return

    let resizeObserver: ResizeObserver | null = null

    const ctx = gsap.context(() => {
      const row1 = row1Ref.current
      const row2 = row2Ref.current

      if (!row1 || !row2) return

      // Create infinite loop animation for Row 1 (Left to Right)
      const tl1 = gsap.fromTo(
        row1,
        { xPercent: -50 },
        {
          xPercent: 0,
          ease: 'none',
          duration: 40,
          repeat: -1,
        }
      )

      // Create infinite loop animation for Row 2 (Right to Left)
      const tl2 = gsap.to(row2, {
        xPercent: -50,
        ease: 'none',
        duration: 40,
        repeat: -1,
      })

      // Adjust speed on scroll
      let scrollTimeout: ReturnType<typeof setTimeout>
      const scrollProxy = { speed: 1 }

      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity() / 100)
          const targetSpeed = 1 + velocity * 0.5

          gsap.to(scrollProxy, {
            speed: targetSpeed,
            duration: 0.2,
            onUpdate: () => {
              tl1.timeScale(scrollProxy.speed)
              tl2.timeScale(scrollProxy.speed)
            },
          })

          clearTimeout(scrollTimeout)
          scrollTimeout = setTimeout(() => {
            gsap.to(scrollProxy, {
              speed: 1,
              duration: 0.5,
              onUpdate: () => {
                tl1.timeScale(scrollProxy.speed)
                tl2.timeScale(scrollProxy.speed)
              },
            })
          }, 150)
        },
      })

      // Use ResizeObserver to reliably refresh ScrollTrigger when layout shifts
      resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh()
      })
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current)
      }

    }, containerRef)

    return () => {
      if (resizeObserver) resizeObserver.disconnect()
      ctx.revert()
    }
  }, [projects])

  // Split projects for the two rows
  const half = Math.ceil(projects.length / 2)
  const row1Projects = projects.slice(0, half)
  const row2Projects = projects.slice(half)

  // Duplicate items for seamless looping
  const loopedRow1 = [...row1Projects, ...row1Projects, ...row1Projects, ...row1Projects]
  const loopedRow2 = [...row2Projects, ...row2Projects, ...row2Projects, ...row2Projects]

  return (
    <section
      ref={containerRef}
      id='projects'
      className="relative z-10 -mt-[100vh] flex min-h-screen flex-col items-center justify-center overflow-hidden bg-neutral-950 py-32"
    >
      {/* Background Typography */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-5 bg-text">
        <h2 className="whitespace-nowrap text-[15vw] font-medium uppercase leading-none tracking-tighter text-white">
          Selected Works
        </h2>
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 lg:px-10 mb-16 sm:mb-20 flex flex-col showcase-header">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-12">
          <h2 className="flex flex-col text-[10vw] font-semibold uppercase leading-[0.85] tracking-[-0.02em] text-white sm:text-[4rem] lg:text-[5.5rem]">
            <span>Curated</span>
            <span className="text-white/50">Works</span>
          </h2>

          <div className="flex max-w-sm flex-col gap-6 sm:items-end sm:text-right pb-2">
            <p className="text-sm leading-relaxed text-neutral-400 sm:text-base">
              A selection of projects exploring brand identity, editorial layout, and digital experiences driven by deep emotional resonance.
            </p>
            <Link
              to="/work"
              className="group flex w-max items-center gap-4 text-xs uppercase tracking-[0.2em] text-white/60 transition-colors duration-300 hover:text-white"
            >
              <span>Explore Archive</span>
              <div className="relative flex items-center justify-center">
                <div className="h-[1px] w-8 bg-white/60 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:w-16 group-hover:bg-white" />
                <div className="absolute right-0 h-[5px] w-[5px] translate-x-full rounded-full bg-white opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-[2px]" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex w-full flex-col gap-10">
        {/* Row 1 */}
        <div className="flex w-max slider-row" ref={row1Ref}>
          {loopedRow1.map((project, i) => (
            <ProjectCard key={`${project.slug}-${i}`} project={project} />
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex w-max slider-row" ref={row2Ref}>
          {loopedRow2.map((project, i) => (
            <ProjectCard key={`${project.slug}-${i}`} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const card = cardRef.current
    const image = imageRef.current
    const info = infoRef.current

    if (!card || !image || !info) return

    const hoverCtx = gsap.context(() => {
      // Setup initial state
      gsap.set(info, { y: 20, opacity: 0 })

      card.addEventListener('mouseenter', () => {
        gsap.to(card, { scale: 0.98, duration: 0.4, ease: 'power3.out' })
        gsap.to(image, { scale: 1.05, duration: 0.6, ease: 'power3.out' })
        gsap.to(info, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', delay: 0.1 })
      })

      card.addEventListener('mouseleave', () => {
        gsap.to(card, { scale: 1, duration: 0.4, ease: 'power3.out' })
        gsap.to(image, { scale: 1, duration: 0.6, ease: 'power3.out' })
        gsap.to(info, { y: 20, opacity: 0, duration: 0.4, ease: 'power3.out' })
      })
    }, cardRef)

    return () => hoverCtx.revert()
  }, [])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!imageRef.current) return
    const rect = imageRef.current.getBoundingClientRect()
    
    // Remove any existing clone
    const oldClone = document.getElementById('hero-transition-clone')
    if (oldClone) oldClone.remove()
    
    const clone = imageRef.current.cloneNode(true) as HTMLImageElement
    clone.id = 'hero-transition-clone'
    clone.style.position = 'fixed'
    clone.style.top = `${rect.top}px`
    clone.style.left = `${rect.left}px`
    clone.style.width = `${rect.width}px`
    clone.style.height = `${rect.height}px`
    clone.style.zIndex = '9999'
    clone.style.objectFit = 'cover'
    clone.style.margin = '0'
    clone.style.transform = 'none'
    clone.style.pointerEvents = 'none'
    clone.style.transition = 'none'
    
    document.body.appendChild(clone)

    // Hide the clicked card entirely (clone takes over)
    if (cardRef.current) {
      gsap.set(cardRef.current, { visibility: 'hidden' })
    }

    // Stop the background sliders
    gsap.getTweensOf('.slider-row').forEach(t => t.pause())

    // Collect all individual project cards visible on screen
    const allCards = document.querySelectorAll<HTMLElement>('.project-card')
    const visibleCards: HTMLElement[] = []
    allCards.forEach(card => {
      if (card === cardRef.current) return // skip clicked card
      const r = card.getBoundingClientRect()
      // Only include cards that are at least partially in the viewport
      if (r.right > 0 && r.left < window.innerWidth && r.bottom > 0 && r.top < window.innerHeight) {
        visibleCards.push(card)
      }
    })

    // Split visible cards alternately: even→left, odd→right
    const goLeft: HTMLElement[] = []
    const goRight: HTMLElement[] = []
    visibleCards.forEach((card, i) => {
      if (i % 2 === 0) goLeft.push(card)
      else goRight.push(card)
    })

    // Also move header and bg text in opposite directions
    const showcaseHeader = document.querySelector('.showcase-header')
    const bgText = document.querySelector('.bg-text')
    if (showcaseHeader) goLeft.push(showcaseHeader as HTMLElement)
    if (bgText) goRight.push(bgText as HTMLElement)

    // Animate left group
    if (goLeft.length) {
      gsap.to(goLeft, {
        x: -window.innerWidth * 1.5,
        duration: 1.0,
        ease: 'power3.inOut',
        stagger: 0.03
      })
    }

    // Animate right group
    if (goRight.length) {
      gsap.to(goRight, {
        x: window.innerWidth * 1.5,
        duration: 1.0,
        ease: 'power3.inOut',
        stagger: 0.03
      })
    }

    // At the same time, expand the clone to match the hero size
    // On mobile (<768px) the hero is 60vh, on desktop it's 100vh
    const targetHeight = window.innerWidth >= 768 ? window.innerHeight : window.innerHeight * 0.6

    gsap.to(clone, {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: targetHeight,
      duration: 1.0,
      ease: 'power3.inOut',
      onComplete: () => {
        clone.dataset.expanded = 'true'
        navigate(`/work/${project.slug}`)
      }
    })
  }

  return (
    <Link
      to={`/work/${project.slug}`}
      ref={cardRef}
      onClick={handleClick}
      className="project-card group relative mx-4 block aspect-[4/5] w-[42vw] max-w-[400px] overflow-hidden sm:w-[40vw] md:w-[30vw] lg:w-[25vw]"
    >
      <div className="absolute inset-0 bg-neutral-900">
        {project.cover && (
          <img
            ref={imageRef}
            src={`/projects/${project.slug}/${project.cover}`}
            alt={project.title}
            className="h-full w-full object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100"
            loading="lazy"
          />
        )}
      </div>

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-[1]" />

      {/* Info Reveal */}
      <div
        ref={infoRef}
        className="absolute bottom-0 left-0 right-0 p-8 text-white z-10"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-white/70">
          {project.category.replace(/-/g, ' ')}
        </p>
        <h3 className="mt-2 text-2xl font-medium uppercase tracking-tight sm:text-3xl">
          {project.title}
        </h3>
      </div>
    </Link>
  )
}
