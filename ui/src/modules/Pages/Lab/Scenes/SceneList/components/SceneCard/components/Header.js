import React, { PropTypes } from 'react';
import dateFormat from 'dateformat';
import { StyleSheet, css } from 'aphrodite';
import { CardHeader } from 'material-ui/Card';
import { capitalizeFirstLetter } from '../../../../../../../../utils/Functions';
import { scopethisLighter } from '../../../../../../../../styles/MuiTheme';
import SceneStatusIcon from '../../../../../../../Common/Scene/SceneStatusIcon';

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  status: {
    position: 'absolute',
    right: 20,
    top: 20
  }
});


const cardHeaderStyle = {
  backgroundColor: scopethisLighter
};

const titleStyle = {
  fontSize: '14pt'
};

const subtitleStyle = {
  marginTop: 10,
  width: 200
};

const Header = (props) => {
  const { name, createdAt, status } = props.scene;
  const stamp = dateFormat(createdAt, 'mmmm dS, yyyy');
  return (
    <CardHeader
      style={cardHeaderStyle}
      title={capitalizeFirstLetter(name)}
      subtitle={`added ${stamp}`}
      titleStyle={titleStyle}
      subtitleStyle={subtitleStyle}
    >
      <div className={css(styles.status)}>
        <SceneStatusIcon status={status} mini />
      </div>
    </CardHeader>
  );
};

Header.propTypes = {
  scene: PropTypes.object
};

export default Header;
