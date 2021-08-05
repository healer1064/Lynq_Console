// styles
import styles from "./styles.module.sass";

// components
import { Tooltip } from "antd";

const Item = ({ data, index }) => {
  // data
  const { firstname, lastname, email } = data;

  return (
    <div className={styles.body}>
      <p>{index + 1}</p>
      <Tooltip placement='top' title={firstname}>
        <p>{firstname}</p>
      </Tooltip>
      <Tooltip placement='top' title={lastname}>
        <p>{lastname}</p>
      </Tooltip>
      <Tooltip placement='top' title={email}>
        <p>{email}</p>
      </Tooltip>
    </div>
  );
};

export default Item;
