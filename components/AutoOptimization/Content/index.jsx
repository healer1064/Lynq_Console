// libraries
import { useState } from 'react';
import Link from 'next/link';
import Grid from "@material-ui/core/Grid";

// styles
import styles from './styles.module.sass';

// icons
import { CaretDownOutlined } from '@ant-design/icons';

// components
import { Dropdown, Button, Tabs } from 'antd';
import List from '@/components/MyPage/ExclusiveContent/List';
import Setup from '../Setup';
import History from '../History';

const index = ({ list, refreshResponse }) => {
  // states
  const [filter, setFilter] = useState('All');
  const [add, setAdd] = useState(false);

  // tabs
  const { TabPane } = Tabs;

  return (
    <Grid container spacing={1} className={styles.exclusive_wrap}>
      <Grid item xs={12} sm={12} md={12}>        
        <Link href={`/my-page`}>
          <div className={styles.back_btn_div}>
            <img src="/svg/arrow-back.svg" alt="arrow-back"/>
            <p>Auto Optimization</p>
          </div>
        </Link>
        <div className={styles.profile_div}>
          <Tabs defaultActiveKey='1'>
            <TabPane tab='Set Up' key='1'>
              <Setup refreshResponse={refreshResponse}/>
            </TabPane>
            <TabPane tab='History' key='2'>
              <History />
            </TabPane>
          </Tabs>
        </div>
      </Grid>
    </Grid>
  );
};

export default index;
