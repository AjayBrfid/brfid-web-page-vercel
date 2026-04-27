import { Link } from 'react-router-dom'
import brfidLogo from '../../public/images/brfid-logo.png'
import styles from './Footer.module.css'

const SOLUTIONS = [
  { id: 'textile',   label: 'Textile & Garments' },
  { id: 'medical',   label: 'Medical & Healthcare' },
  { id: 'agriculture', label: 'Agriculture' },
  { id: 'logistics', label: 'Transport & Logistics' },
  { id: 'asset',     label: 'Asset Management' },
  { id: 'food',      label: 'Food Industry' },
  { id: 'dairy',     label: 'Dairy' },
  { id: 'retail',    label: 'Retail & Shopping' },
  { id: 'ticketing', label: 'Ticketing & Venue' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* Brand */}
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logoWrap}>
            <img src={brfidLogo} alt="BRFID Logo" style={{ height: 40, width: 'auto' }} />
          </div>
          <p className={styles.brandDesc}>
            UK designed, India manufactured RFID solutions for retail, logistics, healthcare, and beyond.
          </p>
        </div>

        {/* Solutions */}
        <div className={styles.solutionsGroup}>
          <h4 className={styles.groupTitle}>Solutions</h4>
          <div className={styles.solutionsGrid}>
            {SOLUTIONS.map(s => (
              <Link key={s.id} to={`/solutions?industry=${s.id}`} className={styles.solutionLink}>
                {s.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className={styles.linkGroup}>
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:info@britanniarfids.com">info@britanniarfids.com</a></li>
            <li><span className={styles.linkPlain}>India: +91 421 3502996</span></li>
            <li><span className={styles.linkPlain}>UK: +44 (0)116 281 5300</span></li>
            <li>
              <a href="https://maps.app.goo.gl/WN9w4WC2f69uPnkM8" target="_blank" rel="noopener noreferrer">
                Tirupur, Tamil Nadu, India
              </a>
            </li>
            <li><span className={styles.linkPlain}>Leicester, UK</span></li>
          </ul>
        </div>

        {/* Legal */}
        <div className={styles.linkGroup}>
          <h4>Legal</h4>
          <ul>
            <li><span className={styles.linkPlain}>Privacy Policy</span></li>
            <li><span className={styles.linkPlain}>Terms of Service</span></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <p className={styles.copyright}>© 2026 Britannia RFID Technologies India Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
