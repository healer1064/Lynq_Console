// styles
import styles from "./styles.module.sass";

// components
import Card from "../Card";

const index = () => {
  return (
    <div className={styles.plans}>
      <h1>
        Join Hundreds of experts than use <b>Lynq</b>
      </h1>
      <Card />
    </div>
  );
};

export default index;
