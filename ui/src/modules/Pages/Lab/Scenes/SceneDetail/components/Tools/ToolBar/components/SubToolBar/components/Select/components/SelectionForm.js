import React, { PropTypes, Component } from 'react';
import { FormsySelect, FormsyText } from 'formsy-material-ui/lib';
import { StyleSheet, css } from 'aphrodite';
import MenuItem from 'material-ui/MenuItem';
import { selectionNameInputSet, selectionSelect } from '../../../../../../ToolsActions';

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  form: {
    padding: 10
  }
});

class SelectionForm extends Component {
  render() {
    const {
      selectionInput,
      dispatch,
      selections,
      selectedSelection
    } = this.props;
    const selectionItems = selections ? selections.map((selection, selectionIndex) => (
      <MenuItem key={selectionIndex} value={selectionIndex} primaryText={selection.name || ''} />
    )) : null;
    return (
      <div className={css(styles.container)}>
        <h5>3. Name Object</h5>
        <div className={css(styles.form)}>
          <FormsySelect
            name='Select selection'
            value={selectionInput ? null : selectedSelection}
            floatingLabelText='Existing'
            onChange={(e, value) => dispatch(selectionSelect(value))}
            disabled={selectionInput ? true : false}
          >
            {selectionItems}
          </FormsySelect>
          <FormsyText
            name='selectionName'
            validations='isWords'
            floatingLabelText='New (ex: Birdy)'
            value={selectionInput}
            onChange={(e) => dispatch(selectionNameInputSet(e.target.value))}
          />
        </div>
      </div>
    );
  }
}

SelectionForm.propTypes = {
  dispatch: PropTypes.func,
  selections: PropTypes.array,
  selectionInput: PropTypes.string,
  selectedSelection: PropTypes.number
};

export default SelectionForm;
