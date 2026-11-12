import { BarChart } from '../overview/Charts'
import { DashboardCard, LegendItem } from '../overview/DashboardParts'
import { topMembers, weeklySignups } from './fellowshipData'
import type { RouteSummary } from './fellowshipData'

const statuses = [
  { label: 'Active', description: 'Brought someone new in the last 30 days', count: 78, share: 38, color: 'teal' },
  { label: 'New', description: 'Approved in the last 30 days, no signup yet', count: 49, share: 24, color: 'gold' },
  { label: 'Dormant', description: 'No new signups in 30+ days', count: 70, share: 34, color: 'gray' },
  { label: 'Suspended', description: 'Suspended by an admin', count: 9, share: 4, color: 'red' },
] as const

export function MemberStatusCard() {
  return (
    <DashboardCard title="Member status" period="Today" className="fellowship-status-card">
      <p className="overview-big-number">206</p>
      <div className="fellowship-status-bar" role="img" aria-label="78 active, 49 new, 70 dormant, 9 suspended">
        {statuses.map((status) => <span key={status.label} className={`fellowship-fill fellowship-fill--${status.color}`}
          style={{ width: `${status.count / 206 * 100}%` }} />)}
      </div>
      <div className="fellowship-status-list">
        {statuses.map((status) => (
          <div className="fellowship-status-row" key={status.label}>
            <span className={`fellowship-status-dot fellowship-status-dot--${status.color}`} />
            <div><strong>{status.label}</strong><span>{status.description}</span></div>
            <strong>{status.count}</strong><span>{status.share}%</span>
          </div>
        ))}
      </div>
    </DashboardCard>
  )
}
export function WeeklySignupsCard() {
  return (
    <DashboardCard title="Fellowship signups by route" period="Last 12 weeks" className="fellowship-chart-card">
      <div className="overview-inline-legend">
        {weeklySignups.map((route) => <LegendItem key={route.label} label={route.label}
          color={`var(--f-${route.color})`} />)}
      </div>
      <BarChart series={weeklySignups.map((route) => ({ values: route.values, color: route.color }))}
        labels={['Aug 10', 'Aug 24', 'Sep 7', 'Sep 21', 'Oct 5', 'Oct 19']} max={80}
        ticks={[80, 60, 40, 20, 0]} />
      <p className="overview-note">New app users referred each week, one bar per route, all countries.</p>
    </DashboardCard>
  )
}

export function RouteCard({ route, onNavigate }: { route: RouteSummary; onNavigate: (pageId: string) => void }) {
  const maxTier = Math.max(...route.tiers.map((tier) => tier.count))
  return (
    <button type="button" className={`fellowship-route-card fellowship-route-card--${route.color}`}
      onClick={() => onNavigate(route.id)} aria-label={`View ${route.name} members`}>
      <div className="fellowship-route-heading"><h3>{route.name}</h3><span>{route.members} members</span></div>
      <div className="fellowship-route-metrics">
        <div><span>Active</span><strong>{route.active}</strong><small>{route.activeShare}% of route</small></div>
        <div><span>Signups this month</span><strong>{route.signups}</strong></div>
        <div><span>Paying referred</span><strong>{route.paying}</strong><small>all time</small></div>
      </div>
      <h4>By tier</h4>
      <div className="fellowship-tier-list">
        {route.tiers.map((tier) => <div className="fellowship-tier-row" key={tier.label}>
          <span>{tier.label}</span><div><i style={{ width: `${tier.count / maxTier * 100}%` }} /></div><strong>{tier.count}</strong>
        </div>)}
      </div>
    </button>
  )
}

export function TopMembersTable({ onNavigate }: { onNavigate: (pageId: string) => void }) {
  return (
    <div className="fellowship-table-card">
      <div className="fellowship-table-scroll">
        <table>
          <thead><tr><th>#</th><th>Member</th><th>Route</th><th>Tier</th><th>Referred</th><th>Paying</th><th>In chain</th><th>Noor coins</th></tr></thead>
          <tbody>{topMembers.map((member, index) => <tr key={`${member.name}-${index}`}>
            <td>{index + 1}</td>
            <td><button type="button" onClick={() => onNavigate('all-members')}>{member.name}</button></td>
            <td>{member.route}</td><td>{member.tier}</td><td>{member.referred}</td>
            <td>{member.paying}</td><td>{member.inChain}</td><td>{member.noorCoins}</td>
          </tr>)}</tbody>
        </table>
      </div>
      <p className="overview-note">“In chain” counts everyone below them: the members they recruited, those members’ recruits, and all the app users the chain referred. Tap a member for details.</p>
    </div>
  )
}
