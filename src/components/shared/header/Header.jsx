import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../../assets/header/logo.svg";
import ROUTES from "../../../routes/Routes";
import Search from "./Search";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const location = useLocation();
  const headerHeight = 88;

  // scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= headerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // reset scroll state on route change
  useEffect(() => {
    setScrolled(false);
    setIsBurgerActive(false); // ბურგერიც დაიხუროს გვერდის შეცვლაზე
  }, [location.pathname]);

  const toggleBurger = () => {
    setIsBurgerActive((prev) => !prev);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div
        className={`${styles.burger} ${isBurgerActive ? styles.active : ""}`}
        onClick={toggleBurger}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <Link to={ROUTES.HOME} className={styles.logo}>
        <img src={logo} alt="movie logo" />
      </Link>

      {/* nav - გამოჩნდება ბურგერის კლიკზე < 1440px */}
      <nav className={`${styles.nav} ${isBurgerActive ? styles.showMenu : ""}`}>
        <ul className={styles.items}>
          <li>
            <NavLink
              to={ROUTES.HOME}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={ROUTES.MOVIES}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
            >
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              to={ROUTES.TV_SERIES}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
            >
              TV Series
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Search - ასევე ბურგერის კლიკზე გამოჩნდება მცირე რეზოლუციაზე */}
      <div className={`${styles.searchWrapper} ${isBurgerActive ? styles.showMenu : ""}`}>
        <Search />
      </div>
    </header>
  );
}

export default Header;




