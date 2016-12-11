import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sideBarDock } from '../Navigation/components/SideBar/SideBarActions';


class AuthPage extends Component {

  componentDidMount() {
    this.props.sideBarDock(false);
  }

  render() {
    return (
      <div />
    );
  }
}

AuthPage.propTypes = {
  sideBarDock: PropTypes.func
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ sideBarDock }, dispatch);

export default connect((state) => state, mapDispatchToProps)(AuthPage);
