// libraries
import React, { useState, useEffect, useContext } from 'react';
import router from 'next/router';
import { toast } from 'react-toastify';

// styles
import styles from './styles.module.sass';

// context
import ProfileContext from '@/context/profile';

// requests
import { getAffiliateMarketingReq } from '@/utils/requests/affiliate-marketing';

// components
import Form from '../Form';
import PageLoading from '@/components/common/PageLoading';

// icons
import { BsChevronLeft } from 'react-icons/bs';

const index = () => {
  // states
  const [data, setData] = useState(null);

  // context
  const { token, profile } = useContext(ProfileContext);

  // params
  const { id } = router.query;

  useEffect(() => {
    if (profile?.id) {
      getAffiliateMarketingReq(profile.id)
        .then((res) => setData(res.filter((item) => item.id == id)[0]))
        .catch(() => toast.error('An error has occurred.'));
    }
  }, [profile?.id]);

  return (
    <div className={styles.content}>
      <a
        className={styles.back}
        onClick={() => router.push('/affiliate-marketing')}
      >
        <BsChevronLeft /> Back
      </a>
      {!data ? (
        <PageLoading />
      ) : (
        <div className={styles.sections}>
          <Form data={data} />
        </div>
      )}
    </div>
  );
};

export default index;
