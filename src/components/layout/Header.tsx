import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useMenuAnimation } from '../../hooks/useMenuAnimation'
import MenuOverlay from './MenuOverlay'

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  const { headerRef, overlayRef, previewCardRef, itemRefs } = useMenuAnimation({ isOpen })

  const toggleMenu = () => {
    setIsOpen((value) => !value)
  }

  const handleNavigate = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }

    // Set initial scroll state
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isWorkArchive = location.pathname === '/work'

  // Header is dark theme if:
  // - we are on the work archive page AND
  // - the menu is NOT open AND
  // - the user is NOT scrolled down
  const isDarkHeaderTheme = isWorkArchive && !isOpen && !isScrolled

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${isDarkHeaderTheme ? 'dark-header-theme' : ''
          } ${isScrolled
            ? 'bg-[#0a0a0a]/72 backdrop-blur-[18px]'
            : isOpen
              ? 'bg-transparent backdrop-blur-none'
              : isWorkArchive
                ? 'bg-transparent backdrop-blur-none'
                : 'bg-gradient-to-b from-[#050505]/60 via-[#050505]/30 to-transparent backdrop-blur-none'
          }`}
      >
        <nav
          className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 sm:px-8 lg:px-12"
          aria-label="Primary"
        >
          <Link
            to="/"
            onClick={handleNavigate}
            className="font-primary text-md font-normal tracking-[5px] uppercase transition-colors duration-300 text-white"
          >
            Riya Jethani
          </Link>
          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="fullscreen-navigation"
            className="group inline-flex items-center gap-3 text-sm font-medium tracking-[0.32em] uppercase transition-colors duration-300 text-white"
          >
            <span className="nav-line-bg relative inline-flex h-px w-8 overflow-hidden transition-colors duration-300 bg-white/30">
              <span
                className={`nav-line absolute inset-y-0 left-0 transition-all duration-500 bg-white ${isOpen ? 'w-full translate-x-0' : 'w-1/2 translate-x-0 group-hover:w-full'
                  }`}
              />
            </span>
            <span>INDEX</span>
          </button>
        </nav>
      </header>

      <div id="fullscreen-navigation">
        <MenuOverlay
          isOpen={isOpen}
          overlayRef={overlayRef}
          previewCardRef={previewCardRef}
          itemRefs={itemRefs}
          onNavigate={handleNavigate}
        />
      </div>
    </>
  )
}

export default Header
