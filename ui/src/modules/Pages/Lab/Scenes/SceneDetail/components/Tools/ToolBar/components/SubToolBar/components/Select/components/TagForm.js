import React, { PropTypes, Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { FormsyText, FormsySelect } from 'formsy-material-ui/lib';
import MenuItem from 'material-ui/MenuItem';
import { tagNameInputSet, tagSelect } from '../../../../../../ToolsActions';

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  form: {
    padding: 10
  }
});

class TagForm extends Component {
  render() {
    const { dispatch, tagInput, tags, selectedTag } = this.props;
    const tagItems = tags ? tags.map((tag, tagIndex) => (
      <MenuItem key={tagIndex} value={tagIndex} primaryText={tag.name} />
    )) : null;
    return (
      <div className={css(styles.container)}>
        <h5>1. Choose Tag</h5>
        <div className={css(styles.form)}>
          <FormsySelect
            name='Select tag'
            value={tagInput ? null : selectedTag}
            floatingLabelText='Existing'
            onChange={(e, value) => dispatch(tagSelect(value))}
            disabled={tagInput ? true : false}
          >
            {tagItems}
          </FormsySelect>
          <FormsyText
            name='Create tag'
            validations='isWords'
            floatingLabelText='New (ex: bird)'
            value={tagInput}
            onChange={(e) => dispatch(tagNameInputSet(e.target.value))}
          />
        </div>
      </div>
    );
  }
}

TagForm.propTypes = {
  dispatch: PropTypes.func,
  tagInput: PropTypes.string,
  tags: PropTypes.array,
  selectedTag: PropTypes.number
};

export default TagForm;

