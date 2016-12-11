import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import Play from './Play/Play';
import Seek from './Seek/Seek';
import GoTo from './GoTo/GoTo';
import Timer from './Timer/Timer';
import SelectVideo from './SelectVideo/SelectVideo';
import FloatingSmallAddButton from '../../../../../../../../Common/All/Buttons/FloatingSmallAddButton';
import { videoEditOpenDialogCreate } from '../../AnalysisActions';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    display: 'flex',
    position: 'relative'
  }
});

class VideoBoard extends Component {
  render() {
    const { scene, analysis, dispatch, playing, currentTime, videoSelected, videos, video } = this.props;
    return (
      <div className={css(styles.container)}>
        <Play dispatch={dispatch} playing={playing} />
        <Seek dispatch={dispatch} currentTime={currentTime} />
        <GoTo scene={scene} dispatch={dispatch} />
        <Timer scene={scene} currentTime={currentTime} />
        <SelectVideo dispatch={dispatch} videoSelected={videoSelected} videos={videos} />
        <FloatingSmallAddButton
          addFunction={() => dispatch(videoEditOpenDialogCreate(true))} //dispatch(videoEditOpenDialogCreate(true))
          addLabel='Add video'
          bottom
          disabled={!analysis}
          highlight={analysis && video.name === 'orig'}
        />
      </div>
    );
  }
}

VideoBoard.propTypes = {
  scene: PropTypes.object,
  analysis: PropTypes.object,
  dispatch: PropTypes.func,
  playing: PropTypes.bool,
  currentTime: PropTypes.number,
  videoSelected: PropTypes.string,
  videos: PropTypes.array,
  video: PropTypes.object
};

const mapStateToProps = (state) => ({
  playing: state.scene.detail.analysis.videoPlaying,
  currentTime: state.scene.detail.analysis.videoCurrentTime,
  videoSelected: state.scene.detail.analysis.videoSelected,
});

export default connect(mapStateToProps)(VideoBoard);
