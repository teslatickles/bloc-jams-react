import React, { Component } from "react";
import albumData from "./../data/albums";
import PlayerBar from "./PlayerBar";

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find(album => {
      return album.slug === this.props.match.params.slug;
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      volume: 0,
      isPlaying: false,
      hovered: null,
      volumeDisplay: false
    };

    this.audioElement = document.createElement("audio");
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumeupdate: e => {
        this.setState({ volume: this.audioElement.volume });
      }
    };
    this.audioElement.addEventListener(
      "timeupdate",
      this.eventListeners.timeupdate
    );
    this.audioElement.addEventListener(
      "durationchange",
      this.eventListeners.durationchange
    );
    this.audioElement.addEventListener(
      "volumeupdate",
      this.eventListeners.volumeupdate
    );
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener(
      "timeupdate",
      this.eventListeners.timeupdate
    );
    this.audioElement.removeEventListener(
      "durationchange",
      this.eventListeners.durationchange
    );
    this.audioElement.removeEventListener(
      "volumeupdate",
      this.eventListeners.volumeupdate
    );
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) {
        this.setSong(song);
      }
      this.play();
    }
  }

  handleHover(song) {
    this.setState({ hovered: song });
  }

  handleNoHover() {
    this.setState({ hovered: null });
  }

  volumeHovered() {
    this.setState({ volumeDisplay: true });
  }

  volumeNotHovered() {
    this.setState({ volumeDisplay: false });
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(
      song => this.state.currentSong === song
    );
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(
      song => this.state.currentSong === song
    );
    const newIndex = Math.max(0, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume });
  }

  formatTime(time) {
    let minutes, seconds, result;
    if (time < 60) {
      minutes = 0;
      seconds = Math.floor(time);
    } else if (time > 60) {
      minutes = Math.floor(time / 60);
      seconds = Math.floor(time % 60);
    } else {
      minutes = "-";
      seconds = "--";
    }
    if (seconds < 10) {
      result = `${minutes}:0${seconds}`;
    } else {
      result = `${minutes}:${seconds}`;
    }
    return result;
  }

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img
            id="album-cover-art"
            src={this.state.album.albumCover}
            alt={this.state.album.title}
          />
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
            {this.state.album.songs.map((song, array) => (
              <tr
                className="song"
                key={array}
                onClick={() => this.handleSongClick(song)}
                onMouseEnter={() => this.handleHover(song)}
                onMouseLeave={() => this.handleNoHover()}
              >
                <td>
                  {this.state.currentSong !== song ? (
                    this.state.hovered === song ? (
                      <span className="far fa-play-circle" />
                    ) : (
                      array + 1
                    )
                  ) : (
                    <span
                      className={
                        this.state.isPlaying
                          ? "far fa-pause-circle"
                          : "far fa-play-circle"
                      }
                    />
                  )}
                </td>
                <td>{song.title}</td>
                <td>({song.duration} seconds)</td>
              </tr>
            ))}
          </tbody>
        </table>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          formatTime={time => this.formatTime(time)}
          volume={this.audioElement.volume}
          volumeHovered={() => this.volumeHovered()}
          volumeNotHovered={() => this.volumeNotHovered()}
          volumeDisplay={this.state.volumeDisplay}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={e => this.handleTimeChange(e)}
          handleVolumeChange={e => this.handleVolumeChange(e)}
        />
      </section>
    );
  }
}
export default Album;
