import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'mdi-react/PencilIcon';

const EditButton = (props) => {
  const { onEdit } = props;
  return (
    <IconButton
      onClick={onEdit}
    >
      <EditIcon />
    </IconButton>
  );
};

EditButton.propTypes = {
  onEdit: PropTypes.func
};

export default EditButton;

