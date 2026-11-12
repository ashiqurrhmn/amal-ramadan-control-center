interface BarSeries {
  values: number[]
  color: 'teal' | 'gold' | 'blue' | 'orange' | 'violet' | 'coral'
}

export function BarChart({ series, labels, max, money = false, ticks }: {
  series: BarSeries[]
  labels: string[]
  max: number
  money?: boolean
  ticks?: number[]
}) {
  const count = series[0]?.values.length ?? 0
  const axisTicks = ticks ?? [max, Math.round(max * .67), Math.round(max * .33), 0]
  return (
    <div className="overview-chart" role="img" aria-label={`Bar chart with ${count} periods`}>
      <div className="overview-chart-yaxis">
        {axisTicks.map((tick) => <span key={tick}>{money ? '$' : ''}{tick}</span>)}
      </div>
      <div className="overview-chart-main">
        <div className="overview-chart-grid">{axisTicks.map((tick) => <i key={tick} />)}</div>
        <div className="overview-chart-bars">
          {Array.from({ length: count }, (_, index) => (
            <div className="overview-chart-bar-group" key={index}>
              {series.map((item, seriesIndex) => <span key={seriesIndex}
                className={`overview-chart-bar overview-chart-bar--${item.color}`}
                style={{ height: `${Math.min(100, item.values[index] / max * 100)}%` }} />)}
            </div>
          ))}
        </div>
        <div className="overview-chart-xaxis">{labels.map((label) => <span key={label}>{label}</span>)}</div>
      </div>
    </div>
  )
}

export function LineChart({ values, labels }: { values: number[]; labels: string[] }) {
  const width = 300
  const height = 116
  const points = values.map((value, index) => `${index / (values.length - 1) * width},${height - (value - 180) / 160 * height}`).join(' ')
  return (
    <div className="overview-line-chart" role="img" aria-label="Daily active users trend, around 280 users">
      <div className="overview-line-yaxis"><span>300</span><span>200</span><span>100</span><span>0</span></div>
      <div className="overview-line-main">
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
          <line x1="0" y1="0" x2={width} y2="0" />
          <line x1="0" y1="39" x2={width} y2="39" />
          <line x1="0" y1="78" x2={width} y2="78" />
          <line x1="0" y1={height} x2={width} y2={height} />
          <polyline points={points} />
        </svg>
        <div className="overview-chart-xaxis">{labels.map((label) => <span key={label}>{label}</span>)}</div>
      </div>
    </div>
  )
}
