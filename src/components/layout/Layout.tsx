import { Suspense } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Cursor from '../Cursor'
import PageLoader from '../errors/PageLoader'
import Header from './Header'

export default function Layout() {
  const location = useLocation()
  const outlet = useOutlet()

  return (
    <>
      <Cursor />
      <Header />
      <div className="grid min-h-screen grid-cols-1 overflow-x-clip">
        <Suspense fallback={<PageLoader label="Loading content" />}>
          <AnimatePresence>
            <motion.div
              key={location.pathname}
              className="col-start-1 row-start-1 h-full w-full min-w-0"
            >
              {outlet}
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </div>
    </>
  )
}
