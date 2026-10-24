import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, MoveUpRight } from 'lucide-react'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import CanvasBackground from './components/CanvasBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProjectCarousel from './components/ProjectCarousel'

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

export default function App() {
  const [entered, setEntered] = useState(false)

  return (
    <>
      <CustomCursor />
      <AnimatePresence>{!entered && <Preloader onEnter={() => setEntered(true)} />}</AnimatePresence>
      <div className="site-shell">
        <CanvasBackground />
        <Navbar />
        <main>
          <Hero entered={entered} />
          <section id="work" className="work-section section-wrap">
            <motion.div className="section-heading" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
              <div>
                <span className="eyebrow"><span className="status-dot" /> SELECTED WORK / 2023—26</span>
                <h2>Ideas made <span className="muted">tangible.</span></h2>
              </div>
              <p className="section-note">A few experiments in building things that feel<br className="desktop-only" /> as good as they function.</p>
            </motion.div>
            <ProjectCarousel />
          </section>

          <section id="about" className="about-section section-wrap">
            <motion.div className="about-kicker" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="eyebrow">A LITTLE ABOUT ME</span><span className="index-number">[ 01 — 03 ]</span>
            </motion.div>
            <motion.div className="about-copy" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2>I turn complex ideas into <span className="mint-text">clear, tactile</span> digital experiences.</h2>
              <p>I’m an independent creative developer exploring the space between expressive design and purposeful engineering. I care about the small details, the unexpected interactions, and the feeling a product leaves behind.</p>
              <a className="text-link" href="mailto:hello@webx.studio">A little more about me <ArrowUpRight size={16} /></a>
            </motion.div>
          </section>

          <section id="approach" className="approach-section section-wrap">
            <span className="eyebrow">HOW I CAN HELP</span>
            <div className="service-grid">
              {[
                ['01', 'Creative development', 'Immersive websites, WebGL worlds and playful interactions.'],
                ['02', 'Digital direction', 'Art direction, design systems and high-fidelity prototypes.'],
                ['03', 'Motion & interaction', 'Motion languages that make interfaces feel alive.'],
              ].map(([n, title, description]) => (
                <motion.article key={n} className="service-card" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <span className="service-number">{n} /</span>
                  <h3>{title}</h3><p>{description}</p><ArrowUpRight className="service-arrow" size={19} />
                </motion.article>
              ))}
            </div>
          </section>

          <footer id="contact" className="footer section-wrap">
            <div className="footer-top"><span className="eyebrow">HAVE A GOOD ONE IN MIND?</span><span className="eyebrow">AVAILABLE FOR SELECT PROJECTS ↗</span></div>
            <a className="footer-title" href="mailto:hello@webx.studio" data-cursor="link">Let’s make<br /><span>it matter.</span><MoveUpRight className="footer-arrow" /></a>
            <div className="footer-bottom">
              <span>© WEBX® 2026</span>
              <span className="footer-socials"><a href="https://github.com/astryxleo" target="_blank" rel="noreferrer">GITHUB <Github size={13} /></a><a href="https://linkedin.com" target="_blank" rel="noreferrer">LINKEDIN <Linkedin size={13} /></a></span>
              <a href="#top">BACK TO TOP <ArrowDownRight size={13} className="rotate-up" /></a>
            </div>
          </footer>
        </main>
      </div>
    </>
  )
}