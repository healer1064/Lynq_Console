// libraries
import React from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import Fade from 'react-reveal/Fade';

// styles
import styles from './styles.module.sass';

const Item = ({ data }) => {
  // router
  const router = useRouter();
  console.log("item", data);

  return (
    <>
      <Fade duration={800} delay={50}>
        <div
          // onClick={() => router.push(`/affiliate-marketing/${data.id}`)}
          className={styles.item}
        >
          <img src={data.image_path} />
        </div>
      </Fade>
    </>
  );
};

export default Item;
