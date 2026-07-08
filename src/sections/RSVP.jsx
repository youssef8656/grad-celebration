import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Users, UtensilsCrossed, Send } from 'lucide-react'
import SectionHeader from '../components/SectionHeader.jsx'
import useLocalStorage from '../hooks/useLocalStorage.js'
import siteConfig from '../siteConfig.js'

const ATTEND_OPTIONS = ['Joyfully Accepts', 'Regretfully Declines']
const FOOD_OPTIONS = ['No Preference', 'Vegetarian', 'Vegan', 'Gluten-Free']

const initialForm = {
  name: '',
  guests: '1',
  attending: ATTEND_OPTIONS[0],
  food: FOOD_OPTIONS[0],
}

export default function RSVP() {
  const [responses, setResponses] = useLocalStorage('rsvp-responses', [])
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('Please tell us your name.')
      return
    }
    setError('')
    const response = { id: Date.now(), ...form, name: form.name.trim() }
    setResponses([response, ...responses])
    setSubmitted(true)
    setForm(initialForm)
    setTimeout(() => setSubmitted(false), 4200)
  }

  return (
    <section id="rsvp" className="relative py-32 px-6 max-w-2xl mx-auto">
      <SectionHeader
        eyebrow={`Kindly Reply By ${new Date(siteConfig.rsvpDeadline).toLocaleDateString(
          undefined,
          { month: 'long', day: 'numeric' }
        )}`}
        title="RSVP"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-14 relative glass-strong rounded-2xl p-6 sm:p-10"
      >
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center text-center py-10"
            >
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12 }}
              >
                <CheckCircle2 className="w-16 h-16 text-gold" strokeWidth={1.25} />
              </motion.div>
              <h3 className="font-display text-2xl mt-6 text-white/90">
                Thank you for your reply
              </h3>
              <p className="mt-2 text-white/55 max-w-xs">
                Your response has been recorded. See you at the celebration.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label className="text-xs tracking-[0.2em] uppercase text-white/50">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={handleChange('name')}
                  placeholder="Your name"
                  className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/90 placeholder-white/30 focus:outline-none focus:border-gold/60 transition-colors"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/50">
                    <Users className="w-3.5 h-3.5" /> Number of Guests
                  </label>
                  <select
                    value={form.guests}
                    onChange={handleChange('guests')}
                    className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/90 focus:outline-none focus:border-gold/60 transition-colors"
                  >
                    {['1', '2', '3', '4'].map((n) => (
                      <option key={n} value={n} className="bg-ink2">
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/50">
                    <UtensilsCrossed className="w-3.5 h-3.5" /> Food Preference
                  </label>
                  <select
                    value={form.food}
                    onChange={handleChange('food')}
                    className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/90 focus:outline-none focus:border-gold/60 transition-colors"
                  >
                    {FOOD_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} className="bg-ink2">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs tracking-[0.2em] uppercase text-white/50">
                  Will You Attend?
                </label>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {ATTEND_OPTIONS.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setForm((f) => ({ ...f, attending: opt }))}
                      className={`py-3 rounded-lg text-sm border transition-colors ${
                        form.attending === opt
                          ? 'bg-gold/15 border-gold text-gold'
                          : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="text-sm text-rose-300">{error}</p>}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-full py-3 font-medium text-ink bg-gradient-to-r from-gold-light via-gold to-gold-dim mt-2"
              >
                <Send className="w-4 h-4" />
                Send RSVP
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
