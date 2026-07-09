import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeader from '../components/SectionHeader.jsx'
import siteConfig from '../siteConfig.js'

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null)
  const images = siteConfig.gallery
  const vedios = siteConfig.vedios

  const close = () => setActiveIndex(null)
  const next = () => setActiveIndex((i) => (i + 1) % images.length)
  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length)

  return (
    <section id="gallery" className="relative py-32 px-6 max-w-6xl mx-auto">
      <SectionHeader eyebrow="Captured Moments" title="Gallery" />

      <div className="mt-16 columns-2 sm:columns-3 gap-4 space-y-4">
        {images.map((img, i) => (
          <motion.button
            key={img.src}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: (i % 6) * 0.08 }}
            onClick={() => setActiveIndex(i)}
            className="relative w-full block break-inside-avoid rounded-2xl overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="absolute bottom-3 left-4 text-xs text-white/0 group-hover:text-white/80 transition-colors duration-500">
              {img.alt}
            </span>
          </motion.button>
        ))}
      </div>




      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-ink/95 backdrop-blur-xl flex items-center justify-center px-4"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute top-6 right-6 text-white/70 hover:text-gold transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              className="absolute left-4 sm:left-8 text-white/60 hover:text-gold transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" />
            </button>
            <motion.img
              key={images[activeIndex].src}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[80vh] max-w-full rounded-xl shadow-2xl"
            />
            <button
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              className="absolute right-4 sm:right-8 text-white/60 hover:text-gold transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mt-24">
  <h3 className="text-2xl font-semibold text-center mb-8 section-eyebrow font-big">
    Videos
  </h3>

  <div className="flex">
    {vedios.map((video) => (
      <video
        key={video.src}
        controls
        poster={video.thumbnail}
        className="w-phone rounded-2xl"
      >
        <source src={video.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    ))}
  </div>
</div>
    </section>
    
  )
}
