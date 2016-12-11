import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import AllButtons from '../../../../../../../Common/All/Buttons/StarEditLockDeleteButtons';
import { sceneEditOpenDialogDelete, sceneEditOpenDialogModify, sceneEditSetEdited } from '../../../SceneListActions';

const styles = StyleSheet.create({

});

const Buttons = (props) => {
  const {
    scene,
    dispatch,
    unlock,
    star,
    containerWidth
  } = props;

  const onStar = () => {
    star(scene.id, scene.isUserOwner, scene.isUserFavorite);
  };
  const onUnlock = () => {
    unlock(scene.id);
  };
  const onDelete = () => {
    dispatch(sceneEditSetEdited(scene));
    dispatch(sceneEditOpenDialogDelete(true));
  };
  const onEdit = () => {
    dispatch(sceneEditSetEdited(scene));
    dispatch(sceneEditOpenDialogModify(true));
  };
  return (
    <AllButtons
      isUserOwner={scene.isUserOwner}
      onUnlock={onUnlock}
      onStar={onStar}
      onDelete={onDelete}
      onEdit={onEdit}
      locked={scene.locked}
      starred={scene.isUserFavorite}
      starCount={scene.favoriteCount}
      objectOwner={scene.owner}
      containerWidth={containerWidth}
    />
  );
};

Buttons.propTypes = {
  scene: PropTypes.object,
  dispatch: PropTypes.func,
  unlock: PropTypes.func,
  star: PropTypes.func,
  containerWidth: PropTypes.string
};


export default Buttons;
