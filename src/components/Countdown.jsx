import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function getTimeLeft(target) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now())
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function Countdown({ target }) {
  const [time, setTime] = useState(() => getTimeLeft(target))

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ]

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-5">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-3 sm:gap-5">
          <div className="flex flex-col items-center">
            <div className="relative w-16 sm:w-20 h-16 sm:h-20 rounded-2xl glass flex items-center justify-center overflow-hidden">
              <motion.span
                key={u.value}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="font-display text-2xl sm:text-3xl text-gold tabular-nums"
              >
                {String(u.value).padStart(2, '0')}
              </motion.span>
            </div>
            <span className="mt-2 text-[10px] tracking-[0.25em] uppercase text-white/50">
              {u.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="text-gold/40 text-xl -mt-4">:</span>
          )}
        </div>
      ))}
    </div>
  )
}
