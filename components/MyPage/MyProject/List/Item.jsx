// libraries
import React from "react";
import { useRouter } from "next/router";
import moment from "moment";
import Fade from "react-reveal/Fade";

// styles
import styles from "./styles.module.sass";

// icons
import { CaretRightOutlined } from "@ant-design/icons";

const Item = ({ data }) => {
  // router
  const router = useRouter();

  // data
  const { name , status, end_date, amount_reach, amount_collected, process } = data;

  return (
    <Fade duration={800} delay={50}>
      <div
        className={`${styles.item} ${styles[status.toLowerCase()]}`}
      >
        <p>{name}</p>
        <p>{status}</p>
        {/* <p>{moment(date).format("MM/DD/yyyy")}</p> */}
        <p>{end_date}</p>
        <p>${amount_reach}</p>
        <p>${amount_collected}</p>
        <p>{process}%</p>
        <p><img src="/svg/trash_bin.svg"/><img src="/svg/edit_pen.svg"/></p>
      </div>
    </Fade>
  );
};

export default Item;
