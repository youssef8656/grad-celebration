import { motion } from 'framer-motion'

export default function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="text-center"
    >
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="font-display text-4xl sm:text-5xl mt-3 text-gradient-gold">{title}</h2>
      {subtitle && <p className="mt-4 text-white/60 max-w-lg mx-auto">{subtitle}</p>}
    </motion.div>
  )
}
