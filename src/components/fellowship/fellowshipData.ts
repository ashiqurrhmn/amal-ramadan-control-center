export interface RouteSummary {
  id: string
  name: string
  members: number
  active: number
  activeShare: number
  signups: number
  paying: number
  color: 'teal' | 'gold' | 'coral' | 'violet'
  tiers: { label: string; count: number }[]
}

export const routes: RouteSummary[] = [
  {
    id: 'g-route', name: 'Bangladesh G route', members: 125, active: 45,
    activeShare: 36, signups: 177, paying: 56, color: 'teal',
    tiers: [
      { label: 'Regional partner', count: 3 }, { label: 'Fellow manager', count: 18 },
      { label: 'Onboarder', count: 30 }, { label: 'Fellow', count: 74 },
    ],
  },
  {
    id: 'g-route', name: 'USA/Canada G route', members: 31, active: 16,
    activeShare: 52, signups: 64, paying: 19, color: 'gold',
    tiers: [{ label: 'Regional partner', count: 2 }, { label: 'Fellow', count: 29 }],
  },
  {
    id: 'g-route', name: 'Pakistan G route', members: 20, active: 7,
    activeShare: 35, signups: 25, paying: 1, color: 'coral',
    tiers: [
      { label: 'Regional partner', count: 1 }, { label: 'Fellow manager', count: 3 },
      { label: 'Onboarder', count: 5 }, { label: 'Fellow', count: 11 },
    ],
  },
  {
    id: 'creator-route', name: 'Creator route', members: 30, active: 10,
    activeShare: 33, signups: 93, paying: 24, color: 'violet',
    tiers: [{ label: 'Creator head', count: 3 }, { label: 'Creator fellow', count: 27 }],
  },
]

export const weeklySignups = [
  { label: 'Bangladesh G route', color: 'teal' as const, values: [36, 30, 50, 61, 63, 79, 82, 51, 40, 34, 46, 22] },
  { label: 'USA/Canada G route', color: 'gold' as const, values: [10, 13, 17, 12, 18, 15, 24, 14, 14, 12, 20, 4] },
  { label: 'Pakistan G route', color: 'coral' as const, values: [1, 2, 2, 3, 3, 4, 5, 5, 5, 7, 6, 3] },
  { label: 'Creator route', color: 'violet' as const, values: [16, 23, 34, 31, 39, 50, 45, 30, 18, 22, 17, 8] },
]

export interface TopMember {
  name: string
  route: string
  tier: string
  referred: number
  paying: number
  inChain: number
  noorCoins: string
}

export const topMembers: TopMember[] = [
  { name: 'Adam Noor', route: 'Bangladesh G route', tier: 'Fellow', referred: 13, paying: 5, inChain: 13, noorCoins: '2,059' },
  { name: 'Siti Abdullah', route: 'Creator route', tier: 'Creator head', referred: 38, paying: 4, inChain: 149, noorCoins: '2,818' },
  { name: 'Sumaiya Siddiqui', route: 'Creator route', tier: 'Creator fellow', referred: 34, paying: 4, inChain: 34, noorCoins: '3,028' },
  { name: 'Yusuf Rahman', route: 'Bangladesh G route', tier: 'Onboarder', referred: 12, paying: 4, inChain: 32, noorCoins: '1,709' },
  { name: 'Afsana Mia', route: 'USA/Canada G route', tier: 'Fellow', referred: 19, paying: 3, inChain: 19, noorCoins: '1,768' },
  { name: 'Rafi Islam', route: 'Bangladesh G route', tier: 'Onboarder', referred: 17, paying: 3, inChain: 54, noorCoins: '1,540' },
  { name: 'Rafi Mia', route: 'Bangladesh G route', tier: 'Onboarder', referred: 17, paying: 3, inChain: 25, noorCoins: '1,817' },
  { name: 'Siti Karim', route: 'Bangladesh G route', tier: 'Fellow', referred: 16, paying: 3, inChain: 16, noorCoins: '1,758' },
  { name: 'Sadia Siddiqui', route: 'Creator route', tier: 'Creator fellow', referred: 9, paying: 3, inChain: 9, noorCoins: '1,298' },
  { name: 'Arif Aziz', route: 'USA/Canada G route', tier: 'Fellow', referred: 8, paying: 3, inChain: 8, noorCoins: '1,350' },
]
