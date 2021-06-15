// libraries
import React from "react";

// styles
import styles from "./styles.module.sass";

// components
import Navigation from "../Navigation";
import Subscription from "../Subscription";
import PersonalInformation from "../PersonalInformation";
import BusinessPayments from "../BusinessPayments";
import ChangePassword from "../ChangePassword";

const index = ({ profile, business, toggleSuccess }) => {
  return (
    <div className={styles.account}>
      <div className={styles.content}>
        <Navigation />
        <div className={styles.account_info}>
          <Subscription />
          <PersonalInformation
            profile={profile}
            toggleSuccess={toggleSuccess}
          />
          <BusinessPayments business={business} toggleSuccess={toggleSuccess} />
          <ChangePassword />
        </div>
      </div>
    </div>
  );
};

export default index;
