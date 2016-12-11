import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import './LockStyle.css';

const SERVER_ADDRESS = process.env.SERVER_ADDRESS;
const clientID = process.env.AUTH0_CLIENT_ID;
const domain = process.env.AUTH0_DOMAIN;

const authOptions = {
  container: 'lockContainer',
  connections: ['Username-Password-Authentication'],
  socialButtonStyle: 'small',
  closable: false,
  auth: {
    redirect: true,
    redirectUrl: SERVER_ADDRESS + '/login',
    responseType: 'token',
    sso: true
  }
};

class Lock extends Component {
  componentDidMount() {
    const Auth0Lock = require('auth0-lock').default;

    this.lock = new Auth0Lock(clientID, domain, authOptions);
    this.lock.on('authenticated', (authResult) => {
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          this.props.errorHandler(error);
          return;
        }
        this.props.loginHandler(profile, authResult.idToken);
        browserHistory.push('/');
      });
    });
  }

  showLock() {
    this.lock.show();
  }

  render() {
    return (
      //  id defined in App / authOptions
      <div id={'lockContainer'} />
    );
  }
}

Lock.propTypes = {
  errorHandler: PropTypes.func,
  loginHandler: PropTypes.func
};

export default Lock;
