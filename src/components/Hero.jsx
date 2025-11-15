import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero(){
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/5EwoDiC2tChvmy4K/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/30 to-white pointer-events-none" />
      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-blue-900">Advanced Medicines, Trusted Care</h1>
            <p className="mt-4 max-w-2xl text-blue-900/80">A modern catalog of pharmaceutical companies and medicines with a clean, responsive design.</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
