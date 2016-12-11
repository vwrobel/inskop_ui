import React, { PropTypes, Component } from 'react';
import { StyleSheet, css } from 'aphrodite';


const styles = StyleSheet.create({
  container: {
    padding: 30
  },
  viewer: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },
  title: {
    marginBottom: 10
  }
});

class ViewAnalysis extends Component {
  render() {
    const { scene, analysis } = this.props;
    return (
      <div className={css(styles.container)}>
        <h6 className={css(styles.title)}>Description</h6>
        <div className={css(styles.viewer)}>
          {analysis.description}
        </div>
      </div>
    );
  }
}

ViewAnalysis.propTypes = {
  scene: PropTypes.object,
  analysis: PropTypes.object
};


export default ViewAnalysis;
