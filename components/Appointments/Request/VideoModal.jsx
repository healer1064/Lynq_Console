// import ReactJWPlayer from "react-jw-player";
import { AiFillCloseCircle } from "react-icons/ai";
import "video-react/dist/video-react.css"; // import css

// const VideoModal = ({ setVideoModal, source }) => {
//   return (
//     <div className="video-modal" onClick={() => setVideoModal(false)}>
//       <AiFillCloseCircle color="white" onClick={() => setVideoModal(false)} />
//       <ReactJWPlayer
//         playerId="my-unique-id"
//         playerScript="https://link-to-my-jw-player/script.js"
//         file={source?.videoFileURL ? source.videoFileURL : source}
//       />
//       {/* <iframe
//         width="420"
//         height="315"
//         src={source?.videoFileURL ? source.videoFileURL : source}
//       ></iframe> */}
//     </div>
//   );
// };

// export default VideoModal;

import React, { Component } from "react";
import { Player } from "video-react";

export default class PlayerExample extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      playerSource: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
      inputVideoUrl: "http://www.w3schools.com/html/mov_bbb.mp4",
    };

    this.handleValueChange = this.handleValueChange.bind(this);
    this.updatePlayerInfo = this.updatePlayerInfo.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.playerSource !== prevState.playerSource) {
      this.player.load();
    }
  }

  handleValueChange(e) {
    const { value } = e.target;
    this.setState({
      inputVideoUrl: value,
    });
  }

  updatePlayerInfo() {
    const { inputVideoUrl } = this.state;
    this.setState({
      playerSource: inputVideoUrl,
    });
  }

  render() {
    return (
      <div className="video-modal">
        <AiFillCloseCircle
          color="white"
          size={32}
          onClick={() => this.props.setVideoModal(false)}
        />
        <Player
          ref={(player) => {
            this.player = player;
          }}
          videoId="video-1"
          width="80%"
          height="80%"
          autoPlay
          fluid={false}
        >
          {/* <source src={this.state.playerSource} /> */}
          <source
            src={
              this.props.source?.videoFileURL
                ? this.props.source.videoFileURL
                : this.props.source
            }
          />
        </Player>
      </div>
    );
  }
}
