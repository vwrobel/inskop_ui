import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import CircularProgress from 'material-ui/CircularProgress';

const Loading = () => (
  <div style={{margin: 20}}>
    <CircularProgress />
  </div>
);

export default Loading;

