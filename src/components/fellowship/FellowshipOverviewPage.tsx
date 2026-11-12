import { DashboardCard, LegendItem, ProgressRow, SectionHeading } from '../overview/DashboardParts'
import { MemberStatusCard, RouteCard, TopMembersTable, WeeklySignupsCard } from './FellowshipParts'
import { routes } from './fellowshipData'
import '../overview/OverviewPage.css'
import './FellowshipOverviewPage.css'

export function FellowshipOverviewPage({ onNavigate }: { onNavigate: (pageId: string) => void }) {
  return (
    <div className="overview-page fellowship-page">
      <header className="fellowship-header">
        <p>Fellowship</p>
        <h1>Fellowship overview</h1>
        <div className="fellowship-meta"><span>This month <strong>Oct 1–28</strong> · compared with Sep 1–28</span>
          <span className="overview-sample-badge">Sample data</span></div>
      </header>

      <div className="fellowship-summary-grid">
        <DashboardCard title="Fellowship members" period="All routes">
          <p className="overview-big-number">206</p>
          <p className="fellowship-card-caption"><strong>78 active</strong> · <strong>38% of members</strong></p>
          <div className="fellowship-route-share"><span /><span /><span /><span /></div>
          <div className="fellowship-small-legend">
            <LegendItem label="BD G 125" color="var(--f-teal)" />
            <LegendItem label="USA/CA G 31" color="var(--f-gold)" />
            <LegendItem label="PK G 20" color="var(--f-coral)" />
            <LegendItem label="Creator 30" color="var(--f-violet)" />
          </div>
          <button className="overview-text-link fellowship-card-link" type="button" onClick={() => onNavigate('all-members')}>View members →</button>
        </DashboardCard>

        <DashboardCard title="Referred signups" period="This month">
          <p className="overview-big-number">359</p>
          <p className="fellowship-delta-line"><span>↓ −167</span> vs Sep 1–28</p>
          <p className="overview-note">New app users who signed up through a fellowship member’s link or code.</p>
          <button className="overview-text-link fellowship-card-link" type="button" onClick={() => onNavigate('all-members')}>View signups →</button>
        </DashboardCard>

        <DashboardCard title="Referred paying" period="This month">
          <p className="overview-big-number">30</p>
          <p className="fellowship-delta-line"><span>↓ −16</span> vs Sep 1–28</p>
          <div className="fellowship-paying-list">
            <ProgressRow label="Sabiq" value="18" detail="60%" share={100} />
            <ProgressRow label="Uswah" value="7" detail="23%" share={39} color="gold" />
            <ProgressRow label="Muhsin" value="5" detail="17%" share={28} color="gray" />
          </div>
          <button className="overview-text-link fellowship-card-link" type="button" onClick={() => onNavigate('all-members')}>View paying members →</button>
        </DashboardCard>

        <DashboardCard title="Payout due" period="Due Oct 31">
          <p className="fellowship-payout-period">September 2026 earnings</p>
          <div className="fellowship-payout-item"><span>Bangladesh account</span><strong>{'\u09F3'}19,850</strong><small>82 members · paid in taka</small></div>
          <div className="fellowship-payout-item"><span>Global account</span><strong>S$260.00</strong><small>44 members · paid in SGD</small></div>
          <p className="fellowship-blocked"><strong>13</strong> payouts blocked (on hold or missing bank details)</p>
          <button className="overview-text-link fellowship-card-link" type="button" onClick={() => onNavigate('all-members')}>Review payouts →</button>
        </DashboardCard>
      </div>

      <section className="overview-section fellowship-section">
        <SectionHeading title="Chain at a glance" caption="Every member sits in exactly one status" />
        <div className="overview-grid overview-grid--two fellowship-chain-grid">
          <MemberStatusCard />
          <WeeklySignupsCard />
        </div>
      </section>

      <section className="overview-section fellowship-section">
        <SectionHeading title="Routes & tiers" caption="Tap a route to see its members" />
        <div className="fellowship-routes-grid">
          {routes.map((route) => <RouteCard key={route.name} route={route} onNavigate={onNavigate} />)}
        </div>
      </section>

      <section className="overview-section fellowship-section fellowship-table-section">
        <SectionHeading title="Top fellowship members" caption="Ranked by paying referrals, then signups" />
        <TopMembersTable onNavigate={onNavigate} />
      </section>
    </div>
  )
}
