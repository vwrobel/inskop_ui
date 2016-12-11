import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Avatar from 'material-ui/Avatar';
import CentralPaper from '../../../Common/All/CentralPaper/CentralPaper';
import UserStars from '../../../Common/User/UserStars';
import UserChip from '../../../Common/User/UserChip';
import { scopethisLighter } from '../../../../styles/MuiTheme';

const styles = StyleSheet.create({
  content: {
    padding: 20,
    fontSize: '14pt',
    lineHeight: 2,
    width: '100%',
    boxSizing: 'border-box'
  },
  centered: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
    maxWidth: '500px'
  },
  avatar: {
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  name: {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginLeft: 50
  },
  bio: {
    padding: 20,
    backgroundColor: scopethisLighter
  }
});

const avatarStyle = {
  margin: 5
};

const UserCard = (props) => {
  const { user } = props;
  return (
    <CentralPaper>
      <div className={css(styles.content)}>
        <div>
          <div className={css(styles.avatar)}>
            <Avatar
              src={user.picture}
              size={100}
              style={avatarStyle}
            />
          </div>
          <div className={css(styles.name)}>
            <h3>{user.name}</h3>
            <UserStars user={user} />
          </div>
        </div>
        <div className={css(styles.bio)}>
          {user.bio}
        </div>
      </div>
    </CentralPaper>
  );
};

UserCard.propTypes = {
  user: PropTypes.object
};

export default UserCard;
