import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { StyleSheet, css } from 'aphrodite';
import { browserHistory } from 'react-router';
import { logInRequest } from '../../../../Auth/AuthActions';

const style = {
  marginTop: 6,
  marginRight: 14
};

const LoginButton = (props) => (
  <RaisedButton
    label='Sign in'
    style={style}
    secondary
    onClick={() => {
      props.dispatch(logInRequest(true));
      browserHistory.push('/login');
    }}
  />
);


export default connect()(LoginButton);

