// libraries
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Rotate from "react-reveal/Rotate";
import Fade from "react-reveal/Fade";

const Navbar = ({ active }) => {
  // states
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("linqToken");
    router.push("/login");
  };

  return (
    <>
      <header className="header">
        <Link href="/">
          <a className="header-logo ">
            <img src="/img/lynq-logo.png" alt="" />
          </a>
        </Link>
        <div onClick={logout} className="logout">
          <img src="/img/logout.svg" alt="logout" />
          <p>Logout</p>
        </div>
        <div className="burger-menu" onClick={() => setOpen(true)}>
          <img src="/img/burger-menu.svg" alt="" />
        </div>
      </header>
      {open && (
        <div className="mobile-nav">
          <div className="mobile-nav-close">
            <Rotate>
              <img
                onClick={() => setOpen(false)}
                src="/img/public-screen-close.svg"
                alt="mobile-nav-close"
              />
            </Rotate>
          </div>
          <Fade duration={1000}>
            <div className="mobile-nav-main-link">
              <Link href="/">
                <a className={active === "" ? "active" : ""}>
                  <span>Home</span>
                </a>
              </Link>
              <Link href="/appointments">
                <a className={active === "appointments" ? "active" : ""}>
                  <span>Appointments</span>
                </a>
              </Link>
              <Link href="/public-profile">
                <a className={active === "profile" ? "active" : ""}>
                  <span>Public Profile</span>
                </a>
              </Link>
              <div className="space"></div>
              <Link href="/settings">
                <a className={active === "settings" ? "active" : ""}>
                  <span>Settings</span>
                </a>
              </Link>
              <Link href="/clients">
                <a className={active === "clients" ? "active" : ""}>
                  <span>Clients</span>
                </a>
              </Link>
              <Link href="/payment">
                <a className={active === "payments" ? "active" : ""}>
                  <span>Payment</span>
                </a>
              </Link>
              <Link href="/support">
                <a className={active === "contact" ? "active" : ""}>
                  <span>Support</span>
                </a>
              </Link>
            </div>
            <div className="mobile-nav-other-link">
              <Link href="/account">
                <a className={active === "account" ? "active" : ""}>
                  <span>My Account</span>
                </a>
              </Link>
              <a onClick={logout}>
                <span>Log Out</span>
              </a>
            </div>
          </Fade>
        </div>
      )}
    </>
  );
};

export default Navbar;
