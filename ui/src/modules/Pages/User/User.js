import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../../Common/All/Loading/Loading';
import UserCard from './components/UserCard';

class User extends Component {
  render() {
    const { data } = this.props;
    if (data.loading) {
      return <Loading />;
    }
    const user = data.auth0userBySlug;
    return (
      <UserCard user={user} />
    );
  }
}

User.propTypes = {
  data: PropTypes.object
};

const mapStateToProps = (state) => ({
});

const UserWithState = connect(mapStateToProps)(User);


const UserQuery = gql `
query UserQuery($userSlug: String!){
  auth0userBySlug(slug: $userSlug) {
    id
    name
    picture
    slug
    bio
    sceneStars
    codeStars
    analysisStars
  }
}`;

const UserWithStateAndData = compose(
  graphql(UserQuery, {
    options: ({ params }) => ({ variables: { userSlug: params.userSlug } })
  })
)(UserWithState);


export default UserWithStateAndData;
