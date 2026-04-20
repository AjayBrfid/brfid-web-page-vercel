import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Solutions.module.css'

/* ── Icons ─────────────────────────────────────────────── */
const ICONS = {
  textile: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
    </svg>
  ),
  medical: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ),
  agriculture: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12M12 12C12 7 7 3 2 3c0 5 4 9 9 9M12 12c0-5 5-9 10-9-1 5-5 9-10 9"/>
    </svg>
  ),
  logistics: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
  asset: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
    </svg>
  ),
  food: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l19-9-9 19-2-8-8-2z"/>
    </svg>
  ),
  dairy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>
    </svg>
  ),
  retail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  ),
  ticketing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9a3 3 0 010-6h20a3 3 0 010 6v6a3 3 0 010 6H2a3 3 0 010-6V9z"/><line x1="9" y1="3" x2="9" y2="21"/>
    </svg>
  ),
}

/* ── Verticals data ─────────────────────────────────────── */
const VERTICALS = [
  {
    id: 'textile',
    label: 'Textile and Garments',
    color: '#34ACE0',
    platform: 'BRFID Textile Manager',
    tagline: 'End-to-end item-level visibility from factory floor to retail shelf.',
    challenge: 'Manual stocktakes consume days, undetected shrinkage erodes margins, and omnichannel fulfilment collapses without a real-time single source of inventory truth.',
    useCases: [
      'Item-level source tagging at point of manufacture',
      'Automated warehouse receiving via fixed RFID portals',
      'Store-level cycle counts completed in hours, not days',
      'EAS-integrated loss prevention at exit points',
      'Omnichannel BOPIS fulfilment with live stock confirmation',
    ],
    features: [
      { label: 'Live SKU inventory dashboard', desc: 'Real-time visibility across all warehouse and store locations' },
      { label: 'Handheld scanning app', desc: 'iOS and Android for in-aisle cycle counts and receiving' },
      { label: 'ERP and WMS integration', desc: 'Native connectors for SAP, Oracle, and Microsoft Dynamics' },
      { label: 'EAS deactivation at POS', desc: 'Simultaneous payment processing and tag deactivation' },
      { label: 'Replenishment notifications', desc: 'Auto-trigger restocking when SKU falls below threshold' },
    ],
    outcomes: [
      { metric: '99.9%', label: 'Inventory accuracy' },
      { metric: '75%', label: 'Faster cycle counts' },
      { metric: '<0.5%', label: 'Shrinkage rate' },
    ],
  },
  {
    id: 'medical',
    label: 'Medical and Healthcare',
    color: '#AB3480',
    platform: 'BRFID MedTrack',
    tagline: 'Surgical-grade asset tracking that puts patient safety first.',
    challenge: 'Missing surgical instruments delay procedures, untracked equipment drives unnecessary replacement spend, and manual sterilization logs create compliance gaps that regulators flag.',
    useCases: [
      'Autoclave-safe RFID tagging for surgical instrument sets',
      'Patient wristband scanning for positive ID at every touchpoint',
      'Blood bag tracking from donation to transfusion',
      'Real-time location of mobile medical equipment across the facility',
      'Automated sterilization cycle verification and digital logging',
    ],
    features: [
      { label: 'Instrument count verification', desc: 'Pre and post-procedure count with zero manual tallying' },
      { label: 'Equipment location map', desc: 'Live floor plan showing every tagged asset in the facility' },
      { label: 'Blood bag traceability', desc: 'Full chain-of-custody from blood bank to bedside' },
      { label: 'Sterilization cycle logging', desc: 'Tamper-proof digital record per CSSD batch' },
      { label: 'Patient wristband scanning', desc: 'Positive patient identification at medication and procedure points' },
    ],
    outcomes: [
      { metric: '0', label: 'Miscount incidents' },
      { metric: '40%', label: 'Less search time' },
      { metric: '100%', label: 'Sterilization traceability' },
    ],
  },
  {
    id: 'agriculture',
    label: 'Agriculture',
    color: '#C9CD2C',
    platform: 'BRFID AgroTrack',
    tagline: 'Farm-to-fork traceability and precision livestock management.',
    challenge: 'Paper-based harvest lot records fail regulatory audits, livestock movement goes unrecorded until disease spreads, and cold-chain breaks trigger costly recalls with no actionable trail.',
    useCases: [
      'RFID ear-tag based livestock identification and movement logging',
      'Harvest lot traceability tied to field, date, and operator',
      'Cold-chain temperature monitoring from packhouse to distributor',
      'Farm equipment location audit and utilisation tracking',
      'Automated regulatory compliance report generation',
    ],
    features: [
      { label: 'Offline-capable mobile app', desc: 'Stores data without connectivity and syncs instantly on reconnect' },
      { label: 'Herd health history', desc: 'Individual animal records including vaccinations, weight, and movements' },
      { label: 'Lot lineage traceability', desc: 'One-click drill-down from retail shelf to field and picker' },
      { label: 'Cold-chain temperature alerts', desc: 'SMS and push notification within 90 seconds of a breach' },
      { label: 'Compliance report generator', desc: 'Auto-exports audit-ready documents for food-safety bodies' },
    ],
    outcomes: [
      { metric: '100%', label: 'Herd visibility' },
      { metric: 'Full', label: 'Farm-to-fork trace' },
      { metric: 'Auto', label: 'Compliance reports' },
    ],
  },
  {
    id: 'logistics',
    label: 'Transport and Logistics',
    color: '#34ACE0',
    platform: 'BRFID LogiTrack',
    tagline: 'Gate-to-gate shipment visibility that eliminates dock bottlenecks.',
    challenge: 'Manual load verification causes mis-picks, dock throughput is throttled by paper-based check-ins, and SLA breaches are discovered after the fact rather than prevented in advance.',
    useCases: [
      'Pallet-level RFID tagging at point of palletisation',
      'Dock-door portal scanning for instant inbound and outbound confirmation',
      'Load plan versus actual comparison before truck seal',
      'Parcel-level sortation in high throughput distribution centres',
      'Cross-dock operations with zero manual scan intervention',
    ],
    features: [
      { label: 'Live shipment visibility', desc: 'Real-time status of every pallet from dispatch to delivery' },
      { label: 'Load plan comparison', desc: 'Instant alert when actual load deviates from the manifest' },
      { label: 'Driver mobile app', desc: 'POD capture, route deviation alerts, and e-signature' },
      { label: 'SLA breach prediction', desc: 'AI-flagged shipments at risk before the delivery window closes' },
      { label: 'Customer tracking portal', desc: 'White-labelled self-service shipment visibility for end clients' },
    ],
    outcomes: [
      { metric: '99.8%', label: 'Load accuracy' },
      { metric: '60%', label: 'Faster dock processing' },
      { metric: 'Proactive', label: 'SLA management' },
    ],
  },
  {
    id: 'asset',
    label: 'Asset Management',
    color: '#AB3480',
    platform: 'BRFID AssetIQ',
    tagline: 'Eliminate ghost assets and compress audit cycles from weeks to hours.',
    challenge: 'Ghost assets inflate depreciation schedules, tool losses drain replacement budgets, and compliance audits stretch over weeks of manual spreadsheet reconciliation.',
    useCases: [
      'IT asset tagging for laptops, monitors, and networking hardware',
      'Furniture and fixtures inventory across multi-site organisations',
      'Tool crib management with check-in and check-out accountability',
      'Field equipment dispatch tracking and return verification',
      'GPS-stamped compliance audits for insurance and ISO certification',
    ],
    features: [
      { label: 'Live asset register', desc: 'Single source of truth updated in real time across all sites' },
      { label: 'Ghost asset identification', desc: 'Flags assets on the books that are absent from physical scan' },
      { label: 'Tool crib kiosk', desc: 'Self-service RFID check-in and check-out with no supervisor required' },
      { label: 'Depreciation sync', desc: 'Push verified asset data directly to your ERP fixed-asset module' },
      { label: 'Audit report generation', desc: 'One-click export of audit-ready register with location timestamps' },
    ],
    outcomes: [
      { metric: '0', label: 'Ghost assets' },
      { metric: '80%', label: 'Faster audits' },
      { metric: '100%', label: 'Chain of custody' },
    ],
  },
  {
    id: 'food',
    label: 'Food Industry',
    color: '#C9CD2C',
    platform: 'BRFID FoodSafe',
    tagline: 'FSMA 204-ready traceability from processor to retail shelf.',
    challenge: 'Manual lot records fail FSMA 204 KDE requirements, cold-chain breaches go undetected until product is compromised, and recall execution takes days of backward paper-tracing.',
    useCases: [
      'Lot-level RFID tagging at point of processing or packing',
      'Warehouse picking guided by FEFO to minimise waste',
      'Cold-chain pallet monitoring from chiller to delivery dock',
      'Processor-to-shelf traceability for fresh and ambient SKUs',
      'Instant batch recall execution with precise lot-level targeting',
    ],
    features: [
      { label: 'FSMA 204 KDE capture', desc: 'All required key data elements recorded automatically at each CTE' },
      { label: 'Temperature breach alerts', desc: 'Push notification within 60 seconds of any cold-chain deviation' },
      { label: 'FEFO warehouse picking', desc: 'System-directed pick-path enforces First-Expired-First-Out' },
      { label: 'Retail shelf-life dashboard', desc: 'Live view of remaining shelf life per SKU per location' },
      { label: 'Batch recall execution', desc: 'Identify, quarantine, and notify on affected lots in minutes' },
    ],
    outcomes: [
      { metric: 'FSMA', label: '204 compliant' },
      { metric: '<60s', label: 'Breach alerts' },
      { metric: 'Hours', label: 'Not days for recalls' },
    ],
  },
  {
    id: 'dairy',
    label: 'Dairy',
    color: '#34ACE0',
    platform: 'BRFID DairyTrack',
    tagline: 'FEFO dispatch and cold-chain integrity for ultra-short shelf-life SKUs.',
    challenge: 'FIFO dispatching of short shelf-life dairy products causes downstream waste, cold-chain breaks go undetected until spoilage is visible, and FSSAI traceability records remain paper-based.',
    useCases: [
      'Product-level RFID tagging at the processing plant',
      'FEFO-enforced dispatch for short shelf-life SKUs',
      'Cold-chain temperature monitoring across the distribution network',
      'Retail shelf freshness monitoring with early-warning alerts',
      'Consumer-facing QR scan for origin and batch traceability',
    ],
    features: [
      { label: 'FEFO dispatch enforcement', desc: 'System blocks out-of-sequence loads so FEFO is always enforced' },
      { label: '60-second temperature alerts', desc: 'Breach detected and notified before the next ambient scan cycle' },
      { label: 'Retail shelf-life dashboard', desc: 'Distributor and retailer visibility of remaining shelf life per pallet' },
      { label: 'FSSAI compliance records', desc: 'Automated digital records aligned with FSSAI traceability requirements' },
      { label: 'Consumer QR traceability', desc: 'Scan-to-origin showing farm, processing plant, batch, and date' },
    ],
    outcomes: [
      { metric: '0', label: 'FEFO violations' },
      { metric: '60s', label: 'Cold-chain alerts' },
      { metric: 'End-to-end', label: 'Traceability' },
    ],
  },
  {
    id: 'retail',
    label: 'Retail and Shopping',
    color: '#AB3480',
    platform: 'BRFID RetailIQ',
    tagline: 'Supplier to shelf inventory accuracy that drives sales, not stockouts.',
    challenge: 'Inaccurate on-floor stock drives stockouts on high velocity lines, shoplifting erodes net margin, and long checkout queues reduce conversion in high traffic stores.',
    useCases: [
      'Source-tagged RFID from supplier with no in-store tagging labour',
      'Automated store-level cycle counts without closing the floor',
      'Smart fitting rooms with item-level interaction logging',
      'EAS exit portal for loss prevention integrated with POS',
      'Planogram compliance verification via handheld scan',
    ],
    features: [
      { label: 'Real-time inventory dashboard', desc: 'Per-SKU, per-location stock truth updated every scan cycle' },
      { label: 'Self-checkout under 3 seconds', desc: 'Basket-read RFID checkout with no barcode scanning required' },
      { label: 'Staff handheld app', desc: 'Floor replenishment, click-and-collect pick, and cycle count' },
      { label: 'EAS exit portal integration', desc: 'RFID reads and deactivates simultaneously at point of payment' },
      { label: 'Omnichannel stock accuracy', desc: 'Unified inventory shared across in-store, online, and BOPIS channels' },
    ],
    outcomes: [
      { metric: '98%+', label: 'Inventory accuracy' },
      { metric: '<3s', label: 'Self-checkout' },
      { metric: 'Measurable', label: 'Shrinkage reduction' },
    ],
  },
  {
    id: 'ticketing',
    label: 'Ticketing and Venue',
    color: '#C9CD2C',
    platform: 'BRFID VenueIQ',
    tagline: 'Frictionless entry, cashless concessions, and real-time crowd intelligence.',
    challenge: 'Gate queues frustrate attendees and delay show starts, cash handling slows concessions and creates shrinkage, and operators lack real-time density data for safety decisions.',
    useCases: [
      'RFID wristband issuance and personalisation at registration',
      'Rapid gate entry processing at 30 or more scans per minute per lane',
      'Cashless payment at all food, beverage, and merchandise points',
      'Zone based VIP and backstage access control with anti-passback',
      'Live crowd density monitoring for venue safety management',
    ],
    features: [
      { label: 'Rolling cryptographic codes', desc: 'Anti-cloning wristband security where each read rotates the credential' },
      { label: 'Cashless wallet', desc: 'Pre-loaded or top-up funds linked to wristband with instant reconciliation' },
      { label: 'Zone access with anti-passback', desc: 'Prevents credential sharing and tracks per-zone occupancy' },
      { label: 'Live crowd density heat map', desc: 'Real-time floor-plan overlay for operations and security teams' },
      { label: 'Post-event analytics', desc: 'Dwell time, peak flow, spend-per-head, and re-entry reports' },
    ],
    outcomes: [
      { metric: '30+', label: 'Entries per minute' },
      { metric: '100%', label: 'Cashless operations' },
      { metric: 'Real-time', label: 'Safety intelligence' },
    ],
  },
]

