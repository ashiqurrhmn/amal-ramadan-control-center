import { useRef, useState } from 'react'
import { routes } from './fellowshipData'
import { members } from '../members/membersData'
import type { MemberRecord } from '../members/membersData'
import '../overview/OverviewPage.css'
import '../members/AllMembersPage.css'
import './GRoutePage.css'

const regions = [
  { name: 'Bangladesh', route: 'Bangladesh G route', attention: 8, attentionParts: [2, 4, 2], signups: 188, signupsChange: -111, paying: 17, payingChange: -13, everyone: 120, usersInChain: 690,
    tiers: [['Sabiq', 10, 59], ['Uswah', 4, 24], ['Muhsin', 3, 18]] as const },
  { name: 'USA/Canada', route: 'USA/Canada G route', attention: 3, attentionParts: [1, 1, 1], signups: 64, signupsChange: 8, paying: 6, payingChange: 2, everyone: 29, usersInChain: 214,
    tiers: [['Sabiq', 4, 67], ['Uswah', 1, 17], ['Muhsin', 1, 17]] as const },
  { name: 'Pakistan', route: 'Pakistan G route', attention: 4, attentionParts: [1, 2, 1], signups: 25, signupsChange: -6, paying: 1, payingChange: -1, everyone: 19, usersInChain: 76,
    tiers: [['Sabiq', 1, 100], ['Uswah', 0, 0], ['Muhsin', 0, 0]] as const },
]

const deliveryOptions = ['In-app notification', 'Push', 'Dashboard', 'Email'] as const

function Change({ value }: { value: number }) {
  return <strong className={value < 0 ? 'g-route-change g-route-change--down' : 'g-route-change g-route-change--up'}>
    {value < 0 ? '↓' : '↑'} {value > 0 ? '+' : ''}{value}
  </strong>
}

