import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import _ from 'underscore';
import AnalysisWrapper from './AnalysisWrapper';
import AnalysisAdder from './components/AnalysisAdder';
import AnalysisModifier from './components/AnalysisModifier';
import VideoAdder from './components/VideoAdder';
import VideoModifier from './components/VideoModifier';
import { analysisSelect } from '../Analysis/AnalysisActions';

const styles = StyleSheet.create({
  container: {
    width: '70%',
    height: '100%',
    marginRight: 'auto',
    marginLeft: 'auto',
    boxSizing: 'border-box',
    marginBottom: 40
  }
});

class AnalysisContainer extends Component {

  render() {
    const {
      dispatch,
      scene,
      videos,
      analysis,
      analyses,
      windows,
      videoSelected,
      star,
      unlock
    } = this.props;
    const video = _.findWhere(videos, { slug: videoSelected });
    return (
      <div className={css(styles.container)}>
        <AnalysisAdder scene={scene} >
          <AnalysisModifier scene={scene} >
            <VideoAdder analysis={analysis}>
              <VideoModifier analysis={analysis}>
                <AnalysisWrapper
                  dispatch={dispatch}
                  analyses={analyses}
                  analysis={analysis}
                  scene={scene}
                  star={star}
                  unlock={unlock}
                  video={video}
                  videos={videos}
                  windows={windows}
                  leader
                />
              </VideoModifier>
            </VideoAdder>
          </AnalysisModifier>
        </AnalysisAdder>
      </div>
    );
  }
}

AnalysisContainer.propTypes = {
  dispatch: PropTypes.func,
  scene: PropTypes.object,
  videos: PropTypes.array,
  analyses: PropTypes.array,
  analysis: PropTypes.object,
  videoSelected: PropTypes.string,
  windows: PropTypes.array,
  star: PropTypes.func,
  unlock: PropTypes.func
};

const mapStateToProps = (state) => ({
  videoSelected: state.scene.detail.analysis.videoSelected
});

const AnalysisContainerWithState = connect(mapStateToProps)(AnalysisContainer);

export default AnalysisContainerWithState;
