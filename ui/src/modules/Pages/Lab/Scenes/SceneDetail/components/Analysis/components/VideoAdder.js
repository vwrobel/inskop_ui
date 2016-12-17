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
import { videoEditOpenDialogCreate, videoEditOpenSnackBar } from '../AnalysisActions';
import VideoProcessMessage from './VideoSnackBarMessage';


const styles = StyleSheet.create({
  container: {
  }
});

const videoProcessMessage = <VideoProcessMessage />;

class VideoAdder extends Component {

  constructor(props) {
    super(props);
    this.videoAddSubmit = this.videoAddSubmit.bind(this);
    this.videoAddAbort = this.videoAddAbort.bind(this);
  }

  videoAddSubmit() {
    const {
      analysis,
      videoNameInput,
      videoProcessInput,
      addVideo,
      connection
    } = this.props;
    addVideo(analysis.id, 1, videoNameInput, videoProcessInput).then(
      (res) => {
        const message = {
          action: "start_process_vid",
          job_name:`${analysis.slug}-${res.data.addVideo.video.slug}`,
          vid_id: res.data.addVideo.video.id
        };
        connection.send(JSON.stringify(message));
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
      connection,
      dispatch,
      videoOpenedCreateDialog,
      videoProcessInput,
      children,
      videoCanSubmit,
      videoOpenedSnackBar
    } = this.props;
    const childrenWithConnection = React.Children.map(children,
     (child) => React.cloneElement(child, {
       connection: connection
     })
    );
    // Message must be outside render otherwise the snackbar hides and shows again
    return (
      <div className={css(styles.container)}>
        {childrenWithConnection}
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
          message={videoProcessMessage}
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
  videoOpenedSnackBar: PropTypes.bool,
  videoProcessStage: PropTypes.string,
  connection: PropTypes.any
};

const mapStateToProps = (state) => ({
  videoOpenedCreateDialog: state.scene.detail.analysis.videoOpenedCreateDialog,
  videoNameInput: state.scene.detail.analysis.videoNameInput,
  videoDescriptionInput: state.scene.detail.analysis.videoDescriptionInput,
  videoProcessInput: state.scene.detail.analysis.videoProcessInput,
  videoCanSubmit: state.scene.detail.analysis.videoCanSubmit,
  videoOpenedSnackBar: state.scene.detail.analysis.videoOpenedSnackBar,
  videoProcessStage: state.scene.detail.analysis.videoProcessStage
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
                  $unshift: [{
                    __typename: "VideoNodeEdge",
                    node: newVideo
                  }]
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
