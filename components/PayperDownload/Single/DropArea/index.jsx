// libraries
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";

// styles
import styles from "./styles.module.scss";

// icons
import { RiDeleteBin6Fill } from "react-icons/ri";

// components
import Loading from "@/components/common/Loading";
import Video from "./Video";

const index = ({ buttonLoading, type }) => {
  // router
  const router = useRouter();

  // states
  const [selectedFile, setSelectedFile] = useState(["File1.mp4"]);

  return (
    <div className={styles.drop_area}>
      <div className={styles.wrap}>
        {selectedFile.map((item, index) => (
          <p key={index} className={styles.file_name}>
            {/* {item.fileObject.name} */}
            {item}
          </p>
        ))}
        {/* {selectedFile.length > 0 &&
          (type == "Video" ? ( */}
        <Video file={selectedFile[0]} />
        {/* ) : type == "Picture" ? (
            <p className={styles.picture_doc}>
              You can add up to 10 pictures max
            </p>
          ) : (
            <p className={styles.picture_doc}>You can add up to 5 docs max</p>
          ))} */}
      </div>
      <div className={styles.btns}>
        <button className={styles.save}>
          {buttonLoading ? <Loading /> : "Edit"}
        </button>
        <button
          className={styles.cancel}
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default index;
