// libraries
import { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie'

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
import GlobalPopUp from '../../GlobalPopUp';

const index = () => {
  // states
  const [tab, setTab] = useState('1');
  const [list, setList] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [isEnabled, setisEnabled] = useState(false);

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

  useEffect(()=>{
    if (!Cookies.get('enable-affiliation-popup')) {
      setisEnabled(true); //Modal does not open if cookie exists
    }
  },[])

  const popupContent = {
    opened: true,
    title: 'Affiliation',
    content: '<p>You need to be an Amazon affiliate before using this plug-in.</p><p>Check this video to see how to create your account in 2 min.</p>',
    link: '',
    linkText: 'Watch Video',
    cookieName: 'enable-affiliation-popup'
  }

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
      {isEnabled ? <GlobalPopUp content={popupContent} /> : ''}
    </Tabs>

    // <Link href='/pay-per-download/new'>
    //   <AddButton title='New PPD' />
    // </Link>
  );
};

export default index;
