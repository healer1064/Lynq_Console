// libraries
import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import { toast } from 'react-toastify';

// context
import ProfileContext from '@/context/profile';

// requests
import { getAsyncReq, getMessageTemplate } from '@/utils/requests/messages';

// components
import Content from '@/components/MyPage/MyProject/Content';
import PageLoading from '@/components/common/PageLoading';

const index = () => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [list, setList] = useState(null);
  const [response, setResponse] = useState(false);

  useEffect(() => {
    if (token) {
      getAsyncReq(token)
        .then((res) => setList(res.content))
        .catch(() => toast.error('Failed to get messages list!'));
    }
  }, [token, response]);

  // refresh response
  const refreshResponse = () => {
    setResponse((prevState) => !prevState);
  };

  const test_list = [
    {
      name : "John",
      status : "Brimbo",
      end_date : "02/10/2021",
      amount_reach : 5000,
      amount_collected : 1000,
      process : 10
    },
    {
      name : "John",
      status : "Brimbo",
      end_date : "02/10/2021",
      amount_reach : 5000,
      amount_collected : 1000,
      process : 10
    }
  ]
  return (
    <div className='content-wrp'>
      <Head>
        <title>Personalized Video | Lynq</title>
      </Head>
      {test_list ? (
        <Content
          list={test_list}
          refreshResponse={refreshResponse}
        />
      ) : (
        <PageLoading />
      )}
    </div>
  );
};

export default index;
