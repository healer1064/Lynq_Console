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

  // useEffect(() => {
  //   if (
  //     active === "appointments" ||
  //     active === "answers" ||
  //     active === "requests"
  //   ) {
  //     setActivities(true);
  //   } else if (active === "payment-details" || active === "payments") {
  //     setPayments(true);
  //   } else if (
  //     active === "cal-sync" ||
  //     active === "eventtypes" ||
  //     active === "settings"
  //   ) {
  //     setSettings(true);
  //   }
  // }, []);

  return (
    <div className="side-nav">
      <nav>
        <Link href="/">
          <a className={router.pathname === "/" ? "active" : ""}>
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
                    router.pathname === "/appointments" ? "#717BE4" : ""
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
                    router.pathname === "/appointments/requests"
                      ? "#717BE4"
                      : ""
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
                    router.pathname === "/appointments/answers" ? "#717BE4" : ""
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
                    router.pathname === "/settings" ? "#717BE4" : ""
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
                    router.pathname === "/event-types" ? "#717BE4" : ""
                  }`,
                }}
              >
                <BsDot /> Event Types
              </p>
            </Link>
            <Link href="/settings/calendar">
              <p
                style={{
                  background: `${
                    router.pathname === "/settings/calendar" ? "#717BE4" : ""
                  }`,
                }}
              >
                <BsDot /> Cal Sync
              </p>
            </Link>
          </div>
        )}
        <Link href="/public-profile">
          <a className={router.pathname === "/public-profile" ? "active" : ""}>
            <img src="/img/nav-profile.svg" alt="" />
            <span>Public Profile</span>
          </a>
        </Link>
        {/* <div className="space"></div> */}
        <Link href="/dashboard">
          <a className={router.pathname === "/dashboard" ? "active" : ""}>
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
                    router.pathname === "/payment" ? "#717BE4" : ""
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
                    router.pathname === "/payment-details" ? "#717BE4" : ""
                  }`,
                }}
              >
                <BsDot /> Details
              </p>
            </Link>
          </div>
        )}
        <Link href="/support">
          <a className={router.pathname === "/support" ? "active" : ""}>
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
