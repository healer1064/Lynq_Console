// libraries
import React from 'react';

// styles
import styles from './styles.module.sass';

// components
import EmptyData from '@/components/common/EmptyData';
import Head from './Head';
import Item from './Item';

const index = ({ list }) => {
  return list.length === 0 ? (
    <div className={styles.no_appointments}>
      <EmptyData title='No masterclasses to show' />
    </div>
  ) : (
    <div className={styles.list}>
      <Head />
      {list.map((item, index) => (
        <Item data={item} key={index} />
      ))}
    </div>
  );
};

export default index;
