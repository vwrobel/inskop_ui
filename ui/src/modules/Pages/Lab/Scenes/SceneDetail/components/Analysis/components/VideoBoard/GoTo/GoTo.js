import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import LeftIcon from 'mdi-react/ArrowLeftDropCircleOutlineIcon';
import RightIcon from 'mdi-react/ArrowRightDropCircleOutlineIcon';
import { StyleSheet, css } from 'aphrodite';
import { videoPlayingSet, videoFrameChange, videoSlidedSet } from '../../../AnalysisActions';
import { scopethisDark } from '../../../../../../../../../../styles/MuiTheme';


const styles = StyleSheet.create({
  container: {
    width: '10%',
    display: 'flex'
  }
});

const iconStyle = {
  color: scopethisDark,
  display: 'flex'
};


class GoTo extends Component {

  goLeft() {
    const { dispatch, scene } = this.props;
    dispatch(videoPlayingSet(false));
    dispatch(videoFrameChange(false, 1.0 / scene.frameCount));
    dispatch(videoSlidedSet(true));
  }

  goRight() {
    const { dispatch, scene } = this.props;
    dispatch(videoPlayingSet(false));
    dispatch(videoFrameChange(true, 1.0 / scene.frameCount));
    dispatch(videoSlidedSet(true));
  }

  render() {
    return (
      <div className={css(styles.container)}>
        <IconButton
          style={iconStyle}
          onClick={() => this.goLeft()}
        >
          <LeftIcon />
        </IconButton>
        <IconButton
          style={iconStyle}
          onClick={() => this.goRight()}
        >
          <RightIcon />
        </IconButton>
      </div>
    );
  }
}

GoTo.propTypes = {
  dispatch: PropTypes.func,
  scene: PropTypes.object
};

export default GoTo;
