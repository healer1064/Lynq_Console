// styles
import styles from "./styles.module.sass";

const Navbar = () => {
  return (
    <>
      <header className={styles.header}>
        <a className="header-logo ">
          <img src="/img/lynq-logo.png" alt="" />
        </a>
      </header>
    </>
  );
};

export default Navbar;
