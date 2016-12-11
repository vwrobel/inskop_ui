import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import update from 'react-addons-update';
import { StyleSheet, css } from 'aphrodite';
import RaisedButton from 'material-ui/RaisedButton';
import Formsy from 'formsy-react';
import { FormsySelect, FormsyText } from 'formsy-material-ui/lib';
import MenuItem from 'material-ui/MenuItem';
import { trackerSelect, trackerParamInputSet, processWaiting } from '../../../../ToolsActions';
import { videoSelect } from '../../../../../Analysis/AnalysisActions';
import Gnome from '../../../../../../../../../../Common/All/Loading/Gnome/Gnome';

const styles = StyleSheet.create({
  container: {
    padding: 30
  }
});

class Track extends Component {

  render() {
    const {
      addVideo,
      analysis,
      dispatch,
      availableTrackers,
      trackerSelected,
      trackerParamInput,
      processProcessing
    } = this.props;
    const trackerItems = availableTrackers.map((tracker, trackerIndex) => (
      <MenuItem key={trackerIndex} value={trackerIndex} primaryText={tracker.name} />
    ));
    const tracker = (availableTrackers && trackerSelected !== null) ?
      availableTrackers[trackerSelected] : null;
    const defaultParam = tracker ? tracker.defaultParam : '';
    const trackerParam = trackerParamInput || defaultParam;
    const processingGnome = processProcessing ? <Gnome /> : null;
    return (
      <div className={css(styles.container)}>
        <h5>Track all selections</h5>
        <Formsy.Form
          onValid={() => {}}
          onInvalid={() => {}}
          onValidSubmit={() => {}}
          onInvalidSubmit={() => {}}
        >
          <FormsySelect
            name='Selected Tracker'
            value={trackerSelected}
            floatingLabelText='Tracker'
            onChange={(e, value) => dispatch(trackerSelect(value))}
          >
            {trackerItems}
          </FormsySelect>
          <FormsyText
            name='param'
            validations='isWords'
            floatingLabelText='Tracker parameters'
            defaultValue={''}
            value={trackerParam}
            onChange={(e) => { dispatch(trackerParamInputSet(e.target.value)); }}
            rows={4}
            multiLine
          />
          <RaisedButton
            style={{ display: 'inline-block' }}
            type='run'
            label='Run'
            disabled={false}
            onClick={() => {
              dispatch(processWaiting(true));
              addVideo(analysis.id, 1, tracker.id, trackerParam).then(
                (res) => {
                  dispatch(videoSelect(res.data.addVideo.video.slug));
                  dispatch(processWaiting(false));
                });
            }
            }
          />
          {processingGnome}
        </Formsy.Form>
      </div>
    );
  }
}

Track.propTypes = {
  dispatch: PropTypes.func,
  addVideo: PropTypes.func,
  scene: PropTypes.object,
  analysis: PropTypes.object,
  selections: PropTypes.array,
  trackerSelected: PropTypes.number,
  availableTrackers: PropTypes.array,
  trackerParamInput: PropTypes.string,
  processProcessing: PropTypes.bool
};

const AddVideoMutation = gql`
mutation AddTrackedVideo($analysisId: ID!, $cameraNumber: Int!, $codeId: ID!, $param: String){
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

const TrackWithData = compose(
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
    })
  })
)(Track);

const mapStateToProps = (state) => ({
  trackerSelected: state.scene.detail.tools.trackerSelected,
  trackerParamInput: state.scene.detail.tools.trackerParamInput,
  processProcessing: state.scene.detail.tools.processProcessing
});

const TrackWithDataAndState = connect(mapStateToProps)(TrackWithData);

export default TrackWithDataAndState;
