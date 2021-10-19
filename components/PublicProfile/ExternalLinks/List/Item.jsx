// libraries
import React, { useState, useContext } from 'react';
import Fade from 'react-reveal/Fade';

// styles
import styles from './styles.module.sass';

// context
import ProfileContext from '@/context/profile';

// requests
import { putLinkReq, deleteLinkReq } from '@/utils/requests/public-profile';

// icons
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';

// components
import { Switch } from 'antd';
import { toast } from 'react-toastify';
import AddModal from '../AddModal';

const Item = ({ data, index, refetchData }) => {
  // states
  const [status, setStatus] = useState(data.is_enable);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // context
  const { token } = useContext(ProfileContext);

  function onChange(checked) {
    setStatus(checked);
    putLinkReq(token, data.id, { ...data, is_enable: checked })
      .then((res) => {
        console.log(res);
        refetchData();
      })
      .catch(() => toast.error('An error has occurred.'));
  }

  const handleDelete = () => {
    setLoading(true);
    deleteLinkReq(token, data.id)
      .then(() => {
        setLoading(false);
        refetchData();
      })
      .catch(() => {
        setLoading(false);
        toast.error('An error has occurred.');
      });
  };

  return (
    <>
      <Fade duration={800} delay={50}>
        <div className={styles.item}>
          <p>{index + 1}</p>
          <Switch
            onChange={onChange}
            checked={status}
            style={{ width: '10px', borderRadius: '50px', padding: '0' }}
          />
          <p>{data.name}</p>
          <div className={styles.icons}>
            <FiEdit onClick={() => setShowModal(true)} />
            {loading ? (
              <img
                className={styles.loading}
                src='/img/Rolling-dark.svg'
                alt='rolling'
              />
            ) : (
              data.type !== 'internal' && <MdDelete onClick={handleDelete} />
            )}
          </div>
        </div>
      </Fade>
      {showModal && <AddModal setShowModal={setShowModal} />}
    </>
  );
};

export default Item;
