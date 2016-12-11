import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import AllButtons from '../../../../../Common/All/Buttons/StarEditLockDeleteButtons';
import { codeEditOpenDialogDelete, codeEditOpenDialogModify, codeEditSetEdited } from '../CodeListActions';

const styles = StyleSheet.create({
  buttons: {
    width: '260px'
  }
});

const Buttons = (props) => {
  const {
    code,
    dispatch,
    unlock,
    star,
    containerWidth
  } = props;

  const onStar = () => {
    star(code.id, code.isUserOwner, code.isUserFavorite);
  };
  const onUnlock = () => {
    unlock(code.id);
  };
  const onDelete = () => {
    dispatch(codeEditSetEdited(code));
    dispatch(codeEditOpenDialogDelete(true));
  };
  const onEdit = () => {
    dispatch(codeEditSetEdited(code));
    dispatch(codeEditOpenDialogModify(true));
  };
  return (
    <div className={css(styles.container)} >
      <AllButtons
        isUserOwner={code.isUserOwner}
        onUnlock={onUnlock}
        onStar={onStar}
        onDelete={onDelete}
        onEdit={onEdit}
        locked={code.locked}
        starred={code.isUserFavorite}
        starCount={code.favoriteCount}
        objectOwner={code.owner}
        containerWidth={containerWidth}
      />
    </div>
  );
};

Buttons.propTypes = {
  code: PropTypes.object,
  dispatch: PropTypes.func,
  unlock: PropTypes.func,
  star: PropTypes.func,
  containerWidth: PropTypes.string
};


export default Buttons;
