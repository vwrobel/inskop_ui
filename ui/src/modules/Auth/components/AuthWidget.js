import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, css } from 'aphrodite';
import { logInError, login, lockCreated } from '../../Auth/AuthActions';
import Lock from './Lock/Lock';


const styles = StyleSheet.create({
  centered: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },

  image: {
    width: '100%'
  },

  widget: {
    width: '400px',
    height: '400px',
    transform: 'translateY(-50%) translateX(-50%)',
    top: '50vh',
    left: '50%',
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.90)',
    boxShadow: '0px 0px 2px 2px rgba(0,0,0,0.1)',
    borderRadius: '0 0 5px 5px',
    textAlign: 'center',
    padding: '0px',
    zIndex: 1000
  },

  lock: {
    width: '360px',
    height: '260px'
  },

  noDisplay: {
    display: 'none'
  }
});


class AuthWidget extends Component {

  componentDidMount() {
    this.refs.lock1.showLock();
  }

  render() {
    // Do not display widget if not authenticating
    const widgetStyle = this.props.isAuthenticating ?
      css(styles.widget) : css(styles.widget, styles.noDisplay);

    return (
      <div className={widgetStyle}>
        <Lock
          ref={'lock1'}
          className={css(styles.lock)}
          errorHandler={this.props.logInError}
          loginHandler={this.props.login}
          creationHandler={this.props.lockCreated}
        />
      </div>
    );
  }
}

AuthWidget.propTypes = {
  logInError: PropTypes.func,
  login: PropTypes.func,
  lockCreated: PropTypes.func,
  isAuthenticating: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticating: state.routing.locationBeforeTransitions.pathname === '/login',
  isDocked: state.navigation.sideBarDocked
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ logInError, login, lockCreated }, dispatch);

const AuthWidgetWithState = connect(mapStateToProps, mapDispatchToProps)(AuthWidget);

export default AuthWidgetWithState;
