import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../../Common/All/Loading/Loading';
import UserCard from './components/UserCard';

class User extends Component {
  render() {
    const { data, dispatch, changeUser, bioIsEditing, bioInput } = this.props;
    if (data.loading) {
      return <Loading />;
    }
    const user = data.auth0userBySlug;
    return (
      <UserCard
        user={user}
        bioIsEditing={bioIsEditing}
        bioInput={bioInput}
        dispatch={dispatch}
        changeUser={changeUser}
      />
    );
  }
}

User.propTypes = {
  data: PropTypes.object,
  changeUser: PropTypes.func,
  bioIsEditing: PropTypes.bool,
  dispatch: PropTypes.func
};

const mapStateToProps = (state) => ({
  bioIsEditing: state.user.bioIsEditing,
  bioInput: state.user.bioInput
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
    isCurrentUser
  }
}`;

const ChangeUserMutation = gql`
mutation ChangeAuth0User($userId: ID!, $bio: String){
  changeAuth0User(userId: $userId, bio: $bio) {
    auth0User {
      id
      bio
    }
    ok
  }
}`;

const UserWithStateAndData = compose(
  graphql(UserQuery, {
    options: ({ params }) => ({ variables: { userSlug: params.userSlug } })
  }),
  graphql(ChangeUserMutation, {
    props: ({ mutate }) => ({
      changeUser: (userId, bio) =>
        mutate({
          variables: { userId, bio }
        })
    })
  })
)(UserWithState);


export default UserWithStateAndData;
