import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Title from './components/Title';
import Buttons from './components/Buttons';

const styles = StyleSheet.create({
  container: {
    width: '100%'
  }
});

class SceneBoard extends Component {
  render() {
    const { scene, dispatch } = this.props;
    return (
      <div className={css(styles.container)}>
        <Title scene={scene} />
        <Buttons
          dispatch={dispatch}
          scene={scene}
        />
      </div>
    );
  }
}

SceneBoard.propTypes = {
  dispatch: PropTypes.func,
  scene: PropTypes.object
};

export default SceneBoard;
