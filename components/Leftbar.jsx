// libraries
import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsCaretDownFill, BsFillCaretUpFill, BsDot } from "react-icons/bs";
import { FaChartLine } from "react-icons/fa";

// context
import ProfileContext from "../context/profile";

const Leftbar = ({ active }) => {
  // state
  const [activities, setActivities] = useState(false);
  const [settings, setSettings] = useState(false);
  const [payments, setPayments] = useState(false);

  // context
  const { slugData } = useContext(ProfileContext);

  // router
  const router = useRouter();

  useEffect(() => {
    if (
      active === "appointments" ||
      active === "answers" ||
      active === "requests"
    ) {
      setActivities(true);
    } else if (active === "payment-details" || active === "payments") {
      setPayments(true);
    } else if (
      active === "cal-sync" ||
      active === "eventtypes" ||
      active === "settings"
    ) {
      setSettings(true);
    }
  }, []);

  return (
    <div className="side-nav">
      <nav>
        <Link href="/">
          <a className={active === "" ? "active" : ""}>
            <img src="/img/nav-home.svg" alt="" />
            <span>Home</span>
          </a>
        </Link>
        <a
          onClick={() => setActivities(!activities)}
          style={{ cursor: "pointer" }}
        >
          <img src="/img/nav-appointments.svg" alt="" />
          <span>Activities</span>
          {activities ? (
            <BsFillCaretUpFill className="leftbar-icon" />
          ) : (
            <BsCaretDownFill className="leftbar-icon" />
          )}
        </a>
        {activities && (
          <div className="nav-sub-links">
            <Link href="/appointments">
              <p
                style={{
                  background: `${
                    active === "appointments"
                      ? "rgba(0,0,0,0.15)"
                      : "transparent"
                  }`,
                }}
              >
                <BsDot /> Calendar
              </p>
            </Link>
            <Link href="/appointments/requests">
              <p
                style={{
                  background: `${
                    active === "requests" ? "rgba(0,0,0,0.15)" : "transparent"
                  }`,
                }}
              >
                <BsDot /> Requests
              </p>
            </Link>
            <Link href="/appointments/answers">
              <p
                style={{
                  background: `${
                    active === "answers" ? "rgba(0,0,0,0.15)" : "transparent"
                  }`,
                }}
              >
                <BsDot /> Answers
              </p>
            </Link>
          </div>
        )}
        <a onClick={() => setSettings(!settings)} style={{ cursor: "pointer" }}>
          <img src="/img/nav-settings.svg" alt="" />
          <span>Settings</span>
          {settings ? (
            <BsFillCaretUpFill className="leftbar-icon" />
          ) : (
            <BsCaretDownFill className="leftbar-icon" />
          )}
        </a>
        {settings && (
          <div className="nav-sub-links">
            <Link href="/settings">
              <p
                style={{
                  background: `${
                    active === "settings" ? "rgba(0,0,0,0.15)" : "transparent"
                  }`,
                }}
              >
                <BsDot /> Availabilities
              </p>
            </Link>
            <Link href="/event-types">
              <p
                style={{
                  background: `${
                    active === "eventtypes" ? "rgba(0,0,0,0.15)" : "transparent"
                  }`,
                }}
              >
                <BsDot /> Event Types
              </p>
            </Link>
            <Link href="/cal-sync">
              <p
                style={{
                  background: `${
                    active === "cal-sync" ? "rgba(0,0,0,0.15)" : "transparent"
                  }`,
                }}
              >
                <BsDot /> Cal Sync
              </p>
            </Link>
          </div>
        )}
        <Link href="/public-profile">
          <a className={active === "profile" ? "active" : ""}>
            <img src="/img/nav-profile.svg" alt="" />
            <span>Public Profile</span>
          </a>
        </Link>
        {/* <div className="space"></div> */}
        <Link href="/dashboard">
          <a className={active === "dashboard" ? "active" : ""}>
            <FaChartLine
              color="white"
              style={{ marginRight: "8px" }}
              size={17}
            />
            <span>Dashboard</span>
          </a>
        </Link>
        <a onClick={() => setPayments(!payments)} style={{ cursor: "pointer" }}>
          <img src="/img/nav-payments.svg" alt="" />
          <span>Payment</span>
          {payments ? (
            <BsFillCaretUpFill className="leftbar-icon" />
          ) : (
            <BsCaretDownFill className="leftbar-icon" />
          )}
        </a>
        {payments && (
          <div className="nav-sub-links">
            <Link href="/payment">
              <p
                style={{
                  background: `${
                    active === "payments" ? "rgba(0,0,0,0.15)" : "transparent"
                  }`,
                }}
              >
                <BsDot /> Balance
              </p>
            </Link>
            <Link href="/payment-details">
              <p
                style={{
                  background: `${
                    active === "payment-details"
                      ? "rgba(0,0,0,0.15)"
                      : "transparent"
                  }`,
                }}
              >
                <BsDot /> Details
              </p>
            </Link>
          </div>
        )}
        <Link href="/support">
          <a className={active === "contact" ? "active" : ""}>
            <img src="/img/nav-contact.svg" alt="" />
            <span>Support</span>
          </a>
        </Link>
      </nav>
      <Link href="/account">
        <div className="side-nav__profile">
          <div className="side-nav__profile-pic ">
            <img
              style={{ objectPosition: "top" }}
              src={slugData?.public_image ?? "/img/profile-pic.png"}
              alt=""
            />
          </div>
          <span>Account</span>
        </div>
      </Link>
    </div>
  );
};

export default Leftbar;
