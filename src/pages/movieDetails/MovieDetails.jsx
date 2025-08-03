import styles from "./MovieDetails.module.css";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../api/index";
import MovieDetailsDisplay from "./MovieDetailsDisplay";
import SkeletonMovieDetails from "../../components/shared/skeletonMovieDetails/SkeletonMovieDetails";

function MovieDetails() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setShowSkeleton(true);

    fetchMovieDetails(movieId)
      .then((data) => {
        setMovie(data);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching movie:", err);
        setError("Failed to load movie.");
      })
      .finally(() => {
        setIsLoading(false);
        // ხელოვნური დაყოვნება სკელეტონისთვის (500ms)
        const timeout = setTimeout(() => setShowSkeleton(false), 500);
        return () => clearTimeout(timeout);
      });
  }, [movieId]);

  if (isLoading || showSkeleton) {
    return (
      <section className={styles.detailsSection}>
        <SkeletonMovieDetails />
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.detailsSection}>
        <p className={styles.error}>{error}</p>
      </section>
    );
  }

  if (!movie) {
    return (
      <section className={styles.detailsSection}>
        <p className={styles.error}>The movie could not be found.</p>
      </section>
    );
  }

  return (
    <section className={styles.detailsSection}>
      <MovieDetailsDisplay movie={movie} />
    </section>
  );
}

export default MovieDetails;
