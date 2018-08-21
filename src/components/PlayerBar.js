import React, { Component } from "react";

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar">
        <section id="buttons">
          <button id="previous" onClick={this.props.handlePrevClick}>
            <span className="fas fa-backward" />
          </button>
          <button id="play-pause" onClick={this.props.handleSongClick}>
            <span
              className={this.props.isPlaying ? "fas fa-pause" : "fas fa-play"}
            />
          </button>
          <button id="next" onClick={this.props.handleNextClick}>
            <span className="fas fa-forward" />
          </button>
        </section>
        <section id="time-control">
          <div className="current-time">-:--</div>
          <input type="range" className="seek-bar" value="0" />
          <div className="total-time">-:--</div>
        </section>
        <section id="volume-control">
          <div className="fas fa-volume-down" />
          <input type="range" className="seek-bar" value="80" />
          <div className="fas fa-volume-up" />
        </section>
      </section>
    );
  }
}

export default PlayerBar;
