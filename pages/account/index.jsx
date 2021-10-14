// libraries
import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import { toast } from 'react-toastify';

// context
import ProfileContext from '@/context/profile';

// requests
import { getBusinessReq, getProfileReq } from '@/utils/requests/account';

// components
import Content from '@/components/Account/Content';
import PageLoading from '../../components/common/PageLoading';

const Account = () => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [profile, setProfile] = useState(null);
  const [business, setBusiness] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (token) {
      getProfileReq(token)
        .then((res) => {
          setProfile(res);
        })
        .catch(() => toast.error('Failed to get profile information!'));
      // getBusinessReq(token)
      //   .then((res) => {
      //     setBusiness(res);
      //   })
      //   .catch(() => toast.error("Failed to get business information!"));
    }
  }, [token, success]);

  const toggleSuccess = () => {
    setSuccess((prev) => !prev);
  };

  return (
    <>
      <Head>
        <title>Account | Lynq</title>
      </Head>
      <div className='content-wrp'>
        {!profile ? (
          // || !business
          <PageLoading />
        ) : (
          <Content
            profile={profile}
            // business={business}
            toggleSuccess={toggleSuccess}
          />
        )}
      </div>
    </>
  );
};

export default Account;
