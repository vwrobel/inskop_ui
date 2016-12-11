import React, { PropTypes } from 'react';
import tagLine from './content/inskop_tagline.svg';


const TagLine = (props) => (
  <img className={props.className} src={tagLine} alt='tagline' width={'100%'} />
  );

TagLine.propTypes = {
  className: PropTypes.string
};

export default TagLine;
