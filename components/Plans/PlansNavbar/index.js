// libraries
import Link from "next/link";

// components

const PlansNavbar = () => {
  return (
    <>
      <header className="header">
        <Link href="/">
          <a className="header-logo ">
            <img src="/img/lynq-logo.png" alt="" />
          </a>
        </Link>
      </header>
    </>
  );
};

export default PlansNavbar;
