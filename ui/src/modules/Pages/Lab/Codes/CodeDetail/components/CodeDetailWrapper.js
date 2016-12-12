import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Paper from 'material-ui/Paper';
import CodeViewer from './CodeViewer';
import CodeListButton from './CodeListButton';
import { inskopLighter } from '../../../../../../styles/MuiTheme';

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
});

const paperStyle = {
  height: '100%',
  backgroundColor: inskopLighter
};

const CodeDetailWrapper = (props) => {
  const {
    code,
    dispatch,
    unlock,
    star
  } = props;
  return (
    <div className={css(styles.container)}>
      <Paper style={paperStyle} zDepth={2}>
        <CodeListButton />
        <CodeViewer
          code={code}
          dispatch={dispatch}
          unlock={unlock}
          star={star}
        />
      </Paper>
    </div>
  );
};

CodeDetailWrapper.propTypes = {
  code: PropTypes.object,
  dispatch: PropTypes.func,
  star: PropTypes.func,
  unlock: PropTypes.func
};

export default CodeDetailWrapper;
