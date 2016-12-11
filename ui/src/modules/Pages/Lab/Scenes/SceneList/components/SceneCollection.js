import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Loading from '../../../../../Common/All/Loading/Loading';
import SceneSet from './SceneSet';

const styles = StyleSheet.create({
  container: {
    marginBottom: 50
  },
  hr: {
    border: 0,
    height: 2,
    backgroundImage: 'linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3))'
  }
});

class SceneCollection extends Component {
  render() {
    const { loading, title, collectionIndex, sceneCollection, star, unlock } = this.props;
    let content = <div />;
    if (loading) {
      content = <Loading />;
    } else if (sceneCollection) {
      content = (<SceneSet
        scenes={sceneCollection.edges}
        collectionIndex={collectionIndex}
        star={star}
        unlock={unlock}
      />);
    }
    return (
      <div className={css(styles.container)}>
        <h3>{`${title} scenes`}</h3>
        <hr className={css(styles.hr)} />
        { content }
      </div>
    );
  }
}

SceneCollection.propTypes = {
  loading: PropTypes.bool,
  title: PropTypes.string,
  collectionIndex: PropTypes.number,
  sceneCollection: PropTypes.object,
  star: PropTypes.func,
  unlock: PropTypes.func
};

export default SceneCollection;
