// libraries
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (
      active === "appointments" ||
      active === "requests" ||
      active === "answers"
    ) {
      setActivities(true);
    } else if (
      active === "cal-sync" ||
      active === "eventtypes" ||
      active === "settings"
    ) {
      setSettings(true);
    } else if (active === "payment-details" || active === "payments") {
      setPayment(true);
    }
  }, []);

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
              <a
                onClick={() => setActivities(!activities)}
                style={{ display: "flex", alignItems: "center" }}
              >
                <span style={{ paddingRight: "15px" }}>Activities</span>
                {activities ? (
                  <FaChevronUp size={14} />
                ) : (
                  <FaChevronDown size={14} />
                )}
              </a>
              {activities && (
                <div className="sub-links">
                  <Link href="/appointments">
                    <span className={active === "appointments" ? "active" : ""}>
                      Calendar
                    </span>
                  </Link>
                  <Link href="/appointments/requests">
                    <span className={active === "requests" ? "active" : ""}>
                      Requests
                    </span>
                  </Link>
                  <Link href="/appointments/answers">
                    <span className={active === "answers" ? "active" : ""}>
                      Answers
                    </span>
                  </Link>
                </div>
              )}
              <a onClick={() => setSettings(!settings)}>
                <span style={{ paddingRight: "15px" }}>Settings</span>
                {settings ? (
                  <FaChevronUp size={14} />
                ) : (
                  <FaChevronDown size={14} />
                )}
              </a>
              {settings && (
                <div className="sub-links">
                  <Link href="/settings">
                    <span className={active === "settings" ? "active" : ""}>
                      Availabilities
                    </span>
                  </Link>
                  <Link href="/event-types">
                    <span className={active === "eventtypes" ? "active" : ""}>
                      Event Types
                    </span>
                  </Link>
                  <Link href="/settings/calendar">
                    <span className={active === "cal-sync" ? "active" : ""}>
                      Cal Sync
                    </span>
                  </Link>
                </div>
              )}
              <Link href="/public-profile">
                <a className={active === "profile" ? "active" : ""}>
                  <span>Public Profile</span>
                </a>
              </Link>
              <Link href="/dashboard">
                <a className={active === "dashboard" ? "active" : ""}>
                  <span>Dashboard</span>
                </a>
              </Link>
              <a onClick={() => setPayment(!payment)}>
                <span style={{ paddingRight: "15px" }}>Payment</span>
                {payment ? (
                  <FaChevronUp size={14} />
                ) : (
                  <FaChevronDown size={14} />
                )}
              </a>
              {payment && (
                <div className="sub-links">
                  <Link href="/payment">
                    <span className={active === "payments" ? "active" : ""}>
                      Balance
                    </span>
                  </Link>
                  <Link href="/payment-details">
                    <span
                      className={active === "payment-details" ? "active" : ""}
                    >
                      Details
                    </span>
                  </Link>
                </div>
              )}
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
