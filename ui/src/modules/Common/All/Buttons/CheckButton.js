import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import CheckCircleIcon from 'mdi-react/CheckCircleIcon';

const CheckButton = (props) =>
  <IconButton onClick={props.onCheck}>
    <CheckCircleIcon />
  </IconButton>;

CheckButton.propTypes = {
  onCheck: PropTypes.func
};

export default CheckButton;

