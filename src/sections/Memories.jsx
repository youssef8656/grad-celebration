import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import SectionHeader from '../components/SectionHeader.jsx'
import siteConfig from '../siteConfig.js'

const TILTS = [-3, 2, -2, 3]

export default function Memories() {
  return (
    <section id="memories" className="relative py-32 px-6 max-w-6xl mx-auto">
      <SectionHeader eyebrow="Moments We Share" title="Memories" />

      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {siteConfig.memories.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: TILTS[i % TILTS.length] }}
            whileHover={{ rotate: 0, y: -6, scale: 1.03 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="glass rounded-2xl p-6 flex flex-col hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:border-gold/30 transition-shadow"
          >
            <Quote className="w-6 h-6 text-gold/50 mb-4" strokeWidth={1.5} />
            <p className="text-white/75 text-sm leading-relaxed flex-1 font-script text-base italic">
              &ldquo;{m.quote}&rdquo;
            </p>
            {/* <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-white/90 text-sm font-medium">{m.name}</p>
              <p className="text-white/40 text-xs">{m.role}</p>
            </div> */}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
