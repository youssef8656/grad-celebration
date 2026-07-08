import { useEffect, useMemo, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Star, Sparkle } from 'lucide-react'
import { useRef } from 'react'

const COLORS = ['#D4AF37', '#F1D785', '#FFFFFF', '#4C6EF5']

function ConfettiPiece({ i }) {
  const left = useMemo(() => Math.random() * 100, [])
  const color = COLORS[i % COLORS.length]
  const duration = 4 + Math.random() * 3
  const delay = Math.random() * 2
  const rotateDir = Math.random() > 0.5 ? 360 : -360

  return (
    <motion.span
      className="absolute top-0 block"
      style={{
        left: `${left}%`,
        width: 8,
        height: 14,
        backgroundColor: color,
        borderRadius: 2,
      }}
      initial={{ y: -40, opacity: 0, rotate: 0 }}
      animate={{ y: '110vh', opacity: [0, 1, 1, 0], rotate: rotateDir }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    />
  )
}

function FloatingIcon({ Icon, i, variant }) {
  const left = useMemo(() => 5 + Math.random() * 90, [])
  const duration = 6 + Math.random() * 6
  const delay = Math.random() * 4
  const size = variant === 'cap' ? 22 + Math.random() * 14 : 10 + Math.random() * 10

  return (
    <motion.div
      className="absolute"
      style={{ left: `${left}%`, bottom: -40 }}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: '-120vh', opacity: [0, 0.8, 0.8, 0], rotate: [0, 15, -15, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Icon
        style={{ width: size, height: size }}
        className={variant === 'cap' ? 'text-gold/70' : 'text-gold-light/60'}
        strokeWidth={1.25}
      />
    </motion.div>
  )
}

function Firework({ x, y, delay }) {
  const particles = 12
  return (
    <motion.div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 1.6, delay, repeat: Infinity, repeatDelay: 3.5 }}
    >
      {Array.from({ length: particles }).map((_, i) => {
        const angle = (i / particles) * Math.PI * 2
        return (
          <motion.span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold-light"
            style={{ left: 0, top: 0 }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: Math.cos(angle) * 60,
              y: Math.sin(angle) * 60,
              opacity: 0,
            }}
            transition={{ duration: 1.4, delay, repeat: Infinity, repeatDelay: 3.7, ease: 'easeOut' }}
          />
        )
      })}
    </motion.div>
  )
}

export default function Celebration() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.4 })
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (isInView) setActive(true)
  }, [isInView])

  return (
    <section
      id="celebration"
      ref={ref}
      className="relative py-40 px-6 overflow-hidden text-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent" />

      {active && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 40 }).map((_, i) => (
            <ConfettiPiece key={`c-${i}`} i={i} />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <FloatingIcon key={`cap-${i}`} Icon={GraduationCap} i={i} variant="cap" />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <FloatingIcon key={`star-${i}`} Icon={i % 2 ? Star : Sparkle} i={i} variant="star" />
          ))}
          <Firework x={20} y={30} delay={0} />
          <Firework x={70} y={20} delay={1.2} />
          <Firework x={45} y={45} delay={2.4} />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <GraduationCap className="w-14 h-14 text-gold mx-auto mb-6" strokeWidth={1.25} />
        <h2 className="font-display text-4xl sm:text-6xl sheen-text">
          The Moment Has Arrived
        </h2>
        <p className="mt-5 text-white/60 max-w-md mx-auto">
          Four years of work, worry, and wonder — all leading to one unforgettable night.
        </p>
      </motion.div>
    </section>
  )
}
