import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import ReactTooltip from 'react-tooltip';
import { capitalizeFirstLetter } from '../../../../../../../../../../utils/Functions';
import SceneStatusIcon from '../../../../../../../../../Common/Scene/SceneStatusIcon';

const styles = StyleSheet.create({
  container: {
    float: 'left',
    height: 60,
    minWidth: 240
  },
  title: {
    marginRight: 20,
    padding: 10,
    height: 20,
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  status: {
    marginTop: 0,
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  tooltip: {
    marginTop: 15,
    opacity: '0.2'
  }
});

class Title extends Component {
  render() {
    const { scene } = this.props;
    return (
      <div className={css(styles.container)} >
        <ReactTooltip id='sceneDescription' place='bottom' type='dark' effect='solid' class={''} delayHide={0} delayShow={500}>
          <span>{scene.description}</span>
        </ReactTooltip>
        <h4 className={css(styles.title)}>
          {capitalizeFirstLetter(scene.name)}
        </h4>
        <div className={css(styles.status)} data-tip data-for='sceneDescription'>
          <SceneStatusIcon status={scene.status} />
        </div>
      </div>
    );
  }
}

Title.propTypes = {
  scene: PropTypes.object
};


export default Title;
