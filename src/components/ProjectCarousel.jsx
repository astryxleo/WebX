import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, MoveRight } from 'lucide-react'

const projects = [
  { number: '01', name: 'Aether / Spatial Interface', type: 'EXPERIMENTAL WEBGL', year: '2026', className: 'project-aether', shape: 'aether-shape', tag: 'DIGITAL EXPERIENCE' },
  { number: '02', name: 'Mono / Objects of focus', type: 'E-COMMERCE / ART DIRECTION', year: '2025', className: 'project-mono', shape: 'mono-shape', tag: 'BRAND PLATFORM' },
  { number: '03', name: 'Orbit / Beyond the frame', type: 'INTERACTIVE STORYTELLING', year: '2025', className: 'project-orbit', shape: 'orbit-shape', tag: 'WEB EXPERIMENT' },
  { number: '04', name: 'Forme / Matter in motion', type: 'CREATIVE DEVELOPMENT', year: '2024', className: 'project-forme', shape: 'forme-shape', tag: 'DIGITAL ART' },
]

function ProjectCard({ project }) {
  const card = useRef(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 180, damping: 20 })
  const springY = useSpring(rotateY, { stiffness: 180, damping: 20 })
  const glareX = useTransform(springY, [-8, 8], ['70%', '30%'])
  const onMove = (event) => {
    if (!card.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = card.current.getBoundingClientRect()
    rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 10)
    rotateX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 8)
  }
  const reset = () => { rotateX.set(0); rotateY.set(0) }
  return <motion.article ref={card} className="project-card" onPointerMove={onMove} onPointerLeave={reset} style={{ rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d' }}>
    <div className={'project-art ' + project.className}>
      <div className="art-grid" />
      <div className={'project-shape ' + project.shape} />
      <div className="art-label">{project.tag}<span>↗</span></div>
      <motion.div className="art-glare" style={{ background: useTransform(glareX, (v) => 'radial-gradient(circle at ' + v + ' 40%, rgba(166,247,232,.12), transparent 48%)') }} />
    </div>
    <div className="project-info"><div><span className="project-number">{project.number} / {project.year}</span><h3>{project.name}</h3><p>{project.type}</p></div><a href="mailto:hello@webx.studio?subject=Tell%20me%20about%20your%20work" aria-label={'Ask about ' + project.name}><ArrowUpRight size={19} /></a></div>
  </motion.article>
}

export default function ProjectCarousel() {
  const track = useRef(null)
  return <div className="carousel-shell">
    <motion.div ref={track} className="project-track" drag="x" dragConstraints={{ left: -Math.max(0, projects.length * 430 - (typeof window !== 'undefined' ? window.innerWidth - 80 : 1200)), right: 0 }} dragElastic={0.08} dragTransition={{ bounceStiffness: 260, bounceDamping: 28 }} whileTap={{ cursor: 'grabbing' }}>
      {projects.map((project) => <ProjectCard key={project.number} project={project} />)}
    </motion.div>
    <div className="carousel-footer"><span>DRAG TO EXPLORE <MoveRight size={14} /></span><span>01 — 04 / SELECTED PROJECTS</span></div>
  </div>
}