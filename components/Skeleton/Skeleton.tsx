import styles from "./Skeleton.module.css"

export default function Skeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar} />
        <div className={styles.headerLines}>
          <div className={`${styles.bar} ${styles.barLong}`} />
          <div className={`${styles.bar} ${styles.barMedium}`} />
        </div>
      </div>
      <div className={styles.body}>
        <div className={`${styles.bar} ${styles.barFull}`} />
        <div className={`${styles.bar} ${styles.barFull}`} />
        <div className={`${styles.bar} ${styles.barShort}`} />
      </div>
    </div>
  )
}
