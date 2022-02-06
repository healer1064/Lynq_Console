// libraries
import React from 'react';
import Grid from "@material-ui/core/Grid";
import Link from "next/link";

// components
import { Tabs } from 'antd';
import Conversations from '@/components/Messages/Conversations/Content';
import EmptyConversation from '@/components/Messages/Conversations/EmptyConversation';
import Template from '@/components/Messages/Template/Content';

// styles
import styles from './styles.module.sass';

const index = ({ list, refreshResponse, data }) => {
  // tabs
  const { TabPane } = Tabs;

  return (
    <Grid container spacing={1} className={styles.personalized_wrap}>
      <Grid item xs={12} sm={12} md={12}>        
        <Link href={`/my-page`}>
          <div className={styles.back_btn_div}>
            <img src="/svg/arrow-back.svg" alt="arrow-back"/>
            <p>Personalized Video</p>
          </div>
        </Link>
        <div className={styles.profile_div}>
          <div style={{ paddingLeft: '10px' }}>
            <Tabs defaultActiveKey='1'>
              <TabPane tab='Set Up' key='2'>
                <Template data={data} responseRefresh={refreshResponse} />
              </TabPane>
              <TabPane tab='Chat' key='1'>
                {list.length > 0 ? (
                  <Conversations list={list} refreshResponse={refreshResponse} />
                ) : (
                  <EmptyConversation />
                )}
              </TabPane>
              
            </Tabs>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default index;
