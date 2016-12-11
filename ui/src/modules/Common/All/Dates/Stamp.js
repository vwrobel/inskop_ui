import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import dateFormat from 'dateformat';

const Stamp = (props) => {
  const { date } = props;
  const stamp = dateFormat(date, 'mmmm dS, yyyy');
  return (
    <div style={{ fontSize: '10pt', opacity: 0.5, marginTop: 10 }}>
      added {stamp}
    </div>
  );
};

Stamp.propTypes = {
  date: PropTypes.string
};

export default Stamp;

