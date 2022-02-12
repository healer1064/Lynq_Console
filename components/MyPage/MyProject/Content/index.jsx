// libraries
import { useState } from 'react';
import Link from 'next/link';
import Grid from "@material-ui/core/Grid";

// styles
import styles from './styles.module.sass';

// components
import { Tabs } from 'antd';
// import New from '../New/Content';
import List from '@/components/MyPage/MyProject/List';
import Template from '@/components/MyPage/MyProject/Template/Content'

const index = ({ list, refreshResponse }) => {
  // states
  const [filter, setFilter] = useState('All');
  const [add, setAdd] = useState(false);
  const [status, setStatus] = useState(1);
  const data = {}

  return (
    <Grid container spacing={1} className={styles.exclusive_wrap}>
      <Grid item xs={12} sm={12} md={12}>        
        <Link href={`/my-page`}>
          <div className={styles.back_btn_div}>
            <img src="/svg/arrow-back.svg" alt="arrow-back"/>
            <p>Back a project</p>
          </div>
        </Link>
        <div className={styles.profile_div}>
          {
            status === 0 ?
            <>
              <div className={styles.add_btn}><img src="/svg/plus.svg"></img><span>Add a new project</span></div>
              <List list={list} filter={filter}/>
            </> :
            <Template data={data} responseRefresh={refreshResponse}/>
          }
        </div>
      </Grid>
    </Grid>
  );
};

export default index;
