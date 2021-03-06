// libraries
import { useState } from 'react';
import Link from 'next/link';

// styles
import styles from './styles.module.sass';

// icons
import { CaretDownOutlined } from '@ant-design/icons';

// components
import { Dropdown, Button, Tabs } from 'antd';
import New from '../New/Content';
import DropdownMenu from '@/components/common/DropdownMenu';
import List from '@/components/PayperDownload/List';

const index = ({ list, refreshResponse }) => {
  // states
  const [filter, setFilter] = useState('All');

  // tabs
  const { TabPane } = Tabs;

  return (
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
  );
};

export default index;
