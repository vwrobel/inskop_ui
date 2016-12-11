import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'react-addons-update';
import { push } from 'react-router-redux';
import _ from 'underscore';
import EditDialog from '../../../../../../../Common/All/Dialog/EditDialog';
import DeleteDialog from '../../../../../../../Common/All/Dialog/DeleteDialog';
import VideoEditForm from '../components/VideoEditForm/VideoEditForm';
import { videoEditOpenDialogDelete, videoEditOpenDialogModify } from '../AnalysisActions';

const styles = StyleSheet.create({
  container: {
  }
});

class VideoModifier extends Component {

  render() {
    const {
      dispatch,
      changeVideo,
      deleteVideo,
      children,
      star,
      unlock,
      videoEdited,
      videoNameInput,
      videoDescriptionInput,
      videoOpenedModifyDialog,
      videoOpenedDeleteDialog,
      scene,
      videoCanSubmit
    } = this.props;
    const childrenWithProps = React.Children.map(children,
      (child) => React.cloneElement(child, {
        star,
        unlock
      }));
    return (
      <div className={css(styles.container)}>
        <EditDialog
          dialogTitle={'Edit video'}
          dialogValidateLabel={'Edit'}
          editObject={() => {
            changeVideo(
              videoEdited.id,
              videoNameInput,
              videoDescriptionInput
            );
          }}
          closeEditDialog={() => dispatch(videoEditOpenDialogModify(false))}
          openedEditDialog={videoOpenedModifyDialog || false}
          canSubmit={videoCanSubmit}
        >
          <VideoEditForm
            video={videoEdited}
          />
        </EditDialog>
        <DeleteDialog
          deleteObject={() => {
            dispatch(push(`/lab/scenes/${scene.name}`));
            deleteVideo(videoEdited.id);
          }}
          closeDeleteDialog={() => dispatch(videoEditOpenDialogDelete(false))}
          openedDeleteDialog={videoOpenedDeleteDialog || false}
        />
        {childrenWithProps}
      </div>
    );
  }
}

VideoModifier.propTypes = {
  scene: PropTypes.object,
  children: PropTypes.any,
  dispatch: PropTypes.func,
  changeVideo: PropTypes.func,
  deleteVideo: PropTypes.func,
  videoNameInput: PropTypes.string,
  videoDescriptionInput: PropTypes.string,
  star: PropTypes.func,
  unlock: PropTypes.func,
  videoEdited: PropTypes.object,
  videoOpenedModifyDialog: PropTypes.bool,
  videoOpenedDeleteDialog: PropTypes.bool,
  videoCanSubmit: PropTypes.bool
};

const mapStateToProps = (state) => ({
  videoNameInput: state.scene.detail.analysis.videoNameInput,
  videoDescriptionInput: state.scene.detail.analysis.videoDescriptionInput,
  videoEdited: state.scene.detail.analysis.videoEdited,
  videoOpenedModifyDialog: state.scene.detail.analysis.videoOpenedModifyDialog,
  videoOpenedDeleteDialog: state.scene.detail.analysis.videoOpenedDeleteDialog,
  videoCanSubmit: state.scene.detail.analysis.videoCanSubmit
});

const VideoModifierWithState = connect(mapStateToProps)(VideoModifier);


const DeleteVideoMutation = gql `
mutation DeleteVideo($videoId: String!) {
  deleteVideo(videoId: $videoId) {
    ok
    video {
      id
      active
    }
  }
}`;

const ChangeVideoMutation = gql `
mutation ChangeVideo($videoId: String!, $name: String, $description: String) {
  changeVideo(videoId: $videoId, name: $name, description: $description) {
    ok
    video {
      id
      name
      description
    }
  }
}`;

const VideoModifierWithStateAndData = compose(
  graphql(ChangeVideoMutation, {
    props: ({ mutate }) => ({
      changeVideo: (videoId, name, description) =>
        mutate({ variables: { videoId, name, description} })
    })
  }),
  graphql(DeleteVideoMutation, {
    props: ({ mutate }) => ({
      deleteVideo: (videoId) => mutate({
        variables: { videoId },
        updateQueries: {
          SceneQuery: (prev, { mutationResult }) => {
            const allAnalysesList = prev.allAnalyses.edges.map((item) => item.node);
            const deleteIndex = _.findIndex(allAnalysesList, (item) => item.id === videoId);
            if (deleteIndex < 0) {
              return prev;
            }
            return update(prev, {
              allAnalyses: {
                edges: {
                  $splice: [[deleteIndex, 1]]
                }
              }
            });
          }
        }
      })
    })
  })
)(VideoModifierWithState);

export default VideoModifierWithStateAndData;
