import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import Formsy from 'formsy-react';
import { FormsyText, FormsyToggle } from 'formsy-material-ui/lib';
import QuestionIcon from 'mdi-react/CommentQuestionOutlineIcon';
import LockIcon from 'mdi-react/LockIcon';
import DropZone from './components/DropZone';
import {
  sceneEditDescriptionInput,
  sceneEditNameInput,
  sceneEditStatusInput,
  sceneEditLockInput,
  sceneEditReset,
  sceneEditCanSubmit } from '../../SceneListActions';

const styles = StyleSheet.create({
  formInput: {
    display: 'block'
  }
});

class SceneEditForm extends Component {
  componentDidMount() {
    const { scene, dispatch } = this.props;
    if (scene) {
      dispatch(sceneEditStatusInput(scene.status.name === 'question'));
      dispatch(sceneEditLockInput(scene.locked));
      dispatch(sceneEditNameInput(scene.name));
      dispatch(sceneEditDescriptionInput(scene.description));
    }
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(sceneEditReset());
  }
  render() {
    const {
      dispatch,
      sceneNameInput,
      sceneDescriptionInput,
      sceneStatusInput,
      sceneLockInput,
      droppedFile,
      validDroppedFile,
      sceneCanSubmit,
      scene
    } = this.props;
    const dropZone = scene ? null : <DropZone dispatch={dispatch} droppedFile={droppedFile} validDroppedFile={validDroppedFile} />;
    return (
      <Formsy.Form
        onValid={() => { if (!sceneCanSubmit) {dispatch(sceneEditCanSubmit(true));}}}  //  this.enableButton
        onInvalid={() => { if (sceneCanSubmit) {dispatch(sceneEditCanSubmit(false));}}}  //  this.disableButton
        onValidSubmit={() => {}}
        onInvalidSubmit={() => { console.log('invalid form'); }}  //  this.notifyFormError
      >
        <FormsyText
          name='name'
          validations='isAlphanumeric'
          validationError='This is not a valid name'
          required
          floatingLabelText='Name'
          defaultValue={''}
          value={sceneNameInput}
          onChange={(e) => { dispatch(sceneEditNameInput(e.target.value)); }}
          className={css(styles.formInput)}
          disabled={scene ? true : false}
        />
        <FormsyText
          style={{ marginBottom: 20, width: '100%' }}
          name='Description'
          validations='isExisty'
          validationError='This is not a valid description'
          required
          floatingLabelText='Description'
          defaultValue={''}
          value={sceneDescriptionInput}
          rows={4}
          onChange={(e) => { dispatch(sceneEditDescriptionInput(e.target.value)); }}
          multiLine
          className={css(styles.formInput)}
        />
        <FormsyToggle
          style={{ marginBottom: 20, width: '25%', display: 'inline-block' }}
          name='Question'
          label='Mark as question'
          value={sceneStatusInput}
          onChange={(e, value) => { dispatch(sceneEditStatusInput(value)); }}
        />
        <div style={{ marginLeft: 10, display: 'inline-block' }}>
          <QuestionIcon />
        </div>
        <br/>
        <FormsyToggle
          style={{ marginBottom: 20, width: '25%', display: 'inline-block' }}
          name='Lock'
          label='Make private'
          value={sceneLockInput}
          onChange={(e, value) => { dispatch(sceneEditLockInput(value)); }}
        />
        <div style={{ marginLeft: 10, display: 'inline-block' }}>
          <LockIcon />
        </div>
        {dropZone}
      </Formsy.Form>
    );
  }
}


SceneEditForm.propTypes = {
  dispatch: PropTypes.func,
  droppedFile: PropTypes.object,
  validDroppedFile: PropTypes.bool,
  sceneNameInput: PropTypes.string,
  sceneDescriptionInput: PropTypes.string,
  sceneStatusInput: PropTypes.bool,
  sceneLockInput: PropTypes.bool,
  scene: PropTypes.object
};

const mapStateToProps = (state) => ({
  sceneNameInput: state.scene.list.main.sceneNameInput,
  sceneStatusInput: state.scene.list.main.sceneStatusInput,
  sceneLockInput: state.scene.list.main.sceneLockInput,
  sceneDescriptionInput: state.scene.list.main.sceneDescriptionInput,
  droppedFile: state.scene.list.main.droppedFile,
  validDroppedFile: state.scene.list.main.validDroppedFile,
  sceneCanSubmit: state.scene.list.main.canSubmit
});


export default connect(mapStateToProps)(SceneEditForm);
