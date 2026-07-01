import type { RefObject } from 'react'
import { gsap } from '../utils/gsap'

type ElementRef = RefObject<HTMLElement | null>

type MenuAnimationRefs = {
  overlayRef: ElementRef
  itemRefs: RefObject<HTMLElement | null>[]
  previewCardRef: ElementRef
}

export function createMenuTimeline({ overlayRef, itemRefs, previewCardRef }: MenuAnimationRefs) {
  if (!overlayRef.current) return null

  const overlay = overlayRef.current
  const items = itemRefs.map((ref) => ref.current).filter(Boolean) as HTMLElement[]
  const previewCard = previewCardRef.current

  gsap.set(overlay, {
    pointerEvents: 'none',
    clipPath: 'inset(0 0 100% 0)',
  })

  gsap.set(items, {
    y: 100,
    opacity: 0,
  })

  if (previewCard) {
    gsap.set(previewCard, {
      autoAlpha: 0,
      y: 24,
      scale: 0.98,
    })
  }

  return gsap
    .timeline({ paused: true })
    .set(overlay, { pointerEvents: 'auto' })
    .to(overlay, {
      clipPath: 'inset(0 0 0% 0)',
      duration: 1.2,
      ease: 'power4.inOut',
    })
    .to(
      items,
      {
        y: 0,
        opacity: 1,
        duration: 0.95,
        stagger: 0.08,
        ease: 'power4.out',
      },
      '-=0.6',
    )
    .to(
      previewCard ?? [],
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
      },
      '-=0.6',
    )
}
