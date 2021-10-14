// libraries
import React from 'react';

// components
import { Tabs } from 'antd';
import Conversations from '@/components/Messages/Conversations/Content';
import EmptyConversation from '@/components/Messages/Conversations/EmptyConversation';
import Template from '@/components/Messages/Template/Content';

const index = ({ list, refreshResponse, data }) => {
  // tabs
  const { TabPane } = Tabs;

  return (
    <div style={{ paddingLeft: '10px' }}>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Conversations' key='1'>
          {list.length > 0 ? (
            <Conversations list={list} refreshResponse={refreshResponse} />
          ) : (
            <EmptyConversation />
          )}
        </TabPane>
        <TabPane tab='Template' key='2'>
          <Template data={data} responseRefresh={refreshResponse} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default index;
