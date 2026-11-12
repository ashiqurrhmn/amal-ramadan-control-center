import { useEffect, useRef, useState } from 'react'
import type { NavigationItem, NavigationSection } from './navigation'
import { navigation } from './navigation'
import './Sidebar.css'

interface SidebarProps {
  activePage: string
  isOpen: boolean
  onClose: () => void
  onNavigate: (pageId: string) => void
}

function NavItem({ item, active, onNavigate }: {
  item: NavigationItem
  active: boolean
  onNavigate: (pageId: string) => void
}) {
  return (
    <li>
      <button className={`sidebar-link${active ? ' sidebar-link--active' : ''}`}
        type="button" onClick={() => onNavigate(item.id)} aria-current={active ? 'page' : undefined}>
        {item.label}
      </button>
    </li>
  )
}

function NavSection({ section, activePage, onNavigate }: {
  section: NavigationSection
  activePage: string
  onNavigate: (pageId: string) => void
}) {
  return (
    <section className="sidebar-section" aria-label={section.label ?? 'Main'}>
      {section.label && <h2 className="sidebar-section-label">{section.label}</h2>}
      <ul className="sidebar-list">
        {section.items.map((item) => <NavItem key={item.id} item={item}
          active={activePage === item.id} onNavigate={onNavigate} />)}
      </ul>
    </section>
  )
}

export function Sidebar({ activePage, isOpen, onClose, onNavigate }: SidebarProps) {
  const [search, setSearch] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)
  const sidebarRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const previousFocus = document.activeElement as HTMLElement | null
    searchRef.current?.focus()
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab' || !sidebarRef.current) return
      const focusable = sidebarRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled])')
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => { document.removeEventListener('keydown', handleKeyDown); previousFocus?.focus() }
  }, [isOpen, onClose])

  const query = search.trim().toLowerCase()
  const visibleSections = navigation.map((section) => ({
    ...section, items: section.items.filter((item) => item.label.toLowerCase().includes(query)),
  })).filter((section) => section.items.length > 0)

  return (
    <>
      {isOpen && <button className="sidebar-backdrop" type="button" onClick={onClose} aria-label="Close navigation menu" />}
      <aside className={`sidebar${isOpen ? ' sidebar--open' : ''}`} id="app-sidebar"
        ref={sidebarRef} aria-label="Admin navigation">
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <span className="sidebar-brand-name">Amal</span>
            <span className="sidebar-brand-subtitle">Admin dashboard</span>
          </div>
          <button className="sidebar-close" type="button" onClick={onClose} aria-label="Close navigation menu">×</button>
        </div>
        <label className="sidebar-search">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" /><path d="m16 16 5 5" />
          </svg>
          <span className="sr-only">Search pages</span>
          <input ref={searchRef} type="search" placeholder="Search pages" value={search}
            onChange={(event) => setSearch(event.target.value)} />
        </label>
        <nav aria-label="Pages" className="sidebar-nav">
          {visibleSections.length > 0 ? visibleSections.map((section) => (
            <NavSection key={section.id} section={section} activePage={activePage} onNavigate={onNavigate} />
          )) : <p className="sidebar-empty">No pages found.</p>}
        </nav>
      </aside>
    </>
  )
}
