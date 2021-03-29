// libraries
import { useContext } from "react";
import Link from "next/link";

// context
import ProfileContext from "../context/profile";

const Leftbar = ({ active }) => {
  // context
  const { profile, slugData } = useContext(ProfileContext);

  return (
    <div className="side-nav">
      <nav>
        <Link href="/">
          <a className={active === "" ? "active" : ""}>
            <img src="/img/nav-home.svg" alt="" />
            <span>Home</span>
          </a>
        </Link>
        <Link href="/appointments">
          <a className={active === "appointments" ? "active" : ""}>
            <img src="/img/nav-appointments.svg" alt="" />
            <span>Appointments</span>
          </a>
        </Link>
        <Link href="/public-profile">
          <a className={active === "profile" ? "active" : ""}>
            <img src="/img/nav-profile.svg" alt="" />
            <span>Public Profile</span>
          </a>
        </Link>
        <div className="space"></div>
        <Link href="/settings">
          <a className={active === "settings" ? "active" : ""}>
            <img src="/img/nav-settings.svg" alt="" />
            <span>Settings</span>
          </a>
        </Link>
        <Link href="/clients">
          <a className={active === "clients" ? "active" : ""}>
            <img src="/img/nav-clients.svg" alt="" />
            <span>Clients</span>
          </a>
        </Link>
        <Link href="/payment">
          <a className={active === "payments" ? "active" : ""}>
            <img src="/img/nav-payments.svg" alt="" />
            <span>Payment</span>
          </a>
        </Link>
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
          <span>{profile?.fullname ?? "Username"}</span>
        </div>
      </Link>
    </div>
  );
};

export default Leftbar;
