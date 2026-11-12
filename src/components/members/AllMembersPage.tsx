import { useState } from 'react'
import { MemberDetailPanel } from './MemberDetailPanel'
import { MembersTable } from './MembersTable'
import { members } from './membersData'
import type { MemberRecord, MemberStatus } from './membersData'
import '../overview/OverviewPage.css'
import './AllMembersPage.css'

type Filters = { search: string; route: string; country: string; tier: string; status: string }
const initialFilters: Filters = { search: '', route: 'All', country: 'All', tier: 'All', status: 'All' }

const tiles: { label: string; value: number; status: string }[] = [
  { label: 'Total members', value: 206, status: 'All' },
  { label: 'Active', value: 78, status: 'Active' },
  { label: 'New', value: 49, status: 'New' },
  { label: 'Dormant', value: 70, status: 'Dormant' },
  { label: 'Suspended', value: 9, status: 'Suspended' },
  { label: 'Removed (history)', value: 8, status: 'Removed' },
]

const uniqueValues = (key: 'route' | 'country' | 'tier') =>
  Array.from(new Set(members.map((member) => member[key]))).sort()

function SelectFilter({ label, value, options, onChange }: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  return <label className="members-select">
    <span className="sr-only">{label}</span>
    <select value={value} onChange={(event) => onChange(event.target.value)}>
      <option value="All">{label}: All</option>
      {options.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
  </label>
}

function exportMembers(rows: MemberRecord[]) {
  const headers = ['Member', 'ID', 'Route', 'Tier', 'Country', 'Status', 'Chain', 'Paying users', 'Last activity', 'Noor coins']
  const values = rows.map((member) => [member.name, member.id, member.route, member.tier, member.country,
    member.status, member.chain, member.payingUsers, member.lastActivity, member.noorCoins])
  const csv = [headers, ...values].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'sample-fellowship-members.csv'
  link.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function AllMembersPage() {
  const [filters, setFilters] = useState<Filters>(initialFilters)
  const [visibleCount, setVisibleCount] = useState(50)
  const [selectedMember, setSelectedMember] = useState<MemberRecord | null>(() => {
    const selectedId = new URLSearchParams(window.location.search).get('member')
    return members.find((member) => member.id === selectedId) ?? null
  })

  function updateFilter(key: keyof Filters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }))
    setVisibleCount(50)
  }

  const query = filters.search.trim().toLowerCase()
  const filteredMembers = members.filter((member) =>
    (!query || [member.name, member.id, member.link].some((value) => value.toLowerCase().includes(query))) &&
    (filters.route === 'All' || member.route === filters.route) &&
    (filters.country === 'All' || member.country === filters.country) &&
    (filters.tier === 'All' || member.tier === filters.tier) &&
    (filters.status === 'All' || member.status === filters.status),
  )
  const shownMembers = filteredMembers.slice(0, visibleCount)

  function closePanel() {
    const selectedId = selectedMember?.id
    setSelectedMember(null)
    requestAnimationFrame(() => document.getElementById(`member-row-${selectedId}`)?.focus())
  }

  return (
    <div className="overview-page members-page">
      <header className="members-header">
        <p>Fellowship</p><h1>All Members</h1>
        <div><span>{filteredMembers.length} of 214 members listed</span><span className="overview-sample-badge">Sample data</span></div>
      </header>

      <div className="members-summary" role="group" aria-label="Filter by member status">
        {tiles.map((tile) => <button key={tile.label} type="button"
          className={filters.status === tile.status ? 'members-summary-tile is-active' : 'members-summary-tile'}
          onClick={() => updateFilter('status', tile.status)} aria-pressed={filters.status === tile.status}>
          <span>{tile.label}</span><strong>{tile.value}</strong>
        </button>)}
      </div>

      <div className="members-filters">
        <label className="members-search"><span className="sr-only">Search members</span>
          <input type="search" placeholder="Search name, member ID or link..." value={filters.search}
            onChange={(event) => updateFilter('search', event.target.value)} />
        </label>
        <SelectFilter label="Route" value={filters.route} options={uniqueValues('route')} onChange={(value) => updateFilter('route', value)} />
        <SelectFilter label="Country" value={filters.country} options={uniqueValues('country')} onChange={(value) => updateFilter('country', value)} />
        <SelectFilter label="Tier" value={filters.tier} options={uniqueValues('tier')} onChange={(value) => updateFilter('tier', value)} />
        <SelectFilter label="Status" value={filters.status} options={['Active', 'New', 'Dormant', 'Suspended', 'Removed'] satisfies MemberStatus[]} onChange={(value) => updateFilter('status', value)} />
        <button className="members-export" type="button" onClick={() => exportMembers(filteredMembers)}>Export list</button>
      </div>

      <div className={`members-main${selectedMember ? ' members-main--panel-open' : ''}`}>
        <div className="members-list-area">
          <MembersTable members={shownMembers} selectedId={selectedMember?.id ?? null} onSelect={setSelectedMember} />
          <div className="members-list-footer"><span>Showing {shownMembers.length} of {filteredMembers.length}</span>
            {shownMembers.length < filteredMembers.length && <button type="button" onClick={() => setVisibleCount((count) => count + 50)}>Show 50 more</button>}
          </div>
        </div>
        {selectedMember && <MemberDetailPanel key={selectedMember.id} member={selectedMember} onClose={closePanel} />}
      </div>
    </div>
  )
}
