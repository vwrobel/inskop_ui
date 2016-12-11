import React, { PropTypes, Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const styles = StyleSheet.create({
  container: {
    padding: '0px 20px'
  }
});

class EditDialog extends Component {

  componentDidUpdate() {
    setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
    }, 10);
  }

  render() {
    const {
      dialogTitle,
      dialogValidateLabel,
      closeEditDialog,
      openedEditDialog,
      editObject,
      children,
      canSubmit
    } = this.props;

    const actions = [
      <FlatButton
        label='Cancel'
        primary
        onTouchTap={closeEditDialog}
      />,
      <RaisedButton
        label={dialogValidateLabel}
        primary
        disabled={!canSubmit}
        onTouchTap={() => {
          editObject();
          closeEditDialog();
        }}
      />
    ];

    return (
      <Dialog
        title={dialogTitle}
        actions={actions}
        modal
        open={openedEditDialog}
      >
        <div className={css(styles.container)}>
          {children}
        </div>
      </Dialog>
    );
  }
}

EditDialog.propTypes = {
  canSubmit: PropTypes.bool,
  closeEditDialog: PropTypes.func,
  openedEditDialog: PropTypes.bool,
  editObject: PropTypes.func,
  children: PropTypes.object,
  dialogTitle: PropTypes.string,
  dialogValidateLabel: PropTypes.string
};

export default EditDialog;
