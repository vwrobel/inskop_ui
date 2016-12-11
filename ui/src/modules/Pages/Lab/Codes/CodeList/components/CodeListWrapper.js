import React, { PropTypes, Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import CodeTable from './CodeTable';
import CodeGithub from './CodeGithub';
import Loading from '../../../../../Common/All/Loading/Loading';

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
});

const CodeListWrapper = (props) => {
  const {
    codes,
    loading,
    dispatch,
    unlock,
    star
  } = props;
  return (
    loading ? <Loading /> :
    <div className={css(styles.container)}>
      <CodeTable codes={codes} dispatch={dispatch} unlock={unlock} star={star} />
      <div style={{ marginTop: 0 }}>
        <CodeGithub />
      </div>
    </div>
  );
};

CodeListWrapper.propTypes = {
  loading: PropTypes.bool,
  codes: PropTypes.array,
  dispatch: PropTypes.func,
  unlock: PropTypes.func,
  star: PropTypes.func
};

export default CodeListWrapper;
