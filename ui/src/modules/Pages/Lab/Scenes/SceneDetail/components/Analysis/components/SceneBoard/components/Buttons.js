import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Buttons from '../../../../../../SceneList/components/SceneCard/components/Buttons';
import SceneModifier from '../../../../../../SceneList/components/SceneModifier';

const styles = StyleSheet.create({
  container: {
  }
});

class Info extends Component {
  render() {
    const { scene, dispatch } = this.props;
    return (
      <div className={css(styles.container)}>
        <SceneModifier>
          <Buttons
            dispatch={dispatch}
            scene={scene}
            containerWidth={'250px'}
          />
        </SceneModifier>
      </div>
    );
  }
}

Info.propTypes = {
  dispatch: PropTypes.func,
  scene: PropTypes.object
};

export default Info;
