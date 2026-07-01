import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { fullscreenMenuItems } from '../../utils/content'
import { gsap } from '../../utils/gsap'

type MenuOverlayProps = {
  isOpen: boolean
  overlayRef: React.RefObject<HTMLDivElement | null>
  previewCardRef: React.RefObject<HTMLDivElement | null>
  itemRefs: React.RefObject<HTMLElement | null>[]
  onNavigate: () => void
}

function MenuOverlay({
  isOpen,
  overlayRef,
  previewCardRef,
  itemRefs,
  onNavigate,
}: MenuOverlayProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeHref, setActiveHref] = useState<string>(fullscreenMenuItems[0]?.href ?? '')
  const [isNavigating, setIsNavigating] = useState(false)
  const [navigatingIndex, setNavigatingIndex] = useState<number | null>(null)

  const navigate = useNavigate()
  const location = useLocation()

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const cursorScale = useMotionValue(0)
  const cursorOpacity = useMotionValue(0)
  const smoothX = useSpring(cursorX, { stiffness: 280, damping: 28, mass: 0.45 })
  const smoothY = useSpring(cursorY, { stiffness: 280, damping: 28, mass: 0.45 })
  const smoothScale = useSpring(cursorScale, { stiffness: 240, damping: 22, mass: 0.4 })
  const smoothOpacity = useSpring(cursorOpacity, { stiffness: 240, damping: 24, mass: 0.4 })

  const activeItem = useMemo(() => fullscreenMenuItems[activeIndex], [activeIndex])

  const handleItemClick = async (e: React.MouseEvent, item: typeof fullscreenMenuItems[number], index: number) => {
    e.preventDefault()
    if (isNavigating) return
    setIsNavigating(true)
    setNavigatingIndex(index)
    setActiveHref(item.href)

    const clickedItem = itemRefs[index].current
    const otherItems = itemRefs.map((r, i) => i !== index ? r.current : null).filter(Boolean)

    if (clickedItem) {
      // Stage 1 & 2: Selected expands, others fade out
      // Fade out the anchors instead of the LIs so timeline reverse doesn't make them reappear
      const otherAnchors = otherItems.map(li => li?.querySelector('a')).filter(Boolean)
      gsap.to(otherAnchors, { opacity: 0, duration: 0.6, ease: 'power2.out' })

      // Fade out the preview card wrapper instead of the card itself
      const previewWrapper = previewCardRef.current?.parentElement
      if (previewWrapper) gsap.to(previewWrapper, { opacity: 0, y: 20, duration: 0.4, ease: 'power2.out' })

      // Fade out the footer
      const footer = overlayRef.current?.querySelector('.mt-6.flex.items-end')
      if (footer) gsap.to(footer, { opacity: 0, duration: 0.4 })

      const textSpan = clickedItem.querySelector('.menu-item-text')
      const dash = clickedItem.querySelector('.menu-item-dash')
      const numberSpan = clickedItem.querySelector('.menu-item-number')

      if (dash) gsap.to(dash, { opacity: 0, duration: 0.3 })
      if (numberSpan) gsap.to(numberSpan, { opacity: 0, duration: 0.3 })

      if (textSpan) {
        // Calculate position to center the text
        const rect = textSpan.getBoundingClientRect()
        const xOffset = window.innerWidth / 2 - (rect.left + rect.width / 2)
        const yOffset = window.innerHeight / 2 - (rect.top + rect.height / 2)

        gsap.to(textSpan, {
          scale: 2.5,
          x: xOffset,
          y: yOffset,
          color: item.accent,
          duration: 1.2,
          ease: 'power4.inOut'
        })
      }

      // Wait for the scale animation to almost finish before exiting the menu
      await new Promise(r => setTimeout(r, 1000))

      // Navigate in the background
      let targetHash = ''
      if (item.href.includes('#')) {
        const [path, hash] = item.href.split('#')
        const currentPath = location.pathname === '/' ? '' : location.pathname
        const targetPath = path === '/' ? '' : path
        targetHash = hash

        if (currentPath === targetPath) {
          // Same page hash navigation
          const el = document.getElementById(hash)
          if (el && window.lenis) {
            window.lenis.scrollTo(el, { immediate: true })
          }
          navigate(item.href)
          targetHash = '' // Already scrolled
        } else {
          navigate(item.href)
        }
      } else if (item.href === '/' && location.pathname === '/') {
        if (window.lenis) {
          window.lenis.scrollTo(0, { immediate: true })
        }
        navigate(item.href)
      } else {
        navigate(item.href)
      }

      // Stage 3: Trigger the standard bottom-to-top exit animation ALMOST IMMEDIATELY
      onNavigate()

      // Give the new page a moment to render before jumping to hash
      await new Promise(r => setTimeout(r, 150))

      if (targetHash) {
        const el = document.getElementById(targetHash)
        if (el && window.lenis) {
          window.lenis.scrollTo(el, { immediate: true })
        }
      }

      // Stage 4: Clean up inline styles after the exit animation completes
      setTimeout(() => {
        setIsNavigating(false)
        setNavigatingIndex(null)
        gsap.set(otherItems, { clearProps: 'all' })
        gsap.set(otherAnchors, { clearProps: 'all' })
        gsap.set(previewCardRef.current, { clearProps: 'all' })
        if (previewWrapper) gsap.set(previewWrapper, { clearProps: 'all' })
        if (footer) gsap.set(footer, { clearProps: 'all' })
        if (textSpan) gsap.set(textSpan, { clearProps: 'all' })
        if (dash) gsap.set(dash, { clearProps: 'all' })
        if (numberSpan) gsap.set(numberSpan, { clearProps: 'all' })
      }, 1250)
    }
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-40 overflow-hidden bg-[#0A0A0A] text-white"
      aria-hidden={!isOpen}
      onMouseMove={(event) => {
        cursorX.set(event.clientX)
        cursorY.set(event.clientY)
      }}
      onMouseEnter={() => {
        cursorScale.set(1)
        cursorOpacity.set(1)
      }}
      onMouseLeave={() => {
        cursorScale.set(0)
        cursorOpacity.set(0)
      }}
    >
      {/* Background Images */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.img
              key={activeItem.bgImage}
              src={activeItem.bgImage}
              alt=""
              initial={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(2px)', transition: { duration: 0.8, ease: 'easeOut' } }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(20px)', transition: { duration: 0.4, ease: 'easeIn' } }}
              className="absolute inset-0 h-full w-full object-cover mix-blend-lighten"
            />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-10 border border-white/8 bg-transparent"
        initial={{ scale: 1, borderRadius: 0, opacity: 0 }}
        animate={{
          scale: isOpen ? 0.972 : 1,
          borderRadius: isOpen ? 24 : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
      />
      <motion.div
        className="pointer-events-none absolute top-0 left-0 z-20 flex h-14 w-14 items-center justify-center rounded-full border border-white/18 bg-white/8 text-[8px] font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur-md mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          scale: smoothScale,
          opacity: smoothOpacity,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        View
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col justify-between px-6 pb-6 pt-20 sm:px-8 sm:pb-8 sm:pt-24 lg:px-12 lg:pb-10 lg:pt-28">
        <div className="grid flex-1 items-center gap-8 overflow-hidden lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
          <nav aria-label="Fullscreen" className="flex min-h-0 items-center">
            <ul className="w-full">
              {fullscreenMenuItems.map((item, index) => (
                <li
                  key={item.href}
                  ref={(node) => {
                    itemRefs[index].current = node
                  }}
                  className={`group relative ${isNavigating && navigatingIndex !== index ? 'pointer-events-none' : ''} ${isNavigating && navigatingIndex === index ? '!opacity-100' : ''}`}
                  onMouseEnter={() => !isNavigating && setActiveIndex(index)}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleItemClick(e, item, index)}
                    className="flex items-start gap-3 py-2.5 sm:gap-6 sm:py-3 lg:gap-7 lg:py-3.5"
                  >
                    <motion.span
                      className="menu-item-number pt-2 text-[10px] font-medium tracking-[0.35em] text-white/45 sm:pt-2.5 sm:text-xs lg:text-sm"
                      animate={{ x: activeIndex === index && !isNavigating ? -12 : 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                    >
                      {item.id}
                    </motion.span>
                    <div className="relative flex items-center">
                      <motion.span
                        className="menu-item-dash absolute -left-5 top-1/2 h-[2px] bg-white"
                        initial={false}
                        animate={{
                          width: activeHref === item.href && !isNavigating ? 20 : 0,
                          opacity: activeHref === item.href && !isNavigating ? 1 : 0,
                          x: activeHref === item.href && !isNavigating ? 0 : -6,
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        style={{ translateY: '-50%' }}
                      />
                      <motion.span
                        className="menu-item-text text-[clamp(2.75rem,7vw,7.5rem)] font-medium leading-[0.88] tracking-[-0.08em] text-white 2xl:text-[clamp(3rem,7vw,8.5rem)] origin-center"
                        animate={{
                          x: activeIndex === index && !isNavigating ? 18 : 0,
                          scale: activeIndex === index && !isNavigating ? 1.05 : 1,
                          opacity: (activeHref === item.href || activeIndex === index) ? 1 : 0.5,
                        }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                      >
                        {item.label}
                      </motion.span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:flex lg:min-h-0 lg:items-center lg:justify-end">
            <motion.div
              ref={previewCardRef}
              className="relative h-[min(52vh,460px)] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-md p-8"
              animate={{ opacity: isOpen && !isNavigating ? 1 : 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <motion.div
                key={activeItem.href}
                className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(99,102,241,0.15),transparent_32%),radial-gradient(circle_at_50%_80%,rgba(244,114,182,0.08),transparent_34%)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              />
              <div className="relative flex h-full flex-col justify-between z-10">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                    {activeItem.preview.eyebrow}
                  </p>
                  <div className="mt-6 h-px w-full bg-white/10" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-white/45">
                    Preview
                  </p>
                  <h3 className="mt-4 max-w-sm text-4xl font-medium uppercase leading-[0.95] tracking-[-0.06em] text-white">
                    {activeItem.preview.title}
                  </h3>
                  <p className="mt-6 max-w-sm text-base leading-7 text-white/65">
                    {activeItem.preview.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.28em] sm:text-xs lg:text-sm">
          <span className="text-white/40">Portfolio navigation</span>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/80 font-medium">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Resume</a>
            <a href="https://behance.net/riyajethani" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Behance</a>
            <a href="https://instagram.com/riyajethani.design" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://www.linkedin.com/in/riya-jethani-92420b1b3/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuOverlay
