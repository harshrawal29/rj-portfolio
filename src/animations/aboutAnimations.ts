import { gsap, ScrollTrigger } from '../utils/gsap'

export function createAboutHeroAnimation(section: HTMLElement) {
  const lines = section.querySelectorAll<HTMLElement>('[data-about-hero-line]')
  const meta = section.querySelectorAll<HTMLElement>('[data-about-hero-meta]')

  if (lines.length === 0) return

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 72%',
    },
  })

  timeline
    .from(lines, {
      yPercent: 110,
      opacity: 0,
      duration: 1.1,
      stagger: 0.12,
      ease: 'power3.out',
    })
    .from(
      meta,
      {
        y: 32,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: 'power3.out',
      },
      '-=0.75',
    )

  return () => timeline.kill()
}

export function createAboutStoryAnimation(section: HTMLElement) {
  const panel = section.querySelector<HTMLElement>('[data-about-story-panel]')
  const paragraphs = section.querySelectorAll<HTMLElement>('[data-about-story-paragraph]')
  const img = section.querySelector<HTMLElement>('[data-about-story-image]')

  if (!panel) return

  const mm = gsap.matchMedia()

  mm.add('(min-width: 768px)', () => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 1,
      },
    })

    const totalDuration = paragraphs.length > 0 ? 1 + 0.5 * (paragraphs.length - 1) : 1

    if (img) {
      timeline.fromTo(
        img,
        { scale: 1 },
        {
          scale: 1.15,
          duration: totalDuration,
          ease: 'none',
        },
        0
      )
    }

    if (paragraphs.length > 0) {
      timeline.fromTo(
        paragraphs,
        { opacity: 0.15, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.5,
          duration: 1,
          ease: 'power2.out',
        },
        0
      )
    }

    return () => timeline.kill()
  })

  // Mobile animation (no pin, just standard reveal)
  mm.add('(max-width: 767px)', () => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        end: 'bottom 60%',
        scrub: 1,
      },
    })

    if (img) {
      timeline.fromTo(img, { scale: 1 }, { scale: 1.1, ease: 'none' }, 0)
    }

    if (paragraphs.length > 0) {
      timeline.fromTo(
        paragraphs,
        { opacity: 0.15, y: 30 },
        { opacity: 1, y: 0, stagger: 0.2, ease: 'power1.out' },
        0
      )
    }

    return () => timeline.kill()
  })

  return () => mm.revert()
}

export function createAboutExpertiseAnimation(section: HTMLElement) {
  const panel = section.querySelector<HTMLElement>('[data-expertise-panel]')
  const track = section.querySelector<HTMLElement>('[data-cards-track]')
  const cards = section.querySelectorAll<HTMLElement>('[data-expertise-card]')

  if (!panel || !track || cards.length === 0) return

  const mm = gsap.matchMedia()

  mm.add(
    {
      desktop: '(min-width: 1024px)',
      tablet: '(min-width: 768px) and (max-width: 1023px)',
      mobile: '(max-width: 767px)',
    },
    () => {
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth
        const viewportWidth = window.innerWidth
        return -(trackWidth - viewportWidth)
      }

      // 1. Separate Pin Trigger
      // This ensures the section only pins when it hits the top of the screen
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${track.scrollWidth}`,
        pin: true,
        invalidateOnRefresh: true,
      })

      // 2. Main Animation Timeline
      // This starts at top 80% so the first cards reveal BEFORE the pin happens
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          // End extends through the pin distance
          end: () => `+=${track.scrollWidth + window.innerHeight * 0.8}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      // Horizontal Scroll (Delayed until 4th card, synchronized with the timeline's scale)
      timeline.to(
        track,
        {
          x: getScrollAmount,
          ease: 'power1.inOut',
          duration: 0.5,
        },
        0.5, // Start moving at 50% of the combined scroll distance
      )

      // Cards: Reveal one by one strictly tied to scroll
      const entranceRotations = [8, -6, 10, -8, 7, -9]
      const settledRotations = [-1.2, 1.5, -0.8, 1.0, -1.8, 0.6]

      cards.forEach((card, i) => {
        const startRotation = entranceRotations[i % entranceRotations.length]
        const finalRotation = settledRotations[i % settledRotations.length]

        // Stagger entrance times. First card starts at 0 (top 80%).
        const startTime = i * (0.8 / (cards.length - 1 || 1))

        timeline.fromTo(
          card,
          {
            x: 100, // Enter from right
            opacity: 0,
            rotation: startRotation,
          },
          {
            x: 0,
            opacity: 1,
            rotation: finalRotation,
            duration: 0.15,
            ease: 'power2.out',
          },
          startTime,
        )
      })

      // ── Subtle floating effect continuously playing ──
      cards.forEach((card, i) => {
        const floatY = i % 2 === 0 ? -2.5 : 2.5
        gsap.to(card, {
          y: floatY,
          duration: 2.8 + i * 0.15,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.25,
        })
      })

      return () => {
        timeline.kill()
        gsap.killTweensOf(cards)
      }
    },
  )

  return () => mm.revert()
}

