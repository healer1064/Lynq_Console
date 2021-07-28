// libraries
import { useState, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// icons
import { RiUploadCloudFill, RiDeleteBin6Fill } from "react-icons/ri";

// helpers
import { handleFileInput } from "@/utils/helpers";

// requests
import { postDocReq } from "@/utils/requests/messages";

// components
import Loading from "@/components/common/Loading";
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
  const [loading, setLoading] = useState(false);

  // handle drop
  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(handleFileInput(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  // handle send
  const handleSend = (_id, _token, _file) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", _file);

    postDocReq(_id, _token, _file)
      .then((res) => {
        refreshResponse();
        setLoading(false);
        setSelected(res);
        setAttachmentModal(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Failed to send the document!");
      });
  };

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
        {/* <button
					onClick={() => {
						if (selectedFile) {
							handleSend(
								selected.id,
								token,
								selectedFile && selectedFile.fileObject
							);
						} else {
							toast.info("Please select a document file first.");
						}
					}}
				>
					Send{loading && <Loading />}
				</button> */}

        <UploadButton
          file={selectedFile?.fileObject}
          id={selected.id}
          token={token}
          onUpload={(res) => {
            refreshResponse();
            setLoading(false);
            setSelected(res);
            setAttachmentModal(false);
          }}
        ></UploadButton>
      </div>
    </div>
  );
};

export default index;
