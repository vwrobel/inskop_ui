import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import PlayIcon from 'mdi-react/PlayIcon';
import PauseIcon from 'mdi-react/PauseIcon';
import { StyleSheet, css } from 'aphrodite';
import { videoPlayingSet } from '../../../AnalysisActions';
import { scopethisDark } from '../../../../../../../../../../styles/MuiTheme';


const styles = StyleSheet.create({
  container: {
    width: '5%'
  }
});

const iconStyle = {
  color: scopethisDark
};

class Play extends Component {

  buttonClicked() {
    const { playing, dispatch } = this.props;
    dispatch(videoPlayingSet(!playing));
  }

  render() {
    const { playing } = this.props;
    return (
      <div className={css(styles.container)}>
        <IconButton
          style={iconStyle}
          onClick={() => this.buttonClicked()}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </IconButton>
      </div>
    );
  }
}

Play.propTypes = {
  playing: PropTypes.bool,
  dispatch: PropTypes.func
};

export default Play;
