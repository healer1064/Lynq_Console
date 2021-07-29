// libraries
import React, { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// styles
import styles from "./styles.module.sass";

// components
import { Progress } from "antd";
import Loading from "@/components/common/Loading";

const UploadButton = ({ file, id, token, onUpload }) => {
  const [progress, setProgress] = useState();
  const [loading, setLoading] = useState(false);

  const upload = useCallback(async () => {
    setLoading(true);
    console.log(file);
    const formData = new FormData();
    formData.append("image", file);

    axios
      .post(`https://api.lynq.app/async/${id}/upload?t=${token}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          setProgress(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total),
            ),
          );
        },
      })
      .then((res) => {
        onUpload(res.data);
      })
      .catch((err) => {
        if (err.response) {
          //do something
          console.log(err.response);
        } else if (err.request) {
          //do something else
          console.log(err.request);
        } else if (err.message) {
          //do something other than the other two
          console.log(err.message);
        }
      });
  }, [id, token, file]);

  return (
    <>
      <button
        onClick={() => {
          if (file) {
            upload();
          } else {
            toast.info("Please select a document file first.");
          }
        }}
      >
        {loading && <Loading />} Send
      </button>
      {progress && (
        <div className={styles.progress_bar}>
          <Progress percent={progress} strokeColor='#7E88F4' />
        </div>
      )}
    </>
  );
};

export default React.memo(UploadButton);
