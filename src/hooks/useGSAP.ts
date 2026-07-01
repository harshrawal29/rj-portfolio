import { useLayoutEffect } from 'react'
import type { DependencyList, RefObject } from 'react'
import { gsap } from '../utils/gsap'

type UseGSAPOptions = {
  dependencies?: DependencyList
  scope?: RefObject<Element | null>
}

type GSAPCallback = () => void | (() => void)

export function useGSAP(callback: GSAPCallback, options: UseGSAPOptions = {}) {
  const { dependencies = [], scope } = options

  useLayoutEffect(() => {
    let cleanup: void | (() => void)

    const context = gsap.context(() => {
      cleanup = callback()
    }, scope?.current ?? undefined)

    return () => {
      cleanup?.()
      context.revert()
    }
  }, dependencies)
}
