import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import ToolBar from './Tools/ToolBar/ToolBar';
import AnalysisContainer from './Analysis/AnalysisContainer';
import { videoSelect } from './Analysis/AnalysisActions';

const styles = StyleSheet.create({
  container: {
    marginTop: 40
  }
});

class SceneDetailContainer extends Component {
  componentWillMount() {
    this.props.dispatch(videoSelect('orig'));
  }
  render() {
    const {
      data,
      scene,
      origVideo,
      analysis,
      analyses,
      availableFilters,
      availableTrackers
    } = this.props;
    const shouldNotAddData = analysis ? data.loading : true;
    const videos = shouldNotAddData ?
      origVideo : origVideo.concat(data.allVideosOfAnalysis.edges.map((video) => video.node));
    const tags = shouldNotAddData ?
      [] : data.allTags.edges.map((tag) => tag.node);
    const selections = shouldNotAddData ?
      [] : data.allSelections.edges.map((selection) => selection.node);
    const windows = shouldNotAddData ?
      [] : data.allWindows.edges.map((window) => window.node);
    return (
      <ToolBar
        scene={scene}
        analysis={analysis}
        availableFilters={availableFilters}
        availableTrackers={availableTrackers}
        tags={tags}
        videos={videos}
        selections={selections}
        windows={windows}
      >
        <div className={css(styles.container)}>
          <AnalysisContainer
            scene={scene}
            videos={videos}
            analysis={analysis}
            analyses={analyses}
            windows={windows}
          />
        </div>
      </ToolBar>
    );
  }
}

SceneDetailContainer.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func,
  scene: PropTypes.object,
  analyses: PropTypes.array,
  analysis: PropTypes.object,
  origVideo: PropTypes.array,
  availableFilters: PropTypes.array,
  availableTrackers: PropTypes.array
};


const SelectionQuery = gql `
query SelectionQuery($analysisId: ID!){
  allVideosOfAnalysis (analysis_Id: $analysisId) {
    edges {
      node {
        id
        name
        description
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
  }
  allTags (tagTarget: "selection",tagCategory: "main"){
    edges {
      node {
        id
        name
      }
    }
  }
  allSelections (analysis: $analysisId){
    edges {
      node {
        id
        name
        tags {
          edges {
            node {
              name
              category {
                name
              }
            }
          }
        }
      }
    }
  }
  allWindows (selection_Analysis: $analysisId, type_Name: "manual" ){
    edges {
      node {
        id
        selection {
          name
          tags {
            edges {
              node {
                name
                category {
                  name
                }
              }
            }
          }
        }
        t
        type {
          name
        }
        jsonItem
      }
    }
  }
}`;

const SceneDetailContainerWithData = compose(
  graphql(SelectionQuery, {
    skip: (ownProps) => ownProps.analysis === null,
    options: ({ analysis }) => ({ variables: { analysisId: analysis.id } })
  })
)(SceneDetailContainer);

export default SceneDetailContainerWithData;
