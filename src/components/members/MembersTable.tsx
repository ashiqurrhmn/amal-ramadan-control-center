import type { MemberRecord } from './membersData'

function StatusPill({ status }: { status: MemberRecord['status'] }) {
  return <span className={`members-status members-status--${status.toLowerCase()}`}>{status}</span>
}

export function MembersTable({ members, selectedId, onSelect }: {
  members: MemberRecord[]
  selectedId: string | null
  onSelect: (member: MemberRecord) => void
}) {
  return (
    <div className={`members-table-wrap${selectedId ? ' members-table-wrap--panel-open' : ''}`}>
      <table className="members-table">
        <thead><tr>
          <th className="members-col-name">Member</th><th>ID</th><th>Route</th><th>Tier</th>
          <th>Country</th><th>Status</th><th>Chain</th>
          <th className="members-col-extra">Paying users</th>
          <th className="members-col-extra">Last activity</th>
          <th className="members-col-extra">Noor coins</th>
        </tr></thead>
        <tbody>
          {members.map((member) => <tr key={member.id} id={`member-row-${member.id}`}
            tabIndex={0} aria-selected={selectedId === member.id}
            onClick={() => onSelect(member)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onSelect(member)
              }
            }}>
            <td className="members-col-name">{member.name}</td>
            <td>{member.id}</td><td>{member.route}</td><td>{member.tier}</td>
            <td>{member.country}</td><td><StatusPill status={member.status} /></td>
            <td>{member.chain}</td>
            <td className="members-col-extra">{member.payingUsers}</td>
            <td className="members-col-extra">{member.lastActivity}</td>
            <td className="members-col-extra">{member.noorCoins.toLocaleString('en-US')}</td>
          </tr>)}
        </tbody>
      </table>
      {members.length === 0 && <p className="members-empty">No members match these filters.</p>}
    </div>
  )
}
