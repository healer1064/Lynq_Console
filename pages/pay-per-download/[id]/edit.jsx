// libraries
import { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import { toast } from 'react-toastify';
import router from 'next/router';

// context
import ProfileContext from '@/context/profile';

// utils
import { getExclusiveContentReq } from '@/utils/requests/exclusive-content';

// components
import PageLoading from '@/components/common/PageLoading';
import Content from '@/components/PayperDownload/Edit/Content';

const index = () => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [list, setList] = useState(null);

  // router
  const { id } = router.query;

  useEffect(() => {
    if (token) {
      getExclusiveContentReq(token)
        .then((res) => {
          if (res.error) {
            toast.error('Failed to get exclusive content.');
          } else {
            setList(res?.content.filter((item) => item.id == id)[0]);
          }
        })
        .catch(() => toast.error('Failed to get exclusive content.'));
    }
  }, [token]);

  return (
    <div className='content-wrp'>
      <Head>
        <title>Pay Per Download | Lynq</title>
      </Head>
      {!list ? <PageLoading /> : <Content list={list} />}
    </div>
  );
};

export default index;
