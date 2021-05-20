import React, { Component } from "react";
import { Player } from "video-react";

// styles
import "video-react/dist/video-react.css";

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
    );
  }
}
