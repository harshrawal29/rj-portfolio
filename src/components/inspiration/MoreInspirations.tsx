import { Link, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import type { Inspiration } from '../../data/inspirations'
import { gsap } from 'gsap'

export interface MoreInspirationsProps {
  inspirations: Inspiration[]
}

export function MoreInspirations({ inspirations }: MoreInspirationsProps) {
  const containerRef = useRef<HTMLElement>(null)
  const navigate = useNavigate()

  const handleNavigation = (e: React.MouseEvent, slug: string) => {
    e.preventDefault()
    const targetImg = containerRef.current?.querySelector(`[data-slug="${slug}"] img`) as HTMLImageElement
    
    if (targetImg) {
      const rect = targetImg.getBoundingClientRect()
      
      // Remove any existing clone
      const oldClone = document.getElementById('hero-transition-clone')
      if (oldClone) oldClone.remove()

      const clone = targetImg.cloneNode(true) as HTMLImageElement
      
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

      // Hide the clicked card entirely
      const card = targetImg.closest('a')
      if (card) gsap.set(card, { visibility: 'hidden' })

      // Animate other elements away
      if (containerRef.current) {
        gsap.to(containerRef.current.children, {
          y: 200,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.inOut'
        })
      }

      // Animate clone to hero size (70vh)
      gsap.to(clone, {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight * 0.7,
        duration: 1.0,
        ease: 'power3.inOut',
        onComplete: () => {
          clone.dataset.expanded = 'true'
          navigate(`/inspiration/${slug}`)
        }
      })
    } else {
      navigate(`/inspiration/${slug}`)
    }
  }

  return (
    <footer ref={containerRef} className="border-t border-white/10 px-6 py-24 md:px-12 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <h3 className="mb-12 text-xs uppercase tracking-[0.4em] text-white/50 md:mb-20">
          More Inspirations
        </h3>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {inspirations.map((item) => (
            <Link 
              key={item.slug} 
              to={`/inspiration/${item.slug}`}
              onClick={(e) => handleNavigation(e, item.slug)}
              className="group block"
            >
              <div className="relative mb-6 aspect-[4/5] w-full overflow-hidden bg-white/5" data-slug={item.slug}>
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-white/5" />
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-t border-white/10 pt-5 overflow-hidden">
                  <h4 className="text-3xl font-medium uppercase tracking-tight text-white transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-3">
                    {item.title}
                  </h4>
                  
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-transparent text-white transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:border-white group-hover:bg-white group-hover:text-black">
                    <svg 
                      className="absolute h-4 w-4 -translate-x-10 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0" 
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                    <svg 
                      className="absolute h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-10" 
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
