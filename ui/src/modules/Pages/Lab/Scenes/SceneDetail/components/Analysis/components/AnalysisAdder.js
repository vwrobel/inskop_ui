import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { push } from 'react-router-redux'
import update from 'react-addons-update';
import Alert from '../../../../../../../Common/All/Dialog/Alert';
import EditDialog from '../../../../../../../Common/All/Dialog/EditDialog';
import AnalysisEditForm from './AnalysisEditForm/AnalysisEditForm';
import { analysisEditOpenDialogCreate, analysisEditOpenAlert } from '../AnalysisActions';

const styles = StyleSheet.create({
  container: {
  }
});

class AnalysisAdder extends Component {

  constructor(props) {
    super(props);
    this.analysisAddSubmit = this.analysisAddSubmit.bind(this);
    this.analysisAddAbort = this.analysisAddAbort.bind(this);
  }
  analysisAddSubmit() {
    const {
      scene,
      dispatch,
      analysisNameInput,
      analysisDescriptionInput,
      addAnalysis
    } = this.props;
    addAnalysis(scene.id, analysisNameInput, analysisDescriptionInput).then(
      (res) => {
        dispatch(push(`/lab/scenes/${scene.slug}/analyses/${res.data.addAnalysis.analysis.slug}/view-analysis`));
      }
    );
  }
  analysisAddAbort() {
    const {
      dispatch
    } = this.props;
    dispatch(analysisEditOpenDialogCreate(false));
  }

  render() {
    const {
      dispatch,
      analysisOpenedCreateDialog,
      analysisOpenedAlert,
      children,
      analysisCanSubmit
    } = this.props;
    return (
      <div className={css(styles.container)}>
        {children}
        <EditDialog
          dialogTitle={'New analysis'}
          dialogValidateLabel={'Create'}
          editObject={this.analysisAddSubmit}
          closeEditDialog={this.analysisAddAbort}
          openedEditDialog={analysisOpenedCreateDialog}
          canSubmit={analysisCanSubmit}
        >
          <AnalysisEditForm />
        </EditDialog>
        <Alert
          messageAlert={
            <span>
              You cannot add an analysis yet.
              Write to <a href='mailto:contact@inskop.io'>contact@inskop.io</a> for more info.
            </span>
          }
          closeAlert={() => dispatch(analysisEditOpenAlert(false))}
          openedAlert={analysisOpenedAlert}
        />
      </div>
    );
  }
}

AnalysisAdder.propTypes = {
  dispatch: PropTypes.func,
  analysisOpenedCreateDialog: PropTypes.bool,
  analysisOpenedAlert: PropTypes.bool,
  addAnalysis: PropTypes.func,
  analysisNameInput: PropTypes.string,
  analysisDescriptionInput: PropTypes.string,
  children: PropTypes.any,
  scene: PropTypes.object,
  analysisCanSubmit: PropTypes.bool
};

const mapStateToProps = (state) => ({
  analysisOpenedCreateDialog: state.scene.detail.analysis.analysisOpenedCreateDialog,
  analysisOpenedAlert: state.scene.detail.analysis.analysisOpenedAlert,
  analysisNameInput: state.scene.detail.analysis.analysisNameInput,
  analysisDescriptionInput: state.scene.detail.analysis.analysisDescriptionInput,
  analysisCanSubmit: state.scene.detail.analysis.analysisCanSubmit
});

const AnalysisAdderWithState = connect(mapStateToProps)(AnalysisAdder);

const AddAnalysisMutation = gql`
mutation AddAnalysis($sceneId: ID!, $name: String!, $description: String!){
  addAnalysis(sceneId: $sceneId, name: $name, description: $description) {
    ok
    analysis {
      id
      name
      slug
      description
      locked
      favoriteCount
      isUserFavorite
      isUserOwner
      owner {
        id
        name
        picture
        slug
        bio
        sceneStars
        codeStars
        analysisStars
      }
    }
  }
}`;

const AnalysisAdderWithStateAndData = compose(
  graphql(AddAnalysisMutation, {
    props: ({ mutate }) => ({
      addAnalysis: (sceneId, name, description) => mutate({
        variables: { sceneId, name, description },
        updateQueries: {
          SceneQuery: (prev, { mutationResult }) => {
            const newAnalysis = mutationResult.data.addAnalysis.analysis;
            return update(prev, {
              allAnalyses: {
                edges: {
                  $unshift: [{ node: newAnalysis }]
                }
              }
            });
          }
        }
      })
    })
  })
)(AnalysisAdderWithState);

export default AnalysisAdderWithStateAndData;
