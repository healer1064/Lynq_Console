import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

// styles
import "antd/dist/antd.css";

const SearchInut = ({ setState }) => {
  return (
    <Input
      prefix={<SearchOutlined />}
      className="requests-search-input"
      placeholder="Search"
      allowClear
      onChange={(e) => setState(e.target.value)}
      size="large"
    />
  );
};

export default SearchInut;
