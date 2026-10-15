import { motion } from 'framer-motion'
import { slugify } from '../utils.js'

// Drop photos into src/assets/team/ named after the person, e.g. prathamesh.jpg,
// harshal.jpg, tejaswini.png. Photos are matched by slug, consonant similarity,
// or explicit image property in team.json.
const files = import.meta.glob('../assets/team/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP,avif,AVIF}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const photos = {}
for (const [path, url] of Object.entries(files)) {
  const base = path.split('/').pop().replace(/\.[^.]+$/, '')
  photos[slugify(base)] = url
}

function findPhoto(name, customImage) {
  if (customImage) {
    const customSlug = slugify(customImage.replace(/\.[^.]+$/, ''))
    if (photos[customSlug]) return photos[customSlug]
  }

  const targetSlug = slugify(name)
  if (photos[targetSlug]) return photos[targetSlug]

  // Consonant match fallback (handles transliteration like prathmesh <=> prathamesh)
  const noVowels = (s) => s.replace(/[aeiou]/g, '')
  const targetConsonants = noVowels(targetSlug)

  for (const [key, url] of Object.entries(photos)) {
    if (noVowels(key) === targetConsonants) {
      return url
    }
  }

  // First name match fallback (e.g. prathamesh-barbole <=> prathamesh)
  const firstName = targetSlug.split('-')[0]
  if (firstName.length >= 3) {
    for (const [key, url] of Object.entries(photos)) {
      if (key === firstName || key.startsWith(firstName + '-') || firstName.startsWith(key)) {
        return url
      }
    }
  }

  return null
}

const initials = (name) =>
  name
    .replace(/\(.*?\)/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')

function detectLabel(url = '') {
  const u = String(url).toLowerCase()
  if (u.includes('linkedin.com')) return 'LINKEDIN'
  if (u.includes('linktr.ee') || u.includes('linktree')) return 'LINKTREE'
  if (u.includes('github.com')) return 'GITHUB'
  if (u.includes('instagram.com')) return 'INSTAGRAM'
  if (u.includes('twitter.com') || u.includes('x.com')) return 'TWITTER'
  return 'PORTFOLIO'
}

function normalizeLink(l) {
  if (!l) return null
  if (typeof l === 'string') {
    return {
      label: detectLabel(l),
      url: l,
    }
  }
  if (typeof l === 'object' && l.url) {
    const rawLabel = l.label || l.role || l.name || l.type || detectLabel(l.url)
    return {
      label: String(rawLabel).toUpperCase(),
      url: l.url,
    }
  }
  return null
}

function parseMember(input, fallbackRole, extraLinks) {
  let name = ''
  let role = fallbackRole || ''
  let image = ''
  let links = []

  if (typeof input === 'string') {
    name = input
  } else if (input && typeof input === 'object') {
    name = input.name || ''
    role = input.role || fallbackRole || ''
    image = input.image || input.photo || ''

    // 1. Explicit array of links with custom labels
    if (Array.isArray(input.links)) {
      links = input.links.map(normalizeLink).filter(Boolean)
    }
    // 2. Single link with custom or detected label
    else if (input.link || input.url) {
      const url = input.link || input.url
      const label = input.label || input.linkLabel || input.linkType || detectLabel(url)
      links.push(normalizeLink({ label, url }))
    }
    // 3. Platform shortcuts (linkedin, linktree, portfolio, github, etc.)
    else {
      const platforms = ['linkedin', 'linktree', 'portfolio', 'github', 'instagram', 'twitter', 'website']
      for (const p of platforms) {
        if (input[p]) {
          const label = input.label || (p === 'website' ? 'PORTFOLIO' : p.toUpperCase())
          links.push({ label, url: input[p] })
        }
      }
    }
  }

  if (Array.isArray(extraLinks) && extraLinks.length > 0) {
    for (const l of extraLinks) {
      const norm = normalizeLink(l)
      if (norm && !links.some((item) => item.url === norm.url)) {
        links.push(norm)
      }
    }
  }

  // Maximum 2 buttons, mostly 1
  const limitedLinks = links.filter((l) => l && l.url).slice(0, 2)

  return { name, role, links: limitedLinks, image }
}

function ExternalIcon() {
  return (
    <svg
      className="person__btn-icon"
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

export default function PersonCard({
  member,
  name: nameProp,
  role: roleProp,
  links: linksProp,
  size = 'md',
  accent = false,
  delay = 0,
}) {
  const { name, role, links, image } = parseMember(member || nameProp, roleProp, linksProp)
  const src = findPhoto(name, image)

  const hasButtons = links.length > 0
  const actionClass =
    links.length === 2
      ? 'person__action--dual'
      : links.length === 1
        ? 'person__action--single'
        : 'person__action--empty'

  return (
    <motion.article
      className={`person person--${size} ${accent ? 'person--accent' : ''}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      <div className="person__photo">
        {src ? (
          <img src={src} alt={name} loading="lazy" />
        ) : (
          <span className="person__initials" aria-hidden>
            {initials(name)}
          </span>
        )}
        <span className="person__shade" aria-hidden />
      </div>

      <div className="person__info">
        <div className="person__meta">
          <h3>{name}</h3>
          {role && <p className="role">{role}</p>}
        </div>

        <div className={`person__action ${actionClass}`} aria-hidden={!hasButtons ? 'true' : undefined}>
          {links.map((link, idx) => (
            <a
              key={`${link.label}-${idx}`}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="person__btn"
              title={`${name} - ${link.label}`}
              aria-label={`${name}'s ${link.label}`}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="person__btn-text">{link.label}</span>
              <ExternalIcon />
            </a>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
