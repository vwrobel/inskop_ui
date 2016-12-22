import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import InvalidIcon from 'mdi-react/TimerSandIcon';
import ReactTooltip from 'react-tooltip';
import { inskopPink } from '../../../styles/MuiTheme'

const styles = StyleSheet.create({
  container: {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginTop: 10
  }
});

const CodeInvalidIcon = (props) => {
  const { valid, tip } = props;
  const validIcon = !valid ? <InvalidIcon style={{ fillOpacity: 0.7 }} /> : null;
  const validTip = (!valid && tip) ?
    <ReactTooltip
      id='codeInvalid'
      place='left'
      type='dark'
      effect='solid'
      class={''}
      delayHide={0}
      delayShow={500}
    >
      <p>This code has to be validated by inskop before being available.</p>
      <p>You can write to contact@inskop.io for more info.</p>
    </ReactTooltip> : null;
  return (
    <div
      className={css(styles.container)}
      data-tip
      data-for='codeInvalid'
    >
      {validTip}
      {validIcon}
    </div>
  );
};

CodeInvalidIcon.propTypes = {
  valid: PropTypes.bool,
  tip: PropTypes.bool
};

export default CodeInvalidIcon;

