import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import RaisedButton from 'material-ui/RaisedButton';
import GithubIcon from 'mdi-react/GithubIcon';
import { inskopDark } from '../../../../../../styles/MuiTheme';


const styles = StyleSheet.create({

});

const iconStyle = {
  fill: 'white'
};

const CodeGithub = (props) => {

  return (
    <div>
      <RaisedButton
        href='http://github.com/vwrobel/cvtools'
        target='_blank'
        label='View on Github'
        primary={true}
        icon={<GithubIcon style={iconStyle} />}
      />
    </div>
  );
};

CodeGithub.propTypes = {
};

export default CodeGithub;

