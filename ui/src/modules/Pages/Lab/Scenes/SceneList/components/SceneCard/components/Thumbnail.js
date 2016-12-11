import React, { PropTypes } from 'react';
import { CardMedia } from 'material-ui/Card';
import { Link } from 'react-router';
import { scopethisLight } from '../../../../../../../../styles/MuiTheme';
import { sceneCardShowDescription } from '../../../SceneListActions';

const {
  MEDIA_URL
} = process.env;

const descriptionStyle = {
  fontSize: '11pt',
  color: scopethisLight,
  height: 202 - 8,
  padding: 20,
  boxSizing: 'border-box'
};

const Thumbnail = (props) => {
  const { showedDescription, scene, dispatch } = props;
  const { name, description, thumbnail, slug } = scene;
  const overlayStyle = showedDescription ? {} : { display: 'none' };
  return (
    <Link to={`/lab/scenes/${slug}`} >
      <CardMedia
        overlay={<div style={descriptionStyle}> {description} </div>}
        overlayStyle={overlayStyle}
        onMouseOver={() => dispatch(sceneCardShowDescription(scene.id))}
        onMouseOut={() => dispatch(sceneCardShowDescription(null))}
        onClick={() => dispatch(sceneCardShowDescription(null))}
      >
        <img src={MEDIA_URL + thumbnail} alt={name} width='100%' />
      </CardMedia>
    </Link>
  );
};

Thumbnail.propTypes = {
  scene: PropTypes.object,
  dispatch: PropTypes.func,
  showedDescription: PropTypes.bool
};

export default Thumbnail;
