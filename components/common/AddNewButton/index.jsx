// styles
import styles from "./styles.module.sass";

const AddNewButton = (props) => {
  return (
    <div {...props} className={styles.btn}>
      <img src="/img/new-client-icon.svg" alt="" />
      <span>{props.title}</span>
    </div>
  );
};

export default AddNewButton;
