import React, { PropTypes, Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import IconButton from 'material-ui/IconButton';
import PlusCircleOutlineIcon from 'mdi-react/PlusCircleOutlineIcon';
import RecycleIcon from 'mdi-react/RecycleIcon';
import MinusCircleOutlineIcon from 'mdi-react/MinusCircleOutlineIcon';
import VectorCircleIcon from 'mdi-react/VectorCircleIcon';
import CursorMoveIcon from 'mdi-react/CursorMoveIcon';
import CursorDefaultOutlineIcon from 'mdi-react/CursorDefaultOutlineIcon';
import ResizeBottomRightIcon from 'mdi-react/ResizeBottomRightIcon';
import InputColor from 'react-input-color';
import { windowSetMode, windowSetColor } from '../../../../../../ToolsActions';
import '../../../../../../../../../../../../../styles/react-input-color.css';
import { scopethisLight } from '../../../../../../../../../../../../../styles/MuiTheme';

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  form: {
    padding: 10
  },
  buttons: {
    margin: 10,
    display: 'inline-block'
  }
});

const tooltipStyles = {
  zIndex: 10000
};

class WindowForm extends Component {

  render() {
    const {
      windowColor,
      dispatch,
      mode
    } = this.props;
    const buttonsName = [
      'add'
      // 'drag',
      // 'select',
      // 'resize',
      // 'delete'
    ];
    const buttonsIcon = [
      <PlusCircleOutlineIcon />
      // <VectorCircleIcon />,
      // <CursorMoveIcon />,
      // <CursorDefaultOutlineIcon />,
      // <ResizeBottomRightIcon />,
      // <MinusCircleOutlineIcon />
    ];
    const buttons = buttonsName.map((buttonName, buttonIndex) => {
      const buttonStyle = (buttonName === mode) ? { backgroundColor: scopethisLight } : {};
      return (
        <IconButton
          key={buttonName}
          name={`${buttonName}Selection`}
          onClick={() => dispatch(windowSetMode(buttonName))}
          tooltip={buttonName}
          tooltipStyles={tooltipStyles}
          style={buttonStyle}
        >
          {buttonsIcon[buttonIndex]}
        </IconButton>
      );
    });
    return (
      <div className={css(styles.container)}>
        <h5>3. Select Object</h5>
        <div className={css(styles.form)}>
          <div className={css(styles.buttons)}>
            {buttons}
          </div>
          <InputColor
            value={windowColor}
            defaultValue={windowColor}
            onChange={(value) => dispatch(windowSetColor(value))}
          />
        </div>
      </div>
    );
  }
}

WindowForm.propTypes = {
  windowColor: PropTypes.string,
  dispatch: PropTypes.func,
  mode: PropTypes.string
};

export default WindowForm;

