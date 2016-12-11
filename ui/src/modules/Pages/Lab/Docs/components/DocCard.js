import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';

const {
  MEDIA_URL
} = process.env;

const paperStyle = {
  backgroundColor: 'white',
  margin: 10,
  padding: 0,
  textAlign: 'center',
  display: 'inline-block'
};

const titleStyle = {
  textAlign: 'center'
};

const cardStyle = {
  flex: '1 1 auto',
  margin: 20,
  overflow: 'visible',
  display: 'inline-block'
};

class DocCard extends Component {
  render() {
    const {
      title,
      file
    } = this.props;
    const fileUrl = `${MEDIA_URL}${file}`;
    const thumbnailUrl = fileUrl.replace('doc.pdf', 'thumbnail.png');

    return (
      <div style={cardStyle}>
        <a href={fileUrl} target='_blank' rel='noopener noreferrer'>
          <Paper style={paperStyle} zDepth={2}>
            <img src={thumbnailUrl} width={200} />
          </Paper>
        </a>
        <div style={titleStyle}>
          {title}
        </div>
      </div>
    );
  }
}

DocCard.propTypes = {
  title: PropTypes.string,
  file: PropTypes.string
};

export default DocCard;

