import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import StarButton from './StarButton';
import StarCounter from './StarCounter';

const styles = StyleSheet.create({
  container: {

  }
});

const StarButtonAndCounter = (props) => {
  const { starred, onStar, starCount } = props;
  return (
    <span className={css(styles.container)}>
      <StarButton
        starred={starred}
        onStar={onStar}
      />
      <StarCounter starCount={starCount} />
    </span>
  );
};

StarButtonAndCounter.propTypes = {
  starred: PropTypes.bool,
  onStar: PropTypes.func,
  starCount: PropTypes.number
};

export default StarButtonAndCounter;
