// libraries
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

// styles
import styles from "./styles.module.sass";

// icons
import { RiUploadCloudFill, RiDeleteBin6Fill } from "react-icons/ri";

// helpers
import { handleFileInput } from "@/utils/helpers";

const index = ({ state, setState }) => {
  // handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    setState(handleFileInput(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div className={styles.dropzone}>
      <strong>Picture</strong>
      <div className={styles.main}>
        {!state ? (
          <div className={styles.input} {...getRootProps()}>
            <input {...getInputProps()} accept=".png,.jpeg,.jpg" />
            <>
              <RiUploadCloudFill />
              <h6>Drop or select your picture</h6>
              <p>Supported Formats .jpeg, .jpg, .png</p>
            </>
          </div>
        ) : (
          <>
            <RiDeleteBin6Fill
              className={styles.delete}
              size={20}
              onClick={(e) => {
                setState(null);
                e.stopPropagation();
              }}
            />
            <div className={styles.preview}>
              {(state.fileObject.name.toLowerCase().includes(".jpeg") ||
                state.fileObject.name.toLowerCase().includes(".png") ||
                state.fileObject.name.toLowerCase().includes(".jpg")) && (
                <img className={styles.thumbnail} src={state.url} alt="thumb" />
              )}
            </div>
          </>
        )}
      </div>
      {state && <p className={styles.fileName}>{state.fileObject.name}</p>}
    </div>
  );
};

export default index;
