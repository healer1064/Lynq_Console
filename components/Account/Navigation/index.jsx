// libraries
import { useState, useEffect } from "react";

// styles
import styles from "./styles.module.sass";

const index = () => {
  // states
  const [section, setSection] = useState("plans");

  useEffect(() => {
    if (section == "plans") {
      window.scrollTo({ top: "0", left: "0", behavior: "smooth" });
    } else if (section == "personal") {
      window.scrollTo({ top: "100", left: "0", behavior: "smooth" });
    } else if (section == "payments") {
      window.scrollTo({ top: "550", left: "0", behavior: "smooth" });
    } else {
      window.scrollTo({ top: "800", left: "0", behavior: "smooth" });
    }
  }, [section]);

  return (
    <>
      <div className={styles.side_nav}>
        <div onClick={() => setSection("plans")}>
          <img src="/img/account-send.svg" alt="current-plan" />
          <p>Current Plan</p>
        </div>
        <div onClick={() => setSection("personal")}>
          <img src="/img/account-send.svg" alt="current-plan" />
          <p>Personal Information</p>
        </div>
        <div onClick={() => setSection("payments")}>
          <img src="/img/account-send.svg" alt="current-plan" />
          <p>Business & Payments</p>
        </div>
        <div className={styles.last} onClick={() => setSection("password")}>
          <img src="/img/account-send.svg" alt="current-plan" />
          <p>Change Password</p>
        </div>
      </div>
      <select
        value={section}
        onChange={(e) => setSection(e.target.value)}
        className={styles.side_nav_mob}
      >
        <option value="plans">Current Plan</option>
        <option value="personal">Personal Information</option>
        <option value="payments">Business & Payments</option>
        <option value="password">Change Password</option>
      </select>
    </>
  );
};

export default index;
