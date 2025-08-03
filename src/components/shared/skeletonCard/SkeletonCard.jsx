import styles from "./SkeletonCard.module.css";

function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.cardFooter}>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonYear}></div>
      </div>
    </div>
  );
}

export default SkeletonCard;

