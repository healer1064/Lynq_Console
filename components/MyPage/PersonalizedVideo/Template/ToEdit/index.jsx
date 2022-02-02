// libraries
import React from 'react';
import { Tooltip } from 'antd';

// icons
import { BsExclamationCircleFill } from 'react-icons/bs';

// styles
import styles from './styles.module.sass';

const index = ({ setState, data }) => {
  return (
    <div className={styles.content}>
      <label>
        Maximum delivery{' '}
        <span>
          {data[0]
            ? data[0].maxResponseDelay
              ? data[0].maxResponseDelay
              : 0
            : 0}{' '}
          days
        </span>
      </label>
      <label>
        Price <span>${data[0] ? (data[0].price ? data[0].price : 0) : 0}</span>
      </label>
      <label className={styles.listing}>
        <h6>
          Listing Price{' '}
          <Tooltip
            className={styles.tooltip}
            title="The price a customer pays to purchase the service and that
            includes Lynq's fees."
          >
            <BsExclamationCircleFill />
          </Tooltip>
        </h6>{' '}
        <span>
          ${data[0] ? (data[0].pricing ? data[0].pricing.total : 0) : 0}
        </span>
      </label>
      <div className={styles.desc_box}>
        <label htmlFor='desc'>Description</label>
        <textarea
          disabled
          id='desc'
          maxLength='700'
          value={
            data[0] ? (data[0].description ? data[0].description : '') : ''
          }
        ></textarea>
      </div>
      <button onClick={() => setState(0)}>Edit</button>
    </div>
  );
};

export default index;
