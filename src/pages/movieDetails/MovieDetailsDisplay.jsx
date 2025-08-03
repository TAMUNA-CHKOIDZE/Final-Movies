import styles from "./MovieDetails.module.css";
import starIcon from "../../assets/details/star.svg";
import calendar from "../../assets/details/calender.svg";
import play from "../../assets/details/play-arrow.svg";
import watch from "../../assets/details/watch.svg";
import share from "../../assets/details/share.svg";
import SkeletonMovieDetails from "../../components/shared/skeletonMovieDetails/SkeletonMovieDetails";

// კითხვის ნიშანი და წერტილი (?.) არის Optional Chaining ოპერატორი ნიშნავს, რომ "თუ genres არსებობს — გამოიძახე length და თუ არ არსებობს, უბრალოდ დააბრუნე undefined, შეცდომის გარეშე.
// თუ ჟანრების მასივი აქვს ფილმს და არ არის ცარიელი, .map()-ით ვიღებ მხოლოდ name-ებს და ვაერთიანებ მთლიან სტრინგად როგორც დიზაინშია
function MovieDetailsDisplay({ movie }) {
  if (!movie || Object.keys(movie).length === 0) {
    return <SkeletonMovieDetails />;
  }

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
    : "path-to-placeholder.jpg";

  const genresString = movie.genres?.length
    ? movie.genres.map((g) => g.name).join(", ")
    : "No genres";

  return (
    <div className={styles.movieDetails}>
      <div className={styles.poster}>
        <img src={imageUrl} alt={movie.title} />
      </div>

      <div className={styles.info}>
        <h2>{movie.title}</h2>

        <div className={styles.moreDetails}>
          <div className={styles.tags}>
            <span className={styles.movieTag}>Movie</span>
            <span className={styles.hdTag}>HD</span>
            <span className={styles.genres}>{genresString}</span>
          </div>

          <div className={styles.detailsRow}>
            <span>
              <img src={watch} alt="watch" /> {movie.runtime} min
            </span>
            <span>
              <img src={calendar} alt="calendar" />
              {new Date(movie.release_date).getFullYear()}
            </span>
          </div>
        </div>

        <div className={styles.rateShare}>
          <button className={styles.shareButton}>
            <img src={share} alt="share" />
            <span>Share</span>
          </button>
          <div className={styles.rating}>
            <h5>Rate The Show </h5>
            <span>
              {movie.vote_average}
              <img src={starIcon} alt="star" />
            </span>
          </div>
          <button className={styles.playButton}>
            <img src={play} alt="play" />
            <span>PLAY NOW</span>
          </button>
        </div>

        <p className={styles.overview}>{movie.overview}</p>
      </div>
    </div>
  );
}

export default MovieDetailsDisplay;