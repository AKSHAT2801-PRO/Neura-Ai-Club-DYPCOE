import { useState } from 'react'
import { motion } from 'framer-motion'
import PersonCard from '../components/PersonCard.jsx'
import team from '../data/team.json'

const faculty = team.faculty || []
const leadership = team.leadership || []
const domains = team.domains || []

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
})

function Tier({ index, label, title, children }) {
  return (
    <section className="tier">
      <div className="tier__rail">
        <span className="tier__node">{index}</span>
      </div>
      <div className="tier__body">
        <motion.div {...rise()}>
          <p className="eyebrow">{label}</p>
          <h2>{title}</h2>
        </motion.div>
        {children}
      </div>
    </section>
  )
}

export default function Hierarchy() {
  const [collapsedDomains, setCollapsedDomains] = useState(() =>
    Object.fromEntries(domains.map(({ domain }) => [domain, true])),
  )

  return (
    <>
      <section className="page-hero">
        <motion.div {...rise()} className="container page-hero__inner">
          <p className="eyebrow">Club hierarchy</p>
          <h1>The people of Neura</h1>
          <p className="lead">
            From faculty guidance to student leadership and domain coordinators, here is how the club
            is organised.
          </p>
        </motion.div>
      </section>

      <div className="container tiers">
        {/* Tier 1: Faculty */}
        <Tier index="1" label="Guidance" title="Faculty Coordinators">
          <div className="grid grid--people">
            {faculty.map((f, i) => (
              <PersonCard key={f.name || i} member={f} delay={i * 0.06} />
            ))}
          </div>
        </Tier>

        {/* Tier 2: Leadership */}
        <Tier index="2" label="Student leadership" title="President & Vice President">
          <div className="grid grid--pair">
            {leadership.map((leader, i) => (
              <PersonCard
                key={leader.name || i}
                member={leader}
                size="lg"
                accent
                delay={i * 0.08}
              />
            ))}
          </div>
        </Tier>

        {/* Tier 3: Domain Teams */}
        <Tier index="3" label="Domain teams" title="Leads & Coordinators">
          <div className="domains">
            {domains.map((d, index) => {
              const isExpanded = !collapsedDomains[d.domain]
              const contentId = `domain-content-${index}`
              const leads = d.leads || []
              const coordinators = d.coordinators || []
              const totalCount = leads.length + coordinators.length

              return (
                <div key={d.domain} className="domain">
                  <motion.h3 className="domain__heading" {...rise()}>
                    <button
                      className="domain__toggle"
                      type="button"
                      aria-expanded={isExpanded}
                      aria-controls={contentId}
                      onClick={() =>
                        setCollapsedDomains((current) => ({
                          ...current,
                          [d.domain]: !current[d.domain],
                        }))
                      }
                    >
                      <span className="domain__title">
                        {d.domain}
                        <span>{totalCount}</span>
                      </span>
                      <span
                        className={`domain__chevron ${isExpanded ? 'domain__chevron--expanded' : ''}`}
                        aria-hidden="true"
                      >
                        ▾
                      </span>
                    </button>
                  </motion.h3>

                  <div id={contentId} hidden={!isExpanded}>
                    {leads.length > 0 && (
                      <div className="domain__group">
                        <h4 className="domain__label">Leads</h4>
                        <div className="grid grid--people">
                          {leads.map((m, i) => (
                            <PersonCard
                              key={m.name || i}
                              member={m}
                              accent
                              delay={(i % 5) * 0.05}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {coordinators.length > 0 && (
                      <div className="domain__group">
                        <h4 className="domain__label">Coordinators</h4>
                        <div className="grid grid--people-sm">
                          {coordinators.map((m, i) => (
                            <PersonCard
                              key={m.name || i}
                              member={m}
                              size="sm"
                              delay={(i % 5) * 0.05}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </Tier>
      </div>
    </>
  )
}
