import { useState, useEffect, useRef } from "react";
import { DollarSign, Layers, MapPin, Shield, Factory, CheckCircle } from "lucide-react";

const useWindowWidth = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
};

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

const fadeUp = (visible, delay = 0) => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(32px)",
  transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
});

const Manufacturing = () => {
  const [hoveredCard, setHoveredCard]       = useState(null);
  const [hoveredStep, setHoveredStep]       = useState(null);
  const [revealedCount, setRevealedCount]   = useState(0);
  const [revealedSegCount, setRevealedSegCount] = useState(0);

  const width     = useWindowWidth();
  const isSmall   = width < 480;   // small phones
  const isMobile  = width < 768;   // all phones
  const isTablet  = width < 1024;  // tablets (vertical layout)
  const isDesktop = width >= 1024; // horizontal pipeline

  const c = {
    bg:           "#0a0f1e",
    bg2:          "#0d1526",
    bgCard:       "#131d30",
    text1:        "#f1f5f9",
    text2:        "#cbd5e1",
    text3:        "#94a3b8",
    border:       "#1e293b",
    accent:       "#34ACE0",
    accentBlue:   "#0B73C8",
    accentPurple: "#AB3480",
    accentYellow: "#C9CD2C",
  };

  const [bannerRef, bannerVisible] = useReveal();
  const [mfgRef,    mfgVisible]    = useReveal();
  const [stackRef,  stackVisible]  = useReveal();
  const [cardsRef,  cardsVisible]  = useReveal();

  const steps = [
    { num: "01", label: "Antenna Mfg.",     color: "#1E8FD0" },
    { num: "02", label: "IC Chip Bonding",  color: "#34ACE0" },
    { num: "03", label: "Tag & Inlay",      color: "#0B73C8" },
    { num: "04", label: "Reader Hardware",  color: "#5B4BA8" },
    { num: "05", label: "Firmware",         color: "#AB3480" },
    { num: "06", label: "Middleware",       color: "#C08828" },
    { num: "07", label: "IoT Platform",     color: "#C9CD2C" },
  ];

  const advantages = [
    {
      icon:        DollarSign,
      stat:        "30 – 50%",
      title:       "Cost Savings",
      desc:        "No import duties or currency risk on every unit we manufacture.",
      accentColor: c.accent,
    },
    {
      icon:        Layers,
      stat:        "1",
      title:       "Single Vendor",
      desc:        "Chip to cloud: hardware, firmware, middleware and IoT platform from one source.",
      accentColor: c.accentBlue,
    },
    {
      icon:        MapPin,
      stat:        "100%",
      title:       "India-Made",
      desc:        "Every component and sub-assembly manufactured domestically on Indian soil.",
      accentColor: c.accentPurple,
    },
    {
      icon:        Shield,
      stat:        "",
      title:       "Secure Supply Chain",
      desc:        "Trusted by Government and Defence for tamper-proof, auditable domestic supply.",
      accentColor: c.accentYellow,
    },
  ];

  /* Interleaved reveal: circle → segment → circle → segment … */
  useEffect(() => {
    if (!stackVisible) return;
    const interval = 280;
    const circleTimers = steps.map((_, i) =>
      setTimeout(() => setRevealedCount((c) => Math.max(c, i + 1)), 150 + i * interval),
    );
    const segTimers = steps.slice(0, -1).map((_, i) =>
      setTimeout(() => setRevealedSegCount((c) => Math.max(c, i + 1)), 260 + i * interval),
    );
    return () => [...circleTimers, ...segTimers].forEach(clearTimeout);
  }, [stackVisible]);

  const allRevealed = revealedCount >= steps.length;

  /* shared padding helper */
  const px = isSmall ? 16 : isMobile ? 20 : isTablet ? 40 : 64;

  return (
    <div
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        background: c.bg,
        color:      c.text1,
        overflowX:  "hidden",
      }}
    >
      <style>{`
        @keyframes rippleRing {
          0%   { transform: scale(1);   opacity: 0.75; }
          100% { transform: scale(2.4); opacity: 0;    }
        }
        @keyframes mobileCircleGlow {
          0%, 100% { box-shadow: 0 0 0   rgba(0,0,0,0); }
          50%       { box-shadow: 0 0 16px var(--step-glow, rgba(52,172,224,0.5)); }
        }
      `}</style>

      {/* ── Banner ── */}
      <section
        ref={bannerRef}
        style={{
          background:    c.bg2,
          paddingTop:    isMobile ? 88 : 108,
          paddingBottom: isMobile ? 40 : 56,
          paddingLeft:   px,
          paddingRight:  px,
          position:      "relative",
          overflow:      "hidden",
          textAlign:     "center",
        }}
      >
        <div
          style={{
            position:      "absolute",
            top: "50%", left: "50%",
            transform:     "translate(-50%,-50%)",
            width: 600, height: 400,
            borderRadius:  "50%",
            background:    "radial-gradient(ellipse,rgba(52,172,224,0.08) 0%,transparent 68%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>
          <h1
            style={{
              ...fadeUp(bannerVisible, 0),
              fontSize:      isSmall
                ? "clamp(1.35rem,7vw,1.65rem)"
                : isMobile
                  ? "clamp(1.55rem,6vw,1.9rem)"
                  : "clamp(1.9rem,3.5vw,2.75rem)",
              fontWeight:    900,
              margin:        "0 0 16px",
              color:         c.text1,
              lineHeight:    1.15,
              letterSpacing: "-0.02em",
            }}
          >
            End-to-End{" "}
            <span style={{ color: c.accent }}>RFID Manufacturing</span>
          </h1>
          <p
            style={{
              ...fadeUp(bannerVisible, 0.18),
              fontSize:   isSmall ? "0.875rem" : isMobile ? "0.9375rem" : "1.0625rem",
              lineHeight: 1.75,
              color:      c.text2,
              margin:     "0 auto",
              maxWidth:   580,
            }}
          >
            Designing, manufacturing and deploying the
            complete RFID stack domestically
          </p>
        </div>
      </section>

      {/* ── Manufacturer Identity Block ── */}
      <section
        ref={mfgRef}
        style={{
          background:   c.bgCard,
          borderTop:    `1px solid ${c.border}`,
          borderBottom: `1px solid ${c.border}`,
          padding:      `${isMobile ? 32 : isTablet ? 44 : 52}px ${px}px`,
        }}
      >
        <div
          style={{
            maxWidth:      1100,
            margin:        "0 auto",
            display:       "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems:    isMobile ? "flex-start" : "center",
            gap:           isMobile ? 20 : 40,
          }}
        >
          {/* Icon + label */}
          <div
            style={{
              ...fadeUp(mfgVisible, 0),
              display:       "flex",
              flexDirection: "column",
              alignItems:    "center",
              gap:           10,
              flexShrink:    0,
              alignSelf:     isMobile ? "center" : "auto",
            }}
          >
            <div
              style={{
                width:          isSmall ? 56 : isMobile ? 64 : 76,
                height:         isSmall ? 56 : isMobile ? 64 : 76,
                borderRadius:   18,
                background:     "rgba(52,172,224,0.12)",
                border:         "1.5px solid rgba(52,172,224,0.25)",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
              }}
            >
              <Factory size={isSmall ? 26 : isMobile ? 30 : 36} color={c.accent} />
            </div>
            <span
              style={{
                fontSize:      "0.6rem",
                fontWeight:    700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color:         c.accent,
                whiteSpace:    "nowrap",
              }}
            >
              RFID Manufacturer
            </span>
          </div>

          {/* Vertical divider — desktop only */}
          {isDesktop && (
            <div style={{ width: 1, height: 88, background: c.border, flexShrink: 0 }} />
          )}

          {/* Statement text */}
          <div style={{ ...fadeUp(mfgVisible, 0.1), flex: 1 }}>
            <p
              style={{
                fontSize:      isSmall ? "0.9375rem" : isMobile ? "1.05rem" : isTablet ? "1.1rem" : "1.2rem",
                fontWeight:    700,
                color:         c.text1,
                lineHeight:    1.55,
                margin:        "0 0 12px",
                letterSpacing: "-0.01em",
              }}
            >
              <span
                style={{
                  color:        c.accent,
                  background:   "rgba(52,172,224,0.10)",
                  borderRadius: 6,
                  padding:      "2px 6px",
                }}
              >
                We are RFID Manufacturers
              </span>{" "}
              designing, fabricating and deploying the complete RFID stack
              end to end, from IC chip to IoT platform.
            </p>
            <p
              style={{
                fontSize:   isSmall ? "0.875rem" : "0.9375rem",
                lineHeight: 1.7,
                color:      c.text3,
                margin:     "0 0 16px",
              }}
            >
              Every component in our stack is designed and produced in-house at
              our Indian manufacturing facility, giving you unmatched quality
              control, supply security, and cost efficiency.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: isSmall ? 8 : 12 }}>
              {[
                "500M+ units / year",
                "7-layer RFID stack",
                "100% India-manufactured",
                "Chip · Tag · Reader · Platform",
              ].map((point) => (
                <div key={point} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <CheckCircle size={13} color={c.accent} />
                  <span style={{ fontSize: isSmall ? "0.75rem" : "0.8125rem", fontWeight: 600, color: c.text2 }}>
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Value Chain Section ── */}
      <section
        ref={stackRef}
        style={{
          background: c.bg,
          padding:    `${isMobile ? 40 : isTablet ? 56 : 68}px ${px}px ${isMobile ? 44 : isTablet ? 60 : 72}px`,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Heading */}
          <div
            style={{
              ...fadeUp(stackVisible, 0),
              textAlign:    "center",
              marginBottom: isTablet ? 40 : 56,
            }}
          >
            <h2
              style={{
                fontSize:   isSmall
                  ? "clamp(1.2rem,5.5vw,1.5rem)"
                  : isMobile
                    ? "clamp(1.35rem,5vw,1.7rem)"
                    : "clamp(1.7rem,3vw,2.25rem)",
                fontWeight: 800,
                margin:     "0 0 10px",
                color:      c.text1,
                lineHeight: 1.2,
              }}
            >
              We Own the Entire RFID Value Chain
            </h2>
            <p style={{ fontSize: isSmall ? "0.875rem" : "1rem", lineHeight: 1.7, color: c.text3, maxWidth: 480, margin: "0 auto" }}>
              From the chip to the cloud, every layer engineered and
              manufactured in-house.
            </p>
          </div>

          {/* ── Vertical timeline: mobile + tablet (< 1024) ── */}
          {!isDesktop ? (
            <div
              style={{
                display:       "flex",
                flexDirection: "column",
                maxWidth:      isTablet && !isMobile ? 560 : "100%",
                margin:        "0 auto",
              }}
            >
              {steps.map((step, i) => {
                const isRev    = i < revealedCount;
                const nodeSize = isMobile ? 44 : 52;
                return (
                  <div key={step.num} style={{ display: "flex", gap: isSmall ? 12 : 16, alignItems: "stretch" }}>
                    {/* Circle + connector */}
                    <div
                      style={{
                        width:         nodeSize,
                        flexShrink:    0,
                        display:       "flex",
                        flexDirection: "column",
                        alignItems:    "center",
                      }}
                    >
                      <div
                        style={{
                          "--step-glow": `${step.color}77`,
                          width:          nodeSize,
                          height:         nodeSize,
                          borderRadius:   "50%",
                          background:     isRev ? `${step.color}22` : "transparent",
                          border:         `2px solid ${isRev ? step.color : "transparent"}`,
                          display:        "flex",
                          alignItems:     "center",
                          justifyContent: "center",
                          flexShrink:     0,
                          opacity:        isRev ? 1 : 0,
                          transform:      isRev ? "scale(1)" : "scale(0.3)",
                          transition:     "all 0.5s cubic-bezier(0.34,1.56,0.64,1)",
                          boxShadow:      isRev ? `0 0 16px ${step.color}55` : "none",
                          animation:      isRev ? `mobileCircleGlow 3s ease-in-out ${i * 0.4}s infinite` : "none",
                        }}
                      >
                        <span style={{ fontSize: isMobile ? "0.62rem" : "0.7rem", fontWeight: 900, color: step.color, letterSpacing: "0.05em" }}>
                          {step.num}
                        </span>
                      </div>
                      {i < steps.length - 1 && (
                        <div
                          style={{
                            width:           2,
                            flex:            1,
                            minHeight:       isMobile ? 24 : 28,
                            background:      `linear-gradient(to bottom,${step.color}88,${steps[i + 1].color}44)`,
                            margin:          "5px 0",
                            transformOrigin: "top center",
                            transform:       isRev ? "scaleY(1)" : "scaleY(0)",
                            transition:      "transform 0.4s ease 0.18s",
                          }}
                        />
                      )}
                    </div>

                    {/* Label */}
                    <div
                      style={{
                        paddingTop:    nodeSize / 2 - 9,
                        paddingBottom: i < steps.length - 1 ? (isMobile ? 20 : 26) : 0,
                        display:       "flex",
                        alignItems:    "center",
                        opacity:       isRev ? 1 : 0,
                        transform:     isRev ? "translateX(0)" : "translateX(-14px)",
                        transition:    "all 0.4s ease 0.14s",
                      }}
                    >
                      <span
                        style={{
                          fontSize:   isSmall ? "0.875rem" : isMobile ? "0.9375rem" : "1rem",
                          fontWeight: 700,
                          color:      step.color,
                        }}
                      >
                        {step.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ── Desktop only: horizontal glowing pipeline ── */
            <div style={{ position: "relative", paddingBottom: 8 }}>

              {/* Segments between circles */}
              {steps.slice(0, -1).map((step, i) => {
                const nodeRadius = 24;
                const isSegRev   = i < revealedSegCount;
                const isAnyHov   = hoveredStep !== null;
                const segLit     = hoveredStep === i || hoveredStep === i + 1;
                return (
                  <div
                    key={`seg-${i}`}
                    style={{
                      position:        "absolute",
                      top:             24,
                      left:            `calc(${(i + 0.5) * 100 / steps.length}% + ${nodeRadius}px)`,
                      width:           `calc(${100 / steps.length}% - ${nodeRadius * 2}px)`,
                      height:          2,
                      background:      `linear-gradient(90deg,${step.color},${steps[i + 1].color})`,
                      transformOrigin: "0% 50%",
                      transform:       isSegRev ? "scaleX(1)" : "scaleX(0)",
                      transition:      "transform 0.2s ease, opacity 0.22s ease",
                      borderRadius:    1,
                      opacity:         isAnyHov ? (segLit ? 1 : 0.12) : 0.8,
                    }}
                  />
                );
              })}

              {/* Node circles */}
              <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
                {steps.map((step, i) => {
                  const isRev    = i < revealedCount;
                  const isHov    = hoveredStep === i;
                  const isAnyHov = hoveredStep !== null;

                  return (
                    <div
                      key={step.num}
                      onMouseEnter={() => setHoveredStep(i)}
                      onMouseLeave={() => setHoveredStep(null)}
                      style={{
                        flex:          1,
                        display:       "flex",
                        flexDirection: "column",
                        alignItems:    "center",
                        gap:           14,
                        cursor:        "pointer",
                        opacity:       isAnyHov && !isHov ? 0.25 : 1,
                        transition:    "opacity 0.22s ease",
                      }}
                    >
                      {/* Node */}
                      <div
                        style={{
                          position:       "relative",
                          width:          48,
                          height:         48,
                          borderRadius:   "50%",
                          background:     isHov ? step.color : `${step.color}20`,
                          border:         `2px solid ${step.color}`,
                          display:        "flex",
                          alignItems:     "center",
                          justifyContent: "center",
                          zIndex:         1,
                          opacity:        isRev ? 1 : 0,
                          transform:      isRev ? (isHov ? "scale(1.38)" : "scale(1)") : "scale(0.25)",
                          transition:     "opacity 0.35s ease, transform 0.45s cubic-bezier(0.34,1.56,0.64,1), background 0.22s, box-shadow 0.22s",
                          boxShadow:      isHov
                            ? `0 0 22px ${step.color}dd,0 0 50px ${step.color}55,inset 0 0 14px ${step.color}44`
                            : `0 2px 14px ${step.color}33`,
                        }}
                      >
                        {isHov && isRev && (
                          <div
                            style={{
                              position:      "absolute",
                              inset:         -9,
                              borderRadius:  "50%",
                              border:        `1.5px solid ${step.color}`,
                              animation:     "rippleRing 1.1s ease-out infinite",
                              pointerEvents: "none",
                            }}
                          />
                        )}
                        <span
                          style={{
                            fontSize:      "0.7rem",
                            fontWeight:    900,
                            color:         isHov ? "#fff" : step.color,
                            letterSpacing: "0.04em",
                            userSelect:    "none",
                            transition:    "color 0.2s",
                          }}
                        >
                          {step.num}
                        </span>
                      </div>

                      {/* Label */}
                      <div
                        style={{
                          opacity:    isRev ? 1 : 0,
                          transform:  isRev ? "translateY(0)" : "translateY(10px)",
                          transition: "opacity 0.35s ease 0.12s, transform 0.35s ease 0.12s",
                          textAlign:  "center",
                          padding:    "0 4px",
                        }}
                      >
                        <span
                          style={{
                            display:    "block",
                            fontSize:   "0.8rem",
                            fontWeight: 700,
                            color:      isHov ? step.color : c.text2,
                            lineHeight: 1.3,
                            transition: "color 0.22s",
                          }}
                        >
                          {step.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ── Why Our Manufacturing Matters ── */}
      <section
        ref={cardsRef}
        style={{
          background: c.bg2,
          padding:    `${isMobile ? 40 : isTablet ? 56 : 68}px ${px}px ${isMobile ? 52 : isTablet ? 64 : 80}px`,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          <div
            style={{
              ...fadeUp(cardsVisible, 0),
              textAlign:    "center",
              marginBottom: isMobile ? 28 : 44,
            }}
          >
            <h2
              style={{
                fontSize:   isSmall
                  ? "clamp(1.2rem,5.5vw,1.5rem)"
                  : isMobile
                    ? "clamp(1.35rem,5vw,1.7rem)"
                    : "clamp(1.7rem,3vw,2.25rem)",
                fontWeight: 800,
                margin:     0,
                color:      c.text1,
              }}
            >
              Why Our Manufacturing Matters
            </h2>
          </div>

          {/* Cards grid */}
          <div
            style={{
              display:        "grid",
              gridTemplateColumns: isSmall
                ? "1fr"
                : isMobile
                  ? "1fr"
                  : isTablet
                    ? "repeat(2,1fr)"
                    : "repeat(4,1fr)",
              gap:            isSmall ? 14 : isMobile ? 16 : 20,
            }}
          >
            {advantages.map((card, i) => {
              const Icon      = card.icon;
              const isHovered = hoveredCard === i;
              return (
                <div
                  key={card.title}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    ...fadeUp(cardsVisible, 0.08 + i * 0.1),
                    background:     c.bgCard,
                    borderRadius:   16,
                    padding:        isSmall ? "24px 16px" : isMobile ? "26px 20px" : "32px 24px",
                    border:         `1.5px solid ${isHovered ? card.accentColor : c.border}`,
                    boxShadow:      isHovered ? `0 8px 32px ${card.accentColor}28` : "0 2px 12px rgba(0,0,0,0.25)",
                    transition:     "all 0.25s ease",
                    transform:      cardsVisible
                      ? isHovered ? "translateY(-5px)" : "translateY(0)"
                      : "translateY(32px)",
                    cursor:         "default",
                    display:        "flex",
                    flexDirection:  "column",
                    alignItems:     "center",
                    textAlign:      "center",
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width:          isSmall ? 48 : 56,
                      height:         isSmall ? 48 : 56,
                      borderRadius:   "50%",
                      background:     `${card.accentColor}1f`,
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "center",
                      marginBottom:   isSmall ? 14 : 18,
                      border:         `1.5px solid ${card.accentColor}44`,
                      boxShadow:      isHovered ? `0 0 18px ${card.accentColor}44` : "none",
                      transition:     "box-shadow 0.25s",
                      flexShrink:     0,
                    }}
                  >
                    <Icon size={isSmall ? 22 : 26} color={card.accentColor} />
                  </div>

                  {/* Stat — fixed height slot so cards without a stat stay aligned */}
                  <div
                    style={{
                      fontSize:      isSmall ? "1.5rem" : "1.85rem",
                      fontWeight:    900,
                      color:         card.accentColor,
                      marginBottom:  6,
                      letterSpacing: "-0.03em",
                      lineHeight:    1,
                      minHeight:     isSmall ? "1.5rem" : "1.85rem",
                    }}
                  >
                    {card.stat || ""}
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize:   isSmall ? "0.9375rem" : "1.0625rem",
                      fontWeight: 700,
                      margin:     "0 0 8px",
                      color:      c.text1,
                    }}
                  >
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize:   isSmall ? "0.875rem" : "0.9375rem",
                      lineHeight: 1.65,
                      color:      c.text3,
                      margin:     0,
                      flex:       1,
                    }}
                  >
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Manufacturing;
