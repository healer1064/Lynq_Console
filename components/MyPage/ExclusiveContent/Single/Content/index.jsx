// libraries
import React from 'react';
import { useRouter } from 'next/router';

// styles
import styles from './styles.module.sass';

// icons
import { BsChevronLeft } from 'react-icons/bs';

// components
import Form from '../Form';
import DropArea from '../DropArea';

const index = ({ list }) => {
  // router
  const router = useRouter();

  return (
    <div className={styles.content}>
      <a className={styles.back} onClick={() => router.back()}>
        <BsChevronLeft /> Back
      </a>
      <div className={styles.sections}>
        <Form data={list} />
        {/* <DropArea /> */}
      </div>
    </div>
  );
};

export default index;
