import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { getCategories } from '../lib/portfolio/getCategories'
import type { Category } from '../types/portfolio'

gsap.registerPlugin(ScrollTrigger)

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
    y: index < total / 2 ? -200 : 200,
  }
}

export default function WorkCategoriesGateway() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    let mounted = true
    getCategories().then((data) => {
      if (mounted) setCategories(data)
    })
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (!categories.length) return

    let resizeObserver: ResizeObserver | null = null

    const ctx = gsap.context(() => {
      const articles = gsap.utils.toArray<HTMLElement>('.gateway-category-item')

      articles.forEach((article) => {
        const pinContainer = article.querySelector('.pin-container')
        const bgNumber = article.querySelector('.bg-number')
        const words = article.querySelectorAll('.title-word')
        const centralContent = article.querySelector('.central-content')
        const cta = article.querySelector('.cta-container')

        if (!pinContainer) return

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinContainer,
            start: 'top top',
            end: '+=150%',
            pin: true,
            scrub: true,
          },
        })

        if (bgNumber) {
          tl.to(
            bgNumber,
            {
              scale: 1.3,
              rotation: 5,
              ease: 'none',
              duration: 1,
            },
            0
          )
        }

        // Words Separate
        words.forEach((word, index) => {
          const transform = getWordTransform(index, words.length)
          tl.to(
            word,
            {
              ...transform,
              opacity: 0.1,
              ease: 'power2.inOut',
              duration: 0.4,
            },
            0
          )
        })

        // Reveal CTA
        if (cta) {
          tl.fromTo(
            cta,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: 'power3.out',
              duration: 0.4,
            },
            0.2
          )
        }

        // Fade out before next
        if (centralContent) {
          tl.to(
            centralContent,
            {
              opacity: 0,
              y: -100,
              duration: 0.2,
              ease: 'power2.in',
            },
            0.8
          )
        }
      })

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
  }, [categories])

  return (
    <section ref={containerRef} className="relative bg-neutral-950 text-white min-h-screen">
      <div className="flex flex-col relative z-10 w-full">
        {categories.map((category) => {
          const words = category.title.split(' ')

          return (
            <article key={category.slug} className="gateway-category-item relative w-full">
              <div className="pin-container relative h-screen w-full overflow-hidden flex items-center justify-center bg-neutral-950">
                {/* Background Number */}
                <div className="bg-number absolute inset-0 flex items-center justify-center text-[40vw] font-medium text-white opacity-[0.02] pointer-events-none select-none">
                  {formatIndex(category.order)}
                </div>

                <div className="central-content relative z-10 flex w-full max-w-7xl items-center justify-center px-6">
                  {/* Exploding Title */}
                  <div className="title-container flex flex-col items-center pointer-events-none">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="title-word text-[clamp(3.5rem,12vw,10rem)] font-medium uppercase leading-[0.85] tracking-[-0.04em] text-white whitespace-nowrap"
                      >
                        {word}
                      </span>
                    ))}
                  </div>

                  {/* Revealed CTA */}
                  <div className="cta-container absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <Link
                      to={`/work/${category.slug}`}
                      className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border border-white/20 px-10 py-5 text-sm font-medium uppercase tracking-[0.2em] text-white transition-all duration-500 hover:border-white hover:bg-white pointer-events-auto"
                      aria-label={`Enter ${category.title} Archive`}
                    >
                      <span className="relative z-10 transition-colors duration-500 group-hover:text-neutral-950">
                        Enter Archive
                      </span>
                      <div className="relative z-10 flex h-4 w-4 items-center justify-center overflow-hidden transition-colors duration-500 group-hover:text-neutral-950">
                        <svg
                          className="h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[150%]"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <svg
                          className="absolute left-0 top-0 h-full w-full -translate-x-[150%] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
