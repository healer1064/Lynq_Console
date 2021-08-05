// libraries
import { Menu } from "antd";

// styles
import styles from "./styles.module.scss";

// icons
import { CheckOutlined } from "@ant-design/icons";

const DropdownMenu = ({ state, setState }) => {
  return (
    <Menu style={{ boxShadow: "1px 1px 3px 3px rgba(0,0,0,0.1)" }}>
      <Menu.Item
        className={styles.menu_item}
        onClick={() => setState("Last 30 days")}
      >
        <span>Last 30 days</span>{" "}
        {state === "Last 30 days" && <CheckOutlined />}
      </Menu.Item>
      <Menu.Item
        className={styles.menu_item}
        onClick={() => setState("Last month")}
      >
        <span>Last month</span> {state === "Last month" && <CheckOutlined />}
      </Menu.Item>
      <Menu.Item
        className={styles.menu_item}
        onClick={() => setState("Last 3 months")}
      >
        <span>Last 3 months</span>{" "}
        {state === "Last 3 months" && <CheckOutlined />}
      </Menu.Item>
      <hr className={styles.hr} />
      <Menu.Item
        className={styles.menu_item}
        onClick={() => setState("This year")}
      >
        <span>This year</span> {state === "This year" && <CheckOutlined />}
      </Menu.Item>
      <Menu.Item
        className={styles.menu_item}
        onClick={() => setState("Last year")}
      >
        <span>Last year</span> {state === "Last year" && <CheckOutlined />}
      </Menu.Item>
      <hr className={styles.hr} />
      <Menu.Item
        className={styles.menu_item}
        onClick={() => setState("All time")}
      >
        <span>All time</span> {state === "All time" && <CheckOutlined />}
      </Menu.Item>
    </Menu>
  );
};

export default DropdownMenu;
