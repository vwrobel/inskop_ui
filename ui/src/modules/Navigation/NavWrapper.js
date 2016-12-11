import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import AppBar from './components/AppBar/AppBar';
import SideBar from './components/SideBar/SideBar';


class NavWrapper extends Component {

  render() {
    return (
      <div>
        <AppBar />
        <SideBar>
          {this.props.children}
        </SideBar>
      </div>
    );
  }
}

NavWrapper.propTypes = {
  children: PropTypes.any
};


export default NavWrapper;

