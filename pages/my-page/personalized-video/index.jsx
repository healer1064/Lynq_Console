// libraries
import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import { toast } from 'react-toastify';

// context
import ProfileContext from '@/context/profile';

// requests
import { getAsyncReq, getMessageTemplate } from '@/utils/requests/messages';

// components
import Content from '@/components/MyPage/PersonalizedVideo/Content';
import PageLoading from '@/components/common/PageLoading';

const index = () => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [list, setList] = useState(null);
  const [data, setData] = useState(null);
  const [response, setResponse] = useState(false);

  useEffect(() => {
    if (token) {
      getAsyncReq(token)
        .then((res) => setList(res.content))
        .catch(() => toast.error('Failed to get messages list!'));
    }
  }, [token, response]);

  useEffect(() => {
    if (token) {
      getMessageTemplate(token)
        .then((res) => {
          if (res.status) {
            toast.error('Failed to get message template.');
          } else {
            setData(res);
          }
        })
        .catch(() => toast.error('Failed to get message template.'));
    }
  }, [token, response]);

  // refresh response
  const refreshResponse = () => {
    setResponse((prevState) => !prevState);
  };

  return (
    <div className='content-wrp'>
      <Head>
        <title>Personalized Video | Lynq</title>
      </Head>
      {list && data ? (
        <Content
          list={list}
          refreshResponse={refreshResponse}
          data={data.content}
        />
      ) : (
        <PageLoading />
      )}
    </div>
  );
};

export default index;
