// libraries
import React from 'react';

// styles
import styles from './styles.module.sass';

// components
import Form from '../Form';

const index = ({ setTab, setRefetch }) => {
  return (
    <div className={styles.content}>
      <div className={styles.sections}>
        <Form setTab={setTab} setRefetch={setRefetch} />
      </div>
    </div>
  );
};

export default index;
