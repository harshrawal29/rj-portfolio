import { useEffect, useRef } from 'react'
import gsap from 'gsap'

type LoaderProps = {
  onComplete: () => void
}

// Curated project images: Album Covers, Packaging, Branding, Mockups
export const SHOWCASE_IMAGES = [
  '/projects/muskarao-na-song/muskurao-na-final.jpg',
  '/projects/halke-phulke-redesign/cover.png',
  '/projects/maysha/cover.jpeg',
  '/projects/sirhane-pe/final.jpg',
  '/projects/thode-se-hum-tum/final.jpg',
  '/projects/zenora-candles/cover.jpg',
  '/projects/the-boba/can-packaging/01.jpg',
  '/projects/halke-phulke-redesign/mockups/packaging-mockup-1.jpg',
  '/projects/the-boba/bottle-packaging/strawberry.png',
]

function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true

    const container = containerRef.current
    if (!container) return

    const preloadPromises = SHOWCASE_IMAGES.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image()
          img.onload = () => resolve()
          img.onerror = () => resolve()
          img.src = src
        })
    )

    Promise.all(preloadPromises).then(() => {
      runAnimation(container, onComplete)
    })
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-[100] pointer-events-none"
    >
      {/* Black backdrop */}
      <div className="intro-backdrop absolute inset-0 bg-[#050505] z-[1]" />

      {/* Full-screen collage — hidden initially, revealed as text scales up */}
      <div className="intro-collage absolute inset-0 z-[2] overflow-hidden" style={{ opacity: 0 }}>
        <div className="absolute inset-0 grid grid-rows-3 gap-[2px] transform-gpu">
          <div className="grid grid-cols-3 gap-[2px]">
            {SHOWCASE_IMAGES.slice(0, 3).map((src, i) => (
              <div key={i} className="collage-item relative overflow-hidden">
                <img src={src} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-[2px]">
            {SHOWCASE_IMAGES.slice(3, 5).map((src, i) => (
              <div key={i} className="collage-item relative overflow-hidden">
                <img src={src} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-[2px]">
            {SHOWCASE_IMAGES.slice(5, 9).map((src, i) => (
              <div key={i} className="collage-item relative overflow-hidden">
                <img src={src} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/40 to-[#050505]/80" />
      </div>

      {/* Multiply Mask Container — Stage 3 & 4 */}
      <div
        className="intro-multiply-mask absolute inset-0 z-[3] flex flex-col items-center justify-center bg-[#050505] pointer-events-none"
        style={{ mixBlendMode: 'multiply' }}
      >
        <div className="intro-mask-scaler flex flex-col items-center leading-none will-change-transform transform-gpu">
          <h1 className="intro-name-riya text-[20vw] sm:text-[16vw] md:text-[13vw] font-semibold uppercase leading-[0.85] tracking-[-0.06em] text-white text-center">
            Riya
          </h1>
          <h1 className="intro-name-jethani text-[20vw] sm:text-[16vw] md:text-[13vw] font-semibold uppercase leading-[0.85] tracking-[-0.06em] text-white text-center">
            Jethani
          </h1>
        </div>
      </div>

      {/* Solid White Text — Stage 2 */}
      <div className="absolute inset-0 flex items-center justify-center z-[4] pointer-events-none">
        <div className="intro-solid-scaler flex flex-col items-center leading-none will-change-transform transform-gpu">
          <h1 className="intro-name-riya text-[20vw] sm:text-[16vw] md:text-[13vw] font-semibold uppercase leading-[0.85] tracking-[-0.06em] text-white text-center">
            Riya
          </h1>
          <h1 className="intro-name-jethani text-[20vw] sm:text-[16vw] md:text-[13vw] font-semibold uppercase leading-[0.85] tracking-[-0.06em] text-white text-center">
            Jethani
          </h1>
        </div>
      </div>

      {/* Eyebrow */}
      <div className="absolute inset-0 flex items-center justify-center z-[5] pointer-events-none">
        <span className="intro-eyebrow absolute text-[10px] sm:text-xs font-medium uppercase tracking-[0.5em] text-white/60">
          Select Visual Worlds
        </span>
      </div>
    </div>
  )
}

function runAnimation(container: HTMLDivElement, onComplete: () => void) {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete()
      },
    })

    // ── Initial state ──────────────────────────────────────────
    gsap.set('.intro-eyebrow', { opacity: 0 })
    gsap.set('.intro-name-line', { opacity: 0, y: 50 })
    gsap.set('.intro-name-riya', {
      opacity: 0,
      y: -120,
    })

    gsap.set('.intro-name-jethani', {
      opacity: 0,
      y: 120,
    })
    gsap.set('.intro-collage', { opacity: 0 })
    gsap.set('.collage-item', {
      scale: 0,
      rotation: () => gsap.utils.random(-20, 20),
      x: () => gsap.utils.random(-300, 300),
      y: () => gsap.utils.random(-200, 200),
    })
    gsap.set('.intro-multiply-mask', { opacity: 1 })

    // ── Stage 1 — Eyebrow ────────────────────────────────────
    tl.to('.intro-eyebrow', {
      opacity: 0.5,
      duration: 0.8,
      ease: 'power2.out',
    }, '+=0.3')

    tl.to({}, { duration: 0.5 })

    // ── Stage 2 — Name reveal ────────────────────────────────
    tl.to('.intro-name-line', {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power3.out',
    })

    // Fade out eyebrow first
    tl.to('.intro-eyebrow', {
      opacity: 0,
      scale: 1.2,
      duration: 0.8,
      ease: 'power2.inOut',
    })

    // Small pause
    tl.to({}, { duration: 0.2 })

    // RIYA from top
    tl.to('.intro-name-riya', {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power4.out',
    })

    // JETHANI from bottom
    tl.to('.intro-name-jethani', {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power4.out',
    }, '<0')

    tl.to({}, { duration: 0.6 })

    // ── Stage 3 — Images fill the letters ────────────────────
    // Hide text
    tl.to('.intro-solid-scaler', {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
    })

    // Reveal collage container
    tl.to('.intro-collage', {
      opacity: 1,
      duration: 0.3,
    }, '<')

    // Images assemble into place
    tl.to('.collage-item', {
      scale: 1,
      rotation: 0,
      x: 0,
      y: 0,
      stagger: 0.08,
      duration: 1.4,
      ease: 'power4.out',
    }, '<')

    // ── Stage 4 — Text scales up, collage emerges behind ─────
    tl.to('.intro-collage', {
      scale: 1.15,
      duration: 2,
      ease: 'power2.inOut',
    }, '-=0.3')

    tl.to(['.intro-mask-scaler', '.intro-solid-scaler'], {
      scale: 18,
      duration: 2,
      ease: 'power4.inOut',
    }, '<')

    tl.to('.intro-multiply-mask', {
      opacity: 0,
      duration: 1.2,
      ease: 'power2.inOut',
    }, '<0.8')

    tl.to({}, { duration: 0.4 })

    // No Stage 5 fade-out here. We just unmount instantly and let HeroSection take over seamlessly.
  }, container)

  return () => ctx.revert()
}

export default Loader
