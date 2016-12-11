import React from 'react';

const StarCounter = (props) => {
  const { starCount } = props;
  return (
    <span>
      {starCount}
    </span>
  );
};

export default StarCounter;
