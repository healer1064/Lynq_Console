import { AiFillCloseCircle } from "react-icons/ai";

const VideoModal = ({ setVideoModal, source }) => {
  return (
    <div className="video-modal" onClick={() => setVideoModal(false)}>
      <AiFillCloseCircle color="white" onClick={() => setVideoModal(false)} />
      <iframe
        width="420"
        height="315"
        src={
          source
            ? source.videoFileURL
            : "https://www.youtube.com/embed/tgbNymZ7vqY"
        }
      ></iframe>
    </div>
  );
};

export default VideoModal;
