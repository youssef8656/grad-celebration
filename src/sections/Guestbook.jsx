import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PenLine, MessageCircleHeart } from 'lucide-react'
import SectionHeader from '../components/SectionHeader.jsx'
import useLocalStorage from '../hooks/useLocalStorage.js'

export default function Guestbook() {
  const [entries, setEntries] = useLocalStorage('guestbook-entries', [])
  const [form, setForm] = useState({ name: '', message: '' })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.message.trim()) {
      setError('Please add your name and a short message.')
      return
    }
    setError('')
    const entry = {
      id: Date.now(),
      name: form.name.trim(),
      message: form.message.trim(),
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
    }
    setEntries([entry, ...entries])
    setForm({ name: '', message: '' })
  }

  return (
    <section id="guestbook" className="relative py-32 px-6 max-w-3xl mx-auto">
      <SectionHeader
        eyebrow="Leave a Note"
        title="Guestbook"
        subtitle="Sign the book — every message means the world."
      />

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit}
        className="mt-14 glass-strong rounded-2xl p-6 sm:p-8 space-y-4"
      >
        <div>
          <label className="text-xs tracking-[0.2em] uppercase text-white/50">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/90 placeholder-white/30 focus:outline-none focus:border-gold/60 transition-colors"
          />
        </div>
        <div>
          <label className="text-xs tracking-[0.2em] uppercase text-white/50">Message</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Share a wish, a memory, or some advice…"
            rows={3}
            className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/90 placeholder-white/30 focus:outline-none focus:border-gold/60 transition-colors resize-none"
          />
        </div>

        {error && <p className="text-sm text-rose-300">{error}</p>}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full flex items-center justify-center gap-2 rounded-full py-3 font-medium text-ink bg-gradient-to-r from-gold-light via-gold to-gold-dim"
        >
          <PenLine className="w-4 h-4" />
          Sign the Guestbook
        </motion.button>
      </motion.form>

      <div className="mt-10 space-y-4">
        <AnimatePresence initial={false}>
          {entries.length === 0 && (
            <p className="text-center text-white/40 text-sm">
              No messages yet — be the first to sign in.
            </p>
          )}
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              layout
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-xl p-5 flex gap-4"
            >
              <MessageCircleHeart className="w-5 h-5 text-gold shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <p className="text-white/90 font-medium">{entry.name}</p>
                  <span className="text-white/30 text-xs">{entry.date}</span>
                </div>
                <p className="mt-1 text-white/65 text-sm leading-relaxed">{entry.message}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
