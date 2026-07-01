import { gsap } from '../utils/gsap'
import { DURATIONS, EASING, STAGGER } from '../utils/animationPresets'

export function createProjectsAnimation(section: HTMLElement) {
  const items = section.querySelectorAll('[data-project-item]')
  const track = section.querySelector<HTMLElement>('[data-project-track]')

  if (!track || items.length === 0) return

  const mm = gsap.matchMedia()

  mm.add(
    {
      desktop: '(min-width: 1024px)',
      mobile: '(max-width: 1023px)',
    },
    (context) => {
      const { desktop } = context.conditions ?? {}
      const travel = desktop ? '-45%' : '-68%'

      const timeline = gsap.timeline({
        defaults: { ease: EASING.primary },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: desktop ? '+=220%' : '+=160%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      timeline.from(items, {
        y: 48,
        opacity: 0,
        duration: DURATIONS.md,
        stagger: STAGGER.base,
      })

      timeline.to(track, { x: travel, duration: 1 }, 0.15)

      return () => timeline.kill()
    },
  )

  return () => mm.revert()
}
