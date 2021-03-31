// libraries
import { useState } from "react";

// styles
import styles from "./styles.module.css";

const CategoryListItem = ({ state, handleChange, item }) => {
  // states
  const [selected, setSelected] = useState(state.some((i) => i == item));

  return (
    <li className={styles.item}>
      <span>{item}</span>
      <input
        className={styles.checkbox}
        type="checkbox"
        value={item}
        checked={selected}
        onChange={(e) => {
          handleChange(e);
          e.target.checked ? setSelected(true) : setSelected(false);
        }}
        disabled={state.length >= 3 && !selected ? true : false}
      />
    </li>
  );
};

export default CategoryListItem;
