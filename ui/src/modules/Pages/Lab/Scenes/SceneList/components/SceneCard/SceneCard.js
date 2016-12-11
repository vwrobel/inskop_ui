import React, { Component, PropTypes } from 'react';
import { Card, CardActions } from 'material-ui/Card';
import Thumbnail from './components/Thumbnail';
import Buttons from './components/Buttons';
import Header from './components/Header';


const cardStyle = {
  flex: '1 1 auto',
  maxWidth: 360,
  height: 340,
  margin: 10,
  overflow: 'visible'
};

class SceneCard extends Component {
  render() {
    const {
      dispatch,
      scene,
      isShowedDescription,
      star,
      unlock
    } = this.props;
    return (
      <Card style={cardStyle}>
        <Header scene={scene} />
        <Thumbnail
          scene={scene}
          dispatch={dispatch}
          showedDescription={isShowedDescription || false}
        />
        <CardActions>
          <Buttons
            dispatch={dispatch}
            scene={scene}
            star={star}
            unlock={unlock}
            containerWidth={'100%'}
          />
        </CardActions>
      </Card>
    );
  }
}


SceneCard.propTypes = {
  dispatch: PropTypes.func,
  scene: PropTypes.object,
  isShowedDescription: PropTypes.bool,
  star: PropTypes.func,
  unlock: PropTypes.func
};


export default SceneCard;
