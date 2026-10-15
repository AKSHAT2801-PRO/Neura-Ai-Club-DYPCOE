import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import site from '../data/site.json'

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.204 8.204 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.32a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m-3.53 3.16c-.19 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.12-.27-.2-.56-.34-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.23-.65.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.13-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.68-1.63-.93-2.24-.24-.59-.49-.51-.67-.52l-.57-.01z" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function IconGitHub() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__main">
        {/* Left Column: Brand & Bio */}
        <div className="footer__brand-block">
          <Link to="/" className="footer__brand-logo" aria-label="Neura AI Club">
            <Logo size={42} />
            <span className="footer__brand-text">
              NEURA <small>AI CLUB</small>
            </span>
          </Link>

          <p className="footer__bio">
            {site.bio || 'The AI community of the Department of Information Technology, DYPCOE. Driven by curiosity and the passion to build the future of intelligence.'}
          </p>

          {site.contactEmail && (
            <div className="footer__contact-info">
              <p className="footer__email">
                Contact:{' '}
                <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
              </p>
            </div>
          )}
        </div>

        {/* Column 2: Navigation */}
        <div className="footer__col">
          <h4 className="footer__heading">NAVIGATION</h4>
          <ul className="footer__menu">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/hierarchy">Hierarchy</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Focus Areas */}
        <div className="footer__col">
          <h4 className="footer__heading">DOMAINS</h4>
          <ul className="footer__menu">
            <li><Link to="/about#domains">AI & Machine Learning</Link></li>
            <li><Link to="/about#domains">Generative AI</Link></li>
            <li><Link to="/about#domains">Data Science</Link></li>
            <li><Link to="/about#domains">Web Development</Link></li>
          </ul>
        </div>

        {/* Column 4: Connect & Socials */}
        <div className="footer__col footer__col--connect">
          <h4 className="footer__heading">CONNECT</h4>
          <div className="footer__social-row">
            {site.socials?.whatsapp && (
              <a
                href={site.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="footer__icon-btn"
                aria-label="WhatsApp Community"
                title="WhatsApp"
              >
                <IconWhatsApp />
              </a>
            )}
            {site.socials?.instagram && (
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="footer__icon-btn"
                aria-label="Instagram"
                title="Instagram"
              >
                <IconInstagram />
              </a>
            )}
            {site.socials?.linkedin && (
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="footer__icon-btn"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <IconLinkedIn />
              </a>
            )}
            {site.socials?.github && (
              <a
                href={site.socials.github}
                target="_blank"
                rel="noreferrer"
                className="footer__icon-btn"
                aria-label="GitHub"
                title="GitHub"
              >
                <IconGitHub />
              </a>
            )}
          </div>
          <p className="footer__dept-tag">
            {site.department}
            <br />
            {site.college}
          </p>
        </div>
      </div>

      {/* Bottom Sub-bar */}
      <div className="container footer__bottom">
        <p className="footer__copy">
          © {currentYear} {site.name} · DYPCOE. All rights reserved.
        </p>
        <p className="footer__tag">
          Intelligence, built together ✦
        </p>
      </div>
    </footer>
  )
}
