// libraries
import React from 'react';
import Fade from 'react-reveal/Fade';
import Grid from "@material-ui/core/Grid";
import Link from "next/link";

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
  const test_data = [
    { requestDate : '2022-01-02', transferNumber : 'X92jj56', amount : '492.25', status : 'PAID'},
    { requestDate : '2022-01-02', transferNumber : 'X92jj56', amount : '492.25', status : 'PAID'},
    { requestDate : '2022-01-02', transferNumber : 'X92jj56', amount : '492.25', status : 'PAID'}
  ]
  
  return (
    <div className={styles.payment_wrap}>
      <Fade>
        <Link href={`/my-page`}>
          <div className={styles.back_btn_div}>
            <img src="/svg/arrow-back.svg" alt="arrow-back"/>
            <p>Earnings</p>
          </div>
        </Link>
        <div className={styles.profile_div}>
          {/* <Tabs defaultActiveKey='1'>
            <TabPane tab='Payments' key='1'> */}
              <div className={styles.payment}>
                <Request data={payments} toggleResponse={toggleResponse} />
                <History data={ test_data } />
                {/* <History data={ payments.transfer_history} /> */}
              </div>
            {/* </TabPane>
            <TabPane tab='Bank account'>
              <div className={styles.business}>
                <BusinessPayments
                  business={business}
                  toggleSuccess={toggleResponse}
                />
              </div>
            </TabPane>
          </Tabs> */}
        </div>
      </Fade>
    </div>
  );
};

export default index;
