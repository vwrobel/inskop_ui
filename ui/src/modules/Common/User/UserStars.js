import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import SceneIcon from 'mdi-react/MovieIcon';
import CodeIcon from 'mdi-react/CodeGreaterThanIcon';
import AnalysisIcon from 'mdi-react/MicroscopeIcon';
import UserStar from './UserStar';


const styles = StyleSheet.create({
  container: {
  }
});

const UserStars = (props) => {
  const { user, isLittleStar } = props;
  const iconStyle = isLittleStar ? { width: 12, height: 12, fillOpacity: 0.5 } : null;
  const starsArray = [
    { name: 'scene', count: user.sceneStars, icon: <SceneIcon style={iconStyle} /> },
    { name: 'code', count: user.codeStars, icon: <CodeIcon style={iconStyle} /> },
    { name: 'analysis', count: user.analysisStars, icon: <AnalysisIcon style={iconStyle} /> }
  ];
  return (
    <div className={css(styles.container)}>
      {starsArray.map((item) => (
        <UserStar
          key={item.name}
          starCount={item.count}
          starTypeIcon={item.icon}
          isLittleStar={isLittleStar}
        />
      ))}
    </div>
  );
};

UserStars.propTypes = {
  user: PropTypes.object,
  isLittleStar: PropTypes.bool
};

export default UserStars;

