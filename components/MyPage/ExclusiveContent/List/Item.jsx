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

const Item = ({ data }) => {
  // router
  const router = useRouter();

  // states
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  console.log(data);

  return (
    <>
      <Fade duration={800} delay={50}>
        <div
          onClick={() => router.push(`/pay-per-download/${data.id}`)}
          className={styles.item}
        >
          <p>{data.description}</p>
          <p>
            {data.path.includes('.png') ||
            data.path.includes('.jpg') ||
            data.path.includes('.jpeg')
              ? 'Picture'
              : data.path.includes('.mp4' || '.avi' || '.mov')
              ? 'Video'
              : data.path.includes('.pdf')
              ? 'Document'
              : '-'}
          </p>
          <p>{moment(data.creationDate).format('MMMM DD,yyyy')}</p>
          <p>-</p>
          <p>{data.price ? '$' + data.price : '-'}</p>
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
