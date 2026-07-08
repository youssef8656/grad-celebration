import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'

// Controlled component: playback itself lives in App.jsx (started by the
// video intro), this button just reflects and toggles that state.
export default function MusicToggle({ playing, onToggle }) {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      onClick={onToggle}
      title="Toggle music"
      className="w-10 h-10 rounded-full glass flex items-center justify-center text-gold transition-colors"
    >
      {playing ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
    </motion.button>
  )
}
