// libraries
import { useState, useEffect } from "react";

// icons
import { IoTrashBin } from "react-icons/io5";

// styles
import styles from "./styles.module.sass";

const Item = ({ index, tippings, setTippings }) => {
  // states
  const [tipping, setTipping] = useState(tippings[index]);

  useEffect(() => {
    handleTippingInput(tipping, index);
  }, [tipping]);

  // handle tipping input
  const handleTippingInput = (_number, _index) => {
    tippings[_index] = _number;
    setTippings(tippings);
  };

  // handle delete
  const handleDelete = (_index) => {
    setTippings(
      tippings.filter((item, i) => {
        return i != _index;
      }),
    );
  };

  return (
    <div className={styles.item_div}>
      <input
        type='number'
        value={tipping}
        placeholder="Enter amount"
        onChange={(e) => setTipping(e.target.value)}
      />
      {tippings.length > 1 && (
        <IoTrashBin onClick={() => handleDelete(index)} />
      )}
    </div>
  );
};

export default Item;
