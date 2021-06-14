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

  return (
    <Fade duration={800} delay={50}>
      <div
        onClick={() => router.push(`/masterclass/1`)}
        className={styles.item}
      >
        <p>Test Master</p>
        <p>Completed</p>
        <p>{moment().format("MM/DD/yyyy")}</p>
        <p>2 hours</p>
        <p>$60</p>
        <p>15</p>
        <p>$900</p>
        <CaretRightOutlined
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#7e88f4",
          }}
        />
      </div>
    </Fade>
  );
};

export default Item;
