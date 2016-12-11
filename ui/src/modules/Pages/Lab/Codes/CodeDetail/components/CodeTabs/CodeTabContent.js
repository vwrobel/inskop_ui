import React, { PropTypes } from 'react';


const CodeTabContent = (props) => {
  const { children, tabContentHeight } = props;
  const containerStyle = {
    height: tabContentHeight,
    overflowY: 'auto',
    overflowX: 'hidden'
  };
  return (
    <div style={containerStyle}>
      {children}
    </div>
  );
};

CodeTabContent.propTypes = {
  children: PropTypes.any,
  tabContentHeight: PropTypes.number
};

export default CodeTabContent;

