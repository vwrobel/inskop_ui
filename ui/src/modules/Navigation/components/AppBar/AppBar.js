import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import { StyleSheet, css } from 'aphrodite';
import IconButton from 'material-ui/IconButton';
import OpenSideBar from 'material-ui/svg-icons/navigation/menu';
import { inskopLighter } from '../../../../styles/MuiTheme';
import AuthButton from './components/AuthButton';
import AnimatedLogo from '../../../Brand/components/Logo/AnimatedLogo';
import { sideBarDock } from '../SideBar/SideBarActions';

export const appBarHeight = 64;

const styles = StyleSheet.create({
  logo: {
    height: 45,
    marginTop: 18,
    verticalAlign: 'middle'
  }
});

const appBarStyle = {
  height: appBarHeight
};

const iconStyle = { fill: inskopLighter };

const CustomAppBar = (props) => {
  const { sideBarDocked, dispatch } = props;
  const AppLogo = <AnimatedLogo className={css(styles.logo)} logoDark scale={0.5} height={45} width={300} />;
  const IconLeft = (
    <IconButton
      onClick={() => dispatch(sideBarDock(!sideBarDocked))}
      iconStyle={iconStyle}
    >
      <OpenSideBar />
    </IconButton>
  );
  const IconRight = <AuthButton />;

  return (
    <AppBar
      title={AppLogo}
      iconElementLeft={IconLeft}
      iconElementRight={IconRight}
      style={appBarStyle}
    />
  );
};

CustomAppBar.propTypes = {
  sideBarDocked: PropTypes.bool,
  dispatch: PropTypes.func
};

const mapStateToProps = (state) => ({
  sideBarDocked: state.navigation.sideBar.sideBarDocked
});


export default connect(mapStateToProps)(CustomAppBar);

