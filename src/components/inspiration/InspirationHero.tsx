export interface InspirationHeroProps {
  title: string
  heroImage: string
}

export function InspirationHero({ title, heroImage }: InspirationHeroProps) {
  return (
    <header className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-black/10">
      <img
        src={heroImage}
        alt={title}
        data-inspiration-hero-img
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />

      <div className="hero-content-wrapper absolute bottom-0 left-0 flex w-full flex-col justify-between p-6 md:p-12 lg:flex-row lg:items-end lg:p-20">
        <div className="max-w-4xl">
          <p className="hero-meta mb-4 text-xs uppercase tracking-[0.45em] text-white/60">
            Inspiration
          </p>
          <h1 className="hero-title text-[12vw] font-bold uppercase leading-none tracking-tighter text-[#f3eee6] md:text-8xl lg:text-[8rem]">
            {title}
          </h1>
        </div>

        <div className="hero-scroll-hint mt-8 flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-white/60 lg:mt-0 lg:pb-4">
          <span>Scroll to explore</span>
          <div className="h-[1px] w-12 bg-white/30" />
        </div>
      </div>
    </header>
  )
}
