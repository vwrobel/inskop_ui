import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import Formsy from 'formsy-react';
import { FormsyText, FormsyToggle } from 'formsy-material-ui/lib';
import QuestionIcon from 'mdi-react/CommentQuestionOutlineIcon';
import DropZone from './components/DropZone';
import { sceneEditDescriptionInput, sceneEditNameInput, sceneEditStatusInput, sceneEditReset, sceneEditCanSubmit } from '../../SceneListActions';

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
  scene: PropTypes.object
};

const mapStateToProps = (state) => ({
  sceneNameInput: state.scene.list.main.sceneNameInput,
  sceneStatusInput: state.scene.list.main.sceneStatusInput,
  sceneDescriptionInput: state.scene.list.main.sceneDescriptionInput,
  droppedFile: state.scene.list.main.droppedFile,
  validDroppedFile: state.scene.list.main.validDroppedFile,
  sceneCanSubmit: state.scene.list.main.canSubmit
});


export default connect(mapStateToProps)(SceneEditForm);
