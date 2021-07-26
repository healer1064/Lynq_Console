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
        onClick={() => router.push(`/calls/requests/${data.id}`)}
        className={styles.item}
      >
        <p>
          {moment(data.create_date).format("ddd MM/DD/YYYY")}
          <span
            style={{
              borderLeft: "1px solid #aaa",
              margin: "0 5px",
            }}
          ></span>
          {moment(data.create_date).fromNow()}
        </p>
        <p>{data.session_duration}mins</p>
        <p style={{ color: "#7e88f4" }}>1:1</p>
        <p>{data.email}</p>
        <p>
          {new Date(data.starting_date) < new Date()
            ? "Expired"
            : "To Validate"}
        </p>
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
