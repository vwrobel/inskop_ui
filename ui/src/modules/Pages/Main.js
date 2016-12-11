import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { StyleSheet, css } from 'aphrodite';
import { loadAuth, saveUserData } from '../Auth/AuthActions';
import { sideBarDock } from '../Navigation/components/SideBar/SideBarActions';


const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
});

class Main extends Component {

  componentWillMount() {
    this.props.loadAuth();
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.addAuth0User(this.props.profile).then(
        (res) => {
          this.props.saveUserData(res.data.addAuth0User.auth0User);
        });
    }
    if (!this.props.toolBarDocked) {
      this.props.sideBarDock(true);
    }
  }

  render() {
    return (
      <div className={css(styles.container)}>
        {this.props.children}
      </div>
    );
  }
}

Main.propTypes = {
  addAuth0User: PropTypes.func,
  profile: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  children: PropTypes.node,
  loadAuth: PropTypes.func,
  saveUserData: PropTypes.func,
  sideBarDock: PropTypes.func,
  toolBarDocked: PropTypes.bool

};

const mapStateToProps = (state) => ({
  profile: state.auth.profile,
  isAuthenticated: state.auth.isAuthenticated,
  toolBarDocked: state.scene.detail.tools.toolBarDocked
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ loadAuth, saveUserData, sideBarDock }, dispatch);

const MainWithState = connect(mapStateToProps, mapDispatchToProps)(Main);

const AddAuth0UserMutation = gql `
mutation AddAuth0User($name: String!, $email: String!, $picture: String!, $auth0Id: String!) {
  addAuth0User(name: $name, email: $email, picture: $picture, auth0Id: $auth0Id) {
    ok,
    auth0User{
      id,
      name,
      slug,
      authorization {
        level
      }
    }
  }
}`;

const MainWithStateAndData = compose(
  graphql(AddAuth0UserMutation, {
    props: ({ mutate }) => ({
      addAuth0User: (profile) => mutate({ variables: {
        name: profile.nickname,
        email: profile.email,
        picture: profile.picture,
        auth0Id: profile.user_id
      } })
    }) })
)(MainWithState);

export default MainWithStateAndData;

