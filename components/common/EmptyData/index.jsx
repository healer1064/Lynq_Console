// styles
import styles from "./styles.module.sass";

const EmptyData = ({ title, flag }) => {
  return (
    <div
      className={`${styles.empty_data} ${
        flag == "payment" || flag == "home" ? styles.less_height : ""
      }`}
    >
      <span>{title}</span>
    </div>
  );
};

export default EmptyData;
