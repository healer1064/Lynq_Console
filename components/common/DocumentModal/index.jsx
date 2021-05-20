// icons
import { AiFillCloseCircle } from "react-icons/ai";

// components
import VideoModal from "../../Appointments/Request/VideoModal";
import ImageContent from "./ImageContent";

const index = ({ setState, data }) => {
  return (
    <div className="video-modal">
      <AiFillCloseCircle
        color="white"
        size={32}
        onClick={() => setState(false)}
      />
      {data?.videoFileObject ? (
        data.videoFileObject.name.toLowerCase().includes(".mp3") ||
        data.videoFileObject.name.toLowerCase().includes(".wav") ||
        data.videoFileObject.name.toLowerCase().includes(".mp4") ||
        data.videoFileObject.name.toLowerCase().includes(".avi") ? (
          <VideoModal source={data} />
        ) : data.videoFileObject.name.toLowerCase().includes(".png") ||
          data.videoFileObject.name.toLowerCase().includes(".jpeg") ? (
          <ImageContent source={data.videoFileURL} />
        ) : (
          <iframe
            style={{ border: "none" }}
            width="100%"
            height="100%"
            src={data.videoFileURL}
          ></iframe>
        )
      ) : data.toLowerCase().includes(".mp3") ||
        data.toLowerCase().includes(".wav") ||
        data.toLowerCase().includes(".mp4") ||
        data.toLowerCase().includes(".avi") ? (
        <VideoModal source={data} />
      ) : data.toLowerCase().includes(".png") ||
        data.toLowerCase().includes(".jpeg") ? (
        <ImageContent source={data} />
      ) : (
        <div>
          <iframe
            style={{ border: "none" }}
            width="80%"
            height="80%"
            src={data}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default index;
