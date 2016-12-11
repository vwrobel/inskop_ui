import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import CodeDetailContainer from './components/CodeDetailContainer';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 50,
    boxSizing: 'border-box'
  }
});

const CodeDetail = (props) => {
  const { params } = props;
  const codeSlug = params.codeSlug;
  return (
    <div className={css(styles.container)}>
      <CodeDetailContainer codeSlug={codeSlug} />
    </div>
  );
};

CodeDetail.propTypes = {
  params: PropTypes.object
};

export default CodeDetail;
