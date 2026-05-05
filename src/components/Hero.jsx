import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

/* ─── CONFIG ─── */
const H = 5   // 500vh — ~2-3 scrolls per stage
const N = 5   // stages: 0=intro, 1-4=flow steps

/* ─── FLOW STAGES ─── */
const STAGES = [
  {
    id: 'tag', step: '01', tag: 'RFID Tags & Labels', color: '#34ACE0',
    heading: 'Every Item Gets', accent: 'a Smart Identity.',
    desc: 'Britannia supplies the full tag portfolio, Swing Tags for item-level tracking, Variable Data Stickers for order logistics, Woven Labels sewn directly into garments, Care Labels with embedded tracking, and EAS + RFID Dual Tags combining security and smart retail in one.',
    stat: { val: '5+', key: 'Tag Types Available' },
  },
  {
    id: 'hardware', step: '02', tag: 'RFID Hardware', color: '#AB3480',
    heading: 'The Right Reader', accent: 'Every Touchpoint',
    desc: 'Deploy purpose built hardware across your operation UHF Channel Door portals for hands free gate scanning, High Speed Tunnel Machines for bulk throughput, handheld Bluetooth Inventory Scanners, RFID Card Readers at returns desks, and Android Dual-Screen Cash Registers for seamless checkout.',
    stat: { val: '1,000+', key: 'Tags Read per Second' },
  },
  {
    id: 'software', step: '03', tag: 'Solutions & Platform', color: '#C9CD2C',
    heading: 'Integrate Once.', accent: 'Scale Without Limits.',
    desc: 'The Britannia RFID solutions platform provides comprehensive APIs for seamless reader connectivity and device management. Built with scalability and flexibility in mind, the platform supports growing data volumes, evolving workflows, and diverse deployment needs across industries such as Textile, Retail, Logistics, Healthcare, Agriculture, and Food.',
    stat: { val: '9+', key: 'Industry Platforms' },
  },
  {
    id: 'ai', step: '04', tag: 'Actionable Intelligence', color: '#34ACE0',
    heading: 'AI Analytics &', accent: 'Intelligence.',
    desc: 'AI turns raw tag events into actionable intelligence live inventory accuracy dashboards, shrinkage and loss prevention alerts, replenishment queue automation, and compliance audit reports. Machine learning at 99.9% read accuracy converts real time visibility into measurable cost savings.',
    stat: { val: '30%', key: 'Average Inventory Cost Reduction' },
  },
]

/* ─── ORBIT NODES — inner ring (CW, 24s) ─── */
const orbitItems = [
  {
    angle: 0, radius: 165, dur: 24, label: 'Tag & Encode', clr: '#34ACE0',
    // Price tag — universally recognised "label/tag" icon
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none"/></svg>,
  },
  {
    angle: 72, radius: 165, dur: 24, label: 'RF Capture', clr: '#AB3480',
    // Wifi / radio waves — standard signal / RF icon
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor" stroke="none"/></svg>,
  },
  {
    angle: 144, radius: 165, dur: 24, label: 'Edge Filter', clr: '#C9CD2C',
    // CPU chip — clean minimal version, reads instantly at small size
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></svg>,
  },
  {
    angle: 216, radius: 165, dur: 24, label: 'Cloud Sync', clr: '#34ACE0',
    // Cloud upload — standard cloud platform icon
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>,
  },
  {
    angle: 288, radius: 165, dur: 24, label: 'Analytics', clr: '#AB3480',
    // Bar chart 2 — clean ascending bars, standard analytics icon
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  },
]

/* ─── ORBIT NODES — outer ring (CCW, 36s, offset 30°) — Industry Verticals ─── */
const orbitItems2 = [
  {
    angle: 30, radius: 275, dur: 36, label: 'Garments', clr: '#34ACE0',
    // Scissors — universally linked to textile / garment industry
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>,
  },
  {
    angle: 90, radius: 275, dur: 36, label: 'Healthcare', clr: '#AB3480',
    // Heart pulse — clinical/medical standard icon
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  },
  {
    angle: 150, radius: 275, dur: 36, label: 'Logistics', clr: '#C9CD2C',
    // Truck — universal delivery/logistics icon
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  },
  {
    angle: 210, radius: 275, dur: 36, label: 'Retail', clr: '#34ACE0',
    // Shopping cart — universal retail/commerce icon
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  },
  {
    angle: 270, radius: 275, dur: 36, label: 'Agriculture', clr: '#AB3480',
    // Leaf — clean single-path leaf, standard agriculture/nature icon
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
  },
  {
    angle: 330, radius: 275, dur: 36, label: 'Asset Mgmt', clr: '#C9CD2C',
    // Package (3-D box) — standard asset/inventory management icon
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  },
]

