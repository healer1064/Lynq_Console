// libraries
import { useState, useEffect } from "react";

// icons
import { IoTrashBin } from "react-icons/io5";

// styles
import styles from "./styles.module.sass";

const Item = ({ index, keywords, setKeywords }) => {
  // states
  const [keyword, setKeyword] = useState(keywords[index]);

  useEffect(() => {
    handleKeywordInput(keyword, index);
  }, [keyword]);

  // handle keyword input
  const handleKeywordInput = (_text, _index) => {
    keywords[_index] = _text;
    setKeywords(keywords);
  };

  // handle delete
  const handleDelete = (_index) => {
    setKeywords(
      keywords.filter((item, i) => {
        return i != index;
      }),
    );
  };

  return (
    <div className={styles.item_div}>
      <input
        type='text'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      {keywords.length > 1 && (
        <IoTrashBin onClick={() => handleDelete(index)} />
      )}
    </div>
  );
};

export default Item;
