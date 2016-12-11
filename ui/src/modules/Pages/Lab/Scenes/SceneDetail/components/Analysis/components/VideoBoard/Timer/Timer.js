import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';


const styles = StyleSheet.create({
  container: {
    width: '20%',
    marginLeft: 40,
    padding: 10
  }
});

class Timer extends Component {
  render() {
    const { currentTime, scene } = this.props;
    const nbf = scene.frameCount;
    const duration = Math.round(scene.duration * 100) / 100;
    const elapsedTime = Math.round(currentTime * duration * 100) / 100;
    const currentFrame = Math.round(currentTime * nbf);
    return (
      <div className={css(styles.container)}>
        <div>
          { elapsedTime } / { duration }
        </div>
        <div>
          { currentFrame } / { nbf }
        </div>
      </div>
    );
  }
}

Timer.propTypes = {
  currentTime: PropTypes.number,
  scene: PropTypes.object
};

export default Timer;
