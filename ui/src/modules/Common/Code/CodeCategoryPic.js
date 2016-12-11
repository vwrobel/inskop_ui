import React, { Component, PropTypes } from 'react';

import VideoFilterIcon from 'mdi-react/ImageFilterIcon';
import ClassifierIcon from 'mdi-react/ArrowRightBoldCircleIcon';
import TrackerIcon from 'mdi-react/RadarIcon';


const CodeCategoryPic = (props) => {
  const { category } = props;
  switch (category) {
    case 'video filter':
      return <VideoFilterIcon />;
    case 'classifier':
      return <ClassifierIcon />;
    case 'tracker':
      return <TrackerIcon />;
    default:
      return null;
  }
};

CodeCategoryPic.propTypes = {
  category: PropTypes.string
};

export default CodeCategoryPic;

