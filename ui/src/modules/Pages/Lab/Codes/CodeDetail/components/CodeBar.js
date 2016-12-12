import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import ReactTooltip from 'react-tooltip';
import InfoIcon from 'mdi-react/InformationVariantIcon';
import CodeCategoryIcon from '../../../../../Common/Code/CodeCategoryIcon';
import { inskopLighter } from '../../../../../../styles/MuiTheme';
import Stamp from '../../../../../Common/All/Dates/Stamp';
import Buttons from '../../CodeList/components/CodeButtons';

export const codeBarHeight = 60;

const styles = StyleSheet.create({
  container: {
    height: codeBarHeight,
    backgroundColor: inskopLighter,
    padding: 10,
    display: 'inline-block',
    width: '100%',
    boxSizing: 'border-box'
  },
  icon: {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginRight: 20
  },
  info: {
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  buttons: {
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  description: {
    marginLeft: 20,
    display: 'inline-block',
    verticalAlign: 'middle'
  },
});

class CodeBar extends Component {
  render() {
    const { code, dispatch, unlock, star } = this.props;
    const { name, owner, createdAt, category } = code;
    return (
      <div className={css(styles.container)}>
        <div style={{ float: 'left' }}>
          <div className={css(styles.icon)}>
            <CodeCategoryIcon category={category.name} tip />
          </div>
          <div className={css(styles.info)}>
            <h4>{name}</h4>
            <Stamp date={code.createdAt} />
          </div>
          <ReactTooltip id='codeDescription' place='bottom' type='dark' effect='solid' class={''} delayHide={0} delayShow={500}>
            <span>{code.description}</span>
          </ReactTooltip>
          <div className={css(styles.description)} data-tip data-for='codeDescription'>
            <InfoIcon />
          </div>
        </div>
        <Buttons
          code={code}
          dispatch={dispatch}
          unlock={unlock}
          star={star}
          containerWidth={'280px'}
        />
      </div>
    );
  }
}

CodeBar.propTypes = {
  code: PropTypes.object,
  dispatch: PropTypes.func,
  star: PropTypes.func,
  unlock: PropTypes.func
};

export default CodeBar;
