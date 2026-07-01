import { useState } from 'react'
import type { Gallery3Block as Gallery3BlockType } from '../../types/portfolio'

export default function Gallery3Block({ block }: { block: Gallery3BlockType }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="editorial-g3">
      {block.images.map((img, i) => {
        const isActive = activeIndex === i
        return (
          <div
            key={i}
            className={`editorial-g3__panel ${isActive ? 'is-active' : ''}`}
            onMouseEnter={() => setActiveIndex(i)}
            onClick={() => setActiveIndex(i)}
          >
            <div className="editorial-g3__bg">
              <img src={img.src} alt={img.alt ?? ''} loading="lazy" />
            </div>
            
            <div className="editorial-g3__content">
              {/* Compressed State Title */}
              <div className="editorial-g3__title-compressed">
                {img.title || `Panel ${i + 1}`}
              </div>

              {/* Expanded State Content */}
              <div className="editorial-g3__content-expanded">
                {img.title && <h3 className="editorial-g3__title">{img.title}</h3>}
                {img.description && <p className="editorial-g3__desc">{img.description}</p>}
                {img.metadata && <span className="editorial-g3__meta">{img.metadata}</span>}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
