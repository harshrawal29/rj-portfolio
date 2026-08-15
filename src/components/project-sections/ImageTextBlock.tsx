import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ImageTextBlock as ImageTextBlockType } from '../../types/portfolio'

gsap.registerPlugin(ScrollTrigger)

export default function ImageTextBlock({ block, index }: { block: ImageTextBlockType; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const variant = block.variant ?? (index % 2 === 0 ? 'text-image' : 'image-text')

  useEffect(() => {
    const ctx = gsap.context(() => {
      const textEls = ref.current?.querySelectorAll('.editorial-it__text-inner > *')
      const imgEls = ref.current?.querySelectorAll('.editorial-it__media')

      if (textEls?.length) {
        gsap.fromTo(
          textEls,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      if (imgEls?.length) {
        gsap.fromTo(
          imgEls,
          { scale: 1.05, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
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

  if (variant === 'text-text') {
    return (
      <div ref={ref} className="editorial-it editorial-it--text-text" style={{ padding: '80px 16px', alignItems: 'start' }}>
        <div className="editorial-it__text">
          <div className="editorial-it__text-inner">
            {block.label && <span className="editorial-it__label">{block.label}</span>}
            {block.heading && <h3 className="editorial-it__heading" style={{ margin: 0, marginBottom: block.body ? '20px' : '0' }}>{block.heading}</h3>}
            {block.body && (
              <p
                className="editorial-it__body"
                dangerouslySetInnerHTML={{ __html: block.body }}
              />
            )}
          </div>
        </div>
        <div className="editorial-it__text">
          <div className="editorial-it__text-inner">
            {block.labelRight && <span className="editorial-it__label">{block.labelRight}</span>}
            {block.headingRight && <h3 className="editorial-it__heading" style={{ margin: 0, marginBottom: block.bodyRight ? '20px' : '0' }}>{block.headingRight}</h3>}
            {block.bodyRight && (
              <p
                className="editorial-it__body"
                dangerouslySetInnerHTML={{ __html: block.bodyRight }}
              />
            )}
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'image-image') {
    return (
      <div ref={ref} className="editorial-it editorial-it--text-text" style={{ padding: '80px 16px', alignItems: 'center' }}>
        <div className="editorial-it__image" style={{ width: '100%', flex: 1 }}>
          {block.src && (
            block.src.endsWith('.mp4') || block.src.endsWith('.webm') ? (
              <video
                className="editorial-it__media"
                src={block.src}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
            ) : (
              <img
                className="editorial-it__media"
                src={block.src}
                alt={block.alt ?? ''}
                loading="lazy"
              />
            )
          )}
        </div>
        <div className="editorial-it__image" style={{ width: '100%', flex: 1 }}>
          {block.mediaRight && (
            block.mediaRight.endsWith('.mp4') || block.mediaRight.endsWith('.webm') ? (
              <video
                className="editorial-it__media"
                src={block.mediaRight}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
            ) : (
              <img
                className="editorial-it__media"
                src={block.mediaRight}
                alt={block.altRight ?? ''}
                loading="lazy"
              />
            )
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={`editorial-it ${variant === 'image-text' ? 'editorial-it--reversed' : ''}`}
    >
      <div className="editorial-it__text">
        <div className="editorial-it__text-inner">
          {block.label && <span className="editorial-it__label">{block.label}</span>}
          <h3 className="editorial-it__heading">{block.heading}</h3>
          <p
            className="editorial-it__body"
            dangerouslySetInnerHTML={{ __html: block.body }}
          />
        </div>
      </div>
      <div className="editorial-it__image">
        {block.src && (
          block.src.endsWith('.mp4') || block.src.endsWith('.webm') ? (
            <video
              className="editorial-it__media"
              src={block.src}
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
            />
          ) : (
            <img
              className="editorial-it__media"
              src={block.src}
              alt={block.alt ?? ''}
              loading="lazy"
            />
          )
        )}
      </div>
    </div>
  )
}
