import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import VideoIntro from './components/VideoIntro.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Navbar from './components/Navbar.jsx'
import BackToTop from './components/BackToTop.jsx'
import Footer from './components/Footer.jsx'

import Hero from './sections/Hero.jsx'
import Journey from './sections/Journey.jsx'
import Gallery from './sections/Gallery.jsx'
import EventDetails from './sections/EventDetails.jsx'
import Schedule from './sections/Schedule.jsx'
import Memories from './sections/Memories.jsx'
import Guestbook from './sections/Guestbook.jsx'
import RSVP from './sections/RSVP.jsx'
import Celebration from './sections/Celebration.jsx'

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const audioRef = useRef(null)

  // Lock scrolling while the video intro is the only thing on screen.
  useEffect(() => {
    document.body.style.overflow = introDone ? '' : 'hidden'
  }, [introDone])

  const startMusic = () => {
    const audio = audioRef.current
    if (!audio) return
    audio
      .play()
      .then(() => setMusicPlaying(true))
      .catch(() => {
        // Autoplay blocked for some reason — the toggle button in the
        // navbar still lets the visitor start it manually.
      })
  }

  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return
    if (musicPlaying) {
      audio.pause()
      setMusicPlaying(false)
    } else {
      audio
        .play()
        .then(() => setMusicPlaying(true))
        .catch(() => {})
    }
  }

  return (
    <>
      {/* Drop your track at /public/music.mp3 — playback is started by the
          video intro's click and keeps going after the video ends. */}
      <audio ref={audioRef} src="/music.mp3" loop />

      <CustomCursor />

      <AnimatePresence>
        {!introDone && (
          <VideoIntro onStart={startMusic} onFinish={() => setIntroDone(true)} />
        )}
      </AnimatePresence>

      {introDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <ScrollProgress />
          <Navbar musicPlaying={musicPlaying} onToggleMusic={toggleMusic} />

          <main className="relative">
            <Hero />
            <Journey />
            <Gallery />
            <EventDetails />
            <Schedule />
            <Memories />
            <Guestbook />
            {/* <RSVP /> */}
            <Celebration />
          </main>

          <Footer />
          <BackToTop />
        </motion.div>
      )}
    </>
  )
}
