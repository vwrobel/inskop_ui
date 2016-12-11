import React from 'react';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'mdi-react/DeleteIcon';

const DeleteButton = (props) => {
  const { onDelete } = props;
  return (
    <IconButton
      onClick={onDelete}
    >
      <DeleteIcon />
    </IconButton>
  );
};


export default DeleteButton;

