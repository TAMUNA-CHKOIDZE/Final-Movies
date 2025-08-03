import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import searchIcon from "../../../assets/header/search.svg";

function Search() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
          query
        )}&api_key=${apiKey}`
      );
      const data = await response.json();

      if (!data.results.length) {
        navigate(`/not-found?query=${query}`);
        setQuery(""); // ← გაწმენდა
        return;
      }

      const firstResult = data.results.find(
        (item) => item.media_type === "movie" || item.media_type === "tv"
      );

      if (!firstResult) {
        navigate(`/not-found?query=${query}`);
      } else if (firstResult.media_type === "movie") {
        navigate(`/movies?query=${query}`);
      } else if (firstResult.media_type === "tv") {
        navigate(`/tv-series?query=${query}`);
      }

      setQuery(""); // input-ის გასუფთავება
    } catch (error) {
      console.error("Search failed:", error.message);
    }
  };

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movie or TV Series..."
      />
      <button type="submit">
        <img src={searchIcon} alt="search icon" />
      </button>
    </form>
  );
}

export default Search;
