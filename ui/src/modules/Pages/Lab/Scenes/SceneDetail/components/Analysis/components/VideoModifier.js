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
      analysis,
      connection,
      dispatch,
      changeVideo,
      deleteVideo,
      children,
      videoEdited,
      videoNameInput,
      videoProcessInput,
      videoOpenedModifyDialog,
      videoOpenedDeleteDialog,
      videoCanSubmit
    } = this.props;
    return (
      <div className={css(styles.container)}>
        <EditDialog
          dialogTitle={'Edit video'}
          dialogValidateLabel={'Edit'}
          editObject={() => {
            changeVideo(
              videoEdited.id,
              videoProcessInput
            ).then(
            (res) => {
              const message = {
                action: "start_process_vid",
                job_name:`${analysis.slug}-${res.data.changeVideo.video.slug}`,
                vid_id: res.data.changeVideo.video.id
              };
              connection.send(JSON.stringify(message));
            });
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
            deleteVideo(videoEdited.id, videoProcessInput);
          }}
          closeDeleteDialog={() => dispatch(videoEditOpenDialogDelete(false))}
          openedDeleteDialog={videoOpenedDeleteDialog || false}
        />
        {children}
      </div>
    );
  }
}

VideoModifier.propTypes = {
  scene: PropTypes.object,
  analysis: PropTypes.object,
  children: PropTypes.any,
  dispatch: PropTypes.func,
  changeVideo: PropTypes.func,
  deleteVideo: PropTypes.func,
  videoNameInput: PropTypes.string,
  videoProcessInput: PropTypes.string,
  videoEdited: PropTypes.object,
  videoOpenedModifyDialog: PropTypes.bool,
  videoOpenedDeleteDialog: PropTypes.bool,
  videoCanSubmit: PropTypes.bool,
  connection: PropTypes.any
};

const mapStateToProps = (state) => ({
  videoNameInput: state.scene.detail.analysis.videoNameInput,
  videoProcessInput: state.scene.detail.analysis.videoProcessInput,
  videoEdited: state.scene.detail.analysis.videoEdited,
  videoOpenedModifyDialog: state.scene.detail.analysis.videoOpenedModifyDialog,
  videoOpenedDeleteDialog: state.scene.detail.analysis.videoOpenedDeleteDialog,
  videoCanSubmit: state.scene.detail.analysis.videoCanSubmit
});

const VideoModifierWithState = connect(mapStateToProps)(VideoModifier);


const DeleteVideoMutation = gql `
mutation DeleteVideo($videoId: ID!) {
  deleteVideo(videoId: $videoId) {
    ok
    video {
      id
      active
    }
  }
}`;

const ChangeVideoMutation = gql `
mutation ChangeVideo($videoId: ID!, $processYaml: String!) {
  changeVideo(videoId: $videoId, processYaml: $processYaml) {
    ok
    video {
      id
      name
      process {
        name
        slug
        process
      }
    }
  }
}`;

const VideoModifierWithStateAndData = compose(
  graphql(ChangeVideoMutation, {
    props: ({ mutate }) => ({
      changeVideo: (videoId, processYaml) =>
        mutate({ variables: { videoId, processYaml} })
    })
  }),
  graphql(DeleteVideoMutation, {
    props: ({ mutate }) => ({
      deleteVideo: (videoId) => mutate({
        variables: { videoId },
        updateQueries: {
          SelectionQuery: (prev, { mutationResult }) => {
            const allVideosOfAnalysisList = prev.allVideosOfAnalysis.edges.map((item) => item.node);
            const deleteIndex = _.findIndex(allVideosOfAnalysisList, (item) => item.id === videoId);
            console.log(deleteIndex);
            if (deleteIndex < 0) {
              return prev;
            }
            return update(prev, {
              allVideosOfAnalysis: {
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
