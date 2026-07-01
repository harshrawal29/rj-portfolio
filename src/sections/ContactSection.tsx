import { useRef } from 'react'
import { createContactAnimation } from '../animations/contactAnimation'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { copy } from '../utils/content'

function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useScrollReveal(sectionRef, createContactAnimation)

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="flex min-h-screen items-center"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto w-full max-w-5xl px-6 py-16 lg:px-10">
        <div data-contact-content className="rounded-[2rem] border border-white/10 bg-white/5 p-8 sm:p-12">
          <p className="text-sm uppercase tracking-[0.28em] text-neutral-500">{copy.contactEyebrow}</p>
          <h2 id="contact-title" className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            {copy.contactTitle}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300">
            {copy.contactBody}
          </p>
          <a
            href={`mailto:${copy.contactEmail}`}
            className="mt-10 inline-flex rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-neutral-950"
          >
            {copy.contactEmail}
          </a>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
