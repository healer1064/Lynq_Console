import Fade from "react-reveal/Fade";
import moment from "moment";
import { useRouter } from "next/router";
import { CaretRightOutlined } from "@ant-design/icons";

// style
import styles from "./styles.module.css";

const RequestList = ({ answersList }) => {
  // router
  const router = useRouter();

  const getFromTime = (date) => {
    let now = moment();
    let start = moment(date);

    return start.from(now);
  };

  return answersList.length === 0 ? (
    <div className="no-appointments">
      <p>No answers to show</p>
    </div>
  ) : (
    <div className={styles.answers__list}>
      <div className={styles.answers_head}>
        <p>Sent</p>
        <p>Event Name</p>
        <p>Email</p>
        <p>First Name</p>
        <p>Last Name</p>
      </div>
      {answersList.map((item, i) => (
        <Fade key={i} duration={800} delay={50}>
          <div
            key={item}
            onClick={() => router.push(`/appointments/answers/${item.id}`)}
            className={styles.answers_single_item}
          >
            <p>
              {moment(item.create_date).format("ddd MM, YYYY")}
              <span
                style={{
                  borderLeft: "1px solid #aaa",
                  margin: "0 5px",
                }}
              ></span>
              {getFromTime(item.create_date)}
            </p>
            <p>{item.name}</p>
            <p>{item.email}</p>
            <p>{item.first_name}</p>
            <p>{item.last_name}</p>
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
