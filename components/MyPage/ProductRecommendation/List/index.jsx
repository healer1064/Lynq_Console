// libraries
import React from 'react';

// styles
import styles from './styles.module.sass';

// components
import EmptyData from '@/components/common/EmptyData';
import Item from './Item';

const index = ({ list }) => {
  return list.length === 0 ? (
    <div className={styles.no_appointments}>
      <EmptyData title='The list is empty' />
    </div>
  ) : (
    <div className={styles.list}>
      {list.map((item, index) => (
        <Item data={item} key={index} />
      ))}
    </div>
  );
};

export default index;
