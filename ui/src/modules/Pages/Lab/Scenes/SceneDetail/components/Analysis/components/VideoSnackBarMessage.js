import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import Gnome from '../../../../../../../Common/All/Loading/Gnome/Gnome';

const styles = StyleSheet.create({
  container: {
    width: '40%'
  }
});

class VideoProcessMessage extends Component {

  render() {
    const { videoProcessStage } = this.props;
    let gnomeActivity = 'mining';
    let message = 'Your video is being filtered.';
    switch(videoProcessStage) {
      case 'filtering':
          gnomeActivity = 'mining';
          message = 'Your video is being filtered.';
          break;
      case 'tracking':
          gnomeActivity = 'sawing';
          message = 'Your video is being tracked.';
          break;
      case 'cleaning':
          gnomeActivity = 'gardening';
          message = 'Your video is being cleaned.';
          break;
    }

    return (
      <div>
        <div style={{display: 'inline-block', marginRight: 10, position: 'relative', top: 10}}>
          <Gnome activity={gnomeActivity}/>
        </div>
        <div style={{display: 'inline-block'}}>{message}</div>
      </div>
    );
  }
}

VideoProcessMessage.propTypes = {
  currentTime: PropTypes.number,
  dispatch: PropTypes.func
};

const mapStateToProps = (state) => ({
  videoProcessStage: state.scene.detail.analysis.videoProcessStage
});

export default connect(mapStateToProps)(VideoProcessMessage);
