import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import { analysisEditDescriptionInput, analysisEditNameInput, analysisEditReset, analysisEditCanSubmit } from '../../AnalysisActions';

const styles = StyleSheet.create({
  formInput: {
    display: 'block'
  }
});

class AnalysisEditForm extends Component {
  componentDidMount() {
    const { analysis, dispatch } = this.props;
    if (analysis) {
      dispatch(analysisEditNameInput(analysis.name));
      dispatch(analysisEditDescriptionInput(analysis.description));
    }
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(analysisEditReset());
  }
  render() {
    const {
      dispatch,
      analysisNameInput,
      analysisDescriptionInput,
      analysis,
      analysisCanSubmit
    } = this.props;
    return (
      <Formsy.Form
        onValid={() => {if (!analysisCanSubmit) {dispatch(analysisEditCanSubmit(true));}}}  //  this.enableButton
        onInvalid={() => {if (analysisCanSubmit) {dispatch(analysisEditCanSubmit(false));}}}  //  this.disableButton
        onValidSubmit={() => {}}
        onInvalidSubmit={() => { console.log('invalid form'); }}  //  this.notifyFormError
      >
        <FormsyText
          name='name'
          validations='isAlphanumeric'
          validationError='This is not a valid name'
          required
          floatingLabelText='Name'
          defaultValue={analysis ? analysis.name : ''}
          value={analysisNameInput}
          onChange={(e) => { dispatch(analysisEditNameInput(e.target.value)); }}
          className={css(styles.formInput)}
          disabled={analysis ? true : false}
        />
        <FormsyText
          style={{ marginBottom: 20, width: '100%' }}
          name='Description'
          validations='isExisty'
          validationError='This is not a valid description'
          required
          floatingLabelText='Description'
          defaultValue={analysis ? analysis.description : ''}
          value={analysisDescriptionInput}
          rows={4}
          onChange={(e) => { dispatch(analysisEditDescriptionInput(e.target.value)); }}
          multiLine
          className={css(styles.formInput)}
        />
      </Formsy.Form>
    );
  }
}


AnalysisEditForm.propTypes = {
  dispatch: PropTypes.func,
  analysisNameInput: PropTypes.string,
  analysisDescriptionInput: PropTypes.string,
  analysis: PropTypes.object,
  analysisCanSubmit: PropTypes.bool
};

const mapStateToProps = (state) => ({
  analysisNameInput: state.scene.detail.analysis.analysisNameInput,
  analysisDescriptionInput: state.scene.detail.analysis.analysisDescriptionInput,
  analysisCanSubmit: state.scene.detail.analysis.canSubmit
});


export default connect(mapStateToProps)(AnalysisEditForm);
