import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'underscore';
import AnalysisWrapper from './AnalysisWrapper';
import AnalysisAdder from './components/AnalysisAdder';
import AnalysisModifier from './components/AnalysisModifier';
import VideoConnector from './components/VideoConnector';
import VideoAdder from './components/VideoAdder';
import VideoModifier from './components/VideoModifier';


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
      video,
      star,
      unlock
    } = this.props;
    return (
      <div className={css(styles.container)}>
        <AnalysisAdder scene={scene} >
          <AnalysisModifier scene={scene} >
            <VideoConnector analysis={analysis} scene={scene}>
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
            </VideoConnector>
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
  video: PropTypes.object,
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

const UnlockAnalysisMutation = gql `
mutation UnlockAnalysis($analysisId: String!) {
  unlockAnalysis(analysisId: $analysisId) {
    ok
    analysis{
      id
      name
      locked
    }
  }
}`;

const StarAnalysisMutation = gql `
mutation StarAnalysis($analysisId: String!) {
  starAnalysis(analysisId: $analysisId) {
    ok
    analysis {
      id
      name
      slug
      description
      locked
      favoriteCount
      isUserFavorite
      isUserOwner
      owner {
        id
        name
        picture
        slug
        bio
        sceneStars
        codeStars
        analysisStars
      }
    }
  }
}`;

const AnalysisContainerWithStateAndData = compose(
  graphql(UnlockAnalysisMutation, {
    props: ({ mutate }) => ({
      unlock: (analysisId) => mutate({ variables: { analysisId } })
    })
  }),
  graphql(StarAnalysisMutation, {
    props: ({ mutate }) => ({
      star: (analysisId) => mutate({
        variables: { analysisId }
      })
    })
  })
)(AnalysisContainerWithState);


export default AnalysisContainerWithStateAndData;
