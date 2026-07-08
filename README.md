# Graduation Celebration

A cinematic, single-page graduation invitation site — dark, luxurious, gold-accented, built with React, Vite, Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Personalizing the site

Almost everything — your name, degree, university, event date/time/venue, journey milestones, schedule, memories, and gallery images — lives in one file:

```
src/siteConfig.js
```

Edit that file and every section updates automatically. The gallery uses placeholder Unsplash photos by default; swap in your own image URLs (or local files placed in `public/`) whenever you're ready.

## Video intro

The site opens on a full-screen video gate — nothing else is visible until it finishes:

1. Drop your clip at `public/intro.mp4` (and, optionally, a first-frame preview image at `public/intro-poster.jpg`).
2. Nothing shows except the video and a "Tap to Begin" button.
3. Clicking the button starts the video **and** the background music at the same time.
4. When the video ends, it fades out and the full site fades in — the music keeps playing underneath.

This is implemented in `src/components/VideoIntro.jsx`, wired up in `src/App.jsx`.

## Music

- Drop your track at `public/music.mp3`. It's started by the video intro's click (see above), so there's no autoplay-blocking issue — clicking the video counts as the user interaction the browser needs.
- A toggle button in the navbar (top right on desktop) lets visitors mute/unmute afterward.


## Notes

- **Guestbook & RSVP** are frontend-only: responses are saved to the visitor's browser `localStorage`, so they're private to that device/browser — there's no shared backend or database.
- **Custom cursor** only activates on devices with a fine pointer (mouse), so touch devices get the normal cursor experience.
- Reduced-motion preferences are respected — animations shorten automatically for visitors who have that setting enabled.

## Project structure

```
src/
  components/   reusable UI pieces (nav, cursor, footer, etc.)
  sections/     one file per page section (Hero, Journey, Gallery, ...)
  hooks/        useLocalStorage
  siteConfig.js all editable content in one place
  App.jsx       assembles the sections
  index.css     global styles + Tailwind
```
