import { useState, useEffect } from "react";
import styles from "./AsideFilter.module.css";
import arrow from "../../assets/movies/arrow.svg";

const genresList = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "TV Movie",
  "Thriller",
  "War",
  "Western",
];

function formatCategoryTitle(slug) {
  const map = {
    now_playing: "Now Playing",
    popular: "Popular",
    top_rated: "Top Rated",
    upcoming: "Upcoming",
  };
  return map[slug] || slug;
}

function AsideFilter({
  selectedCategory,
  onChangeCategory,
  categories = [],
  selectedGenre,
  onChangeGenre,
  selectedYearRange,
  onChangeYearRange,
  selectedRatingRange,
  onChangeRatingRange,
  onResetFilters,
}) {
  const [openSection, setOpenSection] = useState(null);
  const [yearFrom, setYearFrom] = useState(selectedYearRange?.from || 1921);
  const [yearTo, setYearTo] = useState(selectedYearRange?.to || 2027);
  const [ratingFrom, setRatingFrom] = useState(
    selectedRatingRange?.from || 1.1
  );
  const [ratingTo, setRatingTo] = useState(selectedRatingRange?.to || 10.0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 980);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 980);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setYearFrom(selectedYearRange?.from || 1921);
    setYearTo(selectedYearRange?.to || 2027);
  }, [selectedYearRange]);

  useEffect(() => {
    setRatingFrom(selectedRatingRange?.from || 1.1);
    setRatingTo(selectedRatingRange?.to || 10.0);
  }, [selectedRatingRange]);

  const toggleSection = (sectionName) => {
    setOpenSection((prev) => (prev === sectionName ? null : sectionName));
  };

  const handleReset = () => {
    onChangeCategory({ target: { value: "all" } });
    onChangeGenre({ target: { value: "all" } });
    onChangeYearRange({ from: 1921, to: 2027 });
    onChangeRatingRange({ from: 1.1, to: 10.0 });

    setYearFrom(1921);
    setYearTo(2027);
    setRatingFrom(1.1);
    setRatingTo(10.0);
    setOpenSection(null);
    setIsMobileOpen(false);

    onResetFilters?.();
  };

  // ========== Aside Content ========== //
  const renderAsideContent = () => (
    <div className={styles.asideInner}>
      <div className={styles.asideHeader}>
        <h3 className={styles.title}>Filter</h3>
        {isMobile && (
          <button
            className={styles.closeBtn}
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close Filters"
          >
            &#10005;
          </button>
        )}
      </div>

      <div className={styles.asideContent}>
        {/* Category */}
        <div className={styles.section}>
          <h5 className={styles.sectionLabel}>Sort By Category</h5>
          <div
            className={styles.sectionHeader}
            onClick={() => toggleSection("category")}
          >
            <p>{formatCategoryTitle(selectedCategory) || "All Categories"}</p>
            <img
              src={arrow}
              alt="arrow"
              className={openSection === "category" ? styles.arrowOpen : ""}
            />
          </div>
          {openSection === "category" && (
            <ul className={styles.list}>
              <li>
                <label className={styles.selectList}>
                  <input
                    type="radio"
                    name="category"
                    value="all"
                    checked={selectedCategory === "all"}
                    onChange={onChangeCategory}
                  />
                  All Categories
                </label>
              </li>
              {categories.map((cat) => (
                <li key={cat} >
                  <label className={styles.selectList}>
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={selectedCategory === cat}
                      onChange={onChangeCategory}
                    />
                    {formatCategoryTitle(cat)}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Genre */}
        <div className={styles.section}>
          <h5 className={styles.sectionLabel}>Sort By Genres</h5>
          <div
            className={styles.sectionHeader}
            onClick={() => toggleSection("genres")}
          >
            <p>
              {selectedGenre === "all" || !selectedGenre
                ? "All Genres"
                : selectedGenre}
            </p>
            <img
              src={arrow}
              alt="arrow"
              className={openSection === "genres" ? styles.arrowOpen : ""}
            />
          </div>
          {openSection === "genres" && (
            <ul className={styles.list}>
              <li>
                <label className={styles.selectList}>
                  <input
                    type="radio"
                    name="genre"
                    value="all"
                    checked={selectedGenre === "all" || !selectedGenre}
                    onChange={onChangeGenre}
                  />
                  All Genres
                </label>
              </li>
              {genresList.map((genre) => (
                <li key={genre}>
                  <label className={styles.selectList}>
                    <input
                      type="radio"
                      name="genre"
                      value={genre}
                      checked={selectedGenre === genre}
                      onChange={onChangeGenre}
                    />
                    {genre}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Year */}
        <div className={styles.section}>
          <h5 className={styles.sectionLabel}>Sort By Year</h5>
          <div
            className={styles.sectionHeader}
            onClick={() => toggleSection("year")}
          >
            <p>
              {yearFrom === 1921 && yearTo === 2027
                ? "Any Year"
                : `${yearFrom} – ${yearTo}`}
            </p>
            <img
              src={arrow}
              alt="arrow"
              className={openSection === "year" ? styles.arrowOpen : ""}
            />
          </div>
          {openSection === "year" && (
            <div className={styles.rangeInputs}>
              <input
                type="number"
                min="1921"
                max="2027"
                value={yearFrom}
                onChange={(e) =>
                  onChangeYearRange({
                    from: Number(e.target.value),
                    to: yearTo,
                  })
                }
                className={styles.numberInput}
              />
              <span>–</span>
              <input
                type="number"
                min="1921"
                max="2027"
                value={yearTo}
                onChange={(e) =>
                  onChangeYearRange({
                    from: yearFrom,
                    to: Number(e.target.value),
                  })
                }
                className={styles.numberInput}
              />
            </div>
          )}
        </div>

        {/* Rating */}
        <div className={styles.section}>
          <h5 className={styles.sectionLabel}>Sort By Rating</h5>
          <div
            className={styles.sectionHeader}
            onClick={() => toggleSection("rating")}
          >
            <p>
              {ratingFrom === 1.1 && ratingTo === 10
                ? "Vote Average"
                : `${ratingFrom.toFixed(1)} – ${ratingTo.toFixed(1)}`}
            </p>
            <img
              src={arrow}
              alt="arrow"
              className={openSection === "rating" ? styles.arrowOpen : ""}
            />
          </div>
          {openSection === "rating" && (
            <div className={styles.rangeInputs}>
              <input
                type="number"
                min="1.1"
                max="10"
                step="0.1"
                value={ratingFrom}
                onChange={(e) =>
                  onChangeRatingRange({
                    from: Number(e.target.value),
                    to: ratingTo,
                  })
                }
                className={styles.numberInput}
              />
              <span>–</span>
              <input
                type="number"
                min="1.1"
                max="10"
                step="0.1"
                value={ratingTo}
                onChange={(e) =>
                  onChangeRatingRange({
                    from: ratingFrom,
                    to: Number(e.target.value),
                  })
                }
                className={styles.numberInput}
              />
            </div>
          )}
        </div>
      </div>

      <button className={styles.resetBtn} onClick={handleReset}>
        Reset Filters
      </button>
    </div>
  );

  return (
    <>
      {/* MOBILE FILTER ICON */}
      {isMobile && !isMobileOpen && (
        <button
          className={styles.mobileFilterBtn}
          onClick={() => setIsMobileOpen(true)}
          aria-label="Open Filters"
        >
          {/* Custom SVG or text */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#FF5733"
            viewBox="0 0 24 24"
            width="28"
            height="28"
          >
            <path d="M3 5h18v2H3V5zm4 6h10v2H7v-2zm-4 6h18v2H3v-2z" />
          </svg>
          <span>Filter</span>
        </button>
      )}

      {/* DESKTOP ASIDE */}
      {!isMobile && (
        <aside className={styles.aside}>{renderAsideContent()}</aside>
      )}

      {/* MOBILE OVERLAY */}
      {isMobile && isMobileOpen && (
        <div className={styles.mobileOverlay}>
          <aside className={styles.aside}>{renderAsideContent()}</aside>
        </div>
      )}
    </>
  );
}

export default AsideFilter;
