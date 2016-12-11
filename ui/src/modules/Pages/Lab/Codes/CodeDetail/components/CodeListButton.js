import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router';
import IconButton from 'material-ui/IconButton';
import CodeListIcon from 'mdi-react/CodeLessThanIcon';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '0px',
    left: '0px'
  }
});


const CodeListButton = (props) => {
  return (
    <div className={css(styles.container)}>
      <Link to='/lab/codes'>
        <IconButton>
          <CodeListIcon />
        </IconButton>
      </Link>
    </div>
  );
};

CodeListButton.propTypes = {
};

export default CodeListButton;

