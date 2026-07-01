import { navItems } from '../utils/content'

function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10"
        aria-label="Primary"
      >
        <a href="#hero" className="text-sm font-medium tracking-[0.24em] text-white">
          RJ PORTFOLIO
        </a>
        <div className="hidden gap-6 text-sm text-neutral-300 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-white">
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Header