/* ─── PURE HELPERS ─── */
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))
const lerp  = (a, b, t)   => a + (b - a) * t

/* ─── ORBIT NODE inner (CW) ─── */
function OrbitNode({ item }) {
  return (
    <div
      className={styles.arm}
      style={{ '--start': `${item.angle}deg`, '--radius': `${item.radius}px`, '--dur': `${item.dur}s` }}
    >
      <div
        className={styles.node}
        style={{ '--start': `${item.angle}deg`, '--dur': `${item.dur}s`, '--clr': item.clr }}
      >
        <div className={styles.nodeIcon} style={{ '--clr': item.clr }}>{item.icon}</div>
        <span className={styles.nodeLabel}>{item.label}</span>
      </div>
    </div>
  )
}

/* ─── ORBIT NODE outer (CCW, circular style) ─── */
function OrbitNode2({ item }) {
  return (
    <div
      className={styles.arm2}
      style={{ '--start': `${item.angle}deg`, '--radius': `${item.radius}px`, '--dur': `${item.dur}s` }}
    >
      <div
        className={styles.node2}
        style={{ '--start': `${item.angle}deg`, '--dur': `${item.dur}s`, '--clr': item.clr }}
      >
        <div className={styles.nodeIcon2} style={{ '--clr': item.clr }}>{item.icon}</div>
        <span className={styles.nodeLabel}>{item.label}</span>
      </div>
    </div>
  )
}

/* ─── SET helpers — write to DOM directly, skip React ─── */
const s = (el, prop, val) => { if (el) el.style[prop] = val }
const t = (el, val)       => { if (el) el.style.transform = val }
const o = (el, val)       => { if (el) el.style.opacity   = val }

