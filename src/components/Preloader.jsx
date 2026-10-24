import { useEffect, useState } from 'react'
import { motion, usePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function Preloader({ onEnter }) {
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const [isPresent, safeToRemove] = usePresence()

  useEffect(() => {
    let frame
    let value = 0
    let last = performance.now()
    const tick = (now) => {
      const delta = Math.min(now - last, 48)
      last = now
      value = Math.min(100, value + delta * 0.075)
      setProgress(Math.floor(value))
      if (value < 100) frame = requestAnimationFrame(tick)
      else setReady(true)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (!isPresent) {
      const timeout = window.setTimeout(() => safeToRemove?.(), 900)
      return () => window.clearTimeout(timeout)
    }
  }, [isPresent, safeToRemove])

  return (
    <motion.div
      className="preloader"
      initial={{ opacity: 1, y: '0%' }}
      animate={isPresent ? { opacity: 1, y: '0%' } : { y: '-100%', transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
      onAnimationComplete={() => { if (!isPresent) safeToRemove?.() }}
    >
      <div className="preloader-top"><span>WEBX®</span><span>INDEPENDENT DIGITAL STUDIO</span></div>
      <div className="loader-center">
        <motion.div className="loader-mark" animate={{ rotate: 360 }} transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}>✳</motion.div>
        <p className="eyebrow">CRAFTING YOUR EXPERIENCE</p>
        <div className="loader-progress"><motion.span animate={{ width: progress + '%' }} transition={{ ease: 'linear', duration: 0.15 }} /></div>
        <div className="loader-meta"><span>INITIALIZING EXPERIENCE</span><span>{String(progress).padStart(3, '0')}%</span></div>
        <motion.button className="enter-button" disabled={!ready} onClick={onEnter} initial={{ opacity: 0, y: 8 }} animate={{ opacity: ready ? 1 : 0.35, y: 0 }} transition={{ duration: 0.35 }}>
          {ready ? 'ENTER EXPERIENCE' : 'PLEASE WAIT'} <ArrowUpRight size={15} />
        </motion.button>
      </div>
      <div className="preloader-bottom"><span>DESIGN × TECHNOLOGY</span><span>BUILT WITH INTENTION</span></div>
    </motion.div>
  )
}