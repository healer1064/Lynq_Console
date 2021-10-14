// libraries
import React from 'react';

// styles
import styles from './styles.module.scss';

const index = () => {
  return (
    <p className={styles.empty}>
      No message.
      <br />
      This is where you chat with your clients once they have purchased a video
      <br />
      message. You will use this chat to upload your video or audio file.
    </p>
  );
};

export default index;
