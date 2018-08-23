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
          <div className="current-time">
            {this.props.formatTime(this.props.currentTime)}
          </div>
          <input
            type="range"
            className="seek-bar"
            value={this.props.currentTime / this.props.duration || 0}
            max="1"
            min="0"
            step="0.01"
            onChange={this.props.handleTimeChange}
          />
          <div className="total-time">
            {this.props.formatTime(this.props.duration)}
          </div>
        </section>
        <section id="volume-control">
          <div className="fas fa-volume-down" />
          <input
            type="range"
            className="seek-bar"
            value={this.props.volume || 0}
            max="1"
            min="0"
            step="0.01"
            onChange={this.props.handleVolumeChange}
            onMouseEnter={this.props.volumeHovered}
            onMouseLeave={this.props.volumeNotHovered}
          />
          <div className="fas fa-volume-up" />
          {this.props.volumeDisplay
            ? Math.floor(this.props.volume * 100)
            : null}
        </section>
      </section>
    );
  }
}

export default PlayerBar;
