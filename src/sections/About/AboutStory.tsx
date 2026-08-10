import { useRef } from 'react'
import { createAboutStoryAnimation } from '../../animations/aboutAnimations'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const storyParagraphs = [
  'Hi, I\'m Riya, a visual communication designer. I turn ideas into visuals, coffee into fuel and the odd random observation into design inspiration.',
  'I think good design needs to do more than just look good. It has to communicate clearly, stir some emotion and stay with people after they\'ve seen it.',
  'Curiosity drives most of what I make. I like digging into ideas, trying out different perspectives and figuring out how to turn a concept into something worth looking at.',
  <span key="discipline">I live by the line, <strong className="font-semibold text-black">"Discipline makes today hard and tomorrow easy."</strong> It's a good reminder that ideas rarely arrive fully formed. They take shape slowly, through consistency, learning and a lot of trial and error.</span>,
  "Small things inspire me the most. A colour pairing spotted on the street, an odd-shaped shadow, a bit of conversation overheard at a café, some tiny detail most people wouldn't notice at all. Those moments usually end up being where my next idea starts. If I have a superpower, it's probably that: spotting creative potential in ordinary moments."
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
            {/* <p className="text-[0.65rem] uppercase tracking-[0.45em] text-black/45 sm:text-xs">
              Emotional storytelling
            </p> */}
            <h2
              id="about-story-title"
              className="mt-5 max-w-4xl text-[13vw] font-semibold leading-[0.9] tracking-[-0.08em] text-[#111111] sm:text-6xl lg:text-[5.25rem]"
            >
              ABOUT ME
            </h2>

            <div className="mt-8 space-y-4 sm:mt-10 sm:space-y-5">
              {storyParagraphs.map((paragraph, index) => (
                <p
                  key={typeof paragraph === 'string' ? paragraph : index}
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
