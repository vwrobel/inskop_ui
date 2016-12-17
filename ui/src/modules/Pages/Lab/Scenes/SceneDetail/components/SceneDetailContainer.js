import React, { Component, PropTypes } from 'react';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import _ from 'underscore';
import gql from 'graphql-tag';
import Loading from '../../../../../Common/All/Loading/Loading';
import SceneDetailContainerWithAllData from './SceneDetailContainerWithAllData';
import { analysisSetLoaded } from './Analysis/AnalysisActions';


class SceneDetailContainer extends Component {

  componentDidUpdate() {
    const { data, dispatch } = this.props;
    if (!data.loading) {
      dispatch(analysisSetLoaded(true));
    }
  }

  render() {
    const {
      data,
      dispatch,
      analysisSelected,
      videoSelected
    } = this.props;

    if (data.loading) {
      return <Loading />;
    }
    const scene = data.sceneBySlug;
    const origVideo = data.origVideo.edges.map((video) => video.node);
    const availableFilters = data.allFilters.edges.map((filter) => filter.node);
    const availableTrackers = data.allTrackers.edges.map((tracker) => tracker.node);
    const analyses = data.allAnalyses.edges.map((analysis) => analysis.node);
    const analysis = (analyses !== [] && analysisSelected !== null) ?
      _.findWhere(analyses, { slug: analysisSelected }) : null;
    return (
      <SceneDetailContainerWithAllData
        scene={scene}
        origVideo={origVideo}
        videoSelected={videoSelected}
        availableFilters={availableFilters}
        availableTrackers={availableTrackers}
        dispatch={dispatch}
        analyses={analyses}
        analysis={analysis}
      />
    );
  }
}

SceneDetailContainer.propTypes = {
  dispatch: PropTypes.func,
  data: PropTypes.object,
  analysisSelected: PropTypes.string,
  analysisLoaded: PropTypes.bool,
  videoSelected: PropTypes.string
};

const SceneQuery = gql `
query SceneQuery($sceneSlug: String!){
  sceneBySlug(slug: $sceneSlug) {
    id
    name
    slug
    description
    createdAt
    locked
    thumbnail
    duration
    frameCount
    fps
    favoriteCount
    isUserFavorite
    isUserOwner
    status {
      name
    }
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
  },
  origVideo (camera_Scene_Slug: $sceneSlug) {
    edges {
      node {
        id
        name
        slug
        camera {
          name
          scene {
            name
          }
        }
        process {
          name
          slug
          process
        }
        file
      }
    }
  },
  allAnalyses (scene_Slug: $sceneSlug) {
    edges {
      node {
        id
        name
        slug
        description
        favoriteCount
        isUserFavorite
        isUserOwner
        locked
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
  }
  allFilters {
    edges {
      node {
        id
        name
        defaultParam
      }
    }
  }
  allTrackers {
    edges {
      node {
        id
        name
        defaultParam
      }
    }
  }
}`;

const SceneDetailContainerWithData = compose(
  graphql(SceneQuery)
)(SceneDetailContainer);

const mapStateToProps = (state) => ({
  analysisSelected: state.scene.detail.analysis.analysisSelected,
  videoSelected: state.scene.detail.analysis.videoSelected
});

const SceneDetailContainerWithDataAndState = connect(mapStateToProps)(SceneDetailContainerWithData);

export default SceneDetailContainerWithDataAndState;
