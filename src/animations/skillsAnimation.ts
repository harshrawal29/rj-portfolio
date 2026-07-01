import { gsap } from '../utils/gsap'
import { DURATIONS, EASING, SCROLL_START, STAGGER } from '../utils/animationPresets'

export function createSkillsAnimation(section: HTMLElement) {
  const items = section.querySelectorAll('[data-skill-item]')

  return gsap.from(items, {
    y: 36,
    opacity: 0,
    duration: DURATIONS.xs,
    stagger: STAGGER.tight,
    ease: EASING.primary,
    scrollTrigger: {
      trigger: section,
      start: SCROLL_START.compact,
      once: true,
    },
  })
}
