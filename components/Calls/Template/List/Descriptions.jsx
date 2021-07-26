// libraries
import React, { useState } from "react";
import { Tooltip } from "antd";

// styles
import styles from "./styles.module.sass";

// icons
import { BsExclamationCircleFill } from "react-icons/bs";
import { IoTrashBin } from "react-icons/io5";

const Description = ({ value, placeholder, onChange, handleDelete, index }) => {
  return (
    <div className={styles.description}>
      <input
        value={value}
        maxLength='35'
        placeholder={placeholder}
        onChange={onChange}
      />
      <span>{value.length}/35</span>
      <IoTrashBin onClick={() => handleDelete(index)} />
    </div>
  );
};

const Descriptions = ({ onChange }) => {
  const [descriptions, setDescriptions] = useState([""]);

  const handleDelete = (index) => {
    setDescriptions(descriptions.filter((item, i) => i !== index));
  };

  return (
    <div>
      <div className={styles.desc_box}>
        <h3>
          Description{" "}
          <Tooltip
            className={styles.tooltip}
            title='The information you enter will be displayed as bullet points. You can add upto 5 lines.'
          >
            <BsExclamationCircleFill />
          </Tooltip>
        </h3>
        {descriptions.map((v, i) => (
          <Description
            handleDelete={handleDelete}
            index={i}
            key={i}
            value={v}
            placeholder={`Bullet point ${i + 1}`}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setDescriptions((old) => {
                old[i] = value;
                const array = [...old];
                onChange?.(array);
                return array;
              });
            }}
          />
        ))}
      </div>
      <button
        className={styles.addButton}
        onClick={() => {
          setDescriptions((old) => {
            if (old.length < 5) {
              return [...old, ""];
            }
            return old;
          });
        }}
      >
        +
      </button>
    </div>
  );
};

export default React.memo(Descriptions);
