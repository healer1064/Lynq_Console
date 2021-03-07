// styles
import styles from "../../styles/PublicScreen.module.sass";

const PublicScreenDropdown = ({ data, onHandle }) => {
  return (
    <div className={styles.public_screen_dropdown}>
      <select
        onChange={(e) => {
          const { value } = e.target;

          if (value === "0") return;

          const activity = data.find((item) => item.id === value);
          onHandle(activity);
        }}
      >
        <option value="0">--Select--</option>
        {data.map((item, index) => {
          return (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
      <img src="/img/public-screen-dropdown-icon.svg" alt="dropdown" />
    </div>
  );
};

export default PublicScreenDropdown;
