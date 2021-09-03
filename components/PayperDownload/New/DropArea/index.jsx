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
import Video from "./Video";

const index = ({ buttonLoading, type }) => {
  // router
  const router = useRouter();

  // states
  const [selectedFile, setSelectedFile] = useState([]);

  // handle drop
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (type == "Video") {
        setSelectedFile([handleFileInput(acceptedFiles[0])]);
      } else {
        setSelectedFile((prevState) => [
          ...prevState,
          handleFileInput(acceptedFiles[0]),
        ]);
      }
    },
    [type],
  );

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
              accept={
                type == "Video"
                  ? ".mp4,.avi,"
                  : type == "Picture"
                  ? ".png,.jpeg"
                  : ".pdf,.doc,.docx,"
              }
              disabled={
                type == "Picture"
                  ? selectedFile.length > 9
                  : type == "Document"
                  ? selectedFile.length > 4
                  : false
              }
            />
            <>
              <span className={styles.svg_wrap}>
                <FiUploadCloud />
              </span>
              <h6>
                Drop and drop, or{" "}
                <span
                  style={{
                    cursor:
                      type == "Picture"
                        ? selectedFile.length > 9
                          ? "not-allowed"
                          : "pointer"
                        : type == "Document"
                        ? selectedFile.length > 4
                          ? "not-allowed"
                          : "pointer"
                        : "pointer",
                  }}
                >
                  browse
                </span>{" "}
                your files
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
        {selectedFile.length > 0 &&
          (type == "Video" ? (
            <Video file={selectedFile[0]} />
          ) : type == "Picture" ? (
            <>
              <p className={styles.picture_doc}>
                You can add up to 10 pictures
              </p>
              <h6 className={styles.number_of_files}>
                {selectedFile.length + "/10"}
              </h6>
            </>
          ) : (
            <>
              <p className={styles.picture_doc}>You can add up to 5 docs</p>
              <h6 className={styles.number_of_files}>
                {selectedFile.length + "/5"}
              </h6>
            </>
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
