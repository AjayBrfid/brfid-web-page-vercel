import { useState, useEffect, useRef } from 'react'

const DISPLAY_MS = 7000
const COLOR      = '#34ACE0'

let _alreadyShown = false

const ORBIT_A    = [0, 72, 144, 216, 288]
const ORBIT_B    = [36, 108, 180, 252, 324]
const ORB_COLORS = ['#34ACE0', '#AB3480', '#C9CD2C', '#34ACE0', '#AB3480']

const ORBS = [
  { w: 90,  h: 90,  top: '8%',  left: '5%',  dur: 8,  delay: 0,   op: 0.13 },
  { w: 60,  h: 60,  top: '75%', left: '4%',  dur: 11, delay: 2,   op: 0.10 },
  { w: 110, h: 110, top: '18%', left: '88%', dur: 9,  delay: 1,   op: 0.11 },
  { w: 70,  h: 70,  top: '80%', left: '86%', dur: 7,  delay: 3,   op: 0.12 },
  { w: 50,  h: 50,  top: '48%', left: '2%',  dur: 13, delay: 0.5, op: 0.08 },
  { w: 80,  h: 80,  top: '38%', left: '91%', dur: 10, delay: 1.8, op: 0.09 },
]

export default function MilestonePopup() {
  const [open,     setOpen]     = useState(false)
  const [leaving,  setLeaving]  = useState(false)
  const [progress, setProgress] = useState(100)
  const startRef   = useRef(null)
  const rafRef     = useRef(null)
  const leavingRef = useRef(false)

  const cardBg      = '#131d30'
  const headingClr  = '#f1f5f9'
  const bodyClr     = '#94a3b8'
  const dividerClr  = '#1e293b'
  const barBg       = '#1e293b'

  useEffect(() => {
    if (_alreadyShown) return
    const t = setTimeout(() => {
      if (_alreadyShown) return
      _alreadyShown = true
      setOpen(true)
    }, 500)
    return () => clearTimeout(t)
  }, [])

  /* Escape key — industry-standard keyboard dismiss */
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') triggerDismiss() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (!open) return
    leavingRef.current = false
    startRef.current   = performance.now()
    const tick = (now) => {
      if (leavingRef.current) return
      const elapsed = now - startRef.current
      setProgress(Math.max(0, 100 - (elapsed / DISPLAY_MS) * 100))
      if (elapsed >= DISPLAY_MS) { triggerDismiss(); return }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [open])

  const triggerDismiss = () => {
    if (leavingRef.current) return
    leavingRef.current = true
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setLeaving(true)
    setTimeout(() => setOpen(false), 520)
  }

  if (!open) return null

  return (
    <>
      <style>{`
        @keyframes mp-bg-in  { from { opacity:0 } to { opacity:1 } }
        @keyframes mp-bg-out { from { opacity:1 } to { opacity:0 } }

        @keyframes mp-card-in {
          0%   { opacity:0; transform:perspective(900px) rotateX(30deg) translateY(64px) scale(0.80); filter:blur(8px) }
          55%  { opacity:1; transform:perspective(900px) rotateX(-5deg) translateY(-10px) scale(1.03); filter:blur(0) }
          75%  { transform:perspective(900px) rotateX(2deg) translateY(4px) scale(0.985) }
          100% { transform:perspective(900px) rotateX(0) translateY(0) scale(1) }
        }
        @keyframes mp-card-out {
          0%   { opacity:1; transform:scale(1)    translateY(0);    filter:blur(0) }
          100% { opacity:0; transform:scale(0.86) translateY(36px); filter:blur(10px) }
        }

        @keyframes mp-orbit-cw {
          from { transform:rotate(0deg)   translateX(320px) rotate(0deg) }
          to   { transform:rotate(360deg) translateX(320px) rotate(-360deg) }
        }
        @keyframes mp-orbit-ccw {
          from { transform:rotate(0deg)    translateX(420px) rotate(0deg) }
          to   { transform:rotate(-360deg) translateX(420px) rotate(360deg) }
        }

        @keyframes mp-shimmer {
          0%   { transform:translateX(-100%) skewX(-12deg); opacity:0 }
          8%   { opacity:1 }
          92%  { opacity:1 }
          100% { transform:translateX(800%) skewX(-12deg);  opacity:0 }
        }

        @keyframes mp-reveal {
          from { opacity:0; transform:translateY(16px); filter:blur(5px) }
          to   { opacity:1; transform:translateY(0);    filter:blur(0) }
        }

        @keyframes mp-num-in {
          0%   { opacity:0; transform:scale(0.5) translateY(20px); filter:blur(12px) }
          60%  { opacity:1; transform:scale(1.08) translateY(-4px); filter:blur(0) }
          100% { opacity:1; transform:scale(1) translateY(0) }
        }

        @keyframes mp-orb {
          0%,100% { transform:translateY(0)    scale(1) }
          40%     { transform:translateY(-28px) scale(1.1) }
          70%     { transform:translateY(-12px) scale(0.94) }
        }

        @keyframes mp-aurora-1 {
          0%,100% { transform:translate(0,0)       scale(1) }
          50%     { transform:translate(40px,-24px) scale(1.18) }
        }
        @keyframes mp-aurora-2 {
          0%,100% { transform:translate(0,0)        scale(1) }
          50%     { transform:translate(-30px,20px)  scale(1.14) }
        }

        @keyframes mp-ring-a {
          0%,100% { transform:scale(1);    opacity:.22 }
          50%     { transform:scale(1.24); opacity:.07 }
        }
        @keyframes mp-ring-b {
          0%,100% { transform:scale(1);    opacity:.13 }
          50%     { transform:scale(1.42); opacity:.04 }
        }

        @keyframes mp-bar-glow {
          0%,100% { opacity:.45 }
          50%     { opacity:1 }
        }
      `}</style>

      {/* BACKDROP */}
      <div
        onClick={triggerDismiss}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 20,
          background: 'rgba(5,10,24,0.82)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          overflow: 'hidden',
          animation: `${leaving ? 'mp-bg-out' : 'mp-bg-in'} 0.45s ease forwards`,
        }}
      >

        {/* Aurora blobs */}
        <div style={{ position:'absolute', width:520, height:520, top:'8%', left:'12%', borderRadius:'50%', background:`radial-gradient(circle,${COLOR}25 0%,transparent 70%)`, animation:'mp-aurora-1 7s ease-in-out infinite', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', width:420, height:420, bottom:'4%', right:'8%',  borderRadius:'50%', background:'radial-gradient(circle,#AB348025 0%,transparent 70%)', animation:'mp-aurora-2 9s ease-in-out infinite', pointerEvents:'none' }}/>

        {/* Floating orbs */}
        {ORBS.map((o, i) => (
          <div key={i} style={{ position:'absolute', top:o.top, left:o.left, width:o.w, height:o.h, borderRadius:'50%', background:`radial-gradient(circle,${ORB_COLORS[i % ORB_COLORS.length]} 0%,transparent 70%)`, opacity:o.op, animation:`mp-orb ${o.dur}s ease-in-out ${o.delay}s infinite`, pointerEvents:'none' }}/>
        ))}

        {/* Glow + orbit wrapper */}
        <div onClick={e => e.stopPropagation()} style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>

          {/* Ring A — CW, radius 320 */}
          <div style={{ position:'absolute', width:0, height:0, pointerEvents:'none' }}>
            {ORBIT_A.map((_, i) => (
              <div key={i} style={{
                position:'absolute', width:10, height:10, marginLeft:-5, marginTop:-5,
                borderRadius:'50%', background:ORB_COLORS[i],
                boxShadow:`0 0 8px 2px ${ORB_COLORS[i]}`,
                animation:`mp-orbit-cw ${14 + i * 1.5}s linear ${i * -2.8}s infinite`,
                opacity:0.85,
              }}/>
            ))}
          </div>

          {/* Ring B — CCW, radius 420 */}
          <div style={{ position:'absolute', width:0, height:0, pointerEvents:'none' }}>
            {ORBIT_B.map((_, i) => (
              <div key={i} style={{
                position:'absolute', width:7, height:7, marginLeft:-3.5, marginTop:-3.5,
                borderRadius:'50%', background:ORB_COLORS[(i + 2) % 3],
                boxShadow:`0 0 6px 2px ${ORB_COLORS[(i + 2) % 3]}`,
                animation:`mp-orbit-ccw ${18 + i * 1.2}s linear ${i * -3.6}s infinite`,
                opacity:0.6,
              }}/>
            ))}
          </div>

          {/* ══ CARD ══ */}
          <div style={{
            position:'relative', zIndex:1,
            background: cardBg,
            borderRadius:24,
            width:'min(520px, calc(100vw - 46px))',
            overflow:'hidden',
            boxShadow:`0 40px 120px rgba(0,0,0,0.40), 0 0 36px ${COLOR}44`,
            animation:`${leaving ? 'mp-card-out' : 'mp-card-in'} ${leaving ? '0.52s ease' : '0.72s cubic-bezier(0.22,1,0.36,1)'} forwards`,
            transition: 'background 0.3s ease',
          }}>

            {/* Tri-color top band + shimmer */}
            <div style={{ height:6, background:`linear-gradient(90deg,${COLOR},#AB3480,#C9CD2C)`, position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', inset:0, width:'18%', background:'linear-gradient(90deg,transparent,rgba(255,255,255,.7),transparent)', animation:'mp-shimmer 2.4s ease-in-out 1s infinite', pointerEvents:'none' }}/>
            </div>

            {/* Body */}
            <div style={{ padding:'40px 44px 28px', position:'relative' }}>

              {/* Pulsing rings */}
              <div style={{ position:'absolute', top:18, left:18, width:86,  height:86,  borderRadius:'50%', border:`2px solid ${COLOR}`,   animation:'mp-ring-a 2.8s ease-in-out infinite',     pointerEvents:'none' }}/>
              <div style={{ position:'absolute', top:3,  left:3,  width:116, height:116, borderRadius:'50%', border:`1.5px solid ${COLOR}`, animation:'mp-ring-b 3.8s ease-in-out .4s infinite', pointerEvents:'none' }}/>

              {/* Label pill */}
              <div style={{ display:'inline-flex', alignItems:'center', gap:7, background:`${COLOR}18`, border:`1px solid ${COLOR}55`, borderRadius:20, padding:'4px 14px', marginBottom:20, animation:'mp-reveal .38s ease both' }}>
                <div style={{ width:7, height:7, borderRadius:'50%', background:COLOR }}/>
                <span style={{ fontSize:'.6rem', fontWeight:700, letterSpacing:'.2em', color:COLOR, textTransform:'uppercase', fontFamily:'Inter,sans-serif' }}>MILESTONE</span>
              </div>

              {/* Large 50 numeral */}
              <div style={{ display:'flex', alignItems:'flex-end', gap:10, marginBottom:12, animation:'mp-num-in .72s cubic-bezier(0.22,1,0.36,1) .08s both' }}>
                <span style={{ fontSize:'clamp(5rem,15vw,7.5rem)', fontWeight:900, lineHeight:1, letterSpacing:'-0.04em', color:COLOR, fontFamily:'Inter,sans-serif' }}>50</span>
                <div style={{ paddingBottom:'0.75rem' }}>
                  <p style={{ fontSize:'clamp(1.1rem,3vw,1.5rem)', fontWeight:700, color:headingClr, margin:0, fontFamily:'Inter,sans-serif', letterSpacing:'-0.02em', lineHeight:1.15 }}>Years</p>
                </div>
              </div>

              {/* Heading */}
              <div style={{ marginBottom:14, animation:'mp-reveal .42s ease .18s both' }}>
                <h2 style={{ fontSize:'clamp(1.3rem,4vw,1.75rem)', fontWeight:800, margin:'0 0 6px', lineHeight:1.2, color:headingClr, fontFamily:'Inter,sans-serif', letterSpacing:'-.025em' }}>
                  Celebrating Five Decades<br/>of Innovation
                </h2>
                <p style={{ fontSize:'1rem', fontWeight:600, color:COLOR, margin:0, fontFamily:'Inter,sans-serif' }}>in Garment labels & Packaging</p>
              </div>

              {/* Body text */}
              <p style={{ fontSize:'.9375rem', lineHeight:1.74, color:bodyClr, margin:'0 0 28px', fontFamily:'Inter,sans-serif', animation:'mp-reveal .46s ease .26s both' }}>
                From garment labelling in Leicester to a global AI-powered RFID ecosystem five decades of innovation, precision, and trusted partnerships across the world.
              </p>

              <div style={{ height:1, background:dividerClr }}/>
            </div>

            {/* Progress bar */}
            <div style={{ height:5, background:barBg, position:'relative', overflow:'hidden', transition:'background 0.3s ease' }}>
              <div style={{ height:'100%', width:`${progress}%`, background:`linear-gradient(90deg,${COLOR}88,${COLOR})`, position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent)', animation:'mp-shimmer 1.8s ease-in-out infinite' }}/>
                <div style={{ position:'absolute', right:0, top:0, bottom:0, width:20, background:`radial-gradient(ellipse at right,${COLOR},transparent)`, animation:'mp-bar-glow 1s ease-in-out infinite' }}/>
              </div>
            </div>

          </div>{/* /card */}
        </div>{/* /glow wrapper */}
      </div>
    </>
  )
}
