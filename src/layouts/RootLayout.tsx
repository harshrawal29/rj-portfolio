import NoiseOverlay from '../components/NoiseOverlay'
import ScrollProgress from '../components/ScrollProgress'
import PageTransition from '../components/PageTransition'
import Layout from '../components/layout/Layout'

function RootLayout() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#050505] text-neutral-100">
      <NoiseOverlay />
      <ScrollProgress />
      <PageTransition>
        <Layout />
      </PageTransition>
    </div>
  )
}

export default RootLayout
