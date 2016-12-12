import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Codemirror from 'react-codemirror';
import CodeEditButton from '../../../../../../../Common/All/Buttons/EditCheckCancelButton';
import '../../../../../../../../styles/codemirror.css';
import { codeDetailEditing, codeDetailCodeInput, codeDetailReset } from '../../../CodeDetailActions';

class CodeMirror extends Component {
  componentWillMount() {
    const isBrowser = typeof window !== 'undefined';
    const pythonMode = isBrowser ? require('codemirror/mode/python/python') : undefined;
  }
  render() {
    const { code, isEditing, dispatch, editCode, codeInput } = this.props;
    const editButton = code.isUserOwner ?
      <CodeEditButton
        isEditing={isEditing}
        onEdit={() => {
          dispatch(codeDetailEditing(true));
        }}
        onCheck={() => {
          dispatch(codeDetailEditing(false));
          editCode(code.id, codeInput, '');
        }}
        onCancel={() => {
          dispatch(codeDetailEditing(false));
          dispatch(codeDetailCodeInput(code.code));
        }}
      /> : null;
    const options = {
      lineNumbers: true,
      mode: 'python',
      readOnly: !isEditing
    };
    return (
      <div>
        {editButton}
        <Codemirror
          value={codeInput}
          onChange={(value) => { dispatch(codeDetailCodeInput(value)); }}
          options={options}
        />
      </div>
    );
  }
}

CodeMirror.propTypes = {
  code: PropTypes.object,
  dispatch: PropTypes.func,
  codeInput: PropTypes.string,
  isEditing: PropTypes.bool,
  editCode: PropTypes.func
};

const mapSateToProps = (state) => ({
  codeInput: state.code.detail.codeInput,
  isEditing: state.code.detail.isEditing
});

const CodeMirrorWithState = connect(mapSateToProps)(CodeMirror);

export default CodeMirrorWithState;
