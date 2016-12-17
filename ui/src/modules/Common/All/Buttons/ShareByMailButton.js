import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import RaisedButton from 'material-ui/RaisedButton';
import ShareIcon from 'mdi-react/ShareIcon';
import { inskopDark } from '../../../../styles/MuiTheme';


const styles = StyleSheet.create({

});

const iconStyle = {
  fill: 'white'
};

const ShareByMail = (props) => {

  return (
    <div>
      <RaisedButton
        label='Share by mail'
        primary={true}
        icon={<ShareIcon style={iconStyle} />}
      />
    </div>
  );
};

export default ShareByMail;

