// libraries
import React from 'react';
import Fade from 'react-reveal/Fade';

// styles
import styles from './styles.module.sass';

// components
import { Tabs } from 'antd';
import Request from '../Request';
import History from '../History';
import BusinessPayments from '../../../Account/BusinessPayments';

const index = ({ payments, toggleResponse, business }) => {
  // tabs pane
  const { TabPane } = Tabs;

  return (
    <Fade>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Payments' key='1'>
          <div className={styles.payment}>
            <Request data={payments} toggleResponse={toggleResponse} />
            <History data={payments.transfer_history} />
          </div>
        </TabPane>
        <TabPane tab='Bank account'>
          <div className={styles.business}>
            <BusinessPayments
              business={business}
              toggleSuccess={toggleResponse}
            />
          </div>
        </TabPane>
      </Tabs>
    </Fade>
  );
};

export default index;
