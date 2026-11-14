import '../overview/OverviewPage.css'
import './AppHealthPage.css'

const suggestions = [
  { title: 'Crash-free users', detail: '% of users with no crash, by app version' },
  { title: 'ANR / freeze rate', detail: 'Android “app not responding” rate vs Play Store bad-behaviour threshold' },
  { title: 'Version adoption', detail: 'share of active users on each app version' },
  { title: 'App start time & API errors', detail: 'slow screens and failing calls' },
  { title: 'Store rating', detail: 'App Store and Play rating, with recent reviews' },
]

export function AppHealthPage() {
  return <div className="overview-page app-health-page">
    <header className="app-health-header">
      <p>App &amp; Product</p>
      <h1>App Health</h1>
    </header>
    <section className="app-health-card" aria-labelledby="app-health-empty-title">
      <h2 id="app-health-empty-title">Page not designed yet</h2>
      <p>Suggested cards for this page:</p>
      <ul>{suggestions.map((item) => <li key={item.title}>
        <strong>{item.title}</strong><span> — {item.detail}</span>
      </li>)}</ul>
    </section>
  </div>
}
