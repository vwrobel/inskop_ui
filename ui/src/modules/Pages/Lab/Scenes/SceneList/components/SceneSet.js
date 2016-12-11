import React, { PropTypes, Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import SceneCard from './SceneCard/SceneCard';


const styles = StyleSheet.create({
  sceneGrid: {
    display: 'flex',
    alignItems: 'stretch',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  }
});

class SceneSet extends Component {

  render() {
    const {
      scenes,
      dispatch,
      collectionIndex,
      showedDescriptionId,
      star,
      unlock
    } = this.props;

    const scenesExt = _.map(scenes, (scene) => scene.node);
    const scenesSort = _.sortBy(scenesExt, 'createdAt').reverse();
    return (
      <div className={css(styles.sceneGrid)}>
        {
          scenesSort.map((scene, cardIndex) => (
              scene ? <SceneCard
                key={scene.name}
                scene={scene}
                collectionIndex={collectionIndex}
                cardIndex={cardIndex}
                isShowedDescription={scene.id === showedDescriptionId}
                dispatch={dispatch}
                star={star}
                unlock={unlock}
              /> : null
            ))
        }
      </div>
    );
  }
}

SceneSet.propTypes = {
  scenes: PropTypes.array,
  dispatch: PropTypes.func,
  collectionIndex: PropTypes.number,
  showedDescriptionId: PropTypes.string,
  star: PropTypes.func,
  unlock: PropTypes.func
};

const mapStateToProps = (state) => ({
  showedDescriptionId: state.scene.list.main.showedDescriptionId
});

export default connect(mapStateToProps)(SceneSet);
