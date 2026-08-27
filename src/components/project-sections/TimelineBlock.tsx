import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { TimelineBlock as TimelineBlockType } from '../../types/portfolio'

gsap.registerPlugin(ScrollTrigger)

export default function TimelineBlock({ block }: { block: TimelineBlockType }) {
  const ref = useRef<HTMLDivElement>(null)
  const textColor = block.textColor?.trim()
  const steps = block.steps || []

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stepEls = ref.current?.querySelectorAll('.editorial-timeline__step')
      if (stepEls?.length) {
        gsap.fromTo(
          stepEls,
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
    <div
      ref={ref}
      className="editorial-timeline"
      style={textColor ? ({ color: textColor, '--block-text-color': textColor } as React.CSSProperties) : undefined}
    >
      {steps.map((step, i) => (
        <div
          key={i}
          className="editorial-timeline__step"
          style={textColor && textColor.startsWith('#') ? { borderColor: `${textColor}26` } : undefined}
        >
          <span
            className="editorial-timeline__number"
            style={textColor ? { color: textColor, opacity: 0.3 } : undefined}
          >
            {step.number}
          </span>
          <div className="editorial-timeline__content">
            <h4
              className="editorial-timeline__label"
              style={textColor ? { color: textColor } : undefined}
            >
              {step.label}
            </h4>
            <p
              className="editorial-timeline__desc"
              style={textColor ? { color: textColor, opacity: 0.8 } : undefined}
            >
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
