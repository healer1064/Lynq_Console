// libraries
import React from 'react';

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
  // business,
  toggleSuccess,
}) => {
  // tabs pane
  const { TabPane } = Tabs;

  return (
    <div className={styles.account}>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='General' key='1'>
          <div className={styles.content}>
            {/* <Navigation /> */}
            <div className={styles.account_info}>
              <Subscription />
              <PersonalInformation
                profile={profile}
                toggleSuccess={toggleSuccess}
              />
              {/* <BusinessPayments
                business={business}
                toggleSuccess={toggleSuccess}
              /> */}
              <ChangePassword />
            </div>
          </div>
        </TabPane>
        <TabPane tab='Support' key='2'>
          <Support />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default index;
