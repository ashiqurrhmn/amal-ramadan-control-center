import { useState } from 'react'
import type { ReactNode } from 'react'
import { BarChart, LineChart } from './Charts'
import { DashboardCard, Delta, LegendItem, ProgressRow, SectionHeading, SegmentedControl } from './DashboardParts'
import type { Currency, Period } from './DashboardParts'
import './OverviewPage.css'

const signupA = [4, 6, 5, 8, 4, 7, 6, 2, 3, 3, 4, 4, 4, 2, 4, 3, 5, 6, 4, 5, 8, 5, 5, 7, 8, 5, 9, 7, 3, 16]
const signupB = [3, 5, 5, 7, 4, 7, 5, 1, 4, 3, 4, 7, 4, 1, 5, 3, 6, 9, 7, 7, 5, 5, 7, 5, 9, 5, 9, 5, 2, 14]
const revenueA = [11, 14, 16, 13, 15, 12, 14, 17, 16, 11, 14, 18, 15, 13, 15, 12, 17, 14, 11, 16, 18, 15, 14, 17, 16, 13, 15, 18, 13, 16]
const revenueB = [13, 16, 17, 25, 23, 17, 16, 22, 17, 14, 17, 21, 20, 23, 27, 18, 19, 24, 20, 26, 19, 22, 18, 21, 17, 22, 20, 18, 15, 19]
const revenueC = [3, 4, 5, 4, 6, 4, 5, 3, 4, 5, 8, 4, 6, 5, 7, 3, 5, 8, 6, 7, 4, 6, 5, 3, 6, 4, 5, 7, 4, 3]
const activeTrend = [300, 300, 258, 290, 266, 264, 270, 267, 276, 271, 223, 281, 259, 262, 265, 303, 277, 292, 263, 310, 301, 287, 280, 298, 271, 273, 268, 295, 280]

const countries = [
  { label: 'Bangladesh', value: '103', detail: 'G 57 · X 26 · C 20', segments: [49, 23, 17] },
  { label: 'Singapore', value: '22', detail: 'G 12 · X 6 · C 4', segments: [12, 6, 4] },
  { label: 'Malaysia', value: '22', detail: 'G 12 · X 6 · C 4', segments: [12, 6, 4] },
  { label: 'United Kingdom', value: '15', detail: 'G 8 · X 4 · C 3', segments: [8, 4, 3] },
  { label: 'Indonesia', value: '13', detail: 'G 7 · X 3 · C 3', segments: [7, 3, 3] },
  { label: 'Pakistan', value: '11', detail: 'G 6 · X 3 · C 2', segments: [6, 3, 2] },
]

const activity = [
  ['Prayers', 837, 71], ['Quran', 684, 58], ['Tasbeeh', 578, 49],
  ['Soul Stack', 436, 37], ['Jannah Garden', 342, 29], ['Amal Gallery', 212, 18],
] as const

const conversion = [
  ['Installed', 518, 100, ''], ['Signed up', 320, 62, '62% kept'],
  ['Activated', 227, 35, '71% kept'], ['Became paying', 17, 2, '7% kept'],
] as const

const periodCaption: Record<Period, string> = {
  '7 days': 'Last 7 days', '30 days': 'Last 30 days', '12 months': 'Last 12 months',
}

const currencyAmounts: Record<Currency, { total: string; sadaqah: string; ads: string; members: string; purchases: string; ecpm: string }> = {
  USD: { total: '$1,094', sadaqah: '$438', ads: '$413', members: '$549', purchases: '$132', ecpm: '$0.58' },
  BDT: { total: '৳134,470', sadaqah: '৳53,820', ads: '৳50,760', members: '৳67,450', purchases: '৳16,220', ecpm: '৳71.27' },
  SGD: { total: 'S$1,413', sadaqah: 'S$566', ads: 'S$534', members: 'S$709', purchases: 'S$170', ecpm: 'S$0.75' },
}

