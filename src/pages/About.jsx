import { useState, useEffect, useRef } from "react";
import { MapPin, Eye, Target, Zap, Shield, Users } from "lucide-react";
import sourceimg from "../../public/images/Source Tagging.png";
import containerimg from "../../public/images/Container.png";
import { useTheme } from "../context/ThemeContext";

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
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

const fadeUp = (visible, delay = 0) => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(36px)",
  transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
});

const fadeLeft = (visible, delay = 0) => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateX(0)" : "translateX(-40px)",
  transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
});

const fadeRight = (visible, delay = 0) => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateX(0)" : "translateX(40px)",
  transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
});

const About = () => {
  const [hoveredValue, setHoveredValue] = useState(null);

  const width = useWindowWidth();
  const isMobile = width < 768;
  const isTablet = width < 1024;

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const c = {
    bg:        isDark ? "#0a0f1e" : "#ffffff",
    bg2:       isDark ? "#0d1526" : "#f7f9fb",
    bgCard:    isDark ? "#131d30" : "#ffffff",
    text1:     isDark ? "#f1f5f9" : "#111",
    text2:     isDark ? "#cbd5e1" : "#444",
    text3:     isDark ? "#94a3b8" : "#555",
    text4:     isDark ? "#64748b" : "#777",
    border:    isDark ? "#1e293b" : "#e2e8f0",
    iconBg:    isDark ? "rgba(52, 172, 224, 0.12)" : "#EBF5FF",
    iconColor: "#0B73C8",
    accent:    "#0B73C8",
    cardHoverBorder: "#0B73C8",
    cardHoverShadow: isDark ? "0 8px 30px rgba(11,115,200,0.2)" : "0 8px 30px rgba(11,115,200,0.12)",
    cardShadow: isDark ? "0 2px 12px rgba(0,0,0,0.3)" : "0 2px 12px rgba(0,0,0,0.04)",
    cardIconBg: (hovered) => hovered
      ? (isDark ? "rgba(52,172,224,0.15)" : "#EBF5FF")
      : (isDark ? "rgba(255,255,255,0.06)" : "#f4f6f8"),
  };

  const [heroRef, heroVisible] = useReveal();
  const [heritageRef, heritageVisible] = useReveal();
  const [quoteRef, quoteVisible] = useReveal();
  const [warehouseRef, warehouseVisible] = useReveal();
  const [missionRef, missionVisible] = useReveal();
  const [valuesRef, valuesVisible] = useReveal();

  const values = [
    {
      icon: Target,
      title: "Precision",
      desc: "Every tag, reader, and platform engineered for 99.9% read accuracy because a single missed scan carries real operational cost.",
    },
    {
      icon: Zap,
      title: "Innovation",
      desc: "Continuously advancing AI analytics, solutions capabilities, and hardware to stay ahead of our clients' most demanding requirements.",
    },
    {
      icon: Shield,
      title: "Reliability",
      desc: "Battle-tested hardware and enterprise-grade solutions that perform at scale from a single site to a global supply chain.",
    },
    {
      icon: Users,
      title: "Partnership",
      desc: "50+ years building long-term relationships with 60+ global brands a trusted extension of our clients' operations teams.",
    },
  ];

  return (
    <div
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        background: c.bg,
        color: c.text1,
        overflowX: "hidden",
        transition: "background 0.3s ease, color 0.3s ease",
      }}
    >
      {/* Hero: About Us */}
      <section
        ref={heroRef}
        style={{
          padding: isMobile
            ? "72px 16px 32px"
            : isTablet
              ? "80px 32px 32px"
              : "80px 48px 32px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 24 : 40,
          alignItems: "center",
        }}
      >
        <div
          style={{
            ...fadeLeft(heroVisible, 0),
            flex: isMobile ? "unset" : "0 0 440px",
            width: isMobile ? "100%" : "auto",
          }}
        >
          <div
            style={{
              width: "100%",
              borderRadius: 30,
              overflow: "hidden",
            }}
          >
            <img
              src={sourceimg}
              alt="Source Tagging"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>
        </div>
        <div style={{ ...fadeRight(heroVisible, 0.15), flex: 1 }}>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 5vw, 2.375rem)",
              fontWeight: 800,
              margin: "0 0 14px",
              color: c.text1,
            }}
          >
            Pioneering RFID Solutions
          </h1>
          <p
            style={{
              fontSize: "0.8125rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              color: c.accent,
              textTransform: "uppercase",
              margin: "0 0 20px",
            }}
          >
            About Britannia RFID
          </p>
          <p
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.75,
              color: c.text2,
              margin: 0,
            }}
          >
            Britannia RFID (BRFID) began as Britannia Garment Packaging in
            Leicester, UK a trusted name in garment labelling and packaging
            for over five decades. Today we deliver a complete AI-powered RFID
            ecosystem across mutiple industry, giving businesses
            real-time item-level visibility from source tag to enterprise
            analytics.
          </p>
        </div>
      </section>

      {/* Section Divider — brand colour bands */}
      <div style={{ margin: "0 48px", display: "flex", height: 4, borderRadius: 2, overflow: "hidden", gap: 3 }}>
        <div style={{ flex: 1, background: "#34ACE0", borderRadius: "2px 0 0 2px" }} />
        <div style={{ flex: 1, background: "#AB3480" }} />
        <div style={{ flex: 1, background: "#C9CD2C", borderRadius: "0 2px 2px 0" }} />
      </div>

      {/* Heritage — UK Design · India Manufacturing */}
      <section
        ref={heritageRef}
        style={{
          padding: isMobile ? "40px 16px" : isTablet ? "52px 32px" : "60px 48px",
          background: c.bg2,
          transition: "background 0.3s ease",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Heading — full width */}
          <div style={{ ...fadeUp(heritageVisible, 0), marginBottom: isMobile ? 28 : 40, textAlign: "center" }}>
            <span
              style={{
                display: "inline-block",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: c.accent,
                background: isDark ? "rgba(11,115,200,0.12)" : "#EBF5FF",
                padding: "0.3rem 0.9rem",
                borderRadius: 100,
                marginBottom: 16,
              }}
            >
              Our Heritage
            </span>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                fontWeight: 800,
                margin: "0 0 14px",
                color: c.text1,
                lineHeight: 1.2,
              }}
            >
              Designed in the UK.{" "}
              <span style={{ color: c.accent }}>Manufactured in India.</span>
            </h2>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.75,
                color: c.text2,
                margin: "0 auto",
                maxWidth: 640,
              }}
            >
              Britannia RFID is built on the foundations of Britannia Garment
              Packaging, with five decades of serving global fashion and retail
              brands from Leicester, UK. That deep industry experience shapes
              every product we design: precision-engineered in the UK,
              cost-efficiently manufactured at scale in India, and deployed
              across the world.
            </p>
          </div>

          {/* Three pillars — horizontal row */}
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? 0 : 0,
            }}
          >
            {[
              {
                accent: "#34ACE0",
                tag: "Retail Expertise",
                title: "50+ Years in Fashion and Retail Supply Chains",
                desc: "From garment labelling programmes for global fashion brands to source-tag compliance across major retail groups, our retail DNA means our RFID solutions speak the language of buyers, merchandisers, and supply chain teams from day one.",
                delay: 0.1,
              },
              {
                accent: "#AB3480",
                tag: "Packaging and Encoding Know-How",
                title: "Inlay-to-Label Integration at Production Scale",
                desc: "Decades of precision label and packaging manufacturing gave us the process mastery to encode, verify, and deliver 500M+ RFID units annually with 99.9% read accuracy, spanning everything from hangtags and woven labels to industrial asset tags.",
                delay: 0.2,
              },
              {
                accent: "#C9CD2C",
                tag: "UK Design · India Scale",
                title: "Global-Standard Engineering, Competitive Cost",
                desc: "Product architecture, RFID antenna design, and platform development are led from the UK. High-volume manufacturing in India delivers the cost efficiency that makes enterprise-grade RFID accessible to mid market businesses worldwide.",
                delay: 0.3,
              },
            ].map((pillar, i, arr) => (
              <div
                key={pillar.tag}
                style={{
                  ...fadeUp(heritageVisible, pillar.delay),
                  flex: 1,
                  padding: isMobile ? "20px 0" : "0 32px",
                  borderTop: isMobile ? `3px solid ${pillar.accent}` : "none",
                  borderLeft: !isMobile ? `3px solid ${pillar.accent}` : "none",
                  borderRight: !isMobile && i < arr.length - 1 ? `1px solid ${c.border}` : "none",
                  borderBottom: isMobile && i < arr.length - 1 ? `1px solid ${c.border}` : "none",
                  paddingTop: isMobile ? 20 : 0,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "0.63rem",
                    fontWeight: 700,
                    letterSpacing: "0.13em",
                    textTransform: "uppercase",
                    color: pillar.accent,
                    marginBottom: 8,
                  }}
                >
                  {pillar.tag}
                </span>
                <h3
                  style={{
                    fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
                    fontWeight: 700,
                    color: c.text1,
                    margin: "0 0 8px",
                    lineHeight: 1.35,
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    lineHeight: 1.72,
                    color: c.text3,
                    margin: 0,
                  }}
                >
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pull Quote */}
      <div
        ref={quoteRef}
        style={{
          ...fadeUp(quoteVisible, 0),
          padding: isMobile ? "36px 20px" : isTablet ? "44px 40px" : "52px 80px",
          textAlign: "center",
          background: c.bg,
          transition: "background 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: 820,
            margin: "0 auto",
            position: "relative",
          }}
        >
          <p
            style={{
              fontSize: "clamp(1.125rem, 3vw, 1.625rem)",
              fontWeight: 600,
              lineHeight: 1.55,
              color: c.text1,
              margin: "0 0 20px",
              letterSpacing: "-0.01em",
            }}
          >
            We don&apos;t just supply RFID tags we build the intelligence
            layer that connects your physical operations to real-time data,
            turning every scanned item into a decision that saves time, cuts
            cost, and drives growth.
          </p>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 32,
                height: 2,
                background: c.accent,
                borderRadius: 2,
              }}
            />
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: c.accent,
                textTransform: "uppercase",
              }}
            >
              Britannia RFID
            </span>
          </div>
        </div>
      </div>

      {/* Automate Warehouse Section */}
      <section
        ref={warehouseRef}
        style={{
          padding: isMobile
            ? "24px 16px"
            : isTablet
              ? "28px 32px"
              : "32px 48px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 20 : 40,
          alignItems: "center",
        }}
      >
        <div
          style={{
            ...fadeLeft(warehouseVisible, 0),
            flex: 1,
            order: isMobile ? 2 : 1,
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
              fontWeight: 800,
              margin: "0 0 14px",
              lineHeight: 1.15,
              color: c.text1,
            }}
          >
            One Ecosystem Every Industry
          </h2>
          <p
            style={{
              fontSize: "0.8125rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              color: c.accent,
              textTransform: "uppercase",
              margin: "0 0 20px",
            }}
          >
            Complete RFID Stack
          </p>
          <p
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.75,
              color: c.text3,
              margin: 0,
            }}
          >
            BRFID delivers a vertically integrated RFID stack precision tags
            and labels, purpose-built readers for every touchpoint, and
            AI-powered solutions platforms for Textile, Retail, Healthcare,
            Logistics, Agriculture, Food, and more. With 500M+ units shipped
            annually across 10+ global locations, we are the single accountable
            partner from source encoding to enterprise intelligence.
          </p>
        </div>
        <div
          style={{
            ...fadeRight(warehouseVisible, 0.15),
            flex: isMobile ? "unset" : "0 0 440px",
            width: isMobile ? "100%" : "auto",
            height: isMobile ? "auto" : 340,
            borderRadius: 20,
            overflow: "hidden",
            order: isMobile ? 1 : 2,
          }}
        >
          <img
            src={containerimg}
            alt="Container"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 20,
            }}
          />
        </div>
      </section>

      {/* Mission & Vision - Blue Section */}
      <section
        style={{
          background: "#3B8DD0",
          padding: isMobile
            ? "32px 16px"
            : isTablet
              ? "40px 32px"
              : "48px 48px",
        }}
      >
        <div
          ref={missionRef}
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 20 : 28,
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              ...fadeUp(missionVisible, 0),
              flex: 1,
              background: c.bgCard,
              borderRadius: 20,
              padding: isMobile ? "24px 20px" : isTablet ? "32px 28px" : "36px 32px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              transition: "background 0.3s ease",
            }}
          >
            <div
              style={{
                width: isMobile ? 40 : 48,
                height: isMobile ? 40 : 48,
                borderRadius: 10,
                background: c.iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 14,
                transition: "background 0.3s ease",
              }}
            >
              <MapPin size={isMobile ? 20 : 24} color={c.iconColor} />
            </div>
            <h3
              style={{
                fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
                fontWeight: 700,
                margin: "0 0 12px",
                color: c.text1,
              }}
            >
              Our Mission
            </h3>
            <p
              style={{
                fontSize: "1.0625rem",
                lineHeight: 1.75,
                color: c.text3,
                margin: 0,
              }}
            >
              To empower businesses with a complete AI-driven RFID ecosystem
              precision tags, purpose-built hardware, and intelligent solutions
              delivering real-time item-level visibility and measurable cost
              savings across every industry we serve.
            </p>
          </div>
          <div
            style={{
              ...fadeUp(missionVisible, 0.15),
              flex: 1,
              background: c.bgCard,
              borderRadius: 20,
              padding: isMobile ? "24px 20px" : isTablet ? "32px 28px" : "36px 32px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              transition: "background 0.3s ease",
            }}
          >
            <div
              style={{
                width: isMobile ? 40 : 48,
                height: isMobile ? 40 : 48,
                borderRadius: 10,
                background: c.iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 14,
                transition: "background 0.3s ease",
              }}
            >
              <Eye size={isMobile ? 20 : 24} color={c.iconColor} />
            </div>
            <h3
              style={{
                fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
                fontWeight: 700,
                margin: "0 0 12px",
                color: c.text1,
              }}
            >
              Our Vision
            </h3>
            <p
              style={{
                fontSize: "1.0625rem",
                lineHeight: 1.75,
                color: c.text3,
                margin: 0,
              }}
            >
              To be the world&apos;s most trusted end-to-end RFID solutions partner
              setting the global standard for intelligent item-level tracking
              from source tag to enterprise insight across every industry we
              serve.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        style={{
          padding: isMobile
            ? "32px 16px"
            : isTablet
              ? "40px 32px"
              : "48px 48px",
          background: c.bg2,
          transition: "background 0.3s ease",
        }}
      >
        <div
          ref={valuesRef}
          style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}
        >
          <h2
            style={{
              ...fadeUp(valuesVisible, 0),
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              fontWeight: 700,
              margin: "0 0 10px",
              color: c.text1,
            }}
          >
            What Drives Everything We Build
          </h2>
          <div
            style={{
              ...fadeUp(valuesVisible, 0.1),
              width: 50,
              height: 4,
              background: c.accent,
              borderRadius: 2,
              margin: "14px auto 28px",
            }}
          />
          <div
            style={{
              display: "flex",
              flexWrap: isTablet ? "wrap" : "nowrap",
              gap: 24,
              justifyContent: "center",
            }}
          >
            {values.map((v, i) => {
              const Icon = v.icon;
              const isHovered = hoveredValue === i;
              return (
                <div
                  key={v.title}
                  onMouseEnter={() => setHoveredValue(i)}
                  onMouseLeave={() => setHoveredValue(null)}
                  style={{
                    ...fadeUp(valuesVisible, 0.15 + i * 0.1),
                    flex: isMobile
                      ? "0 1 100%"
                      : isTablet
                        ? "0 1 calc(50% - 12px)"
                        : "0 1 240px",
                    background: c.bgCard,
                    borderRadius: 16,
                    padding: isMobile ? "24px 18px 20px" : "28px 20px 24px",
                    border: isHovered
                      ? `1.5px solid ${c.cardHoverBorder}`
                      : `1.5px solid ${c.border}`,
                    transition: "all 0.25s ease",
                    transform: valuesVisible
                      ? isHovered
                        ? "translateY(-4px)"
                        : "translateY(0)"
                      : "translateY(36px)",
                    boxShadow: isHovered ? c.cardHoverShadow : c.cardShadow,
                    cursor: "default",
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background: c.cardIconBg(isHovered),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                      transition: "background 0.25s",
                    }}
                  >
                    <Icon
                      size={26}
                      color={isHovered ? c.iconColor : (isDark ? "#64748b" : "#7a8a9e")}
                    />
                  </div>
                  <h4
                    style={{
                      fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
                      fontWeight: 700,
                      margin: "0 0 8px",
                      color: c.text1,
                    }}
                  >
                    {v.title}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      lineHeight: 1.65,
                      color: c.text4,
                      margin: 0,
                    }}
                  >
                    {v.desc}
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

export default About;
