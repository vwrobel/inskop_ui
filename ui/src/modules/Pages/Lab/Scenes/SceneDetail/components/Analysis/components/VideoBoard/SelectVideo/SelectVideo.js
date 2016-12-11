import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import _ from 'underscore';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { videoSelect, videoInitLaunch } from '../../../AnalysisActions';
import CodeCategoryPic from '../../../../../../../../../Common/Code/CodeCategoryPic';

const styles = StyleSheet.create({
  container: {
    width: '17%',
    display: 'flex',
    marginTop: '-10px'
  }
});

class SelectVideo extends Component {

  render() {
    const { videoSelected, dispatch, videos } = this.props;
    const videoSelectedIndex = videoSelected ? _.findIndex(videos,
      (item) => (item.slug === videoSelected)) : null;
    return (
      <div className={css(styles.container)}>
        <SelectField
          floatingLabelText='Video'
          value={videoSelectedIndex}
          onChange={(e, i, value) => {
            const newVideo = videos[value];
            dispatch(videoSelect(newVideo.slug));
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
  videos: PropTypes.array
};


export default SelectVideo;
