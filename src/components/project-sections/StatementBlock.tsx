import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { StatementBlock as StatementBlockType } from '../../types/portfolio'

gsap.registerPlugin(ScrollTrigger)

export default function StatementBlock({ block }: { block: StatementBlockType }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = ref.current?.querySelector('.editorial-statement__text')
      if (el) {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="editorial-statement">
      <blockquote className="editorial-statement__text">
        &ldquo;{block.text}&rdquo;
      </blockquote>
    </div>
  )
}
