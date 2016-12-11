import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Contact from './components/Contact';
import Logo from '../../Brand/components/Logo/Logo';
import TagLine from '../../Brand/components/Logo/TagLine';
import CentralPaper from '../../Common/All/CentralPaper/CentralPaper';

const styles = StyleSheet.create({
  content: {
    padding: 20,
    textAlign: 'center',
    width: '400px',
    boxSizing: 'border-box',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  centered: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  presentation: {
    textAlign: 'center',
    paddingTop: 80,
    paddingBottom: 80,
    fontSize: '14pt'
  }
});

class About extends Component {

  render() {
    return (
      <CentralPaper>
        <div className={css(styles.content)}>
          <div className={css(styles.centered)}>
            <Logo logoDark={false} />
            <TagLine />
          </div>
          <div className={css(styles.centered, styles.presentation)}>
            All enquiries welcome.
          </div>
          <Contact />
        </div>
      </CentralPaper>
    );
  }
}

export default About;
