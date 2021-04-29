// libraries
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Rotate from "react-reveal/Rotate";
import Fade from "react-reveal/Fade";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Navbar = ({ active }) => {
  // states
  const [open, setOpen] = useState(false);
  const [activities, setActivities] = useState(false);
  const [settings, setSettings] = useState(false);
  const [payment, setPayment] = useState(false);

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
              {/* <Link href="/appointments"> */}
              <a
                onClick={() => setActivities(!activities)}
                className={active === "appointments" ? "active" : ""}
                style={{ display: "flex", alignItems: "center" }}
              >
                <span>Activities</span>
                {activities ? (
                  <FaChevronUp size={14} style={{ marginLeft: "15px" }} />
                ) : (
                  <FaChevronDown size={14} style={{ marginLeft: "15px" }} />
                )}
              </a>
              {activities && (
                <div className="sub-links">
                  <Link href="/appointments">
                    <span>Calendar</span>
                  </Link>
                  <Link href="/appointments/requests">
                    <span>Requests</span>
                  </Link>
                  <Link href="/appointments/answers">
                    <span>Answers</span>
                  </Link>
                </div>
              )}
              <a className={active === "settings" ? "active" : ""}>
                <span>Settings</span>
                {settings ? (
                  <FaChevronUp size={14} style={{ marginLeft: "15px" }} />
                ) : (
                  <FaChevronDown size={14} style={{ marginLeft: "15px" }} />
                )}
              </a>
              {settings && (
                <div className="sub-links">
                  <Link href="/settings">
                    <span>Availabilities</span>
                  </Link>
                  <Link href="/event-types">
                    <span>Event Types</span>
                  </Link>
                  <Link href="/settings/calendar">
                    <span>Cal Sync</span>
                  </Link>
                </div>
              )}
              <Link href="/public-profile">
                <a className={active === "profile" ? "active" : ""}>
                  <span>Public Profile</span>
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
