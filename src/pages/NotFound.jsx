import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  const navigate = useNavigate()
  const [scanning, setScanning] = useState(false)
  const [scanStatus, setScanStatus] = useState('ANOMALY_CONFIRMED')
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const mouseRafRef = useRef(null)

  // Listen for keyboard 'H' to return Home
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'h' || e.key === 'H') {
        navigate('/')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate])

  useEffect(() => {
    return () => {
      if (mouseRafRef.current) cancelAnimationFrame(mouseRafRef.current)
    }
  }, [])

  const handleReScan = () => {
    if (scanning) return
    setScanning(true)
    setScanStatus('SYNAPSE_SCANNING...')
    setTimeout(() => {
      setScanning(false)
      setScanStatus('SYNAPSE_UNREACHABLE (404)')
    }, 1600)
  }

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20
    if (mouseRafRef.current) return
    mouseRafRef.current = requestAnimationFrame(() => {
      setCoords({ x, y })
      mouseRafRef.current = null
    })
  }

  return (
    <div className="not-found-page" onMouseMove={handleMouseMove}>
      {/* Background Neural Grid and Ambient Glows */}
      <div className="not-found__ambient" aria-hidden="true">
        <div className="not-found__glow not-found__glow--purple" />
        <div className="not-found__glow not-found__glow--cyan" />
        <div className="not-found__grid-overlay" />
      </div>

      <div className="container not-found__container">
        {/* Hologram / Glitch 404 Node */}
        <motion.div
          className="not-found__visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transform: `perspective(1000px) rotateX(${-coords.y * 0.4}deg) rotateY(${coords.x * 0.4}deg)`,
          }}
        >
          <div className="not-found__orb">
            <span className={`not-found__radar ${scanning ? 'is-scanning' : ''}`} />
            <div className="not-found__ring not-found__ring--outer" />
            <div className="not-found__ring not-found__ring--inner" />

            <div className="not-found__glitch-wrapper">
              <h1 className="not-found__numeral" data-text="404">
                404
              </h1>
            </div>
          </div>
        </motion.div>

        {/* Diagnostic Terminal Card */}
        <motion.div
          className="not-found__terminal"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="not-found__terminal-header">
            <div className="not-found__terminal-dots">
              <span className="dot dot--red" />
              <span className="dot dot--yellow" />
              <span className="dot dot--green" />
            </div>
            <span className="not-found__terminal-title">NEURA-DIAGNOSTIC-v2.6 // KERNEL REPORT</span>
            <span className={`not-found__status-badge ${scanning ? 'is-active' : ''}`}>
              <span className="status-indicator" />
              {scanStatus}
            </span>
          </div>

          <div className="not-found__terminal-body">
            <p className="terminal-line">
              <span className="prompt">&gt;</span> SYSTEM ERROR 0x404: <strong>COGNITIVE_SYNAPSE_NOT_FOUND</strong>
            </p>
            <p className="terminal-line terminal-line--dim">
              <span className="prompt">&gt;</span> The neural pathways searched all clusters, but the requested node coordinate is disconnected or does not exist.
            </p>
            <p className="terminal-line terminal-line--hint">
              <span className="prompt">&gt;</span> Press <kbd>H</kbd> on your keyboard or select a verified destination below to reconnect to the core.
            </p>
          </div>
        </motion.div>

        {/* Interactive Action Hub */}
        <motion.div
          className="not-found__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >

          <Link to="/" className="btn btn--primary" id="btn-return-home">
            <span>Return to Neural Core</span>
            <span className="btn-arrow">→</span>
          </Link>
        </motion.div>

        {/* Quick Neural Pathways */}
        <motion.div
          className="not-found__pathways"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="not-found__pathways-label">VERIFIED SYNAPSE DESTINATIONS</p>
          <div className="not-found__chips">
            <Link to="/about" className="not-found__chip">
              <span className="chip-prefix">01</span> About Club
            </Link>
            <Link to="/hierarchy" className="not-found__chip">
              <span className="chip-prefix">02</span> People &amp; Hierarchy
            </Link>
            <Link to="/events" className="not-found__chip">
              <span className="chip-prefix">03</span> Events &amp; Workshops
            </Link>
            <Link to="/gallery" className="not-found__chip">
              <span className="chip-prefix">04</span> Visual Gallery
            </Link>
            <Link to="/contact" className="not-found__chip not-found__chip--accent">
              <span className="chip-prefix">05</span> Connect / Join
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
