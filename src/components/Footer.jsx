import { motion } from 'framer-motion'
import { GraduationCap, Instagram, Linkedin, Twitter } from 'lucide-react'
import siteConfig from '../siteConfig.js'

export default function Footer() {
  return (
    <footer className="relative pt-24 pb-10 px-6 text-center border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <GraduationCap className="w-8 h-8 text-gold mx-auto mb-5" strokeWidth={1.25} />
        <p className="font-script italic text-2xl text-white/80 max-w-md mx-auto">
          Thank you for being part of my story, and for celebrating this chapter with me.
        </p>

        <div className="flex items-center justify-center gap-5 mt-8">
          <a
            href={siteConfig.social.instagram}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-gold hover:border-gold/40 transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href={siteConfig.social.x}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-gold hover:border-gold/40 transition-colors"
            aria-label="X (Twitter)"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href={siteConfig.social.linkedin}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-gold hover:border-gold/40 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>

        <div className="divider-gold w-16 mx-auto my-8" />

        <p className="text-white/30 text-xs tracking-wide">
          &copy; {new Date().getFullYear()} {siteConfig.name}. Made with gratitude.
        </p>
      </motion.div>
    </footer>
  )
}
