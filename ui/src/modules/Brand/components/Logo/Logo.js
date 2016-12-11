import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import logoDark from './content/inskop_logo_light.svg';
import logoLight from './content/inskop_logo_dark.svg';


const Logo = (props) => {
  let logoSrc = '';
  if (props.logoDark) {
    logoSrc = logoDark;
  } else {
    logoSrc = logoLight;
  }
  return (
    <Link to='/'>
      <img className={props.className} src={logoSrc} alt='logo' width={'100%'} />
    </Link>
  );
};

Logo.propTypes = {
  logoDark: PropTypes.bool,
  className: PropTypes.string
};

Logo.defaultProps = {
  logoDark: true
};

export default Logo;
