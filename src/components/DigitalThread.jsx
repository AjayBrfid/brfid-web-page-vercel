import { useState, useEffect, useRef, useCallback } from "react";

const steps = [
  {
    side: "left",
    title: "Tagging / Encoding",
    desc: "Physical identity injection at source. Our high-speed encoding systems ensure every asset starts its journey with a unique, undeniable digital identity.",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop&q=80",
  },
  {
    side: "right",
    title: "Warehouse / Inventory",
    desc: "Automated bulk scan reconciliation. Instantly audit entire pallets or storage zones without line-of-sight, reducing inventory time by up to 90%.",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&q=80",
  },
  {
    side: "left",
    title: "Live Tracking",
    desc: "Precise identification and monitoring. Real-time visibility into the movement of goods across borders, ensuring security and ETD precision.",
    img: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&h=400&fit=crop&q=80",
  },
  {
    side: "right",
    title: "Distribution Centers",
    desc: "High-speed dynamic sorting logic. Intelligent gates automatically sort and direct assets to their next destination based on real-time demand signals.",
    img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&h=400&fit=crop&q=80",
  },
  {
    side: "left",
    title: "Retail Visibility",
    desc: "Frictionless stock visibility. Maintain 100% inventory accuracy on the sales floor, enabling omnichannel fulfillment and superior customer experiences.",
    img: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=600&h=400&fit=crop&q=80",
  },
  {
    side: "right",
    title: "Customer Insights",
    desc: "Converting journeys into intelligence. Leverage discrete data to understand product velocity, consumer behavior, and supply chain efficiency.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=80",
  },
];

const NEON = "#C9CD2C";
const NEON_GLOW = "rgba(201,205,44,0.55)";
const INACTIVE_DOT_BG = "#34ACE0";
const DOT_RING = "rgba(52,172,224,0.28)";

