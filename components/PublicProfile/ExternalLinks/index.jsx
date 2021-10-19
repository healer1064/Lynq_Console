// libraries
import React, { useState } from 'react';

// styles
import styles from './styles.module.scss';

// components
import AddNewButton from '@/components/common/AddButton';
import AddModal from './AddModal';
import List from './List';
import PageLoading from '@/components/common/PageLoading';

const index = ({ externalLinks, refetchData }) => {
  // states
  const [showModal, setShowModal] = useState(false);

  return !externalLinks ? (
    <PageLoading />
  ) : (
    <>
      <div className={styles.external_links}>
        <AddNewButton
          title='New Button'
          style={{ width: '180px' }}
          onClick={() => setShowModal(true)}
        />
        <List list={externalLinks} refetchData={refetchData} />
      </div>
      {showModal && <AddModal setShowModal={setShowModal} />}
    </>
  );
};

export default index;
