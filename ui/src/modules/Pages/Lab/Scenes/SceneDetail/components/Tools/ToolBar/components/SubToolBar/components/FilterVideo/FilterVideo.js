import React, { PropTypes, Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import VideoForm from './components/VideoForm';

const styles = StyleSheet.create({
  container: {
    padding: 30
  }
});

class FilterVideo extends Component {
  render() {
    const { scene, analysis, videos, availableFilters } = this.props;
    return (
      <div className={css(styles.container)}>
        <VideoForm
          scene={scene}
          analysis={analysis}
          videos={videos}
          availableFilters={availableFilters}
        />
      </div>
    );
  }
}

FilterVideo.propTypes = {
  scene: PropTypes.object,
  analysis: PropTypes.object,
  videos: PropTypes.array,
  availableFilters: PropTypes.array
};


export default FilterVideo;
