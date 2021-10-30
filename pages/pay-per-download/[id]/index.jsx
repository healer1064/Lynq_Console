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
import Content from '@/components/PayperDownload/Single/Content';

const index = () => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [list, setList] = useState(null);

  // router
  const { id } = router.query;
  console.log('Arun Jha list', list)

  useEffect(() => {
    if (token) {
      getExclusiveContentReq(token)
        .then((res) => {
          if (res.error) {
            toast.error('Failed to get exclusive content.');
          } else {
            console.log('Arun Jha list >', id, res?.content)
            setList(res?.content.filter((item) => item.id == id));
          }
        })
        .catch(() => toast.error('Failed to get exclusive content.'));
    }
  }, [token]);
  console.log('Arun Jha list', list)
  return (
    <div className='content-wrp'>
      <Head>
        <title>Pay Per Download | Lynq</title>
      </Head>
      {!list ? <PageLoading /> : <Content list={list[0]} />}
    </div>
  );
};

export default index;
