import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ImageTextBlock as ImageTextBlockType } from '../../types/portfolio'

gsap.registerPlugin(ScrollTrigger)

function isVideo(url?: unknown): boolean {
  if (!url || typeof url !== 'string') return false
  const cleanUrl = url.split('?')[0].toLowerCase()
  return (
    cleanUrl.endsWith('.mp4') ||
    cleanUrl.endsWith('.webm') ||
    cleanUrl.endsWith('.mov') ||
    cleanUrl.endsWith('.ogg') ||
    cleanUrl.includes('/videos/') ||
    url.includes('video/mp4') ||
    url.includes('video/webm')
  )
}

function getMediaUrl(val: unknown): string {
  if (!val) return ''
  if (typeof val === 'string') return val
  if (typeof val === 'object' && val !== null) {
    if ('asset' in val && typeof (val as any).asset?.url === 'string') {
      return (val as any).asset.url
    }
    if ('url' in val && typeof (val as any).url === 'string') {
      return (val as any).url
    }
  }
  return ''
}

export default function ImageTextBlock({ block, index }: { block: ImageTextBlockType; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const variant = block.variant ?? (index % 2 === 0 ? 'text-image' : 'image-text')

  const leftMediaSrc = getMediaUrl(block.src || (block as any).media)
  const rightMediaSrc = getMediaUrl(block.mediaRight)

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

  const labelStyle = block.textColor ? { color: block.textColor, opacity: 0.6 } : undefined
  const headingStyle = block.textColor ? { color: block.textColor } : undefined
  const bodyStyle = block.textColor ? { color: block.textColor, opacity: 0.85 } : undefined

  if (variant === 'text-text') {
    return (
      <div className="editorial-it-container">
        <div
          ref={ref}
          className="editorial-it editorial-it--text-text"
          style={{
            paddingTop: '80px',
            paddingBottom: '80px',
            alignItems: 'start',
            ...(block.backgroundColor ? { backgroundColor: block.backgroundColor } : {})
          }}
        >
          <div className="editorial-it__text">
            <div className="editorial-it__text-inner">
              {block.label && <span className="editorial-it__label" style={labelStyle}>{block.label}</span>}
              {block.heading && (
                <h3
                  className="editorial-it__heading"
                  style={{ margin: 0, marginBottom: block.body ? '20px' : '0', ...(headingStyle || {}) }}
                >
                  {block.heading}
                </h3>
              )}
              {block.body && (
                <p
                  className="editorial-it__body"
                  style={bodyStyle}
                  dangerouslySetInnerHTML={{ __html: block.body }}
                />
              )}
            </div>
          </div>
          <div className="editorial-it__text">
            <div className="editorial-it__text-inner">
              {block.labelRight && <span className="editorial-it__label" style={labelStyle}>{block.labelRight}</span>}
              {block.headingRight && (
                <h3
                  className="editorial-it__heading"
                  style={{ margin: 0, marginBottom: block.bodyRight ? '20px' : '0', ...(headingStyle || {}) }}
                >
                  {block.headingRight}
                </h3>
              )}
              {block.bodyRight && (
                <p
                  className="editorial-it__body"
                  style={bodyStyle}
                  dangerouslySetInnerHTML={{ __html: block.bodyRight }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'image-image') {
    return (
      <div className="editorial-it-container">
        <div
          ref={ref}
          className="editorial-it editorial-it--text-text"
          style={{
            paddingTop: '80px',
            paddingBottom: '80px',
            alignItems: 'center',
            ...(block.backgroundColor ? { backgroundColor: block.backgroundColor } : {})
          }}
        >
          <div className="editorial-it__image" style={{ width: '100%', flex: 1 }}>
            {leftMediaSrc && (
              isVideo(leftMediaSrc) ? (
                <video
                  className="editorial-it__media"
                  src={leftMediaSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                />
              ) : (
                <img
                  className="editorial-it__media"
                  src={leftMediaSrc}
                  alt={block.alt ?? ''}
                  loading="lazy"
                />
              )
            )}
          </div>
          <div className="editorial-it__image" style={{ width: '100%', flex: 1 }}>
            {rightMediaSrc && (
              isVideo(rightMediaSrc) ? (
                <video
                  className="editorial-it__media"
                  src={rightMediaSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                />
              ) : (
                <img
                  className="editorial-it__media"
                  src={rightMediaSrc}
                  alt={block.altRight ?? ''}
                  loading="lazy"
                />
              )
            )}
          </div>
        </div>
      </div>
    )
  }

  const activeLabel = variant === 'image-text' ? (block.labelRight || block.label) : (block.label || block.labelRight)
  const activeHeading = variant === 'image-text' ? (block.headingRight || block.heading) : (block.heading || block.headingRight)
  const activeBody = variant === 'image-text' ? (block.bodyRight || block.body) : (block.body || block.bodyRight)

  return (
    <div className="editorial-it-container">
      <div
        ref={ref}
        className={`editorial-it ${variant === 'image-text' ? 'editorial-it--reversed' : ''}`}
      >
        <div
          className="editorial-it__text"
          style={block.backgroundColor ? { backgroundColor: block.backgroundColor } : undefined}
        >
          <div className="editorial-it__text-inner">
            {activeLabel && <span className="editorial-it__label" style={labelStyle}>{activeLabel}</span>}
            {activeHeading && <h3 className="editorial-it__heading" style={headingStyle}>{activeHeading}</h3>}
            {activeBody && (
              <p
                className="editorial-it__body"
                style={bodyStyle}
                dangerouslySetInnerHTML={{ __html: activeBody }}
              />
            )}
          </div>
        </div>
        <div className="editorial-it__image">
          {leftMediaSrc && (
            isVideo(leftMediaSrc) ? (
              <video
                className="editorial-it__media"
                src={leftMediaSrc}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
            ) : (
              <img
                className="editorial-it__media"
                src={leftMediaSrc}
                alt={block.alt ?? ''}
                loading="lazy"
              />
            )
          )}
        </div>
      </div>
    </div>
  )
}
