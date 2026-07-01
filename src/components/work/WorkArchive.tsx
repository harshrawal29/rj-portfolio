import { useNavigate } from 'react-router-dom'
import type { Category, ProjectSummary } from '../../types/portfolio'
import { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsap'

interface WorkArchiveProps {
  categories: Category[]
  projectCounts: Record<string, number>
  projects: ProjectSummary[]
}

function formatIndex(order: number): string {
  return String(order).padStart(2, '0')
}

function getWordTransform(index: number, total: number) {
  if (total === 1) return { y: -300 }
  if (total === 2) {
    return index === 0 ? { x: -400 } : { x: 400 }
  }
  if (total === 3) {
    if (index === 0) return { x: -400 }
    if (index === 1) return { x: 400 }
    return { y: 300 }
  }
  // Fallback
  return {
    x: index % 2 === 0 ? -400 : 400,
    y: index < total / 2 ? -200 : 200
  }
}

function WorkArchive({ categories, projects }: WorkArchiveProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const handleCategoryClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault()
    
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        navigate(url)
      }
    })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        '.archive-header-text',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', stagger: 0.15 }
      )

      // Category Article Animations (Category Explosion)
      const articles = gsap.utils.toArray<HTMLElement>('.work-archive-item')

      articles.forEach((article) => {
        const pinContainer = article.querySelector('.pin-container')
        const bgNumber = article.querySelector('.bg-number')
        const words = article.querySelectorAll('.title-word')
        const projectItems = article.querySelectorAll('.project-item')
        const centralContent = article.querySelector('.central-content')

        if (!pinContainer) return

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinContainer,
            start: 'top top',
            end: '+=200%', // Pinned for ~200vh
            pin: true,
            scrub: true,
          }
        })

        // Background Element Animation
        if (bgNumber) {
          tl.to(bgNumber, {
            scale: 1.3,
            rotation: 5,
            ease: 'none',
            duration: 1
          }, 0)
        }

        // Stage 2: Words Separate
        words.forEach((word, index) => {
          const transform = getWordTransform(index, words.length)
          tl.to(word, {
            ...transform,
            opacity: 0.15, // fade slightly so projects are readable
            ease: 'power2.inOut',
            duration: 0.4
          }, 0)
        })

        // Stage 3: Reveal Project List
        if (projectItems.length > 0) {
          tl.fromTo(projectItems,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.05,
              ease: 'power3.out',
              duration: 0.4
            },
            0.2 // Starts while words are separating
          )
        }

        // Stage 4: Fade out section before next enters
        if (centralContent) {
          tl.to(centralContent, {
            opacity: 0,
            y: -100,
            duration: 0.2,
            ease: 'power2.in'
          }, 0.8)
        }
      })

    }, containerRef)

    return () => ctx.revert()
  }, [categories])

  return (
    <div className="work-archive pt-16 lg:pt-24 bg-[#f3eee6] text-[#111111] min-h-screen" ref={containerRef}>
      <header className="flex items-end px-6 pb-6 lg:min-h-[40vh] lg:px-12 lg:pb-28">
        <div className="">
          <p className="archive-header-text text-xs uppercase tracking-[0.45em] text-black/55">Archive</p>
          <h1 className="archive-header-text mt-2 text-[clamp(3rem,18vw,13rem)] font-medium uppercase leading-[0.82] tracking-[-0.09em] text-[#111111] lg:mt-6">
            Work
          </h1>
        </div>
      </header>

      <div role="list" className="flex flex-col relative z-10">
        {categories.map((category, index) => {
          const categoryProjects = projects.filter(p => p.category === category.slug)
          const words = category.title.split(' ')

          const isDark = index % 2 === 1
          const bgColor = isDark ? 'bg-[#111111]' : 'bg-[#f3eee6]'

          return (
            <article
              key={category.slug}
              role="listitem"
              className="work-archive-item relative w-full"
            >
              <div className={`pin-container relative h-screen w-full overflow-hidden flex items-center justify-center transition-colors duration-500 ${bgColor}`}>
                {/* Background oversized number */}
                <div 
                  className={`bg-number absolute inset-0 flex items-center justify-center text-[40vw] font-medium opacity-[0.04] pointer-events-none select-none`}
                  style={{ color: isDark ? '#ffffff' : '#111111' }}
                >
                  {formatIndex(category.order)}
                </div>

                <div className="central-content relative z-10 flex w-full max-w-7xl items-center justify-center px-6">

                  {/* Exploding Title */}
                  <div className="title-container flex flex-col items-center pointer-events-none">
                    {words.map((word, wIndex) => (
                      <span
                        key={wIndex}
                        className={`title-word text-[clamp(3.5rem,12vw,10rem)] font-medium uppercase leading-[0.85] tracking-[-0.04em] whitespace-nowrap`}
                        style={{ color: isDark ? '#ffffff' : '#111111' }}
                      >
                        {word}
                      </span>
                    ))}
                  </div>

                  {/* Revealed Project List */}
                  <div className="projects-list absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    {categoryProjects.map((p) => (
                      <a
                        key={p.slug}
                        href={`/work/${p.slug}`}
                        onClick={(e) => handleCategoryClick(e, `/work/${p.slug}`)}
                        className={`project-item text-[clamp(1.5rem,4vw,3rem)] font-medium uppercase mb-4 text-center leading-tight tracking-tight drop-shadow-sm hover:opacity-50 transition-opacity pointer-events-auto`}
                        style={{ color: isDark ? '#ffffff' : '#111111' }}
                      >
                        {p.title}
                      </a>
                    ))}
                  </div>

                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default WorkArchive
