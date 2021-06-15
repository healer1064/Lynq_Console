// styles
import styles from "./styles.module.sass";

const PageLoading = () => {
  return (
    <div className={styles.page_loading}>
      <img src="/img/loading.gif" alt="loading" />
    </div>
  );
};

export default PageLoading;
