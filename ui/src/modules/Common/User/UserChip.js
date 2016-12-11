import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router';
import UserStars from './UserStars';
import { scopethisLighter } from '../../../styles/MuiTheme';


const styles = StyleSheet.create({
  container: {
    display: 'inline-block',
    padding: 0
  },
  avatar: {
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  wrapper: {
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  name: {
    opacity: 0.8,
    marginLeft: 10,
    marginBottom: 10,
    fontSize: '12pt'
  },
  stars: {
    fontSize: '10pt',
    fontColor: scopethisLighter
  }
});

const avatarStyle = {
};

const UserChip = (props) => {
  const { user } = props;
  return (
    <div className={css(styles.container)}>
      <Link to={`/users/${user.slug}`}>
        <div className={css(styles.avatar)}>
          <Avatar
            src={user.picture}
            size={40}
            style={avatarStyle}
          />
        </div>
        <div className={css(styles.wrapper)}>
          <div className={css(styles.name)}>
            {user.name}
          </div>
          <div className={css(styles.stars)}>
            <UserStars
              user={user}
              isLittleStar
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

UserChip.propTypes = {
  user: PropTypes.object
};

export default UserChip;
