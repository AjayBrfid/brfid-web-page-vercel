import { useEffect, useRef, useState } from 'react'
import styles from './Stats.module.css'

const STATS = [
  {
    value: 50, suffix: '+',
    label: 'Years Experience',
    sub: 'Industry Heritage Since 1974',
    color: '#34ACE0',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    value: 60, suffix: '+',
    label: 'Global Brands',
    sub: 'Clients Served Worldwide',
    color: '#AB3480',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4"/>
        <path d="M5.5 21a8.38 8.38 0 0 1 13 0"/>
        <circle cx="6" cy="19" r="2"/>
        <circle cx="18" cy="19" r="2"/>
      </svg>
    ),
  },
  {
    value: 500, suffix: 'M+',
    label: 'Units Per Year',
    sub: 'Manufacturing Capacity',
    color: '#C9CD2C',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
  },
]

function StatCard({ stat, index, active }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    const delay = index * 180
    const duration = 1800
    const timer = setTimeout(() => {
      let start = null
      const step = ts => {
        if (!start) start = ts
        const p = Math.min((ts - start) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 4)
        setCount(Math.floor(eased * stat.value))
        if (p < 1) requestAnimationFrame(step)
        else setCount(stat.value)
      }
      requestAnimationFrame(step)
    }, delay)
    return () => clearTimeout(timer)
  }, [active, index, stat.value])

  return (
    <div
      className={styles.card}
      style={{
        '--clr': stat.color,
        opacity:   active ? 1 : 0,
        transform: active ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.96)',
        transition: `opacity 0.65s ease ${index * 0.13}s, transform 0.65s cubic-bezier(0.34,1.3,0.64,1) ${index * 0.13}s`,
      }}
    >
      <div className={styles.cardGlow} />
      <div className={styles.iconWrap}>{stat.icon}</div>
      <span className={styles.value}>{count}{stat.suffix}</span>
      <span className={styles.label}>{stat.label}</span>
      <span className={styles.sub}>{stat.sub}</span>
      <div className={styles.bottomBar} />
    </div>
  )
}

export default function Stats() {
  const [active, setActive] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setActive(true) },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className={styles.stats}>
      <div className={styles.bgGlow} />
      <div className={styles.container}>
        {STATS.map((s, i) => (
          <StatCard key={i} stat={s} index={i} active={active} />
        ))}
      </div>
    </section>
  )
}
