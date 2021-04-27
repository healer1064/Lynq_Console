import Fade from "react-reveal/Fade";
// import moment from "moment";
import { useRouter } from "next/router";

// style
import styles from "./styles.module.css";

const RequestList = ({ answersList }) => {
  // router
  const router = useRouter();

  //   const getFromTime = (date) => {
  //     let now = moment();
  //     let start = moment(date);

  //     return start.from(now);
  //   };

  return answersList.length === 0 ? (
    <div className="no-appointments">
      <p>No answers to show</p>
    </div>
  ) : (
    <div className={styles.answers__list}>
      <div className={styles.answers_head}>
        <p>Name</p>
        <p>Sending Date</p>
        <p>Client's First Name</p>
        <p>Client's Last Name</p>
      </div>
      {answersList.map((item, i) => (
        <Fade key={i} duration={800} delay={50}>
          <div
            key={item}
            onClick={() => router.push(`/appointments/answers/${item.id}`)}
            className={styles.answers_single_item}
          >
            <p>{item.name}</p>
            <p>{item.date}</p>
            <p>{item.first_name}</p>
            <p>{item.last_name}</p>
          </div>
        </Fade>
      ))}
    </div>
  );
};

export default RequestList;
