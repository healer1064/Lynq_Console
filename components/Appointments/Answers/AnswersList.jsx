// libraries
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import Fade from "react-reveal/Fade";

// icons
import {
  CaretRightOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";

// style
import styles from "./styles.module.css";

const RequestList = ({ answersList }) => {
  // router
  const router = useRouter();

  // states
  const [answers, setAsnwers] = useState(answersList);
  const [order, setOrder] = useState();

  useEffect(() => {
    if (order == "dateAsc") {
      setAsnwers(
        answersList.sort(
          (a, b) => new Date(a.requestDate) - new Date(b.requestDate)
        )
      );
    } else if (order == "dateDsc") {
      setAsnwers(
        answersList.sort(
          (a, b) => new Date(b.requestDate) - new Date(a.requestDate)
        )
      );
    } else if (order == "nameAsc") {
      setAsnwers(
        answersList.sort((a, b) =>
          a.customerLastName.localeCompare(b.customerLastName)
        )
      );
    } else if (order == "nameDsc") {
      setAsnwers(
        answersList.sort((a, b) =>
          b.customerLastName.localeCompare(a.customerLastName)
        )
      );
    }
  }, [answersList, order]);

  const getFromTime = (date) => {
    let now = moment();
    let start = moment(date);

    return start.from(now);
  };

  return answers && answers.length === 0 ? (
    <div className="no-appointments">
      <p>No answers to show</p>
    </div>
  ) : (
    <div className={styles.answers__list}>
      <div className={styles.answers_head}>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() =>
            order == "dateAsc" ? setOrder("dateDsc") : setOrder("dateAsc")
          }
        >
          Sent{" "}
          {order == "dateDsc" ? (
            <CaretUpOutlined
              style={{
                marginLeft: "30px",
                opacity: order == "dateDsc" ? "1" : "0.6",
              }}
            />
          ) : (
            <CaretDownOutlined
              style={{
                marginLeft: "30px",
                opacity: order == "dateAsc" ? "1" : "0.6",
              }}
            />
          )}
        </p>
        <p>Event Name</p>
        <p>Email</p>
        <p>First Name</p>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() =>
            order == "nameAsc" ? setOrder("nameDsc") : setOrder("nameAsc")
          }
        >
          Last Name{" "}
          {order == "nameDsc" ? (
            <CaretUpOutlined
              style={{
                marginLeft: "30px",
                opacity: order == "nameDsc" ? "1" : "0.6",
              }}
            />
          ) : (
            <CaretDownOutlined
              style={{
                marginLeft: "30px",
                opacity: order == "nameAsc" ? "1" : "0.6",
              }}
            />
          )}
        </p>
      </div>
      {answers &&
        answers.map((item, i) => (
          <Fade key={i} duration={800} delay={50}>
            <div
              key={item}
              onClick={() => router.push(`/appointments/answers/${item.id}`)}
              className={styles.answers_single_item}
            >
              <p>
                {moment(item.requestDate).format("ddd DD/MM/YYYY")}
                <span
                  style={{
                    borderLeft: "1px solid #aaa",
                    margin: "0 5px",
                  }}
                ></span>
                {getFromTime(item.requestDate)}
              </p>
              <p>{item.activityName}</p>
              <p>{item.customerEmail}</p>
              <p>{item.customerFirstName}</p>
              <p>{item.customerLastName}</p>
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
        ))}
    </div>
  );
};

export default RequestList;
