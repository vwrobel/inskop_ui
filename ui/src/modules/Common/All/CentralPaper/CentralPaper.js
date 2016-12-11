import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Paper from 'material-ui/Paper';

const styles = StyleSheet.create({
  container: {
    padding: 40,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box'
  }
});

const paperStyle = {
  backgroundColor: 'white',
  padding: 20,
  marginLeft: 'auto',
  marginRight: 'auto',
  width: 850
};

class CentralPaper extends Component {
  render() {
    return (
      <div className={css(styles.container)}>
        <Paper style={paperStyle} zDepth={2} >
          {this.props.children}
        </Paper>
      </div>
    );
  }
}

CentralPaper.propTypes = {
  children: PropTypes.any
};

export default CentralPaper;

