import React, { PropTypes, Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Codemirror from 'react-codemirror';
import SceneStatusIcon from '../../../../../../../../../../../Common/Scene/SceneStatusIcon';
import ShareButton from '../../../../../../../../../../../Common/All/Buttons/ShareByMailButton';

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
  componentWillMount() {
    const isBrowser = typeof window !== 'undefined';
    const yamlMode = isBrowser ? require('codemirror/mode/yaml/yaml') : undefined;
  }
  render() {
    const { scene, analysis, video, location } = this.props;
    const options = {
      lineNumbers: false,
      mode: 'yaml',
      readOnly: true
    };

    const sceneDescriptionFormated = scene.description.split("\n").map((item, index) => (
        <span key={index}>
          {item}
          <br/>
        </span>));

    const analysisDescriptionFormated = analysis.description.split("\n").map((item, index) => (
        <span key={index}>
          {item}
          <br/>
        </span>));

    const currentLocation = typeof window === 'undefined' ? '' : window.location.href;
    const mailSubject = 'From inskop.io - scene ' + scene.name + ' / analysis ' + analysis.name;
    const mailBody = 'A link to inskop.io: ' + currentLocation;

    return (
      <div className={css(styles.container)}>
        <div style={{ display: 'inline-block' }} >
          <h6 className={css(styles.title)}>
            <span style={{ opacity: 0.7}}>Scene:</span>
            <span style={{ marginLeft: 10}}>{scene.name}</span></h6>
        </div>
        <div style={{ display: 'inline-block', float: 'right' }} >
          <SceneStatusIcon status={scene.status} mini />
        </div>
        <div className={css(styles.viewer)}>
          {sceneDescriptionFormated}
        </div>
        <h6 className={css(styles.title)}>
          <span style={{ opacity: 0.7}}>Analysis:</span>
          <span style={{ marginLeft: 10}}>{analysis.name}</span>
        </h6>
        <div className={css(styles.viewer)}>
          {analysisDescriptionFormated}
        </div>
        <h6 className={css(styles.title)}>
          <span style={{ opacity: 0.7}}>Video:</span>
          <span style={{ marginLeft: 10}}>{video.slug}</span>
        </h6>
        <div className={css(styles.viewer)}>
          {video.process.process ?
          <Codemirror
            value={video.process.process}
            options={options}
          /> : null}
        </div>
        <a href={`mailto:?subject=${mailSubject}&body=${mailBody}`}>
          <ShareButton />
        </a>
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
