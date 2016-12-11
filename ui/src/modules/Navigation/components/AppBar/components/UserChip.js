import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import DotsVerticalIcon from 'mdi-react/DotsVerticalIcon';
import { StyleSheet, css } from 'aphrodite';
import { setUserMenuOpen, setUserMenuAnchor } from '../AppBarActions';

import { scopethisLighter } from '../../../../../styles/MuiTheme';

import UserMenu from './UserMenu';


const styles = StyleSheet.create({
  container: {
    marginTop: -5,
    marginRight: 30
  },
  chip: {
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  icon: {
    display: 'inline-block',
    verticalAlign: 'middle'
  }
});

const style = {
  fontSize: 'large',
  color: scopethisLighter
};

const iconStyle = {
  fill: scopethisLighter
};


const UserChip = (props) => {
  const { dispatch, profile, userData } = props;

  const handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();
    dispatch(setUserMenuOpen(true));
    dispatch(setUserMenuAnchor(event.currentTarget));
  };

  const userSlug = userData ? userData.slug : null;
  if (profile) {
    return (
      <div className={css(styles.container)}>
        <div className={css(styles.chip)}>
          <Link to={`/users/${userSlug}`}>
            <ListItem
              primaryText={profile.nickname}
              leftAvatar={<Avatar src={profile.picture} />}
              style={style}
            />
          </Link>
        </div>
        <div className={css(styles.icon)}>
          <IconButton
            style={iconStyle}
            onClick={handleTouchTap}
          >
            <DotsVerticalIcon />
          </IconButton>
        </div>
        <UserMenu />
      </div>
    );
  }
  return null;
};

UserChip.propTypes = {
  profile: PropTypes.object,
  userData: PropTypes.object,
  dispatch: PropTypes.func
};


const mapStateToProps = (state) => ({
  profile: state.auth.profile,
  userData: state.auth.userData
});

export default connect(mapStateToProps)(UserChip);
