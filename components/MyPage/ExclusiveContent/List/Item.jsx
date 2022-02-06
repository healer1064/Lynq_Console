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
          // onClick={() => router.push(`/pay-per-download/${data.id}`)}
          className={styles.item}
        >
          {/*<p>{data.description}</p>*/}
          {data.path.includes('.png') ||
          data.path.includes('.jpg') ||
          data.path.includes('.jpeg')
            ? <img src={data.path}/>
            : data.path.includes('.mp4' || '.avi' || '.mov')
            ? <video controls width="192" height="138" className="content-image">
                <source src={data.path} type="video/mp4"></source>
              </video>
            : data.path.includes('.pdf')
            ? 'Document'
            : '-'}
          {/*<p>{moment(data.creationDate).format('MMMM DD,yyyy')}</p>
          <p>-</p>
          <p>{data.price ? '$' + data.price : '-'}</p>
          />*/}
        </div>
      </Fade>
    </>
  );
};

export default Item;
