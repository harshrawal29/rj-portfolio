import { useMemo, useRef } from 'react'
import type { ElementType, ReactNode } from 'react'
import { useGSAP } from '../hooks/useGSAP'
import { gsap } from '../utils/gsap'
import { DURATIONS, EASING, SCROLL_START, STAGGER } from '../utils/animationPresets'

type TextRevealProps<T extends ElementType = 'div'> = {
  as?: T
  text?: string
  lines?: string[]
  className?: string
  lineClassName?: string
  start?: string
  stagger?: number
  duration?: number
  yPercent?: number
  once?: boolean
  scrub?: boolean | number
  id?: string
  children?: ReactNode
}

function TextReveal<T extends ElementType = 'div'>({
  as,
  text,
  lines,
  className,
  lineClassName,
  start = SCROLL_START.default,
  stagger = STAGGER.base,
  duration = DURATIONS.lg,
  yPercent = 110,
  once = true,
  scrub = false,
  id,
  children,
}: TextRevealProps<T>) {
  const Component = (as ?? 'div') as ElementType
  const rootRef = useRef<HTMLElement | null>(null)

  const resolvedLines = useMemo(() => {
    if (lines && lines.length > 0) return lines
    if (text) {
      return text
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
    }
    return []
  }, [lines, text])

  useGSAP(() => {
    if (!rootRef.current) return

    const lineElements = rootRef.current.querySelectorAll('[data-text-reveal-line]')
    if (lineElements.length === 0) return

    const tween = gsap.from(lineElements, {
      yPercent,
      opacity: 0,
      duration,
      stagger,
      ease: EASING.primary,
      scrollTrigger: {
        trigger: rootRef.current,
        start,
        once,
        scrub,
      },
    })

    return () => tween.kill()
  }, { scope: rootRef })

  return (
    <Component ref={rootRef} className={className} id={id}>
      {resolvedLines.length > 0
        ? resolvedLines.map((line) => (
            <span key={line} className="block overflow-hidden">
              <span data-text-reveal-line className={lineClassName}>
                {line}
              </span>
            </span>
          ))
        : children}
    </Component>
  )
}

export default TextReveal
