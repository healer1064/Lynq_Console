// libraries
import { useContext } from "react";
import moment from "moment";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// icons
import { FaFile } from "react-icons/fa";

// helpers
import { hashCode, intToRGB } from "@/utils/helpers";

const Item = ({ data, selected }) => {
  // context
  const { slugData } = useContext(ProfileContext);

  // handle download
  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = changeHead(url);
    link.target = "_blank";
    link.download = "video";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const changeHead = (_str) => {
    if (_str.indexOf("https") === -1) {
      _str = _str.replace("http", "https");
    }
    return _str;
  };

  return (
    <div className={styles.item}>
      <div className={styles.icon}>
        <span
          style={{
            background: data.isTeacher
              ? "#7E88F4"
              : `#${intToRGB(
                  hashCode(
                    `${selected.customerFirstName} ${selected.customerLastName}`,
                  ),
                )}`,
          }}
        >
          {data.isTeacher
            ? slugData.name.match(/\b(\w)/g).join("")
            : `${selected.customerFirstName} ${selected.customerLastName}`
                .match(/\b(\w)/g)
                .join("")}
        </span>
      </div>
      <div className={styles.content}>
        <h6>
          {data.isTeacher
            ? slugData.name
            : `${selected.customerFirstName} ${selected.customerLastName}`}
        </h6>
        <p>
          {data?.content ? (
            data.content
          ) : (
            <>
              <img
                src={
                  data.fileName.toLowerCase().includes(".mp3") ||
                  data.fileName.toLowerCase().includes(".mp4") ||
                  data.fileName.toLowerCase().includes(".wav") ||
                  data.fileName.toLowerCase().includes(".avi")
                    ? "/img/thumb_music.jpeg"
                    : data.fileName.toLowerCase().includes(".jpeg") ||
                      data.fileName.toLowerCase().includes(".png")
                    ? "/img/thumb_img.jpeg"
                    : data.fileName.toLowerCase().includes(".pdf")
                    ? "/img/thumb_pdf.jpeg"
                    : "/img/thumb_file.jpeg"
                }
                alt='doc'
              />
              <h5 onClick={() => handleDownload(data.fileUrl)}>
                <FaFile /> {data.fileName}{" "}
                <span>{(data.fileSize / (1024 * 1024)).toFixed(2)} MB</span>
              </h5>
            </>
          )}
        </p>
      </div>
      <div className={styles.time}>
        <h6>{moment(data.sentDate).format("hh:mm a")}</h6>
        <p>{moment(data.sentDate).fromNow()}</p>
      </div>
    </div>
  );
};

export default Item;
