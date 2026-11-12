import type { ReactNode } from 'react'

export type Period = '7 days' | '30 days' | '12 months'
export type Currency = 'USD' | 'BDT' | 'SGD'

export function SegmentedControl<T extends string>({ options, value, onChange, label }: {
  options: readonly T[]
  value: T
  onChange: (value: T) => void
  label: string
}) {
  return (
    <div className="overview-segmented" role="group" aria-label={label}>
      {options.map((option) => (
        <button key={option} type="button" aria-pressed={value === option}
          className={value === option ? 'is-selected' : ''} onClick={() => onChange(option)}>
          {option}
        </button>
      ))}
    </div>
  )
}

export function SectionHeading({ title, caption }: { title: string; caption?: string }) {
  return <div className="overview-section-heading"><h2>{title}</h2>{caption && <span>{caption}</span>}</div>
}

export function DashboardCard({ title, period, children, className = '' }: {
  title: string
  period?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={`overview-card ${className}`}>
      <div className="overview-card-heading"><h3>{title}</h3>{period && <span>{period}</span>}</div>
      {children}
    </section>
  )
}

export function Delta({ value, suffix = '', tone = 'good' }: {
  value: string
  suffix?: string
  tone?: 'good' | 'bad'
}) {
  return <span className={`overview-delta overview-delta--${tone}`}>{tone === 'bad' ? '↓' : '↑'} {value}{suffix}</span>
}

export function LegendItem({ label, color, value, detail }: {
  label: string
  color: string
  value?: string
  detail?: string
}) {
  return (
    <div className="overview-legend-item">
      <span className="overview-legend-swatch" style={{ backgroundColor: color }} />
      <span>{label}</span>{value && <strong>{value}</strong>}{detail && <span className="overview-muted">{detail}</span>}
    </div>
  )
}

export function ProgressRow({ label, value, detail, share, color = 'teal', segments }: {
  label: string
  value?: string
  detail?: string
  share?: number
  color?: 'teal' | 'gold' | 'gray' | 'red'
  segments?: number[]
}) {
  return (
    <div className="overview-progress-row">
      <span className="overview-progress-label">{label}</span>
      <div className="overview-progress-track" aria-label={`${label}: ${value ?? detail ?? `${share ?? 0}%`}`}>
        {segments ? segments.map((segment, index) => (
          <span key={index} className={`overview-progress-fill overview-progress-fill--${['teal', 'gold', 'violet'][index]}`}
            style={{ width: `${segment}%` }} />
        )) : <span className={`overview-progress-fill overview-progress-fill--${color}`}
          style={{ width: `${share ?? 0}%` }} />}
      </div>
      <span className="overview-progress-value">{value} {detail && <span className="overview-muted">{detail}</span>}</span>
    </div>
  )
}
