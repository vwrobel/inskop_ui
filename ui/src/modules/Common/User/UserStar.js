import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import StarIcon from 'mdi-react/StarIcon';
import { inskopPink } from '../../../styles/MuiTheme';


const styles = StyleSheet.create({
  container: {
    display: 'inline-block',
    padding: '0px 10px',
    position: 'relative'
  },
  starred: {
    fill: inskopPink,
    stroke: 'black',
    strokeWidth: 2,
    strokeOpacity: 0.8,
    position: 'relative'
  }
});

const UserStar = (props) => {
  const { starCount, starTypeIcon, isLittleStar } = props;
  const starStyle = isLittleStar ? { height: 8, width: 8, opacity: 0.8 } :
    { height: 16, width: 16 };
  const starCountStyle = isLittleStar ? { opacity: 0.5 } : { opacity: 1 };
  return (
    <div className={css(styles.container)}>
      {starTypeIcon}
      <StarIcon className={css(styles.starred)} style={starStyle} />
      <span style={starCountStyle}>{starCount}</span>
    </div>
  );
};

UserStar.propTypes = {
  starCount: PropTypes.number,
  starTypeIcon: PropTypes.object,
  isLittleStar: PropTypes.bool
};

export default UserStar;

