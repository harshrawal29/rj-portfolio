import type { RefObject } from 'react'
import { useGSAP } from './useGSAP'

type RevealAnimation = (section: HTMLElement) => unknown

export function useScrollReveal(
  sectionRef: RefObject<HTMLElement | null>,
  animation: RevealAnimation,
) {
  useGSAP(() => {
    if (!sectionRef.current) return

    animation(sectionRef.current)
  }, { scope: sectionRef })
}
