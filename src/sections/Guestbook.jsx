import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PenLine, MessageCircleHeart } from 'lucide-react'
import SectionHeader from '../components/SectionHeader.jsx'
// import useLocalStorage from '../hooks/useLocalStorage.js'
import { useEffect, useState } from 'react'


const API_URL = "https://script.google.com/macros/s/AKfycbzqetyyomqmMjJjlAiqEBSdVtvQJFO-IOo_Qq4xzbUyHTZ-Bpmsb6fjh5IewNA5lAW1jw/exec";



const NAMES = [
  'ابانوب ملاك', 'إبرام ناصر', 'إبرام ميشيل', 'أناسيمون ناصف', 'أناسيمون يعقوب',
  'أمير أيمن', 'انجي مجدي', 'بافلي هاني', 'بسنت ميلاد', 'جرجس أنيس', 'جرجس حنا',
  'رامي منير', 'رامي مينا', 'ريهام جميل', 'ساندرا عبد المسيح', 'ساندي ليشع',
  'ساره عبد الملاك', 'سالي مجدي', 'شادي هاني', 'عبدالمسيح رزق', 'عبدالمسيح روبيل',
  'عبدالمسيح مجدى', 'فادي ذكي', 'فادية راجي', 'كيرلس جرجس', 'كيرلس غالي',
  'كيرلس عيد', 'كيرلس عماد', 'كمال ميلاد', 'مادونا هني', 'ماجدة مجدي', 'ماري ماجد',
  'مارتينا أشرف', 'مارتينا سامي', 'مارتينا يوسف', 'مارينا سمير', 'مارينا عفيفي',
  'مريم ابراهيم', 'مريم عبدمريم', 'مريم عصام', 'مريان غطاس', 'مريام محروس',
  'مينا امين', 'مينا صلاح', 'مينا عيد', 'ميرنا ماجد', 'ميرنا نادي', 'ميشيل ريمون',
  'ميللر فايز', 'مورين محسن', 'مورين يوسف', 'مفدى يوسف', 'هبه نبيل', 'يوسف صبرى',
  'يوسف مجدي', 'يوسف نادي', 'يوستينا سعد',
]




export default function Guestbook() {
  // const [entries, setEntries] = useLocalStorage('guestbook-entries', [])
  const [entries, setEntries] = useState([]);

  const [form, setForm] = useState({ name: '', to: '', message: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
  async function loadEntries() {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      console.error(err);
    }
  }

  loadEntries();
}, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  if (!form.name.trim() || !form.to || !form.message.trim()) {
    setError("Please fill in all fields.");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        name: form.name,
        to: form.to,
        message: form.message,
      }),
    });

    // Make sure the POST request succeeded
    if (!response.ok) {
      throw new Error("Failed to save message");
    }

    await response.text();

        // Clear the form
    setForm({
      name: "",
      to: "",
      message: "",
    });

    // Show success immediately
    setSuccess("Guestbook signed successfully! 🎉");
    setError("");



    // Try to refresh entries, but ignore any errors
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      console.warn("Couldn't refresh guestbook:", err);
    }

  } catch (err) {
    console.error(err);
    setSuccess("Guestbook signed successfully! 🎉");
  }
};
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   if (!form.name.trim() || !form.message.trim()) {
  //     setError('Please add your name and a short message.')
  //     return
  //   }
  //   setError('')
  //   const entry = {
  //     id: Date.now(),
  //     name: form.name.trim(),
  //     to: form.to,
  //     message: form.message.trim(),
  //     date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
  //   }
  //   setEntries([entry, ...entries])
  //   setForm({ name: '', to: '', message: '' })
  // }

  return (
    <section id="guestbook" className="relative py-32 px-6 max-w-3xl mx-auto">
      <SectionHeader
        eyebrow="Leave a Note"
        title="Guestbook"
        subtitle="Sign the book — every message means the world."
      />

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit}
        className="mt-14 glass-strong rounded-2xl p-6 sm:p-8 space-y-4"
      >
        <div>
          <label className="text-xs tracking-[0.2em] uppercase text-white/50">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/90 placeholder-white/30 focus:outline-none focus:border-gold/60 transition-colors"
          />
        </div>
        <div>
          <label className="text-xs tracking-[0.2em] uppercase text-white/50">To</label>
          <select
            value={form.to}
            onChange={(e) => setForm({ ...form, to: e.target.value })}
            className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/90 focus:outline-none focus:border-gold/60 transition-colors"
          >
            <option value="" className="bg-ink2">Select a name…</option>
            {NAMES.map((n) => (
              <option key={n} value={n} className="bg-ink2">{n}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs tracking-[0.2em] uppercase text-white/50">Message</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Share a wish, a memory, or some advice…"
            rows={3}
            className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/90 placeholder-white/30 focus:outline-none focus:border-gold/60 transition-colors resize-none"
          />

{success && (
  <p className="text-sm text-emerald-400">{success}</p>
)}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full flex items-center justify-center gap-2 rounded-full py-3 font-medium text-ink bg-gradient-to-r from-gold-light via-gold to-gold-dim"
        >
          <PenLine className="w-4 h-4" />
          Sign the Guestbook
        </motion.button>
      </motion.form>

      <div className="mt-10 space-y-4">
        <AnimatePresence initial={false}>
          {entries.length === 0 && (
            <p className="text-center text-white/40 text-sm">
              No messages yet — be the first to sign in.
            </p>
          )}
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              layout
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-xl p-5 flex gap-4"
            >
              <MessageCircleHeart className="w-5 h-5 text-gold shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <p className="text-white/90 font-medium">{entry.name}</p>
                  <span className="text-white/30 text-xs">{entry.date}</span>
                </div>
                <p className="mt-1 text-white/65 text-sm leading-relaxed">{entry.message}</p>
                {entry.to && (
                  <p className="mt-1 text-gold/80 text-xs">To: {entry.to}</p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
