// libraries
import Head from 'next/head';
import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

// context
import ProfileContext from '@/context/profile';

// requests
import { getPaymentsReq } from '@/utils/requests/payment/balance';
import { getBusinessReq } from '@/utils/requests/account';

// components
import PageLoading from '@/components/common/PageLoading';
import Content from '@/components/MyPage/SocialLink';

export default function Payment() {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [payments, setPayments] = useState(null);
  const [business, setBusiness] = useState(null);
  const [response, setResponse] = useState(false);

  useEffect(() => {
    if (token) {
      getPaymentsReq(token)
        .then((res) => {
          setPayments(res);
        })
        .catch(() => toast.error('Failed to fetch payment balance!'));
      getBusinessReq(token)
        .then((res) => {
          setBusiness(res);
        })
        .catch(() => toast.error('Failed to get business information!'));
    }
  }, [token, response]);

  // refresh payment
  const toggleResponse = () => {
    setResponse((prevState) => !prevState);
  };

  return (
    <>
      <Head>
        <title>Social link | Lynq</title>
      </Head>
      <div className='content-wrp '>
        {!payments ? (
          <PageLoading />
        ) : (
          <Content
            payments={payments}
            toggleResponse={toggleResponse}
            business={business}
          />
        )}
      </div>
    </>
  );
}
