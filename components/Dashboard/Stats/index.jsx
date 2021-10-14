// libraries
import React from 'react';

// styles
import styles from './styles.module.scss';

// icons
import { CaretDownOutlined } from '@ant-design/icons';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FaBook } from 'react-icons/fa';

// components
import { Dropdown, Button } from 'antd';
import DropdownMenu from './DropdownMenu';
import Item from './Item';

const index = ({ data, period, setPeriod }) => {
  return (
    <div className={styles.stats}>
      <div className={styles.head}>
        <Dropdown
          arrow
          overlay={<DropdownMenu state={period} setState={setPeriod} />}
          placement='bottomCenter'
        >
          <Button className={styles.dropdown_btn} size='large'>
            <AiOutlineCalendar /> {period} <CaretDownOutlined />
          </Button>
        </Dropdown>
      </div>
      <div className={styles.list}>
        <Item
          name='Total revenue'
          number={`$${data.global.revenue}`}
          percent='+8.85'
          image='/img/dashboard-dollar.svg'
          trend='up'
        />
        <Item
          name='Profile visits'
          number={data.global.clicks}
          percent='-7.78'
          image='/img/dashboard-trend.svg'
          trend='down'
        />
      </div>
      <div className={styles.list}>
        <Item
          name='Clicks on 1:1 video calls'
          number={data.private_session.clicks}
          percent='+11.3'
          image='/img/dashboard-click.svg'
          trend='up'
          type='1-1'
          order={1}
          row='upper'
        />
        <Item
          name='Clicks on masterclasses'
          number={data.masterclass.clicks}
          percent='+11.3'
          image='/img/dashboard-click.svg'
          trend='up'
          type='masterclass'
          order={2}
          row='upper'
        />
        <Item
          name='Clicks on video messages'
          number={data.message.clicks}
          percent='+11.3'
          image='/img/dashboard-click.svg'
          trend='up'
          type='message'
          order={3}
          row='upper'
        />
        <Item
          name='Total 1:1 video calls purchased'
          number={data.private_session.revenue}
          percent='+11.3'
          image='/img/dashboard-cart.svg'
          trend='up'
          type='1-1'
          order={11}
          row='lower'
        />
        <Item
          name='Total masterclasses purchased'
          number={data.masterclass.revenue}
          percent='+11.3'
          image='/img/dashboard-cart.svg'
          trend='up'
          type='masterclass'
          order={12}
          row='lower'
        />
        <Item
          name='Total video messages purchased'
          number={data.message.revenue}
          percent='+11.3'
          image='/img/dashboard-cart.svg'
          trend='up'
          type='message'
          order={13}
          row='lower'
        />
      </div>
      <div className={styles.list}>
        <Item
          name='Clicks on On-demand content'
          number='-'
          image='/img/dashboard-click.svg'
        />
        <Item
          name='Total eBooks sold'
          number='-'
          image='/img/dashboard-ebook.svg'
        />
        <Item
          name='Revenue from eBools'
          number='$ -'
          image='/img/dashboard-ebook.svg'
        />
      </div>
      <div className={styles.list}>
        <Item
          name='Clicks on "Name of the button"'
          number='-'
          image='/img/dashboard-click.svg'
        />
      </div>
      <div className={styles.list}>
        <Item
          name='Clicks on ”Name of the product”'
          number='-'
          image='/img/dashboard-click.svg'
        />
      </div>
    </div>
  );
};

export default index;
