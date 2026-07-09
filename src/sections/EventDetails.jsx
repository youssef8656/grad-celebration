import { motion } from 'framer-motion'
import { CalendarDays, Clock, MapPin, Shirt, UtensilsCrossed } from 'lucide-react'
import SectionHeader from '../components/SectionHeader.jsx'
import siteConfig from '../siteConfig.js'

const ITEMS = (e) => [
  { icon: CalendarDays, label: 'Date', value: e.dateLabel },
  { icon: Clock, label: 'Time', value: e.time },
  { icon: MapPin, label: 'Venue', value: `${e.venue} ${e.address}` },
]

export default function EventDetails() {
  const items = ITEMS(siteConfig.event)

  return (
    <section id="details" className="relative py-32 px-6 max-w-4xl mx-auto">
      <SectionHeader eyebrow="The Occasion" title="Event Details" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mt-16 glass-strong rounded-3xl p-8 sm:p-12 grid sm:grid-cols-2 gap-8"
      >
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={`flex items-start gap-4 ${i === items.length - 1 ? 'sm:col-span-2' : ''}`}
          >
            <div className="shrink-0 w-11 h-11 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center">
              <item.icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-white/40">{item.label}</p>
              <p className="mt-1 text-white/85 leading-relaxed">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
