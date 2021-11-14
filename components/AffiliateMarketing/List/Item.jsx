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

  return (
    <>
      <Fade duration={800} delay={50}>
        <div
          onClick={() => router.push(`/affiliate-marketing/${data.id}`)}
          className={styles.item}
        >
          <p>{data.name}</p>
          <p>{moment(data.creation_date).format('DD MMMM, yyyy')}</p>
        </div>
      </Fade>
    </>
  );
};

export default Item;
