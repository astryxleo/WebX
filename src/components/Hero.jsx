import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'

const lines = ['Digital', 'experiences,', 'with a pulse.']
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.13, delayChildren: 0.18 } } }
const item = { hidden: { y: '112%', opacity: 0, rotate: 2 }, visible: { y: '0%', opacity: 1, rotate: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } }

export default function Hero({ entered }) {
  return <section id="top" className={'hero section-wrap ' + (entered ? 'hero-entered' : '')}>
    <div className="hero-topline"><span className="eyebrow"><span className="status-dot" /> CREATIVE DEVELOPER & DIGITAL DESIGNER</span><span className="eyebrow">INDEPENDENT / WORLDWIDE</span></div>
    <motion.div className="hero-title-wrap" variants={container} initial="hidden" animate="visible">
      {lines.map((line, i) => <div className="title-mask" key={line}><motion.h1 variants={item} className={i === 2 ? 'hero-last-line' : ''}>{line}{i === 2 && <span className="title-period">·</span>}</motion.h1></div>)}
    </motion.div>
    <div className="hero-bottom">
      <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72, duration: 0.65 }}>I design & build digital worlds where<br /> <span className="muted">imagination meets intention.</span></motion.p>
      <motion.a href="#work" className="scroll-cue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        <span>SCROLL TO EXPLORE</span><span className="scroll-icon"><ArrowDown size={15} /></span>
      </motion.a>
      <motion.a href="mailto:hello@webx.studio" className="hero-availability" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
        <span>HAVE A PROJECT?</span><strong>LET’S TALK <ArrowUpRight size={13} /></strong>
      </motion.a>
    </div>
    <div className="hero-index"><span>01 / INTRODUCTION</span><span>SCROLL TO DISCOVER ↓</span></div>
  </section>
}