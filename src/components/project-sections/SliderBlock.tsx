import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { SliderBlock as SliderBlockType } from '../../types/portfolio'

export default function SliderBlock({ block }: { block: SliderBlockType }) {
  const [current, setCurrent] = useState(0)
  const total = block?.slides?.length || 0

  const goTo = useCallback(
    (index: number) => {
      if (total === 0 || index === current || index < 0 || index >= total) return
      setCurrent(index)
    },
    [current, total]
  )

  const next = useCallback(() => total > 0 && goTo((current + 1) % total), [current, total, goTo])
  const prev = useCallback(() => total > 0 && goTo((current - 1 + total) % total), [current, total, goTo])

  // Get supporting images (wrap around)
  const prevIndex = total > 0 ? (current - 1 + total) % total : 0
  const nextIndex = total > 0 ? (current + 1) % total : 0

  // Premium transition settings
  const transitionSettings = {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1] as const // equivalent to power3.out / custom bezier
  }

  const imageVariants = {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.96 }
  }

  // Ensure there are enough slides to prevent layout breaking
  if (!block || !block.slides || block.slides.length === 0) return null;

  return (
    <section className="w-full min-h-0 md:min-h-[60vh] py-8 md:py-12 bg-white flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-5">

        {/* Desktop & Tablet Layout */}
        <div className="hidden md:flex w-full max-w-[1000px] lg:max-w-[1300px] mx-auto justify-center items-center gap-4 lg:gap-8 h-[50vh] lg:h-[60vh] mb-4 lg:mb-6">

          {/* Left Column */}
          <div
            className="relative w-[15%] lg:w-[20%] h-[70%] lg:h-[80%] cursor-pointer group flex items-center justify-center shrink-0"
            onClick={prev}
          >
            <AnimatePresence>
              <motion.img
                key={`prev-${prevIndex}`}
                src={block.slides[prevIndex].src}
                alt={block.slides[prevIndex].alt ?? 'Previous slide'}
                className="absolute w-full h-full object-contain"
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transitionSettings}
              />
            </AnimatePresence>
            {/* Hover overlay for interactivity */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-10" />
          </div>

          {/* Center Column */}
          <div className="relative w-[70%] lg:w-[60%] h-full flex items-center justify-center shrink-0">
            <AnimatePresence>
              <motion.img
                key={`center-${current}`}
                src={block.slides[current].src}
                alt={block.slides[current].alt ?? 'Current slide'}
                className="absolute w-full h-full object-contain"
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transitionSettings}
              />
            </AnimatePresence>
          </div>

          {/* Right Column */}
          <div
            className="relative w-[15%] lg:w-[20%] h-[70%] lg:h-[80%] cursor-pointer group flex items-center justify-center shrink-0"
            onClick={next}
          >
            <AnimatePresence>
              <motion.img
                key={`next-${nextIndex}`}
                src={block.slides[nextIndex].src}
                alt={block.slides[nextIndex].alt ?? 'Next slide'}
                className="absolute w-full h-full object-contain"
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transitionSettings}
              />
            </AnimatePresence>
            {/* Hover overlay for interactivity */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-10" />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex md:hidden flex-col gap-4 w-full mb-4">
          {/* Main Image */}
          <div className="relative w-full aspect-[4/3] flex items-center justify-center">
            <AnimatePresence>
              <motion.img
                key={`mobile-center-${current}`}
                src={block.slides[current].src}
                alt={block.slides[current].alt ?? 'Current slide'}
                className="absolute w-full h-full object-contain"
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transitionSettings}
              />
            </AnimatePresence>
          </div>

          {/* Supporting Images */}
          <div className="grid grid-cols-2 gap-3 w-full aspect-[2/1]">
            <div className="relative w-full h-full flex items-center justify-center" onClick={prev}>
              <AnimatePresence>
                <motion.img
                  key={`mobile-prev-${prevIndex}`}
                  src={block.slides[prevIndex].src}
                  alt={block.slides[prevIndex].alt ?? 'Previous slide'}
                  className="absolute w-full h-full object-contain"
                  variants={imageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transitionSettings}
                />
              </AnimatePresence>
            </div>
            <div className="relative w-full h-full flex items-center justify-center" onClick={next}>
              <AnimatePresence>
                <motion.img
                  key={`mobile-next-${nextIndex}`}
                  src={block.slides[nextIndex].src}
                  alt={block.slides[nextIndex].alt ?? 'Next slide'}
                  className="absolute w-full h-full object-contain"
                  variants={imageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transitionSettings}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Navigation & Details */}
        <div className="flex flex-col items-center justify-center mt-2 md:mt-4">
          <div className="h-8 md:h-12 flex items-center justify-center mb-6">
            <AnimatePresence mode="wait">
              {block.slides[current]?.caption && (
                <motion.p
                  key={`caption-${current}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-xs md:text-sm tracking-widest uppercase text-center font-bold text-neutral-800"
                  style={block.textColor ? { color: block.textColor } : undefined}
                >
                  {block.slides[current].caption}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <button
              onClick={prev}
              className="group relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white bg-[#111111] overflow-hidden transition-all duration-500 focus:outline-none border border-[#111111]"
              aria-label="Previous slide"
            >
              {/* Premium slide-up background fill */}
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-full" />

              <svg className="w-5 h-5 md:w-6 md:h-6 relative z-10 group-hover:-translate-x-1 group-hover:text-black transition-all duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              onClick={next}
              className="group relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white bg-[#111111] overflow-hidden transition-all duration-500 focus:outline-none border border-[#111111]"
              aria-label="Next slide"
            >
              {/* Premium slide-up background fill */}
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-full" />

              <svg className="w-5 h-5 md:w-6 md:h-6 relative z-10 group-hover:translate-x-1 group-hover:text-black transition-all duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
