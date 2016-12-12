import React, { PropTypes } from 'react';
import EditButton from '../../../Common/All/Buttons/EditButton';
import CheckButton from '../../../Common/All/Buttons/CheckButton';
import CancelButton from '../../../Common/All/Buttons/CancelButton';

const EditCheckCancelButton = (props) => {
  const { onEdit, onCheck, onCancel, isEditing } = props;
  return (
    <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 40 }}>
      {isEditing ?
        <div>
          <CheckButton onCheck={onCheck} />
          <CancelButton onCancel={onCancel} />
        </div>
        : <EditButton onEdit={onEdit} />}
    </div>
  );
};

EditCheckCancelButton.propTypes = {
  onEdit: PropTypes.func,
  onCheck: PropTypes.func,
  onCancel: PropTypes.func,
  isEditing: PropTypes.bool
};

export default EditCheckCancelButton;

