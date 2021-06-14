// styles
import styles from "./styles.module.sass";

// icons
import { FiPlus } from "react-icons/fi";

const AddNewButton = (props) => {
  return (
    <div {...props} className={styles.btn}>
      <FiPlus />
      <span>{props.title}</span>
    </div>
  );
};

export default AddNewButton;
