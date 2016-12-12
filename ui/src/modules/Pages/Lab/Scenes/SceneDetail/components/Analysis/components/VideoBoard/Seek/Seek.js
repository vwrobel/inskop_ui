import Slider from 'material-ui/Slider';
import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { videoTimeChange, videoSlidingSet, videoSlidedSet } from '../../../AnalysisActions';

const styles = StyleSheet.create({
  container: {
    width: '40%'
  }
});


class Seek extends Component {

  render() {
    const { dispatch, currentTime } = this.props;
    return (
      <div className={css(styles.container)}>
        <Slider
          value={currentTime}
          onDragStart={() => dispatch(videoSlidingSet(true))}
          onChange={(e, value) => dispatch(videoTimeChange(value))}
          onDragStop={() => {
            dispatch(videoSlidingSet(false));
            dispatch(videoSlidedSet(true));
          }}
        />
      </div>
    );
  }
}

Seek.propTypes = {
  currentTime: PropTypes.number,
  dispatch: PropTypes.func
};


export default Seek;
