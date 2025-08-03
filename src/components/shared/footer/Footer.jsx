import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import facebook from "../../../assets/footer/facebook.svg";
import tiktok from "../../../assets/footer/tiktok.svg";
import youtube from "../../../assets/footer/youtube.svg";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <div className={styles.socials}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={facebook} alt="Facebook" />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={tiktok} alt="TikTok" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={youtube} alt="YouTube" />
          </a>
        </div>
        <ul className={styles.links}>
          <li>
            <Link to="/privacy-policy" className={styles.link}>Privacy Policy</Link>
          </li>
          <li>
            <Link to="/terms-of-service" className={styles.link}>Terms of Service</Link>
          </li>
          <li>
            <Link to="/contact" className={styles.link}>Contact Us</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        ©2025 FinalMovies. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
