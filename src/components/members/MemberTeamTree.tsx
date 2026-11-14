import { useState } from 'react'
import type { MemberRecord, MemberStatus } from './membersData'
import { members } from './membersData'

interface TeamNode {
  id: string
  name: string
  tier: string
  country: string
  status: MemberStatus
  chain: number
  children: TeamNode[]
}

function toNode(member: MemberRecord, children: TeamNode[] = []): TeamNode {
  return { id: member.id, name: member.name, tier: member.tier, country: member.country,
    status: member.status, chain: member.chain, children }
}

function teamNodes(member: MemberRecord): TeamNode[] {
  if (member.id === 'F002') {
    const sampleChildren = [
      ['Mehjabin Karim', 'F011', 74, 'Dormant'],
      ['Raisa Chowdhury', 'F004', 67, 'Dormant'],
      ['Raisa Sarkar', 'F007', 57, 'Active'],
      ['Bilal Khan', 'F030', 47, 'Dormant'],
      ['Hana Haque', 'F022', 46, 'Dormant'],
    ] as const
    return sampleChildren.map(([name, id, chain, status], index) => ({
      id, name, tier: 'Fellow manager', country: 'Bangladesh', status, chain,
      children: [
        { id: `${id}-a`, name: ['Samira Akter', 'Nabil Rahman', 'Mariam Hasan', 'Yusuf Ali', 'Amina Karim'][index],
          tier: 'Onboarder', country: 'Bangladesh', status: 'Active', chain: Math.max(8, Math.round(chain * .38)), children: [] },
        { id: `${id}-b`, name: ['Rafiq Islam', 'Sadia Noor', 'Farhan Mia', 'Nadia Begum', 'Imran Haque'][index],
          tier: 'Onboarder', country: 'Bangladesh', status: 'New', chain: Math.max(4, Math.round(chain * .22)), children: [] },
      ],
    }))
  }

  const candidates = members.filter((candidate) => candidate.route === member.route && candidate.id !== member.id)
  const preferredTier = member.tier === 'Regional partner' ? 'Fellow manager'
    : member.tier === 'Creator head' ? 'Creator fellow' : 'Fellow'
  const selected = [...candidates.filter((candidate) => candidate.tier === preferredTier),
    ...candidates.filter((candidate) => candidate.tier !== preferredTier)].slice(0, Math.min(5, member.team[0]?.count ?? 3))
  return selected.map((candidate) => toNode(candidate))
}

export function MemberTeamTree({ member }: { member: MemberRecord }) {
  const nodes = teamNodes(member)
  const expandableIds = nodes.filter((node) => node.children.length > 0).map((node) => node.id)
  const [expanded, setExpanded] = useState<string[]>([])

  function toggle(id: string) {
    setExpanded((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  return <div className="member-team-tree">
    <div className="member-team-tree-actions">
      <button type="button" onClick={() => setExpanded(expandableIds)}>Expand all</button>
      <button type="button" onClick={() => setExpanded([])}>Collapse</button>
    </div>
    {nodes.length === 0 ? <p className="overview-note">No team members to show.</p> : (
      <div className="member-team-tree-root">
        <div className="member-team-tree-parent">
          <strong>{member.name}</strong>
          <span>{member.tier} · {member.country} <small>{member.chain} in chain</small></span>
        </div>
        <ul className="member-team-tree-list">
          {nodes.map((node) => <li key={node.id}>
            <div className="member-team-tree-node">
              {node.children.length > 0 ? <button type="button" className="member-team-tree-expand"
                aria-label={`${expanded.includes(node.id) ? 'Collapse' : 'Expand'} ${node.name}'s team`}
                aria-expanded={expanded.includes(node.id)} onClick={() => toggle(node.id)}>
                {expanded.includes(node.id) ? '⌄' : '›'}
              </button> : <span className="member-team-tree-spacer" />}
              <div className="member-team-tree-node-info">
                <strong>{node.name}</strong>
                <span>{node.tier} · {node.country}</span>
              </div>
              <span className={`members-status members-status--${node.status.toLowerCase()}`}>{node.status}</span>
              <span className="member-team-tree-chain">{node.chain} in chain</span>
            </div>
            {expanded.includes(node.id) && node.children.length > 0 && <ul className="member-team-tree-children">
              {node.children.map((child) => <li key={child.id}>
                <strong>{child.name}</strong><span>{child.tier} · {child.country}</span>
                <span className={`members-status members-status--${child.status.toLowerCase()}`}>{child.status}</span>
                <small>{child.chain} in chain</small>
              </li>)}
            </ul>}
          </li>)}
        </ul>
      </div>
    )}
  </div>
}
