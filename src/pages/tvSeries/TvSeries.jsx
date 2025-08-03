import styles from "./TvSeries.module.css";
import { useMovieContext } from "../../context/MovieContext";
import {
  fetchAllTVShowsFromCategories,
  fetchTVShowsBySearch,
} from "../../api";
import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import AsideFilter from "../../components/asideFilter/AsideFilter";
import MovieCard from "../../components/shared/movieCard/MovieCard";
import SkeletonCard from "../../components/shared/skeletonCard/SkeletonCard";
import genreIdToName from "../../utils/genreMap";

const categories = ["popular", "top_rated", "on_the_air", "airing_today"];
const ITEMS_PER_PAGE = 16;

function TvSeries() {
  const { allMovies: allTVShows, setAllMovies: setAllTVShows } = useMovieContext();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedYearRange, setSelectedYearRange] = useState({ from: 1921, to: 2027 });
  const [selectedRatingRange, setSelectedRatingRange] = useState({ from: 1.1, to: 10.0 });

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [animateNewItems, setAnimateNewItems] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  const loadTVShows = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const tvShows = await fetchAllTVShowsFromCategories(categories, 5);
      setAllTVShows(tvShows);
      setSelectedCategory("all");
      setVisibleCount(ITEMS_PER_PAGE);
    } catch {
      setError("შეცდომა სერიალების წამოღებისას.");
    } finally {
      setLoading(false);
    }
  }, [setAllTVShows]);

  const searchTVShows = useCallback(async (searchQuery) => {
    try {
      setLoading(true);
      setError(null);
      const results = await fetchTVShowsBySearch(searchQuery);
      setAllTVShows(results);
      setSelectedCategory("search");
      setVisibleCount(ITEMS_PER_PAGE);
    } catch {
      setError("ძებნის შეცდომა");
    } finally {
      setLoading(false);
    }
  }, [setAllTVShows]);

  useEffect(() => {
    if (query) {
      searchTVShows(query);
    } else {
      loadTVShows();
    }
  }, [query, loadTVShows, searchTVShows]);

  useEffect(() => {
    if (!loading) {
      setAnimateNewItems(false);
      const timeout = setTimeout(() => setShowLoading(false), 500);
      return () => clearTimeout(timeout);
    } else {
      setShowLoading(true);
    }
  }, [loading]);

  const filteredTVShows = allTVShows.filter((tv) => {
    if (
      selectedCategory !== "all" &&
      selectedCategory !== "search" &&
      tv.category !== selectedCategory
    ) return false;

    if (
      selectedGenre !== "all" &&
      !tv.genre_ids?.some((id) => genreIdToName[id] === selectedGenre)
    ) return false;

    const date = tv.first_air_date;
    if (!date) return false;

    const year = parseInt(date.slice(0, 4));
    if (year < selectedYearRange.from || year > selectedYearRange.to) return false;

    if (
      tv.vote_average < selectedRatingRange.from ||
      tv.vote_average > selectedRatingRange.to
    ) return false;

    return true;
  });

  const visibleTVShows = filteredTVShows.slice(0, visibleCount);

  const handleLoadMore = () => {
    setAnimateNewItems(true);
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <section className={styles.catalog}>
      <AsideFilter
        selectedCategory={selectedCategory}
        onChangeCategory={(e) => {
          if (query) return;
          setSelectedCategory(e.target.value);
          setVisibleCount(ITEMS_PER_PAGE);
        }}
        categories={categories}
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
      />

      <section className={styles.tvSeries}>
        <div className={styles.tvSeriesContainer}>
          {showLoading
            ? Array(ITEMS_PER_PAGE)
                .fill(0)
                .map((_, idx) => <SkeletonCard key={idx} />)
            : visibleTVShows.map((tv, idx) => (
                <MovieCard
                  key={tv.id}
                  movie={tv}
                  animate={
                    animateNewItems && idx >= visibleCount - ITEMS_PER_PAGE
                  }
                  animationDelay={`${(idx - (visibleCount - ITEMS_PER_PAGE)) * 100}ms`}
                />
              ))}
        </div>

        {!showLoading && visibleTVShows.length < filteredTVShows.length && (
          <button onClick={handleLoadMore} className={styles.loadMoreBtn}>
            Load More
          </button>
        )}
      </section>
    </section>
  );
}

export default TvSeries;
