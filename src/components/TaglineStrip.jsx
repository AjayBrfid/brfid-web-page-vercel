import { useEffect, useRef, useState } from 'react'

const ITEMS = [
  {
    color: '#34ACE0',
    label: 'Heritage',
    text: 'Designed in the UK · Made in India',
    sub: '50+ years of labelling expertise',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    color: '#AB3480',
    label: 'Expertise',
    text: 'End-to-End RFID Solutions Provider',
    sub: 'Chip to cloud, one partner',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
        <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
        <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    color: '#C9CD2C',
    label: 'Innovation',
    text: 'IC Chip Bonding — Domestically Manufactured',
    sub: '100% made in India',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
]

export default function TaglineStrip() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @keyframes ts-slideUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ts-iconSpin {
          from { transform: rotate(-8deg) scale(0.8); opacity: 0; }
          to   { transform: rotate(0deg)  scale(1);   opacity: 1; }
        }
        .ts-section {
          background: #0d1526;
          border-top:    1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: clamp(2.5rem,6vw,4rem) clamp(1rem,5vw,2.5rem);
          position: relative;
          overflow: hidden;
        }
        .ts-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 50% 150% at 0%   50%, rgba(52,172,224,0.06)  0%, transparent 55%),
            radial-gradient(ellipse 50% 150% at 100% 50%, rgba(201,205,44,0.05)  0%, transparent 55%);
          pointer-events: none;
        }
        .ts-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1.5rem,4vw,2.5rem);
          position: relative;
        }
        .ts-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 1.5rem;
          background: rgba(255,255,255,0.025);
          border: 1.5px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
          cursor: default;
        }
        .ts-card:hover {
          border-color: var(--c);
          box-shadow: 0 8px 32px color-mix(in srgb, var(--c) 18%, transparent);
          transform: translateY(-4px);
        }
        .ts-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: color-mix(in srgb, var(--c) 14%, transparent);
          border: 1.5px solid color-mix(in srgb, var(--c) 28%, transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--c);
          flex-shrink: 0;
          transition: box-shadow 0.25s;
        }
        .ts-card:hover .ts-icon {
          box-shadow: 0 0 18px color-mix(in srgb, var(--c) 35%, transparent);
        }
        .ts-icon svg { width: 20px; height: 20px; }
        .ts-chip {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--c);
          margin-bottom: 6px;
          font-family: Inter, sans-serif;
        }
        .ts-text {
          font-size: clamp(0.875rem,1.5vw,1.05rem);
          font-weight: 700;
          color: #f1f5f9;
          margin: 0 0 4px;
          line-height: 1.35;
          font-family: Inter, sans-serif;
          letter-spacing: -0.01em;
        }
        .ts-sub {
          font-size: 0.75rem;
          color: #64748b;
          margin: 0;
          font-family: Inter, sans-serif;
          font-weight: 500;
        }

        /* Responsive */
        @media (max-width: 860px) {
          .ts-inner { grid-template-columns: 1fr; gap: 1rem; }
          .ts-card { padding: 1.25rem; }
        }
        @media (max-width: 480px) {
          .ts-section { padding: 2rem 1rem; }
          .ts-icon { width: 38px; height: 38px; border-radius: 10px; }
          .ts-icon svg { width: 17px; height: 17px; }
          .ts-text { font-size: 0.9rem; }
        }
      `}</style>

      <div className="ts-section" ref={ref}>
        <div className="ts-inner">
          {ITEMS.map((item, i) => (
            <div
              key={i}
              className="ts-card"
              style={{
                '--c': item.color,
                opacity:   visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(22px)',
                transition: `opacity 0.6s ease ${i * 0.14}s, transform 0.6s cubic-bezier(0.34,1.3,0.64,1) ${i * 0.14}s, border-color 0.25s, box-shadow 0.25s, transform 0.25s`,
              }}
            >
              <div
                className="ts-icon"
                style={{
                  animation: visible
                    ? `ts-iconSpin 0.5s cubic-bezier(0.34,1.3,0.64,1) ${0.1 + i * 0.14}s both`
                    : 'none',
                }}
              >
                {item.icon}
              </div>
              <div>
                <p className="ts-chip">{item.label}</p>
                <p className="ts-text">{item.text}</p>
                <p className="ts-sub">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
