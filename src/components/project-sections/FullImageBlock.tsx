import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { FullImageBlock as FullImageBlockType } from '../../types/portfolio'

gsap.registerPlugin(ScrollTrigger)

export default function FullImageBlock({ block }: { block: FullImageBlockType }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const img = ref.current?.querySelector('img')
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.05, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="editorial-full-image">
      <div className="editorial-full-image__wrapper">
        <img
          src={block.src}
          alt={block.alt ?? ''}
          loading="lazy"
        />
      </div>
      {block.caption && (
        <p className="editorial-full-image__caption">{block.caption}</p>
      )}
    </div>
  )
}
