import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Automatically import all images and info.json from any subfolder in src/data/gallery/
const imageFiles = import.meta.glob(
  '../data/gallery/**/*.{jpg,jpeg,png,webp,svg,JPG,JPEG,PNG,WEBP,avif,AVIF}',
  { eager: true, query: '?url', import: 'default' }
)

const infoFiles = import.meta.glob('../data/gallery/**/info.json', {
  eager: true,
  import: 'default',
})

function formatFolderName(str = '') {
  return str
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bAi\b/g, 'AI')
    .replace(/\bMl\b/g, 'ML')
    .replace(/\bDypcoe\b/g, 'DYPCOE')
}

function buildGalleryData() {
  const eventsMap = {}

  // Parse info.json files per folder
  const metaMap = {}
  for (const [path, content] of Object.entries(infoFiles)) {
    const cleanPath = path.replace(/\\/g, '/')
    const parts = cleanPath.split('/')
    const idx = parts.indexOf('gallery')
    if (idx !== -1 && idx + 1 < parts.length) {
      const folder = parts[idx + 1]
      metaMap[folder] = content
    }
  }

  // Parse images per folder
  for (const [path, url] of Object.entries(imageFiles)) {
    const cleanPath = path.replace(/\\/g, '/')
    const parts = cleanPath.split('/')
    const idx = parts.indexOf('gallery')
    if (idx === -1 || idx + 2 >= parts.length) continue

    const folder = parts[idx + 1]
    const filename = parts[parts.length - 1]
    const titleWithoutExt = filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')

    if (!eventsMap[folder]) {
      const meta = metaMap[folder] || {}
      eventsMap[folder] = {
        id: folder,
        title: meta.title || formatFolderName(folder),
        date: meta.date || '',
        venue: meta.venue || '',
        description: meta.description || '',
        images: [],
      }
    }

    eventsMap[folder].images.push({
      url,
      caption: formatFolderName(titleWithoutExt),
      filename,
      eventName: eventsMap[folder].title,
      date: eventsMap[folder].date,
    })
  }

  return Object.values(eventsMap)
}

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
})

export default function Gallery() {
  const events = useMemo(() => buildGalleryData(), [])
  const [activeTab, setActiveTab] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  // Filtered images list
  const currentImages = useMemo(() => {
    if (activeTab === 'all') {
      return events.flatMap((e) => e.images)
    }
    const found = events.find((e) => e.id === activeTab)
    return found ? found.images : []
  }, [events, activeTab])

  const totalImageCount = useMemo(
    () => events.reduce((sum, e) => sum + e.images.length, 0),
    [events]
  )

  // Lightbox keyboard controls
  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % currentImages.length)
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, currentImages.length])

  return (
    <>
      <section className="page-hero">
        <motion.div {...rise()} className="container page-hero__inner">
          <p className="eyebrow">Moments & Memories</p>
          <h1>Neura Gallery</h1>
          <p className="lead">
            A visual chronicle of Neura moments, milestone events, and the shared memories that define our journey.
          </p>

          {/* Filter Pills */}
          <div className="pills gallery__pills">
            <button
              type="button"
              className={`pill ${activeTab === 'all' ? 'pill--active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Events <span>({totalImageCount})</span>
            </button>
            {events.map((e) => (
              <button
                key={e.id}
                type="button"
                className={`pill ${activeTab === e.id ? 'pill--active' : ''}`}
                onClick={() => setActiveTab(e.id)}
              >
                {e.title} <span>({e.images.length})</span>
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="section container">
        {currentImages.length > 0 ? (
          <motion.div layout className="gallery__grid">
            <AnimatePresence>
              {currentImages.map((img, idx) => (
                <motion.article
                  key={`${img.url}-${idx}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  className="gallery__card"
                  onClick={() => setLightboxIndex(idx)}
                >
                  <div className="gallery__thumb">
                    <img src={img.url} alt={img.caption} loading="lazy" />
                    <div className="gallery__overlay">
                      <span className="gallery__badge">{img.eventName}</span>
                      <h4 className="gallery__caption">{img.caption}</h4>
                      {img.date && <p className="gallery__date">{img.date}</p>}
                      <div className="gallery__zoom-icon" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8"/>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                          <line x1="11" y1="8" x2="11" y2="14"/>
                          <line x1="8" y1="11" x2="14" y2="11"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div {...rise()} className="empty">
            <span className="empty__icon" aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            </span>
            <p>No photos uploaded for this event yet.</p>
            <p className="muted">Drop images into <code>src/data/gallery/&lt;Event Name&gt;/</code> to show them here.</p>
          </motion.div>
        )}
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && currentImages[lightboxIndex] && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="lightbox__close"
              type="button"
              aria-label="Close modal"
              onClick={() => setLightboxIndex(null)}
            >
              ✕
            </button>

            {currentImages.length > 1 && (
              <>
                <button
                  className="lightbox__nav lightbox__nav--prev"
                  type="button"
                  aria-label="Previous photo"
                  onClick={(e) => {
                    e.stopPropagation()
                    setLightboxIndex(
                      (prev) => (prev - 1 + currentImages.length) % currentImages.length
                    )
                  }}
                >
                  ‹
                </button>
                <button
                  className="lightbox__nav lightbox__nav--next"
                  type="button"
                  aria-label="Next photo"
                  onClick={(e) => {
                    e.stopPropagation()
                    setLightboxIndex((prev) => (prev + 1) % currentImages.length)
                  }}
                >
                  ›
                </button>
              </>
            )}

            <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={currentImages[lightboxIndex].url}
                src={currentImages[lightboxIndex].url}
                alt={currentImages[lightboxIndex].caption}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="lightbox__img"
              />
              <div className="lightbox__bar">
                <div>
                  <strong>{currentImages[lightboxIndex].caption}</strong>
                  <p>{currentImages[lightboxIndex].eventName} {currentImages[lightboxIndex].date && `· ${currentImages[lightboxIndex].date}`}</p>
                </div>
                <span className="lightbox__counter">
                  {lightboxIndex + 1} / {currentImages.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
