import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


const Alert = (props) => {
  const {
    closeAlert,
    messageAlert,
    openedAlert
  } = props;
  const actions = [
    <FlatButton
      label='OK'
      primary
      onTouchTap={closeAlert}
    />
  ];

  return (
    <div>
      <Dialog
        title={''}
        actions={actions}
        open={openedAlert}
      >
        {messageAlert}
      </Dialog>
    </div>
  );
};

Alert.propTypes = {
  closeAlert: PropTypes.func,
  openedAlert: PropTypes.bool,
  messageAlert: PropTypes.object
};

export default Alert;
