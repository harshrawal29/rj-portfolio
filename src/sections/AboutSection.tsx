import { copy } from '../utils/content'

function AboutSection() {
  return (
    <section
      id="about-story"
      className="flex min-h-[65vh] items-end border-b border-white/10"
      aria-labelledby="about-story-title"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10">
        <p className="text-xs uppercase tracking-[0.45em] text-neutral-600 sm:text-sm">
          {copy.storyEyebrow}
        </p>
        <h2
          id="about-story-title"
          className="mt-6 max-w-5xl text-3xl font-medium uppercase leading-[1.05] tracking-[-0.06em] text-white/85 sm:text-5xl lg:text-6xl"
        >
          {copy.storyTitle}
        </h2>
        <p className="mt-8 max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg">
          {copy.storyBody}
        </p>
      </div>
    </section>
  )
}

export default AboutSection
