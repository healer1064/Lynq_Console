// libraries
import { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import { toast } from 'react-toastify';

// context
import ProfileContext from '@/context/profile';

// utils
import { getExclusiveContentReq } from '@/utils/requests/exclusive-content';

// components
import PageLoading from '@/components/common/PageLoading';
import Content from '@/components/MyPage/ExclusiveContent/Content';

const index = () => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [list, setList] = useState(null);
  const [response, setResponse] = useState(false);

  // refresh response
  const refreshResponse = () => {
    setResponse((prevState) => !prevState);
  };

  useEffect(() => {
    if (token) {
      getExclusiveContentReq(token)
        .then((res) => {
          if (res.error) {
            toast.error('Failed to get masterclasses.');
          } else {
            setList(res);
          }
        })
        .catch(() => toast.error('Failed to get masterclasses.'));
    }
  }, [token, response]);

  return (
    <div className='content-wrp'>
      <Head>
        <title>Exclusive Content | Lynq</title>
      </Head>
      {!list ? <PageLoading /> : <Content refreshResponse={refreshResponse} list={list?.content} />}
    </div>
  );
};

export default index;
