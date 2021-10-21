// libraries
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import Fade from 'react-reveal/Fade';

// context
import ProfileContext from '@/context/profile';

// styles
import styles from './styles.module.sass';

// requests
import { deleteExclusiveContentReq } from '@/utils/requests/exclusive-content';

// components
import Modal from '@/components/common/Modal';
import { toast } from 'react-toastify';

const index = ({ data }) => {
  // context
  const { token } = useContext(ProfileContext);

  // router
  const router = useRouter();

  // states
  const [deleteModal, setDeleteModal] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  // handle reject
  const handleReject = (_data) => {
    setRejectLoading(true);
    deleteExclusiveContentReq(token, _data.id)
      .then((res) => {
        setRejectLoading(false);
        if (res.status === 200) {
          setDeleteModal(false);
          router.back();
        } else {
          toast.error(`Failed to delete exclusive content`);
        }
      })
      .catch(() => {
        setRejectLoading(false);
        toast.error(`Failed to delete exclusive content`);
      });
  };

  console.log(data);

  return (
    <>
      <Fade>
        <div className={styles.request}>
          <h2>Exclusive Content</h2>
          <span className={styles.received_time}>
            Creation date: {moment(data.creationDate).format('MMMM DD, yyyy')}
          </span>
          <div className={styles.info_col}>
            <strong>Title</strong>
            <p>{data.description || '0'}</p>
          </div>
          <div className={styles.info_col}>
            <strong>Price</strong>
            <p>${data.price || '0'}</p>
          </div>
          <div className={styles.info_col}>
            <strong>File</strong>
            <img src={data.thumbnailPath} alt='thumbnail' />
          </div>
          <div className={styles.btns}>
            <button
              className={styles.delete}
              onClick={() => setDeleteModal(true)}
            >
              DELETE
            </button>
            <button
              className={styles.reject}
              onClick={() => router.push(`/pay-per-download/${data.id}/edit`)}
            >
              EDIT
            </button>
          </div>
        </div>
      </Fade>
      {deleteModal && (
        <Modal
          setModal={setDeleteModal}
          title='Delete exclusive content'
          buttonText='Delete'
          loading={rejectLoading}
          onDelete={() => handleReject(data)}
          type='ppd'
        />
      )}
    </>
  );
};

export default index;
