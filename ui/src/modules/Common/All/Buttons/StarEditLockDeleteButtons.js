import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import LockButton from './LockButton';
import StarButtonAndCounter from './StarButtonAndCounter';
import UserChip from '../../User/UserChip';


const styles = StyleSheet.create({
  container: {
    display: 'inline-block',
    float: 'right'
  },
  leftActions: {
  },
  rightActions: {
    marginLeft: 40,
    float: 'right'
  },
  userChipContainer: {
    float: 'right',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 10,
    padding: 4,
    marginRight: '-3px'
  }
});

const Buttons = (props) => {
  const {
    isUserOwner,
    onUnlock,
    onStar,
    onDelete,
    onEdit,
    locked,
    starred,
    starCount,
    objectOwner,
    containerWidth
  } = props;
  const leftActions = (
    <span className={css(styles.leftActions)}>
      <StarButtonAndCounter
        onStar={onStar}
        starred={starred}
        starCount={starCount}
      />
    </span>
  );

  const rightActions = isUserOwner ? (
    <span className={css(styles.rightActions)}>
      <EditButton
        onEdit={onEdit}
      />
      <LockButton
        onUnlock={onUnlock}
        locked={locked}
      />
      <DeleteButton
        onDelete={onDelete}
      />
    </span>
  ) : <div className={css(styles.userChipContainer)}>
    <UserChip user={objectOwner} />
  </div>;

  return (
    <div style={{ width: '100%', verticalAlign: 'middle' }}>
      <div className={css(styles.container)} style={{ width: containerWidth }}>
        {leftActions}
        {rightActions}
      </div>
    </div>
  );
};

Buttons.propTypes = {
  isUserOwner: PropTypes.bool,
  onUnlock: PropTypes.func,
  onStar: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  locked: PropTypes.bool,
  starred: PropTypes.bool,
  starCount: PropTypes.number,
  objectOwner: PropTypes.object,
  containerWidth: PropTypes.string
};

export default Buttons;
