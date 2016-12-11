import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import SceneCollections from './components/SceneCollections';
import { sceneListReset } from './SceneListActions';

const styles = StyleSheet.create({
  container: {
    padding: 40
  }
});

class SceneList extends Component {

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(sceneListReset());
  }

  render() {
    return (
      <div className={css(styles.container)}>
        <SceneCollections />
      </div>
    );
  }
}

SceneList.propTypes = {
  dispatch: PropTypes.func
};


export default connect()(SceneList);
