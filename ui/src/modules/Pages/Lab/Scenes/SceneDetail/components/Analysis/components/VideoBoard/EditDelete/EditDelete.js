import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import EditButton from '../../../../../../../../../Common/All/Buttons/EditButton';
import DeleteButton from '../../../../../../../../../Common/All/Buttons/DeleteButton';
import { videoEditOpenDialogDelete, videoEditOpenDialogModify, videoEditSetEdited } from '../../../AnalysisActions';

const styles = StyleSheet.create({
  container: {
    width: 140
  }
});

const EditDelete = (props) => {
  const {
    video,
    dispatch
  } = props;

  const onDelete = () => {
    dispatch(videoEditSetEdited(video));
    dispatch(videoEditOpenDialogDelete(true));
  };
  const onEdit = () => {
    dispatch(videoEditSetEdited(video));
    dispatch(videoEditOpenDialogModify(true));
  };
  return (
    <div className={css(styles.container)} >
      <EditButton
        onEdit={onEdit}
      />
      <DeleteButton
        onDelete={onDelete}
      />
    </div>
  );
};

EditDelete.propTypes = {
  video: PropTypes.object,
  dispatch: PropTypes.func,
};


export default EditDelete;
