import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Countdown from '../components/Countdown.jsx'
import siteConfig from '../siteConfig.js'

function Particles({ count = 30 }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        duration: 5 + Math.random() * 8,
        delay: Math.random() * 6,
      })),
    [count]
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-gold/60"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 overflow-hidden bg-radial-glow"
    >
      {/* moving gradient lights */}
      <motion.div
        className="absolute -top-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-haze/20 blur-[100px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-40 -right-32 w-[28rem] h-[28rem] rounded-full bg-gold/10 blur-[110px]"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <Particles />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="section-eyebrow mb-6"
      >
        Save the Date
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.9, ease: 'easeOut' }}
        className="font-display text-center font-medium leading-[1.05] text-[clamp(2.75rem,8vw,6.5rem)] sheen-text"
      >
        You&rsquo;re Invited
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.9 }}
        className="mt-3 font-script italic text-center text-2xl sm:text-3xl text-white/70"
      >
        to our Graduation Celebration
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="divider-gold w-24 my-8"
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-center"
      >
        <h2 className="font-display text-3xl sm:text-4xl text-gradient-gold">
          {siteConfig.name}
        </h2>
        <p className="mt-2 text-white/60 text-sm sm:text-base tracking-wide">
          {siteConfig.degree} &middot; {siteConfig.university} &middot; {siteConfig.gradYear}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-10"
      >
        <Countdown target={siteConfig.event.date} />
      </motion.div>

      {/* <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => document.querySelector('#rsvp')?.scrollIntoView({ behavior: 'smooth' })}
        className="relative mt-10 px-10 py-4 rounded-full font-medium tracking-wide text-ink bg-gradient-to-r from-gold-light via-gold to-gold-dim overflow-hidden group"
      >
        <span className="relative z-10">RSVP Now</span>
        <span className="absolute inset-0 bg-gold-sheen bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-sheen transition-opacity" />
      </motion.button> */}

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 text-white/40"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  )
}
