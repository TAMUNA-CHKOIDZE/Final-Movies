import styles from "./SkeletonMovieDetails.module.css";

function SkeletonMovieDetails() {
  return (
    <div className={`${styles.movieDetails} ${styles.skeleton}`}>
      <div className={styles.poster}>
        <div className={styles.skeletonImage}></div>
      </div>

      <div className={styles.info}>
        <div className={styles.skeletonTitle}></div>

        <div className={styles.moreDetails}>
          <div className={styles.tags}>
            <span className={styles.skeletonTag}></span>
            <span className={styles.skeletonTag}></span>
            <span className={styles.skeletonTagWide}></span>
          </div>

          <div className={styles.detailsRow}>
            <span className={styles.skeletonDetail}></span>
            <span className={styles.skeletonDetail}></span>
          </div>
        </div>

        <div className={styles.rateShare}>
          <div className={styles.skeletonButton}></div>
          <div className={styles.skeletonRating}></div>
          <div className={styles.skeletonButton}></div>
        </div>

        <div className={styles.skeletonOverview}></div>
        <div className={styles.skeletonOverview}></div>
        <div className={styles.skeletonOverview}></div>
      </div>
    </div>
  );
}

export default SkeletonMovieDetails;
