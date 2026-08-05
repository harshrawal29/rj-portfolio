import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Quote } from '../../data/inspirations'

gsap.registerPlugin(ScrollTrigger)

export interface InspirationQuoteProps {
  quote: Quote
}

export function InspirationQuote({ quote }: InspirationQuoteProps) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray('.quote-word')

      gsap.fromTo(words,
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 1.2,
          stagger: 0.03,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )

      if (quote.author) {
        gsap.fromTo('.quote-author',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [quote])

  const words = quote.text.split(' ')

  return (
    <section ref={containerRef} className="bg-white/5 px-6 py-24 md:px-12 lg:py-24">
      <div className="mx-auto max-w-5xl text-center">
        <blockquote className="text-4xl italic leading-[1.2] tracking-tight text-white md:text-6xl lg:text-[5rem]">
          {words.map((word, i) => {
            const isFirst = i === 0
            const isLast = i === words.length - 1
            const displayWord = `${isFirst ? '"' : ''}${word}${isLast ? '"' : ''}`

            return (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <span className="quote-word inline-block translate-y-[100%] opacity-0 mr-[0.2em] pb-2">
                  {displayWord}
                </span>
              </span>
            )
          })}
        </blockquote>
        {quote.author && (
          <p className="quote-author mt-12 text-xs uppercase tracking-[0.4em] text-white/50 md:mt-16 md:text-sm">
            — {quote.author}
          </p>
        )}
      </div>
    </section>
  )
}
