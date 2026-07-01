import { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import type { Project } from '../../types/portfolio'

export default function EditorialProjectStory({ project }: { project: Project }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as const // power3.out equivalent
      }
    }
  }

  // Fallbacks if metadata is missing
  const eyebrowText = project.eyebrow || 'PROJECT OVERVIEW'
  const mainStory = project.editorialStory || "A narrative describing the core creative direction and strategic insight behind the project."

  return (
    <section className="w-full py-16 lg:py-32 bg-[#FCFCFC] text-[#111111]" ref={ref}>
      <motion.div
        className="max-w-[1600px] mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-24"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Left Column (65%) */}
        <div className="w-full md:w-[65%] flex flex-col">
          <motion.p
            variants={itemVariants}
            className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-gray-400 mb-4 font-medium"
          >
            {eyebrowText}
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="font-extralight tracking-tight text-[#111111] max-w-[750px] editorial-story-content"
            style={{ fontSize: 'clamp(28px, 2.2vw, 56px)', lineHeight: '1.15' }}
            dangerouslySetInnerHTML={{ __html: mainStory }}
          />
        </div>

        {/* Right Column (35%) */}
        <div className="w-full md:w-[35%] flex flex-col gap-8 lg:pl-12 pt-4 md:pt-0 border-t border-gray-200 md:border-none">
          <motion.div variants={itemVariants} className="flex flex-col gap-1">
            <p className="text-[10px] md:text-xs tracking-[0.1em] uppercase text-gray-400">Project</p>
            <p className="text-sm md:text-base font-medium">{project.title}</p>
          </motion.div>

          {project.client && (
            <motion.div variants={itemVariants} className="flex flex-col gap-1">
              <p className="text-[10px] md:text-xs tracking-[0.1em] uppercase text-gray-400">Client</p>
              <p className="text-sm md:text-base font-medium">{project.client}</p>
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="flex flex-col gap-1">
            <p className="text-[10px] md:text-xs tracking-[0.1em] uppercase text-gray-400">Year</p>
            <p className="text-sm md:text-base font-medium">{project.year}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-1">
            <p className="text-[10px] md:text-xs tracking-[0.1em] uppercase text-gray-400">Category</p>
            <p className="text-sm md:text-base font-medium capitalize">{project.category.replace(/-/g, ' ')}</p>
          </motion.div>

          {project.services && project.services.length > 0 && (
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <p className="text-[10px] md:text-xs tracking-[0.1em] uppercase text-gray-400">Services</p>
              <ul className="flex flex-col gap-1">
                {project.services.map((service, idx) => (
                  <li key={idx} className="text-sm md:text-base font-medium leading-tight">
                    {service}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

      </motion.div>
    </section>
  )
}
