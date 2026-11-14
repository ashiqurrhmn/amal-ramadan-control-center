import { useEffect, useState } from 'react'
import { Sidebar } from './components/sidebar/Sidebar'
import { navigation } from './components/sidebar/navigation'
import { OverviewPage } from './components/overview/OverviewPage'
import { FellowshipOverviewPage } from './components/fellowship/FellowshipOverviewPage'
import { GRoutePage } from './components/fellowship/GRoutePage'
import { AppHealthPage } from './components/app-health/AppHealthPage'
import { AllMembersPage } from './components/members/AllMembersPage'
import './App.css'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = window.localStorage.getItem('amal-dashboard-theme')
    const initialTheme = savedTheme === 'dark' ? 'dark' : 'light'
    document.documentElement.dataset.theme = initialTheme
    return initialTheme
  })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('amal-dashboard-theme', theme)
  }, [theme])
  const [activePage, setActivePage] = useState(() => {
    const requestedPage = new URLSearchParams(window.location.search).get('page')
    return navigation.some((section) => section.items.some((item) => item.id === requestedPage))
      ? requestedPage!
      : 'overview'
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedGRoute, setSelectedGRoute] = useState('Bangladesh G route')
  const currentPage = navigation.flatMap((section) => section.items).find((page) => page.id === activePage)

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        theme={theme}
        onToggleTheme={() => setTheme((current) => current === 'light' ? 'dark' : 'light')}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={(pageId) => {
          setActivePage(pageId)
          setSidebarOpen(false)
        }}
      />
      <main className={`app-main${['overview', 'fellowship-overview', 'g-route', 'all-members', 'app-health'].includes(activePage) ? ' app-main--overview' : ''}`} id="main-content">
        <button
          className="mobile-menu-button"
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={sidebarOpen}
          aria-controls="app-sidebar"
        >
          <span aria-hidden="true">☰</span>
        </button>
        {activePage === 'overview' ? (
          <OverviewPage onNavigate={setActivePage} />
        ) : activePage === 'fellowship-overview' ? (
          <FellowshipOverviewPage onNavigate={(pageId, routeName) => {
            if (pageId === 'g-route' && routeName) setSelectedGRoute(routeName)
            setActivePage(pageId)
          }} />
        ) : activePage === 'g-route' ? (
          <GRoutePage selectedRoute={selectedGRoute} onSelectRoute={setSelectedGRoute} />
        ) : activePage === 'all-members' ? (
          <AllMembersPage />
        ) : activePage === 'app-health' ? (
          <AppHealthPage />
        ) : (
          <div className="page-content">
            <p className="page-eyebrow">Admin dashboard</p>
            <h1>{currentPage?.label ?? 'Overview'}</h1>
            <p className="page-description">The dashboard page will appear here. Use the sidebar to preview its navigation.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
