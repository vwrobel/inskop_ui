import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Paper from 'material-ui/Paper';
import VideoViewer from './components/VideoViewer';
import SceneBoard from './components/SceneBoard/SceneBoard';
import AnalysisBoard from './components/AnalysisBoard/AnalysisBoard';
import VideoBoard from './components/VideoBoard/VideoBoard';
import { scopethisLighter } from '../../../../../../../styles/MuiTheme';


const styles = StyleSheet.create({
  controler: {
    display: 'flex'
  }
});

const paperStyle = {
  backgroundColor: scopethisLighter,
  padding: 10,
  marginBottom: 10
};

const scenePaperStyle = {
  display: 'inline-block',
  boxSizing: 'border-box',
  width: '49%',
  minHeight: 80,
  verticalAlign: 'middle'
};

const analysisPaperStyle = {
  display: 'inline-block',
  boxSizing: 'border-box',
  width: '49%',
  marginLeft: '2%',
  minHeight: 80,
  verticalAlign: 'middle'
};


class AnalysisWrapper extends Component {
  render() {
    const {
      dispatch,
      scene,
      video,
      videos,
      analysis,
      analyses,
      windows,
      star,
      unlock
    } = this.props;
    return (
      <div>
        <div>
          <Paper key={'info'} style={{ ...paperStyle, ...scenePaperStyle }} zDepth={2}>
            <SceneBoard scene={scene} dispatch={dispatch} />
          </Paper>
          <Paper key={'analysis'} style={{ ...paperStyle, ...analysisPaperStyle }} zDepth={2}>
            <AnalysisBoard
              analyses={analyses}
              analysis={analysis}
              scene={scene}
              star={star}
              unlock={unlock}
            />
          </Paper>
        </div>
        <Paper key={'video'} style={paperStyle} zDepth={2}>
          <VideoViewer
            video={video}
            scene={scene}
            windows={windows}
            leader
          />
        </Paper>
        <Paper key={'controler'} style={paperStyle} zDepth={2}>
          <div className={css(styles.controler)}>
            <VideoBoard scene={scene} analysis={analysis} videos={videos} video={video} />
          </div>
        </Paper>
      </div>
    );
  }
}

AnalysisWrapper.propTypes = {
  dispatch: PropTypes.func,
  scene: PropTypes.object,
  video: PropTypes.object,
  videos: PropTypes.array,
  analyses: PropTypes.array,
  analysis: PropTypes.object,
  windows: PropTypes.array,
  star: PropTypes.func,
  unlock: PropTypes.func
};

export default AnalysisWrapper;
