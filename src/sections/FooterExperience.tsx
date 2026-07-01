import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { copy } from '../utils/content'

gsap.registerPlugin(ScrollTrigger)

/* ─── Marquee words ─────────────────────────────────────────── */
const MARQUEE_WORDS = ['CREATE', 'DESIGN', 'INSPIRE']
const REPEAT_COUNT = 6 // enough copies to fill any viewport

/* ─── Contact links ─────────────────────────────────────────── */
const SOCIAL_LINKS = [
  {
    label: 'Resume',
    href: '/resume.pdf',
  },
  {
    label: 'Behance',
    href: 'https://behance.net/riyajethani',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/riyajethani.design',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/riya-jethani-92420b1b3/',
  },
] as const

/* ─── Marquee Row ───────────────────────────────────────────── */
function MarqueeRow({ direction }: { direction: 'left' | 'right' }) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const xFrom = direction === 'left' ? 0 : -50
    const xTo = direction === 'left' ? -50 : 0

    const anim = gsap.fromTo(
      track,
      { xPercent: xFrom },
      {
        xPercent: xTo,
        duration: 50,
        ease: 'none',
        repeat: -1,
      }
    )

      ; (track as any).__marqueeAnim = anim

    return () => {
      anim.kill()
    }
  }, [direction])

  const words = Array.from({ length: REPEAT_COUNT }, () => MARQUEE_WORDS).flat()

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div ref={trackRef} className="footer-marquee-track inline-flex">
        {[0, 1].map((setIdx) => (
          <div key={setIdx} className="inline-flex shrink-0">
            {words.map((word, i) => (
              <span
                key={`${setIdx}-${i}`}
                className="mx-[0.3em] inline-block select-none font-semibold uppercase leading-none tracking-[-0.04em] text-white/5 hover:text-white/20 transition-colors duration-500"
                style={{ fontSize: 'clamp(6rem, 12vw, 14rem)' }}
              >
                {word}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Footer Experience ─────────────────────────────────────── */
export default function FooterExperience() {
  const containerRef = useRef<HTMLElement>(null)
  const foregroundRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const foreground = foregroundRef.current
    const links = linksRef.current
    if (!container || !foreground || !links) return

    const ctx = gsap.context(() => {
      const headingLines = gsap.utils.toArray<HTMLElement>('.footer-heading-line')
      const ctaBtn = container.querySelector('.footer-cta-btn')
      const linkItems = gsap.utils.toArray<HTMLElement>('.footer-contact-item')
      const divider = container.querySelector('.footer-divider-line')
      const tracks = gsap.utils.toArray<HTMLElement>('.footer-marquee-track')

      const resetAll = () => {
        gsap.set(headingLines, { y: 60, opacity: 0 })
        gsap.set(ctaBtn, { y: 24, opacity: 0 })
        gsap.set(linkItems, { y: 30, opacity: 0 })
        gsap.set(divider, { scaleX: 0, transformOrigin: 'left center' })
        gsap.set(foreground, { scale: 1 })
      }

      const playEntrance = () => {
        const tl = gsap.timeline()

        tl.to(headingLines, {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.15,
          ease: 'power4.out',
        })

        tl.to(
          ctaBtn,
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
          },
          '-=0.5'
        )

        tl.to(
          foreground,
          {
            scale: 1.05,
            duration: 1.8,
            ease: 'power2.out',
          },
          '-=0.8'
        )

        tl.to(
          divider,
          {
            scaleX: 1,
            duration: 1,
            ease: 'power3.inOut',
          },
          '-=1.0'
        )

        tl.to(
          linkItems,
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=0.5'
        )
      }

      resetAll()

      ScrollTrigger.create({
        trigger: container,
        start: 'top 80%',
        onEnter: () => playEntrance(),
        onLeaveBack: () => resetAll(),
      })

      ScrollTrigger.create({
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const boost = 1 + Math.abs(self.getVelocity()) / 4000
          tracks.forEach((track) => {
            const anim = (track as any).__marqueeAnim as gsap.core.Tween
            if (anim) {
              gsap.to(anim, {
                timeScale: Math.min(boost, 3),
                duration: 0.4,
                overwrite: true,
              })
            }
          })
        },
      })

      let resetTimeout: ReturnType<typeof setTimeout>
      ScrollTrigger.create({
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: () => {
          clearTimeout(resetTimeout)
          resetTimeout = setTimeout(() => {
            tracks.forEach((track) => {
              const anim = (track as any).__marqueeAnim as gsap.core.Tween
              if (anim) {
                gsap.to(anim, { timeScale: 1, duration: 0.8, overwrite: true })
              }
            })
          }, 200)
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const items = gsap.utils.toArray<HTMLElement>('.footer-link-wrap')
    if (!items.length) return

    const handlers: { el: HTMLElement; enter: () => void; leave: () => void }[] = []
    const tracks = gsap.utils.toArray<HTMLElement>('.footer-marquee-track')

    items.forEach((el) => {
      const primary = el.querySelector('.footer-link-primary') as HTMLElement
      const clone = el.querySelector('.footer-link-clone') as HTMLElement
      const underline = el.querySelector('.footer-link-underline') as HTMLElement

      gsap.set(clone, { yPercent: 0 })
      gsap.set(underline, { scaleX: 0, transformOrigin: 'left center' })

      const enter = () => {
        gsap.to(primary, { yPercent: -100, duration: 0.4, ease: 'power3.inOut' })
        gsap.to(clone, { yPercent: -100, duration: 0.4, ease: 'power3.inOut' })
        gsap.to(underline, { scaleX: 1, duration: 0.5, ease: 'power3.out' })
        tracks.forEach((track) => {
          const anim = (track as any).__marqueeAnim as gsap.core.Tween
          if (anim) gsap.to(anim, { timeScale: 2.5, duration: 0.6, overwrite: true })
        })
      }

      const leave = () => {
        gsap.to(primary, { yPercent: 0, duration: 0.4, ease: 'power3.inOut' })
        gsap.to(clone, { yPercent: 0, duration: 0.4, ease: 'power3.inOut' })
        gsap.to(underline, {
          scaleX: 0,
          transformOrigin: 'right center',
          duration: 0.4,
          ease: 'power3.in',
          onComplete: () => gsap.set(underline, { transformOrigin: 'left center' }),
        })
        tracks.forEach((track) => {
          const anim = (track as any).__marqueeAnim as gsap.core.Tween
          if (anim) gsap.to(anim, { timeScale: 1, duration: 0.8, overwrite: true })
        })
      }

      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
      handlers.push({ el, enter, leave })
    })

    return () => {
      handlers.forEach(({ el, enter, leave }) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
    }
  }, [])

  return (
    <footer
      ref={containerRef}
      id="contact"
      className="relative flex h-screen flex-col overflow-hidden bg-[#050505]"
      aria-labelledby="footer-heading"
    >
      {/* ═══════════ BACKGROUND — Vibrant Glows ═══════════ */}
      <div className="pointer-events-none absolute -top-[10%] left-[5%] z-[1] h-[500px] w-[500px] rounded-full bg-indigo-600/20 mix-blend-screen blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-[10%] right-[5%] z-[1] h-[600px] w-[600px] rounded-full bg-orange-600/15 mix-blend-screen blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_100%)]" />

      {/* ═══════════ BACKGROUND — Marquee typography ═══════════ */}
      <div className="pointer-events-none absolute inset-0 z-[3] flex flex-col justify-center gap-2">
        <MarqueeRow direction="left" />
        <MarqueeRow direction="right" />
        <MarqueeRow direction="left" />
      </div>

      {/* ═══════════ FOREGROUND — Centered content ═══════════ */}
      <div
        ref={foregroundRef}
        className="relative z-[4] flex flex-1 flex-col items-center justify-center px-6"
      >
        {/* Heading */}
        <div className="max-w-5xl text-center">
          <h2
            id="footer-heading"
            className="font-medium leading-[1.05] tracking-[-0.03em] text-white"
            style={{ fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)' }}
          >
            <div className="overflow-hidden pb-[0.15em]">
              <span className="footer-heading-line block will-change-transform">
                Ready to create
              </span>
            </div>
            <div className="overflow-hidden pb-[0.6em] mb-[-0.6em] px-8">
              <span className="footer-heading-line block pb-[0.6em] pt-[0.2em] pr-8 will-change-transform font-extralight text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-indigo-400 whitespace-nowrap leading-[1.3]">
                something meaningful?
              </span>
            </div>
          </h2>
        </div>

        {/* CTA Button */}
        <a
          href={`mailto:${copy.contactEmail}`}
          className="footer-cta-btn group relative mt-12 inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-10 py-4 text-xs font-medium uppercase tracking-[0.3em] text-white transition-all duration-500 hover:scale-[1.05] hover:border-white hover:bg-white hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] sm:mt-16 sm:px-12 sm:py-5 sm:text-sm"
        >
          <span className="relative z-[1] transition-colors duration-500 group-hover:text-black">Start a Project</span>
          <svg
            className="relative z-[1] h-3.5 w-3.5 transition-all duration-500 group-hover:translate-x-1 group-hover:text-black"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* ═══════════ BOTTOM — Contact links ═══════════ */}
      <div ref={linksRef} className="relative z-[4] px-6 pb-10 lg:px-16 lg:pb-14">
        {/* Divider */}
        <div className="footer-divider-line mx-auto mb-10 h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-white/20 to-transparent lg:mb-12" />

        {/* Links row */}
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
          {/* Email */}
          <div className="footer-contact-item">
            <FooterLink
              href={`mailto:${copy.contactEmail}`}
              label={copy.contactEmail}
            />
          </div>

          {/* Social links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 sm:flex-nowrap sm:gap-10">
            {SOCIAL_LINKS.map((link) => (
              <div key={link.label} className="footer-contact-item">
                <FooterLink
                  href={link.href}
                  label={link.label}
                  external
                />
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-contact-item mx-auto mt-10 flex max-w-6xl items-center justify-between text-[10px] uppercase tracking-[0.35em] text-neutral-500 lg:mt-12">
          <span>© {new Date().getFullYear()} Riya Jethani</span>
          <span>Portfolio</span>
        </div>
      </div>
    </footer>
  )
}

/* ─── Premium editorial link with text-swap hover ──────────── */
function FooterLink({
  href,
  label,
  external,
}: {
  href: string
  label: string
  external?: boolean
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="footer-link-wrap group relative block cursor-pointer overflow-hidden"
    >
      {/* Text container — clips the swap animation */}
      <span className="relative block h-[1.4em] overflow-hidden">
        {/* Primary text */}
        <span className="footer-link-primary block text-sm font-medium uppercase tracking-[0.2em] text-neutral-400 transition-colors duration-300 group-hover:text-indigo-200 sm:text-base">
          {label}
        </span>
        {/* Clone text — sits below, slides up on hover */}
        <span className="footer-link-clone block text-sm font-medium uppercase tracking-[0.2em] text-white sm:text-base">
          {label}
        </span>
      </span>
      {/* Underline — grows left to right */}
      <span className="footer-link-underline mt-1 block h-px w-full bg-gradient-to-r from-indigo-400 to-orange-400" />
    </a>
  )
}
