// libraries
import { Menu } from "antd";

// icons
import { CheckOutlined } from "@ant-design/icons";

const DropdownMenu = ({ state, setState, data }) => {
  return (
    <Menu style={{ boxShadow: "1px 1px 3px 3px rgba(0,0,0,0.1)" }}>
      {data.map((item, index) => (
        <Menu.Item
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          onClick={() => setState(item)}
        >
          <span>{item}</span> {state === item && <CheckOutlined />}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default DropdownMenu;
