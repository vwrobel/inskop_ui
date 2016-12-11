import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
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
  position: 'fixed',
  bottom: 20,
  right: 20,
  zIndex: 100
};

const FloatingAddButton = (props) => {
  const { addFunction, addLabel } = props;
  return (
    <div>
      <ReactTooltip id='addObject' place='top' type='dark' effect='solid' class={''} delayHide={0} delayShow={500}>
        <span>{ addLabel }</span>
      </ReactTooltip>
      <FloatingActionButton
        onClick={addFunction}
        secondary
        style={addButtonStyle}
        data-tip
        data-for='addObject'
      >
        <ContentAdd />
      </FloatingActionButton>
    </div>
  );
};

FloatingAddButton.propTypes = {
  addFunction: PropTypes.func,
  addLabel: PropTypes.string
};

export default FloatingAddButton;