export function GRoutePage({ selectedRoute, onSelectRoute }: {
  selectedRoute: string
  onSelectRoute: (route: string) => void
}) {
  const region = regions.find((item) => item.route === selectedRoute) ?? regions[0]
  const route = routes.find((item) => item.name === region.route)!
  const [attentionOpen, setAttentionOpen] = useState(false)
  const [chainSearch, setChainSearch] = useState('')
  const [expanded, setExpanded] = useState<string[]>([])
  const [recipient, setRecipient] = useState('Everyone')
  const [channels, setChannels] = useState<string[]>(['In-app notification', 'Push', 'Dashboard'])
  const [message, setMessage] = useState('')
  const [previewStatus, setPreviewStatus] = useState('')
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const routeMembers = members.filter((member) => member.route === region.route)
  const chainLeaders = routeMembers.filter((member) => region.name === 'Bangladesh'
    ? member.tier === 'Fellow manager' : member.tier === 'Regional partner')
  const visibleLeaders = chainLeaders.filter((member) => member.name.toLowerCase().includes(chainSearch.trim().toLowerCase()))
  const tierCounts = new Map(route.tiers.map((tier) => [tier.label, tier.count]))
  const recipientOptions = ([
    ['Everyone', region.everyone],
    ['Fellow managers', tierCounts.get('Fellow manager') ?? 0],
    ['Onboarders', tierCounts.get('Onboarder') ?? 0],
    ['Fellows', tierCounts.get('Fellow') ?? 0],
  ] as const).filter(([, count]) => count > 0)

  function switchRegion(routeName: string) {
    onSelectRoute(routeName)
    setExpanded([])
    setChainSearch('')
    setAttentionOpen(false)
    setRecipient('Everyone')
    setPreviewStatus('')
  }

  function toggleExpanded(id: string) {
    setExpanded((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  function toggleChannel(channel: string) {
    setChannels((current) => current.includes(channel) ? current.filter((item) => item !== channel) : [...current, channel])
    setPreviewStatus('')
  }

  function previewMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!message.trim()) {
      setPreviewStatus('Write a message before previewing it.')
      messageRef.current?.focus()
      return
    }
    if (channels.length === 0) {
      setPreviewStatus('Choose at least one delivery channel.')
      return
    }
    setPreviewStatus(`Preview ready for ${recipient.toLowerCase()} in ${region.name}. No message was sent.`)
  }

  return <div className="overview-page g-route-page">
    <header className="g-route-header">
      <div><p>Fellowship</p><h1>G Route</h1>
        <div className="g-route-meta">Last 30 days <strong>Sep 29 – Oct 28</strong> · compared with the 30 days before
          <span className="overview-sample-badge">Sample data</span></div>
      </div>
      <button type="button" className="g-route-primary" onClick={() => {
        document.getElementById('g-route-actions')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        messageRef.current?.focus({ preventScroll: true })
      }}>Message members</button>
    </header>

    <div className="g-route-regions" role="group" aria-label="G Route region">
      {regions.map((item) => <button type="button" key={item.route}
        className={`g-route-region${region.route === item.route ? ' is-active' : ''}`}
        aria-pressed={region.route === item.route} onClick={() => switchRegion(item.route)}>
        <span><strong>{item.name}</strong><em>{item.attention}</em></span>
        <small>{routes.find((candidate) => candidate.name === item.route)?.members} members</small>
      </button>)}
    </div>

    <div className="g-route-attention">
      <button type="button" aria-expanded={attentionOpen} onClick={() => setAttentionOpen((open) => !open)}>
        <strong>Needs attention</strong><span>{region.attentionParts[0]} quotas · {region.attentionParts[1]} approvals · {region.attentionParts[2]} payments waiting</span>
        <em>{region.attention}</em><span aria-hidden="true">{attentionOpen ? '⌃' : '⌄'}</span>
      </button>
      {attentionOpen && <ul>
        <li><strong>Quotas</strong><span>{region.attentionParts[0]} members are below their monthly referral target.</span></li>
        <li><strong>Approvals</strong><span>{region.attentionParts[1]} new members are waiting for review.</span></li>
        <li><strong>Payments</strong><span>{region.attentionParts[2]} payouts need bank details or a hold review.</span></li>
      </ul>}
    </div>

    <div className="g-route-stats">
      <section className="g-route-stat-card"><div className="g-route-stat-label"><h2>Total members · {region.name}</h2><span>Today</span></div>
        <strong className="g-route-stat-number">{route.members}</strong>
        <p><b>{route.active} active</b> · {route.activeShare}% of members</p>
        <small>Active = brought someone new in the last 30 days.</small>
      </section>
      <section className="g-route-stat-card"><div className="g-route-stat-label"><h2>Referred signups</h2><span>Last 30 days</span></div>
        <strong className="g-route-stat-number">{region.signups}</strong>
        <p><Change value={region.signupsChange} /> <span>vs previous 30 days</span></p>
        <small>New app users who joined through someone in this country’s chain.</small>
      </section>
      <section className="g-route-stat-card"><div className="g-route-stat-label"><h2>Referred paying</h2><span>Last 30 days</span></div>
        <strong className="g-route-stat-number">{region.paying}</strong>
        <p><Change value={region.payingChange} /> <span>vs previous 30 days</span></p>
        <small>Muaththir 2 · ↓ −8</small>
        <div className="g-route-tier-bars">{region.tiers.map(([label, count, share], index) => <div key={label}>
          <span>{label}</span><i><b className={`g-route-tier-fill g-route-tier-fill--${index}`} style={{ width: `${share}%` }} /></i>
          <strong>{count}</strong><small>{share}%</small>
        </div>)}</div>
      </section>
    </div>

    <section className="g-route-chain-section">
      <div className="g-route-section-heading"><h2>Chain in {region.name}</h2><span>Tap a card to open the chain</span></div>
      <div className="g-route-chain-facts">{route.tiers.filter((tier) => tier.label !== 'Regional partner').map((tier) =>
        <span key={tier.label}><strong>{tier.count}</strong> {tier.label === 'Fellow' ? 'Fellows' : tier.label + 's'}</span>)}
        <span><strong>{region.usersInChain}</strong> Users under the chain</span>
      </div>
      <div className="g-route-explorer">
        <div className="g-route-explorer-top"><h3>Chain explorer</h3>
          <div><label><span className="sr-only">Find a member in the chain</span>
            <input type="search" value={chainSearch} placeholder="Find a member" onChange={(event) => setChainSearch(event.target.value)} /></label>
            <button type="button" onClick={() => setExpanded(visibleLeaders.map((member) => member.id))}>Expand all</button>
            <button type="button" onClick={() => setExpanded([])}>Collapse</button>
          </div>
        </div>
        <p>Regional partners: {routeMembers.filter((member) => member.tier === 'Regional partner').map((member) => member.name).join(', ') || 'No members listed'}</p>
        <ul className="g-route-leaders">{visibleLeaders.map((member) => <ChainLeader key={member.id} member={member}
          expanded={expanded.includes(member.id)} onToggle={() => toggleExpanded(member.id)} />)}</ul>
        {visibleLeaders.length === 0 && <p className="g-route-empty">No members match your search.</p>}
      </div>
    </section>

    <section className="g-route-actions" id="g-route-actions"><h2>Actions</h2>
      <form className="g-route-message-card" onSubmit={previewMessage}>
        <h3>Message {region.name} members</h3>
        <fieldset><legend>Send to</legend><div className="g-route-recipient-options">
          {recipientOptions.map(([label, count]) => <button type="button" key={label}
            className={recipient === label ? 'is-selected' : ''} aria-pressed={recipient === label}
            onClick={() => { setRecipient(label); setPreviewStatus('') }}>{label} <strong>{count}</strong></button>)}
        </div></fieldset>
        <fieldset><legend>Send as</legend><div className="g-route-channel-options">
          {deliveryOptions.map((channel) => <label key={channel}><input type="checkbox" checked={channels.includes(channel)}
            onChange={() => toggleChannel(channel)} />{channel}</label>)}
        </div></fieldset>
        <label className="g-route-message-label"><span className="sr-only">Message</span>
          <textarea ref={messageRef} value={message} onChange={(event) => { setMessage(event.target.value); setPreviewStatus('') }}
            placeholder="Write your message... (supports English and Bangla)" /></label>
        <div className="g-route-message-footer"><span>Goes to {recipientOptions.find(([label]) => label === recipient)?.[1]} members in {region.name}</span>
          <button type="submit" className="g-route-primary">Preview send</button></div>
        <p className="g-route-preview-status" role="status">{previewStatus}</p>
        <p className="g-route-message-help">Sample preview only. Suspended members are left out. Dashboard messages stay in each recipient’s fellowship dashboard.</p>
      </form>
    </section>
  </div>
}

function ChainLeader({ member, expanded, onToggle }: { member: MemberRecord; expanded: boolean; onToggle: () => void }) {
  return <li><button type="button" className="g-route-leader" aria-expanded={expanded} onClick={onToggle}>
    <span className="g-route-leader-chevron" aria-hidden="true">{expanded ? '⌄' : '›'}</span>
    <strong>{member.name}</strong><span>{member.tier}</span>
    <span className={`members-status members-status--${member.status.toLowerCase()}`}>{member.status}</span>
    <small>{member.team[1]?.count ?? 0} onboarders</small>
    <b>{member.chain}</b><small>in chain</small>
  </button>
    {expanded && <div className="g-route-leader-detail">
      <span><strong>{member.team[1]?.count ?? 0}</strong> onboarders</span>
      <span><strong>{member.team[2]?.count ?? 0}</strong> fellows</span>
      <span><strong>{member.referred}</strong> referred users</span>
      <span><strong>{member.payingUsers}</strong> paying users</span>
    </div>}
  </li>
}