export function OverviewPage({ onNavigate }: { onNavigate: (pageId: string) => void }) {
  const [period, setPeriod] = useState<Period>('30 days')
  const [currency, setCurrency] = useState<Currency>('USD')
  const [quickActionsOpen, setQuickActionsOpen] = useState(false)
  const money = currencyAmounts[currency]
  const caption = periodCaption[period]

  return (
    <div className="overview-page">
      <header className="overview-header">
        <div>
          <h1>Overview</h1>
          <div className="overview-meta">
            <span>Wed, Nov 11, 2026, 5:27 PM</span>
            <span>Last updated Oct 27, 10:46 AM</span>
            <span className="overview-sample-badge">Sample data</span>
          </div>
        </div>
        <div className="overview-header-controls">
          <SegmentedControl label="Statistics period" options={['7 days', '30 days', '12 months'] as const} value={period} onChange={setPeriod} />
          <SegmentedControl label="Currency" options={['USD', 'BDT', 'SGD'] as const} value={currency} onChange={setCurrency} />
        </div>
      </header>

      <div className="overview-quick-actions">
        <button type="button" className="overview-quick-actions-toggle" aria-expanded={quickActionsOpen}
          onClick={() => setQuickActionsOpen((open) => !open)}>
          <strong>Quick actions</strong><span>Ad fill rate 38% this week and 3 more</span>
          <span className="overview-action-count">4</span><span className="overview-chevron">⌄</span>
        </button>
        {quickActionsOpen && <div className="overview-quick-actions-content">
          <p>Ad fill rate is below the 60% target.</p><p>12 fellowship members are waiting for approval.</p>
          <p>Monthly churn is up 4.2 points.</p><p>Install to paid conversion is 7%.</p>
        </div>}
      </div>

      <section className="overview-section">
        <SectionHeading title="Growth" caption={caption} />
        <div className="overview-grid overview-grid--two overview-grid--growth">
          <DashboardCard title="New signups" period={caption}>
            <p className="overview-big-number">320</p>
            <div className="overview-subline"><Delta value="+16" /> <Delta value="+5.3%" /> <span>vs previous 30 days</span></div>
            <div className="overview-inline-legend"><LegendItem label="Fellowship" color="var(--ov-teal)" value="157" /><LegendItem label="Organic" color="var(--ov-gold)" value="163" /></div>
            <BarChart series={[{ values: signupA, color: 'teal' }, { values: signupB, color: 'gold' }]}
              labels={['Sep 27', 'Oct 1', 'Oct 5', 'Oct 9', 'Oct 13', 'Oct 17', 'Oct 21', 'Oct 25']} max={15} />
            <button className="overview-text-link" type="button" onClick={() => onNavigate('all-members')}>View new users →</button>
          </DashboardCard>
          <DashboardCard title="Fellowship members" period="All time">
            <p className="overview-big-number">186</p>
            <div className="overview-subline"><Delta value="+41" /><span>joined last 30 days</span><span>· 12 waiting for approval</span></div>
            <div className="overview-inline-legend"><LegendItem label="G route" color="var(--ov-teal)" /><LegendItem label="X route" color="var(--ov-gold)" /><LegendItem label="C route" color="var(--ov-violet)" /></div>
            <div className="overview-progress-list overview-country-list">
              {countries.map((country) => <ProgressRow key={country.label} {...country} />)}
            </div>
            <p className="overview-note">Members by country, split by recruitment route.</p>
          </DashboardCard>
        </div>
      </section>

      <section className="overview-section">
        <SectionHeading title="Money" caption={caption} />
        <div className="overview-grid overview-grid--three overview-grid--money">
          <DashboardCard title="Total revenue" period={caption}>
            <p className="overview-big-number">{money.total}</p>
            <div className="overview-subline"><Delta value="10.0%" /><span>vs previous 30 days</span></div>
            <div className="overview-revenue-legend">
              <div><LegendItem label="Ads" color="var(--ov-blue)" /><strong>{money.ads}</strong><Delta value="18.4%" /></div>
              <div><LegendItem label="Memberships" color="var(--ov-orange)" /><strong>{money.members}</strong><Delta value="7.9%" /></div>
              <div><LegendItem label="In-app purchases" color="var(--ov-teal-bright)" /><strong>{money.purchases}</strong><Delta value="3.5%" tone="bad" /></div>
            </div>
            <BarChart series={[{ values: revenueA, color: 'blue' }, { values: revenueB, color: 'orange' }, { values: revenueC, color: 'teal' }]}
              labels={['Sep 27', 'Oct 3', 'Oct 9', 'Oct 15', 'Oct 21']} max={25} money={currency === 'USD'} />
          </DashboardCard>
          <DashboardCard title="Sadaqah engine" period={caption}>
            <p className="overview-big-number">{money.sadaqah}</p>
            <div className="overview-subline"><strong>40% of gross revenue</strong><Delta value="10.0%" /><span>vs previous 30 days</span></div>
            <h4 className="overview-card-subheading">Distribution to impact projects</h4>
            <div className="overview-progress-list">
              <ProgressRow label="Clean water wells" value="$153" detail="35%" share={35} color="gold" />
              <ProgressRow label="Orphan sponsorship" value="$131" detail="30%" share={30} color="gold" />
              <ProgressRow label="Ramadan food packs" value="$88" detail="20%" share={20} color="gold" />
              <ProgressRow label="Masjid & madrasa ..." value="$66" detail="15%" share={15} color="gold" />
            </div>
            <p className="overview-note">The percentage is set once in Sadaqah Impact and used everywhere.</p>
          </DashboardCard>
          <DashboardCard title="Ad health" period={caption}>
            <div className="overview-metric-grid overview-metric-grid--two">
              <Metric label="Fill rate" value="41%" delta={<Delta value="6.0 pts" tone="bad" />} />
              <Metric label="eCPM" value={money.ecpm} delta={<Delta value="13.7%" />} />
              <Metric label="Impressions" value="248K" delta={<Delta value="23.4%" />} />
            </div>
            <div className="overview-target-bar"><span /><i /></div>
            <p className="overview-note">Target fill rate 60% (marker). Ad revenue depends on fill rate × eCPM.</p>
          </DashboardCard>
        </div>
      </section>

      <section className="overview-section">
        <SectionHeading title="Members & churn" />
        <div className="overview-grid overview-grid--two overview-grid--members">
          <DashboardCard title="Free vs membership" period="As of today">
            <div className="overview-members-layout">
              <div className="overview-donut"><div><strong>3,007</strong><span>users</span></div></div>
              <div className="overview-members-legend">
                <LegendItem label="Free users" color="var(--ov-gray)" value="2,933" detail="97.5%" />
                <LegendItem label="Sabiq members" color="var(--ov-teal)" value="41" detail="1.4%" />
                <LegendItem label="Uswah members" color="var(--ov-gold)" value="22" detail="0.7%" />
                <LegendItem label="Muhsin members" color="var(--ov-amber)" value="11" detail="0.4%" />
              </div>
            </div>
            <h4 className="overview-card-subheading">Paid members only</h4>
            <div className="overview-paid-bar"><span /><span /><span /></div>
            <p className="overview-note">Paid members are a small share of all users, so the bar above shows how they split across Sabiq, Uswah and Muhsin.</p>
          </DashboardCard>
          <DashboardCard title="Monthly churn" period={caption}>
            <p className="overview-big-number">11.1%</p>
            <div className="overview-subline"><Delta value="4.2 pts" tone="bad" /><span>vs previous 30 days</span></div>
            <div className="overview-metric-grid overview-metric-grid--two overview-churn-metrics">
              <Metric label="Cancelled" value="7" delta={<span className="overview-muted">0</span>} />
              <Metric label="Paying subscribers" value="74" delta={<span className="overview-positive">+11</span>} />
            </div>
            <h4 className="overview-card-subheading">Why they left</h4>
            <div className="overview-progress-list">
              <ProgressRow label="Too expensive" value="2" detail="29%" share={100} color="gray" />
              <ProgressRow label="Payment failed" value="2" detail="29%" share={100} color="gray" />
              <ProgressRow label="Other" value="2" detail="29%" share={100} color="gray" />
              <ProgressRow label="Switched to free features" value="1" detail="14%" share={50} color="gray" />
            </div>
            <button className="overview-text-link" type="button" onClick={() => onNavigate('all-members')}>View cancellations →</button>
          </DashboardCard>
        </div>
      </section>

      <section className="overview-section">
        <SectionHeading title="Engagement" caption={caption} />
        <div className="overview-grid overview-grid--three overview-grid--engagement">
          <DashboardCard title="Daily & monthly active users" period={caption}>
            <div className="overview-metric-grid overview-metric-grid--two">
              <Metric label="Avg. DAU" value="284" delta={<Delta value="2.9%" />} />
              <Metric label="MAU" value="1,180" delta={<Delta value="26.9%" />} />
              <Metric label="Stickiness (DAU ÷ MAU)" value="24.1%" delta={<Delta value="5.6 pts" tone="bad" />} />
              <Metric label="Day-30 retention" value="31%" delta={<Delta value="4.0 pts" />} />
            </div>
            <LineChart values={activeTrend} labels={['Sep 27', 'Oct 4', 'Oct 11', 'Oct 18', 'Oct 25']} />
            <p className="overview-note">Day-30 retention: share of users who signed up 30+ days ago and were active on day 30.</p>
          </DashboardCard>
          <DashboardCard title="Where people are active" period={caption}>
            <div className="overview-progress-list">
              {activity.map(([label, value, share]) => <ProgressRow key={label} label={label} value={String(value)} detail={`${share}%`} share={share} />)}
            </div>
            <p className="overview-note">Unique users who used each feature, and their share of monthly active users.</p>
          </DashboardCard>
          <DashboardCard title="Install to paid" period={caption}>
            <div className="overview-progress-list overview-conversion-list">
              {conversion.map(([label, value, share, detail]) => <ProgressRow key={label} label={label} value={String(value)} detail={detail} share={share} color={label === 'Became paying' ? 'red' : 'teal'} />)}
            </div>
            <p className="overview-note">Activated = completed a first action (prayer log, Quran, tasbeeh). Red marks the biggest drop.</p>
          </DashboardCard>
        </div>
      </section>

      <footer className="overview-footer">Money shown in US dollars. 1 USD = ৳122.0 · S$1.29, rates as of Oct 27, 2026. Changes compare with the previous period of the same length.</footer>
    </div>
  )
}

function Metric({ label, value, delta }: { label: string; value: string; delta: ReactNode }) {
  return <div className="overview-metric"><span>{label}</span><strong>{value}</strong><small>{delta}</small></div>
}
