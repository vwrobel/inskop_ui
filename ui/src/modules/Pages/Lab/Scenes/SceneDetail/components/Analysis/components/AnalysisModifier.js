import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'react-addons-update';
import { push } from 'react-router-redux';
import _ from 'underscore';
import EditDialog from '../../../../../../../Common/All/Dialog/EditDialog';
import DeleteDialog from '../../../../../../../Common/All/Dialog/DeleteDialog';
import AnalysisEditForm from '../components/AnalysisEditForm/AnalysisEditForm';
import { analysisEditOpenDialogDelete, analysisEditOpenDialogModify } from '../AnalysisActions';

const styles = StyleSheet.create({
  container: {
  }
});

class AnalysisModifier extends Component {

  render() {
    const {
      dispatch,
      changeAnalysis,
      deleteAnalysis,
      children,
      star,
      unlock,
      analysisEdited,
      analysisNameInput,
      analysisDescriptionInput,
      analysisOpenedModifyDialog,
      analysisOpenedDeleteDialog,
      scene,
      analysisCanSubmit
    } = this.props;
    const childrenWithProps = React.Children.map(children,
      (child) => React.cloneElement(child, {
        star,
        unlock
      }));
    return (
      <div className={css(styles.container)}>
        <EditDialog
          dialogTitle={'Edit analysis'}
          dialogValidateLabel={'Edit'}
          editObject={() => {
            changeAnalysis(
              analysisEdited.id,
              analysisNameInput,
              analysisDescriptionInput
            );
          }}
          closeEditDialog={() => dispatch(analysisEditOpenDialogModify(false))}
          openedEditDialog={analysisOpenedModifyDialog || false}
          canSubmit={analysisCanSubmit}
        >
          <AnalysisEditForm
            analysis={analysisEdited}
          />
        </EditDialog>
        <DeleteDialog
          deleteObject={() => {
            dispatch(push(`/lab/scenes/${scene.name}`));
            deleteAnalysis(analysisEdited.id);
          }}
          closeDeleteDialog={() => dispatch(analysisEditOpenDialogDelete(false))}
          openedDeleteDialog={analysisOpenedDeleteDialog || false}
        />
        {childrenWithProps}
      </div>
    );
  }
}

AnalysisModifier.propTypes = {
  scene: PropTypes.object,
  children: PropTypes.any,
  dispatch: PropTypes.func,
  changeAnalysis: PropTypes.func,
  deleteAnalysis: PropTypes.func,
  analysisNameInput: PropTypes.string,
  analysisDescriptionInput: PropTypes.string,
  star: PropTypes.func,
  unlock: PropTypes.func,
  analysisEdited: PropTypes.object,
  analysisOpenedModifyDialog: PropTypes.bool,
  analysisOpenedDeleteDialog: PropTypes.bool,
  analysisCanSubmit: PropTypes.bool
};

const mapStateToProps = (state) => ({
  analysisNameInput: state.scene.detail.analysis.analysisNameInput,
  analysisDescriptionInput: state.scene.detail.analysis.analysisDescriptionInput,
  analysisEdited: state.scene.detail.analysis.analysisEdited,
  analysisOpenedModifyDialog: state.scene.detail.analysis.analysisOpenedModifyDialog,
  analysisOpenedDeleteDialog: state.scene.detail.analysis.analysisOpenedDeleteDialog,
  analysisCanSubmit: state.scene.detail.analysis.analysisCanSubmit
});

const AnalysisModifierWithState = connect(mapStateToProps)(AnalysisModifier);

const UnlockAnalysisMutation = gql `
mutation UnlockAnalysis($analysisId: String!) {
  unlockAnalysis(analysisId: $analysisId) {
    ok
    analysis{
      id
      name
      locked
    }
  }
}`;

const StarAnalysisMutation = gql `
mutation StarAnalysis($analysisId: String!) {
  starAnalysis(analysisId: $analysisId) {
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

const DeleteAnalysisMutation = gql `
mutation DeleteAnalysis($analysisId: String!) {
  deleteAnalysis(analysisId: $analysisId) {
    ok
    analysis {
      id
      active
    }
  }
}`;

const ChangeAnalysisMutation = gql `
mutation ChangeAnalysis($analysisId: String!, $name: String, $description: String) {
  changeAnalysis(analysisId: $analysisId, name: $name, description: $description) {
    ok
    analysis {
      id
      name
      description
    }
  }
}`;

const AnalysisModifierWithStateAndData = compose(
  graphql(ChangeAnalysisMutation, {
    props: ({ mutate }) => ({
      changeAnalysis: (analysisId, name, description) =>
        mutate({ variables: { analysisId, name, description} })
    })
  }),
  graphql(DeleteAnalysisMutation, {
    props: ({ mutate }) => ({
      deleteAnalysis: (analysisId) => mutate({
        variables: { analysisId },
        updateQueries: {
          SceneQuery: (prev, { mutationResult }) => {
            const allAnalysesList = prev.allAnalyses.edges.map((item) => item.node);
            const deleteIndex = _.findIndex(allAnalysesList, (item) => item.id === analysisId);
            if (deleteIndex < 0) {
              return prev;
            }
            return update(prev, {
              allAnalyses: {
                edges: {
                  $splice: [[deleteIndex, 1]]
                }
              }
            });
          }
        }
      })
    })
  }),
  graphql(UnlockAnalysisMutation, {
    props: ({ mutate }) => ({
      unlock: (analysisId) => mutate({ variables: { analysisId } })
    })
  }),
  graphql(StarAnalysisMutation, {
    props: ({ mutate }) => ({
      star: (analysisId, analysisIsUserOwner, analysisIsUserFavorite) => mutate({
        variables: { analysisId }
      })
    })
  })
)(AnalysisModifierWithState);

export default AnalysisModifierWithStateAndData;
