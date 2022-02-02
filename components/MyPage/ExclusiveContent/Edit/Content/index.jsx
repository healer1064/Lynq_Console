// libraries
import React from 'react';

// styles
import styles from './styles.module.sass';

// components
import Form from '../Form';

const index = ({ list }) => {
  return (
    <div className={styles.content}>
      <div className={styles.sections}>
        <Form data={list} />
      </div>
    </div>
  );
};

export default index;
