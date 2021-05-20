// icons
import { AiFillCloseCircle } from "react-icons/ai";

// components
import VideoModal from "../../Appointments/Request/VideoModal";
import ImageContent from "./ImageContent";

const index = ({ setState, data }) => {
  console.log(data);

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
        ) : data.videoFileObject.name.toLowerCase().includes(".doc") ||
          data.videoFileObject.name.toLowerCase().includes(".docs") ||
          data.videoFileObject.name.toLowerCase().includes(".pdf") ? (
          <div></div>
        ) : (
          <div></div>
        )
      ) : data.toLowerCase().includes(".mp3") ||
        data.toLowerCase().includes(".wav") ||
        data.toLowerCase().includes(".mp4") ||
        data.toLowerCase().includes(".avi") ? (
        <VideoModal source={data} />
      ) : data.toLowerCase().includes(".png") ||
        data.toLowerCase().includes(".jpeg") ? (
        <ImageContent source={data} />
      ) : data.toLowerCase().includes(".doc") ||
        data.toLowerCase().includes(".docs") ||
        data.toLowerCase().includes(".pdf") ? (
        <div></div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default index;
