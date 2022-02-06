// libraries
import React from 'react';
import Fade from 'react-reveal/Fade';
import Link from "next/link";

// styles
import styles from './styles.module.sass';

// components
import { Tabs } from 'antd';
import Navigation from '../Navigation';
import Subscription from '../Subscription';
import PersonalInformation from '../PersonalInformation';
import BusinessPayments from '../BusinessPayments';
import ChangePassword from '../ChangePassword';
import Support from '../../Support/Content';

const index = ({
  profile,
  business,
  toggleSuccess,
}) => {
  // tabs pane
  const { TabPane } = Tabs;

  return (
    <div className={styles.setting_wrap}>
      <Fade>
        <Link href={`/my-page`}>
          <div className={styles.back_btn_div}>
            <img src="/svg/arrow-back.svg" alt="arrow-back"/>
            <p>Setting</p>
          </div>
        </Link>
        <div className={styles.account}>
          <Tabs defaultActiveKey='1'>
            <TabPane tab='Bank Info' key='1'>
              <div className={styles.content}>
                {/* <Navigation /> */}
                <div className={styles.account_info}>
                  {/* <Subscription /> */}
                  {/* <PersonalInformation
                    profile={profile}
                    toggleSuccess={toggleSuccess}
                  /> */}
                  <BusinessPayments
                    business={business}
                    toggleSuccess={toggleSuccess}
                  />
                </div>
              </div>
            </TabPane>
            <TabPane tab='Account' key='2'>
              <ChangePassword />
            </TabPane>
          </Tabs>
        </div>
      </Fade>
    </div>
  );
};

export default index;
