// libraries
import { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie'
import Grid from "@material-ui/core/Grid";
import Link from "next/link";

// content
import ProfileContext from '@/context/profile';

// requests
import { getAffiliateMarketingReq } from '@/utils/requests/affiliate-marketing';

// components
import { Tabs } from 'antd';
import New from '../New/Content';
import List from '../List';
import { toast } from 'react-toastify';
import PageLoading from '@/components/common/PageLoading';
import GlobalPopUp from '../../../GlobalPopUp';
import SetUp from '../SetUp'

// styles
import styles from './styles.module.sass';


const index = () => {
  // states
  const [tab, setTab] = useState('1');
  const [list, setList] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [isEnabled, setisEnabled] = useState(false);
  const [showAddBtn, setShowAddBtn] = useState(true);

  // content
  const { token, profile } = useContext(ProfileContext);

  // tabs
  const { TabPane } = Tabs;

  useEffect(() => {
    if (profile?.id) {
      getAffiliateMarketingReq(profile.id)
        .then((res) => setList(res))
        .catch(() => toast.error('An error has occurred'));
    }
  }, [profile?.id, refetch]);

  useEffect(()=>{
    if (!Cookies.get('enable-affiliation-popup')) {
      setisEnabled(true); //Modal does not open if cookie exists
    }
  },[])

  const popupContent = {
    opened: true,
    title: 'Affiliation',
    content: '<p>You need to be an Amazon affiliate before using this plug-in.</p><p>Check this video to see how to create your account in 2 min.</p>',
    link: 'https://youtube.com/',
    linkText: 'Watch Video',
    cookieName: 'enable-affiliation-popup'
  }

  return (
    <Grid container spacing={1} className={styles.recommendation_wrap}>
      <Grid item xs={12} sm={12} md={12}>
        <Link href={`/my-page`}>
          <div className={styles.back_btn_div}>
            <img src="/svg/arrow-back.svg" alt="arrow-back"/>
            <p>Product Recommendation</p>
          </div>
        </Link>
        <div className={styles.profile_div}>
          <Tabs
            defaultActiveKey={tab.toString()}
            activeKey={tab}
            onChange={(e) => setTab(e)}
          >
            <TabPane tab='Catalog' key='1'>
              {
                showAddBtn ?
                <div className={styles.productList}>
                  <div onClick={() => setShowAddBtn(false)} className={styles.newBtn}> 
                    <img src="/svg/plus.svg" />
                    Add a new content
                  </div>
                  {!list ? <PageLoading /> : <List list={list} />}
                </div> :
                <New setTab={setTab} setRefetch={setRefetch} />
              }
            </TabPane>
            <TabPane tab='Set Up' key='3'>
              <SetUp/>
            </TabPane>
            {isEnabled ? <GlobalPopUp content={popupContent} /> : ''}
          </Tabs>
        </div>
      </Grid>
    </Grid>
    // <Link href='/pay-per-download/new'>
    //   <AddButton title='New PPD' />
    // </Link>
  );
};

export default index;
