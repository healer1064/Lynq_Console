// libraries
import Link from "next/link";
import { useRouter } from "next/router";

// styles
import styles from "./styles.module.sass";

const Navbar = () => {
  const router = useRouter();

  return (
    <>
      <header className={styles.header}>
        <Link href="/home">
          <a className="header-logo ">
            <img src="/img/lynq-logo.png" alt="" />
          </a>
        </Link>
      </header>
    </>
  );
};

export default Navbar;
