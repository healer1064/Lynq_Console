// libraries
import AnimatedNumber from "animated-number-react";

// styles
import styles from "./styles.module.sass";

// components
import PageLoading from "../../common/PageLoading";

const Item = ({ stats }) => {
  return (
    <div className={styles.row}>
      <div className={styles.card}>
        <div className={styles.icon}>
          <img src="/img/home-stats-revenue.svg" alt="" />
        </div>
        <div className={styles.title}>Revenue</div>
        <div className={styles.num}>
          {!stats ? (
            <PageLoading />
          ) : (
            <>
              $
              <AnimatedNumber
                value={stats.revenue}
                formatValue={(value) => value.toFixed(2)}
              />
            </>
          )}
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.icon}>
          <img src="/img/home-stats-session.svg" alt="" />
        </div>
        <div className={styles.title}>Session</div>
        <div className={styles.num}>
          {!stats ? (
            <PageLoading />
          ) : (
            <>
              <AnimatedNumber
                value={stats.session}
                formatValue={(value) => value.toFixed(0)}
              />
            </>
          )}
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.icon}>
          <img src="/img/home-stats-request.svg" alt="" />
        </div>
        <div className={styles.title}>Request</div>
        <div className={styles.num}>
          {!stats ? (
            <PageLoading />
          ) : (
            <>
              <AnimatedNumber
                value={stats.request}
                formatValue={(value) => value.toFixed(0)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;
