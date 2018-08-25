import React, { Component } from "react";

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar">
        <section id="buttons">
          <button
            id="previous"
            className="mdc-fab"
            aria-label="skip_previous"
            fastonClick={this.props.handlePrevClick}
          >
            <span id="back-track" className="mdc-fab__icon material-icons">
              skip_previous
            </span>
          </button>
          <div class="divider" />
          <button
            id="play-pause"
            className="mdc-fab"
            aria-label="play_pause"
            onClick={this.props.handleSongClick}
          >
            <span className="mdc-fab__icon material-icons">
              {this.props.isPlaying ? "pause" : "play_arrow"}
            </span>
          </button>
          <div class="divider" />
          <button
            id="next"
            className="mdc-fab"
            aria-label="skip_next"
            onClick={this.props.handleNextClick}
          >
            <span id="forward-track" className="mdc-fab__icon material-icons">
              skip_next
            </span>
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
            className="volume-bar"
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
