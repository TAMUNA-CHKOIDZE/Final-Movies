import styles from "./PopularCard.module.css";
import star from "../../../../assets/popular/Star.svg";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

function PopularCard({ movie, isLoading }) {
  // თუ isLoading არის true სკელეტოს დააბრუნებს თუ არადა ქარდებს
  if (isLoading) {
    return (
      <div className={styles.popularCard}>
        <Skeleton height={260} borderRadius={6} />
        <h4>
          <Skeleton width={180} />
        </h4>
        <div className={styles.cardFooter}>
          <Skeleton width={40} />
          <Skeleton width={30} />
        </div>
      </div>
    );
  }

  // ფოტოს აღება movie-დან მჭირდება ასე
  const imageUrl = `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`;

  return (
    <Link to={`/details/${movie.id}`} className={styles.popularCard}>
      <img src={imageUrl} alt={movie.title} />
      <h4>{movie.title}</h4>
      <div className={styles.cardFooter}>
        <p>{movie.release_date.slice(0, 4)}</p>
        <span>
          {movie.vote_average}
          <img src={star} alt="star" />
        </span>
      </div>
    </Link>
  );
}

export default PopularCard;
