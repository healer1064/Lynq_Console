// libraries
import { useState, useEffect, useContext } from 'react';

// content
import ProfileContext from '@/context/profile';

// requests
import { getAffiliateMarketingReq } from '@/utils/requests/affiliate-marketing';

// components
import { Tabs } from 'antd';
import New from '../New/Content';
import List from '@/components/AffiliateMarketing/List';
import { toast } from 'react-toastify';
import PageLoading from '@/components/common/PageLoading';

const index = () => {
  // states
  const [tab, setTab] = useState('1');
  const [list, setList] = useState(null);
  const [refetch, setRefetch] = useState(false);

  // content
  const { token } = useContext(ProfileContext);

  // tabs
  const { TabPane } = Tabs;

  useEffect(() => {
    if (token) {
      getAffiliateMarketingReq(token)
        .then((res) => setList(res))
        .catch(() => toast.error('An error has occurred'));
    }
  }, [token, refetch]);

  return (
    <Tabs
      defaultActiveKey={tab.toString()}
      activeKey={tab}
      onChange={(e) => setTab(e)}
    >
      <TabPane tab='Catalog' key='1'>
        {!list ? <PageLoading /> : <List list={list} />}
      </TabPane>
      <TabPane tab='Product' key='2'>
        <New setTab={setTab} setRefetch={setRefetch} />
      </TabPane>
    </Tabs>

    // <Link href='/pay-per-download/new'>
    //   <AddButton title='New PPD' />
    // </Link>
  );
};

export default index;
