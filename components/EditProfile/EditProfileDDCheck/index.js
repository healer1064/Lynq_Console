import React, { useState } from "react";

import styles from "./style.module.css";

const EditProfileDDCheck = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={styles.wrapper} onClick={toggle}>
      {isOpen && (
        <div className={styles.drop_down} onClick={(e) => e.stopPropagation()}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <span>Automotive</span>
              <input className={styles.checkbox} type="checkbox" />
            </li>
            <li className={styles.item}>
              <span>Astrologer</span>
              <input className={styles.checkbox} type="checkbox" />
            </li>
            <li className={styles.item}>
              <span>Fashion</span>
              <input className={styles.checkbox} type="checkbox" />
            </li>
            <li className={styles.item}>
              <span>Fitness</span>
              <input className={styles.checkbox} type="checkbox" />
            </li>
            <li className={styles.item}>
              <span>Lifecoach</span>
              <input className={styles.checkbox} type="checkbox" />
            </li>
            <li className={styles.item}>
              <span>Make Up</span>
              <input className={styles.checkbox} type="checkbox" />
            </li>
            <li className={styles.item}>
              <span>Meditation</span>
              <input className={styles.checkbox} type="checkbox" />
            </li>
            <li className={styles.item}>
              <span>Yoga</span>
              <input className={styles.checkbox} type="checkbox" />
            </li>
          </ul>
        </div>
      )}
      <div className={styles.icon_wrapper}>
        <img src="/img/public-screen-dropdown-icon.svg" alt="dropdown" />
      </div>
    </div>
  );
};

export default EditProfileDDCheck;
