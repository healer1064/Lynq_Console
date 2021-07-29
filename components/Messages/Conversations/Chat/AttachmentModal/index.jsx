// libraries
import { useState, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// icons
import { RiUploadCloudFill, RiDeleteBin6Fill } from "react-icons/ri";

// helpers
import { handleFileInput } from "@/utils/helpers";

// components
import UploadButton from "./UploadButton";

const index = ({
  setAttachmentModal,
  selected,
  setSelected,
  refreshResponse,
}) => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [selectedFile, setSelectedFile] = useState(null);

  // handle drop
  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(handleFileInput(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div className={styles.modal} onClick={() => setAttachmentModal(false)}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <h3>Upload your Document</h3>
        <div className={styles.dropzone}>
          {!selectedFile && (
            <div className={styles.input_wrap} {...getRootProps()}>
              <input
                id='dropzone-input'
                {...getInputProps()}
                accept='.mp4,.avi,.mp3,.wav,.pdf,.doc,.docx,.png,.jpeg'
              />
              <>
                <RiUploadCloudFill />
                <h6>Drop or select your file</h6>
                <p>
                  Video (mp4, avi), Picture (jpeg, png), Audio (mp3, wav),
                  Document (pdf, docx, doc)
                  <br /> Max 400 MB
                </p>
              </>
            </div>
          )}
          {selectedFile && (
            <>
              <RiDeleteBin6Fill
                className={styles.delete_icon}
                size={20}
                onClick={(e) => {
                  setSelectedFile(null);
                  e.stopPropagation();
                }}
              />
              <div className={styles.preview_section}>
                {selectedFile.fileObject.name.toLowerCase().includes(".mp3") ||
                selectedFile.fileObject.name.toLowerCase().includes(".wav") ||
                selectedFile.fileObject.name.toLowerCase().includes(".mp4") ||
                selectedFile.fileObject.name.toLowerCase().includes(".avi") ? (
                  <img
                    className={styles.thumbnail}
                    src='/img/thumb_music.jpeg'
                    alt='thumb'
                  />
                ) : selectedFile.fileObject.name
                    .toLowerCase()
                    .includes(".jpeg") ||
                  selectedFile.fileObject.name
                    .toLowerCase()
                    .includes(".png") ? (
                  <img
                    className={styles.thumbnail}
                    src='/img/thumb_img.jpeg'
                    alt='thumb'
                  />
                ) : selectedFile.fileObject.name
                    .toLowerCase()
                    .includes(".pdf") ? (
                  <img
                    className={styles.thumbnail}
                    src='/img/thumb_pdf.jpeg'
                    alt='thumb'
                  />
                ) : (
                  <img
                    className={styles.thumbnail}
                    src='/img/thumb_file.jpeg'
                    alt='thumb'
                  />
                )}
              </div>
            </>
          )}
        </div>
        {selectedFile && (
          <p className={styles.file_name}>{selectedFile.fileObject.name}</p>
        )}
        <UploadButton
          file={selectedFile?.fileObject}
          id={selected.id}
          token={token}
          onUpload={(res) => {
            refreshResponse();
            setSelected(res);
            setAttachmentModal(false);
          }}
        ></UploadButton>
      </div>
    </div>
  );
};

export default index;
