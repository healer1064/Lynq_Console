// libraries
import Link from "next/link";

// components

const PlansNavbar = () => {
  return (
    <>
      <header className="header">
        <Link href="/plans">
          <a className="header-logo ">
            <img src="/img/lynq-logo.png" alt="" />
          </a>
        </Link>
      </header>
    </>
  );
};

export default PlansNavbar;
