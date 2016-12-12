import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Avatar from 'material-ui/Avatar';
import CentralPaper from '../../../Common/All/CentralPaper/CentralPaper';
import UserEditButton from '../../../Common/All/Buttons/EditCheckCancelButton';
import UserStars from '../../../Common/User/UserStars';
import UserChip from '../../../Common/User/UserChip';
import TextField from 'material-ui/TextField';
import { inskopLighter } from '../../../../styles/MuiTheme';
import { userBioIsEditing, userBioInput, userReset } from '../UserActions'

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
    position: 'relative',
    padding: 20,
    backgroundColor: inskopLighter
  }
});

const avatarStyle = {
  margin: 5
};

class UserCard extends Component {
  componentDidMount(){
    const { user, dispatch } = this.props;
    dispatch(userBioInput(user.bio || ''))
  }
  componentWillUnmount(){
    const { dispatch } = this.props;
    dispatch(userReset());
  }
  render() {
    const { user, dispatch, bioIsEditing, bioInput, changeUser } = this.props;
    const editButton = user.isCurrentUser ?
      <UserEditButton
        isEditing={bioIsEditing}
        onEdit={() => {
          dispatch(userBioIsEditing(true));
        }}
        onCheck={() => {
          changeUser(user.id, bioInput);
          dispatch(userBioIsEditing(false));
        }}
        onCancel={() => {
          dispatch(userBioIsEditing(false));
        }}
      /> : null;
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
            {editButton}
            {bioIsEditing ?
              <TextField
                style={{width: '100%', boxSizing: 'border-box'}}
                hintText='Write a short bio'
                multiLine={true}
                rows={4}
                value={bioInput}
                onChange={(event) => dispatch(userBioInput(event.target.value))}
              />
              : (user.bio || <i>Beautiful stranger</i>)}
          </div>
        </div>
      </CentralPaper>
    );
  }
}

UserCard.propTypes = {
  user: PropTypes.object,
  bioIsEditing: PropTypes.bool,
  bioInput: PropTypes.string,
  dispatch: PropTypes.func,
  changeUser: PropTypes.func
};

export default UserCard;
