import { motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader.jsx'
import siteConfig from '../siteConfig.js'

export default function Schedule() {
  return (
    <section id="schedule" className="relative py-32 px-6 max-w-2xl mx-auto">
      <SectionHeader eyebrow="How the Evening Unfolds" title="Schedule" />

      <div className="mt-16 relative pl-10">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-gold/60 via-gold/20 to-transparent" />

        <div className="space-y-10">
          {siteConfig.schedule.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="relative"
            >
              <span className="absolute -left-10 top-1.5 w-3.5 h-3.5 rounded-full bg-ink border-2 border-gold shadow-[0_0_10px_rgba(212,175,55,0.6)]" />
              <div className="glass rounded-xl p-5 hover:border-gold/40 transition-colors">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <h3 className="font-display text-lg text-white/90">{item.title}</h3>
                  <span className="text-gold text-xs tracking-[0.2em] uppercase">
                    {item.time}
                  </span>
                </div>
                <p className="mt-2 text-white/55 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
