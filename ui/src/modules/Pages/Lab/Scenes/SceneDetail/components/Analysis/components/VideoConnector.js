import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { videoEditOpenSnackBar, videoSelect, videoProcessSetStage } from '../AnalysisActions';


const {
  WS_ADDRESS
} = process.env;


class VideoConnector extends Component {

  componentDidMount(){
    const { dispatch, analysis, scene } = this.props;
    this.connection = new WebSocket(`${WS_ADDRESS}/dashboard/`);
    this.connection.onmessage = (message) => {
        console.log("Got message: " + message.data);
        const data = JSON.parse(message.data);

        if (data.action == "started") {
          dispatch(videoProcessSetStage('filtering'));
          dispatch(videoEditOpenSnackBar(true));
        }
        if (data.action == "vid filtered") {
          dispatch(videoEditOpenSnackBar(false));
          dispatch(videoProcessSetStage('tracking'));
          dispatch(videoEditOpenSnackBar(true));
        }
        if (data.action == "vid tracked") {
          dispatch(videoEditOpenSnackBar(false));
          dispatch(videoProcessSetStage('cleaning'));
          dispatch(videoEditOpenSnackBar(true));
        }

        // if action is completed, just update the status
        else if (data.action == "completed"){
          dispatch(videoEditOpenSnackBar(false));
          dispatch(videoProcessSetStage(''));
          dispatch(push(`/lab/scenes/${scene.slug}/analyses/${analysis.slug}/videos/${data.video_slug}/tools/view-analysis`));
        }
    };
  }

  render() {
    const {
      children
    } = this.props;
    // Message must be outside render otherwise the snackbar hides and shows again
    const childrenWithConnection = React.Children.map(children,
     (child) => React.cloneElement(child, {
       connection: this.connection
     })
    );
    return (
      <div>
        {childrenWithConnection}
      </div>
    );
  }
}


VideoConnector.propTypes = {
  scene: PropTypes.object,
  analysis: PropTypes.object,
  dispatch: PropTypes.func
};

const VideoConnectorWithState = connect()(VideoConnector);

export default VideoConnectorWithState;
