import { useRouter } from "next/router";
import Fade from "react-reveal/Fade";
import moment from "moment";

// style
import styles from "./Invitations.module.css";

const InvitationsList = ({ invitations }) => {
  // router
  const router = useRouter();

  return invitations.length === 0 ? (
    <div className="no-appointments">
      <p>No invitations to show</p>
    </div>
  ) : (
    <div className={styles.invitations__list}>
      {invitations.map((item, i) => (
        <Fade key={i} duration={800} delay={50}>
          <div
            key={item}
            onClick={() => router.push(`/appointments/${item.id}`)}
            className={`appointments-col__card__wrp`}
          >
            <div className="appointments-col__card">
              <div className="det">
                <b>{moment(item.starting_date).format("ddd, MMM DD, YYYY")}</b>
                <div className="line"></div>
                {item.activity_name}
                <div className="line"></div>
                {item.email}
                <div className="line"></div>
                {"Invitation Sent: "}
              </div>
              <div
                className="arrow"
                style={{ transform: "rotate(270deg)", marginLeft: "10px" }}
              >
                <svg
                  width="14"
                  height="12"
                  viewBox="0 0 14 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 12L0.0717964 0L13.9282 0L7 12Z" fill="#7E88F4" />
                </svg>
              </div>
            </div>
          </div>
        </Fade>
      ))}
    </div>
  );
};

export default InvitationsList;
