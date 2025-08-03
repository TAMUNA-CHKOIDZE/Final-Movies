import styles from "./Catalog.module.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import AsideFilter from "../../components/asideFilter/AsideFilter";
import MovieCard from "../../components/shared/movieCard/MovieCard";
import genreIdToName from "../../utils/genreMap";
import SkeletonCard from "../../components/shared/skeletonCard/SkeletonCard";

import { fetchAllMoviesFromCategories, fetchMoviesBySearch } from "../../api";
import { useMovieContext } from "../../context/MovieContext";

const ITEMS_PER_PAGE = 16;

function Catalog() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  const { allMovies, setAllMovies } = useMovieContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedYearRange, setSelectedYearRange] = useState({
    from: 1921,
    to: 2027,
  });
  const [selectedRatingRange, setSelectedRatingRange] = useState({
    from: 1.1,
    to: 10.0,
  });

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [showLoading, setShowLoading] = useState(true);
  const [animateNewItems, setAnimateNewItems] = useState(false);

  // ფილმების ჩატვირთვა
  const loadAllMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const movies = await fetchAllMoviesFromCategories(
        ["popular", "top_rated", "upcoming", "now_playing"],
        5
      );
      setAllMovies(movies);
    } catch (err) {
      setError("ფილმების ჩატვირთვა ვერ მოხერხდა");
    } finally {
      setLoading(false);
    }
  }, [setAllMovies]);

  // ძებნის შედეგად ფილმების ჩატვირთვა
  const searchMovies = useCallback(
    async (searchQuery) => {
      try {
        setLoading(true);
        setError(null);
        const results = await fetchMoviesBySearch(searchQuery);
        setAllMovies(results);
      } catch (err) {
        setError("ძებნის შეცდომა");
      } finally {
        setLoading(false);
      }
    },
    [setAllMovies]
  );

  // მთავარი useEffect
  useEffect(() => {
    if (query) {
      searchMovies(query);
      setSelectedCategory("search");
    } else {
      loadAllMovies();
      setSelectedCategory("all");
    }

    setVisibleCount(ITEMS_PER_PAGE);
  }, [query, loadAllMovies, searchMovies]);

  // Show loading state and control animation flag
  useEffect(() => {
    if (!loading) {
      // როცა ლოდინგი დასრულდება, ანიმაცია გამორთე
      setAnimateNewItems(false);
      const timeout = setTimeout(() => setShowLoading(false), 500);
      return () => clearTimeout(timeout);
    } else {
      setShowLoading(true);
    }
  }, [loading]);

  // ფილმების ფილტრი
  const filteredMovies = allMovies.filter((m) => {
    if (
      selectedCategory !== "all" &&
      selectedCategory !== "search" &&
      m.category !== selectedCategory
    )
      return false;

    if (
      selectedGenre !== "all" &&
      !m.genre_ids?.some((id) => genreIdToName[id] === selectedGenre)
    )
      return false;

    const date = m.release_date || m.first_air_date;
    if (!date) return false;

    const year = parseInt(date.slice(0, 4));
    if (year < selectedYearRange.from || year > selectedYearRange.to) return false;

    if (
      m.vote_average < selectedRatingRange.from ||
      m.vote_average > selectedRatingRange.to
    )
      return false;

    return true;
  });

  const visibleMovies = filteredMovies.slice(0, visibleCount);

  // Load More დაჭერის ჰენდლერი
  const handleLoadMore = () => {
    setAnimateNewItems(true);
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  if (error) return <p>{error}</p>;

  return (
    <section className={styles.catalog}>
      <AsideFilter
        selectedCategory={selectedCategory}
        onChangeCategory={(e) => {
          if (query) return;
          setSelectedCategory(e.target.value);
          setVisibleCount(ITEMS_PER_PAGE);
        }}
        categories={["popular", "top_rated", "upcoming", "now_playing"]}
        disabled={!!query}
        selectedGenre={selectedGenre}
        onChangeGenre={(e) => {
          setSelectedGenre(e.target.value);
          setVisibleCount(ITEMS_PER_PAGE);
        }}
        selectedYearRange={selectedYearRange}
        onChangeYearRange={(range) => {
          setSelectedYearRange(range);
          setVisibleCount(ITEMS_PER_PAGE);
        }}
        selectedRatingRange={selectedRatingRange}
        onChangeRatingRange={(range) => {
          setSelectedRatingRange(range);
          setVisibleCount(ITEMS_PER_PAGE);
        }}
        onResetFilters={() => {
          setSelectedCategory("all");
          setSelectedGenre("all");
          setSelectedYearRange({ from: 1921, to: 2027 });
          setSelectedRatingRange({ from: 1.1, to: 10.0 });
          setVisibleCount(ITEMS_PER_PAGE);
        }}
        isMobileOpen={true}
        onClose={() => {}}
      />

      <section className={styles.movies}>
        <div className={styles.moviesContainer}>
          {showLoading
            ? Array(ITEMS_PER_PAGE)
                .fill(0)
                .map((_, idx) => <SkeletonCard key={idx} />)
            : visibleMovies.map((movie, idx) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  animate={
                    animateNewItems &&
                    idx >= visibleCount - ITEMS_PER_PAGE // მხოლოდ ბოლო დამატებული 16 ბარათისთვის
                  }
                  animationDelay={`${(idx - (visibleCount - ITEMS_PER_PAGE)) * 100}ms`}
                />
              ))}
        </div>

        {!showLoading && visibleMovies.length < filteredMovies.length && (
          <button onClick={handleLoadMore} className={styles.loadMoreBtn}>
            Load More
          </button>
        )}
      </section>
    </section>
  );
}

export default Catalog;
