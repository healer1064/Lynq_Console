// libraries
import { useState, useEffect } from "react";

// icons
import { IoTrashBin } from "react-icons/io5";

// styles
import styles from "./styles.module.sass";

const Item = ({ index, socialLinks, setSocialLinks }) => {
  // states
  const [socialLink, setSocialLink] = useState(socialLinks[index]);

  useEffect(() => {
    handleSocialLinkInput(socialLink, index);
  }, [socialLink]);

  // handle socialLink input
  const handleSocialLinkInput = (_object, _index) => {
    socialLinks[_index] = _object;
    setSocialLinks(socialLinks);
  };

  // handle delete
  const handleDelete = (_index) => {
    setSocialLinks(
      socialLinks.filter((item, i) => {
        return i != _index;
      }),
    );
  };

  return (
    <div className={styles.item_div}>
      <select
        value={socialLink.type}
        onChange={(e) => setSocialLink(e.target.value)}
      >
        <option value={0}>Twitter</option>
        <option value={1}>Facebook</option>
      </select>
      <input
        type='text'
        placeholder="url"
        value={socialLink.url}
        onChange={(e) => setSocialLink(e.target.value)}
      />
      {socialLinks.length > 1 && (
        <IoTrashBin onClick={() => handleDelete(index)} className={styles.delete_btn}/>
      )}
    </div>
  );
};

export default Item;
