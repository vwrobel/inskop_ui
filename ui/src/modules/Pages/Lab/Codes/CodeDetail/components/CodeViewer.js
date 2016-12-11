import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Dimensions from 'react-dimensions';
import CodeTabs from './CodeTabs/CodeTabs';
import CodeBar from './CodeBar';

const styles = StyleSheet.create({
  container: {
  }
});

class CodeViewer extends Component {
  render() {
    const {
      code,
      containerHeight,
      dispatch,
      unlock,
      star
    } = this.props;
    return (
      <div className={css(styles.container)}>
        <CodeBar
          code={code}
          dispatch={dispatch}
          unlock={unlock}
          star={star}
        />
        <CodeTabs
          code={code}
          containerHeight={containerHeight}
          dispatch={dispatch}
        />
      </div>
    );
  }
}

CodeViewer.propTypes = {
  code: PropTypes.object,
  containerHeight: PropTypes.number,
  dispatch: PropTypes.func,
  star: PropTypes.func,
  unlock: PropTypes.func
};


export default Dimensions({ elementResize: true })(CodeViewer);

