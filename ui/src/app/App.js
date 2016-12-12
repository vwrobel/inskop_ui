import React, { Component, PropTypes } from 'react';
import Favicon from 'react-favicon';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { StyleSheet, css } from 'aphrodite';
import AuthWidget from '../modules/Auth/components/AuthWidget';
import favicon from '../public/favicon.png';
import { inskopDark, inskopLighter } from '../styles/MuiTheme';

injectTapEventPlugin();

const styles = StyleSheet.create({
  app: {
    color: inskopDark,
    backgroundColor: inskopLighter
  }
});

class App extends Component {
  render() {
    return (
      <div className={css(styles.app)}>
        <Favicon url={favicon} />
        <AuthWidget />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

export default App;
