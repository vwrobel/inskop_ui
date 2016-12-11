import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import CloseCircleIcon from 'mdi-react/CloseCircleIcon';

const CloseButton = (props) =>
  <IconButton onClick={props.onCancel}>
    <CloseCircleIcon />
  </IconButton>;

CloseButton.propTypes = {
  onCancel: PropTypes.func
};

export default CloseButton;