export function createAboutInspirationAnimation(section: HTMLElement) {
  const panel = section.querySelector<HTMLElement>('[data-about-inspiration-panel]')
  const items = section.querySelectorAll<HTMLElement>('[data-inspiration-item]')
  const texts = section.querySelectorAll<HTMLElement>('[data-inspiration-text]')
  const textsBold = section.querySelectorAll<HTMLElement>('[data-inspiration-text-bold]')
  const textsThin = section.querySelectorAll<HTMLElement>('[data-inspiration-text-thin]')
  const images = section.querySelectorAll<HTMLElement>('[data-inspiration-image]')
  const numbers = section.querySelectorAll<HTMLElement>('[data-inspiration-number]')
  const marker = section.querySelector<HTMLElement>('[data-inspiration-marker]')
  const progress = section.querySelector<HTMLElement>('[data-inspiration-progress]')
  const track = section.querySelector<HTMLElement>('[data-inspiration-track]')
  const scrollLabel = section.querySelector<HTMLElement>('[data-about-inspiration-scroll-label]')

  if (!panel || items.length === 0) return

  const mm = gsap.matchMedia()

  mm.add(
    {
      desktop: '(min-width: 1024px)',
      tablet: '(min-width: 768px) and (max-width: 1023px)',
      mobile: '(max-width: 767px)',
    },
    () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
          pin: panel,
          pinSpacing: true,
          scrub: 1,
        },
      })

      const getMarkerY = (index: number) => {
        if (!items[index] || !numbers[index] || !track) return 0;
        const trackParent = track.parentElement;
        if (!trackParent) return 0;
        const parentRect = trackParent.getBoundingClientRect();
        const numRect = numbers[index].getBoundingClientRect();
        return (numRect.top - parentRect.top) + (numRect.height / 2) - 4;
      }

      if (marker && items.length > 0) {
        gsap.set(marker, { y: getMarkerY(0) })
      }
      
      if (track && items.length > 0) {
        const startY = getMarkerY(0) + 4; // Account for the dot's height center
        const endY = getMarkerY(items.length - 1) + 4;
        gsap.set(track, { y: startY, height: endY - startY })
      }

      if (progress && items.length > 0) {
        gsap.set(progress, { y: getMarkerY(0) + 4, height: 0 })
      }

      if (scrollLabel) {
        timeline.to(scrollLabel, { opacity: 0, duration: 0.5, ease: 'power2.out' }, 0)
      }

      for (let i = 0; i < items.length - 1; i++) {
        const next = i + 1

        // Deactivate current
        timeline.to(
          items[i],
          { color: 'rgba(0,0,0,0.2)', duration: 1, ease: 'power2.inOut' },
          i * 2
        )
        timeline.to(
          texts[i],
          { scale: 1, duration: 1, ease: 'power2.inOut' },
          i * 2
        )
        if (textsBold[i] && textsThin[i]) {
          timeline.to(textsBold[i], { opacity: 0, duration: 1, ease: 'power2.inOut' }, i * 2)
          timeline.to(textsThin[i], { opacity: 1, duration: 1, ease: 'power2.inOut' }, i * 2)
        }

        // Activate next
        timeline.to(
          items[next],
          { color: '#111111', duration: 1, ease: 'power2.inOut' },
          i * 2
        )
        timeline.to(
          texts[next],
          { scale: 1.02, duration: 1, ease: 'power2.inOut' },
          i * 2
        )
        if (textsBold[next] && textsThin[next]) {
          timeline.to(textsBold[next], { opacity: 1, duration: 1, ease: 'power2.inOut' }, i * 2)
          timeline.to(textsThin[next], { opacity: 0, duration: 1, ease: 'power2.inOut' }, i * 2)
        }
        
        timeline.to(
          numbers[next],
          { opacity: 1, fontWeight: 600, scale: 1.2, duration: 1, ease: 'power2.inOut' },
          i * 2
        )

        // Move marker & fill progress
        if (marker) {
          timeline.to(
            marker,
            { y: getMarkerY(next), duration: 1, ease: 'power2.inOut' },
            i * 2
          )
        }
        if (progress) {
          timeline.to(
            progress,
            { height: getMarkerY(next) - getMarkerY(0), duration: 1, ease: 'power2.inOut' },
            i * 2
          )
        }

        // Crossfade image
        timeline.to(
          images[i],
          { opacity: 0, scale: 1.05, duration: 1, ease: 'power2.inOut' },
          i * 2
        )
        timeline.to(
          images[next],
          { opacity: 1, scale: 1, duration: 1, ease: 'power2.inOut' },
          i * 2
        )
      }

      // Small pause at the end so the last item is readable before unpinning
      timeline.to({}, { duration: 0.5 })

      return () => timeline.kill()
    }
  )

  return () => mm.revert()
}

export function createAboutClosingAnimation(section: HTMLElement) {
  const lines = section.querySelectorAll<HTMLElement>('[data-about-closing-line]')
  const note = section.querySelector<HTMLElement>('[data-about-closing-note]')

  if (lines.length === 0) return

  const timeline = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  })

  timeline
    .fromTo(
      lines,
      { opacity: 0.18, yPercent: 18, scale: 0.94 },
      { opacity: 1, yPercent: 0, scale: 1.05, stagger: 0.08, duration: 0.55 },
      0,
    )
    .fromTo(note, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.22 }, 0.08)

  return () => timeline.kill()
}
