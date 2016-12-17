import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { capitalizeFirstLetter } from '../../../../../../../../../../utils/Functions';

const styles = StyleSheet.create({
  container: {
    float: 'left',
    height: 60,
    minWidth: 200
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
        <h4 className={css(styles.title)}>
          {capitalizeFirstLetter(scene.name)}
        </h4>
      </div>
    );
  }
}

Title.propTypes = {
  scene: PropTypes.object
};


export default Title;
