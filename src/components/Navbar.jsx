import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, GraduationCap } from 'lucide-react'
import MusicToggle from './MusicToggle.jsx'

const LINKS = [
  { href: '#journey', label: 'Journey' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#details', label: 'Details' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#memories', label: 'Memories' },
]

export default function Navbar({ musicPlaying, onToggleMusic }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (href) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3 bg-ink/70 backdrop-blur-xl border-b border-white/5' : 'py-6 bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            go('#hero')
          }}
          className="flex items-center gap-2 text-gold"
        >
          <GraduationCap className="w-5 h-5" strokeWidth={1.5} />
          <span className="font-display text-sm tracking-widest uppercase text-white/80">
            Class of '26
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                e.preventDefault()
                go(l.href)
              }}
              className="text-xs tracking-[0.2em] uppercase text-white/60 hover:text-gold transition-colors"
            >
              {l.label}
            </a>
          ))}
          <MusicToggle playing={musicPlaying} onToggle={onToggleMusic} />
        </div>

        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-white/80"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] bg-ink/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-white/80"
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>
            {LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                onClick={(e) => {
                  e.preventDefault()
                  go(l.href)
                }}
                className="font-display text-2xl text-white/90 hover:text-gold transition-colors"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
