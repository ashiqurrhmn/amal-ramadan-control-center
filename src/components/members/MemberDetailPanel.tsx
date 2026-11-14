import { useState } from 'react'
import type { MemberRecord } from './membersData'
import { MemberTeamTree } from './MemberTeamTree'

function DetailTile({ label, value }: { label: string; value: string | number }) {
  return <div className="member-detail-tile"><span>{label}</span><strong>{value}</strong></div>
}

export function MemberDetailPanel({ member, onClose }: { member: MemberRecord; onClose: () => void }) {
  const [copied, setCopied] = useState(false)

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`https://${member.link}`)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <aside className="member-detail-panel" aria-label={`${member.name} details`}>
      <div className="member-detail-heading">
        <div><h2>{member.name}</h2><p>{member.id} · {member.tier} · {member.route}</p></div>
        <button type="button" onClick={onClose} aria-label="Close member details">×</button>
      </div>
      <h3>Chain</h3>
      <div className="member-detail-chain"><span className="member-detail-chain-dot" />
        <div><span>{member.tier}</span><strong>{member.name}</strong><small>{member.country} · {member.status}</small></div>
      </div>
      <div className="member-detail-grid">
        <DetailTile label="Status" value={member.status} />
        <DetailTile label="Joined" value={member.joined} />
        <DetailTile label="Country" value={member.country} />
        <DetailTile label="Last activity" value={member.lastActivity} />
        <DetailTile label="Referred under them" value={member.referred} />
        <DetailTile label="Paying users under them" value={member.payingUsers} />
        <DetailTile label="People in chain" value={member.chain} />
        <DetailTile label="Noor coins" value={member.noorCoins.toLocaleString('en-US')} />
      </div>
      <h3>Unique link</h3>
      <div className="member-detail-link"><span>{member.link}</span>
        <button type="button" onClick={copyLink}>{copied ? 'Copied' : 'Copy'}</button>
      </div>
      <h3>Their team</h3>
      <div className="member-detail-team">{member.team.map((item) => <span key={item.label}><strong>{item.count}</strong> {item.label}</span>)}</div>
      <MemberTeamTree member={member} />
    </aside>
  )
}
