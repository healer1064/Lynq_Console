// libraries
import Link from "next/link";

// styles
import styles from "./styles.module.sass";

const PlansNavbar = () => {
  return (
    <>
      <header className={styles.header}>
        <Link href="/plans">
          <a className={styles.header_logo}>
            <img src="/img/lynq-logo.png" alt="" />
          </a>
        </Link>
      </header>
    </>
  );
};

export default PlansNavbar;
