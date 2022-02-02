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
import New from '../New/Content';
import DropdownMenu from '@/components/common/DropdownMenu';
import List from '@/components/MyPage/ExclusiveContent/List';

const index = ({ list, refreshResponse }) => {
  // states
  const [filter, setFilter] = useState('All');

  // tabs
  const { TabPane } = Tabs;

  return (
    <Grid container spacing={1} className={styles.exclusive_wrap}>
      <Grid item xs={12} sm={12} md={12}>        
        <Link href={`/my-page`}>
          <div className={styles.back_btn_div}>
            <img src="/svg/arrow-back.svg" alt="arrow-back"/>
            <p>Exclusive Content</p>
          </div>
        </Link>
        <div className={styles.profile_div}>
          <Tabs defaultActiveKey='1'>
            <TabPane tab='Catalog' key='1'>
              <Dropdown
                arrow
                overlay={
                  <DropdownMenu
                    state={filter}
                    setState={setFilter}
                    data={['All', 'Video', 'Picture']}
                  />
                }
                placement='bottomCenter'
              >
                <Button className={styles.dropdown_btn} size='large'>
                  {filter} <CaretDownOutlined />
                </Button>
              </Dropdown>
              <List list={list} filter={filter} />
            </TabPane>
            <TabPane tab='New content' key='2'>
              <New refreshResponse={refreshResponse} />
            </TabPane>
          </Tabs>
        </div>
      </Grid>
    </Grid>
  );
};

export default index;