const SLIDE_COUNT = 3
const DWELL = 0.35         // inter-slide dwell: scroll fraction between peels (feels snappy)
const END_DWELL = 0.9      // extra dwell after last peel so Proven Outcomes stays visible
const STEP = 1 + DWELL    // 1.35 total scroll units per transition

/* ── Slide sub-components ───────────────────────────────── */

/* Slide 1: header → challenge → use cases, distributed to fill card */
function SlideOverview({ v }) {
  return (
    <div className={styles.slideContent}>
      {/* Section 1: identity */}
      <div className={styles.overviewHeader}>
        <div className={styles.overviewBadge}>
          <span className={styles.overviewIcon} style={{ background: `${v.color}22`, color: v.color }}>
            {ICONS[v.id]}
          </span>
          <span className={styles.overviewMeta}>
            <span className={styles.platformName} style={{ color: v.color }}>{v.platform}</span>
            <h2 className={styles.industryTitle}>{v.label}</h2>
          </span>
        </div>
        <p className={styles.tagline}>{v.tagline}</p>
      </div>

      {/* Section 2: challenge */}
      <div className={styles.challengeSection}>
        <span className={styles.sectionLabel}>The Challenge</span>
        <p className={styles.challenge} style={{ borderLeftColor: v.color }}>{v.challenge}</p>
      </div>

      {/* Section 3: use cases */}
      <div className={styles.useCasesSection}>
        <span className={styles.sectionLabel}>Use Cases</span>
        <ul className={styles.useCases}>
          {v.useCases.map((uc, i) => (
            <li key={i} className={styles.useCaseItem}>
              <span className={styles.dot} style={{ background: v.color }} />
              {uc}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* Slide 2: features in a 2-column card grid */
function SlideFeatures({ v }) {
  return (
    <div className={styles.slideContent}>
      <div className={styles.slideCrumb}>
        <span className={styles.sectionLabel}>Platform Features</span>
        <span className={styles.crumbIndustry} style={{ color: v.color }}>{v.platform}</span>
      </div>
      <ul className={styles.featuresList}>
        {v.features.map((f, i) => (
          <li key={i} className={styles.featureItem}>
            <span className={styles.featureDot} style={{ background: v.color }} />
            <span>
              <span className={styles.featureLabel}>{f.label}</span>
              <span className={styles.featureDesc}>{f.desc}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* Slide 3: outcome metrics + CTA */
function SlideOutcomes({ v, navigate }) {
  return (
    <div className={`${styles.slideContent} ${styles.slideContentSpaced}`}>
      <div className={styles.slideCrumb}>
        <span className={styles.sectionLabel}>Proven Outcomes</span>
        <span className={styles.crumbIndustry} style={{ color: v.color }}>{v.label}</span>
      </div>
      <div className={styles.outcomes}>
        {v.outcomes.map((o, i) => (
          <div key={i} className={styles.outcomeCard} style={{ borderTopColor: v.color }}>
            <span className={styles.outcomeMetric} style={{ color: v.color }}>{o.metric}</span>
            <span className={styles.outcomeLabel}>{o.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.outcomeSummary}>
        <p className={styles.summaryText}>{v.tagline}</p>
        <div className={styles.summaryFeatures}>
          {v.features.slice(0, 3).map((f, i) => (
            <div key={i} className={styles.summaryFeatureRow}>
              <span className={styles.featureDot} style={{ background: v.color, flexShrink: 0 }} />
              <span className={styles.summaryFeatureLabel}>{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.ctaBlock}>
        <p className={styles.outcomeSub}>Ready to achieve these results in your operations?</p>
        <div className={styles.ctaRow}>
          <button className={styles.ctaPrimary} style={{ background: v.color }} onClick={() => navigate('/contact')}>
            Contact
          </button>
        </div>
      </div>
    </div>
  )
}

const SLIDE_COMPONENTS = [SlideOverview, SlideFeatures, SlideOutcomes]

/* ── Main component ─────────────────────────────────────── */
export default function Solutions() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef(null)
  const slidesRef = useRef([])
  const slideIdxRef = useRef(0)
  const isResetting = useRef(false)
  const resetTimer = useRef(null)
  const vhRef = useRef(window.innerHeight - 72)
  const rafRef = useRef(null)
  const navigate = useNavigate()
  const v = VERTICALS[active]

  useEffect(() => {
    const onResize = () => { vhRef.current = window.innerHeight - 72 }

    const compute = () => {
      rafRef.current = null
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const scrolledIn = Math.max(0, 72 - rect.top)
      const normalized = scrolledIn / vhRef.current

      slidesRef.current.forEach((el, i) => {
        if (!el) return
        if (i === SLIDE_COUNT - 1) { el.style.transform = 'translateY(0%)'; return }
        const peelStart = i * STEP
        const peelEnd = peelStart + 1
        let ty
        if (normalized <= peelStart) ty = 0
        else if (normalized < peelEnd) ty = -(normalized - peelStart) * 100
        else ty = -100
        el.style.transform = `translateY(${ty}%)`
      })

      let newIdx = 0
      for (let j = 0; j < SLIDE_COUNT - 1; j++) {
        if (normalized >= j * STEP + 1) newIdx = j + 1
      }
      slideIdxRef.current = Math.min(SLIDE_COUNT - 1, newIdx)
    }

    const onScroll = () => {
      if (isResetting.current) return
      if (rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(compute)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  /* Reset all slides to stacked position when industry changes */
  useEffect(() => {
    slideIdxRef.current = 0
    requestAnimationFrame(() => {
      slidesRef.current.forEach(el => {
        if (el) el.style.transform = 'translateY(0%)'
      })
    })
  }, [active])

  const handleIndustryChange = (i) => {
    if (i === active) return
    isResetting.current = true
    if (resetTimer.current) clearTimeout(resetTimer.current)

    setActive(i)

    if (sectionRef.current) {
      const y = sectionRef.current.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top: y, behavior: 'smooth' })
    }

    resetTimer.current = setTimeout(() => {
      isResetting.current = false
    }, 900)
  }

  return (
    <div className={styles.page}>

      {/* Hero */}
      <section className={styles.hero}>
        <span className={styles.heroTag}>RFID Solutions</span>
        <h1 className={styles.heroTitle}>
          The Right Solution for{' '}
          <span className={styles.heroAccent}>Every Industry</span>
        </h1>
        <p className={styles.heroSub}>
          Purpose built RFID platforms. One unified vision complete
          item level visibility across your entire operation.
        </p>
      </section>

      {/* Mobile tab strip */}
      <div className={styles.mobileTabs}>
        {VERTICALS.map((vt, i) => (
          <button
            key={vt.id}
            className={`${styles.mobileTab} ${i === active ? styles.mobileTabActive : ''}`}
            style={i === active ? { background: vt.color, borderColor: vt.color } : {}}
            onClick={() => handleIndustryChange(i)}
          >
            {vt.label}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className={styles.body}>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <p className={styles.sidebarHeading}>Industries</p>
          {VERTICALS.map((vt, i) => (
            <button
              key={vt.id}
              className={`${styles.sideItem} ${i === active ? styles.sideItemActive : ''}`}
              style={i === active ? { borderLeftColor: vt.color, background: `${vt.color}14` } : {}}
              onClick={() => handleIndustryChange(i)}
            >
              <span className={styles.sideIcon} style={i === active ? { background: `${vt.color}22`, color: vt.color } : {}}>
                {ICONS[vt.id]}
              </span>
              <span className={styles.sideLabel} style={i === active ? { color: vt.color } : {}}>
                {vt.label}
              </span>
            </button>
          ))}
        </aside>

        {/* Scroll-driven slide section */}
        <div
          className={styles.scrollSection}
          ref={sectionRef}
          style={{ height: `calc(${SLIDE_COUNT + (SLIDE_COUNT - 2) * DWELL + END_DWELL} * (100vh - 72px))` }}
        >
          <div className={styles.stickyPanel}>
            {/* All slides stacked at position 0 — z-index puts slide 0 on top.
                JS peels each slide upward in turn, revealing the one beneath. */}
            {SLIDE_COMPONENTS.map((SlideComp, i) => (
              <div
                key={`${active}-${i}`}
                ref={el => { slidesRef.current[i] = el }}
                className={styles.slide}
                style={{
                  '--clr': v.color,
                  zIndex: SLIDE_COUNT - i,   // slide 0 highest, last slide lowest
                  transform: 'translateY(0%)',
                }}
              >
                <div className={styles.slideInner}>
                  <SlideComp v={v} navigate={navigate} />
                </div>

                {/* Footer: step dots + counter */}
                <div className={styles.slideFooter}>
                  <div className={styles.stepDots}>
                    {Array.from({ length: SLIDE_COUNT }).map((_, j) => (
                      <span
                        key={j}
                        className={styles.stepDot}
                        style={j === i
                          ? { background: v.color, width: '22px', borderRadius: '4px' }
                          : {}}
                      />
                    ))}
                  </div>
                  <span className={styles.stepCount}>{i + 1} / {SLIDE_COUNT}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom CTA */}
      <section className={styles.bottomCta}>
        <h2 className={styles.bottomCtaTitle}>Ready to transform your operations?</h2>
        <p className={styles.bottomCtaSub}>
          Talk to a solutions specialist and get a deployment plan tailored to your industry.
        </p>
        <button
          className={styles.ctaPrimary}
          style={{ background: '#34ACE0', padding: '0.8rem 2.5rem', fontSize: '0.9rem' }}
          onClick={() => navigate('/contact')}
        >
          Get Started
        </button>
      </section>

    </div>
  )
}
