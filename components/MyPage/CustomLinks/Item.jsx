// libraries
import { useState, useEffect } from "react";

// icons
import { IoTrashBin } from "react-icons/io5";

// styles
import styles from "./styles.module.sass";

const Item = ({ index, customLinks, setCustomLinks }) => {
  // states
  const [customLink, setCustomLink] = useState(customLinks[index]);

  useEffect(() => {
    handleCustomLinkInput(customLink, index);
  }, [customLink]);

  // handle customLink input
  const handleCustomLinkInput = (_object, _index) => {
    customLinks[_index] = _object;
    setCustomLinks(customLinks);
  };

  // handle delete
  const handleDelete = (_index) => {
    setCustomLinks(
      customLinks.filter((item, i) => {
        return i != _index;
      }),
    );
  };

  return (
    <div className={styles.item_div}>
      <label>Link title *</label>
      <input
        type='text'
        value={customLink.title}
        onChange={(e) => setCustomLink(e.target.value)}
      />
      <label>URL *</label>
      <input
        type='text'
        value={customLink.url}
        onChange={(e) => setCustomLink(e.target.value)}
      />
      {customLinks.length > 1 && (
        <IoTrashBin onClick={() => handleDelete(index)} className={styles.delete_btn}/>
      )}
    </div>
  );
};

export default Item;
