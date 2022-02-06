// libraries
import React, { useState } from 'react';

// styles
import styles from './styles.module.sass';

// components
import Form from '../Form';
import FormOther from '../FormOther';

const index = ({ setTab, setRefetch }) => {
  const [ status, setStatus ] = useState(0)

  return (
    <div className={styles.content}>
      <div className={styles.sections}>
        {
          status === 0 ?
            <div className={styles.status_wrap}>
              <h1>New Product</h1>
              <p onClick={() => setStatus(1)}>Amazon affiliate product</p>
              <p onClick={() => setStatus(2)}>Other affiliate product</p>
            </div>
          : status === 1 ?
            <Form setTab={setTab} setRefetch={setRefetch} setStatus={setStatus}/>
          :
            <FormOther setTab={setTab} setRefetch={setRefetch} setStatus={setStatus}/>
        }
      </div>
    </div>
  );
};

export default index;
