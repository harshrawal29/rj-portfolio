import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { VideoBlock as VideoBlockType } from '../../types/portfolio'

gsap.registerPlugin(ScrollTrigger)

export default function VideoBlock({ block }: { block: VideoBlockType }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y: 60, opacity: 0, scale: 1.02 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
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

  return (
    <div ref={ref} className="editorial-video">
      <video
        src={block.src}
        poster={block.poster}
        autoPlay
        muted
        loop
        playsInline
        className="editorial-video__player"
      />
    </div>
  )
}
