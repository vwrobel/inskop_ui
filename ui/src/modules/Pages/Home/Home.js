import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ReactPlayer from 'react-player';
import { sceneEditOpenDialogCreate } from '../Lab/Scenes/SceneList/SceneListActions';
import CentralPaper from '../../Common/All/CentralPaper/CentralPaper';
import schema from './contents/schema.svg';
import vid from './contents/example_vid.mp4';


const styles = StyleSheet.create({

  centered: {
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center'
  },
  schema: {
    width: '100%',
    maxWidth: 600,
    padding: 20,
    boxSizing: 'border-box'
  },
  buttons: {
    paddingBottom: 10
  }
});

const videoStyle = {
  width: '100%',
  height: '100%'
};

class Home extends Component {
  render() {
    return (
      <CentralPaper>
        <div className={css(styles.schema, styles.centered)}>
          <img src={schema} width={'100%'} alt='schema' />
        </div>
        <div className={css(styles.buttons, styles.centered)}>
          <Link to='/lab/scenes/' onClick={() => this.props.dispatch(sceneEditOpenDialogCreate(true))}>
            <FlatButton
              label='Start with your own scene'
              secondary
            />
          </Link>
          <Link to='/lab/scenes/aouta/analyses/aouta_analysis/videos/orig/tools/view-analysis'>
            <RaisedButton
              label='Start with a featured scene'
              secondary
            />
          </Link>
        </div>
        <ReactPlayer
          ref='player'
          url={vid}
          style={videoStyle}
          width='100%'
          height='100%'
          playing
          loop
        />
      </CentralPaper>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(Home);
