import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import { StyleSheet, css } from 'aphrodite';

import LogoutIcon from 'mdi-react/LogoutIcon';
import AccountIcon from 'mdi-react/AccountIcon';
import SettingsIcon from 'mdi-react/SettingsIcon';

import Popover from 'material-ui/Popover';

import { setUserMenuOpen, setUserMenuAnchor } from '../AppBarActions';

import { logout } from '../../../../Auth/AuthActions';

import { inskopLighter } from '../../../../../styles/MuiTheme';

const style = {
  backgroundColor: inskopLighter
};

const poStyle = {
};

const UserMenu = (props) => {
  const { dispatch, userMenuOpen, userMenuAnchor } = props;

  return (
    <Popover
      style={poStyle}
      open={userMenuOpen}
      anchorEl={userMenuAnchor}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      onRequestClose={() => {
        dispatch(setUserMenuOpen(false));
        dispatch(setUserMenuAnchor(null));
      }}
    >
      <Menu style={style}>
        <MenuItem
          primaryText='Log Out'
          rightIcon={<LogoutIcon />}
          onClick={() => dispatch(logout())}
        />
      </Menu>
    </Popover>
  );
};

UserMenu.propTypes = {
  dispatch: PropTypes.func,
  userMenuOpen: PropTypes.bool,
  userMenuAnchor: PropTypes.any
};


const mapStateToProps = (state) => ({
  userMenuOpen: state.navigation.appBar.userMenuOpen,
  userMenuAnchor: state.navigation.appBar.userMenuAnchor
});

export default connect(mapStateToProps)(UserMenu);
