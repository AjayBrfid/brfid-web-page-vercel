import { useState, useEffect, useRef } from 'react'
import styles from './Verticals.module.css'

const verticals = [
  {
    id: 'textile',
    title: 'Textile & Garments',
    platform: 'BRFID Textile Manager',
    desc: 'End-to-end garment lifecycle visibility from source tagging at manufacture to store shelf, cycle counts, and omnichannel fulfilment.',
    color: '#34ACE0',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
        <circle cx="7" cy="7" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
    useCases: [
      'Item-level source tagging at manufacturing',
      'Automated warehouse receiving via tunnel readers',
      'Store cycle counts using handheld readers',
      'EAS-integrated exit gate loss prevention',
      'Omnichannel BOPIS & click-and-collect fulfilment',
    ],
    features: [
      'Live SKU-level inventory dashboard with alerts',
      'Handheld app for staff cycle counts & receiving',
      'ERP/WMS integration for auto stock adjustments',
      'EAS deactivation at POS with audit trail',
      'Replenishment queue push notifications to staff',
    ],
  },
  {
    id: 'medical',
    title: 'Medical & Healthcare',
    platform: 'BRFID MedTrack',
    desc: 'Closed loop tracking for surgical instruments, patient wristbands, medical equipment, and sterile supply chain compliance.',
    color: '#AB3480',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    useCases: [
      'Autoclave-safe tagging of surgical instruments',
      'Patient wristband tracking from admission to discharge',
      'Blood bag chain-of-custody from collection to transfusion',
      'Medical equipment location tracking across wards',
      'Sterilisation cycle verification and logging',
    ],
    features: [
      'Instrument count verification before and after surgery',
      'Real-time equipment location map across hospital floors',
      'Blood bag traceability with expiry and temperature alerts',
      'Sterilisation cycle log with RFID verification per tray',
      'Patient wristband scan at every care handoff point',
    ],
  },
  {
    id: 'agriculture',
    title: 'Agriculture',
    platform: 'BRFID AgroTrack',
    desc: 'Livestock ear-tag tracking, harvest lot traceability, cold-chain monitoring, and compliance reporting.',
    color: '#C9CD2C',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
      </svg>
    ),
    useCases: [
      'Livestock ear-tag tracking for herd management',
      'Harvest lot tracking from field to processing',
      'Cold-chain temperature monitoring for perishables',
      'Farm equipment audit and maintenance tracking',
      'USDA / FSSAI regulatory compliance reporting',
    ],
    features: [
      'Offline-capable mobile app for remote farm use',
      'Herd health and movement history per animal',
      'Lot lineage traceability from field to retailer',
      'Cold-chain temperature alert with SMS notification',
      'Regulatory compliance report auto-generation',
    ],
  },
  {
    id: 'logistics',
    title: 'Transport & Logistics',
    platform: 'BRFID LogiTrack',
    desc: 'Pallet-level RFID tagging, dock-door portal scanning, load verification, and live shipment visibility from dock to delivery.',
    color: '#34ACE0',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/>
        <rect x="9" y="11" width="14" height="10" rx="2"/>
        <circle cx="12" cy="21" r="1" fill="currentColor" stroke="none"/>
        <circle cx="20" cy="21" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
    useCases: [
      'Pallet-level RFID tagging at origin warehouse',
      'Dock-door portal scanning for automated GRN',
      'Load verification before truck departure',
      'Parcel sortation accuracy at hub conveyor',
      'Cross-dock operation management in real time',
    ],
    features: [
      'Live shipment visibility from dock to delivery',
      'Automated load plan vs actual load comparison',
      'Driver mobile app for RFID proof-of-delivery',
      'SLA breach prediction and escalation alerts',
      'Customer-facing shipment tracking web portal',
    ],
  },
  {
    id: 'asset',
    title: 'Asset Management',
    platform: 'BRFID AssetIQ',
    desc: 'IT asset tagging, furniture inventory, tool crib management, field equipment dispatch, and GPS-stamped compliance audits.',
    color: '#AB3480',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
    useCases: [
      'IT asset tagging and lifecycle tracking',
      'Furniture and fixtures inventory for office audits',
      'Tool crib check-out and return management',
      'Field equipment dispatch and location tracking',
      'Compliance audit with GPS-stamped RFID verification',
    ],
    features: [
      'Live asset register with location and custodian data',
      'Ghost asset identification and write-off workflow',
      'Tool crib kiosk for self-service check-out/return',
      'Depreciation sync with fixed asset accounting',
      'Audit report generation for finance and compliance',
    ],
  },
  {
    id: 'food',
    title: 'Food Industry',
    platform: 'BRFID FoodSafe',
    desc: 'Lot level RFID tagging, warehouse picking, cold chain pallet tracking, and traceability from processor to shelf.',
    color: '#C9CD2C',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
        <path d="M7 2v20"/>
        <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
      </svg>
    ),
    useCases: [
      'Lot-level RFID tagging at food processor',
      'Cold-chain pallet tracking with temperature sensor',
      'FEFO warehouse picking for expiry compliance',
      'Retail shelf scanning for freshness management',
      'Batch recall execution within minutes',
    ],
    features: [
      'FSMA 204 key data element capture at each step',
      'Real-time temperature breach alerts via SMS/email',
      'FEFO enforced at picking — staff directed to oldest lot',
      'Retail shelf-life dashboard with expiry countdown',
      'Recall portal quarantines affected lots in one click',
    ],
  },
  {
    id: 'dairy',
    title: 'Dairy',
    platform: 'BRFID DairyTrack',
    desc: 'Product level tagging at processing plant, short shelf life dispatch, cold chain monitoring, and traceability compliance.',
    color: '#34ACE0',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z"/>
      </svg>
    ),
    useCases: [
      'Product-level RFID tagging at processing plant',
      'Short shelf-life FEFO dispatch from cold store',
      'Cold-chain temperature monitoring from plant to retail',
      'Retail shelf freshness scanning and markdown alerts',
      'Consumer origin scan for milk provenance',
    ],
    features: [
      'FEFO dispatch enforced at cold store with RFID',
      'Temperature alert within 60 seconds of breach',
      'Retail shelf-life dashboard by product category',
      'Automated FSSAI compliance and audit reports',
      'QR scan for farm-to-shelf traceability story',
    ],
  },
  {
    id: 'retail',
    title: 'Retail & Shopping',
    platform: 'BRFID RetailIQ',
    desc: 'Source tagged RFID from supplier, automated cycle counts, smart fitting rooms, EAS loss prevention, and planogram compliance monitoring.',
    color: '#AB3480',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" fill="currentColor" stroke="none"/>
        <circle cx="20" cy="21" r="1" fill="currentColor" stroke="none"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
    ),
    useCases: [
      'Source-tagged RFID from supplier for item tracking',
      'Automated inventory cycle counts with handhelds',
      'Exit portal loss prevention with EAS integration',
      'Smart fitting room for enhanced shopper experience',
      'Planogram compliance monitoring at shelf level',
    ],
    features: [
      'Real-time store inventory dashboard by category',
      'Self-checkout RFID basket read in under 3 seconds',
      'Staff handheld app for cycle count and pick tasks',
      'Exit portal integration with EAS security system',
      'Omnichannel stock accuracy for online fulfilment',
    ],
  },
  {
    id: 'ticketing',
    title: 'Ticketing & Venue',
    platform: 'BRFID VenueIQ',
    desc: 'RFID wristband issuance, rapid gate entry, cashless payments, VIP access control, and real-time crowd density monitoring.',
    color: '#C9CD2C',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1.5a2.5 2.5 0 0 0 0 5V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2.5a2.5 2.5 0 0 0 0-5V7z"/>
        <line x1="9" y1="5" x2="9" y2="19" strokeDasharray="2 3"/>
      </svg>
    ),
    useCases: [
      'RFID-encrypted wristband issuance at registration',
      'Rapid gate entry scanning at 30+ entries per minute',
      'Cashless payment via RFID wristband wallet',
      'VIP and backstage access zone control',
      'Real-time zone occupancy and crowd monitoring',
    ],
    features: [
      'Rolling cryptographic codes prevent counterfeiting',
      'Cashless wallet top-up via app or kiosk',
      'Zone access control with anti-passback enforcement',
      'Live crowd density heat map for safety management',
      'Post-event spend, dwell, and flow analytics reports',
    ],
  },
]

