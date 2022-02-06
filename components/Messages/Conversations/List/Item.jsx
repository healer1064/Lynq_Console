// libraries
import { useContext } from "react";
import moment from "moment";
import { toast } from "react-toastify";

// context
import ProfileContext from "@/context/profile";

// styles
import styles from "./styles.module.sass";

// helpers
import { hashCode, intToRGB } from "@/utils/helpers/index";

// requests
import { postAckReq } from "@/utils/requests/messages";

const Item = ({ data, setRecipient, refreshResponse }) => {
  // context
  const { token } = useContext(ProfileContext);

  // handle click
  const onClick = (item) => {
    setRecipient(item);
    if (data.acknowledge == false) {
      postAckReq(token, data.id)
        .then((res) => {
          if (res.status == 200) {
            refreshResponse();
          } else {
            toast.error("Failed to change the message read status.");
          }
        })
        .catch(() => toast.error("Failed to change the message read status."));
    }
  };

  return (
    <div className={styles.item} onClick={() => onClick(data)}>
      {/*<span
        style={{
          background: `#${intToRGB(
            hashCode(`${data.customerFirstName} ${data.customerLastName}`),
          )}`,
        }}
      >
        {`${data.customerFirstName} ${data.customerLastName}`
          .match(/\b(\w)/g)
          .join("")}
      </span>*/}
      <img src="/img/avatar-1.png" className={styles.avatar}/>
      <div className={styles.div_wrap}>
        <div className={styles.name_div}>
          <p className={styles.name_p}>{data.customerFirstName} {data.customerLastName}</p>
          <p>
            <img src="/svg/video-camera.svg"/>
            <label>Video</label>
          </p>
        </div>
        <div className={styles.date_div}>
          <label>
            {moment(
              data.content.length > 0
                ? data.content.sort((a, b) => {
                    return new Date(b.sentDate) - new Date(a.sentDate);
                  })[0].sentDate
                : data.requestDate,
            ).format("MM/DD/yyyy")}
          </label>
          <span>1</span>
        </div>
      </div>
      {/*<p
        className={data.acknowledge ? "" : styles.bold}
      >{`${data.customerFirstName} ${data.customerLastName}`}</p>*/}
      
    </div>
  );
};

export default Item;
