import { motion } from 'framer-motion'
import events from '../data/events.json'

const sections = [
  { id: 'upcoming', title: 'Upcoming Events', key: 'upcoming', empty: 'No upcoming events announced yet. Stay tuned!' },
  { id: 'ongoing', title: 'Ongoing Events', key: 'ongoing', empty: 'Nothing is running right now. Check back soon.' },
  { id: 'past', title: 'Past Events', key: 'past', empty: 'Past events will be showcased here.' },
]

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
})

function EventCard({ event, status }) {
  return (
    <article className="card event">
      <span className={`badge badge--${status}`}>{status}</span>
      <h3>{event.title}</h3>
      <p className="muted">
        {[event.date, event.time, event.venue].filter(Boolean).join(' · ')}
      </p>
      {event.description && <p>{event.description}</p>}
      {event.link && (
        <a className="btn btn--ghost btn--sm" href={event.link} target="_blank" rel="noreferrer">
          Learn more
        </a>
      )}
    </article>
  )
}

export default function Events() {
  return (
    <>
      <section className="page-hero">
        <motion.div {...rise()} className="container page-hero__inner">
          <p className="eyebrow">Events</p>
          <h1>Workshops, talks and more</h1>
          <p className="lead">Follow what Neura has done, what is happening now and what is next.</p>
          <div className="pills">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="pill">
                {s.title.replace(' Events', '')}
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="container">
        {sections.map((s) => {
          const list = events[s.key] || []
          return (
            <section key={s.id} id={s.id} className="section events-section">
              <motion.div {...rise()} className="section__head section__head--left">
                <h2>{s.title}</h2>
              </motion.div>
              {list.length ? (
                <div className="grid grid--3">
                  {list.map((e) => (
                    <EventCard key={e.title} event={e} status={s.key} />
                  ))}
                </div>
              ) : (
                <motion.div {...rise()} className="empty">
                  <span className="empty__icon">◌</span>
                  <p>{s.empty}</p>
                </motion.div>
              )}
            </section>
          )
        })}
      </div>
    </>
  )
}
