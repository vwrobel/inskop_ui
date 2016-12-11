import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import CodeCategoryPic from './CodeCategoryPic';
import ReactTooltip from 'react-tooltip';

const styles = StyleSheet.create({
  container: {
    display: 'inline-block',
    verticalAlign: 'middle'
  }
});

const CodeCategoryIcon = (props) => {
  const { category, tip } = props;
  const categoryIcon = <CodeCategoryPic category={category} />;
  const categoryTip = tip ? <ReactTooltip id='codeCategory' place='right' type='dark' effect='solid' class={''} delayHide={0} delayShow={500}>
    <span>{ category }</span>
  </ReactTooltip> : null;
  return (
    <div
      className={css(styles.container)}
      data-tip
      data-for='codeCategory'
    >
      {categoryTip}
      {categoryIcon}
    </div>
  );
};

CodeCategoryIcon.propTypes = {
  category: PropTypes.string,
  tip: PropTypes.bool
};

export default CodeCategoryIcon;

