import { useEffect, useLayoutEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { inspirations } from '../../data/inspirations'
import { InspirationHero } from '../../components/inspiration/InspirationHero'
import { InspirationContentBlocks } from '../../components/inspiration/InspirationContentBlocks'
import { InspirationQuote } from '../../components/inspiration/InspirationQuote'
import { MoreInspirations } from '../../components/inspiration/MoreInspirations'

export default function InspirationDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const inspiration = inspirations.find(i => i.slug === slug)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const clone = document.getElementById('hero-transition-clone')
      const targetImg = containerRef.current?.querySelector('[data-inspiration-hero-img]') as HTMLImageElement
      const content = contentRef.current
      const heroElements = containerRef.current
        ? Array.from(containerRef.current.querySelectorAll('.hero-meta, .hero-title, .hero-scroll-hint'))
        : []

      // Set initial states for text content
      gsap.set(heroElements, { opacity: 0, y: 30 })
      gsap.set(content, { opacity: 0, y: 60 })

      if (clone && targetImg) {
        // We have a transition clone from the previous page
        const targetRect = targetImg.getBoundingClientRect()
        
        // Hide the actual hero image while the clone is animating
        gsap.set(targetImg, { opacity: 0 })

        const isAlreadyExpanded = clone.dataset.expanded === 'true'

        if (isAlreadyExpanded) {
          // Snap clone to exact target dimensions to prevent any scrollbar width jumps
          gsap.set(clone, {
            top: targetRect.top,
            left: targetRect.left,
            width: targetRect.width,
            height: targetRect.height,
          })
          
          // Ensure real image is visible underneath
          gsap.set(targetImg, { opacity: 1 })
          
          // Smoothly crossfade the clone out to gracefully reveal the gradient overlay and actual image
          gsap.to(clone, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: () => clone.remove()
          })
        } else {
          // Fallback if not expanded
          gsap.to(clone, {
            top: targetRect.top,
            left: targetRect.left,
            width: targetRect.width,
            height: targetRect.height,
            duration: 1.2,
            ease: 'power3.inOut',
            onComplete: () => {
              gsap.set(targetImg, { opacity: 1 })
              clone.remove()
            }
          })
        }

        // Reveal the hero elements staggered
        gsap.to(heroElements, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          delay: isAlreadyExpanded ? 0.3 : 0.8,
          ease: 'power3.out',
          onComplete: () => {
            // Reveal the article content only after the hero animation finishes
            gsap.to(content, {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: 'power3.out'
            })
          }
        })
      } else {
        // Direct visit, fallback animation
        if (targetImg) {
          gsap.fromTo(targetImg,
            { scale: 1.05, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' }
          )
        }
        
        gsap.to(heroElements, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          delay: 0.4,
          ease: 'power3.out',
          onComplete: () => {
            gsap.to(content, {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: 'power3.out'
            })
          }
        })
      }

      // Add parallax to the hero image
      if (targetImg) {
        gsap.to(targetImg, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        })
      }

    }, containerRef)

    return () => {
      ctx.revert()
      // Cleanup clone just in case component unmounts before animation finishes
      const clone = document.getElementById('hero-transition-clone')
      if (clone) clone.remove()
    }
  }, [slug])

  if (!inspiration) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] text-neutral-100">
        <h1 className="text-4xl font-bold uppercase">Not Found</h1>
        <Link to="/" className="mt-8 text-sm uppercase tracking-widest text-white/50 hover:text-white">
          &larr; Back to Home
        </Link>
      </div>
    )
  }

  const otherInspirations = inspirations.filter(i => i.slug !== slug).slice(0, 3)

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-neutral-100 relative">
      <Link 
        to="/#inspiration" 
        className="group absolute left-6 top-24 z-50 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white lg:left-12"
      >
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 transition-colors duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:border-white group-hover:bg-white group-hover:text-black">
          <svg 
            className="absolute h-4 w-4 -translate-x-10 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0" 
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          <svg 
            className="absolute h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-10" 
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </div>
        <span>Back</span>
      </Link>

      <InspirationHero title={inspiration.title} heroImage={inspiration.heroImage} />
      
      <div ref={contentRef} className="relative z-10 bg-[#050505]">
        <InspirationContentBlocks blocks={inspiration.contentBlocks} />
        <InspirationQuote quote={inspiration.quote} />
        <MoreInspirations inspirations={otherInspirations} />
      </div>
    </div>
  )
}