const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
)
const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
)

const CheckIcon = ({ color }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const DotIcon = ({ color }) => (
  <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 7, display: 'inline-block' }} />
)

export default function Verticals() {
  const [current, setCurrent] = useState(0)
  const [animDir, setAnimDir] = useState('next')
  const [detailKey, setDetailKey] = useState(0)
  const total = verticals.length

  const goTo = (to, dir) => {
    setAnimDir(dir)
    setCurrent(to)
    setDetailKey(k => k + 1)
  }
  const goNext = () => goTo((current + 1) % total, 'next')
  const goPrev = () => goTo((current - 1 + total) % total, 'prev')
  const goDot  = (i) => { if (i !== current) goTo(i, i > current ? 'next' : 'prev') }

  const indices = [
    (current - 1 + total) % total,
    current,
    (current + 1) % total,
  ]

  const activeV = verticals[current]

  return (
    <section className={styles.section} id="verticals">
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <span className={styles.tag}>INDUSTRIES WE SERVE</span>
          <h2 className={styles.heading}>
            Precision across <em className={styles.accent}>every</em> vertical.
          </h2>
          <p className={styles.subheading}>
            Seamlessly integrating RFID intelligence into the world's most demanding industries backed by 50+ years of labelling and packaging expertise.
          </p>
        </div>

        {/* 3-card slider */}
        <div className={styles.sliderWrap}>
          <button className={styles.navBtn} onClick={goPrev} aria-label="Previous vertical">
            <ChevronLeft />
          </button>

          <div className={styles.cardsTrack} key={current} data-dir={animDir}>
            {indices.map((idx, pos) => {
              const v = verticals[idx]
              const isActive = pos === 1
              return (
                <div
                  key={idx}
                  className={`${styles.card} ${isActive ? styles.cardActive : styles.cardSide}`}
                  style={{ '--clr': v.color }}
                  onClick={!isActive ? () => goTo(idx, pos === 0 ? 'prev' : 'next') : undefined}
                >
                  <div className={styles.cardIcon}>{v.icon}</div>
                  <div className={styles.cardCounter}>
                    <span className={styles.cardNum}>{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{v.title}</h3>
                  <p className={styles.cardDesc}>{v.desc}</p>
                  {isActive && (
                    <div className={styles.cardProgress}>
                      <span className={styles.cardProgressLabel}>
                        {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <button className={styles.navBtn} onClick={goNext} aria-label="Next vertical">
            <ChevronRight />
          </button>
        </div>

        {/* Dot navigation */}
        <div className={styles.dots} role="tablist" aria-label="Industry verticals">
          {verticals.map((item, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={item.title}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              onClick={() => goDot(i)}
              style={i === current ? { '--clr': activeV.color } : {}}
            />
          ))}
        </div>

        {/* Detail panel */}
        <div key={detailKey} className={styles.detail} style={{ '--clr': activeV.color }}>
          <div className={styles.detailHeader}>
            <span className={styles.detailPlatform}>{activeV.platform}</span>
            <h3 className={styles.detailTitle}>{activeV.title}</h3>
          </div>

          <div className={styles.detailBody}>
            {/* Use Cases */}
            <div className={styles.detailCol}>
              <h4 className={styles.detailColHead}>Use Cases</h4>
              <ul className={styles.detailList}>
                {activeV.useCases.map((uc, i) => (
                  <li key={i} className={styles.detailItem} style={{ '--i': i }}>
                    <DotIcon color={activeV.color} />
                    <span>{uc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div className={styles.detailCol}>
              <h4 className={styles.detailColHead}>Platform Features</h4>
              <ul className={styles.detailList}>
                {activeV.features.map((f, i) => (
                  <li key={i} className={styles.detailItem} style={{ '--i': i }}>
                    <CheckIcon color={activeV.color} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
