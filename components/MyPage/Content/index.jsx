// libraries
import React from 'react';
import Grid from "@material-ui/core/Grid";
import Link from "next/link";

// styles
import styles from './styles.module.sass';

// components
import { Tabs } from 'antd';

const index = ({ toggleResponse, business }) => {
  // tabs pane
  const { TabPane } = Tabs;

  return (
    <Grid container spacing={1} className={styles.mypage_wrap}>
      <Grid item xs={12} sm={12} md={8}>
        <p>Add a block</p>
        <div className={styles.add_block_div}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4} md={4}>
              <Link href={`/my-page/profile`}>
                <div className={styles.Icon_div}>
                  <img src="/svg/profile.svg" className={styles.Icon_svg}/>
                  <label>Profile</label>
                </div>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Link href={`/my-page/custom-link`}>
                <div className={styles.Icon_div}>
                  <img src="/svg/link-custom.svg" className={styles.Icon_svg}/>
                  <label>Custom Link</label>
                </div>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Link href={`/my-page/social-link`}>
                <div className={styles.Icon_div}>
                  <img src="/svg/link-social.svg" className={styles.Icon_svg}/>
                  <label>Social Link</label>
                </div>
              </Link>
            </Grid>
          </Grid>
        </div>
        <p>Add a monetizable activity block</p>
        <div className={styles.add_block_div}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4} md={4}>
              <Link href={`/my-page/exclusive-content`}>
                <div className={styles.Icon_div}>
                  <img src="/svg/gem-regular.svg" className={styles.Icon_svg}/>
                  <label>Exclusive  content</label>
                </div>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Link href={`/my-page/my-project`}>
                <div className={styles.Icon_div}>
                  <img src="/svg/back-project.svg" className={styles.Icon_svg}/>
                  <label>Back a project</label>
                </div>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Link href={`/my-page/personalized-video`}>
                <div className={styles.Icon_div}>
                  <img src="/svg/personalized-video.svg" className={styles.Icon_svg}/>
                  <label>Personalized video</label>
                </div>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Link href={`/my-page/product-recommendation`}>
                <div className={styles.Icon_div}>
                  <img src="/svg/product-recommendation.svg" className={styles.Icon_svg}/>
                  <label>Product recommendation</label>
                </div>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Link href={`/my-page/video-call`}>
                <div className={styles.Icon_div}>
                  <img src="/svg/video-call.svg" className={styles.Icon_svg}/>
                  <label>1-on-1 video call</label>
                </div>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Link href={`/my-page/tipping`}>
                <div className={styles.Icon_div}>
                  <img src="/svg/tipping.svg" className={styles.Icon_svg}/>
                  <label>Tipping</label>
                </div>
              </Link>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <p>Preview</p>
        <div className={styles.preview_div}>
          <div className={styles.phone_div}>
            
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default index;
