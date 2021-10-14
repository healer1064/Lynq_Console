// libraries
import { useState, useEffect } from "react";

// styles
import styles from "./styles.module.sass";

// icons
import { IoTrashBin } from "react-icons/io5";

// components
import { Menu, Dropdown } from "antd";

const Item = ({ index, socialLinks, setSocialLinks }) => {
  // states
  const [socialLink, setSocialLink] = useState(socialLinks[index]);

  useEffect(() => {
    handleKeywordInput(socialLink, index);
  }, [socialLink]);

  // handle keyword input
  const handleKeywordInput = (_text, _index) => {
    socialLinks[_index] = _text;
    setSocialLinks(socialLinks);
  };

  // handle delete
  const handleDelete = (_index) => {
    setSocialLinks(
      socialLinks.filter((item, i) => {
        return i != index;
      }),
    );
  };

  const socialLinksArray = [
    "Amazon",
    "Facebook",
    "Instagram",
    "LinkedIn",
    "Snapchat",
    "Tiktok",
    "Twitch",
    "Youtube",
    "Website",
  ];

  const menu = (
    <Menu>
      <Menu.Item>
        <span>Amazon</span>
      </Menu.Item>
      <Menu.Item>
        <span>Facebook</span>
      </Menu.Item>
      <Menu.Item>
        <span>Instagram</span>
      </Menu.Item>
      <Menu.Item>
        <span>LinkedIn</span>
      </Menu.Item>
      <Menu.Item>
        <span>Snapchat</span>
      </Menu.Item>
      <Menu.Item>
        <span>Tiktok</span>
      </Menu.Item>
      <Menu.Item>
        <span>Twitch</span>
      </Menu.Item>
      <Menu.Item>
        <span>YouTube</span>
      </Menu.Item>
      <Menu.Item>
        <span>Website</span>
      </Menu.Item>
      <Menu.Item>
        <span>Free text button</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.item}>
      <Dropdown overlay={menu} placement='bottomLeft'>
        <span className={styles.dropdown_btn}>Hello</span>
      </Dropdown>
      <input
        type='text'
        value={socialLink}
        onChange={(e) => setSocialLink(e.target.value)}
      />
      {socialLinks.length > 1 && (
        <IoTrashBin onClick={() => handleDelete(index)} />
      )}
    </div>
  );
};

export default Item;
