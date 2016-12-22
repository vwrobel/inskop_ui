import React, { Component, PropTypes } from "react";
import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import update from "react-addons-update";
import { push } from "react-router-redux";
import _ from "underscore";
import EditDialog from "../../../../../Common/All/Dialog/EditDialog";
import DeleteDialog from "../../../../../Common/All/Dialog/DeleteDialog";
import SceneEditForm from "../components/SceneEditForm/SceneEditForm";
import { sceneEditOpenDialogDelete, sceneEditOpenDialogModify } from "../SceneListActions";

const styles = StyleSheet.create({
  container: {}
});

class SceneModifier extends Component {

  render() {
    const {
      dispatch,
      changeScene,
      deleteScene,
      children,
      star,
      unlock,
      editedScene,
      sceneNameInput,
      sceneDescriptionInput,
      sceneStatusInput,
      sceneLockInput,
      openedModifyDialog,
      openedDeleteDialog,
      sceneCanSubmit
    } = this.props;
    const childrenWithProps = React.Children.map(children,
      (child) => React.cloneElement(child, {
        star,
        unlock
      }));
    return (
      <div className={css(styles.container)}>
        <EditDialog
          dialogTitle={'Edit scene'}
          dialogValidateLabel={'Edit'}
          editObject={() => {
            changeScene(
              editedScene.id,
              sceneNameInput,
              sceneDescriptionInput,
              sceneStatusInput ? 'question' : 'normal',
              sceneLockInput
            );
          }}
          canSubmit={sceneCanSubmit}
          closeEditDialog={() => dispatch(sceneEditOpenDialogModify(false))}
          openedEditDialog={openedModifyDialog || false}
        >
          <SceneEditForm
            scene={editedScene}
          />
        </EditDialog>
        <DeleteDialog
          deleteObject={() => {
            dispatch(push('/lab/scenes'));
            deleteScene(editedScene.id);
          }}
          closeDeleteDialog={() => dispatch(sceneEditOpenDialogDelete(false))}
          openedDeleteDialog={openedDeleteDialog || false}
        />
        {childrenWithProps}
      </div>
    )
      ;
  }
}

SceneModifier.propTypes = {
  children: PropTypes.any,
  dispatch: PropTypes.func,
  changeScene: PropTypes.func,
  deleteScene: PropTypes.func,
  sceneNameInput: PropTypes.string,
  sceneDescriptionInput: PropTypes.string,
  sceneStatusInput: PropTypes.bool,
  sceneLockInput: PropTypes.bool,
  star: PropTypes.func,
  unlock: PropTypes.func,
  editedScene: PropTypes.object,
  openedModifyDialog: PropTypes.bool,
  openedDeleteDialog: PropTypes.bool,
  sceneCanSubmit: PropTypes.bool
};

const mapStateToProps = (state) => ({
  sceneNameInput: state.scene.list.main.sceneNameInput,
  sceneDescriptionInput: state.scene.list.main.sceneDescriptionInput,
  sceneStatusInput: state.scene.list.main.sceneStatusInput,
  sceneLockInput: state.scene.list.main.sceneLockInput,
  droppedFile: state.scene.list.main.droppedFile,
  editedScene: state.scene.list.main.editedScene,
  openedModifyDialog: state.scene.list.main.openedModifyDialog,
  openedDeleteDialog: state.scene.list.main.openedDeleteDialog,
  sceneCanSubmit: state.scene.list.main.canSubmit
});

const SceneModifierWithState = connect(mapStateToProps)(SceneModifier);

const UnlockSceneMutation = gql `
mutation UnlockScene($sceneId: String!) {
  unlockScene(sceneId: $sceneId) {
    ok
    scene{
      id
      name
      locked
    }
  }
}`;

const StarSceneMutation = gql `
mutation StarScene($sceneId: String!) {
  starScene(sceneId: $sceneId) {
    ok
    scene {
      id
      name
      description
      createdAt
      locked
      thumbnail
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

const DeleteSceneMutation = gql `
mutation DeleteScene($sceneId: String!) {
  deleteScene(sceneId: $sceneId) {
    ok
    scene {
      id
      active
    }
  }
}`;

const ChangeSceneMutation = gql `
mutation ChangeScene($sceneId: String!, $name: String, $description: String, $status: String, $locked: Boolean!) {
  changeScene(sceneId: $sceneId, name: $name, description: $description, status: $status, locked: $locked) {
    ok
    scene {
      id
      name
      description
      status {
        name
      }
    }
  }
}`;

const SceneModifierWithStateAndData = compose(
  graphql(ChangeSceneMutation, {
    props: ({ mutate }) => ({
      changeScene: (sceneId, name, description, status, locked) =>
        mutate({ variables: { sceneId, name, description, status, locked } })
    })
  }),
  graphql(DeleteSceneMutation, {
    props: ({ mutate }) => ({
      deleteScene: (sceneId) => mutate({
        variables: { sceneId },
        updateQueries: {
          SceneCollections: (prev, { mutationResult }) => {
            const myScenesList = prev.myScenes.edges.map((item) => item.node);
            const deleteIndex = _.findIndex(myScenesList, (item) => item.id === sceneId);
            if (deleteIndex < 0) {
              return prev;
            }
            return update(prev, {
              myScenes: {
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
  graphql(UnlockSceneMutation, {
    props: ({ mutate }) => ({
      unlock: (sceneId) => mutate({ variables: { sceneId } })
    })
  }),
  graphql(StarSceneMutation, {
    props: ({ mutate }) => ({
      star: (sceneId, sceneIsUserOwner, sceneIsUserFavorite) => mutate({
        variables: { sceneId },
        /*        updateQueries: {
         SceneCollections: (prev, { mutationResult }) => {
         const starredScene = mutationResult.data.starScene.scene;
         if (!sceneIsUserOwner && sceneIsUserFavorite) {
         const favoriteDeleteIndex = _.findIndex(prev.favoriteScenes.edges,
         (item) => item.node.id === sceneId);
         const newCollections = update(prev, {
         featuredScenes: {
         edges: {
         $unshift: [{ node: starredScene }]
         }
         },
         favoriteScenes: {
         edges: {
         $splice: [[favoriteDeleteIndex, 1]]
         }
         }
         });
         return newCollections;
         }
         if (!sceneIsUserOwner && !sceneIsUserFavorite) {
         const featuredDeleteIndex = _.findIndex(prev.featuredScenes.edges,
         (item) => item.node.id === sceneId);
         const newCollections = update(prev, {
         favoriteScenes: {
         edges: {
         $unshift: [{ node: starredScene }]
         }
         },
         featuredScenes: {
         edges: {
         $splice: [[featuredDeleteIndex, 1]]
         }
         }
         });
         return newCollections;
         }
         }
         }*/
      })
    })
  })
)(SceneModifierWithState);

export default SceneModifierWithStateAndData;
