export interface NavigationItem {
  id: string
  label: string
}

export interface NavigationSection {
  id: string
  label?: string
  items: NavigationItem[]
}

export const navigation: NavigationSection[] = [
  { id: 'main', items: [{ id: 'overview', label: 'Overview' }] },
  {
    id: 'app-product', label: 'App & Product',
    items: [
      { id: 'app-health', label: 'App Health' },
      { id: 'soul-stack', label: 'Soul Stack' },
      { id: 'amal-gallery', label: 'Amal Gallery' },
    ],
  },
  {
    id: 'fellowship', label: 'Fellowship',
    items: [
      { id: 'fellowship-overview', label: 'Fellowship overview' },
      { id: 'g-route', label: 'G Route' },
      { id: 'creator-route', label: 'Creator Route' },
      { id: 'all-members', label: 'All Members' },
    ],
  },
]
