import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import LockUnlockedOutlineIcon from 'mdi-react/LockUnlockedOutlineIcon';
import LockLockedIcon from 'mdi-react/LockIcon';

const LockButton = (props) => {
  const { onUnlock, locked } = props;
  const LockIcon = locked ? LockLockedIcon : LockUnlockedOutlineIcon;
  return (
    <IconButton
      onClick={onUnlock}
    >
      <LockIcon />
    </IconButton>
  );
};

LockButton.propTypes = {
  locked: PropTypes.bool,
  onUnlock: PropTypes.func
};

export default LockButton;

