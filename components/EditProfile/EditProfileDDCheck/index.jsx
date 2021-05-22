// libraries
import { useState } from "react";

// styles
import styles from "./style.module.css";

// components
import CategoryListItem from "../CategoryListItem";

const EditProfileDDCheck = ({ state, setState, categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleChange = (e) => {
    if (e.target.checked) {
      const tArr = state;
      tArr.push(e.target.value);
      setState([...tArr]);
    } else {
      const tempArr = state.filter((i) => i !== e.target.value);
      setState(tempArr);
    }
  };

  return (
    <div className={styles.wrapper} onClick={toggle}>
      {isOpen && (
        <div className={styles.drop_down} onClick={(e) => e.stopPropagation()}>
          <ul className={styles.list}>
            {categories.map((i, index) => (
              <CategoryListItem
                key={index}
                state={state}
                handleChange={handleChange}
                item={i}
              />
            ))}
          </ul>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
            }}
            style={{ marginTop: "10px" }}
          >
            Okay
          </button>
        </div>
      )}
      <div className={styles.icon_wrapper}>
        <span>{state.join(", ")}</span>
        <img src="/img/public-screen-dropdown-icon.svg" alt="dropdown" />
      </div>
    </div>
  );
};

export default EditProfileDDCheck;
