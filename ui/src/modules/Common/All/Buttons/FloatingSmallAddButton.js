import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import IconButton from 'material-ui/IconButton';
import PlusCircleIcon from 'mdi-react/PlusCircleIcon'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ReactTooltip from 'react-tooltip';

const styles = StyleSheet.create({
  tooltip: {
    marginTop: 15,
    opacity: '0.2'
  }
});

const addButtonStyle = {
  position: 'absolute',
  right: -40,
  zIndex: 100
};

const FloatingAddButton = (props) => {
  const { addFunction, addLabel, bottom, highlight, disabled} = props;
  const buttonPosition = bottom ? { bottom: -40 } : { top: -40 };
  const tipPosition = bottom ? 'top' : 'bottom';
  return (
    <div>
      <ReactTooltip id={addLabel} place={tipPosition} type='dark' effect='solid' class={''} delayHide={0} delayShow={500}>
        <span>{ addLabel }</span>
      </ReactTooltip>
      { highlight ?
        < FloatingActionButton
          onClick = {addFunction}
          secondary
          style={{...addButtonStyle, ...buttonPosition}}
          data-tip
          data-for={addLabel}
          mini
          >
          <ContentAdd />
        </FloatingActionButton> :
        <IconButton
          onClick={addFunction}
          style={{...addButtonStyle, ...buttonPosition}}
          disabled={disabled}
          data-tip
          data-for={addLabel}
        >
          <PlusCircleIcon />
        </IconButton>
      }
    </div>
  );
};

FloatingAddButton.propTypes = {
  addFunction: PropTypes.func,
  addLabel: PropTypes.string,
  bottom: PropTypes.bool,
  highlight: PropTypes.bool,
  disabled: PropTypes.bool
};

export default FloatingAddButton;
