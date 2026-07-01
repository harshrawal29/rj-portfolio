import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Gallery2Block as Gallery2BlockType } from '../../types/portfolio'

gsap.registerPlugin(ScrollTrigger)

export default function Gallery2Block({ block }: { block: Gallery2BlockType }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const images = ref.current?.querySelectorAll('.editorial-g2__item')
      if (images?.length) {
        gsap.fromTo(
          images,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
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
    <div ref={ref} className="editorial-g2">
      {block.images.map((img, i) => (
        <div key={i} className="editorial-g2__item">
          <img src={img.src} alt={img.alt ?? ''} loading="lazy" />
        </div>
      ))}
    </div>
  )
}
