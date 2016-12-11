import React, { PropTypes } from 'react';
import QuestionIcon from 'mdi-react/CommentQuestionOutlineIcon';
import InfoIcon from 'mdi-react/InformationVariantIcon';

const SceneStatusIcon = (props) => {
  const { status, mini } = props;
  let statusIcon = null;
  switch (status.name) {
    case 'question':
      statusIcon = <QuestionIcon style={{ fillOpacity: 0.7 }} />;
      break;
    default:
      statusIcon = mini ? null : <InfoIcon style={{ fillOpacity: 0.7 }} />;
  }
  return (
    <div>
      { statusIcon }
    </div>
  );
};

SceneStatusIcon.propTypes = {
  status: PropTypes.object,
  mini: PropTypes.bool
};

export default SceneStatusIcon;
