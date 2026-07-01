import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    // Scroll to top automatically on route change
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div>
      {children}
    </div>
  )
}
