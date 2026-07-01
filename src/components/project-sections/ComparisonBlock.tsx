import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ComparisonBlock as ComparisonBlockType } from '../../types/portfolio'

gsap.registerPlugin(ScrollTrigger)

export default function ComparisonBlock({ block }: { block: ComparisonBlockType }) {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const beforeImgRef = useRef<HTMLImageElement>(null)
  const handleRef = useRef<HTMLDivElement>(null)

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current
    const beforeImg = beforeImgRef.current
    const handle = handleRef.current
    
    if (!container || !beforeImg || !handle) return
    
    const rect = container.getBoundingClientRect()
    const x = clientX - rect.left
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100))
    
    // Direct DOM manipulation guarantees 60/120fps with zero React render lag
    beforeImg.style.clipPath = `inset(0 ${100 - pct}% 0 0)`
    handle.style.left = `${pct}%`
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    // Using requestAnimationFrame to ensure updates happen right before paint, avoiding jitter
    requestAnimationFrame(() => updatePosition(clientX))
  }

  return (
    <div ref={ref} className="editorial-comparison">
      <div className="editorial-comparison__labels">
        <span className="editorial-comparison__label">{block.beforeLabel ?? 'Before'}</span>
        <span className="editorial-comparison__label">{block.afterLabel ?? 'After'}</span>
      </div>
      <div
        ref={containerRef}
        className="editorial-comparison__container"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        style={{ cursor: 'ew-resize' }}
      >
        {/* After image (full width background) */}
        <img
          src={block.after}
          alt="After"
          className="editorial-comparison__img editorial-comparison__img--after"
          draggable={false}
        />

        {/* Before image (clipped) */}
        <img
          ref={beforeImgRef}
          src={block.before}
          alt="Before"
          className="editorial-comparison__img editorial-comparison__img--before"
          style={{ clipPath: `inset(0 50% 0 0)` }}
          draggable={false}
        />

        {/* Slider handle */}
        <div
          ref={handleRef}
          className="editorial-comparison__handle"
          style={{ left: `50%` }}
        >
          <div className="editorial-comparison__handle-line" />
          <div className="editorial-comparison__handle-knob">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 6L4 12L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 6L20 12L15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
