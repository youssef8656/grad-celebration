import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

// Full-screen intro gate. Nothing else on the site renders while this is
// showing. Clicking the play button starts the video (with its own audio,
// if any) AND the background music at the same time — both are triggered
// inside this same click handler so the browser treats them as a direct
// user gesture and won't block playback with sound.
//
// Drop your clip at /public/intro.mp4 (and optionally a first-frame image
// at /public/intro-poster.jpg) to replace the placeholder.
export default function VideoIntro({ onStart, onFinish }) {
  const videoRef = useRef(null)
  const [started, setStarted] = useState(false)

  const handleBegin = () => {
    const video = videoRef.current
    if (video) {
      video.play().catch(() => {
        // If the browser still blocks it for some reason, skip straight
        // to the site rather than leaving the visitor stuck.
        onFinish?.()
      })
    }
    setStarted(true)
    onStart?.()
  }

  return (
    <motion.div
      onClick={handleBegin}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
      className="fixed inset-0 z-[200] bg-ink flex items-center justify-center overflow-hidden"
    >
      <video
        ref={videoRef}
        src="/intro.mp4"
        poster="/intro-poster.jpg"
        playsInline
        onEnded={() => onFinish?.()}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dim overlay before playback starts, so the click prompt reads clearly
          even if the video's first frame is bright. Fades away once clicked. */}
      {/* <motion.div
        className="absolute inset-0 bg-ink/50"
        animate={{ opacity: started ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      /> */}

      {!started && (
        <motion.button
          
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex flex-col items-center gap-4 group"
          aria-label="Begin"
        >
          <motion.span
            animate={{ boxShadow: ['0 0 0 0 rgba(212,175,55,0.35)', '0 0 0 18px rgba(212,175,55,0)'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            className="w-20 h-20 rounded-full glass-strong flex items-center justify-center group-hover:scale-105 transition-transform"
          >
            <Play className="w-8 h-8 text-gold ml-1" fill="currentColor" strokeWidth={0} />
          </motion.span>
          <span className="text-white/70 text-xs tracking-[0.35em] uppercase">
            Tap to Begin
          </span>
        </motion.button>
      )}
    </motion.div>
  )
}
