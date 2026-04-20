import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import brfidLogo from "../../public/images/brfid-logo.png";
import styles from "./Navbar.module.css";
import { useTheme } from "../context/ThemeContext";

function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>

        {/* Left — Logo */}
        <Link to="/" className={styles.logo}>
          <img src={brfidLogo} alt="BRFID Logo" className={styles.logoImg} />
        </Link>

        {/* Center — Nav links (absolutely centered, desktop only) */}
        <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setMenuOpen(false);
              }}
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={() => setMenuOpen(false)}
            >
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/solutions"
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={() => setMenuOpen(false)}
            >
              SOLUTIONS
            </NavLink>
          </li>
        </ul>

        {/* Right — Contact us · Dark mode toggle · Hamburger */}
        <div className={styles.rightGroup}>
          <button
            className={styles.contactBtn}
            onClick={() => navigate("/contact")}
          >
            Contact us
          </button>

          <button
            className={styles.themeBtn}
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

      </div>
    </nav>
  );
}
