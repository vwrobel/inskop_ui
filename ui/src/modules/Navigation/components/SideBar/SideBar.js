import React from 'react';
import Sidebar from 'react-sidebar';
import { connect } from 'react-redux';
import SideBarContent from './components/SideBarContent';
import { inskopLighter } from '../../../../styles/MuiTheme';
import { appBarHeight } from '../AppBar/AppBar';

const sideBarStyles = {
  root: {
    top: appBarHeight
  },
  sidebar: {
    zIndex: 2,
    paddingTop: 20,
    width: 180,
    minWidth: 180,
    backgroundColor: inskopLighter
  }
};


const CustomSideBar = (props) => {
  const { className, sideBarDocked, children } = props;
  const sideBarContent = <SideBarContent />;
  return (
    <Sidebar sidebar={sideBarContent} docked={sideBarDocked} sidebarClassName={className} styles={sideBarStyles}>
      {children}
    </Sidebar>
  );
};

const mapStateToProps = (state) => ({
  sideBarDocked: state.navigation.sideBar.sideBarDocked
});


export default connect(mapStateToProps)(CustomSideBar);
