// libraries
import React from 'react';
import Head from 'next/head';

// components
import Content from '@/components/AffiliateMarketing/Single/Content';

const index = () => {
  return (
    <div className='content-wrp'>
      <Head>
        <title>My Products Recommendation | Lynq</title>
      </Head>
      <Content />
    </div>
  );
};

export default index;
