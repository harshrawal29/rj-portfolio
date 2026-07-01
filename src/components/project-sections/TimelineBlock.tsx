import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { TimelineBlock as TimelineBlockType } from '../../types/portfolio'

gsap.registerPlugin(ScrollTrigger)

export default function TimelineBlock({ block }: { block: TimelineBlockType }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const steps = ref.current?.querySelectorAll('.editorial-timeline__step')
      if (steps?.length) {
        gsap.fromTo(
          steps,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="editorial-timeline">
      {block.steps.map((step, i) => (
        <div key={i} className="editorial-timeline__step">
          <span className="editorial-timeline__number">{step.number}</span>
          <div className="editorial-timeline__content">
            <h4 className="editorial-timeline__label">{step.label}</h4>
            <p className="editorial-timeline__desc">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
