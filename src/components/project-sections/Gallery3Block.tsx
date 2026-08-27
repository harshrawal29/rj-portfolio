import { useState } from 'react'
import type { Gallery3Block as Gallery3BlockType } from '../../types/portfolio'

function isVideo(url?: string): boolean {
  if (!url) return false
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

export default function Gallery3Block({ block }: { block: Gallery3BlockType }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="editorial-g3">
      {block.images.map((img, i) => {
        const isActive = activeIndex === i
        const videoMedia = isVideo(img.src)

        return (
          <div
            key={i}
            className={`editorial-g3__panel ${isActive ? 'is-active' : ''}`}
            onMouseEnter={() => setActiveIndex(i)}
            onClick={() => setActiveIndex(i)}
          >
            <div className="editorial-g3__bg">
              {videoMedia ? (
                <video
                  src={img.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img src={img.src} alt={img.alt ?? ''} loading="lazy" />
              )}
            </div>
            
            <div className="editorial-g3__content">
              {/* Compressed State Title */}
              <div
                className="editorial-g3__title-compressed"
                style={block.textColor ? { color: block.textColor } : undefined}
              >
                {img.title || `Panel ${i + 1}`}
              </div>

              {/* Expanded State Content */}
              <div className="editorial-g3__content-expanded">
                {img.title && (
                  <h3
                    className="editorial-g3__title"
                    style={block.textColor ? { color: block.textColor } : undefined}
                  >
                    {img.title}
                  </h3>
                )}
                {img.description && (
                  <p
                    className="editorial-g3__desc"
                    style={block.textColor ? { color: block.textColor, opacity: 0.85 } : undefined}
                  >
                    {img.description}
                  </p>
                )}
                {img.metadata && (
                  <span
                    className="editorial-g3__meta"
                    style={block.textColor ? { color: block.textColor, opacity: 0.6 } : undefined}
                  >
                    {img.metadata}
                  </span>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
