import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { push } from 'react-router-redux'
import update from 'react-addons-update';
import EditDialog from '../../../../../../../Common/All/Dialog/EditDialog';
import VideoEditForm from './VideoEditForm/VideoEditForm';
import { videoEditOpenDialogCreate, videoEditOpenSnackBar, videoSelect } from '../AnalysisActions';
import Gnome from '../../../../../../../Common/All/Loading/Gnome/Gnome';


const styles = StyleSheet.create({
  container: {
  }
});

// Must be outside render otherwise the snack bar hides and shows again
const snackBarMessage =
  <div>
    <div style={{display: 'inline-block', marginRight: 10, position: 'relative', top: 10}}>
      <Gnome />
    </div>
    <div style={{display: 'inline-block'}}>Your video is being processed.</div>
  </div>;

class VideoAdder extends Component {

  constructor(props) {
    super(props);
    this.videoAddSubmit = this.videoAddSubmit.bind(this);
    this.videoAddAbort = this.videoAddAbort.bind(this);
  }
  videoAddSubmit() {
    const {
      analysis,
      dispatch,
      videoNameInput,
      videoProcessInput,
      addVideo
    } = this.props;
    dispatch(videoEditOpenSnackBar(true));
    addVideo(analysis.id, 1, videoNameInput, videoProcessInput).then(
      (res) => {
        dispatch(videoSelect(res.data.addVideo.video.slug));
        dispatch(videoEditOpenSnackBar(false));
      });
  }

  videoAddAbort() {
    const {
      dispatch
    } = this.props;
    dispatch(videoEditOpenDialogCreate(false));
  }

  render() {
    const {
      dispatch,
      videoOpenedCreateDialog,
      videoProcessInput,
      children,
      videoCanSubmit,
      videoOpenedSnackBar
    } = this.props;

    return (
      <div className={css(styles.container)}>
        {children}
        <EditDialog
          dialogTitle={'New video'}
          dialogValidateLabel={'Create'}
          editObject={this.videoAddSubmit}
          closeEditDialog={this.videoAddAbort}
          openedEditDialog={videoOpenedCreateDialog}
          canSubmit={videoCanSubmit && videoProcessInput !== ''}
        >
          <VideoEditForm />
        </EditDialog>
        <Snackbar
          open={videoOpenedSnackBar}
          message={snackBarMessage}
          onRequestClose={(reason) => {
            if (reason !== 'clickaway') {
              dispatch(videoEditOpenSnackBar(false));
            }
          }}
        />
      </div>
    );
  }
}

VideoAdder.propTypes = {
  dispatch: PropTypes.func,
  videoOpenedCreateDialog: PropTypes.bool,
  addVideo: PropTypes.func,
  videoNameInput: PropTypes.string,
  videoDescriptionInput: PropTypes.string,
  children: PropTypes.any,
  scene: PropTypes.object,
  analysis: PropTypes.object,
  videoCanSubmit: PropTypes.bool,
  videoOpenedSnackBar: PropTypes.bool
};

const mapStateToProps = (state) => ({
  videoOpenedCreateDialog: state.scene.detail.analysis.videoOpenedCreateDialog,
  videoNameInput: state.scene.detail.analysis.videoNameInput,
  videoDescriptionInput: state.scene.detail.analysis.videoDescriptionInput,
  videoProcessInput: state.scene.detail.analysis.videoProcessInput,
  videoCanSubmit: state.scene.detail.analysis.videoCanSubmit,
  videoOpenedSnackBar: state.scene.detail.analysis.videoOpenedSnackBar
});

const VideoAdderWithState = connect(mapStateToProps)(VideoAdder);

const AddVideoMutation = gql`
mutation AddVideo($analysisId: ID!, $cameraNumber: Int!, $processName: String!, $processYaml: String!){
  addVideo(analysisId: $analysisId, cameraNumber: $cameraNumber, processName: $processName, processYaml: $processYaml) {
    ok
    video {
      id
      name
      slug
      description
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
}`;

const VideoAdderWithStateAndData = compose(
  graphql(AddVideoMutation, {
    props: ({ mutate }) => ({
      addVideo: (analysisId, cameraNumber, processName, processYaml) => mutate({
        variables: { analysisId, cameraNumber, processName, processYaml },
        updateQueries: {
          SelectionQuery: (prev, { mutationResult }) => {
            const newVideo = mutationResult.data.addVideo.video;
            return update(prev, {
              allVideosOfAnalysis: {
                edges: {
                  $unshift: [{ node: newVideo }]
                }
              }
            });
          }
        }
      })
    })
  })
)(VideoAdderWithState);

export default VideoAdderWithStateAndData;
