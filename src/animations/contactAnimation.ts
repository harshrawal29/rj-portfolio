import { gsap } from '../utils/gsap'
import { DURATIONS, EASING, SCROLL_START } from '../utils/animationPresets'

export function createContactAnimation(section: HTMLElement) {
  const content = section.querySelector('[data-contact-content]')

  return gsap.from(content, {
    y: 48,
    opacity: 0,
    duration: DURATIONS.md,
    ease: EASING.primary,
    scrollTrigger: {
      trigger: section,
      start: SCROLL_START.compact,
      once: true,
    },
  })
}
