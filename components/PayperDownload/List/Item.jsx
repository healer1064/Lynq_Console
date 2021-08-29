// libraries
import React from "react";
import { useRouter } from "next/router";
import moment from "moment";
import Fade from "react-reveal/Fade";

// styles
import styles from "./styles.module.sass";

// icons
import { FiPauseCircle } from "react-icons/fi";
import { BsPencilSquare } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";

const Item = () => {
  // router
  const router = useRouter();

  return (
    <Fade duration={800} delay={50}>
      <div
        onClick={() => router.push(`/pay-per-download/123`)}
        className={styles.item}
      >
        <p>Test</p>
        <p>Video</p>
        <p>08/12//2021</p>
        <p>$150</p>
        <p>45</p>
        <p>$6,750</p>
        <p>Live</p>
        <div className={styles.actions}>
          <FiPauseCircle onClick={(e) => e.stopPropagation()} />
          <BsPencilSquare onClick={(e) => e.stopPropagation()} />
          <RiDeleteBin6Line onClick={(e) => e.stopPropagation()} />
        </div>
      </div>
    </Fade>
  );
};

export default Item;
