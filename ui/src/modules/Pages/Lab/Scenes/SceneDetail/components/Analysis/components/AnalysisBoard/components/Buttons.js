import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import AllButtons from '../../../../../../../../../Common/All/Buttons/StarEditLockDeleteButtons';
import { analysisEditOpenDialogDelete, analysisEditOpenDialogModify, analysisEditSetEdited } from '../../../AnalysisActions';

const styles = StyleSheet.create({
});

const Buttons = (props) => {
  const {
    analysis,
    dispatch,
    unlock,
    star,
    containerWidth
  } = props;

  const onStar = () => {
    star(analysis.id);
  };
  const onUnlock = () => {
    unlock(analysis.id);
  };
  const onDelete = () => {
    dispatch(analysisEditSetEdited(analysis));
    dispatch(analysisEditOpenDialogDelete(true));
  };
  const onEdit = () => {
    dispatch(analysisEditSetEdited(analysis));
    dispatch(analysisEditOpenDialogModify(true));
  };
  return (
    <div className={css(styles.container)} >
      <AllButtons
        isUserOwner={analysis.isUserOwner}
        onUnlock={onUnlock}
        onStar={onStar}
        onDelete={onDelete}
        onEdit={onEdit}
        locked={analysis.locked}
        starred={analysis.isUserFavorite}
        starCount={analysis.favoriteCount}
        objectOwner={analysis.owner}
        containerWidth={'250px'}
      />
    </div>
  );
};

Buttons.propTypes = {
  analysis: PropTypes.object,
  dispatch: PropTypes.func,
  unlock: PropTypes.func,
  star: PropTypes.func,
  containerWidth: PropTypes.string
};


export default Buttons;
