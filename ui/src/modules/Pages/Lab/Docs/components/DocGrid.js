import React, { PropTypes, Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import DocCard from './DocCard';


const styles = StyleSheet.create({
  docGrid: {
    display: 'flex',
    alignItems: 'stretch',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  }
});


class DocGrid extends Component {
  render() {
    const {
      docs
    } = this.props;
    return (
      <div className={css(styles.sceneGrid)}>
        {
          docs.map((doc) => (
            <DocCard
              key={doc.title}
              file={doc.file}
              title={doc.title}
            />
            ))
        }
      </div>
    );
  }
}

DocGrid.propTypes = {
  docs: PropTypes.array
};

export default DocGrid;
