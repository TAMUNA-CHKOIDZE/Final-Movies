import styles from "./MovieCard.module.css";
import { Link } from "react-router-dom";

function MovieCard({ movie, animate, animationDelay }) {
  const imageUrl = `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`;
  const title = movie.title || movie.name || "Untitled";
  const year = (movie.release_date || movie.first_air_date || "").slice(0, 4);

  return (
    <Link
      to={`/details/${movie.id}`}
      className={styles.movieCard}
      style={
        animate
          ? {
              opacity: 0,
              animationName: styles.fadeInUp,
              animationDuration: "0.5s",
              animationFillMode: "forwards",
              animationTimingFunction: "ease-out",
              animationDelay: animationDelay,
            }
          : {}
      }
    >
      <img src={imageUrl} alt={title} />
      <div className={styles.cardFooter}>
        <h4>{title}</h4>
        <p>{year || "N/A"}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
