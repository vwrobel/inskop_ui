import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'react-addons-update';
import EditDialog from '../../../../../Common/All/Dialog/EditDialog';
import Alert from '../../../../../Common/All/Dialog/Alert';
import FloatingAddButton from '../../../../../Common/All/Buttons/FloatingAddButton';
import SceneEditForm from '../components/SceneEditForm/SceneEditForm';
import { sceneEditOpenDialogCreate, sceneAddUpload, sceneEditOpenAlert } from '../SceneListActions';

const styles = StyleSheet.create({
  container: {
  }
});

class SceneAdder extends Component {

  constructor(props) {
    super(props);
    this.sceneAddSubmit = this.sceneAddSubmit.bind(this);
    this.sceneAddAbort = this.sceneAddAbort.bind(this);
  }

  sceneAddSubmit() {
    const {
      dispatch,
      authenticated,
      token,
      sceneNameInput,
      sceneDescriptionInput,
      sceneStatusInput,
      sceneLockInput,
      droppedFile,
      addScene
    } = this.props;
    dispatch(sceneAddUpload(authenticated, token, sceneNameInput, droppedFile)).then(
      () => addScene(
        sceneNameInput,
        sceneDescriptionInput,
        sceneStatusInput ? 'question' : 'normal',
        sceneLockInput
      )
    );
  }

  sceneAddAbort() {
    const {
      dispatch
    } = this.props;
    dispatch(sceneEditOpenDialogCreate(false));
  }

  render() {
    const {
      dispatch,
      openedCreateDialog,
      openedAlert,
      children,
      validDroppedFile,
      sceneCanSubmit,
      userData
    } = this.props;
    return (
      <div className={css(styles.container)}>
        {children}
        <FloatingAddButton
          addFunction={() => {
            if (userData.authorization.level < 5){
              dispatch(sceneEditOpenDialogCreate(true));
            } else {
              dispatch(sceneEditOpenAlert(true));
            }
          }}
          addLabel='Add scene'
        />
        <EditDialog
          dialogTitle={'New scene'}
          dialogValidateLabel={'Create'}
          editObject={this.sceneAddSubmit}
          closeEditDialog={this.sceneAddAbort}
          openedEditDialog={openedCreateDialog}
          canSubmit={sceneCanSubmit && validDroppedFile}
        >
          <SceneEditForm />
        </EditDialog>
        <Alert
          messageAlert={
            <span>
              You cannot add a video yet.
              Write to <a href='mailto:contact@inskop.io'>contact@inskop.io</a> for more info.
            </span>
          }
          closeAlert={() => dispatch(sceneEditOpenAlert(false))}
          openedAlert={openedAlert}
        />
      </div>
    );
  }
}

SceneAdder.propTypes = {
  dispatch: PropTypes.func,
  openedCreateDialog: PropTypes.bool,
  token: PropTypes.string,
  authenticated: PropTypes.bool,
  addScene: PropTypes.func,
  sceneNameInput: PropTypes.string,
  sceneDescriptionInput: PropTypes.string,
  sceneStatusInput: PropTypes.bool,
  sceneLockInput: PropTypes.bool,
  droppedFile: PropTypes.object,
  validDroppedFile: PropTypes.bool,
  children: PropTypes.any,
  sceneCanSubmit: PropTypes.bool,
  openedAlert: PropTypes.bool,
  userData: PropTypes.object
};

const mapStateToProps = (state) => ({
  openedCreateDialog: state.scene.list.main.openedCreateDialog,
  token: state.auth.idToken,
  authenticated: state.auth.isAuthenticated,
  sceneNameInput: state.scene.list.main.sceneNameInput,
  sceneDescriptionInput: state.scene.list.main.sceneDescriptionInput,
  sceneStatusInput: state.scene.list.main.sceneStatusInput,
  sceneLockInput: state.scene.list.main.sceneLockInput,
  droppedFile: state.scene.list.main.droppedFile,
  sceneCanSubmit: state.scene.list.main.canSubmit,
  validDroppedFile: state.scene.list.main.validDroppedFile,
  openedAlert: state.scene.list.main.openedAlert,
  userData: state.auth.userData
});

const SceneAdderWithState = connect(mapStateToProps)(SceneAdder);

const AddSceneMutation = gql`
mutation AddScene($name: String!, $description: String!, $status: String!, $locked: Boolean!){
  addScene(name: $name, description: $description, status: $status, locked: $locked) {
    ok
    scene {
      id
      name
      slug
      description
      createdAt
      locked
      thumbnail
      duration
      favoriteCount
      isUserFavorite
      isUserOwner
      status {
        name
      }
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

const SceneAdderWithStateAndData = compose(
  graphql(AddSceneMutation, {
    props: ({ mutate }) => ({
      addScene: (name, description, status, locked) => mutate({
        variables: { name, description, status, locked },
        updateQueries: {
          SceneCollections: (prev, { mutationResult }) => {
            const newScene = mutationResult.data.addScene.scene;
            return update(prev, {
              myScenes: {
                edges: {
                  $unshift: [{ node: newScene }]
                }
              }
            });
          }
        }
      })
    })
  })
)(SceneAdderWithState);

export default SceneAdderWithStateAndData;
