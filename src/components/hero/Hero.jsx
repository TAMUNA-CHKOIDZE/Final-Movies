import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.css";
import arrow from "../../assets/hero/arrow.svg";

function Hero() {
  const navigate = useNavigate();

  const handleClick = () => {
    // გადაგვიყვანს /movies გვერდზე და გადაეცემა პარამეტრი, რომ ჩატვირთოს ფილმები
    navigate("/movies");
  };

  return (
    <section className={styles.hero}>
      <section className={styles.heroContent}>
        <h1>Stories Worth Watching</h1>
        <div className={styles.heroDescription}>
          <p>Escape Into the World of Cinema.</p>
          <p>Curated films for every mood, moment, and screen.</p>
          <p>Browse. Click. Play. Discover films you'll love.</p>
        </div>

        <button onClick={handleClick}>
          Watch Movies <img src={arrow} alt="arrow" />
        </button>
      </section>
    </section>
  );
}

export default Hero;