/* ═══════════════════════════════════════════════
   MAIN HERO — zero useState, all DOM-direct
════════════════════════════════════════════════ */
export default function Hero() {
  const heroRef = useRef(null)
  const rafRef  = useRef(null)

  /* scroll progress: target = raw, current = smoothed */
  const targetP  = useRef(0)
  const currentP = useRef(0)

  /* refs for every animated DOM element */
  const elIntroBg   = useRef(null)
  const elDotGrid   = useRef(null)
  const elIntroGlow = useRef(null)
  const elOrbital   = useRef(null)
  const elIntro     = useRef(null)
  const elFooter    = useRef(null)
  const elFStep     = useRef(null)
  const elFName     = useRef(null)

  const glowEls = useRef([])   // per-stage color glow
  const numEls  = useRef([])   // per-stage big number
  const stepEls = useRef([])   // per-stage text block

  /* ── Animation loop: reads scroll → lerps → writes DOM ── */
  useEffect(() => {
    /* read raw scroll progress */
    function readScroll() {
      if (!heroRef.current) return
      const { top, height } = heroRef.current.getBoundingClientRect()
      const scrollable = height - window.innerHeight
      if (scrollable > 0) targetP.current = clamp(-top / scrollable, 0, 1)
    }

    /* write all DOM transforms/opacities for given progress p */
    function update(p) {

      /* ── INTRO (stage 0) ─────────────────────────── */
      const f0 = clamp(p * N, 0, 1)

      // Intro: hold at full scale, then zoom out on exit
      // Scroll UP back to intro: zooms back IN from 0.55 → 1.0 (symmetric reverse)
      const zoomT      = clamp((f0 - 0.28) / 0.72, 0, 1)
      const introScale = lerp(1, 0.55, zoomT)
      const introOp    = f0 > 0.62 ? clamp(1 - (f0 - 0.62) / 0.38, 0, 1) : 1
      const orbScale   = lerp(1, 0.50, zoomT)
      const orbOp      = f0 > 0.66 ? clamp(1 - (f0 - 0.66) / 0.34, 0, 1) : 1

      // Light intro bg fades exactly as stage-1 glow fades in — no dark flash
      const firstRaw  = p * N - 1
      const introBgOp = clamp(1 - (firstRaw + 0.15) / 0.30, 0, 1)

      o(elIntroBg.current,   introBgOp)
      o(elDotGrid.current,   introBgOp)
      o(elIntroGlow.current, introBgOp)

      o(elOrbital.current, orbOp)
      t(elOrbital.current, `translateX(-50%) scale(${orbScale})`)

      o(elIntro.current, introOp)
      t(elIntro.current, `scale(${introScale})`)
      s(elIntro.current, 'pointerEvents', introOp > 0.15 ? 'auto' : 'none')

      /* ── FLOW STAGES (1-5) ────────────────────────── */
      STAGES.forEach((stage, idx) => {
        const i      = idx + 1
        const raw    = p * N - i   // 0 at stage start, 1 at stage end
        const isLast = idx === STAGES.length - 1

        // Layer 1 — glow: slightly wider window than text so color is always present
        // Last stage: hold at full on scroll-down, entry still fades in on scroll-up
        let glowOp
        if (raw < -0.10) glowOp = 0
        else if (raw < 0.10) glowOp = (raw + 0.10) / 0.20
        else if (!isLast && raw > 0.88) glowOp = (1.10 - raw) / 0.22
        else glowOp = 1
        glowOp = clamp(glowOp, 0, 1)
        o(glowEls.current[idx], glowOp)
        t(glowEls.current[idx], `translate(-50%, -50%)`)

        // Layer 2 — big number: symmetric zoom, same distance both ends
        // Last stage: no exit fade/zoom — holds at full when scrolling past it
        const numEntry = clamp(raw / 0.18, 0, 1)
        const numExit  = isLast ? 0 : clamp((raw - 0.75) / 0.25, 0, 1)
        let numOp
        if (raw < 0.00) numOp = 0
        else if (raw < 0.18) numOp = raw / 0.18
        else if (!isLast && raw > 0.75) numOp = (1.0 - raw) / 0.25
        else numOp = 1
        numOp = clamp(numOp, 0, 1)
        const numScale = numExit > 0 ? lerp(1.0, 0.76, numExit) : lerp(0.76, 1.0, numEntry)
        o(numEls.current[idx], numOp * 0.06)
        t(numEls.current[idx], `translate(-50%, -50%) scale(${numScale})`)

        // Layer 3 — text: FULLY SYMMETRIC zoom for all stages except last
        // Last stage: entry zooms IN normally (0.52→1.0), then HOLDS — no exit zoom/fade
        // Scroll UP from end → entry reverses naturally (1.0→0.52 as raw drops below 0.20)
        const entryT = clamp(raw / 0.20, 0, 1)
        const exitT  = isLast ? 0 : clamp((raw - 0.72) / 0.28, 0, 1)
        let textOp
        if (raw < 0.00) textOp = 0
        else if (raw < 0.20) textOp = raw / 0.20
        else if (!isLast && raw > 0.72) textOp = (1.0 - raw) / 0.28
        else textOp = 1
        textOp = clamp(textOp, 0, 1)
        const scale = exitT > 0
          ? lerp(1.0, 0.52, exitT)
          : lerp(0.52, 1.0, entryT)
        o(stepEls.current[idx], textOp)
        t(stepEls.current[idx], `translate(-50%, -50%) scale(${scale})`)
      })

      /* ── FOOTER LABEL ──────────────────────────────── */
      const activeStage = clamp(Math.floor(p * N), 0, N - 1)
      if (elFooter.current) {
        if (activeStage > 0) {
          const stage        = STAGES[activeStage - 1]
          const frac         = clamp(p * N - activeStage, 0, 1)
          const isLastStage  = activeStage === N - 1
          const footerOp     = frac < 0.12 ? frac / 0.12 : (!isLastStage && frac > 0.88) ? (1 - frac) / 0.12 : 1
          o(elFooter.current, footerOp)
          s(elFooter.current, 'display', 'flex')
          if (elFStep.current) elFStep.current.textContent = stage.step
          if (elFName.current) elFName.current.textContent = stage.tag
        } else {
          s(elFooter.current, 'display', 'none')
        }
      }
    }

    /* rAF loop: lerp currentP toward targetP for buttery smoothing */
    function loop() {
      readScroll()
      // 0.072 ≈ GSAP scrub:1.5 feel — chases scroll with just enough lag
      currentP.current = lerp(currentP.current, targetP.current, 0.072)
      update(currentP.current)
      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  /* ══════════════════════════════════════════
     JSX — 100 % static, zero progress values
     All motion driven by the rAF loop above
  ══════════════════════════════════════════ */
  return (
    <section ref={heroRef} className={styles.hero} style={{ height: `${H * 100}vh` }}>
      <div className={styles.stickyFrame}>

        {/* ── FLOW STAGES: 3-layer parallax ── */}
        {STAGES.map((stage, idx) => (
          <div key={stage.id}>

            {/* Layer 1 — color glow (slowest) */}
            <div
              ref={el => { glowEls.current[idx] = el }}
              className={styles.flowGlow}
              style={{
                opacity: 0,
                background: `radial-gradient(ellipse 90% 80% at 50% 50%,
                  ${stage.color}22 0%, ${stage.color}08 50%, transparent 75%)`,
              }}
            />

            {/* Layer 2 — big step number (medium) */}
            <div
              ref={el => { numEls.current[idx] = el }}
              className={styles.flowBigNum}
              style={{ opacity: 0, color: stage.color }}
            >
              {stage.step}
            </div>

            {/* Layer 3 — text content (fastest) */}
            <div
              ref={el => { stepEls.current[idx] = el }}
              className={styles.flowStep}
              style={{ opacity: 0, '--accent': stage.color }}
            >
              <div className={styles.stepMarker}>
                <span className={styles.stepNum} style={{ color: stage.color }}>{stage.step}</span>
                <span className={styles.stepTag} style={{ color: stage.color }}>{stage.tag}</span>
              </div>
              <h2 className={styles.flowHeading}>
                {stage.heading} <em style={{ color: stage.color }}>{stage.accent}</em>
              </h2>
              <p className={styles.flowDesc}>{stage.desc}</p>
              <div className={styles.flowStat}>
                <span className={styles.flowStatVal} style={{ color: stage.color }}>
                  {stage.stat.val}
                </span>
                <span className={styles.flowStatKey}>{stage.stat.key}</span>
              </div>
            </div>

          </div>
        ))}

        {/* ── INTRO BACKGROUNDS ── */}
        <div ref={elIntroBg}   className={styles.introBg} />
        <div ref={elDotGrid}   className={styles.dotGrid} />
        <div ref={elIntroGlow} className={styles.introGlow} />

        {/* ── ORBITAL ── */}
        <div ref={elOrbital} className={styles.orbital}>
          <div className={styles.orbitalContent}>
            <div className={styles.glowPulse} />
            <div className={styles.glowPulse2} />
            {/* inner track */}
            <div className={styles.track} style={{ '--r': '165px' }} />
            {/* outer track */}
            <div className={styles.trackOuter} style={{ '--r': '275px' }} />
            {/* inner ring — CW */}
            {orbitItems.map(item => <OrbitNode key={item.label} item={item} />)}
            {/* outer ring — CCW */}
            {orbitItems2.map(item => <OrbitNode2 key={item.label} item={item} />)}
          </div>
          {/* logo card is outside orbitalContent so CSS scale() never shrinks it */}
          <div className={styles.logoCenter}>
            <img src="/logo.png" alt="Britannia RFID" className={styles.logoCenterImg} />
          </div>
        </div>

        {/* ── INTRO CONTENT ── */}
        <div
          ref={elIntro}
          className={styles.introOuter}
          style={{ transformOrigin: 'center center' }}
        >
          <div className={styles.introInner}>
            <span className={styles.badge}>Complete RFID Solutions Platform</span>
            <h1 className={styles.introHeading}>
              AI-Powered RFID<br />
              <span className={styles.accent}>From Tag to Intelligence</span>
            </h1>
            <p className={styles.introDesc}>
              Britannia delivers a complete AI-driven RFID ecosystem smart tags
              and labels, purpose-built hardware, and cloud-connected platforms
              across garments, healthcare, retail, logistics, food, and more.
              End-to-end item level visibility at 99.9% read accuracy, from
              source encoding to enterprise analytics.
            </p>
          </div>
        </div>

        {/* ── STAGE FOOTER ── */}
        <div
          ref={elFooter}
          className={styles.stageFooter}
          style={{ display: 'none', opacity: 0 }}
        >
          <span ref={elFStep} className={styles.stageFooterStep} />
          <span className={styles.stageFooterTotal}>04</span>
          <span ref={elFName} className={styles.stageFooterName} />
        </div>

      </div>
    </section>
  )
}
