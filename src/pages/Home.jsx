import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero3D from '../components/Hero3D.jsx'
import site from '../data/site.json'
import { asset } from '../utils.js'

const reduced =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const BASE = reduced ? 0 : 3.2

const rise = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
}

/* Vector SVG Icons (No cheap emojis) */
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

function IconTerminal() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  )
}

function IconGitBranch() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  )
}

function IconUsers() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}


const domainsList = [
  {
    icon: <IconBrain />,
    title: 'AI & Machine Learning',
    text: 'Algorithms, mathematical foundations, neural architectures, and intelligent systems.',
  },
  {
    icon: <IconSparkle />,
    title: 'Generative AI',
    text: 'Large language models, prompt engineering, RAG pipelines, and generative agents.',
  },
  {
    icon: <IconAnalytics />,
    title: 'Data Science',
    text: 'Exploratory data analysis, predictive pipelines, statistical storytelling, and visualization.',
  },
  {
    icon: <IconCode />,
    title: 'Web & Systems',
    text: 'Full-stack development, API integrations, and deploying AI solutions to the web.',
  },
]

const featuresList = [
  {
    icon: <IconTerminal />,
    num: '01',
    title: 'Hands-on Workshops',
    text: 'Code-first sessions breaking down complex AI models, PyTorch pipelines, and production toolchains.',
  },
  {
    icon: <IconGitBranch />,
    num: '02',
    title: 'Collaborative Projects',
    text: 'Cross-functional student teams designing software, shipping repositories, and competing in hackathons.',
  },
  {
    icon: <IconUsers />,
    num: '03',
    title: 'Peer Mentorship',
    text: 'Domain leads and senior members actively guiding students through technical roadblocks, tools, and project builds.',
  },
]

export default function Home() {
  const [run] = useState(0)
  const [heroInView, setHeroInView] = useState(true)
  const heroRef = useRef(null)

  useEffect(() => {
    if (!heroRef.current || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroInView(entry.isIntersecting)
      },
      { threshold: 0.05 }
    )
    observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="home-page">
      {/* 3D Hero Section (Preserved) */}
      <section ref={heroRef} className="hero">
        <div className="hero__canvas" key={`c${run}`}>
          <Hero3D reduced={reduced} inView={heroInView} />
        </div>
        <div className="hero__glow" aria-hidden />

        <div className="hero__overlay" key={`o${run}`}>
          <h1 className="hero__name">
            <motion.img
              className="hero__wordmark"
              src={asset('logo-text.png')}
              alt="Neura AI Club, DYPCOE"
              draggable={false}
              style={{ transformPerspective: 900 }}
              initial={{ opacity: 0, rotateX: -75, y: 50, scale: 0.92, filter: 'blur(14px)' }}
              animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{ delay: BASE, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </h1>
          <motion.p
            className="hero__tag"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: BASE + 1, duration: 0.8 }}
          >
            {site.tagline}
          </motion.p>
          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: BASE + 1.3, duration: 0.8 }}
          >
            <Link to="/about" className="btn btn--primary">
              <span>Discover Neura</span>
              <span className="btn-arrow">→</span>
            </Link>
            <Link to="/events" className="btn btn--ghost">
              <span>View Events</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section 1: Focus Domains */}
      <section className="section container">
        <motion.div {...rise} className="section__head">
          <p className="eyebrow">EXPLORATION</p>
          <h2>Where curiosity meets intelligent engineering</h2>
          <p className="muted">
            From algorithmic foundations to generative intelligence, here is what our members explore.
          </p>
        </motion.div>

        <div className="grid grid--4 home-domains-grid">
          {domainsList.map((d, i) => (
            <motion.article
              key={d.title}
              className="card card--tilt home-domain-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: 'easeOut' }}
            >
              <div className="home-domain-icon">{d.icon}</div>
              <h3>{d.title}</h3>
              <p>{d.text}</p>
              <Link to="/hierarchy" className="home-domain-link" aria-label={`View ${d.title} domain leads`}>
                <span>View Domain Leads</span>
                <span className="domain-link-arrow">→</span>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Section 2: How We Work (Features Strip) */}
      <section className="section container">
        <motion.div {...rise} className="section__head">
          <p className="eyebrow">THE NEURA WORKFLOW</p>
          <h2>Built by students, for students</h2>
          <p className="muted">
            A collaborative learning environment designed to take you from foundational understanding to shipping code.
          </p>
        </motion.div>

        <div className="grid grid--3 home-features-grid">
          {featuresList.map((f, i) => (
            <motion.div
              key={f.title}
              className="card home-feature-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
            >
              <div className="home-feature-top">
                <span className="home-feature-icon">{f.icon}</span>
                <span className="home-feature-num">{f.num}</span>
              </div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
