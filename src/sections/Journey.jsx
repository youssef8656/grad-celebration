import { motion } from 'framer-motion'
import siteConfig from '../siteConfig.js'
import SectionHeader from '../components/SectionHeader.jsx'

export default function Journey() {
  return (
    <section id="journey" className="relative py-32 px-6 max-w-5xl mx-auto">
      <SectionHeader eyebrow="The Road Here" title="Our Journey" />

      <div className="relative mt-20">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent md:-translate-x-1/2" />

        <div className="space-y-16">
          {siteConfig.journey.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${
                i % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                  i % 2 === 1 ? 'md:pl-16 md:text-left' : 'md:pr-16 md:text-right'
                }`}
              >
                <div className="glass rounded-2xl p-6 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-300">
                  <span className="text-gold text-xs tracking-[0.3em] uppercase">
                    {item.year}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl mt-2 text-white/90">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-white/60 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-1.5">
                <span className="block w-3 h-3 rounded-full bg-gold shadow-[0_0_12px_rgba(212,175,55,0.8)]" />
              </div>

              <div className="hidden md:block w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
