import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'react-addons-update';
import EditDialog from '../../../../../Common/All/Dialog/EditDialog';
import Alert from '../../../../../Common/All/Dialog/Alert'
import FloatingAddButton from '../../../../../Common/All/Buttons/FloatingAddButton';
import CodeEditForm from './CodeEditForm/CodeEditForm';
import { codeEditOpenDialogCreate, codeEditOpenAlert } from '../CodeListActions';

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
});

class CodeAdder extends Component {

  constructor(props) {
    super(props);
    this.codeAddSubmit = this.codeAddSubmit.bind(this);
    this.codeAddAbort = this.codeAddAbort.bind(this);
  }

  codeAddSubmit() {
    const {
      codeNameInput,
      codeDescriptionInput,
      codeCategoryInput,
      addCode
    } = this.props;
    addCode(codeNameInput, codeDescriptionInput, codeCategoryInput);
  }

  codeAddAbort() {
    const {
      dispatch
    } = this.props;
    dispatch(codeEditOpenDialogCreate(false));
  }

  render() {
    const {
      dispatch,
      openedCreateDialog,
      openedAlert,
      children,
      userData
    } = this.props;
    return (
      <div className={css(styles.container)}>
        {children}
        <FloatingAddButton
          addFunction={() => {
            if (userData.authorization.level < 3){
              dispatch(codeEditOpenDialogCreate(true));
            } else {
              dispatch(codeEditOpenAlert(true));
            }
          }}
          addLabel='Add code'
        />
        <EditDialog
          dialogTitle={'New code'}
          dialogValidateLabel={'Create'}
          editObject={this.codeAddSubmit}
          closeEditDialog={this.codeAddAbort}
          openedEditDialog={openedCreateDialog}
        >
          <CodeEditForm />
        </EditDialog>
        <Alert
          messageAlert={
            <span>
              You cannot add code yet.
              Write to <a href='mailto:contact@inskop.io'>contact@inskop.io</a> for more info.
            </span>
          }
          closeAlert={() => dispatch(codeEditOpenAlert(false))}
          openedAlert={openedAlert}
        />
      </div>
    );
  }
}

CodeAdder.propTypes = {
  dispatch: PropTypes.func,
  openedCreateDialog: PropTypes.bool,
  addCode: PropTypes.func,
  codeNameInput: PropTypes.string,
  codeDescriptionInput: PropTypes.string,
  codeCategoryInput: PropTypes.string,
  children: PropTypes.any,
  openedAlert: PropTypes.bool,
  userData: PropTypes.object
};

const mapStateToProps = (state) => ({
  openedCreateDialog: state.code.list.openedCreateDialog,
  codeNameInput: state.code.list.codeNameInput,
  codeDescriptionInput: state.code.list.codeDescriptionInput,
  codeCategoryInput: state.code.list.codeCategoryInput,
  openedAlert: state.code.list.openedAlert,
  userData: state.auth.userData
});

const CodeAdderWithState = connect(mapStateToProps)(CodeAdder);

const AddCodeMutation = gql`
mutation AddCode($name: String!, $description: String!, $category: String!){
  addCode(name: $name, description: $description, category: $category) {
    ok
    code {
      id
      name
      description
      createdAt
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

const CodeAdderWithStateAndData = compose(
  graphql(AddCodeMutation, {
    props: ({ mutate }) => ({
      addCode: (name, description, category ) => mutate({
        variables: { name, description, category },
        updateQueries: {
          CodeCollections: (prev, { mutationResult }) => {
            const newCode = mutationResult.data.addCode.code;
            return update(prev, {
              allCodes: {
                edges: {
                  $unshift: [{ node: newCode }]
                }
              }
            });
          }
        }
      })
    })
  })
)(CodeAdderWithState);

export default CodeAdderWithStateAndData;
