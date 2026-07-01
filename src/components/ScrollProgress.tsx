import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    let animationFrameId: number

    const updateProgress = () => {
      if (!progressRef.current) return
      
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollTop = window.scrollY
      
      // Calculate progress between 0 and 1
      const progress = scrollHeight > 0 ? Math.min(Math.max(scrollTop / scrollHeight, 0), 1) : 0
      
      gsap.to(progressRef.current, {
        scaleY: progress,
        duration: 0.15,
        ease: 'none',
      })
    }

    const onScroll = () => {
      animationFrameId = requestAnimationFrame(updateProgress)
    }

    // Initialize progress immediately
    updateProgress()

    // Listen to native scroll and resize (Lenis works seamlessly with these)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    // Mutation observer catches dynamic height changes (images loading, sections rendering)
    const observer = new MutationObserver(updateProgress)
    observer.observe(document.body, { childList: true, subtree: true, attributes: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      observer.disconnect()
      cancelAnimationFrame(animationFrameId)
    }
  }, [pathname]) // Re-run effect setup when route changes to ensure fresh state

  return (
    <div className="fixed right-0 top-0 z-[9998] h-screen w-1 bg-white/10 pointer-events-none mix-blend-difference hidden md:block">
      <div 
        ref={progressRef}
        className="h-full w-full bg-white origin-top scale-y-0"
        style={{ willChange: 'transform' }}
      />
    </div>
  )
}
