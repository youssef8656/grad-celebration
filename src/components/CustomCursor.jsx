import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [isPointer, setIsPointer] = useState(false)
  const [visible, setVisible] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    setEnabled(isFinePointer)
    if (!isFinePointer) return

    document.body.classList.add('custom-cursor-active')

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
      const target = e.target
      setIsPointer(!!target.closest('a, button, input, textarea, [role="button"]'))
    }
    const hide = () => setVisible(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', hide)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', hide)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [])

  if (!enabled) return null

  return (
    <motion.div
      className="fixed top-0 left-0 z-[200] pointer-events-none mix-blend-difference"
      animate={{
        x: pos.x - (isPointer ? 20 : 6),
        y: pos.y - (isPointer ? 20 : 6),
        opacity: visible ? 1 : 0,
        scale: isPointer ? 1.4 : 1,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 40, mass: 0.4 }}
    >
      <div
        className={`rounded-full border border-gold ${
          isPointer ? 'w-10 h-10 bg-gold/10' : 'w-3 h-3 bg-gold'
        }`}
      />
    </motion.div>
  )
}
