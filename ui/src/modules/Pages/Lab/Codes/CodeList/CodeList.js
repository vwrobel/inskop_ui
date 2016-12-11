import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import CodeListContainer from './components/CodeListContainer';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 50,
    boxSizing: 'border-box'
  }
});

const CodeList = () => (
  <div className={css(styles.container)}>
    <CodeListContainer />
  </div>
  );

export default CodeList;
