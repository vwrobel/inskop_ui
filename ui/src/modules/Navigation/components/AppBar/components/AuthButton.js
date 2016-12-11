import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import LoginButton from './LoginButton';
import UserChip from './UserChip';


class AuthButton extends Component {

  render() {
    const { isAuthenticated, isAuthenticating } = this.props;

    if (isAuthenticated) {
      return <UserChip />;
    } else if (!isAuthenticating) {
      return <LoginButton />;
    }
    return <div />;
  }
}

const mapStateToProps = (state) => ({
  isAuthenticating: state.routing.locationBeforeTransitions.pathname === '/login',
  isAuthenticated: state.auth.isAuthenticated,
  userMenuOpen: state.navigation.appBar.userMenuOpen,
  userMenuAnchor: state.navigation.appBar.userMenuAnchor
});


export default connect(mapStateToProps)(AuthButton);

