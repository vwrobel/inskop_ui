import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  centered: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  container: {
    fontSize: '16pt'
  }
});

class Contact extends Component {

  render() {
    return (
      <div className={css(styles.container)}>
        <div className={css(styles.centered)}>
          <a href='mailto:contact@scopeth.is'> contact@scopeth.is </a>
        </div>
      </div>
    );
  }
}

export default Contact;
