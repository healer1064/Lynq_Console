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
        onClick={() =>
          //   item.requestDate
          // ? router.push(`/appointments/requests/async/${item.id}`)
          // :
          //   router.push(`/calls/requests/${data.id}`)
          router.push(`/calls/requests/1`)
        }
        className={styles.item}
      >
        <p>
          {
            //   item.requestDate
            // ? moment(item.requestDate).format("ddd MM/DD/YYYY")
            // :
            // moment(item.create_date).format("ddd MM/DD/YYYY")}
            moment().format("ddd MM/DD/YYYY")
          }
          <span
            style={{
              borderLeft: "1px solid #aaa",
              margin: "0 5px",
            }}
          ></span>
          {/* {item.requestDate
            ? getFromTime(item.requestDate)
            : getFromTime(item.create_date)} */}
          1 hour ago
        </p>
        <p>
          {/* {item.activityName ? item.activityName : item.activity_name} */}
          Testing
        </p>
        <p style={{ color: "#7e88f4" }}>
          {/* {item.activityName ? "Asynchronous" : "Live"} */}
          1:1
        </p>
        <p>
          {/* {item.customerEmail ? item.customerEmail : item.email} */}
          test@test.com
        </p>
        <p>
          {/* {item.requestDate ? (
            item.maxDeliveryTime ? (
              <Countdown date={item.maxDeliveryTime} />
            ) : (
              "N/A"
            )
          ) : new Date(item.starting_date) < new Date() ? (
            "Expired"
          ) : (
            "To Validate"
          )} */}
          To Validate
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
