import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.35 })
  const springY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.35 })

  useEffect(() => {
    const move = (event) => { x.set(event.clientX); y.set(event.clientY) }
    const hover = (event) => {
      const target = event.target.closest('a, button, [data-cursor="link"]')
      cursorRef.current?.classList.toggle('cursor-hover', Boolean(target))
    }
    const leave = () => cursorRef.current?.classList.add('cursor-hidden')
    const enter = () => cursorRef.current?.classList.remove('cursor-hidden')
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', hover)
    document.addEventListener('pointerout', hover)
    document.addEventListener('pointerleave', leave)
    document.addEventListener('pointerenter', enter)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', hover)
      document.removeEventListener('pointerout', hover)
      document.removeEventListener('pointerleave', leave)
      document.removeEventListener('pointerenter', enter)
    }
  }, [x, y])

  return <motion.div ref={cursorRef} className="custom-cursor" style={{ x: springX, y: springY }} aria-hidden="true"><span /></motion.div>
}