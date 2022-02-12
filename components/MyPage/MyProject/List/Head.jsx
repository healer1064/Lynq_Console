// styles
import styles from "./styles.module.sass";

// icons
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

const Head = () => {
  return (
    <div className={styles.head}>
      <p>Project name</p>
      <p>Status</p>
      <p>Ending date</p>
      <p>Amount to reach</p>
      <p>Amount collected</p>
      <p>Progress</p>
      <p></p>
    </div>
  );
};

export default Head;
