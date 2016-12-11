import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import IconButton from 'material-ui/IconButton';
import StarOutlineIcon from 'mdi-react/StarOutlineIcon';
import StarIcon from 'mdi-react/StarIcon';
import { scopethisPink } from '../../../../styles/MuiTheme';


const styles = StyleSheet.create({
  starred: {
    fill: scopethisPink,
    stroke: 'black',
    strokeWidth: 2,
    strokeOpacity: 0.8
  },
  notStarred: {
    fill: 'black'
  }
});

const StarButton = (props) => {
  const { starred, onStar } = props;
  const StarredIcon = starred ? StarIcon : StarOutlineIcon;
  const starredClass = starred ? css(styles.starred) : css(styles.notStarred);
  return (
    <IconButton
      onClick={onStar}
    >
      <StarredIcon className={starredClass} />
    </IconButton>
  );
};

StarButton.propTypes = {
  starred: PropTypes.bool,
  onStar: PropTypes.func
};

export default StarButton;

