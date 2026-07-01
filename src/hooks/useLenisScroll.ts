import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

declare global {
  interface Window {
    lenis: Lenis
  }
}

export function useLenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.05, // Lower lerp value makes it smoother (default ~0.1)
      wheelMultiplier: 0.6, // Slightly softer mouse wheel feeling
      syncTouch: true, // Smooth scrolling on touch devices as well
    })

    window.lenis = lenis

    let frameId = 0

    const onFrame = (time: number) => {
      lenis.raf(time)
      frameId = window.requestAnimationFrame(onFrame)
    }

    const onAnchorClick = (event: MouseEvent) => {
      const target = event.target

      if (!(target instanceof Element)) return

      const anchor = target.closest('a[href^="#"]')
      if (!(anchor instanceof HTMLAnchorElement)) return

      const href = anchor.getAttribute('href')
      if (!href || href === '#') return

      const destination = document.querySelector<HTMLElement>(href)
      if (!destination) return

      event.preventDefault()
      lenis.scrollTo(destination)
      window.history.pushState(null, '', href)
    }

    frameId = window.requestAnimationFrame(onFrame)
    document.addEventListener('click', onAnchorClick)

    return () => {
      window.cancelAnimationFrame(frameId)
      document.removeEventListener('click', onAnchorClick)
      // @ts-expect-error - TS doesn't know about lenis on window
      delete window.lenis
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.slice(1)
      const el = document.getElementById(hash)
      if (el && window.lenis) {
        // Wait a short moment for DOM to settle
        setTimeout(() => {
          window.lenis.scrollTo(el, { immediate: true })
        }, 150)
      }
    }
  }, [])
}
