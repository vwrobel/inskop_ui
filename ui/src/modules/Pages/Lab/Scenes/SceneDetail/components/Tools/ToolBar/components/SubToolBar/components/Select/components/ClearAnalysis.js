import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RecycleIcon from 'mdi-react/RecycleIcon';


const ClearAnalysis = (props) => {
  const { onClear } = props;
  return (
    <FlatButton
      label='Reset selections'
      icon={<RecycleIcon />}
      onClick={onClear}
    />
  );
};

ClearAnalysis.propTypes = {
  onClear: PropTypes.func
};

export default ClearAnalysis;

