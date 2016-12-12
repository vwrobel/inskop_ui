import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { StyleSheet, css } from 'aphrodite';
import UploadIcon from 'mdi-react/UploadIcon';
import { CardMedia } from 'material-ui/Card';
import { inskopPink, inskopLighter, inskopDark } from '../../../../../../../../styles/MuiTheme';
import { sceneEditFileDrop } from '../../../SceneListActions';

const styles = StyleSheet.create({
  dropZone: {
    marginTop: 10,
    height: 155,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: inskopLighter,
    textAlign: 'center'
  },
  activeDropZone: {
    verticalAlign: 'middle'
  },
  dropZoneContent: {
    margin: '20px 0'
  },
  dropZoneLabel: {
    padding: '10px',
    textAlign: 'center',
    opacity: 1,
    color: inskopDark
  },
  aboutDroppedFile: {
    padding: 10
  }
});

const DropZone = (props) => {
  const { droppedFile, validDroppedFile, dispatch } = props;
  const aboutDroppedFile = droppedFile ?
    ( validDroppedFile ?
      <p>{`${droppedFile.name}, ${droppedFile.type}, ${Math.round(droppedFile.size / 100000) / 10}Mo`}</p> :
      <p>Please select a mp4 file of size less than 20 Mo</p>
    ) :
    null;
  return (
    <CardMedia>
      <Dropzone
        onDrop={(files) => dispatch(sceneEditFileDrop(files[0]))}
        multiple={false}
        className={css(styles.dropZone)}
        activeClassName={css(styles.activeDropZone)}
      >
        <div className={css(styles.dropZoneContent)}>
          <div className={css(styles.dropZoneLabel)}>Drop or select mp4 file.</div>
          <FloatingActionButton
            secondary
          >
            <UploadIcon />
          </FloatingActionButton>
          <div className={css(styles.aboutDroppedFile)}>
            {aboutDroppedFile}
          </div>
        </div>
      </Dropzone>
    </CardMedia>
  );
};


DropZone.propTypes = {
  dispatch: PropTypes.func,
  droppedFile: PropTypes.object,
  validDroppedFile: PropTypes.bool
};

export default DropZone;
