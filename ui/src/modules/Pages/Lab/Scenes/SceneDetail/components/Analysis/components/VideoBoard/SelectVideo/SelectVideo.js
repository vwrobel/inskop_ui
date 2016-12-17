import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import _ from 'underscore';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { push } from 'react-router-redux'
import { videoSelect, videoInitLaunch } from '../../../AnalysisActions';
import CodeCategoryPic from '../../../../../../../../../Common/Code/CodeCategoryPic';

const styles = StyleSheet.create({
  container: {
    width: 250,
    marginTop: '-10px',
    marginRight: '-30'
  }
});

class SelectVideo extends Component {

  render() {
    const { videoSelected, dispatch, videos, scene, analysis } = this.props;
    const videoSelectedIndex = videoSelected ? _.findIndex(videos,
      (item) => (item.slug === videoSelected)) : null;
    return (
      <div className={css(styles.container)}>
        <SelectField
          floatingLabelText='Video'
          value={videoSelectedIndex}
          onChange={(e, i, value) => {
            const newVideo = videos[value];
            dispatch(push(`/lab/scenes/${scene.slug}/analyses/${analysis.slug}/videos/${newVideo.slug}/tools/view-analysis`));
            dispatch(videoInitLaunch(true));
          }}
        >
          {videos.map((video, videoIndex) => (
            <MenuItem
              key={video.slug}
              value={videoIndex}
              primaryText={video.slug}
            />
            ))}
        </SelectField>
      </div>
    );
  }
}

SelectVideo.propTypes = {
  dispatch: PropTypes.func,
  videoSelected: PropTypes.string,
  videos: PropTypes.array,
  analysis: PropTypes.object,
  scene: PropTypes.object
};


export default SelectVideo;
