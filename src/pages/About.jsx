import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from '../components/Logo.jsx'
import about from '../data/about.json'

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
})

/* Refined Vector Icons (No cheap emojis) */
function IconDepartment() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
    </svg>
  )
}

function IconLocation() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21c-4.5-5.5-7-8.5-7-12a7 7 0 0 1 14 0c0 3.5-2.5 6.5-7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}

function IconCommunity() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function IconTerminal() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  )
}

function IconMentorship() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <path d="M16 11l2 2 4-4" />
    </svg>
  )
}

function IconSynergy() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  )
}

function IconEthics() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

function IconBrain() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54z" />
    </svg>
  )
}

function IconSparkle() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function IconAnalytics() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <path d="M3 20h18" />
    </svg>
  )
}

function IconCode() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function IconBook() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}

function IconBuild() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  )
}

function IconShare() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  )
}

const valueIcons = [
  <IconTerminal key="term" />,
  <IconMentorship key="ment" />,
  <IconSynergy key="syn" />,
  <IconEthics key="eth" />,
]

const pillarIcons = [
  <IconBook key="book" />,
  <IconBuild key="build" />,
  <IconShare key="share" />,
]

const domainItems = [
  {
    icon: <IconBrain />,
    title: 'AI & Machine Learning',
    text: 'Classical algorithms, deep learning models, mathematical foundations, and statistical learning.',
  },
  {
    icon: <IconSparkle />,
    title: 'Generative AI',
    text: 'Large language models, prompt engineering, retrieval-augmented generation (RAG), and generative systems.',
  },
  {
    icon: <IconAnalytics />,
    title: 'Data Science',
    text: 'Exploratory data analysis, predictive pipelines, statistical storytelling, and visualization.',
  },
  {
    icon: <IconCode />,
    title: 'Web & Systems',
    text: 'Full-stack web architecture, API integration, and shipping production applications.',
  },
]

export default function About() {
  const { lead, mission, vision, pillars, values } = about

  return (
    <div className="about-page">
      {/* Page Hero */}
      <section className="page-hero">
        <motion.div {...rise()} className="container page-hero__inner">
          <div className="about-hero-logo">
            <Logo size={100} />
          </div>
          <p className="eyebrow">ABOUT NEURA</p>
          <h1>Shaping the future of intelligence at DYPCOE</h1>
          <p className="lead">{lead}</p>

          <div className="about-meta-badges">
            <span className="about-meta-badge">
              <span className="badge-icon-box"><IconDepartment /></span>
              <span>Department of Information Technology</span>
            </span>
            <span className="about-meta-badge">
              <span className="badge-icon-box"><IconLocation /></span>
              <span>DYPCOE, Akurdi, Pune</span>
            </span>
            <span className="about-meta-badge about-meta-badge--accent">
              <span className="badge-icon-box"><IconCommunity /></span>
              <span>Student-Led Technical Community</span>
            </span>
          </div>
        </motion.div>
      </section>

      {/* Mission & Vision Manifesto Section */}
      <section className="section container">
        <div className="about-manifesto-split">
          {/* Mission Card */}
          <motion.div className="manifesto-card" {...rise(0.05)}>
            <div className="manifesto-header">
              <span className="section-kicker">{mission.eyebrow}</span>
            </div>
            <h2>{mission.title}</h2>
            <p className="manifesto-text">{mission.description}</p>
          </motion.div>

          {/* Vision Quote Card */}
          <motion.div className="vision-quote-card" {...rise(0.12)}>
            <div className="vision-quote-tag">{vision.eyebrow}</div>
            <h3 className="vision-quote-title">{vision.title}</h3>
            <blockquote className="vision-quote-body">
              “{vision.quote}”
            </blockquote>
            <div className="vision-quote-footer">
              <span className="vision-charter-label">The Neura Charter</span>
              <span className="vision-charter-inst">DYPCOE Pune</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Methodology: 3 Pillars */}
      <section className="section container">
        <motion.div {...rise()} className="section__head">
          <p className="eyebrow">OUR METHODOLOGY</p>
          <h2>How We Grow as Engineers</h2>
          <p className="muted">Three foundational pillars guiding everything we organize and build.</p>
        </motion.div>

        <div className="grid grid--3 pillars-grid">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              className="pillar-card card"
              {...rise(idx * 0.08)}
            >
              <div className="pillar-top-row">
                <span className="pillar-icon-box">{pillarIcons[idx]}</span>
                <span className="pillar-num">{pillar.num}</span>
              </div>
              <h3>{pillar.title}</h3>
              <div className="pillar-subtitle">{pillar.subtitle}</div>
              <p>{pillar.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Principles & Club Culture */}
      <section className="section container">
        <motion.div {...rise()} className="section__head">
          <p className="eyebrow">CLUB CULTURE</p>
          <h2>Principles We Build By</h2>
          <p className="muted">What sets the Neura learning experience apart.</p>
        </motion.div>

        <div className="grid grid--4 values-grid">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              className="value-card card"
              {...rise(i * 0.07)}
            >
              <span className="value-icon-box">{valueIcons[i]}</span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Focus Areas / Technical Domains */}
      <section className="section container" id="domains">
        <motion.div {...rise()} className="section__head">
          <p className="eyebrow">FOCUS AREAS</p>
          <h2>Core Technical Specializations</h2>
          <p className="muted">Key domains explored across workshops, study groups, and hackathons.</p>
        </motion.div>

        <div className="grid grid--4 domains-grid">
          {domainItems.map((d, i) => (
            <motion.article
              key={d.title}
              className="card card--tilt domain-overview-card"
              {...rise(i * 0.06)}
            >
              <span className="domain-icon-box">{d.icon}</span>
              <h3>{d.title}</h3>
              <p>{d.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Next Steps CTA Banner */}
      <section className="section container">
        <motion.div {...rise()} className="about-cta-card">
          <div className="about-cta-content">
            <p className="eyebrow">GET INVOLVED</p>
            <h2>Ready to explore Neura?</h2>
            <p>
              Discover the student leads powering each domain, view our latest hackathons and workshop archives, or connect directly.
            </p>
          </div>
          <div className="about-cta-buttons">
            <Link to="/hierarchy" className="btn btn--primary">
              <span>Meet the Team</span>
              <span className="btn-arrow">→</span>
            </Link>
            <Link to="/events" className="btn btn--ghost">
              <span>View Events</span>
            </Link>
            <Link to="/contact" className="btn btn--ghost">
              <span>Contact Us</span>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
