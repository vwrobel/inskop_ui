import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import Formsy from 'formsy-react';
import { FormsyText, FormsyRadioGroup, FormsyRadio } from 'formsy-material-ui/lib';
import Codemirror from 'react-codemirror';
import CodeCategoryIcon from '../../../../../../../../Common/Code/CodeCategoryIcon';
import processTemplate from './processTemplate.yaml'
import { videoEditDescriptionInput, videoEditProcessInput, videoEditNameInput, videoEditReset, videoEditCanSubmit, videoEditCategoryInput } from '../../AnalysisActions';

const styles = StyleSheet.create({
  formInput: {
    display: 'block'
  },
  processContainer: {
    marginTop:20,
    backgroundColor: 'white',
    overflowY: 'scroll',
    height: 400
  }
});

const switchStyle = {
  marginBottom: 16
};

class VideoEditForm extends Component {
  componentWillMount() {
    const isBrowser = typeof window !== 'undefined';
    const yamlMode = isBrowser ? require('codemirror/mode/yaml/yaml') : undefined;
  }
  componentDidMount() {
    const { video, dispatch } = this.props;
    if (video) {
      dispatch(videoEditNameInput(video.name));
      dispatch(videoEditDescriptionInput(video.description));
      dispatch(videoEditProcessInput(video.process.process));
    } else {
      dispatch(videoEditProcessInput(processTemplate));
    }
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(videoEditReset());
  }
  render() {
    const {
      dispatch,
      videoNameInput,
      videoDescriptionInput,
      videoCategoryInput,
      videoProcessInput,
      video,
      videoCanSubmit
    } = this.props;
    const videoCategories = ['video filter', 'tracker'];
    const options = {
      lineNumbers: true,
      mode: 'yaml',
      readOnly: false
    };
    return (
      <Formsy.Form
        onValid={() => {if (!videoCanSubmit) {dispatch(videoEditCanSubmit(true));}}}  //  this.enableButton
        onInvalid={() => {if (videoCanSubmit) {dispatch(videoEditCanSubmit(false));}}}  //  this.disableButton
        onValidSubmit={() => {}}
        onInvalidSubmit={() => { console.log('invalid form'); }}  //  this.notifyFormError
      >
        <FormsyText
          name='name'
          validations='isExisty'
          validationError='This is not a valid name'
          required
          floatingLabelText='Name'
          defaultValue={video ? video.name : ''}
          value={videoNameInput}
          onChange={(e) => { dispatch(videoEditNameInput(e.target.value)); }}
          className={css(styles.formInput)}
          disabled={video ? true : false}
        />
        <div className={css(styles.processContainer)}>
          <Codemirror
            value={videoProcessInput}
            onChange={(value) => { dispatch(videoEditProcessInput(value)); }}
            options={options}
          />
        </div>
      </Formsy.Form>
    );
  }
}


VideoEditForm.propTypes = {
  dispatch: PropTypes.func,
  videoNameInput: PropTypes.string,
  videoDescriptionInput: PropTypes.string,
  videoProcessInput: PropTypes.string,
  videoCategoryInput: PropTypes.string,
  video: PropTypes.object,
  videoCanSubmit: PropTypes.bool
};

const mapStateToProps = (state) => ({
  videoNameInput: state.scene.detail.analysis.videoNameInput,
  videoDescriptionInput: state.scene.detail.analysis.videoDescriptionInput,
  videoProcessInput: state.scene.detail.analysis.videoProcessInput,
  videoCategoryInput: state.scene.detail.analysis.videoCategoryInput,
  videoCanSubmit: state.scene.detail.analysis.canSubmit
});


export default connect(mapStateToProps)(VideoEditForm);
