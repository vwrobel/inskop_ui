import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


const DeleteDialog = (props) => {
  const { closeDeleteDialog, openedDeleteDialog, deleteObject } = props;
  const actions = [
    <FlatButton
      label='Cancel'
      primary
      onTouchTap={closeDeleteDialog}
    />,
    <FlatButton
      label='Delete'
      primary
      onTouchTap={() => {
        deleteObject();
        closeDeleteDialog();
      }}
    />
  ];

  return (
    <div>
      <Dialog
        title='Are you sure you want to delete?'
        actions={actions}
        modal
        open={openedDeleteDialog}
      >
        (This action cannot be undone.)
      </Dialog>
    </div>
  );
};

DeleteDialog.propTypes = {
  closeDeleteDialog: PropTypes.func,
  openedDeleteDialog: PropTypes.bool,
  deleteObject: PropTypes.func
};

export default DeleteDialog;
