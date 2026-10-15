import { useState } from 'react'
import { motion } from 'framer-motion'
import site from '../data/site.json'

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: 'General Inquiry',
    message: '',
  })

  const handleCopyEmail = () => {
    if (site.contactEmail) {
      navigator.clipboard.writeText(site.contactEmail)
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return
    setSubmitted(true)
  }

  return (
    <div className="contact-page">
      {/* Page Hero */}
      <section className="page-hero">
        <motion.div {...rise()} className="container page-hero__inner">
          <p className="eyebrow">CONTACT & COLLABORATION</p>
          <h1>Get in Touch</h1>
          <p className="lead">
            Connect with Neura AI Club. Reach out directly for workshop inquiries, collaborative projects, or domain discussions.
          </p>
        </motion.div>
      </section>

      {/* Main Content Split */}
      <section className="section container">
        <div className="contact-layout">
          {/* Left Column: Direct Communication Channels */}
          <motion.aside className="contact-channels-col" {...rise(0.06)}>
            <div className="contact-channels-header">
              <span className="contact-section-label">DIRECT CHANNELS</span>
              <h2>How to reach us</h2>
              <p className="muted">
                Choose the direct channel that fits your inquiry best, or fill out the form to leave a detailed message.
              </p>
            </div>

            <div className="contact-cards-stack">
              {/* Email Card */}
              <div className="contact-channel-card">
                <div className="contact-channel-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="contact-channel-info">
                  <span className="channel-badge">OFFICIAL EMAIL</span>
                  <h3>Direct Correspondence</h3>
                  <p>For official proposals, faculty queries, and club administration.</p>
                  <div className="contact-email-inline">
                    <a href={`mailto:${site.contactEmail || 'aiclub.dypcoe@gmail.com'}`} className="contact-email-link">
                      {site.contactEmail || 'aiclub.dypcoe@gmail.com'}
                    </a>
                    <button
                      type="button"
                      className="contact-copy-btn"
                      onClick={handleCopyEmail}
                      aria-label="Copy email address"
                    >
                      {copiedEmail ? (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                          </svg>
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* WhatsApp Community */}
              {site.socials?.whatsapp && (
                <div className="contact-channel-card contact-channel-card--community">
                  <div className="contact-channel-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <div className="contact-channel-info">
                    <span className="channel-badge">COMMUNITY HUB</span>
                    <h3>WhatsApp Group</h3>
                    <p>Official student community group for announcements, event notices, and technical exchange.</p>
                    <a
                      href={site.socials.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="contact-channel-link"
                    >
                      <span>Join WhatsApp Community</span>
                      <span className="arrow-sym">→</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </motion.aside>

          {/* Right Column: High-End Contact Form */}
          <motion.div className="contact-form-panel" {...rise(0.12)}>
            <div className="contact-form-panel__inner">
              <div className="contact-form-titlebox">
                <span className="contact-section-label">DIRECT INQUIRY</span>
                <h2>Send a Message</h2>
                <p className="muted">
                  Have a specific question or proposal? Send us a note and a club representative will reply directly.
                </p>
              </div>

              {submitted ? (
                <div className="contact-submitted-box">
                  <div className="contact-submitted-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3>Message Received</h3>
                  <p>
                    Thank you, <strong>{form.name}</strong>. We received your note regarding <em>"{form.topic}"</em> and will reply to <strong>{form.email}</strong> shortly.
                  </p>
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => {
                      setSubmitted(false)
                      setForm({ name: '', email: '', topic: 'General Inquiry', message: '' })
                    }}
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form className="contact-editorial-form" onSubmit={handleSubmit}>
                  <div className="contact-input-row">
                    <div className="contact-field">
                      <label htmlFor="name">Your Name</label>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="e.g. Alex Morgan"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>

                    <div className="contact-field">
                      <label htmlFor="email">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="e.g. alex@dypcoe.edu"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="contact-field">
                    <label htmlFor="topic">Topic of Inquiry</label>
                    <select
                      id="topic"
                      value={form.topic}
                      onChange={(e) => setForm({ ...form, topic: e.target.value })}
                      className="contact-select"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Event or Workshop">Workshop or Event Question</option>
                      <option value="Collaboration">Collaboration / Hackathon Partnership</option>
                      <option value="Domain Mentorship">Domain Mentorship & Learning</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="contact-field">
                    <label htmlFor="message">Your Message</label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Write your message here with any relevant details..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  <div className="contact-form-action">
                    <button type="submit" className="btn btn--primary contact-submit-btn">
                      <span>Send Message</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
