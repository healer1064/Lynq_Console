// styles
import styles from "../../styles/EditProfile.module.sass";

const PublicScreenDropdown = ({ data }) => {
  return (
    <div className={styles.edit_profile_dropdown}>
      <select>
        {data.map((item, index) => {
          return <option key={index}>{item}</option>;
        })}
      </select>
      <img src="/img/public-screen-dropdown-icon.svg" alt="dropdown" />
    </div>
  );
};

export default PublicScreenDropdown;
