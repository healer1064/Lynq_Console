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
  const { name, date, duration, price, id, revenue } = data;

  return (
    <Fade duration={800} delay={50}>
      <div
        onClick={() => router.push(`/masterclass/${id}`)}
        className={styles.item}
      >
        <p>{name}</p>
        <p>Completed</p>
        <p>{moment(date).format("MM/DD/yyyy")}</p>
        <p>{duration} mins</p>
        <p>${price}</p>
        <p>No data</p>
        <p>{revenue}</p>
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
