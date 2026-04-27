import { useState, useEffect } from "react";
import { AtSign, Phone, MapPin, Share2, Send } from "lucide-react";
import contactimg from '../../public/images/img.png'
import { useTheme } from "../context/ThemeContext";

const useWindowWidth = () => {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
};

const Contact = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState(null);

  const width = useWindowWidth();
  const isMobile = width < 768;
  const isTablet = width < 1024;

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const c = {
    bg:         isDark ? "#0a0f1e" : "#ffffff",
    bgCard:     isDark ? "#131d30" : "#ffffff",
    bgInput:    isDark ? "#0d1829" : "#ffffff",
    text1:      isDark ? "#f1f5f9" : "#111",
    text2:      isDark ? "#cbd5e1" : "#333",
    text3:      isDark ? "#94a3b8" : "#555",
    text4:      isDark ? "#64748b" : "#666",
    border:     isDark ? "#1e293b" : "#e2e8f0",
    borderInput: isDark ? "#2d3f5a" : "#e2e6ea",
    formBorder: isDark ? "#1e293b" : "#e8ecf0",
    heroGrad:   isDark
      ? "linear-gradient(135deg, #0a0f1e 0%, #0d1526 50%, #0a0f1e 100%)"
      : "linear-gradient(135deg, #faf5f5 0%, #f5eeef 40%, #eee8e4 70%, #f0eae6 100%)",
    iconBg:     isDark ? "rgba(52, 172, 224, 0.12)" : "#EBF5FF",
    iconBorder: isDark ? "rgba(52, 172, 224, 0.35)" : "#0B73C8",
    iconColor:  "#0B73C8",
    socialBorder: isDark ? "#1e293b" : "#d0d5dc",
    socialColor:  isDark ? "#94a3b8" : "#555",
    mapBg:      isDark ? "#0d1526" : "#f0f2f5",
    mapGrid:    isDark ? "#1e2e46" : "#d8dce0",
    mapRoad:    isDark ? "#253350" : "#cdd1d5",
    mapRoad2:   isDark ? "#1e2a42" : "#d4d8dc",
    mapBldg:    isDark ? "#1a2d48" : "#d8dce0",
    mapGreen:   isDark ? "#1a3028" : "#d4e8d0",
    mapRect:    isDark ? "#0d1526" : "#e8ecf0",
    pinBg:      isDark ? "#131d30" : "#fff",
    pinText1:   isDark ? "#f1f5f9" : "#111",
    pinText2:   isDark ? "#64748b" : "#777",
    mapsLink:   "#0B73C8",
  };

  const socialIcons = [
    { icon: <Share2 size={16} />, label: "Share" },
    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>, label: "Instagram" },
    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>, label: "WhatsApp" },
    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733-16z"/><path d="M4 20l6.768-6.768"/><path d="M20 4l-6.768 6.768"/></svg>, label: "X" },
  ];

  const inputStyle = (field) => ({
    width: "100%",
    padding: "10px 14px",
    border: `1.5px solid ${focused === field ? "#0B73C8" : c.borderInput}`,
    borderRadius: 8,
    fontSize: "0.84375rem",
    fontFamily: "Inter, sans-serif",
    color: c.text2,
    outline: "none",
    transition: "border-color 0.2s, background 0.3s, color 0.3s",
    background: c.bgInput,
    boxSizing: "border-box",
  });

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", background: c.bg, color: c.text1, minHeight: "100vh", overflowX: "hidden", transition: "background 0.3s ease, color 0.3s ease" }}>

      {/* Hero Section */}
      <section style={{
        background: c.heroGrad,
        padding: isMobile ? "100px 20px 90px" : isTablet ? "110px 40px 90px" : "120px 80px 90px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? 40 : 60,
        alignItems: "center",
        maxWidth: 1400,
        margin: "0 auto",
        position: "relative",
        transition: "background 0.3s ease",
      }}>
        <div style={{ flex: 1, paddingTop: 10 }}>
          <h1 style={{ fontSize: "clamp(2rem, 7vw, 4rem)", fontWeight: 800, margin: "0 0 24px", lineHeight: 1.1, color: c.text1 }}>
            Get in <span style={{ color: "#34ACE0" }}>Touch</span>
          </h1>
          <p style={{ fontSize: "clamp(0.9375rem, 2vw, 1.125rem)", lineHeight: 1.8, color: c.text3, margin: 0, maxWidth: 420 }}>
            Ready to explore what&apos;s next?<br />
            Connect with us to discuss your needs or discover new possibilities in technology.
          </p>
        </div>
        <div style={{ flex: isMobile ? "unset" : "0 0 520px", width: isMobile ? "100%" : "auto", position: "relative" }}>
          <div style={{ width: isMobile ? "100%" : 520, height: 340, borderRadius: 18, overflow: "hidden" }}>
            <img src={contactimg} alt="Contact" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 18 }} />
          </div>
          {/* Response Time Card */}
          {!isMobile && (
            <div style={{
              position: "absolute", bottom: -36, left: -24,
              background: c.bgCard, borderRadius: 16, padding: "24px 28px",
              boxShadow: isDark ? "0 8px 30px rgba(0,0,0,0.4)" : "0 8px 30px rgba(0,0,0,0.1)",
              minWidth: 260, transition: "background 0.3s ease",
            }}>
              <p style={{ fontSize: "0.8125rem", fontWeight: 700, letterSpacing: 1.5, color: "#34ACE0", textTransform: "uppercase", margin: "0 0 10px" }}>
                Our Response Time
              </p>
              <p style={{ fontSize: "1rem", color: c.text2, margin: 0, fontWeight: 500, lineHeight: 1.5 }}>
                &quot;Expect a response within<br />2 business days&quot;.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Form + Info */}
      <section style={{
        padding: isMobile ? "60px 20px 60px" : isTablet ? "80px 40px 80px" : "100px 80px 80px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? 48 : 70,
        maxWidth: 1100,
        margin: "0 auto",
        alignItems: isMobile ? "stretch" : "center",
        justifyContent: "center",
      }}>
        {/* Form Card */}
        <div style={{
          flex: isMobile ? "unset" : "0 0 480px",
          width: isMobile ? "100%" : "auto",
          background: c.bgCard,
          borderRadius: 18,
          padding: isMobile ? "32px 20px" : "44px 38px",
          border: `1px solid ${c.formBorder}`,
          boxShadow: isDark ? "0 2px 16px rgba(0,0,0,0.3)" : "0 2px 16px rgba(0,0,0,0.04)",
          boxSizing: "border-box",
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}>
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 18, marginBottom: 28 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: 1.5, color: c.text2, textTransform: "uppercase", display: "block", marginBottom: 10 }}>Full Name</label>
              <input
                type="text"
                placeholder="Jane Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                style={inputStyle("name")}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: 1.5, color: c.text2, textTransform: "uppercase", display: "block", marginBottom: 10 }}>Email Address</label>
              <input
                type="email"
                placeholder="jane@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                style={inputStyle("email")}
              />
            </div>
          </div>
          <div style={{ marginBottom: 32 }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: 1.5, color: c.text2, textTransform: "uppercase", display: "block", marginBottom: 10 }}>Message</label>
            <textarea
              placeholder="Tell us about your project or inquiry..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
              rows={6}
              style={{ ...inputStyle("message"), resize: "vertical", minHeight: 140 }}
            />
          </div>
          <button
            style={{
              background: "#34ACE0", color: "#fff", border: "none", borderRadius: 10,
              padding: "14px 32px", fontSize: "0.9375rem", fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8, transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#2899c7")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#34ACE0")}
          >
            Send Message <Send size={15} />
          </button>
        </div>

        {/* Contact Info */}
        <div style={{ flex: 1 }}>
          {/* Email */}
          <div style={{ display: "flex", gap: 18, marginBottom: 36, alignItems: "flex-start" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: c.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1.5px solid ${c.iconBorder}`, transition: "background 0.3s ease" }}>
              <AtSign size={20} color={c.iconColor} />
            </div>
            <div>
              <h4 style={{ fontSize: "clamp(1rem, 2.5vw, 1.125rem)", fontWeight: 700, margin: "0 0 6px", color: c.text1 }}>Email Us</h4>
              <p style={{ fontSize: "0.9375rem", color: c.text4, margin: 0 }}>info@britanniarfids.com</p>
            </div>
          </div>

          {/* Phone */}
          <div style={{ display: "flex", gap: 18, marginBottom: 36, alignItems: "flex-start" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: c.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1.5px solid ${c.iconBorder}`, transition: "background 0.3s ease" }}>
              <Phone size={20} color={c.iconColor} />
            </div>
            <div>
              <h4 style={{ fontSize: "clamp(1rem, 2.5vw, 1.125rem)", fontWeight: 700, margin: "0 0 6px", color: c.text1 }}>Call Us</h4>
              <p style={{ fontSize: "0.9375rem", color: c.text4, margin: "0 0 3px" }}>India: +91 421 3502996</p>
              <p style={{ fontSize: "0.9375rem", color: c.text4, margin: "0 0 6px" }}>UK: +44 (0)116 281 5300</p>
              <p style={{ fontSize: "0.9375rem", color: c.text4, margin: 0 }}>Mon – Fri, 9am – 6pm IST</p>
            </div>
          </div>

          {/* Visit */}
          <div style={{ display: "flex", gap: 18, marginBottom: 40, alignItems: "flex-start" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: c.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1.5px solid ${c.iconBorder}`, transition: "background 0.3s ease" }}>
              <MapPin size={20} color={c.iconColor} />
            </div>
            <div>
              <h4 style={{ fontSize: "clamp(1rem, 2.5vw, 1.125rem)", fontWeight: 700, margin: "0 0 6px", color: c.text1 }}>Visit Us</h4>
              <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: c.text3, margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.08em" }}>India</p>
              <p style={{ fontSize: "0.9375rem", color: c.text4, margin: "0 0 10px" }}>Ramegoundamplayam, Peruntholuvu,<br />Tirupur – 641665, Tamil Nadu</p>
              <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: c.text3, margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.08em" }}>UK</p>
              <p style={{ fontSize: "0.9375rem", color: c.text4, margin: 0 }}>22b Centurion Way, Meridian Business Park,<br />Leicester, Leicestershire LE19 1WH</p>
            </div>
          </div>

          {/* Connect With Us */}
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: 2, color: c.text3, textTransform: "uppercase", margin: "0 0 16px" }}>Connect With Us</p>
          <div style={{ display: "flex", gap: 14 }}>
            {socialIcons.map((s, i) => (
              <div
                key={i}
                style={{
                  width: 44, height: 44, borderRadius: "50%", border: `1.5px solid ${c.socialBorder}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: c.socialColor, transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#0B73C8"; e.currentTarget.style.color = "#0B73C8"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.socialBorder; e.currentTarget.style.color = c.socialColor; }}
              >
                {s.icon}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section style={{ padding: isMobile ? "20px 20px 60px" : "20px 60px 60px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          borderRadius: 16, border: `1px solid ${c.border}`, overflow: "hidden",
          background: c.mapBg, position: "relative", height: 300,
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}>
          <svg width="100%" height="100%" viewBox="0 0 800 300" preserveAspectRatio="xMidYMid slice">
            <rect width="800" height="300" fill={c.mapBg} />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <line key={`h${i}`} x1="0" y1={i * 40} x2="800" y2={i * 40} stroke={c.mapGrid} strokeWidth="1" />
            ))}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
              <line key={`v${i}`} x1={i * 70} y1="0" x2={i * 70} y2="300" stroke={c.mapGrid} strokeWidth="1" />
            ))}
            <line x1="0" y1="150" x2="800" y2="150" stroke={c.mapRoad} strokeWidth="3" />
            <line x1="400" y1="0" x2="400" y2="300" stroke={c.mapRoad} strokeWidth="3" />
            <line x1="0" y1="80" x2="800" y2="80" stroke={c.mapRoad2} strokeWidth="2" />
            <line x1="250" y1="0" x2="250" y2="300" stroke={c.mapRoad2} strokeWidth="2" />
            <rect x="100" y="100" width="80" height="60" rx="4" fill={c.mapGreen} opacity="0.5" />
            <rect x="500" y="40" width="100" height="50" rx="4" fill={c.mapGreen} opacity="0.5" />
            {[[60, 30, 40, 25], [150, 180, 50, 30], [320, 60, 35, 25], [450, 170, 45, 35], [580, 120, 55, 30], [680, 200, 40, 40]].map(([x, y, w, h], i) => (
              <rect key={i} x={x} y={y} width={w} height={h} rx="3" fill={c.mapBldg} />
            ))}
          </svg>
          {/* Pin Marker */}
          <div style={{
            position: "absolute", top: "50%", left: "42%", transform: "translate(-50%, -100%)",
            display: "flex", alignItems: "center", gap: 8, background: c.pinBg,
            borderRadius: 30, padding: "8px 16px 8px 10px",
            boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.15)",
            transition: "background 0.3s ease",
          }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#0B73C8", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MapPin size={16} color="#fff" />
            </div>
            <div>
              <p style={{ fontSize: "0.8125rem", fontWeight: 700, margin: 0, color: c.pinText1 }}>Britannia RFID</p>
              <p style={{ fontSize: "0.6875rem", color: c.pinText2, margin: 0 }}>Tirupur, Tamil Nadu</p>
            </div>
          </div>
          {/* Shadow under pin */}
          <div style={{
            position: "absolute", top: "52%", left: "42%", transform: "translate(-50%, 0)",
            width: 12, height: 6, borderRadius: "50%", background: "rgba(0,0,0,0.2)",
          }} />
        </div>
        {/* Open in Google Maps */}
        <div style={{ textAlign: "right", marginTop: 12 }}>
          <a
            href="https://maps.app.goo.gl/WN9w4WC2f69uPnkM8"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.75rem", fontWeight: 700, letterSpacing: 1.5, color: "#0B73C8",
              textTransform: "uppercase", textDecoration: "none", display: "inline-flex",
              alignItems: "center", gap: 6,
            }}
          >
            Open in Google Maps
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0B73C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </section>

    </div>
  );
};

export default Contact;
