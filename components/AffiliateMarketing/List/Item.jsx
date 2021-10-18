// libraries
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import Fade from 'react-reveal/Fade';

// styles
import styles from './styles.module.sass';

// icons
import { CaretRightOutlined } from '@ant-design/icons';

// components
import Modal from '@/components/common/Modal';

const Item = () => {
  // router
  const router = useRouter();

  // states
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  return (
    <>
      <Fade duration={800} delay={50}>
        <div
          onClick={() => router.push(`/pay-per-download/123`)}
          className={styles.item}
        >
          <p>Test</p>
          <p>Document</p>
          <p>08/12//2021</p>
          <p>Active</p>
          <p>$150</p>
          {/* <p>45</p> */}
          <p>$6,750</p>
          <CaretRightOutlined
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#7e88f4',
            }}
          />
        </div>
      </Fade>
    </>
  );
};

export default Item;
