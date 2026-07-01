import { gsap } from '../utils/gsap'
import { DURATIONS, EASING, STAGGER } from '../utils/animationPresets'

export function createHeroAnimation(section: HTMLElement) {
  const revealItems = section.querySelectorAll('[data-reveal]')
  const fadeItems = section.querySelectorAll('[data-fade]')
  const indicator = section.querySelector('[data-scroll-indicator]')
  const backdrop = section.querySelector('[data-hero-backdrop]')

  const timeline = gsap.timeline({ defaults: { ease: EASING.primary } })

  if (backdrop) {
    timeline.from(backdrop, {
      opacity: 0,
      scale: 0.92,
      duration: DURATIONS.xl,
    })
  }

  if (revealItems.length > 0) {
    timeline.from(
      revealItems,
      {
        yPercent: 115,
        duration: DURATIONS.lg,
        stagger: STAGGER.base,
      },
      '-=0.65',
    )
  }

  if (fadeItems.length > 0) {
    timeline.from(
      fadeItems,
      {
        y: 32,
        opacity: 0,
        duration: DURATIONS.md,
        stagger: STAGGER.relaxed,
      },
      '-=0.6',
    )
  }

  if (indicator) {
    timeline.from(
      indicator,
      {
        y: 20,
        opacity: 0,
        duration: DURATIONS.sm,
      },
      '-=0.45',
    )
  }

  return timeline
}
