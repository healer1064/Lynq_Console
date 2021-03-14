// libraries
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="header">
      <Link href="/home">
        <a className="header-logo ">
          <img src="/img/lynq-logo.png" alt="" />
        </a>
      </Link>
      <div className="burger-menu">
        <img src="/img/burger-menu.svg" alt="" />
      </div>
    </header>
  );
};

export default Navbar;
