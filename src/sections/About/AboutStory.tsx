import { useRef } from 'react'
import { createAboutStoryAnimation } from '../../animations/aboutAnimations'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const storyParagraphs = [
  'Riya Jethani is a Mumbai-based creative designer who explores how ideas can be transformed into meaningful visual experiences.',
  'Her design philosophy is that effective design goes beyond aesthetics. It should tell a story, evoke emotions, and create a lasting impact.',
  'Her creative process is rooted in emotional storytelling, where ideas are explored both visually and emotionally.',
  'She is constantly exploring new techniques and views every project as an opportunity to push creative boundaries and create something unique.',
]

function AboutStory() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useScrollReveal(sectionRef, createAboutStoryAnimation)

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-black/10 bg-[#f3eee6] text-[#111111]"
      aria-labelledby="about-story-title"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div
          data-about-story-panel
          className="grid min-h-[65vh] items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16"
        >
          {/* ─── Image Container (Left) ─── */}
          <div
            data-about-story-image-wrapper
            className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-black/5 sm:aspect-[3/4] lg:aspect-[4/5]"
          >
            <img
              data-about-story-image
              src="/about-img.png"
              alt="Riya Jethani"
              className="h-full w-full object-cover will-change-transform"
            />
          </div>

          {/* ─── Text Content (Right) ─── */}
          <div className="flex flex-col justify-center">
            <p className="text-[0.65rem] uppercase tracking-[0.45em] text-black/45 sm:text-xs">
              Emotional storytelling
            </p>
            <h2
              id="about-story-title"
              className="mt-5 max-w-4xl text-[13vw] font-semibold leading-[0.9] tracking-[-0.08em] text-[#111111] sm:text-6xl lg:text-[5.25rem]"
            >
              Ideas shaped by feeling, memory, and meaning.
            </h2>

            <div className="mt-8 space-y-4 sm:mt-10 sm:space-y-5">
              {storyParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  data-about-story-paragraph
                  className="max-w-2xl text-base leading-8 text-black/68 sm:text-lg sm:leading-9"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutStory
