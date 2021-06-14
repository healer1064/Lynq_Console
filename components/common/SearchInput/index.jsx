// libraries
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

// styles
import styles from "./styles.module.sass";

const SearchInut = ({ setState, placeholder, size }) => {
  return (
    <Input
      prefix={<SearchOutlined />}
      className={styles.search_input}
      placeholder={placeholder}
      allowClear
      onChange={(e) => setState(e.target.value)}
      size={size ? size : "large"}
    />
  );
};

export default SearchInut;