export default function DigitalThread() {
  const timelineRef = useRef(null);
  const dotRefs = useRef([]);
  const [lineHeight, setLineHeight] = useState(0);
  const [activeSteps, setActiveSteps] = useState(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const [totalLineHeight, setTotalLineHeight] = useState(0);
  const inactiveLine = "#1e293b";
  const headingColor = "#f1f5f9";
  const subtitleColor = "#94a3b8";
  const bgColor = "#0d1526";

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const measureLine = useCallback(() => {
    if (!timelineRef.current || dotRefs.current.length === 0) return;
    const first = dotRefs.current[0];
    const last = dotRefs.current[dotRefs.current.length - 1];
    if (first && last) {
      const tRect = timelineRef.current.getBoundingClientRect();
      const lastRect = last.getBoundingClientRect();
      setTotalLineHeight(lastRect.top + lastRect.height / 2 - tRect.top);
    }
  }, []);

  useEffect(() => {
    measureLine();
    window.addEventListener("resize", measureLine);
    return () => window.removeEventListener("resize", measureLine);
  }, [measureLine]);

  const handleScroll = useCallback(() => {
    if (!timelineRef.current || dotRefs.current.length === 0) return;
    const tRect = timelineRef.current.getBoundingClientRect();
    const triggerY = window.innerHeight * 0.6;

    const passedDots = [];
    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      const r = dot.getBoundingClientRect();
      if (r.top + r.height / 2 <= triggerY) passedDots.push(i);
    });

    let computedHeight = 0;
    const highest = passedDots.length > 0 ? Math.max(...passedDots) : -1;

    if (highest >= 0 && dotRefs.current[highest]) {
      const dotRect = dotRefs.current[highest].getBoundingClientRect();
      const dotCenterFromTop = dotRect.top + dotRect.height / 2 - tRect.top;

      if (highest === steps.length - 1) {
        const overshoot = triggerY - (dotRect.top + dotRect.height / 2);
        const remaining = tRect.height - dotCenterFromTop;
        const ratio = Math.min(Math.max(overshoot / 200, 0), 1);
        computedHeight = dotCenterFromTop + ratio * remaining;
      } else {
        const nextDot = dotRefs.current[highest + 1];
        if (nextDot) {
          const nextRect = nextDot.getBoundingClientRect();
          const nextCenter = nextRect.top + nextRect.height / 2;
          const gap = nextCenter - (dotRect.top + dotRect.height / 2);
          const progress = Math.min(Math.max((triggerY - (dotRect.top + dotRect.height / 2)) / gap, 0), 0.85);
          computedHeight = dotCenterFromTop + progress * gap;
        } else {
          computedHeight = dotCenterFromTop;
        }
      }
    } else {
      const first = dotRefs.current[0];
      if (first) {
        const r = first.getBoundingClientRect();
        const dist = triggerY - (r.top + r.height / 2);
        if (dist > -300 && dist < 0) {
          const firstCenter = r.top + r.height / 2 - tRect.top;
          computedHeight = Math.max(0, ((dist + 300) / 300) * firstCenter);
        }
      }
    }

    setLineHeight(computedHeight);

    const newActive = new Set();
    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      const r = dot.getBoundingClientRect();
      const dotCenterInTimeline = r.top + r.height / 2 - tRect.top;
      if (computedHeight >= dotCenterInTimeline) {
        newActive.add(i);
      }
    });
    setActiveSteps(newActive);

    measureLine();
  }, [measureLine, totalLineHeight]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    setTimeout(handleScroll, 150);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const lineLeft = isMobile ? 24 : "50%";
  const lineTransform = isMobile ? "none" : "translateX(-50%)";

  return (
    <div style={{ background: bgColor, fontFamily: "'Inter', system-ui, -apple-system, sans-serif", transition: "background 0.3s ease" }}>
      <section style={{ padding: isMobile ? "2rem 1rem" : window.innerWidth <= 1024 ? "3rem 1.5rem" : "3rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ display: "inline-block", fontSize: "0.68rem", fontWeight: 700, color: subtitleColor, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>
              SYSTEM LIFECYCLE
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: headingColor, margin: 0, transition: "color 0.3s ease" }}>
              The Digital Thread
            </h2>
          </div>

          <div ref={timelineRef} style={{ position: "relative" }}>
            <div style={{
              position: "absolute", left: lineLeft, top: 0, bottom: 0,
              width: 2, background: inactiveLine, transform: lineTransform, zIndex: 0,
              transition: "background 0.3s ease",
            }} />
            <div style={{
              position: "absolute", left: lineLeft, top: 0,
              width: 3, height: lineHeight,
              background: NEON,
              transform: lineTransform, zIndex: 1,
              borderRadius: "0 0 4px 4px",
              transition: "none",
              boxShadow: `0 0 16px ${NEON_GLOW}, 0 0 6px ${NEON_GLOW}`,
            }} />

            {steps.map((s, i) => (
              <Row key={i} step={s} index={i} isActive={activeSteps.has(i)} isMobile={isMobile}
                dotRef={el => (dotRefs.current[i] = el)} />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes neonPulse {
          0%,100% { box-shadow: 0 0 0 4px rgba(201,205,44,0.2), 0 0 14px rgba(201,205,44,0.4), 0 0 30px rgba(201,205,44,0.15); }
          50% { box-shadow: 0 0 0 6px rgba(201,205,44,0.3), 0 0 22px rgba(201,205,44,0.55), 0 0 44px rgba(201,205,44,0.25); }
        }
        @keyframes dotPop {
          0% { transform: scale(1); }
          40% { transform: scale(1.5); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        @keyframes imgReveal { from{opacity:0;transform:scale(0.93) translateY(18px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes fadeSlideLeft { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeSlideRight { from{opacity:0;transform:translateX(28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}

function Row({ step, index, isActive, isMobile, dotRef }) {
  const isLeft = step.side === "left";
  const [wasActive, setWasActive] = useState(false);
  const [justActivated, setJustActivated] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const titleColor  = "#f1f5f9";
  const descColor   = "#94a3b8";
  const borderColor = "#1e293b";
  const imgPlaceholder = "#1e293b";

  useEffect(() => {
    if (isActive && !wasActive) {
      setJustActivated(true);
      setAnimKey(k => k + 1);
      const t = setTimeout(() => setJustActivated(false), 500);
      setWasActive(true);
      return () => clearTimeout(t);
    }
    if (!isActive && wasActive) {
      setWasActive(false);
      setJustActivated(false);
    }
  }, [isActive, wasActive]);

  const dotStyle = {
    width: 16, height: 16, borderRadius: "50%",
    background: isActive ? "#ffffff" : INACTIVE_DOT_BG,
    border: isActive ? `3px solid ${NEON}` : "3px solid #fff",
    boxShadow: isActive ? undefined : `0 0 0 3px ${DOT_RING}`,
    animation: isActive
      ? `neonPulse 2s ease-in-out infinite${justActivated ? ", dotPop 0.5s ease-out" : ""}`
      : "none",
    transition: "background 0.35s ease, border-color 0.35s ease",
    zIndex: 2, position: "relative", flexShrink: 0,
  };

  const textAnim = isActive
    ? `${isMobile ? "fadeUp" : isLeft ? "fadeSlideLeft" : "fadeSlideRight"} 0.55s ease-out both`
    : "none";
  const imgAnim = isActive ? "imgReveal 0.65s ease-out 0.1s both" : "none";

  const textBlock = (
    <div
      key={`text-${animKey}`}
      style={{
        opacity: isActive ? 1 : 0,
        animation: textAnim,
        transition: isActive ? "none" : "opacity 0.35s ease",
        textAlign: isMobile ? "left" : isLeft ? "right" : "left",
        padding: isMobile ? "0 0 0 1rem" : isLeft ? "1.5rem 2.5rem 1.5rem 1rem" : "1.5rem 1rem 1.5rem 2.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: titleColor, margin: "0 0 8px", transition: "color 0.3s ease" }}>{step.title}</h3>
      <p style={{
        fontSize: "0.84rem", color: descColor, lineHeight: 1.7, margin: 0, maxWidth: 380,
        marginLeft: !isMobile && isLeft ? "auto" : 0,
        transition: "color 0.3s ease",
      }}>{step.desc}</p>
    </div>
  );

  const imgBlock = (
    <div
      key={`img-${animKey}`}
      style={{
        opacity: isActive ? 1 : 0,
        animation: imgAnim,
        transition: isActive ? "none" : "opacity 0.35s ease",
        padding: isMobile ? "0.5rem 0 0 1rem" : "0.5rem",
      }}
    >
      <div style={{
        width: "100%", height: isMobile ? 160 : 220, borderRadius: 14,
        overflow: "hidden", border: `1px solid ${borderColor}`,
        boxShadow: isActive
          ? "0 4px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(201,205,44,0.1)"
          : "0 4px 20px rgba(0,0,0,0.08)",
        background: imgPlaceholder, position: "relative",
        transition: "border-color 0.3s ease, background 0.3s ease",
      }}>
        <img src={step.img} alt={step.title} loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "48px 1fr", gridTemplateRows: "auto auto", marginBottom: "2.5rem", position: "relative" }}>
        <div style={{ gridColumn: 1, gridRow: "1 / 3", display: "flex", alignItems: "flex-start", paddingLeft: 16, paddingTop: 4, zIndex: 2 }}>
          <div ref={dotRef} style={dotStyle} />
        </div>
        <div style={{ gridColumn: 2, gridRow: 1 }}>{textBlock}</div>
        <div style={{ gridColumn: 2, gridRow: 2, marginBottom: 4 }}>{imgBlock}</div>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 1fr", alignItems: "center", marginBottom: "3.5rem", position: "relative" }}>
      {isLeft ? (
        <>
          {textBlock}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2 }}>
            <div ref={dotRef} style={dotStyle} />
          </div>
          {imgBlock}
        </>
      ) : (
        <>
          {imgBlock}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2 }}>
            <div ref={dotRef} style={dotStyle} />
          </div>
          {textBlock}
        </>
      )}
    </div>
  );
}
