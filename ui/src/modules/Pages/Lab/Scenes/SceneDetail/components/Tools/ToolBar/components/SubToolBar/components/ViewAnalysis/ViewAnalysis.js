import React, { PropTypes, Component } from 'react';
import { StyleSheet, css } from 'aphrodite';


const styles = StyleSheet.create({
  container: {
    padding: 30
  },
  viewer: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 40

  },
  title: {
    marginBottom: 10
  }
});

class ViewAnalysis extends Component {
  render() {
    const { scene, analysis, video } = this.props;
    return (
      <div className={css(styles.container)}>
        <h6 className={css(styles.title)}>Analysis description</h6>
        <div className={css(styles.viewer)}>
          {analysis.description}
        </div>
        <h6 className={css(styles.title)}>Current video process</h6>
        <div className={css(styles.viewer)}>
          {video.process.process}
        </div>
      </div>
    );
  }
}

ViewAnalysis.propTypes = {
  scene: PropTypes.object,
  analysis: PropTypes.object,
  video: PropTypes.object
};


export default ViewAnalysis;
