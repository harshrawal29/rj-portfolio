import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { HorizontalScrollBlock as HorizontalScrollBlockType } from '../../types/portfolio'

gsap.registerPlugin(ScrollTrigger)

export default function HorizontalScrollBlock({ block }: { block: HorizontalScrollBlockType }) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.editorial-story__item')
      if (items.length === 0) return

      // Initial Setup: Animate contents inside the fixed item wrappers
      items.forEach((item, i) => {
        const img = item.querySelector('.editorial-story__img-wrapper')
        const caption = item.querySelector('.editorial-story__caption')

        if (i === 0) {
          gsap.set(item, { zIndex: 1 })
          gsap.set(img, { opacity: 1, x: 0, scale: 1 })
          gsap.set(caption, { opacity: 1 })
        } else {
          gsap.set(item, { zIndex: 0 })
          gsap.set(img, { opacity: 0, x: 300, scale: 1.05 })
          gsap.set(caption, { opacity: 0 })
        }
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.5, // Increased smoothing for a buttery feel
          start: 'top 72px',
          end: () => `+=${items.length * 400}vh`,
          invalidateOnRefresh: true,
        },
      })

      items.forEach((item, i) => {
        if (i > 0) {
          const prevItem = items[i - 1]
          const prevImg = prevItem.querySelector('.editorial-story__img-wrapper')
          const prevCaption = prevItem.querySelector('.editorial-story__caption')

          const currImg = item.querySelector('.editorial-story__img-wrapper')
          const currCaption = item.querySelector('.editorial-story__caption')

          // Animate previous item out slowly with ease
          tl.to(prevImg, {
            x: -200, opacity: 0, scale: 0.98, duration: 2.5, ease: 'sine.inOut'
          }, `transition-${i}`)
          
          tl.to(prevCaption, {
            opacity: 0, duration: 2.5, ease: 'sine.inOut'
          }, `transition-${i}`)

          tl.set(prevItem, { zIndex: 0 }, `transition-${i}+=2.5`)

          // Animate current item in slowly with ease
          tl.set(item, { zIndex: 1 }, `transition-${i}`)

          tl.to(currImg, {
            x: 0, opacity: 1, scale: 1, duration: 2.5, ease: 'sine.inOut'
          }, `transition-${i}`)

          tl.to(currCaption, {
            opacity: 1, duration: 2.5, ease: 'sine.inOut'
          }, `transition-${i}`)
        }

        // Hold the image completely still in the center
        tl.to({}, { duration: 1.5 })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="editorial-story">
      <div className="editorial-story__container">
        {block.images.map((img, i) => (
          <div key={i} className="editorial-story__item">
            <div className="editorial-story__img-wrapper">
              <img src={img.src} alt={img.alt ?? ''} draggable={false} />
            </div>
            <div className="editorial-story__caption">
              <span className="editorial-story__counter">
                {String(i + 1).padStart(2, '0')} / {String(block.images.length).padStart(2, '0')}
              </span>
              {img.alt && <span className="editorial-story__desc">{img.alt}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
