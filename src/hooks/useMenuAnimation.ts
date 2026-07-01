import { useEffect, useMemo, useRef } from 'react'
import { createMenuTimeline } from '../animations/menuAnimation'
import { fullscreenMenuItems } from '../utils/content'
import { useGSAP } from './useGSAP'

type UseMenuAnimationOptions = {
  isOpen: boolean
}

export function useMenuAnimation({ isOpen }: UseMenuAnimationOptions) {
  const headerRef = useRef<HTMLElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const previewCardRef = useRef<HTMLDivElement | null>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const itemRefs = useMemo(
    () =>
      Array.from({ length: fullscreenMenuItems.length }, () => ({
        current: null as HTMLElement | null,
      })),
    [],
  )

  useGSAP(
    () => {
      timelineRef.current = createMenuTimeline({
        overlayRef,
        itemRefs,
        previewCardRef,
      })

      return () => {
        timelineRef.current?.kill()
        timelineRef.current = null
      }
    },
    {
      scope: overlayRef,
      dependencies: [itemRefs],
    },
  )

  useEffect(() => {
    const timeline = timelineRef.current

    if (!timeline) return

    document.body.style.overflow = isOpen ? 'hidden' : ''

    if (isOpen) {
      timeline.play()
      return
    }

    timeline.eventCallback('onReverseComplete', () => {
      if (overlayRef.current) {
        overlayRef.current.style.pointerEvents = 'none'
      }
    })
    timeline.reverse()

    return () => {
      timeline.eventCallback('onReverseComplete', null)
    }
  }, [isOpen])

  useEffect(
    () => () => {
      document.body.style.overflow = ''
    },
    [],
  )

  return {
    headerRef,
    overlayRef,
    previewCardRef,
    itemRefs,
  }
}
