import React, { PropTypes, Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import _ from 'underscore';
import '../../../../../../../../styles/react-html5-video.css';
import { videoTimeChange, videoPlayingSet, videoSlidedSet, videoInitLaunch } from '../AnalysisActions';
import { sketchpadLoadItems } from '../../Tools/ToolsActions';
import Sketchpad from './Sketchpad/Sketchpad';

const {
  MEDIA_URL
} = process.env;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    position: 'relative'
  },
  sketchpad: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    cursor: 'crosshair'
  }
});

const videoStyle = {
  width: '100%',
  height: '100%'
};

const progressFrequency = 30;

class VideoViewer extends Component {

    constructor(props) {
    super(props);
    this.videoPlayed = this.videoPlayed.bind(this);
    this.videoPaused = this.videoPaused.bind(this);
    this.videoTimePlayed = this.videoTimePlayed.bind(this);
    this.videoEnded = this.videoEnded.bind(this);
    this.videoReady = this.videoReady.bind(this);
  }

  componentDidUpdate() {
    const { leader, sliding, slided, currentTime, dispatch, windows, scene } = this.props;
    if (slided && leader) {
      this.refs.player.seekTo(currentTime);
      dispatch(videoSlidedSet(false));
    }
    const currentWindows = _.filter(windows, (window) =>
      window.t === Math.round(currentTime * scene.frameCount)
    );
    const currentItems = currentWindows.map((window) => JSON.parse(window.jsonItem));
    dispatch(sketchpadLoadItems(currentItems));
  }

  videoPlayed() {
    if (this.props.leader) {
      this.props.dispatch(videoPlayingSet(true));
    }
  }
  videoPaused() {
    if (this.props.leader) {
      this.props.dispatch(videoPlayingSet(false));
    }
  }
  videoTimePlayed(e) {
    if (this.props.leader && !this.props.sliding && e.played) {
      this.props.dispatch(videoTimeChange(e.played));
    }
  }
  videoEnded() {
    if (this.props.leader) {
      this.props.dispatch(videoPlayingSet(false));
    }
  }
  videoReady() {
    if (this.props.leader && this.props.init) {
      this.refs.player.seekTo(this.props.currentTime);
      this.props.dispatch(videoInitLaunch(false));
    }
  }

  render() {
    const { playing, video, sketchpadVisible } = this.props;
    const sketchpadVisibility = sketchpadVisible ? {} : { visibility: 'hidden' };
    return (
      <div className={css(styles.container)}>
        <ReactPlayer
          ref='player'
          url={MEDIA_URL + video.file}
          style={videoStyle}
          width='100%'
          height='100%'
          playing={playing}
          onPlay={() => this.videoPlayed()}
          onPause={() => this.videoPaused()}
          onProgress={(e) => this.videoTimePlayed(e)}
          onEnded={() => this.videoEnded()}
          onReady={() => this.videoReady()}
          progressFrequency={progressFrequency}
        />
        <div className={css(styles.sketchpad)} style={sketchpadVisibility}>
          <Sketchpad />
        </div>
      </div>
    );
  }
}

VideoViewer.propTypes = {
  scene: PropTypes.object,
  leader: PropTypes.bool,
  dispatch: PropTypes.func,
  video: PropTypes.object,
  playing: PropTypes.bool,
  sliding: PropTypes.bool,
  slided: PropTypes.bool,
  init: PropTypes.bool,
  currentTime: PropTypes.number,
  windows: PropTypes.array,
  sketchpadVisible: PropTypes.bool
};

const mapStateToProps = (state) => ({
  playing: state.scene.detail.analysis.videoPlaying,
  currentTime: state.scene.detail.analysis.videoCurrentTime,
  sliding: state.scene.detail.analysis.videoSliding,
  slided: state.scene.detail.analysis.videoSlided,
  init: state.scene.detail.analysis.videoInit,
  sketchpadVisible: state.scene.detail.tools.sketchpadVisible
});

const VideoViewerWithState = connect(mapStateToProps)(VideoViewer);

export default VideoViewerWithState;
