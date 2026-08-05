import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)

interface TransitionContextType {
  flipState: any | null
  setFlipState: (state: any | null) => void
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined)

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [flipState, setFlipState] = useState<any | null>(null)

  return (
    <TransitionContext.Provider value={{ flipState, setFlipState }}>
      {children}
    </TransitionContext.Provider>
  )
}

export function useTransitionContext() {
  const context = useContext(TransitionContext)
  if (context === undefined) {
    throw new Error('useTransitionContext must be used within a TransitionProvider')
  }
  return context
}
