import React, { PropTypes, Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import Formsy from 'formsy-react';
import { FormsyText, FormsySelect } from 'formsy-material-ui/lib';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import { filterParamInputSet, filterSelect, processWaiting } from '../../../../../../ToolsActions';
import { videoSelect } from '../../../../../../../Analysis/AnalysisActions';
import Gnome from '../../../../../../../../../../../../Common/All/Loading/Gnome/Gnome';

const styles = StyleSheet.create({
  container: {
  },
  form: {
    padding: 10
  }
});

class VideoForm extends Component {
  submitForm() {
    const {
      dispatch,
      analysis,
      addVideo,
      availableFilters,
      filterSelected,
      filterParamInput
    } = this.props;
    const filter = availableFilters[filterSelected];
    dispatch(processWaiting(true));
    addVideo(analysis.id, 1, filter.id, filterParamInput).then(
      (res) => {
        dispatch(videoSelect(res.data.addVideo.video.slug));
        dispatch(processWaiting(false));
      });
  }
  render() {
    const {
      dispatch,
      availableFilters,
      filterSelected,
      filterParamInput,
      processProcessing
    } = this.props;
    const defaultParam = (filterSelected !== null) ? availableFilters[filterSelected].defaultParam : '';
    const processingGnome = processProcessing ? <Gnome /> : null;
    return (
      <div className={css(styles.container)}>
        <h5>Add video filter</h5>
        <Formsy.Form
          onValid={() => {}}  //  this.enableButton
          onInvalid={() => {}}  //  this.disableButton
          onValidSubmit={() => {
          }}
          onInvalidSubmit={() => { console.log('invalid form'); }}  //  this.notifyFormError
        >
          <FormsySelect
            name='Select filter'
            value={filterSelected}
            floatingLabelText='Available'
            onChange={(e, value) => { dispatch(filterSelect(value)); }}
          >
            {
              availableFilters.map((filter, filterIndex) => (
                <MenuItem key={filterIndex} value={filterIndex} primaryText={filter.name} />
              ))
            }
          </FormsySelect>
          <FormsyText
            name='param'
            validations='isWords'
            floatingLabelText='Filter parameters'
            defaultValue={''}
            value={filterParamInput || defaultParam}
            onChange={(e) => { dispatch(filterParamInputSet(e.target.value)); }}
            rows={4}
            multiLine
          />
          <RaisedButton
            style={{ marginTop: 20 }}
            type='submit'
            label='Add'
            onClick={() => this.submitForm()}
          />
          {processingGnome}
        </Formsy.Form>
      </div>
    );
  }
}

VideoForm.propTypes = {
  dispatch: PropTypes.func,
  analysis: PropTypes.object,
  availableFilters: PropTypes.array,
  addVideo: PropTypes.func,
  filterSelected: PropTypes.number,
  filterParamInput: PropTypes.string,
  processProcessing: PropTypes.bool
};

const mapStateToProps = (state) => ({
  nameInput: state.scene.detail.tools.sceneNameInput,
  descriptionInput: state.scene.detail.tools.sceneDescriptionInput,
  filterSelected: state.scene.detail.tools.filterSelected,
  filterParamInput: state.scene.detail.tools.filterParamInput,
  processProcessing: state.scene.detail.tools.processProcessing
});

const VideoFormWithState = connect(mapStateToProps)(VideoForm);

const AddVideoMutation = gql`
mutation AddFilteredVideo($analysisId: ID!, $cameraNumber: Int!, $codeId: ID!, $param: String){
  addVideo(analysisId: $analysisId, cameraNumber: $cameraNumber, codeId: $codeId, param: $param) {
    video {
      id
      name
      slug
      camera {
        name
        scene {
          name
        }
      }
      process {
        code {
          name
          category {
              name
            }
        }
        param
      }
      file
    }
    ok
  }
}`;

const VideoFormWithStateAndData = compose(
  graphql(AddVideoMutation, {
    props: ({ mutate }) => ({
      addVideo: (analysisId, cameraNumber, codeId, param) =>
        mutate({
          variables: { analysisId, cameraNumber, codeId, param },
          updateQueries: {
            SelectionQuery: (prev, { mutationResult }) => {
              const newVideo = mutationResult.data.addVideo.video;
              return update(prev, {
                allVideosOfAnalysis: {
                  edges: {
                    $unshift: [{ node: newVideo }]
                  }
                }
              });
            }
          }
        })
    }) })
)(VideoFormWithState);

export default VideoFormWithStateAndData;
