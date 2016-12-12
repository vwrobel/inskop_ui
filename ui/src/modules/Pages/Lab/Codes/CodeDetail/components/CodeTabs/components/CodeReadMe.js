import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import Codemirror from 'react-codemirror';
import ReactMarkdown from 'react-markdown';
import CodeEditButton from '../../../../../../../Common/All/Buttons/EditCheckCancelButton';
import '../../../../../../../../styles/codemirror.css';
import { codeDetailEditing, codeDetailReadMeInput } from '../../../CodeDetailActions';


const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    padding: 20
  }
});
class CodeReadMe extends Component {
  componentWillMount() {
    const isBrowser = typeof window !== 'undefined';
    const markdownMode = isBrowser ? require('codemirror/mode/markdown/markdown') : undefined;
  }
  render() {
    const { code, isEditing, dispatch, editCode, readMeInput } = this.props;
    const editButton = code.isUserOwner ?
      <CodeEditButton
        isEditing={isEditing}
        onEdit={() => {
          dispatch(codeDetailEditing(true));
        }}
        onCheck={() => {
          dispatch(codeDetailEditing(false));
          editCode(code.id, '', readMeInput);
        }}
        onCancel={() => {
          dispatch(codeDetailEditing(false));
          dispatch(codeDetailReadMeInput(code.readMe));
        }}
      /> : null;
    const options = {
      lineNumbers: true,
      mode: 'markdown',
      readOnly: !isEditing
    };
    return (
      <div>
        {editButton}
        {isEditing ?
          <Codemirror
            value={readMeInput}
            onChange={(value) => { dispatch(codeDetailReadMeInput(value)); }}
            options={options}
          /> :
          <div className={css(styles.container)}>
            <ReactMarkdown source={code.readMe} />
          </div>
        }
      </div>
    );
  }
}

CodeReadMe.propTypes = {
  code: PropTypes.object,
  dispatch: PropTypes.func,
  readMeInput: PropTypes.string,
  isEditing: PropTypes.bool,
  editCode: PropTypes.func
};

const mapSateToProps = (state) => ({
  readMeInput: state.code.detail.readMeInput,
  isEditing: state.code.detail.isEditing
});

const CodeReadMeWithState = connect(mapSateToProps)(CodeReadMe);

export default CodeReadMeWithState;
