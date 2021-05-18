// libraries
import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";

const VideoPreview = ({ url }) => {
  const [index, setIndex] = useState(0);

  const playerRef = useRef(null);

  useEffect(() => {
    // if (playerRef) {
    //   playerRef.current.showPreview();
    // }
  }, [index]);

  return (
    <div
      onClick={() => {
        setIndex((index) => (index += 1));
      }}
      className="async-download-video"
    >
      <ReactPlayer
        url={url !== null ? url : "https://www.youtube.com/embed/tgbNymZ7vqY"}
        width={170}
        height={100}
        light={true}
        ref={playerRef}
        onReady={() => playerRef.current.seekTo(0.5)}
        onError={() => console.log("error")}
      />
    </div>
  );
};

export default VideoPreview;
