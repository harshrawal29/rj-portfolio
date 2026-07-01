import { copy } from '../utils/content'

function AboutStorySection() {
  return (
    <section
      id="about-story"
      className="flex min-h-screen items-center border-b border-white/10"
      aria-labelledby="about-story-title"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-4">
          <p className="text-xs uppercase tracking-[0.45em] text-neutral-500 sm:text-sm">
            {copy.storyEyebrow}
          </p>
        </div>
        <div className="lg:col-span-8">
          <h2
            id="about-story-title"
            className="max-w-5xl text-3xl font-medium uppercase leading-[1.05] tracking-[-0.06em] text-white/90 sm:text-5xl lg:text-6xl"
          >
            {copy.storyTitle}
          </h2>
          <p className="mt-8 max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg">
            {copy.storyBody}
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutStorySection
