import { gsap } from '../utils/gsap'

export function createStatementAnimation(section: HTMLElement) {
  const container = section.querySelector<HTMLElement>('[data-giant-text-container]')
  const letters = section.querySelectorAll<HTMLElement>('[data-letter]')

  if (!container || letters.length === 0) return

  const timeline = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '+=400%',
      pin: true,
      pinSpacing: true,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  })

  // Set initial position off-screen right for container
  gsap.set(container, { x: () => window.innerWidth })

  // Set initial staggered up/down states for each letter
  letters.forEach((letter, index) => {
    const yOffset = index % 2 === 0 ? -20 : 20
    const rotationOffset = index % 2 === 0 ? -10 : 10
    gsap.set(letter, {
      y: yOffset,
      rotation: rotationOffset,
    })
  })

  // Animate container to off-screen left
  timeline.to(
    container,
    {
      x: () => -container.scrollWidth,
      duration: 1,
    },
    0,
  )

  // Calculate dynamic timing for each letter
  const scrollDistance = window.innerWidth + container.scrollWidth
  const targetScreenX = window.innerWidth * 0.45 // 35% from the left edge of the screen

  letters.forEach((letter) => {
    // container_x = window.innerWidth - (progress * scrollDistance)
    // letter_screen_x = container_x + letter.offsetLeft
    // We want letter_screen_x = targetScreenX when progress = finishProgress
    const finishProgress = (window.innerWidth - targetScreenX + letter.offsetLeft) / scrollDistance

    // Start the alignment a bit before it reaches the target so it finishes exactly there
    const duration = 0.15
    const startProgress = Math.max(0, finishProgress - duration)

    timeline.to(
      letter,
      {
        x: 0,
        y: 0,
        rotation: 0,
        ease: 'power2.out',
        duration: duration,
      },
      startProgress,
    )
  })

  return () => {
    timeline.kill()
  }
}
