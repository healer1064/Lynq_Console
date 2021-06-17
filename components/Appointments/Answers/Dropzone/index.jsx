// libraries
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

// icons
import { RiUploadCloudFill, RiDeleteBin6Fill } from "react-icons/ri";

// helpers
import { handleFileInput } from "@/utils/helpers";

const index = ({ selectedFile, setSelectedFile }) => {
  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(handleFileInput(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <>
      <strong>Upload your Document</strong>
      <div className="video-upload-input">
        {!selectedFile && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input
              {...getInputProps()}
              accept=".mp4,.avi,.mp3,.wav,.pdf,.doc,.docx,.png,.jpeg"
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
              className="delete-video-icon"
              size={20}
              onClick={(e) => {
                setSelectedFile(null);
                e.stopPropagation();
              }}
            />
            <div
              onClick={(e) => {
                e.stopPropagation();
                setDocModal(true);
              }}
              className="async-download-video"
            >
              {selectedFile.videoFileObject.name
                .toLowerCase()
                .includes(".mp3") ||
              selectedFile.videoFileObject.name
                .toLowerCase()
                .includes(".wav") ||
              selectedFile.videoFileObject.name
                .toLowerCase()
                .includes(".mp4") ||
              selectedFile.videoFileObject.name
                .toLowerCase()
                .includes(".avi") ? (
                <img
                  className="thumbnail"
                  src="/img/thumb_music.jpeg"
                  alt="thumb"
                />
              ) : selectedFile.videoFileObject.name
                  .toLowerCase()
                  .includes(".jpeg") ||
                selectedFile.videoFileObject.name
                  .toLowerCase()
                  .includes(".png") ? (
                <img
                  className="thumbnail"
                  src="/img/thumb_img.jpeg"
                  alt="thumb"
                />
              ) : selectedFile.videoFileObject.name
                  .toLowerCase()
                  .includes(".pdf") ? (
                <img
                  className="thumbnail"
                  src="/img/thumb_pdf.jpeg"
                  alt="thumb"
                />
              ) : (
                <img
                  className="thumbnail"
                  src="/img/thumb_file.jpeg"
                  alt="thumb"
                />
              )}
            </div>
          </>
        )}
      </div>
      {selectedFile && (
        <p
          style={{
            margin: "10px 0px 0px",
            fontSize: "0.8rem",
            color: "#333",
          }}
        >
          {selectedFile.videoFileObject.name}
        </p>
      )}
    </>
  );
};

export default index;
