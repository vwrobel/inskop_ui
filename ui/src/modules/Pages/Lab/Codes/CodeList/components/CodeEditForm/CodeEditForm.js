import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import Formsy from 'formsy-react';
import { FormsyText, FormsyRadioGroup, FormsyRadio } from 'formsy-material-ui/lib';
import { codeEditDescriptionInput, codeEditNameInput, codeEditCategoryInput, codeEditReset } from '../../CodeListActions';
import CodeCategoryIcon from '../../../../../../Common/Code/CodeCategoryIcon';

const styles = StyleSheet.create({
  formInput: {
    display: 'block'
  }
});

const switchStyle = {
  marginBottom: 16
};

class CodeEditForm extends Component {
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(codeEditReset());
  }
  render() {
    const {
      dispatch,
      codeNameInput,
      codeDescriptionInput,
      codeCategoryInput,
      code
    } = this.props;
    const codeCategories = ['video filter', 'tracker', 'classifier'];
    return (
      <Formsy.Form
        onValid={() => {}}  //  this.enableButton
        onInvalid={() => {}}  //  this.disableButton
        onValidSubmit={() => {}}
        onInvalidSubmit={() => { console.log('invalid form'); }}  //  this.notifyFormError
      >
        <FormsyText
          name='name'
          validations='isWords'
          floatingLabelText='Name'
          defaultValue={code ? code.name : ''}
          value={codeNameInput}
          onChange={(e) => { dispatch(codeEditNameInput(e.target.value)); }}
          className={css(styles.formInput)}
          disabled={code ? true : false}
        />
        <FormsyText
          style={{ marginBottom: 20, width: '100%' }}
          name='Description'
          validations='isWords'
          floatingLabelText='Description'
          defaultValue={code ? code.description : ''}
          value={codeDescriptionInput}
          rows={4}
          onChange={(e) => { dispatch(codeEditDescriptionInput(e.target.value)); }}
          multiLine
          className={css(styles.formInput)}
        />
        <FormsyRadioGroup
          name='code_category'
          defaultSelected={codeCategoryInput || 'video filter'}
          onChange={(e, value) => { dispatch(codeEditCategoryInput(value)); }}
        >
          {
            codeCategories.map((category) =>
              <FormsyRadio
                key={`fr_${category}`}
                value={category}
                label={
                  <div style={{}}>
                    <span style={{ marginRight: 10, verticalAlign: 'middle' }}>
                      {category}
                    </span>
                    <CodeCategoryIcon key={`icon_${category}`} category={category} />
                  </div>}
                style={switchStyle}
              />
            )
          }
        </FormsyRadioGroup>
      </Formsy.Form>
    );
  }
}


CodeEditForm.propTypes = {
  dispatch: PropTypes.func,
  codeNameInput: PropTypes.string,
  codeDescriptionInput: PropTypes.string,
  codeCategoryInput: PropTypes.string,
  code: PropTypes.object
};

const mapStateToProps = (state) => ({
  codeNameInput: state.code.list.codeNameInput,
  codeDescriptionInput: state.code.list.codeDescriptionInput,
  codeCategoryInput: state.code.list.codeCategoryInput
});


export default connect(mapStateToProps)(CodeEditForm);
