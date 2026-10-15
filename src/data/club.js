// Centralized re-exports from dedicated JSON data files.
// Edit data directly in the corresponding .json files inside src/data/:
//   - team.json    -> Faculty, Leadership, and Domains (Leads & Coordinators)
//   - events.json  -> Past, Ongoing, and Upcoming events
//   - domains.json -> Club domains & focus areas
//   - about.json   -> Vision, mission, and pillars
//   - site.json    -> Club name, college info, and social links

import teamData from './team.json'
import eventsData from './events.json'
import domainsData from './domains.json'
import aboutData from './about.json'
import siteData from './site.json'

export const faculty = teamData.faculty || []
export const leadership = teamData.leadership || []
export const president = leadership.find((l) => l.role?.toLowerCase() === 'president') || leadership[0] || {}
export const vicePresident = leadership.find((l) => l.role?.toLowerCase().includes('vice')) || leadership[1] || {}
export const domains = domainsData
export const domainTeams = teamData.domains || []
export const leads = domainTeams.flatMap((d) => d.leads || [])
export const coordinators = domainTeams.flatMap((d) => d.coordinators || [])

export const events = eventsData
export const about = aboutData
export const site = siteData

export { teamData, eventsData, domainsData, aboutData, siteData }

export default {
  faculty,
  leadership,
  president,
  vicePresident,
  domainTeams,
  domains: domainsData,
  events: eventsData,
  about: aboutData,
  site: siteData,
}
