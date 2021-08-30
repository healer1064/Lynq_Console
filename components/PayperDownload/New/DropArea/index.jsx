// libraries
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/router";

// styles
import styles from "./styles.module.scss";

// icons
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FiUploadCloud } from "react-icons/fi";

// helpers
import { handleFileInput } from "@/utils/helpers";

// components
import Loading from "@/components/common/Loading";

const index = ({ buttonLoading, type }) => {
  // router
  const router = useRouter();

  // states
  const [selectedFile, setSelectedFile] = useState([]);

  // handle drop
  const onDrop = useCallback((acceptedFiles) => {
    if (type == "Video") {
      setSelectedFile([handleFileInput(acceptedFiles[0])]);
    } else {
      setSelectedFile((prevState) => [
        ...prevState,
        handleFileInput(acceptedFiles[0]),
      ]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });

  useEffect(() => {
    setSelectedFile([]);
  }, [type]);

  return (
    <div className={styles.drop_area}>
      <div className={styles.wrap}>
        <div className={styles.dropzone}>
          <div className={styles.input_wrap} {...getRootProps()}>
            <input
              id='dropzone-input'
              {...getInputProps()}
              accept='.mp4,.avi,.mp3,.wav,.pdf,.doc,.docx,.png,.jpeg'
            />
            <>
              <FiUploadCloud />
              <h6>
                Drop and drop, or <span>browse</span> your files
              </h6>
            </>
          </div>
        </div>
        {selectedFile.map((item, index) => (
          <p key={index} className={styles.file_name}>
            {item.fileObject.name}
            <RiDeleteBin6Fill
              onClick={() => {
                setSelectedFile((prevState) =>
                  prevState.filter((item, i) => index != i),
                );
              }}
            />
          </p>
        ))}
      </div>
      <div className={styles.btns}>
        <button className={styles.save}>
          {buttonLoading ? <Loading /> : "Save"}
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
