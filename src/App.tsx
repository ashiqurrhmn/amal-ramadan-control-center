import { useState } from 'react'
import { Sidebar } from './components/sidebar/Sidebar'
import { navigation } from './components/sidebar/navigation'
import { OverviewPage } from './components/overview/OverviewPage'
import './App.css'

function App() {
  const [activePage, setActivePage] = useState(() => {
    const requestedPage = new URLSearchParams(window.location.search).get('page')
    return navigation.some((section) => section.items.some((item) => item.id === requestedPage))
      ? requestedPage!
      : 'overview'
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const currentPage = navigation.flatMap((section) => section.items).find((page) => page.id === activePage)

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={(pageId) => {
          setActivePage(pageId)
          setSidebarOpen(false)
        }}
      />
      <main className={`app-main${activePage === 'overview' ? ' app-main--overview' : ''}`} id="main-content">
        <button className="mobile-menu-button" type="button"
          onClick={() => setSidebarOpen(true)} aria-label="Open navigation menu"
          aria-expanded={sidebarOpen} aria-controls="app-sidebar">
          <span aria-hidden="true">☰</span>
        </button>
        {activePage === 'overview' ? (
          <OverviewPage onNavigate={setActivePage} />
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
