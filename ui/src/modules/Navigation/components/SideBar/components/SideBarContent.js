import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import HomeIcon from 'mdi-react/HomeIcon';
import MovieIcon from 'mdi-react/MovieIcon';
import InformationIcon from 'mdi-react/InformationIcon';
import CodeGreaterThanIcon from 'mdi-react/CodeGreaterThanIcon';
import BookOpenPageVariantIcon from 'mdi-react/BookOpenPageVariantIcon';
import CoffeeIcon from 'mdi-react/CoffeeIcon';
import SideBarItems from './SideBarItems';
import Dimensions from 'react-dimensions';

const homeItems = [
  { path: '/', icon: <HomeIcon />, name: 'Home' }
];


const labItems = [
  { path: '/lab/scenes', icon: <MovieIcon />, name: 'Scenes' },
  { path: '/lab/codes', icon: <CodeGreaterThanIcon />, name: 'Codes' },
  { path: '/lab/docs', icon: <BookOpenPageVariantIcon />, name: 'Docs' }
];

const lastItems = [
  { path: '/pricing', icon: <CoffeeIcon />, name: 'Pricing' },
  { path: '/about', icon: <InformationIcon />, name: 'About' }
];


const SideBarContent = (props) => {
  const { sideBarSelect, dispatch } = props;
  return (
    <div>
      <SideBarItems items={homeItems} dispatch={dispatch} sideBarSelect={sideBarSelect} />
      <Divider />
      <SideBarItems items={labItems} dispatch={dispatch} sideBarSelect={sideBarSelect} />
      <Divider />
      <SideBarItems items={lastItems} dispatch={dispatch} sideBarSelect={sideBarSelect} />
    </div>
  );
};

SideBarContent.propTypes = {
  dispatch: PropTypes.func,
  sideBarSelect: PropTypes.string
};

const mapStateToProps = (state) => ({
  sideBarSelect: state.navigation.sideBar.sideBarSelect
});

export default connect(mapStateToProps)(SideBarContent);
