import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'react-addons-update';
import _ from 'underscore';
import EditDialog from '../../../../../Common/All/Dialog/EditDialog';
import DeleteDialog from '../../../../../Common/All/Dialog/DeleteDialog';
import CodeEditForm from './CodeEditForm/CodeEditForm';
import { codeEditOpenDialogDelete, codeEditOpenDialogModify} from '../CodeListActions';

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
});

class CodeModifier extends Component {

  render() {
    const {
      dispatch,
      changeCode,
      deleteCode,
      children,
      star,
      unlock,
      editedCode,
      codeNameInput,
      codeDescriptionInput,
      codeCategoryInput,
      openedModifyDialog,
      openedDeleteDialog
    } = this.props;
    const childrenWithProps = React.Children.map(children,
      (child) => React.cloneElement(child, {
        star,
        unlock
      }));
    return (
      <div className={css(styles.container)}>
        <EditDialog
          dialogTitle={'Edit code'}
          dialogValidateLabel={'Edit'}
          editObject={() => {
            changeCode(
              editedCode.id,
              codeNameInput,
              codeDescriptionInput,
              codeCategoryInput
            );
          }}
          closeEditDialog={() => dispatch(codeEditOpenDialogModify(false))}
          openedEditDialog={openedModifyDialog || false}
        >
          <CodeEditForm
            code={editedCode}
          />
        </EditDialog>
        <DeleteDialog
          deleteObject={() => {
            deleteCode(editedCode.id);
          }}
          closeDeleteDialog={() => dispatch(codeEditOpenDialogDelete(false))}
          openedDeleteDialog={openedDeleteDialog || false}
        />
        {childrenWithProps}
      </div>
    );
  }
}

CodeModifier.propTypes = {
  children: PropTypes.any,
  dispatch: PropTypes.func,
  changeCode: PropTypes.func,
  deleteCode: PropTypes.func,
  codeNameInput: PropTypes.string,
  codeDescriptionInput: PropTypes.string,
  codeCategoryInput: PropTypes.string,
  star: PropTypes.func,
  unlock: PropTypes.func,
  editedCode: PropTypes.object,
  openedModifyDialog: PropTypes.bool,
  openedDeleteDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
  codeNameInput: state.code.list.codeNameInput,
  codeDescriptionInput: state.code.list.codeDescriptionInput,
  codeCategoryInput: state.code.list.codeCategoryInput,
  editedCode: state.code.list.editedCode,
  openedModifyDialog: state.code.list.openedModifyDialog,
  openedDeleteDialog: state.code.list.openedDeleteDialog
});

const CodeModifierWithState = connect(mapStateToProps)(CodeModifier);

const UnlockCodeMutation = gql `
mutation UnlockCode($codeId: String!) {
  unlockCode(codeId: $codeId) {
    ok
    code{
      id
      name
      locked
    }
  }
}`;

const StarCodeMutation = gql `
mutation StarCode($codeId: String!) {
  starCode(codeId: $codeId) {
    ok
    code {
      id
      name
      description
      createdAt
      valid
      locked
      valid
      favoriteCount
      isUserFavorite
      isUserOwner
      category {
        name
      }
      owner {
        id
        name
        picture
        slug
        bio
        codeStars
        codeStars
        analysisStars
      }
    }
  }
}`;

const DeleteCodeMutation = gql `
mutation DeleteCode($codeId: String!) {
  deleteCode(codeId: $codeId) {
    ok
    code {
      id
      active
    }
  }
}`;

const ChangeCodeMutation = gql `
mutation ChangeCode($codeId: String!, $name: String, $description: String, $category: String) {
  changeCode(codeId: $codeId, name: $name, description: $description, category: $category) {
    ok
    code {
      id
      name
      description
      category {
        name
      }
    }
  }
}`;

const CodeModifierWithStateAndData = compose(
  graphql(ChangeCodeMutation, {
    props: ({ mutate }) => ({
      changeCode: (codeId, name, description, category) =>
        mutate({ variables: { codeId, name, description, category } })
    })
  }),
  graphql(DeleteCodeMutation, {
    props: ({ mutate }) => ({
      deleteCode: (codeId) => mutate({
        variables: { codeId },
        updateQueries: {
          CodeCollections: (prev, { mutationResult }) => {
            const allCodesList = prev.allCodes.edges.map((item) => item.node);
            const deleteIndex = _.findIndex(allCodesList, (item) => item.id === codeId);
            if (deleteIndex < 0) {
              return prev;
            }
            return update(prev, {
              allCodes: {
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
  graphql(UnlockCodeMutation, {
    props: ({ mutate }) => ({
      unlock: (codeId) => mutate({ variables: { codeId } })
    })
  }),
  graphql(StarCodeMutation, {
    props: ({ mutate }) => ({
      star: (codeId, codeIsUserOwner, codeIsUserFavorite) => mutate({
        variables: { codeId }
      })
    })
  })
)(CodeModifierWithState);

export default CodeModifierWithStateAndData;
