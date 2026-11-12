export type MemberStatus = 'Active' | 'New' | 'Dormant' | 'Suspended' | 'Removed'

export interface MemberRecord {
  id: string
  name: string
  route: string
  tier: string
  country: string
  status: MemberStatus
  chain: number
  payingUsers: number
  lastActivity: string
  noorCoins: number
  joined: string
  referred: number
  link: string
  team: { label: string; count: number }[]
}

type MemberSeed = Pick<MemberRecord, 'name' | 'id' | 'route' | 'tier' | 'country' | 'status' | 'chain' | 'payingUsers' | 'lastActivity' | 'noorCoins'>

const referenceMembers: MemberSeed[] = [
  { name: 'Afsana Siddiqui', id: 'F001', route: 'Bangladesh G route', tier: 'Regional partner', country: 'Bangladesh', status: 'Active', chain: 474, payingUsers: 0, lastActivity: '2026-10-26', noorCoins: 690 },
  { name: 'Tasnim Uddin', id: 'F002', route: 'Bangladesh G route', tier: 'Regional partner', country: 'Bangladesh', status: 'Active', chain: 263, payingUsers: 0, lastActivity: '2026-10-04', noorCoins: 892 },
  { name: 'Hana Abdullah', id: 'F127', route: 'USA/Canada G route', tier: 'Regional partner', country: 'Canada', status: 'Active', chain: 163, payingUsers: 0, lastActivity: '2026-10-25', noorCoins: 582 },
  { name: 'Imran Karim', id: 'F177', route: 'Creator route', tier: 'Creator head', country: 'Bangladesh', status: 'Dormant', chain: 151, payingUsers: 1, lastActivity: '2026-09-25', noorCoins: 1744 },
  { name: 'Siti Abdullah', id: 'F179', route: 'Creator route', tier: 'Creator head', country: 'United Kingdom', status: 'Active', chain: 149, payingUsers: 4, lastActivity: '2026-10-22', noorCoins: 2818 },
  { name: 'Adam Rahman', id: 'F178', route: 'Creator route', tier: 'Creator head', country: 'Singapore', status: 'Dormant', chain: 122, payingUsers: 1, lastActivity: '2026-09-21', noorCoins: 1513 },
  { name: 'Khadija Rahman', id: 'F016', route: 'Bangladesh G route', tier: 'Fellow manager', country: 'Bangladesh', status: 'Active', chain: 114, payingUsers: 0, lastActivity: '2026-10-11', noorCoins: 239 },
  { name: 'Farhan Aziz', id: 'F003', route: 'Bangladesh G route', tier: 'Regional partner', country: 'Bangladesh', status: 'Dormant', chain: 97, payingUsers: 0, lastActivity: '2026-09-23', noorCoins: 420 },
  { name: 'Fatima Mia', id: 'F006', route: 'Bangladesh G route', tier: 'Fellow manager', country: 'Bangladesh', status: 'Dormant', chain: 90, payingUsers: 0, lastActivity: '2026-09-27', noorCoins: 430 },
  { name: 'Mehjabin Karim', id: 'F011', route: 'Bangladesh G route', tier: 'Fellow manager', country: 'Bangladesh', status: 'Dormant', chain: 74, payingUsers: 0, lastActivity: '2026-09-23', noorCoins: 283 },
  { name: 'Junaid Siddiqui', id: 'F126', route: 'USA/Canada G route', tier: 'Regional partner', country: 'USA', status: 'Dormant', chain: 70, payingUsers: 1, lastActivity: '2026-09-26', noorCoins: 780 },
  { name: 'Rafi Noor', id: 'F014', route: 'Bangladesh G route', tier: 'Fellow manager', country: 'Bangladesh', status: 'Dormant', chain: 67, payingUsers: 0, lastActivity: '2026-09-18', noorCoins: 499 },
  { name: 'Raisa Chowdhury', id: 'F004', route: 'Bangladesh G route', tier: 'Fellow manager', country: 'Bangladesh', status: 'Dormant', chain: 67, payingUsers: 0, lastActivity: '2026-09-23', noorCoins: 171 },
  { name: 'Ayesha Karim', id: 'F019', route: 'Bangladesh G route', tier: 'Fellow manager', country: 'Bangladesh', status: 'Dormant', chain: 60, payingUsers: 1, lastActivity: '2026-09-23', noorCoins: 727 },
  { name: 'Ehsan Sultana', id: 'F036', route: 'Bangladesh G route', tier: 'Onboarder', country: 'Bangladesh', status: 'Active', chain: 58, payingUsers: 0, lastActivity: '2026-10-14', noorCoins: 779 },
  { name: 'Iqbal Haque', id: 'F157', route: 'Pakistan G route', tier: 'Regional partner', country: 'Pakistan', status: 'Dormant', chain: 57, payingUsers: 0, lastActivity: '2026-08-21', noorCoins: 339 },
  { name: 'Raisa Sarkar', id: 'F007', route: 'Bangladesh G route', tier: 'Fellow manager', country: 'Bangladesh', status: 'Active', chain: 57, payingUsers: 0, lastActivity: '2026-10-20', noorCoins: 388 },
]

function addDetails(member: MemberSeed): MemberRecord {
  const isTasnim = member.id === 'F002'
  return {
    ...member,
    joined: isTasnim ? '2026-06-15' : '2026-06-20',
    referred: isTasnim ? 12 : Math.max(1, Math.round(member.chain / 14)),
    link: isTasnim ? 'amal-app.com/f/77SRNZ' : `amal-app.com/f/${member.id}`,
    team: isTasnim ? [
      { label: 'fellow managers', count: 5 },
      { label: 'onboarders', count: 7 },
      { label: 'fellows', count: 22 },
    ] : [
      { label: 'fellow managers', count: Math.max(1, Math.round(member.chain / 50)) },
      { label: 'onboarders', count: Math.max(1, Math.round(member.chain / 30)) },
      { label: 'fellows', count: Math.max(1, Math.round(member.chain / 12)) },
    ],
  }
}

const remainingStatuses: MemberStatus[] = [
  ...Array<MemberStatus>(71).fill('Active'),
  ...Array<MemberStatus>(49).fill('New'),
  ...Array<MemberStatus>(60).fill('Dormant'),
  ...Array<MemberStatus>(9).fill('Suspended'),
  ...Array<MemberStatus>(8).fill('Removed'),
]

const sampleRoutes = [
  { route: 'Bangladesh G route', country: 'Bangladesh', tier: 'Fellow' },
  { route: 'USA/Canada G route', country: 'USA', tier: 'Fellow' },
  { route: 'Pakistan G route', country: 'Pakistan', tier: 'Onboarder' },
  { route: 'Creator route', country: 'Singapore', tier: 'Creator fellow' },
]

const generatedMembers = remainingStatuses.map((status, index): MemberRecord => {
  const sampleRoute = sampleRoutes[index % sampleRoutes.length]
  const seed: MemberSeed = {
    name: `Sample Member ${index + 18}`,
    id: `F${String(index + 200).padStart(3, '0')}`,
    ...sampleRoute,
    status,
    chain: Math.max(0, 55 - (index % 56)),
    payingUsers: index % 5,
    lastActivity: `2026-10-${String(index % 28 + 1).padStart(2, '0')}`,
    noorCoins: 100 + index * 7,
  }
  return addDetails(seed)
})

export const members: MemberRecord[] = [
  ...referenceMembers.map(addDetails),
  ...generatedMembers,
]
