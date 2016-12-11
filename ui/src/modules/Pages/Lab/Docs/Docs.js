import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import DocContainer from './components/DocContainer';


const styles = StyleSheet.create({
  container: {
    padding: 40
  }
});

const Docs = () => (
  <div className={css(styles.container)}>
    <DocContainer />
  </div>
  );

export default Docs;
